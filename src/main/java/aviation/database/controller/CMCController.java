package aviation.database.controller;

import aviation.database.domain.CMC;
import aviation.database.domain.Human;
import aviation.database.repo.CMCRepo;
import aviation.database.repo.HumanRepo;
import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("cmc")
public class CMCController {
    private final CMCRepo cmcRepo;
    private final HumanRepo humanRepo;

    @Autowired
    public CMCController(CMCRepo cmcRepo, HumanRepo humanRepo) {
        this.cmcRepo = cmcRepo;
        this.humanRepo = humanRepo;
    }

    @GetMapping
    public List<CMC> list(@RequestBody Human human) {
        return cmcRepo.findAll().stream().filter(cmc ->
                cmc.getShipCrew().getId().equals(human.getId())).
                collect(Collectors.toList());
    }

    @GetMapping("{id}")
    public List<CMC> getAll(@PathVariable("id") Human human) {
        return cmcRepo.findAll().stream().filter(cmc ->
                cmc.getShipCrew().getId().equals(human.getId())).
                collect(Collectors.toList());
    }

    @PostMapping
    public CMC create(@RequestBody CMC cmc) {
        return cmcRepo.save(cmc);
    }

    @PutMapping("{id}")
    public CMC update(
            @PathVariable("id") CMC cmcFromDB,
            @RequestBody CMC cmc
    ) {
        BeanUtils.copyProperties(cmc, cmcFromDB, "id");
        return cmcRepo.save(cmcFromDB);
    }

    @DeleteMapping("{id}")
    public void delete(@PathVariable("id") CMC cmc) {
        cmcRepo.delete(cmc);
    }
}
