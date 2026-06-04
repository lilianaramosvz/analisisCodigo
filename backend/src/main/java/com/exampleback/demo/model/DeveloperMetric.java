package com.exampleback.demo.model;

import java.time.LocalDate;

import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
public class DeveloperMetric {

    private String developerName;
    private LocalDate metricDate;
    private Integer commits;
    private Integer bugsFixed;
    private Integer tasksCompleted;
    private Integer storyPoints;
}
