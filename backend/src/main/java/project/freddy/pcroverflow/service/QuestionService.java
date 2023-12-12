package project.freddy.pcroverflow.service;

import project.freddy.pcroverflow.model.Question;

import java.util.List;

public interface QuestionService {
    List<Question> getAll();
    Question getById(Integer id);

    void create(Question question);
    void update(Question question);
    void delete(Integer id);

}
