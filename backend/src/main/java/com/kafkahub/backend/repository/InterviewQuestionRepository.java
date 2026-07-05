package com.kafkahub.backend.repository;

import com.kafkahub.backend.model.InterviewQuestion;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface InterviewQuestionRepository extends MongoRepository<InterviewQuestion, String> {
    List<InterviewQuestion> findByCategory(String category);
    List<InterviewQuestion> findByDifficulty(String difficulty);
}
