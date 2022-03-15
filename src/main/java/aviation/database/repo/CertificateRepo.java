package aviation.database.repo;

import aviation.database.domain.CMC;
import aviation.database.domain.Certificate;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface CertificateRepo extends JpaRepository<Certificate, String> {
    @Query("select c from Certificate c where c.cmc = ?1")
    List<Certificate> findAllByCmc(CMC cmc);
}
