package com.biblioteca.controller;

import com.biblioteca.dto.*;
import com.biblioteca.service.DashboardService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

/**
 * Controller REST para o Dashboard.
 *
 * Endpoints:
 *   GET /api/dashboard         — retorna dados completos do dashboard (stats, books, loans, activities)
 *   GET /api/dashboard/stats   — retorna apenas as estatísticas
 *   GET /api/dashboard/books   — retorna os top 5 livros para resumo do acervo
 *   GET /api/dashboard/loans   — retorna os empréstimos recentes
 *   GET /api/dashboard/activities — retorna as atividades recentes
 */
@RestController
@RequestMapping("/api/dashboard")
@RequiredArgsConstructor
@Slf4j
public class DashboardController {

    private final DashboardService dashboardService;

    /**
     * Endpoint principal do dashboard - retorna todos os dados em uma única requisição
     * Otimiza o número de round-trips do frontend
     */
    @GetMapping
    public ResponseEntity<DashboardResponseDTO> getDashboard() {
        log.debug("Requisição para dashboard completo");
        DashboardResponseDTO dashboard = dashboardService.buildDashboard();
        return ResponseEntity.ok(dashboard);
    }

    /**
     * Endpoint para estatísticas do dashboard
     * Usado pelo hook useDashboard no frontend
     */
    @GetMapping("/stats")
    public ResponseEntity<DashboardStatsDTO> getStats() {
        log.debug("Requisição para estatísticas do dashboard");
        DashboardResponseDTO dashboard = dashboardService.buildDashboard();
        return ResponseEntity.ok(dashboard.getStats());
    }

    /**
     * Endpoint para os top livros do acervo
     * Usado pelo hook useBooks no frontend (limitado a 5)
     */
    @GetMapping("/books")
    public ResponseEntity<java.util.List<BookDTO>> getBooks() {
        log.debug("Requisição para livros do dashboard");
        DashboardResponseDTO dashboard = dashboardService.buildDashboard();
        return ResponseEntity.ok(dashboard.getBooks());
    }

    /**
     * Endpoint para empréstimos recentes
     * Usado pelo hook useLoans no frontend
     */
    @GetMapping("/loans")
    public ResponseEntity<java.util.List<LoanDTO>> getLoans() {
        log.debug("Requisição para empréstimos do dashboard");
        DashboardResponseDTO dashboard = dashboardService.buildDashboard();
        return ResponseEntity.ok(dashboard.getLoans());
    }

    /**
     * Endpoint para atividades recentes
     * Usado pelo hook useActivities no frontend
     */
    @GetMapping("/activities")
    public ResponseEntity<java.util.List<ActivityLogDTO>> getActivities() {
        log.debug("Requisição para atividades do dashboard");
        DashboardResponseDTO dashboard = dashboardService.buildDashboard();
        return ResponseEntity.ok(dashboard.getActivities());
    }
}
