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

import java.util.ArrayList;
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

    @PutMapping(value = "search")
    public List<Human> search(@RequestBody Human member) {
        List<Human> humanList = new ArrayList<>();
        shipCrewRepo.findAll().stream().filter(shipCrew -> {
            if(shipCrew.getHuman().getFirst_name().equals(member.getFirst_name())
                    && (member.getFirst_name() != null && !member.getFirst_name().equals("")))
                return true;
            if(shipCrew.getHuman().getSecond_name().equals(member.getSecond_name())
                    && (member.getSecond_name() != null && !member.getSecond_name().equals("")))
                return true;
            if(shipCrew.getHuman().getThird_name().equals(member.getThird_name())
                    && (member.getThird_name() != null && !member.getThird_name().equals("")))
                return true;
            if(shipCrew.getHuman().getFirst_name_foreign().equals(member.getFirst_name_foreign())
                    && (member.getFirst_name_foreign() != null && !member.getFirst_name_foreign().equals("")))
                return true;
            if(shipCrew.getHuman().getSecond_name_foreign().equals(member.getSecond_name_foreign())
                    && (member.getSecond_name_foreign() != null && !member.getSecond_name_foreign().equals("")))
                return true;
            if(shipCrew.getHuman().getPosition().equals(member.getPosition())
                    && (member.getPosition() != null && !member.getPosition().equals("")))
                return true;
            if(shipCrew.getHuman().getDivision().equals(member.getDivision())
                    && (member.getDivision() != null && !member.getDivision().equals("")))
                return true;
            if(shipCrew.getHuman().getCitizenship().equals(member.getCitizenship())
                    && (member.getCitizenship() != null && !member.getCitizenship().equals("")))
                return true;
            if(shipCrew.getHuman().getBirth_date() == member.getBirth_date()
                    && member.getBirth_date() != null)
                return true;
            return shipCrew.getHuman().getLast_work().equals(member.getLast_work())
                    && (member.getLast_work() != null && !member.getLast_work().equals(""));
        }).forEachOrdered(shipCrew -> {
            humanList.add(humanRepo.getById(shipCrew.getId()));
        });
        return humanList;
    }

    @PutMapping("{id}")
    public Human update (
            @PathVariable("id") Human memberFromDB,
            @RequestBody Human member
    ) {
        BeanUtils.copyProperties(member, memberFromDB, "id");
        return humanRepo.save(memberFromDB);
    }

    @DeleteMapping("delete/{id}")
    public void delete(@PathVariable("id") Human member) {
        humanRepo.delete(member);
    }
}
