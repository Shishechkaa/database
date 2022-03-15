package aviation.database.repo;

import aviation.database.domain.Candidate;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface CandidateRepo extends JpaRepository<Candidate, Long> {
}
