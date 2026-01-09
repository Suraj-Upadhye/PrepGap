package com.surajupadhye.prepgap.assessment;

import com.surajupadhye.prepgap.dto.SelfAssessmentRequest;
import com.surajupadhye.prepgap.user.User;
import com.surajupadhye.prepgap.user.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class AssessmentService {
    private final AssessmentRepository assessmentRepository;
    private final UserRepository userRepository;

    public SelfAssessment saveAssessment(String userEmail, SelfAssessmentRequest request) {
        User user = userRepository.findByEmail(userEmail)
                .orElseThrow(() -> new RuntimeException("User not found"));

        // Check if assessment already exists for this user to update it
        SelfAssessment assessment = assessmentRepository.findByUserId(user.getId())
                .orElse(new SelfAssessment());

        assessment.setUserId(user.getId());
        assessment.setCurrentSemester(request.getCurrentSemester());
        assessment.setDepartment(request.getDepartment());
        assessment.setTargetCompanies(request.getTargetCompanies());
        assessment.setSkillSelfRatings(request.getSkillSelfRatings());

        return assessmentRepository.save(assessment);
    }

    public SelfAssessment getAssessment(String userEmail) {
        User user = userRepository.findByEmail(userEmail)
                .orElseThrow(() -> new RuntimeException("User not found"));
        return assessmentRepository.findByUserId(user.getId()).orElse(null);
    }
}