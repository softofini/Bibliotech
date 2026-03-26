// Tipos para integração com o backend Spring Boot

export interface Book {
  id: string
  title: string
  author: string
  category: string
  isbn: string
  quantity: number
  available: number
  status: 'disponivel' | 'emprestado'
}

export interface User {
  id: string
  name: string
  email: string
  type: 'aluno' | 'professor' | 'visitante'
  createdAt: string
}

export interface Loan {
  id: string
  userId: string
  userName: string
  bookId: string
  bookTitle: string
  loanDate: string
  returnDate: string
  status: 'ativo' | 'atrasado' | 'finalizado'
}

export interface Reservation {
  id: string
  userId: string
  userName: string
  bookId: string
  bookTitle: string
  reservationDate: string
  status: 'pendente' | 'disponivel' | 'cancelada'
}

export interface Notification {
  id: string
  title: string
  message: string
  type: 'info' | 'warning' | 'success'
  read: boolean
  createdAt: string
}

export interface Activity {
  id: string
  action: string
  description: string
  timestamp: string
}

export interface DashboardStats {
  totalBooks: number
  totalTitles: number
  borrowedBooks: number
  totalUsers: number
  activeLoans: number
  overdueLoans: number
  unavailableBooks: number
}

// DTOs para criação/atualização
export interface CreateBookDTO {
  title: string
  author: string
  category: string
  isbn: string
  quantity: number
}

export interface UpdateBookDTO extends Partial<CreateBookDTO> {}

export interface CreateUserDTO {
  name: string
  email: string
  type: 'aluno' | 'professor' | 'visitante'
}

export interface UpdateUserDTO extends Partial<CreateUserDTO> {}

export interface CreateLoanDTO {
  userId: string
  bookId: string
  returnDate: string
}

export interface CreateReservationDTO {
  userId: string
  bookId: string
}

// Response types
export interface ApiResponse<T> {
  data: T
  message?: string
  success: boolean
}

export interface PaginatedResponse<T> {
  data: T[]
  total: number
  page: number
  limit: number
  totalPages: number
}

// Categorias disponíveis
export const categories = [
  'Literatura Brasileira',
  'Ficção Científica',
  'Fantasia',
  'Tecnologia',
  'Infantil',
  'Estratégia',
  'História',
  'Romance',
  'Biografia',
  'Autoajuda',
] as const

export type Category = (typeof categories)[number]
