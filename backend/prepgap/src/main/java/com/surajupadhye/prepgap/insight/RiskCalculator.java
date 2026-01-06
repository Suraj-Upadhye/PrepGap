package com.surajupadhye.prepgap.insight;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

public class RiskCalculator {

    /**
     * Calculates skill-wise failure frequency
     */
    public static Map<String, Integer> calculateSkillFailures(List<List<String>> failedSkillLists) {
        Map<String, Integer> failureCount = new HashMap<>();

        for (List<String> skills : failedSkillLists) {
            if (skills == null) continue;

            for (String skill : skills) {
                failureCount.put(skill, failureCount.getOrDefault(skill, 0) + 1);
            }
        }
        return failureCount;
    }

    /**
     * Calculates overconfidence risk:
     * High self-rating + frequent failures
     */
    public static Map<String, String> calculateOverconfidenceRisk(
            Map<String, Integer> skillFailures,
            Map<String, Integer> selfRatings
    ) {
        Map<String, String> riskMap = new HashMap<>();

        for (String skill : selfRatings.keySet()) {
            int rating = selfRatings.get(skill);
            int failures = skillFailures.getOrDefault(skill, 0);

            if (rating >= 4 && failures >= 2) {
                riskMap.put(skill, "HIGH");
            } else if (rating >= 3 && failures >= 1) {
                riskMap.put(skill, "MEDIUM");
            } else {
                riskMap.put(skill, "LOW");
            }
        }
        return riskMap;
    }
}
