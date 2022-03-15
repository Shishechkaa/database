package aviation.database.controller;

import aviation.database.domain.Candidate;
import aviation.database.domain.Human;
import aviation.database.repo.CandidateRepo;
import aviation.database.repo.HumanRepo;
import org.springframework.beans.BeanUtils;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;

@RestController
@RequestMapping("candidate")
public class CandidateController {
    private final CandidateRepo candidateRepo;
    private final HumanRepo humanRepo;

    public CandidateController(CandidateRepo candidateRepo, HumanRepo humanRepo) {
        this.humanRepo = humanRepo;
        this.candidateRepo = candidateRepo;
    }

    @GetMapping
    public List<Candidate> list() {
        return candidateRepo.findAll();
    }

    @PostMapping
    public Candidate create(@RequestBody Candidate candidate) {
        Human human = new Human();
        BeanUtils.copyProperties(candidate, human);
        humanRepo.save(human);
        return candidateRepo.save(candidate);
    }

    /*@PutMapping(value = "search")
    public List<Candidate> search(@RequestBody Candidate member) {
        List<Candidate> CandidateList = new ArrayList<>();
        candidateRepo.findAll().stream().filter(candidate -> {
            if(candidate.getHuman().getFirst_name().equals(member.getFirst_name())
                    && (member.getFirst_name() != null && !member.getFirst_name().equals("")))
                return true;
            if(candidate.getHuman().getSecond_name().equals(member.getSecond_name())
                    && (member.getSecond_name() != null && !member.getSecond_name().equals("")))
                return true;
            if(candidate.getHuman().getThird_name().equals(member.getThird_name())
                    && (member.getThird_name() != null && !member.getThird_name().equals("")))
                return true;
            if(candidate.getHuman().getFirst_name_foreign().equals(member.getFirst_name_foreign())
                    && (member.getFirst_name_foreign() != null && !member.getFirst_name_foreign().equals("")))
                return true;
            if(candidate.getHuman().getSecond_name_foreign().equals(member.getSecond_name_foreign())
                    && (member.getSecond_name_foreign() != null && !member.getSecond_name_foreign().equals("")))
                return true;
            if(candidate.getHuman().getPosition().equals(member.getPosition())
                    && (member.getPosition() != null && !member.getPosition().equals("")))
                return true;
            if(candidate.getHuman().getDivision().equals(member.getDivision())
                    && (member.getDivision() != null && !member.getDivision().equals("")))
                return true;
            if(candidate.getHuman().getCitizenship().equals(member.getCitizenship())
                    && (member.getCitizenship() != null && !member.getCitizenship().equals("")))
                return true;
            if(candidate.getHuman().getBirth_date() == member.getBirth_date()
                    && member.getBirth_date() != null)
                return true;
            if(candidate.getHuman().getLast_work().equals(member.getLast_work())
                    && (member.getLast_work() != null && !member.getLast_work().equals("")))
                return true;
            return candidate.getDebts().equals(member.getDebts())
                    && (member.getDebts() != null && !member.getDebts().equals(""));
        }).forEachOrdered(candidate -> {
            Human human = humanRepo.getById(candidate.getId());
            Candidate Candidate = new Candidate();
            BeanUtils.copyProperties(candidate, Candidate);
            BeanUtils.copyProperties(human, Candidate);
            CandidateList.add(Candidate);
        });
        return CandidateList;
    }*/

    @PutMapping("{id}")
    public Candidate update (
            @PathVariable("id") Candidate candidateFromDB,
            @RequestBody Candidate candidate
    ) {
        candidate.getHuman().setId(candidateFromDB.getId());
        BeanUtils.copyProperties(candidate, candidateFromDB, "id");
        return candidateRepo.save(candidateFromDB);
    }

    @DeleteMapping("delete/{id}")
    public void delete(@PathVariable("id") Candidate member) {
        candidateRepo.delete(member);
        humanRepo.delete(member.getHuman());
    }
}
