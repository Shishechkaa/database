package aviation.database.domain;

import lombok.Data;

import javax.persistence.Entity;

@Data
@Entity
public class HumanCandidate extends Human{
    private String debts;
    private Boolean approved;
}
