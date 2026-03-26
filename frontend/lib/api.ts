/**
 * API Service - Camada Facade para comunicação com o backend Spring Boot
 * 
 * Este módulo centraliza todas as chamadas HTTP para o backend,
 * seguindo o padrão Facade para encapsular a complexidade das requisições.
 */

import type {
  Book,
  User,
  Loan,
  Reservation,
  Notification,
  Activity,
  DashboardStats,
  CreateBookDTO,
  UpdateBookDTO,
  CreateUserDTO,
  UpdateUserDTO,
  CreateLoanDTO,
  CreateReservationDTO,
} from './types'

// URL base da API - configure conforme seu ambiente
const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8080/api'

/**
 * Classe de erro customizada para erros da API
 */
export class ApiError extends Error {
  constructor(
    message: string,
    public status: number,
    public data?: unknown
  ) {
    super(message)
    this.name = 'ApiError'
  }
}

/**
 * Função utilitária para fazer requisições HTTP
 */
async function fetchApi<T>(
  endpoint: string,
  options: RequestInit = {}
): Promise<T> {
  const url = `${API_BASE_URL}${endpoint}`
  
  const defaultHeaders: HeadersInit = {
    'Content-Type': 'application/json',
  }

  const config: RequestInit = {
    ...options,
    headers: {
      ...defaultHeaders,
      ...options.headers,
    },
  }

  try {
    const response = await fetch(url, config)
    
    if (!response.ok) {
      const errorData = await response.json().catch(() => null)
      throw new ApiError(
        errorData?.message || `Erro na requisição: ${response.statusText}`,
        response.status,
        errorData
      )
    }

    // Se a resposta for 204 No Content, retorna undefined
    if (response.status === 204) {
      return undefined as T
    }

    return response.json()
  } catch (error) {
    if (error instanceof ApiError) {
      throw error
    }
    throw new ApiError(
      error instanceof Error ? error.message : 'Erro de conexão com o servidor',
      0
    )
  }
}

/**
 * ============================================
 * LIVROS - Endpoints /livros
 * ============================================
 */
export const bookService = {
  /**
   * Lista todos os livros
   */
  async getAll(): Promise<Book[]> {
    return fetchApi<Book[]>('/livros')
  },

  /**
   * Busca um livro pelo ID
   */
  async getById(id: string): Promise<Book> {
    return fetchApi<Book>(`/livros/${id}`)
  },

  /**
   * Busca livros por categoria
   */
  async getByCategory(category: string): Promise<Book[]> {
    return fetchApi<Book[]>(`/livros?category=${encodeURIComponent(category)}`)
  },

  /**
   * Busca livros disponíveis
   */
  async getAvailable(): Promise<Book[]> {
    return fetchApi<Book[]>('/livros?available=true')
  },

  /**
   * Busca livros indisponíveis (para reservas)
   */
  async getUnavailable(): Promise<Book[]> {
    return fetchApi<Book[]>('/livros?available=false')
  },

  /**
   * Cria um novo livro
   */
  async create(data: CreateBookDTO): Promise<Book> {
    return fetchApi<Book>('/livros', {
      method: 'POST',
      body: JSON.stringify(data),
    })
  },

  /**
   * Atualiza um livro existente
   */
  async update(id: string, data: UpdateBookDTO): Promise<Book> {
    return fetchApi<Book>(`/livros/${id}`, {
      method: 'PUT',
      body: JSON.stringify(data),
    })
  },

  /**
   * Remove um livro
   */
  async delete(id: string): Promise<void> {
    return fetchApi<void>(`/livros/${id}`, {
      method: 'DELETE',
    })
  },
}

/**
 * ============================================
 * USUÁRIOS - Endpoints /usuarios
 * ============================================
 */
export const userService = {
  /**
   * Lista todos os usuários
   */
  async getAll(): Promise<User[]> {
    return fetchApi<User[]>('/usuarios')
  },

  /**
   * Busca um usuário pelo ID
   */
  async getById(id: string): Promise<User> {
    return fetchApi<User>(`/usuarios/${id}`)
  },

  /**
   * Busca usuários por tipo
   */
  async getByType(type: string): Promise<User[]> {
    return fetchApi<User[]>(`/usuarios?type=${encodeURIComponent(type)}`)
  },

  /**
   * Cria um novo usuário
   */
  async create(data: CreateUserDTO): Promise<User> {
    return fetchApi<User>('/usuarios', {
      method: 'POST',
      body: JSON.stringify(data),
    })
  },

  /**
   * Atualiza um usuário existente
   */
  async update(id: string, data: UpdateUserDTO): Promise<User> {
    return fetchApi<User>(`/usuarios/${id}`, {
      method: 'PUT',
      body: JSON.stringify(data),
    })
  },

  /**
   * Remove um usuário
   */
  async delete(id: string): Promise<void> {
    return fetchApi<void>(`/usuarios/${id}`, {
      method: 'DELETE',
    })
  },
}

/**
 * ============================================
 * EMPRÉSTIMOS - Endpoints /emprestimos
 * ============================================
 */
