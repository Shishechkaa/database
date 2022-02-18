package aviation.database.domain;

import lombok.Data;

import javax.persistence.*;

@Entity
@Table
@Data
public class ShipCrew {
    @Id
    private Long id;

    @OneToOne(fetch = FetchType.LAZY)
    @MapsId
    private Human human;
}
