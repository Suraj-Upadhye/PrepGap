package com.surajupadhye.prepgap.assessment;

import lombok.Data;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.time.Instant;
import java.util.List;
import java.util.Map;

@Data
@Document(collection = "self_assessments")
public class SelfAssessment {

    @Id
    private String id;

    private String userId;

    private Integer currentSemester;

    private String department;

    private List<String> targetCompanies;

    private Map<String, Integer> skillSelfRatings; // skill → rating (1–5)

    private Instant createdAt = Instant.now();
}
