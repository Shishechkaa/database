package aviation.database.repo;

import aviation.database.domain.Human;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface HumanRepo extends JpaRepository<Human, Long> {
}