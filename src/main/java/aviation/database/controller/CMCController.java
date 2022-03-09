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

    @PutMapping("deActive{shipCrew_id}")
    public CMC update(
            @PathVariable("shipCrew_id") ShipCrew shipCrew,
            @RequestBody CMC cmc
    )
    {
        cmc.setShipCrew(shipCrew);
        cmc.setIs_active(false);
        return cmcRepo.save(cmc);
    }

    @DeleteMapping("delete/{shipCrew_id}")
    public void delete(
            @PathVariable("shipCrew_id") ShipCrew shipCrew,
            @RequestBody CMC cmc
    )
    {
        cmc.setShipCrew(shipCrew);
        cmcRepo.delete(cmc);
    }
}
