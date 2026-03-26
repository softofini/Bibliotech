package com.biblioteca.service;

import com.biblioteca.dto.ActivityLogDTO;
import com.biblioteca.model.ActivityLog;
import com.biblioteca.repository.ActivityLogRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.PageRequest;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@RequiredArgsConstructor
@Slf4j
public class ActivityLogService {

    private final ActivityLogRepository activityLogRepository;

    /** Retorna as N atividades mais recentes */
    @Transactional(readOnly = true)
    public List<ActivityLogDTO> findRecent(int limit) {
        return activityLogRepository
                .findByOrderByTimestampDesc(PageRequest.of(0, limit))
                .stream()
                .map(ActivityLogDTO::fromEntity)
                .toList();
    }

    /**
     * Registra uma nova atividade no log.
     * Chamado internamente pelos serviços após operações relevantes.
     */
    @Transactional
    public void log(ActivityLog.ActivityType type, String description) {
        ActivityLog entry = ActivityLog.builder()
                .action(type)
                .description(description)
                .build();
        activityLogRepository.save(entry);
        log.debug("Atividade registrada: [{}] {}", type.getLabel(), description);
    }
}