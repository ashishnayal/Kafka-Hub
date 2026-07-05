package com.kafkahub.backend.seeder;

import com.kafkahub.backend.model.InterviewQuestion;
import com.kafkahub.backend.model.Lesson;
import com.kafkahub.backend.model.Topic;
import com.kafkahub.backend.repository.InterviewQuestionRepository;
import com.kafkahub.backend.repository.LessonRepository;
import com.kafkahub.backend.repository.TopicRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

import java.util.Arrays;
import java.util.List;

@Component
@RequiredArgsConstructor
public class DataSeeder implements CommandLineRunner {

    private final TopicRepository topicRepository;
    private final LessonRepository lessonRepository;
    private final InterviewQuestionRepository questionRepository;

    @Override
    public void run(String... args) throws Exception {
        if (topicRepository.count() == 0) {
            seedData();
        }
    }

    private void seedData() {
        // --- TOPICS ---
        Topic history = new Topic();
        history.setTitle("History & Evolution");
        history.setDescription("Learn how Kafka originated at LinkedIn and evolved into an Apache project.");
        history.setOrder(1);

        Topic architecture = new Topic();
        architecture.setTitle("Core Architecture & Concepts");
        architecture.setDescription("Understand Brokers, Topics, Partitions, Replicas, and KRaft.");
        architecture.setOrder(2);
        
        Topic producersConsumers = new Topic();
        producersConsumers.setTitle("Producers & Consumers");
        producersConsumers.setDescription("Deep dive into publishing data, consuming data, Consumer Groups, and Offsets.");
        producersConsumers.setOrder(3);

        Topic advanced = new Topic();
        advanced.setTitle("Advanced Ecosystem");
        advanced.setDescription("Explore Kafka Streams, Kafka Connect, KSQL, and Exactly-Once Semantics.");
        advanced.setOrder(4);

        topicRepository.saveAll(Arrays.asList(history, architecture, producersConsumers, advanced));

        // --- LESSONS: History ---
        Lesson discovery = new Lesson();
        discovery.setTopicId(history.getId());
        discovery.setTitle("Discovery at LinkedIn");
        discovery.setContent("Apache Kafka was originally developed at LinkedIn in 2011 by Jay Kreps, Neha Narkhede, and Jun Rao. The goal was to solve the problem of low-latency ingestion of massive amounts of event data from the LinkedIn website (like page views and interactions) into a lambda architecture that could handle both real-time processing and batch analytics. Traditional messaging queues like ActiveMQ were too slow and couldn't scale to their needs.");
        discovery.setUseCases(Arrays.asList("High-throughput log aggregation", "Website activity tracking"));
        discovery.setOrder(1);

        Lesson evolution = new Lesson();
        evolution.setTopicId(history.getId());
        evolution.setTitle("Evolution to Apache Software Foundation");
        evolution.setContent("Kafka was open-sourced in early 2011 and graduated from the Apache Incubator in October 2012. Since then, it has evolved from a simple messaging queue into a full-fledged Event Streaming Platform. Today, it handles trillions of events a day for thousands of companies including Netflix, Uber, and Spotify.");
        evolution.setOrder(2);

        // --- LESSONS: Architecture ---
        Lesson brokers = new Lesson();
        brokers.setTopicId(architecture.getId());
        brokers.setTitle("Brokers and Clusters");
        brokers.setContent("A Kafka cluster is made up of multiple servers called **Brokers**. Each broker stores data and serves client requests. Brokers are identified by an integer ID. A single broker can handle hundreds of thousands of reads and writes per second and thousands of partitions.");
        brokers.setCodeExample("bin/kafka-topics.sh --describe --topic my-topic --bootstrap-server kafka:9092");
        brokers.setOrder(1);

        Lesson topicsAndPartitions = new Lesson();
        topicsAndPartitions.setTopicId(architecture.getId());
        topicsAndPartitions.setTitle("Topics, Partitions, and Offsets");
        topicsAndPartitions.setContent("A **Topic** is a category or feed name. Topics are split into **Partitions** for horizontal scalability. Each message within a partition gets an incremental ID, called an **Offset**. Offsets only have meaning within a specific partition, guaranteeing ordering only at the partition level, not the topic level.");
        topicsAndPartitions.setUseCases(Arrays.asList("Organizing different data streams", "Scaling operations by increasing partition count"));
        topicsAndPartitions.setCodeExample("bin/kafka-topics.sh --create --topic my-topic --bootstrap-server kafka:9092 --partitions 3 --replication-factor 1");
        topicsAndPartitions.setOrder(2);
        
        Lesson replicas = new Lesson();
        replicas.setTopicId(architecture.getId());
        replicas.setTitle("Replication and ISR");
        replicas.setContent("To guarantee data durability in case a broker fails, partitions are replicated across multiple brokers. The **Replication Factor** determines how many copies exist. One broker acts as the **Leader** for a partition (handling all reads/writes), while others are **Followers** that passively replicate the data. Followers that are fully caught up with the leader are in the **In-Sync Replica (ISR)** list.");
        replicas.setOrder(3);

        // --- LESSONS: Producers & Consumers ---
        Lesson producers = new Lesson();
        producers.setTopicId(producersConsumers.getId());
        producers.setTitle("Publishing Data (Producers)");
        producers.setContent("Producers write data to topics. When writing, they can optionally specify a **Key**. If a key is provided, the producer hashes it to determine the partition. This guarantees that all messages with the same key go to the same partition (e.g., all events for 'user_123' go to partition 2). Producers also specify **Acks**: `acks=0` (fire and forget), `acks=1` (wait for leader), or `acks=all` (wait for all ISRs).");
        producers.setCodeExample(
            "echo \"hello world\" | bin/kafka-console-producer.sh --topic my-topic --bootstrap-server kafka:9092"
        );
        producers.setOrder(1);
        
        Lesson consumers = new Lesson();
        consumers.setTopicId(producersConsumers.getId());
        consumers.setTitle("Consuming Data and Consumer Groups");
        consumers.setContent("Consumers read data from topics. They automatically poll brokers for new messages. A **Consumer Group** is a set of consumers cooperating to consume a topic. Kafka assigns each partition to exactly one consumer within the group. If a consumer dies, Kafka triggers a **Rebalance** to reassign its partitions to the remaining consumers.");
        consumers.setCodeExample(
            "bin/kafka-console-consumer.sh --topic my-topic --from-beginning --bootstrap-server kafka:9092"
        );
        consumers.setOrder(2);

        // --- LESSONS: Advanced ---
        Lesson streams = new Lesson();
        streams.setTopicId(advanced.getId());
        streams.setTitle("Kafka Streams API");
        streams.setContent("Kafka Streams is a client library for building real-time applications and microservices. It allows you to process data directly from Kafka topics, perform transformations (map, filter, aggregate, join), and write the results back to Kafka. It supports stateful operations using local RocksDB stores.");
        streams.setOrder(1);
        
        Lesson connect = new Lesson();
        connect.setTopicId(advanced.getId());
        connect.setTitle("Kafka Connect");
        connect.setContent("Kafka Connect is a tool for scalably and reliably streaming data between Apache Kafka and other systems. **Source Connectors** import data from external systems (like a MySQL database or Twitter feed) into Kafka. **Sink Connectors** export data from Kafka to external systems (like Elasticsearch or S3).");
        connect.setOrder(2);

        lessonRepository.saveAll(Arrays.asList(discovery, evolution, brokers, topicsAndPartitions, replicas, producers, consumers, streams, connect));

        // --- INTERVIEW QUESTIONS ---
        List<InterviewQuestion> questions = Arrays.asList(
            new InterviewQuestion("What is Apache Kafka?", "A distributed event streaming platform designed to handle high volumes of real-time data, acting as a highly scalable publish-subscribe system.", "Beginner", "General"),
            new InterviewQuestion("What is the role of Zookeeper in Kafka?", "Historically used to coordinate the cluster, elect leaders, and store metadata. Kafka 2.8+ introduced KRaft to remove Zookeeper and make Kafka self-managed.", "Beginner", "Architecture"),
            new InterviewQuestion("Explain Topics, Partitions, and Offsets.", "A Topic is a data feed category. It is split into Partitions for parallelism. Each message inside a partition is assigned a sequential ID called an Offset.", "Beginner", "Architecture"),
            new InterviewQuestion("How does Kafka guarantee message ordering?", "Kafka only guarantees ordering within a single Partition. To order related events (like transactions for a specific user), you must produce them with the same 'Key' so they route to the same partition.", "Intermediate", "Producers"),
            new InterviewQuestion("What is a Consumer Group?", "A group of consumers that cooperate to consume a topic. Each partition is assigned to exactly one consumer in the group, enabling horizontal scalability.", "Intermediate", "Consumers"),
            new InterviewQuestion("What happens during a Consumer Rebalance?", "When a consumer joins or leaves a group (or a partition is added), Kafka reassigns partitions among the active consumers to ensure all partitions are being read exactly once.", "Intermediate", "Consumers"),
            new InterviewQuestion("Explain Producer Acknowledgment (acks).", "'acks=0' means the producer doesn't wait for confirmation. 'acks=1' waits for the Leader broker to acknowledge. 'acks=all' waits for the Leader and all In-Sync Replicas (ISR) to acknowledge, providing the highest durability.", "Intermediate", "Producers"),
            new InterviewQuestion("What is an In-Sync Replica (ISR)?", "A follower replica that is fully caught up with the leader. If the leader fails, only a replica from the ISR list can be elected as the new leader to prevent data loss.", "Advanced", "Architecture"),
            new InterviewQuestion("What is a Log Segment in Kafka?", "Partitions are physically stored as a set of Log Segments on disk. When a segment reaches a certain size (default 1GB), it is closed and a new segment is created. This allows Kafka to efficiently delete old data (retention).", "Advanced", "Storage"),
            new InterviewQuestion("What is the difference between Kafka Streams and Kafka Connect?", "Kafka Connect is used to integrate Kafka with external systems (like DBs or S3) without writing code. Kafka Streams is a Java library used to write applications that process and transform data flowing through Kafka.", "Advanced", "Ecosystem"),
            new InterviewQuestion("What are Exactly-Once Semantics (EOS)?", "A guarantee that a stream processing application will process each message exactly once, even in the event of failures. Kafka achieves this using Idempotent Producers and Transactional APIs.", "Advanced", "Producers"),
            new InterviewQuestion("How does Log Compaction work?", "Instead of deleting old messages based on time, Log Compaction ensures that Kafka retains at least the last known value for each message key in a topic. It is useful for state stores, like maintaining a user profile table.", "Advanced", "Storage")
        );
        questionRepository.saveAll(questions);
    }
}
