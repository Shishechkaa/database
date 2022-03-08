package aviation.database.controller;

import aviation.database.domain.CMC;
import aviation.database.domain.ShipCrew;
import aviation.database.repo.CMCRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("cmc")
public class CMCController {
    private final CMCRepo cmcRepo;

    @Autowired
    public CMCController(CMCRepo cmcRepo) {
        this.cmcRepo = cmcRepo;
    }

    @GetMapping("{shipCrew_id}")
    @ResponseBody
    public List<CMC> list(@PathVariable Long shipCrew_id) {
        return cmcRepo.getCMCSByShipCrew_Id(shipCrew_id);
    }

    @PostMapping("{shipCrew_id}")
    public CMC create(
            @PathVariable("shipCrew_id") ShipCrew shipCrew,
            @RequestBody CMC cmc
    ) {
        cmc.setShipCrew(shipCrew);
        return cmcRepo.save(cmc);
    }

    /*@PutMapping("{cmc_number}")
    public CMC update(
            @PathVariable("cmc_number") CMC cmcFromDB,
            @RequestBody CMC cmc
    ) {
        BeanUtils.copyProperties(cmc, cmcFromDB, "cmc_number");
        return cmcRepo.save(cmcFromDB);
    }*/

    @DeleteMapping("{shipCrew_id}")
    public void delete(@RequestBody CMC cmc) {
        cmcRepo.delete(cmc);
    }
}
