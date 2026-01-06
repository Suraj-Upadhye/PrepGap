package com.surajupadhye.prepgap.interview;

import lombok.Data;

import java.util.List;

@Data
public class InterviewStageOutcome {

    private String stageName;           // Aptitude, Tech-1, Tech-2, HR

    private Integer durationMinutes;

    private List<String> topicsAsked;   // DSA, DBMS, OS, etc.

    private String evaluationBasis;     // Coding / Concepts / Resume

    private Integer shortlistedCount;   // optional / approximate

    private Boolean cleared;

    private String keyMistake;           // very short (1 line)
}
