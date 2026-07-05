package com.kafkahub.backend.model;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;
import lombok.Data;
import java.util.List;

@Data
@Document(collection = "lessons")
public class Lesson {
    @Id
    private String id;
    private String topicId;
    private String title;
    private String content;
    private String codeExample;
    private List<String> useCases;
    private int order;
}
