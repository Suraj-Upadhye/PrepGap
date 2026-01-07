package com.surajupadhye.prepgap.ai;

import org.springframework.stereotype.Service;

import java.util.Map;

@Service
public class AiSummaryService {

    private final GeminiService geminiService;

    public AiSummaryService(GeminiService geminiService) {
        this.geminiService = geminiService;
    }

    public String generateCompanyInsightSummary(
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
                Summarize:
                1. Main technical weaknesses
                2. Topics candidates underestimated
                3. What juniors should prioritize
                Keep it concise, factual, and non-motivational.
                """;

        return geminiService.executeTask(systemPrompt, input.toString());
    }
}
