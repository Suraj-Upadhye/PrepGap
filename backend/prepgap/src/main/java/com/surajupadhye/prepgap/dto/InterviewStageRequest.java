package com.surajupadhye.prepgap.dto;

import lombok.Data;
import java.util.List;

@Data
public class InterviewStageRequest {
    private String stageName;
    private Integer durationMinutes;
    private List<String> topicsAsked;
    private String evaluationBasis;
    private Boolean cleared;
    private String keyMistake;
}