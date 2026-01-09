package com.surajupadhye.prepgap.dto;

import lombok.Data;
import java.util.List;
import java.util.Map;

@Data
public class SelfAssessmentRequest {
    private Integer currentSemester;
    private String department;
    private List<String> targetCompanies;
    private Map<String, Integer> skillSelfRatings; // e.g. "DSA": 4
}