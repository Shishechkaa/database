package aviation.database.domain;

import lombok.Data;

import javax.persistence.*;

@Entity
@Table
@Data
public class Candidate {
    @Id
    private Long id;

    @OneToOne(fetch = FetchType.LAZY)
    @MapsId
    private Human human;

    private String debts;
    private Boolean approved;
}
