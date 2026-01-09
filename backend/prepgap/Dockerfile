# --- Build Stage ---
FROM maven:3.9-eclipse-temurin-21 AS build
WORKDIR /app

# Copy the project files
COPY pom.xml .
COPY src ./src

# Build the application (skipping tests to speed up deployment)
RUN mvn clean package -DskipTests

# --- Run Stage ---
FROM eclipse-temurin:21-jdk
WORKDIR /app

# Copy the built JAR file from the build stage
# The wildcard *.jar ensures it works even if version changes
COPY --from=build /app/target/*.jar app.jar

# Expose the port Render expects
EXPOSE 8080

# Command to run the application
ENTRYPOINT ["java", "-jar", "app.jar"]