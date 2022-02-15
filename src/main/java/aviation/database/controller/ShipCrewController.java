package aviation.database.controller;

import aviation.database.domain.ShipCrew;
import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import aviation.database.repo.ShipCrewRepo;

import java.util.List;

@RestController
@RequestMapping("shipcrew")
public class ShipCrewController {
    private final ShipCrewRepo shipCrewRepo;

    @Autowired
    public ShipCrewController(ShipCrewRepo shipCrewRepo) {
        this.shipCrewRepo = shipCrewRepo;
    }

    @GetMapping
    public List<ShipCrew> list() {
        return shipCrewRepo.findAll();
    }

    @GetMapping("{id}")
    public ShipCrew getOne (@PathVariable("id") ShipCrew member) {
        return member;
    }

    @PostMapping
    public ShipCrew create(@RequestBody ShipCrew member) {
        return shipCrewRepo.save(member);
    }

    @PutMapping("{id}")
    public ShipCrew update (
            @PathVariable("id") ShipCrew memberFromDB,
            @RequestBody ShipCrew member
    ) {
        BeanUtils.copyProperties(member, memberFromDB, "id");
        return shipCrewRepo.save(memberFromDB);
    }

    @DeleteMapping("{id}")
    public void delete(@PathVariable("id") ShipCrew member) {
        shipCrewRepo.delete(member);
    }
}
