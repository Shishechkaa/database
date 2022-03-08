package aviation.database.domain;

import com.fasterxml.jackson.annotation.JsonIgnore;
import org.hibernate.annotations.OnDelete;
import org.hibernate.annotations.OnDeleteAction;

import javax.persistence.*;
import java.sql.Date;

@Entity
@Table
public class OrderDoc {
    @Id
    private String order_number;
    private Date order_date;
    private String order_type;

    @ManyToOne
    @OnDelete(action = OnDeleteAction.CASCADE)
    @JoinColumn(name = "ship_crew_id")
    @JsonIgnore
    private ShipCrew shipCrew;

    public OrderDoc() {
    }

    public String getOrder_number() {
        return order_number;
    }

    public void setOrder_number(String order_number) {
        this.order_number = order_number;
    }

    public Date getOrder_date() {
        return order_date;
    }

    public void setOrder_date(Date order_date) {
        this.order_date = order_date;
    }

    public String getOrder_type() {
        return order_type;
    }

    public void setOrder_type(String order_type) {
        this.order_type = order_type;
    }

    public ShipCrew getShipCrew() {
        return shipCrew;
    }

    public void setShipCrew(ShipCrew shipCrew) {
        this.shipCrew = shipCrew;
    }
}
