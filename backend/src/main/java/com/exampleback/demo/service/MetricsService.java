package com.exampleback.demo.service;

import java.util.List;
import java.util.function.Function;

import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import com.exampleback.demo.dto.MetricResponseDTO;
import com.exampleback.demo.model.DeveloperMetric;
import com.exampleback.demo.repository.DeveloperMetricRepository;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class MetricsService {

    private final DeveloperMetricRepository repository;

    public List<MetricResponseDTO> getMetricData(String metric) {
        Function<DeveloperMetric, Integer> getValue = switch (metric) {
            case "commits"     -> DeveloperMetric::getCommits;
            case "bugs"        -> DeveloperMetric::getBugsFixed;
            case "tasks"       -> DeveloperMetric::getTasksCompleted;
            case "storyPoints" -> DeveloperMetric::getStoryPoints;
            default -> throw new ResponseStatusException(
                    HttpStatus.BAD_REQUEST, "Unknown metric: " + metric);
        };

        return repository.findAll().stream()
            .map(m -> new MetricResponseDTO(m.getMetricDate().toString(), getValue.apply(m)))
            .toList();
    }
}
