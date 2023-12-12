package project.freddy.pcroverflow.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import project.freddy.pcroverflow.model.Question;
import project.freddy.pcroverflow.model.Result;
import project.freddy.pcroverflow.service.QuestionService;
import project.freddy.pcroverflow.service.impl.QuestionServiceImpl;

import java.util.List;

@RestController
@RequestMapping("/question")
public class QuestionController {
    @Autowired
    QuestionService questionService = new QuestionServiceImpl();

    @GetMapping("/")
    public Result getAll() {
        List<Question> questionList = questionService.getAll();
        return Result.success(questionList);
    }

    @GetMapping("/{id}")
    public Result getQuestion(@PathVariable Integer id) {
        Question question = questionService.getById(id);
        return Result.success(question);
    }

    @PostMapping("/")
    public Result create() {
        return Result.success();
    }

    @DeleteMapping("/{id}")
    public Result delete() {
        return Result.success();
    }
}
