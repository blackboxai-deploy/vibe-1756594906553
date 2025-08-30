// Core types for AI Art Studio

export interface ArtPiece {
  id: string;
  prompt: string;
  imageUrl: string;
  style: ArtStyle;
  createdAt: Date;
  userId?: string;
  likes: number;
  downloads: number;
}

export interface ArtStyle {
  id: string;
  name: string;
  description: string;
  previewUrl: string;
  category: 'abstract' | 'photorealistic' | 'fantasy' | 'digital' | 'painting' | 'sketch';
}

export interface GenerationRequest {
  prompt: string;
  style?: string;
  aspectRatio?: '1:1' | '16:9' | '4:3' | '3:4';
  quality?: 'standard' | 'high' | 'ultra';
}

export interface GenerationResponse {
  success: boolean;
  imageUrl?: string;
  error?: string;
  generationTime?: number;
}

export interface User {
  id: string;
  name: string;
  email: string;
  avatar?: string;
  createdAt: Date;
  totalGenerations: number;
  favoriteArt: string[];
}

export interface GalleryFilter {
  category?: ArtStyle['category'];
  style?: string;
  sortBy?: 'newest' | 'popular' | 'trending';
  search?: string;
}

export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
}

export interface AnimationConfig {
  duration: number;
  easing: string;
  delay?: number;
  repeat?: boolean;
}