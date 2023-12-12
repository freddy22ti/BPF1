package project.freddy.pcroverflow.mapper;

import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Select;
import project.freddy.pcroverflow.model.Question;
import java.util.List;

@Mapper
public interface QuestionMapper {
    @Select("SELECT * FROM question")
    public List<Question> list();


}
