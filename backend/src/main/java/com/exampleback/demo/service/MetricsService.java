package com.exampleback.demo.service;


import java.util.List;

import org.springframework.stereotype.Service;

import com.exampleback.demo.dto.MetricResponseDTO;
import com.exampleback.demo.model.DeveloperMetric;
import com.exampleback.demo.repository.DeveloperMetricRepository;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class MetricsService {

private final DeveloperMetricRepository repository;

public List<MetricResponseDTO> getMetricData(
        String metric) {

List<DeveloperMetric> metrics =
        repository.findAll();

return metrics.stream()
        .map(m -> {

                MetricResponseDTO dto =
                        new MetricResponseDTO();

                dto.setLabel(
                        m.getMetricDate().toString());

                switch (metric) {

                case "commits":
                        dto.setValue(m.getCommits());
                        break;

                case "bugs":
                        dto.setValue(m.getBugsFixed());
                        break;

                case "tasks":
                        dto.setValue(m.getTasksCompleted());
                        break;

                case "storyPoints":
                        dto.setValue(m.getStoryPoints());
                        break;

                default:
                        dto.setValue(0);
                }

                return dto;
        })
        .toList();
}
}