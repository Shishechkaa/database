package aviation.database.repo;

import aviation.database.domain.ShipCrew;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

public interface ShipCrewRepo extends JpaRepository<ShipCrew, Long> {
}
