package com.surajupadhye.prepgap.assessment;

import org.springframework.data.mongodb.repository.MongoRepository;

import java.util.Optional;

public interface AssessmentRepository extends MongoRepository<SelfAssessment, String> {

    Optional<SelfAssessment> findByUserId(String userId);
}
