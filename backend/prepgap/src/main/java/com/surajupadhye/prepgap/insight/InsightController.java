package com.surajupadhye.prepgap.insight;

import com.surajupadhye.prepgap.ai.AiSummaryService;
import com.surajupadhye.prepgap.dto.CompanyInsightSummary;
import com.surajupadhye.prepgap.interview.Resource;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/insights")
@CrossOrigin
public class InsightController {

    private final InsightService insightService;

    private final AiSummaryService aiSummaryService;


    public InsightController(
            InsightService insightService,
            AiSummaryService aiSummaryService
    ) {
        this.insightService = insightService;
        this.aiSummaryService = aiSummaryService;
    }


    /**
     * Company-wise failure hotspots
     * Example:
     * GET /api/insights/company/Amazon
     */
    @GetMapping("/company/{company}")
    public ResponseEntity<Map<String, Integer>> getCompanyFailureInsights(
            @PathVariable String company
    ) {
        return ResponseEntity.ok(
                insightService.getCompanyFailureHotspots(company)
        );
    }

    /**
     * User readiness report for a company
     * Example:
     * GET /api/insights/readiness?userId=123&company=Amazon
     */
    @GetMapping("/readiness")
    public ResponseEntity<Map<String, String>> getUserReadinessReport(
            @RequestParam String userId,
            @RequestParam String company
    ) {
        return ResponseEntity.ok(
                insightService.getUserReadinessReport(userId, company)
        );
    }



    @GetMapping("/company/{company}/summary")
    public ResponseEntity<CompanyInsightSummary> getCompanyInsightSummary(
            @PathVariable String company
    ) {
        var hotspots = insightService.getCompanyFailureHotspots(company);
        return ResponseEntity.ok(
                aiSummaryService.generateCompanyInsightSummary(company, hotspots)
        );
    }

    // for ai recommendation of resources
    @PostMapping("/resources")
    public ResponseEntity<List<Resource>> getAiResources(@RequestBody List<String> topics) {
        return ResponseEntity.ok(aiSummaryService.generateResourceRecommendations(topics));
    }


}
