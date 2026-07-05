package com.kafkahub.backend.model;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;
import lombok.Data;

@Data
@Document(collection = "topics")
public class Topic {
    @Id
    private String id;
    private String title;
    private String description;
    private int order;
}
