package aviation.database.controller;

import aviation.database.domain.Candidate;
import aviation.database.repo.CandidateRepo;
import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("candidate")
public class CandidateController {
    private final CandidateRepo candidateRepo;

    @Autowired
    public CandidateController(CandidateRepo candidateRepo) {
        this.candidateRepo = candidateRepo;
    }

    @GetMapping
    public List<Candidate> list() {
        return candidateRepo.findAll();
    }

    @GetMapping("{id}")
    public Candidate getOne (@PathVariable("id") Candidate member) {
        return member;
    }

    @PostMapping
    public Candidate create(@RequestBody Candidate member) {
        return candidateRepo.save(member);
    }

    @PutMapping("{id}")
    public Candidate update (
            @PathVariable("id") Candidate memberFromDB,
            @RequestBody Candidate member
    ) {
        BeanUtils.copyProperties(member, memberFromDB, "id");
        return candidateRepo.save(memberFromDB);
    }

    @DeleteMapping("{id}")
    public void delete(@PathVariable("id") Candidate member) {
        candidateRepo.delete(member);
    }
}
