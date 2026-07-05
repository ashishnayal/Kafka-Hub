package com.kafkahub.backend.controller;

import com.kafkahub.backend.model.Lesson;
import com.kafkahub.backend.model.Topic;
import com.kafkahub.backend.repository.LessonRepository;
import com.kafkahub.backend.repository.TopicRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/topics")
@RequiredArgsConstructor
public class TopicController {

    private final TopicRepository topicRepository;
    private final LessonRepository lessonRepository;

    @GetMapping
    public ResponseEntity<List<Topic>> getAllTopics() {
        return ResponseEntity.ok(topicRepository.findAllByOrderByOrderAsc());
    }

    @GetMapping("/{id}/lessons")
    public ResponseEntity<List<Lesson>> getLessonsForTopic(@PathVariable String id) {
        return ResponseEntity.ok(lessonRepository.findByTopicIdOrderByOrderAsc(id));
    }

    @GetMapping("/lessons/{lessonId}")
    public ResponseEntity<Lesson> getLessonDetails(@PathVariable String lessonId) {
        return lessonRepository.findById(lessonId)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }
}
