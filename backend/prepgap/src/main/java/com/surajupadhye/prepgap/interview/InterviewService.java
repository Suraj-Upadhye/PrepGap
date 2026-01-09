package com.surajupadhye.prepgap.interview;

import com.surajupadhye.prepgap.dto.InterviewOutcomeRequest;
import com.surajupadhye.prepgap.dto.InterviewStageRequest;
import com.surajupadhye.prepgap.user.User;
import com.surajupadhye.prepgap.user.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class InterviewService {

    private final InterviewRepository interviewRepository;
    private final UserRepository userRepository;

    public InterviewOutcome submitExperience(String userEmail, InterviewOutcomeRequest request) {
        // 1. Get User ID
        Optional<User> user = userRepository.findByEmail(userEmail);
        String userId = user.map(User::getId).orElse("unknown");

        // 2. Map DTO to Entity
        InterviewOutcome outcome = new InterviewOutcome();
        outcome.setSubmittedByUserId(userId);

        outcome.setCompany(request.getCompany());
        outcome.setRole(request.getRole());
        outcome.setExperienceType(request.getExperienceType());

        outcome.setTotalInterviewStages(request.getTotalInterviewStages());
        outcome.setInterviewStageReached(request.getInterviewStageReached());
        outcome.setFinalResult(request.getFinalResult());
        outcome.setPrimaryRejectionReason(request.getPrimaryRejectionReason());

        outcome.setFailedSkillTags(request.getFailedSkillTags());
        outcome.setOverestimatedTopics(request.getOverestimatedTopics());
        outcome.setSelfConfidenceLevel(request.getSelfConfidenceLevel());

        outcome.setInterviewYear(request.getInterviewYear());
        outcome.setGraduationYear(request.getGraduationYear());
        outcome.setDepartment(request.getDepartment());

        outcome.setCandidateResources(request.getCandidateResources());
        outcome.setTipsForJuniors(request.getTipsForJuniors());

        // 3. Map Stages
        if (request.getStages() != null) {
            List<InterviewStageOutcome> stages = request.getStages().stream().map(s -> {
                InterviewStageOutcome stage = new InterviewStageOutcome();
                stage.setStageName(s.getStageName());
                stage.setDurationMinutes(s.getDurationMinutes());
                stage.setTopicsAsked(s.getTopicsAsked());
                stage.setEvaluationBasis(s.getEvaluationBasis());
                stage.setCleared(s.getCleared());
                stage.setKeyMistake(s.getKeyMistake());
                return stage;
            }).collect(Collectors.toList());
            outcome.setStages(stages);
        }

        return interviewRepository.save(outcome);
    }

    public List<String> getUniqueCompanies(Integer year, String type) {
        List<InterviewOutcome> all = interviewRepository.findAll();

        return all.stream()
                .filter(i -> year == null || (i.getInterviewYear() != null && i.getInterviewYear().equals(year)))
                .filter(i -> type == null || type.isEmpty() || (i.getExperienceType() != null && i.getExperienceType().name().equalsIgnoreCase(type)))
                .map(InterviewOutcome::getCompany)
                .distinct()
                .sorted()
                .collect(Collectors.toList());
    }

    // 2. Get Experiences for a Company (Filtered by Year)
    public List<InterviewOutcome> getExperiencesByCompany(String company, Integer year) {
        List<InterviewOutcome> outcomes = interviewRepository.findByCompany(company);

        if (year != null) {
            return outcomes.stream()
                    .filter(i -> i.getInterviewYear() != null && i.getInterviewYear().equals(year))
                    .collect(Collectors.toList());
        }
        return outcomes;
    }
}