package aviation.database.domain;

import org.hibernate.Hibernate;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import java.sql.Date;
import java.util.Objects;

@Entity
public class Human {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;
    private String first_name;
    private String second_name;
    private String third_name;
    private String first_name_foreign;
    private String second_name_foreign;
    private String position;
    private String division;
    private String citizenship;
    private Date birth_date;
    private String last_work;

    public Human() {

    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getFirst_name() {
        return first_name;
    }

    public void setFirst_name(String first_name) {
        this.first_name = first_name;
    }

    public String getSecond_name() {
        return second_name;
    }

    public void setSecond_name(String second_name) {
        this.second_name = second_name;
    }

    public String getThird_name() {
        return third_name;
    }

    public void setThird_name(String third_name) {
        this.third_name = third_name;
    }

    public String getFirst_name_foreign() {
        return first_name_foreign;
    }

    public void setFirst_name_foreign(String first_name_foreign) {
        this.first_name_foreign = first_name_foreign;
    }

    public String getSecond_name_foreign() {
        return second_name_foreign;
    }

    public void setSecond_name_foreign(String second_name_foreign) {
        this.second_name_foreign = second_name_foreign;
    }

    public String getPosition() {
        return position;
    }

    public void setPosition(String position) {
        this.position = position;
    }

    public String getDivision() {
        return division;
    }

    public void setDivision(String division) {
        this.division = division;
    }

    public String getCitizenship() {
        return citizenship;
    }

    public void setCitizenship(String citizenship) {
        this.citizenship = citizenship;
    }

    public Date getBirth_date() {
        return birth_date;
    }

    public void setBirth_date(Date birth_date) {
        this.birth_date = birth_date;
    }

    public String getLast_work() {
        return last_work;
    }

    public void setLast_work(String last_work) {
        this.last_work = last_work;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || Hibernate.getClass(this) != Hibernate.getClass(o)) return false;
        Human human = (Human) o;
        return id != null && Objects.equals(id, human.id);
    }

    @Override
    public int hashCode() {
        return getClass().hashCode();
    }
}
