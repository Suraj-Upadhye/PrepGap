package com.surajupadhye.prepgap.ai;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.surajupadhye.prepgap.dto.CompanyInsightSummary;
import org.springframework.stereotype.Service;

import java.util.Map;
@Service
public class AiSummaryService {

    private final GeminiService geminiService;
    private final ObjectMapper mapper = new ObjectMapper();

    public AiSummaryService(GeminiService geminiService) {
        this.geminiService = geminiService;
    }

    public CompanyInsightSummary generateCompanyInsightSummary(
            String company,
            Map<String, Integer> failureHotspots
    ) {

        StringBuilder input = new StringBuilder();
        input.append("Company: ").append(company).append("\n");
        input.append("Skill-wise failure counts:\n");

        failureHotspots.forEach((skill, count) ->
                input.append("- ").append(skill).append(": ").append(count).append("\n")
        );

        String systemPrompt = """
            You are analyzing campus placement interview data.
            
            Return STRICT JSON in the following format only:
            {
              "mainWeaknesses": [],
              "underestimatedTopics": [],
              "juniorPriorities": []
            }
            
            Rules:
            - Do not include explanations
            - Do not include markdown
            - Do not include extra text
            - Arrays must contain short strings
            """;

        String aiJson = geminiService.executeTask(systemPrompt, input.toString());

        try {
            CompanyInsightSummary dto =
                    mapper.readValue(aiJson, CompanyInsightSummary.class);
            dto.setCompany(company);
            return dto;
        } catch (Exception e) {
            throw new RuntimeException("Invalid AI JSON format", e);
        }
    }
}
