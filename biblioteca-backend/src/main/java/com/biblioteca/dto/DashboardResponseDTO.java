package com.biblioteca.dto;

import lombok.*;
import java.util.List;

/**
 * Envelope completo do Dashboard.
 *
 * O frontend faz UMA única requisição GET /api/dashboard e recebe tudo:
 *
 *   {
 *     "stats":      { totalBooks, totalTitles, borrowedBooks, ... },
 *     "books":      [ top 5 livros para o resumo do acervo ],
 *     "loans":      [ últimos empréstimos para fallback ],
 *     "activities": [ últimas 10 atividades ]
 *   }
 *
 * Isso reduz o número de round-trips do frontend de 4 para 1.
 */
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class DashboardResponseDTO {

    private DashboardStatsDTO stats;
    private List<BookDTO> books;
    private List<LoanDTO> loans;
    private List<ActivityLogDTO> activities;
}