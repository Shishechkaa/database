package aviation.database.domain;

import lombok.Data;

import javax.persistence.Entity;
import javax.persistence.Table;

@Entity
@Table
@Data
public class Candidate extends Human{
    private String debts;
    private Boolean approved;
}
