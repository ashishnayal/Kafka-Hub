package com.kafkahub.backend.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import com.mongodb.client.MongoClient;
import com.mongodb.client.MongoClients;

@Configuration
public class MongoConfig {
    
    @Bean
    public MongoClient mongoClient() {
        String uri = System.getenv("SPRING_DATA_MONGODB_URI");
        if (uri == null || uri.isEmpty()) {
            uri = System.getenv("MONGO_URI");
        }
        if (uri == null || uri.isEmpty()) {
            uri = "mongodb://mongo:27017/kafkahub";
        }
        System.out.println("CUSTOM MONGO CONFIG: Connecting to " + uri);
        return MongoClients.create(uri);
    }
}
