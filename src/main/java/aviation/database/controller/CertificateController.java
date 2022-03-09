package aviation.database.controller;

import aviation.database.domain.CMC;
import aviation.database.domain.Certificate;
import aviation.database.repo.CertificateRepo;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("certificate")
public class CertificateController {
    private final CertificateRepo certificateRepo;

    public CertificateController(CertificateRepo certificateRepo) {
        this.certificateRepo = certificateRepo;
    }

    @GetMapping("{cmc_number}")
    public List<Certificate> get(@PathVariable("cmc_number") CMC cmc) {
        return certificateRepo.findAllByCmc(cmc);
    }

    @PostMapping("{cmc_number}")
    public Certificate create(
            @PathVariable("cmc_number") CMC cmc,
            @RequestBody Certificate certificate)
    {
        certificate.setCmc(cmc);
        return certificateRepo.save(certificate);
    }

    @DeleteMapping("delete")
    public void delete(@RequestBody Certificate certificate) {
        certificateRepo.delete(certificate);
    }
}
