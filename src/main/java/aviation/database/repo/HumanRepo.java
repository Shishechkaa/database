package aviation.database.repo;

import aviation.database.domain.Human;
import org.springframework.data.jpa.repository.JpaRepository;

public interface HumanRepo extends JpaRepository<Human, Long> {
}