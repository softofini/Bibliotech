package com.biblioteca.dto;

import lombok.*;

/**
 * Stats payload – campo a campo alinhado com o contrato do frontend.
 *
 * Frontend (hooks/use-api.ts) espera:
 *   stats.totalBooks        → soma de exemplares (quantity)
 *   stats.totalTitles       → nº de títulos distintos
 *   stats.borrowedBooks     → exemplares fora do acervo
 *   stats.totalUsers        → total de usuários cadastrados
 *   stats.activeLoans       → empréstimos com status ATIVO
 *   stats.overdueLoans      → empréstimos com status ATRASADO
 *   stats.unavailableBooks  → títulos com available == 0
 */
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class DashboardStatsDTO {

    private int totalBooks;          // soma de book.quantity
    private int totalTitles;         // nº de títulos distintos
    private int borrowedBooks;       // exemplares em posse de usuários
    private int totalUsers;
    private int activeLoans;
    private int overdueLoans;
    private int unavailableBooks;    // títulos com available == 0
}