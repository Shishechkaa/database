package aviation.database.controller;

import aviation.database.domain.OrderDoc;
import aviation.database.domain.ShipCrew;
import aviation.database.repo.OrderDocRepo;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("order")
public class OrderController {
    private final OrderDocRepo orderRepo;

    public OrderController (OrderDocRepo orderRepo) {
        this.orderRepo = orderRepo;
    }

    @GetMapping("{shipCrew_id}")
    public List<OrderDoc> get(@PathVariable Long shipCrew_id) {
        return orderRepo.getOrderDocsByShipCrew_Id(shipCrew_id);
    }

    @PostMapping("{shipCrew_id}")
    public OrderDoc create(
            @PathVariable("shipCrew_id") ShipCrew shipCrew,
            @RequestBody OrderDoc order
    ) {
        order.setShipCrew(shipCrew);
        OrderDoc test = orderRepo.save(order);
        return test;
    }

    @DeleteMapping
    public void delete(@RequestBody OrderDoc order) {
        orderRepo.delete(order);
    }
}
