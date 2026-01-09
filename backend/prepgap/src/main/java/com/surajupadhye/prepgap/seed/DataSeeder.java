package com.surajupadhye.prepgap.seed;

import com.surajupadhye.prepgap.assessment.SelfAssessment;
import com.surajupadhye.prepgap.assessment.AssessmentRepository;
import com.surajupadhye.prepgap.college.College;
import com.surajupadhye.prepgap.college.CollegeRepository;
import com.surajupadhye.prepgap.interview.*;
import com.surajupadhye.prepgap.user.User;
import com.surajupadhye.prepgap.user.UserRepository;
import com.surajupadhye.prepgap.constants.SkillConstants;
import lombok.extern.slf4j.Slf4j;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import java.util.List;
import java.util.Map;

@Slf4j
@Configuration
public class DataSeeder {

    @Bean
    CommandLineRunner seedData(
            CollegeRepository collegeRepository,
            UserRepository userRepository,
            InterviewRepository interviewRepository,
            AssessmentRepository assessmentRepository
    ) {
        return args -> {

            if (collegeRepository.count() > 0) {
                return; // prevent reseeding
            }

            /* ---------- COLLEGE ---------- */
            College college = new College();
            college.setCollegeName("Walchand College of Engineering");
            college.setCollegeDomain("walchandsangli.ac.in");
            collegeRepository.save(college);

            /* ---------- USERS ---------- */
            User user1 = new User();
            user1.setEmail("student1@walchandsangli.ac.in");
            user1.setCollegeId(college.getId());
            user1.setDepartment("CSE");
            user1.setGraduationYear(2026);

            userRepository.save(user1);

            /* ---------- INTERVIEW STAGES ---------- */
            InterviewStageOutcome aptitude = new InterviewStageOutcome();
            aptitude.setStageName("Aptitude");
            aptitude.setDurationMinutes(90);
            aptitude.setTopicsAsked(List.of(
                    SkillConstants.DSA,
                    SkillConstants.OS,
                    SkillConstants.DBMS
            ));
            aptitude.setEvaluationBasis("MCQ + Coding");
            aptitude.setShortlistedCount(22);
            aptitude.setCleared(true);
            aptitude.setKeyMistake("Time management");

            InterviewStageOutcome tech1 = new InterviewStageOutcome();
            tech1.setStageName("Technical Round 1");
            tech1.setDurationMinutes(45);
            tech1.setTopicsAsked(List.of(
                    SkillConstants.DBMS,
                    SkillConstants.OS
            ));
            tech1.setEvaluationBasis("Conceptual + SQL");
            tech1.setShortlistedCount(14);
            tech1.setCleared(false);
            tech1.setKeyMistake("Shallow DBMS depth");

            /* ---------- INTERVIEW OUTCOME ---------- */
            InterviewOutcome interview = new InterviewOutcome();
            interview.setCompany("Amazon");
            interview.setRole("SDE Intern");
            interview.setExperienceType(ExperienceType.INTERNSHIP);
            interview.setTotalInterviewStages(3);
            interview.setInterviewStageReached("Technical Round 1");
            interview.setFinalResult(InterviewResult.REJECTED);
            interview.setPrimaryRejectionReason("Weak DBMS fundamentals");
            interview.setFailedSkillTags(List.of(
                    SkillConstants.DBMS,
                    SkillConstants.OS
            ));
            interview.setOverestimatedTopics(List.of(
                    "Indexing",
                    "Deadlocks"
            ));
            interview.setSelfConfidenceLevel(4);
            interview.setStages(List.of(aptitude, tech1));
            interview.setDepartment("CSE");
            interview.setInterviewYear(2024);
            interview.setGraduationYear(2026);
            interview.setSubmittedByUserId(user1.getId());

            interviewRepository.save(interview);

            /* ---------- SELF ASSESSMENT ---------- */
            SelfAssessment assessment = new SelfAssessment();
            assessment.setUserId(user1.getId());
            assessment.setCurrentSemester(5);
            assessment.setDepartment("CSE");
            assessment.setTargetCompanies(List.of("Amazon", "Google"));
            assessment.setSkillSelfRatings(Map.of(
                    SkillConstants.DSA, 4,
                    SkillConstants.OS, 4,
                    SkillConstants.DBMS, 3,
                    SkillConstants.CN, 2,
                    SkillConstants.OOPS, 4
            ));

            assessmentRepository.save(assessment);

            log.info("Sample data seeded successfully....");
        };
    }
}
