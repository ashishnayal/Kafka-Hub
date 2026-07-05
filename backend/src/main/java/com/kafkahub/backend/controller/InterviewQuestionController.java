package com.kafkahub.backend.controller;

import com.kafkahub.backend.model.InterviewQuestion;
import com.kafkahub.backend.repository.InterviewQuestionRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/interview-questions")
@RequiredArgsConstructor
public class InterviewQuestionController {

    private final InterviewQuestionRepository repository;

    @GetMapping
    public ResponseEntity<List<InterviewQuestion>> getAllQuestions(
            @RequestParam(required = false) String difficulty,
            @RequestParam(required = false) String category) {
        
        if (difficulty != null) {
            return ResponseEntity.ok(repository.findByDifficulty(difficulty));
        } else if (category != null) {
            return ResponseEntity.ok(repository.findByCategory(category));
        }
        return ResponseEntity.ok(repository.findAll());
    }
}
