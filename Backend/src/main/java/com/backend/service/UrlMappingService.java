package com.backend.service;

import com.backend.dto.response.ClickEventResponse;
import com.backend.dto.response.UrlMappingResponse;
import com.backend.entity.User;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;
import java.util.Map;

public interface UrlMappingService {
    UrlMappingResponse createShortUrl(String originalUrl, User user);

    List<UrlMappingResponse> getUrlsByUser(User user);

    List<ClickEventResponse> getClickEventsByDate(String shortUrl, LocalDateTime start, LocalDateTime end);

    Map<LocalDate, Long> getTotalClicksByUserAndDate(User user, LocalDate start, LocalDate end);

    String getOriginalUrlAndRecordClick(String shortUrl);
}
