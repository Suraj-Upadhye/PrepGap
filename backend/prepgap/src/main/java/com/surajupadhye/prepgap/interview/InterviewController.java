package com.surajupadhye.prepgap.interview;

import com.surajupadhye.prepgap.dto.InterviewOutcomeRequest;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.oauth2.core.user.OAuth2User;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/interviews")
@RequiredArgsConstructor
public class InterviewController {

    private final InterviewService interviewService;

    @PostMapping
    public ResponseEntity<InterviewOutcome> submitExperience(
            @AuthenticationPrincipal OAuth2User principal,
            @RequestBody InterviewOutcomeRequest request
    ) {
        if (principal == null) {
            return ResponseEntity.status(401).build();
        }

        String email = principal.getAttribute("email");
        return ResponseEntity.ok(
                interviewService.submitExperience(email, request)
        );
    }

    @GetMapping("/companies")
    public ResponseEntity<List<String>> getCompanies(
            @RequestParam(required = false) Integer year,
            @RequestParam(required = false) String type
    ) {
        return ResponseEntity.ok(interviewService.getUniqueCompanies(year, type));
    }

    @GetMapping("/company/{companyName}")
    public ResponseEntity<List<InterviewOutcome>> getCompanyExperiences(
            @PathVariable String companyName,
            @RequestParam(required = false) Integer year
    ) {
        return ResponseEntity.ok(interviewService.getExperiencesByCompany(companyName, year));
    }
}