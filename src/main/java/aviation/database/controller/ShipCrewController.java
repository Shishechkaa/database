package aviation.database.controller;

import aviation.database.domain.Human;
import aviation.database.domain.ShipCrew;
import aviation.database.repo.HumanRepo;
import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import aviation.database.repo.ShipCrewRepo;

import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("shipcrew")
public class ShipCrewController {
    private final ShipCrewRepo shipCrewRepo;
    private final HumanRepo humanRepo;

    @Autowired
    public ShipCrewController(ShipCrewRepo shipCrewRepo, HumanRepo humanRepo) {
        this.shipCrewRepo = shipCrewRepo;
        this.humanRepo = humanRepo;
    }

    @GetMapping
    public List<Human> list() {
        return humanRepo.findAll().stream().filter(human ->
                shipCrewRepo.findById(human.getId()).isPresent()).
                collect(Collectors.toList());
    }

    @GetMapping("{id}")
    public Human getOne (@PathVariable("id") Human member) {
        return member;
    }

    @PostMapping
    public Human create(@RequestBody Human member) {
        ShipCrew newMember = new ShipCrew();
        newMember.setHuman(member);
        shipCrewRepo.save(newMember);
        humanRepo.save(member);
        return member;
    }

    @PutMapping("{id}")
    public Human update (
            @PathVariable("id") Human memberFromDB,
            @RequestBody Human member
    ) {
        BeanUtils.copyProperties(member, memberFromDB, "id");
        return humanRepo.save(memberFromDB);
    }

    @DeleteMapping("{id}")
    public void delete(@PathVariable("id") Human member) {
        ShipCrew newMember = new ShipCrew();
        newMember.setHuman(member);
        shipCrewRepo.delete(newMember);
        humanRepo.delete(member);
    }
}
