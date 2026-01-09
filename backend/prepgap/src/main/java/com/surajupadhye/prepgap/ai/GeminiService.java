package com.surajupadhye.prepgap.ai;

import com.surajupadhye.prepgap.dto.GeminiRequest;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.MediaType;
import org.springframework.stereotype.Service;
import org.springframework.web.reactive.function.client.WebClient;

import java.util.List;

@Service
public class GeminiService {

    @Value("${gemini.api.key}")
    private String apiKey;

    @Value("${gemini.api.url}")
    private String apiUrl;

    private final WebClient webClient;

    public GeminiService(WebClient.Builder builder) {
        this.webClient = builder.build();
    }

    /**
     * Executes a task-based AI operation.
     * Gemini is treated as a function executor, not a chatbot.
     */
    public String executeTask(String systemPrompt, String input) {

        String finalPrompt = systemPrompt + "\n\nInput:\n" + input;

        GeminiRequest request = new GeminiRequest(
                List.of(
                        new GeminiRequest.Content(
                                List.of(new GeminiRequest.Part(finalPrompt))
                        )
                )
        );

        String rawResponse = webClient.post()
                .uri(apiUrl + "?key=" + apiKey)
                .contentType(MediaType.APPLICATION_JSON)
                .bodyValue(request)
                .retrieve()
                .bodyToMono(String.class)
                .block();

        return GeminiResponseParser.extractText(rawResponse);
    }
}