export const loanService = {
  /**
   * Lista todos os empréstimos
   */
  async getAll(): Promise<Loan[]> {
    return fetchApi<Loan[]>('/emprestimos')
  },

  /**
   * Busca um empréstimo pelo ID
   */
  async getById(id: string): Promise<Loan> {
    return fetchApi<Loan>(`/emprestimos/${id}`)
  },

  /**
   * Busca empréstimos por status
   */
  async getByStatus(status: string): Promise<Loan[]> {
    return fetchApi<Loan[]>(`/emprestimos?status=${encodeURIComponent(status)}`)
  },

  /**
   * Busca empréstimos de um usuário
   */
  async getByUser(userId: string): Promise<Loan[]> {
    return fetchApi<Loan[]>(`/emprestimos?userId=${userId}`)
  },

  /**
   * Cria um novo empréstimo
   */
  async create(data: CreateLoanDTO): Promise<Loan> {
    return fetchApi<Loan>('/emprestimos', {
      method: 'POST',
      body: JSON.stringify(data),
    })
  },

  /**
   * Registra a devolução de um empréstimo
   */
  async returnBook(id: string): Promise<Loan> {
    return fetchApi<Loan>(`/emprestimos/${id}/devolver`, {
      method: 'PATCH',
    })
  },

  /**
   * Remove um empréstimo (apenas para fins administrativos)
   */
  async delete(id: string): Promise<void> {
    return fetchApi<void>(`api/emprestimos/${id}`, {
      method: 'DELETE',
    })
  },
}

/**
 * ============================================
 * RESERVAS - Endpoints /reservas
 * ============================================
 */
export const reservationService = {
  /**
   * Lista todas as reservas
   */
  async getAll(): Promise<Reservation[]> {
    return fetchApi<Reservation[]>('/reservas')
  },

  /**
   * Busca uma reserva pelo ID
   */
  async getById(id: string): Promise<Reservation> {
    return fetchApi<Reservation>(`/reservas/${id}`)
  },

  /**
   * Busca reservas por status
   */
  async getByStatus(status: string): Promise<Reservation[]> {
    return fetchApi<Reservation[]>(`/reservas?status=${encodeURIComponent(status)}`)
  },

  /**
   * Cria uma nova reserva
   */
  async create(data: CreateReservationDTO): Promise<Reservation> {
    return fetchApi<Reservation>('/reservas', {
      method: 'POST',
      body: JSON.stringify(data),
    })
  },

  /**
   * Cancela uma reserva
   */
  async cancel(id: string): Promise<Reservation> {
    return fetchApi<Reservation>(`/reservas/${id}/cancelar`, {
      method: 'PATCH',
    })
  },

  /**
   * Remove uma reserva
   */
  async delete(id: string): Promise<void> {
    return fetchApi<void>(`/reservas/${id}`, {
      method: 'DELETE',
    })
  },
}

/**
 * ============================================
 * NOTIFICAÇÕES - Endpoints /notificacoes
 * ============================================
 */
export const notificationService = {
  /**
   * Lista todas as notificações
   */
  async getAll(): Promise<Notification[]> {
    return fetchApi<Notification[]>('/notificacoes')
  },

  /**
   * Busca notificações não lidas
   */
  async getUnread(): Promise<Notification[]> {
    return fetchApi<Notification[]>('/notificacoes?read=false')
  },

  /**
   * Conta notificações não lidas
   */
  async countUnread(): Promise<number> {
    const data = await fetchApi<{ count: number }>('/notificacoes/count-unread')
    return data.count
  },

  /**
   * Marca uma notificação como lida
   */
  async markAsRead(id: string): Promise<Notification> {
    return fetchApi<Notification>(`/notificacoes/${id}/read`, {
      method: 'PATCH',
    })
  },

  /**
   * Marca todas as notificações como lidas
   */
  async markAllAsRead(): Promise<void> {
    return fetchApi<void>('/notificacoes/read-all', {
      method: 'PATCH',
    })
  },

  /**
   * Remove uma notificação
   */
  async delete(id: string): Promise<void> {
    return fetchApi<void>(`/notificacoes/${id}`, {
      method: 'DELETE',
    })
  },
}

/**
 * ============================================
 * ATIVIDADES - Endpoints /atividades
 * ============================================
 */
export const activityService = {
  async getRecent(limit: number = 10): Promise<Activity[]> {
    return fetchApi<Activity[]>(`/dashboard/activities?limit=${limit}`)
  },
}

/**
 * ============================================
 * DASHBOARD - Endpoints /dashboard
 * ============================================
 */
export const dashboardService = {
  /**
   * Obtém estatísticas do dashboard
   */
  async getStats(): Promise<DashboardStats> {
    return fetchApi<DashboardStats>('/dashboard/stats')
  },
}

/**
 * ============================================
 * FACADE - API centralizada
 * ============================================
 */
export const api = {
  books: bookService,
  users: userService,
  loans: loanService,
  reservations: reservationService,
  notifications: notificationService,
  activities: activityService,
  dashboard: dashboardService,
}

export default api
