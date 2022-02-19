package aviation.database.domain;

import lombok.Data;
import org.springframework.beans.BeanUtils;

import javax.persistence.*;
import java.sql.Date;

@Entity
@Data
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
}
