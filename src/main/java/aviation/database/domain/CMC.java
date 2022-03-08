package aviation.database.domain;

import com.fasterxml.jackson.annotation.JsonIgnore;
import org.hibernate.annotations.OnDelete;
import org.hibernate.annotations.OnDeleteAction;

import javax.persistence.*;
import java.sql.Date;

@Entity
@Table(name = "CMC", indexes = {
        @Index(name = "idx_cmc_ship_crew_id", columnList = "ship_crew_id")
})
public class CMC {
    @Id
    private String cmc_number;
    private String application_number;
    private Date application_date;
    private Date cmc_start_date;
    private Date cmc_end_date;
    private Date cmc_return_date;
    private Boolean is_active;

    @ManyToOne
    @OnDelete(action = OnDeleteAction.CASCADE)
    @JoinColumn(name = "ship_crew_id")
    @JsonIgnore
    private ShipCrew shipCrew;

    public CMC() {

    }

    public String getApplication_number() {
        return application_number;
    }

    public void setApplication_number(String application_number) {
        this.application_number = application_number;
    }

    public Date getApplication_date() {
        return application_date;
    }

    public void setApplication_date(Date application_date) {
        this.application_date = application_date;
    }

    public String getCmc_number() {
        return cmc_number;
    }

    public void setCmc_number(String cmc_number) {
        this.cmc_number = cmc_number;
    }

    public Date getCmc_start_date() {
        return cmc_start_date;
    }

    public void setCmc_start_date(Date cmc_start_date) {
        this.cmc_start_date = cmc_start_date;
    }

    public Date getCmc_end_date() {
        return cmc_end_date;
    }

    public void setCmc_end_date(Date cmc_end_date) {
        this.cmc_end_date = cmc_end_date;
    }

    public Date getCmc_return_date() {
        return cmc_return_date;
    }

    public void setCmc_return_date(Date cmc_return_date) {
        this.cmc_return_date = cmc_return_date;
    }

    public Boolean getIs_active() {
        return is_active;
    }

    public void setIs_active(Boolean is_active) {
        this.is_active = is_active;
    }

    public ShipCrew getShipCrew() {
        return shipCrew;
    }

    public void setShipCrew(ShipCrew shipCrew) {
        this.shipCrew = shipCrew;
    }
}
