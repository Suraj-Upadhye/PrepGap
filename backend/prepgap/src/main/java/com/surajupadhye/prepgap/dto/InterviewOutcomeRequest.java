package com.surajupadhye.prepgap.dto;

import com.surajupadhye.prepgap.interview.ExperienceType;
import com.surajupadhye.prepgap.interview.InterviewResult;
import com.surajupadhye.prepgap.interview.Resource;
import lombok.Data;
import java.util.List;

@Data
public class InterviewOutcomeRequest {
    private String company;
    private String role;
    private ExperienceType experienceType;

    // Detailed signals
    private Integer totalInterviewStages;
    private String interviewStageReached;
    private InterviewResult finalResult;
    private String primaryRejectionReason;

    private List<String> failedSkillTags;
    private List<String> overestimatedTopics;
    private Integer selfConfidenceLevel;

    private List<Resource> candidateResources;
    private String tipsForJuniors;

    private List<InterviewStageRequest> stages;

    // Student Context
    private Integer interviewYear;
    private Integer graduationYear;
    private String department;
}