package com.exampleback.demo.model;

import java.time.LocalDate;

public class DeveloperMetric {

    private String developerName;
    private LocalDate metricDate;
    private Integer commits;
    private Integer bugsFixed;
    private Integer tasksCompleted;
    private Integer storyPoints;

    // Constructor
    public DeveloperMetric(
            String developerName,
            LocalDate metricDate,
            Integer commits,
            Integer bugsFixed,
            Integer tasksCompleted,
            Integer storyPoints) {

        this.developerName = developerName;
        this.metricDate = metricDate;
        this.commits = commits;
        this.bugsFixed = bugsFixed;
        this.tasksCompleted = tasksCompleted;
        this.storyPoints = storyPoints;
    }

    public String getDeveloperName() {
        return developerName;
    }

    public LocalDate getMetricDate() {
        return metricDate;
    }

    public Integer getCommits() {
        return commits;
    }

    public Integer getBugsFixed() {
        return bugsFixed;
    }

    public Integer getTasksCompleted() {
        return tasksCompleted;
    }

    public Integer getStoryPoints() {
        return storyPoints;
    }
}