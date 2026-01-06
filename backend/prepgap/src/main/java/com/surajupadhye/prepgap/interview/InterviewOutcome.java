package com.surajupadhye.prepgap.interview;

import lombok.Data;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.time.Instant;
import java.util.List;

@Data
@Document(collection = "interview_outcomes")
public class InterviewOutcome {

    @Id
    private String id;

    // Company Info
    private String company;
    private String role;
    private ExperienceType experienceType;

    // Interview Structure
    private Integer totalInterviewStages;
    private String interviewStageReached;

    // Final Outcome
    private InterviewResult finalResult;
    private String primaryRejectionReason;

    // Skill Signals
    private List<String> failedSkillTags;
    private List<String> overestimatedTopics;
    private Integer selfConfidenceLevel; // 1–5

    // Stage-wise details
    private List<InterviewStageOutcome> stages;

    // Context
    private String department;
    private Integer interviewYear;
    private Integer graduationYear;

    // Metadata (INTERNAL ONLY)
    private String submittedByUserId;

    private Instant createdAt = Instant.now();
}
