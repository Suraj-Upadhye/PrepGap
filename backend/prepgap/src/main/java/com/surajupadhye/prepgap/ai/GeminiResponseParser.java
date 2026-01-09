package com.surajupadhye.prepgap.ai;

import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;

public class GeminiResponseParser {

    private static final ObjectMapper mapper = new ObjectMapper();

    public static String extractText(String rawJson) {
        try {
            JsonNode root = mapper.readTree(rawJson);
            return root
                    .path("candidates")
                    .get(0)
                    .path("content")
                    .path("parts")
                    .get(0)
                    .path("text")
                    .asText();
        } catch (Exception e) {
            throw new RuntimeException("Failed to parse Gemini response", e);
        }
    }
}
