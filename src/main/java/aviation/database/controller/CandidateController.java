package aviation.database.controller;

import aviation.database.domain.Candidate;
import aviation.database.domain.Human;
import aviation.database.domain.SupCandidate;
import aviation.database.repo.CandidateRepo;
import aviation.database.repo.HumanRepo;
import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

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
    public List<SupCandidate> list() {
        List<SupCandidate> SupCandidateList = new ArrayList<>();
        candidateRepo.findAll().stream().forEach(candidate -> {
          Human human = humanRepo.getById(candidate.getId());
          SupCandidate supCandidate = new SupCandidate();
          BeanUtils.copyProperties(candidate, supCandidate);
          BeanUtils.copyProperties(human, supCandidate);
          SupCandidateList.add(supCandidate);
        });
        return SupCandidateList;
    }

    @PostMapping
    public SupCandidate create(@RequestBody SupCandidate member) {
        Human human = new Human();
        BeanUtils.copyProperties(member, human);
        human = humanRepo.save(human);
        Candidate candidate = new Candidate(human);
        BeanUtils.copyProperties(member, candidate, "id");
        candidate = candidateRepo.save(candidate);
        BeanUtils.copyProperties(candidate, member);
        BeanUtils.copyProperties(human, member);
        return member;
    }

    @PutMapping(value = "search")
    public List<SupCandidate> search(@RequestBody SupCandidate member) {
        List<SupCandidate> SupCandidateList = new ArrayList<>();
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
            SupCandidate supCandidate = new SupCandidate();
            BeanUtils.copyProperties(candidate, supCandidate);
            BeanUtils.copyProperties(human, supCandidate);
            SupCandidateList.add(supCandidate);
        });
        return SupCandidateList;
    }

    @PutMapping("{id}")
    public SupCandidate update (
            @PathVariable("id") Human memberFromDB,
            @RequestBody SupCandidate member
    ) {
        BeanUtils.copyProperties(member, memberFromDB, "id");
        Candidate candidate = new Candidate(memberFromDB);
        BeanUtils.copyProperties(member, candidate, "id");
        BeanUtils.copyProperties(memberFromDB, candidate);
        candidate = candidateRepo.save(candidate);
        memberFromDB = humanRepo.save(memberFromDB);
        SupCandidate supCandidate = new SupCandidate();
        BeanUtils.copyProperties(candidate, supCandidate);
        BeanUtils.copyProperties(memberFromDB, supCandidate);
        return supCandidate;
    }

    @DeleteMapping("delete/{id}")
    public void delete(@PathVariable("id") Candidate member) {
        candidateRepo.delete(member);
        humanRepo.delete(member.getHuman());
    }
}
