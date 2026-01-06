package com.surajupadhye.prepgap.college;

import lombok.Data;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.lang.annotation.Documented;

@Data
@Document(collection = "colleges")
public class College {
    @Id
    private String id;

    private String collegeName;

    private String collegeDomain; // e.g. walchandsangli.ac.in
}
