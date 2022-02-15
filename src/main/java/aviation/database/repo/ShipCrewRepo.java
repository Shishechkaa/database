package aviation.database.repo;

import aviation.database.domain.ShipCrew;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ShipCrewRepo extends JpaRepository<ShipCrew, Long> {
}
