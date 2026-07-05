package com.kafkahub.backend.repository;

import com.kafkahub.backend.model.Lesson;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface LessonRepository extends MongoRepository<Lesson, String> {
    List<Lesson> findByTopicIdOrderByOrderAsc(String topicId);
}
