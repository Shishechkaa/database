package aviation.database.controller;

import aviation.database.domain.Candidate;
import aviation.database.domain.Human;
import aviation.database.repo.CandidateRepo;
import aviation.database.repo.HumanRepo;
import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("candidate")
public class CandidateController {
    private final CandidateRepo candidateRepo;
    private final HumanRepo humanRepo;

    @Autowired
    public CandidateController(CandidateRepo candidateRepo, HumanRepo humanRepo) {
        this.humanRepo = humanRepo;
        this.candidateRepo = candidateRepo;
    }

    @GetMapping
    public List<Human> list() {
        return humanRepo.findAll().stream().filter(human ->
                        candidateRepo.findById(human.getId()).isPresent()).
                collect(Collectors.toList());
    }

    @GetMapping("{id}")
    public Human getOne (@PathVariable("id") Human member) {
        return member;
    }

    @PostMapping
    public Human create(@RequestBody Candidate member) {
        candidateRepo.save(member);
        return humanRepo.save(member.getHuman());
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
