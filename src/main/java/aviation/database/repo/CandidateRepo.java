package aviation.database.repo;

import aviation.database.domain.Candidate;
import org.springframework.data.jpa.repository.JpaRepository;

public interface CandidateRepo extends JpaRepository<Candidate, Long> {
}
