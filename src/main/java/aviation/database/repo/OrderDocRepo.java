package aviation.database.repo;

import aviation.database.domain.OrderDoc;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface OrderDocRepo extends JpaRepository<OrderDoc, String> {
    List<OrderDoc> getOrderDocsByShipCrew_Id(Long ShipCrew_Id);
}
