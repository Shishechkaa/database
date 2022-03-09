package aviation.database.repo;

import aviation.database.domain.CMC;
import aviation.database.domain.Certificate;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface CertificateRepo extends JpaRepository<Certificate, String> {
    List<Certificate> findAllByCmc(CMC cmc);
}
