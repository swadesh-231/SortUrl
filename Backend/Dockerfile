# =========================
# Stage 1 — Build Stage
# =========================
FROM gradle:8.7-jdk21 AS build

WORKDIR /app

# Copy only necessary files first (better caching)
COPY build.gradle settings.gradle gradlew ./
COPY gradle ./gradle

# Download dependencies first (cache layer)
RUN ./gradlew dependencies --no-daemon

# Copy source code
COPY src ./src

# Build the jar
RUN ./gradlew clean bootJar --no-daemon

# =========================
# Stage 2 — Run Stage
# =========================
FROM eclipse-temurin:21-jre-alpine

WORKDIR /app

# Copy built jar from build stage
COPY --from=build /app/build/libs/*.jar app.jar

EXPOSE 8080

ENTRYPOINT ["java", "-jar", "app.jar"]
