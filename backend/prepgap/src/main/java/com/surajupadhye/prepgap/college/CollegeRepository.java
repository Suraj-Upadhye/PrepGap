package com.surajupadhye.prepgap.college;

import org.springframework.data.mongodb.repository.MongoRepository;

import java.util.Optional;

public interface CollegeRepository extends MongoRepository<College, String> {

    Optional<College> findByCollegeDomain(String collegeDomain);
}
