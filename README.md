<div align="center">
  <img src="https://img.icons8.com/color/144/000000/apache-kafka.png" alt="Kafka Logo" width="100"/>
  <h1>Kafka Hub Sandbox</h1>
  <p><strong>The ultimate platform for mastering Apache Kafka and acing system design interviews.</strong></p>
</div>

<br/>

Kafka Hub is an interactive, full-stack learning platform designed specifically for developers and data engineers. Instead of spending hours configuring JVMs, Zookeeper, and path variables, Kafka Hub provides a complete Kafka ecosystem out of the box—complete with interactive lessons, a real live terminal sandbox, and curated interview questions.

---

## 🚀 Features

- **Live Terminal Sandbox**: A web-based terminal emulator hooked up directly to a real Apache Kafka 3.7.0 broker running in KRaft mode. Safely practice commands like `kafka-topics.sh` and `kafka-console-producer.sh` right in your browser.
- **Interactive Workflow**: A step-by-step interactive cheatsheet that guides you through the entire Kafka lifecycle (creating topics, producing, consuming, describing, deleting).
- **Core Architectural Lessons**: Comprehensive lessons covering the history of Kafka at LinkedIn, Broker architecture, Zookeeper vs. KRaft, Partitions, Consumer Groups, and exactly-once semantics.
- **Interview Prep Dashboard**: A dedicated portal featuring over 15+ highly curated interview questions, ranging from absolute beginner basics to advanced system design concepts (e.g. In-Sync Replicas, Log Compaction, Producer Acks).
- **Beautiful UI**: Built with Next.js, Framer Motion, and Tailwind CSS for a premium, dark-mode-first aesthetic.

---

## 🎯 How It Helps You Ace Your Interview

If you have a data engineering or backend system design interview coming up, Kafka Hub is your secret weapon:

1. **Bridge the gap between Theory and Practice**: Reading about Consumer Groups is one thing; actually executing `kafka-console-consumer.sh` and watching the messages flow in real-time solidifies your understanding. Interviewers can tell when you have practical experience.
2. **System Design Readiness**: Our lessons go beyond the basics. We cover *why* Kafka was built, how it guarantees ordering (or why it doesn't globally), and how it achieves high durability using ISRs (In-Sync Replicas). 
3. **Rapid Revision**: The **Interview Prep** tab is specifically structured as a flashcard-style Q&A, allowing you to rapidly revise complex concepts just minutes before your technical screen.
4. **No Setup Friction**: You can jump straight into learning the concepts that matter for the interview, rather than wasting your weekend debugging Docker networking or Java versions.

---

## 🛠️ Technology Stack

- **Frontend**: Next.js (React), Tailwind CSS, Framer Motion, Lucide Icons
- **Backend**: Java 17, Spring Boot 3, Spring Data MongoDB
- **Database**: MongoDB (For persisting lessons and interview questions)
- **Infrastructure**: Docker, Docker Compose, Apache Kafka 3.7.0 (KRaft Mode)

---

## ⚡ Quick Start

Running Kafka Hub locally is incredibly simple. All you need is Docker and Docker Compose installed on your machine.

1. **Clone the repository** (if applicable) and navigate to the root directory.
2. **Start the cluster**:
   ```bash
   docker-compose up -d --build
   ```
3. **Access the application**:
   - Open your browser and navigate to `http://localhost:3000`
   - The backend API runs on `http://localhost:8080`
   - The Kafka broker is available internally to the Docker network at `kafka:9092`

*Note: On first startup, the Spring Boot backend will automatically run a `DataSeeder` to populate your MongoDB instance with all the lessons and interview questions.*

---

## 💡 Using the Terminal

Navigate to the `/terminal` route in the web app to access the Sandbox. Try running:

```bash
# 1. Create a topic
kafka-topics.sh --create --topic my-events --bootstrap-server kafka:9092

# 2. Produce a message
echo "User signed up" | kafka-console-producer.sh --topic my-events --bootstrap-server kafka:9092

# 3. Consume the message
kafka-console-consumer.sh --topic my-events --from-beginning --bootstrap-server kafka:9092
```

Happy Streaming! 🚀
