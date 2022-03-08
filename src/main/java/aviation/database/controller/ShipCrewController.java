package aviation.database.controller;

import aviation.database.domain.Human;
import aviation.database.domain.ShipCrew;
import aviation.database.repo.CMCRepo;
import aviation.database.repo.HumanRepo;
import aviation.database.repo.OrderDocRepo;
import aviation.database.repo.ShipCrewRepo;
import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("shipcrew")
public class ShipCrewController {
    private final ShipCrewRepo shipCrewRepo;
    private final HumanRepo humanRepo;
    private final CMCRepo cmcRepo;
    private final OrderDocRepo orderDocRepo;

    @Autowired
    public ShipCrewController(ShipCrewRepo shipCrewRepo, HumanRepo humanRepo,
                              CMCRepo cmcRepo, OrderDocRepo orderDocRepo) {
        this.shipCrewRepo = shipCrewRepo;
        this.humanRepo = humanRepo;
        this.cmcRepo = cmcRepo;
        this.orderDocRepo = orderDocRepo;
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

    @PutMapping(value = "search")
    public List<Human> search(@RequestBody Human member) {
        List<Human> test = humanRepo.findAll().stream().filter(human -> {
            if(human.getFirst_name().equals(member.getFirst_name()))
                return true;
            if(human.getSecond_name().equals(member.getSecond_name()))
                return true;
            if(human.getThird_name().equals(member.getThird_name()))
                return true;
            if(human.getFirst_name_foreign().equals(member.getFirst_name_foreign()))
                return true;
            if(human.getSecond_name_foreign().equals(member.getSecond_name_foreign()))
                return true;
            if(human.getPosition().equals(member.getPosition()))
                return true;
            if(human.getDivision().equals(member.getDivision()))
                return true;
            if(human.getCitizenship().equals(member.getCitizenship()))
                return true;
            if(human.getBirth_date().equals(member.getBirth_date()))
                return true;
            return human.getLast_work().equals(member.getLast_work());
        }).collect(Collectors.toList());
        return test;
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
    public void delete(@PathVariable("id") ShipCrew member) {
        shipCrewRepo.delete(member);
        humanRepo.delete(member.getHuman());
    }
}
