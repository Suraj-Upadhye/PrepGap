package com.surajupadhye.prepgap.assessment;

import com.surajupadhye.prepgap.dto.SelfAssessmentRequest;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.oauth2.core.user.OAuth2User;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/assessment")
@RequiredArgsConstructor
public class AssessmentController {
    private final AssessmentService assessmentService;

    @PostMapping
    public ResponseEntity<SelfAssessment> saveAssessment(
            @AuthenticationPrincipal OAuth2User principal,
            @RequestBody SelfAssessmentRequest request) {
        if (principal == null) return ResponseEntity.status(401).build();

        String email = principal.getAttribute("email");
        return ResponseEntity.ok(assessmentService.saveAssessment(email, request));
    }

    @GetMapping("/me")
    public ResponseEntity<SelfAssessment> getMyAssessment(@AuthenticationPrincipal OAuth2User principal) {
        if (principal == null) return ResponseEntity.status(401).build();

        String email = principal.getAttribute("email");
        SelfAssessment assessment = assessmentService.getAssessment(email);
        return assessment != null ? ResponseEntity.ok(assessment) : ResponseEntity.noContent().build();
    }
}