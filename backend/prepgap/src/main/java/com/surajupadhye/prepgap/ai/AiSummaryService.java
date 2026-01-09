package com.surajupadhye.prepgap.ai;

import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.surajupadhye.prepgap.dto.CompanyInsightSummary;
import com.surajupadhye.prepgap.interview.Resource;
import org.springframework.stereotype.Service;

import java.util.Collections;
import java.util.List;
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
        // Safety check: If no failures, don't waste API tokens
        if (failureHotspots == null || failureHotspots.isEmpty()) {
            return createEmptySummary(company);
        }

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
            // --- ROBUST FIX: Surgically extract JSON ---
            String cleanJson = extractJson(aiJson);
            // -------------------------------------------

            CompanyInsightSummary dto = mapper.readValue(cleanJson, CompanyInsightSummary.class);
            dto.setCompany(company);
            return dto;
        } catch (Exception e) {
            System.err.println("AI JSON Parse Error. Raw: " + aiJson);
            // Return empty object instead of crashing the frontend
            return createEmptySummary(company);
        }
    }

    // This method finds the first '{' and last '}' to ignore all other noise
    private String extractJson(String response) {
        if (response == null) return "{}";
        int firstBrace = response.indexOf("{");
        int lastBrace = response.lastIndexOf("}");

        if (firstBrace != -1 && lastBrace != -1 && firstBrace < lastBrace) {
            return response.substring(firstBrace, lastBrace + 1);
        }
        // Fallback if AI output absolutely no JSON
        return "{}";
    }

    private CompanyInsightSummary createEmptySummary(String company) {
        CompanyInsightSummary empty = new CompanyInsightSummary();
        empty.setCompany(company);
        empty.setMainWeaknesses(Collections.singletonList("Not enough data yet."));
        empty.setUnderestimatedTopics(Collections.emptyList());
        empty.setJuniorPriorities(Collections.emptyList());
        return empty;
    }



    public List<Resource> generateResourceRecommendations(List<String> topics) {
        if (topics == null || topics.isEmpty()) return Collections.emptyList();

        String topicsStr = String.join(", ", topics);
        String systemPrompt = """
            You are a helpful placement mentor.
            For the following technical topics, recommend 3 high-quality, free study resources (YouTube playlists, Articles, or Documentation).
            
            Return STRICT JSON Array:
            [
              { "name": "Resource Name (Platform)", "url": "URL or Search Term" }
            ]
            
            Example:
            [
              { "name": "Striver's Graph Series (YouTube)", "url": "https://takeuforward.org/graph/striver-graph-series/" }
            ]
            """;

        String input = "Topics: " + topicsStr;
        String jsonResponse = geminiService.executeTask(systemPrompt, input);
        String cleanJson = extractJson(jsonResponse);

        try {
            return mapper.readValue(cleanJson, new TypeReference<List<Resource>>() {});
        } catch (Exception e) {
            System.err.println("AI Resource Parse Error: " + jsonResponse);
            return Collections.emptyList();
        }
    }
}