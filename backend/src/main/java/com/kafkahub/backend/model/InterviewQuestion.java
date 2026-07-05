package com.kafkahub.backend.model;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@Document(collection = "interview_questions")
public class InterviewQuestion {
    @Id
    private String id;
    private String question;
    private String answer;
    private String difficulty; // Easy, Medium, Hard
    private String category; // Broker, Consumer, Zookeeper, General

    public InterviewQuestion(String question, String answer, String difficulty, String category) {
        this.question = question;
        this.answer = answer;
        this.difficulty = difficulty;
        this.category = category;
    }
}
