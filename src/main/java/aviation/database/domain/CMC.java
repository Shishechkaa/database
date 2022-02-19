package aviation.database.domain;

import lombok.Data;

import javax.persistence.*;
import java.sql.Date;

@Entity
@Table
@Data
public class CMC {
    private String application_number;
    private Date application_date;
    @Id
    private String cmc_number;
    private Date cmc_start_date;
    private Date cmc_end_date;
    private Date cmc_return_date;
    private Boolean is_active;

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "ship_crew_id")
    private ShipCrew shipCrew;
}
