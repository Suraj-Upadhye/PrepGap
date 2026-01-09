package com.surajupadhye.prepgap.dto;

import lombok.Data;
import java.util.List;

@Data
public class CompanyInsightSummary {
    private String company;
    private List<String> mainWeaknesses;
    private List<String> underestimatedTopics;
    private List<String> juniorPriorities;
}
