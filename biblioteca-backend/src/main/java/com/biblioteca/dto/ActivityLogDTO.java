package com.biblioteca.dto;

import com.biblioteca.model.ActivityLog;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class ActivityLogDTO {

    private Long id;
    private String action;
    private String description;
    private LocalDateTime timestamp;

    public static ActivityLogDTO fromEntity(ActivityLog activityLog) {
        return new ActivityLogDTO(
                activityLog.getId(),
                activityLog.getAction().getLabel(),
                activityLog.getDescription(),
                activityLog.getTimestamp()
        );
    }
}