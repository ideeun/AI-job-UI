// API Response types
export interface ApiResponse<T = any> {
  data: T;
  message?: string;
  success: boolean;
  error?: string;
}

// Job related types
export interface Job {
  id: string;
  title: string;
  company: string;
  description: string;
  location: string;
  type: "full-time" | "part-time" | "contract" | "remote";
  salary?: {
    min: number;
    max: number;
    currency: string;
  };
  requirements: string[];
  benefits?: string[];
  postedAt: string;
  expiresAt?: string;
  isActive: boolean;
}

// User types (for future use)
export interface User {
  id: string;
  name: string;
  email: string;
  avatar?: string;
  role: "user" | "admin";
  profile?: UserProfile;
}

export interface UserProfile {
  bio?: string;
  skills: string[];
  experience: string;
  education?: string;
  location?: string;
  resume?: string;
}

// Navigation types
export interface NavItem {
  id: string;
  label: string;
  href: string;
  icon?: React.ComponentType<any>;
  isActive?: boolean;
  children?: NavItem[];
}

// Component Props
export interface ButtonProps {
  variant?: "primary" | "secondary" | "outline" | "ghost";
  size?: "sm" | "md" | "lg";
  children: React.ReactNode;
  onClick?: () => void;
  disabled?: boolean;
  className?: string;
}

export interface CardProps {
  children: React.ReactNode;
  className?: string;
  padding?: "sm" | "md" | "lg";
}

// Utility types
export type LoadingState = "idle" | "loading" | "success" | "error";

export interface PaginationMeta {
  currentPage: number;
  totalPages: number;
  totalItems: number;
  itemsPerPage: number;
}
