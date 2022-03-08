package aviation.database.repo;

import aviation.database.domain.CMC;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface CMCRepo extends JpaRepository<CMC, String> {
    List<CMC> getCMCSByShipCrew_Id(Long shipCrew_id);
}
