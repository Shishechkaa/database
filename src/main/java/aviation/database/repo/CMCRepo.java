package aviation.database.repo;

import aviation.database.domain.CMC;
import org.springframework.data.jpa.repository.JpaRepository;

public interface CMCRepo extends JpaRepository<CMC, String> {
}
