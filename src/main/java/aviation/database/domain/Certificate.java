package aviation.database.domain;

import com.fasterxml.jackson.annotation.JsonIgnore;
import org.hibernate.annotations.Fetch;
import org.hibernate.annotations.OnDelete;
import org.hibernate.annotations.OnDeleteAction;

import javax.persistence.*;
import java.sql.Date;

@Entity
@Table
public class Certificate {
    @Id
    private String certificate_number;
    private Date certificate_date;
    private String certificate_type;

    @ManyToOne(fetch = FetchType.LAZY)
    @OnDelete(action = OnDeleteAction.CASCADE)
    @JoinColumn(name = "cmc_number")
    @JsonIgnore
    private CMC cmc;

    public Certificate() {
    }

    public String getCertificate_number() {
        return certificate_number;
    }

    public void setCertificate_number(String certificate_number) {
        this.certificate_number = certificate_number;
    }

    public Date getCertificate_date() {
        return certificate_date;
    }

    public void setCertificate_date(Date certificate_date) {
        this.certificate_date = certificate_date;
    }

    public String getCertificate_type() {
        return certificate_type;
    }

    public void setCertificate_type(String certificate_type) {
        this.certificate_type = certificate_type;
    }

    public CMC getCmc() {
        return cmc;
    }

    public void setCmc(CMC cmc) {
        this.cmc = cmc;
    }
}
