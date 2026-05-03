package com.surajupadhye.prepgap.dto;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class UserResponse {
    private String id;
    private String email;
    private String collegeId;
    private boolean isVerified;
}
