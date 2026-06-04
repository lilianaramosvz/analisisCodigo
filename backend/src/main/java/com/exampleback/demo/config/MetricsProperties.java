package com.exampleback.demo.config;

import java.util.List;

import org.springframework.boot.context.properties.ConfigurationProperties;

import com.exampleback.demo.model.DeveloperMetric;

import lombok.Data;

@Data
@ConfigurationProperties("app")
public class MetricsProperties {

    private List<DeveloperMetric> metrics;
}
