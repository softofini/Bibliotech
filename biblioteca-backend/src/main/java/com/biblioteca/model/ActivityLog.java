package com.biblioteca.model;

import jakarta.persistence.*;
import lombok.*;
import java.time.LocalDateTime;

@Entity
@Table(name = "activity_logs")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class ActivityLog {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private ActivityType action;

    @Column(nullable = false, length = 500)
    private String description;

    @Column(nullable = false)
    @Builder.Default
    private LocalDateTime timestamp = LocalDateTime.now();

    public enum ActivityType {
        EMPRESTIMO("Empréstimo"),
        DEVOLUCAO("Devolução"),
        RESERVA("Reserva"),
        CANCELAMENTO_RESERVA("Cancelamento de Reserva"),
        CADASTRO_USUARIO("Cadastro de Usuário"),
        CADASTRO_LIVRO("Cadastro de Livro");

        private final String label;

        ActivityType(String label) {
            this.label = label;
        }

        public String getLabel() {
            return label;
        }
    }
}