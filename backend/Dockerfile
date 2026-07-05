FROM maven:3.9-eclipse-temurin-17-alpine AS build
WORKDIR /app
COPY pom.xml .
COPY src src
RUN mvn clean package -DskipTests

FROM eclipse-temurin:17-jre-alpine
WORKDIR /app
COPY --from=build /app/target/*.jar app.jar

RUN apk update && apk add bash curl tar && \
    curl -O https://archive.apache.org/dist/kafka/3.7.0/kafka_2.13-3.7.0.tgz && \
    tar -xzf kafka_2.13-3.7.0.tgz && \
    mv kafka_2.13-3.7.0 /opt/kafka && \
    rm kafka_2.13-3.7.0.tgz

EXPOSE 8080
ENTRYPOINT ["java","-jar","app.jar"]
