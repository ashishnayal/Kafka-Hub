package com.kafkahub.backend.repository;

import com.kafkahub.backend.model.Topic;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface TopicRepository extends MongoRepository<Topic, String> {
    List<Topic> findAllByOrderByOrderAsc();
}
