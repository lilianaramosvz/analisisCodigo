package com.exampleback.demo.repository;

import java.util.List;

import org.springframework.stereotype.Repository;

import com.exampleback.demo.config.MetricsProperties;
import com.exampleback.demo.model.DeveloperMetric;

import lombok.RequiredArgsConstructor;

@Repository
@RequiredArgsConstructor
public class DeveloperMetricRepository {

    private final MetricsProperties metricsProperties;

    public List<DeveloperMetric> findAll() {
        return metricsProperties.getMetrics();
    }
}
