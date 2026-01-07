package com.surajupadhye.prepgap.insight;

import com.surajupadhye.prepgap.assessment.AssessmentRepository;
import com.surajupadhye.prepgap.assessment.SelfAssessment;
import com.surajupadhye.prepgap.interview.InterviewOutcome;
import com.surajupadhye.prepgap.interview.InterviewRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@Service
public class InsightService {

    private final InterviewRepository interviewRepository;
    private final AssessmentRepository assessmentRepository;

    public InsightService(
            InterviewRepository interviewRepository,
            AssessmentRepository assessmentRepository
    ) {
        this.interviewRepository = interviewRepository;
        this.assessmentRepository = assessmentRepository;
    }

    /**
     * Company-level insight
     */
    public Map<String, Integer> getCompanyFailureHotspots(String company) {

        List<InterviewOutcome> outcomes =
                interviewRepository.findByCompany(company);

        List<List<String>> failedSkills = outcomes.stream()
                .map(InterviewOutcome::getFailedSkillTags)
                .collect(Collectors.toList());

        return RiskCalculator.calculateSkillFailures(failedSkills);
    }

    /**
     * User readiness for a specific company
     */
    public Map<String, String> getUserReadinessReport(
            String userId,
            String company
    ) {
        SelfAssessment assessment = assessmentRepository
                .findByUserId(userId)
                .orElseThrow(() ->
                        new IllegalArgumentException("No self-assessment found for this user")
                );

        Map<String, Integer> companyFailures =
                getCompanyFailureHotspots(company);

        return RiskCalculator.calculateOverconfidenceRisk(
                companyFailures,
                assessment.getSkillSelfRatings()
        );
    }
}
