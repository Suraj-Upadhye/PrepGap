package com.surajupadhye.prepgap.interview;

import org.springframework.data.mongodb.repository.MongoRepository;

import java.util.List;

public interface InterviewRepository extends MongoRepository<InterviewOutcome, String> {

    List<InterviewOutcome> findByCompany(String company);

    List<InterviewOutcome> findByCompanyAndInterviewYear(String company, Integer interviewYear);

    List<InterviewOutcome> findByCompanyAndExperienceType(
            String company,
            ExperienceType experienceType
    );
}
