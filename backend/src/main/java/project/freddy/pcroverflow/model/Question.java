package project.freddy.pcroverflow.model;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import lombok.Data;

import java.time.LocalDateTime;

@Data
@Entity
public class Question {
    @Id
    @GeneratedValue(strategy=GenerationType.AUTO)
    private  Integer id;
    private Integer userId;
    private  String title;
    private String description;
    private LocalDateTime createTime;
    private LocalDateTime updateTime;

}
