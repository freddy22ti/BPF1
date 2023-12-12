package project.freddy.pcroverflow.service.impl;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import project.freddy.pcroverflow.mapper.QuestionMapper;
import project.freddy.pcroverflow.model.Question;
import project.freddy.pcroverflow.service.QuestionService;

import java.util.List;

@Service
public class QuestionServiceImpl  implements QuestionService {
//    @Autowired
    private QuestionMapper questionMapper;

    public QuestionServiceImpl() {

    }

    @Override
    public List<Question> getAll() {
        return null;
    }

    @Override
    public Question getById(Integer id) {
        return null;
    }

    @Override
    public void create(Question question) {

    }

    @Override
    public void update(Question question) {

    }

    @Override
    public void delete(Integer id) {

    }
}
