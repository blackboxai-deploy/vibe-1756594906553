// API integration helpers for AI Art Studio

import { GenerationRequest, GenerationResponse, ApiResponse } from './types';

// Custom endpoint configuration (no API keys required)
const AI_ENDPOINT = 'https://oi-server.onrender.com/chat/completions';
const AI_HEADERS = {
  'CustomerId': 'chachanegunjan@gmail.com',
  'Content-Type': 'application/json',
  'Authorization': 'Bearer xxx'
};

// Default models for different tasks
export const AI_MODELS = {
  imageGeneration: 'replicate/black-forest-labs/flux-1.1-pro',
  chat: 'openrouter/anthropic/claude-sonnet-4'
};

// Generate AI artwork using FLUX-1.1-Pro model
export async function generateArtwork(request: GenerationRequest): Promise<GenerationResponse> {
  const startTime = Date.now();
  
  try {
    // Create detailed prompt based on style and user input
    const enhancedPrompt = createEnhancedPrompt(request.prompt, request.style);
    
    const response = await fetch(AI_ENDPOINT, {
      method: 'POST',
      headers: AI_HEADERS,
      body: JSON.stringify({
        model: AI_MODELS.imageGeneration,
        messages: [{
          role: 'user',
          content: enhancedPrompt
        }]
      })
    });

    if (!response.ok) {
      throw new Error(`API request failed: ${response.status} ${response.statusText}`);
    }

    const data = await response.json();
    const generationTime = Date.now() - startTime;

    // Extract image URL from response
    const imageUrl = extractImageUrl(data);

    if (!imageUrl) {
      throw new Error('No image URL found in response');
    }

    return {
      success: true,
      imageUrl,
      generationTime
    };

  } catch (error) {
    console.error('Art generation failed:', error);
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error occurred',
      generationTime: Date.now() - startTime
    };
  }
}

// Create enhanced prompt based on style
function createEnhancedPrompt(basePrompt: string, style?: string): string {
  const stylePrompts = {
    abstract: 'abstract art style, geometric shapes, vibrant colors, modern composition',
    photorealistic: 'photorealistic, high detail, professional photography, sharp focus',
    fantasy: 'fantasy art, magical atmosphere, ethereal lighting, mystical elements',
    digital: 'digital art, clean lines, modern aesthetic, contemporary style',
    painting: 'oil painting style, textured brushstrokes, artistic composition',
    sketch: 'pencil sketch style, detailed line work, artistic drawing'
  };

  let enhancedPrompt = basePrompt;
  
  if (style && stylePrompts[style as keyof typeof stylePrompts]) {
    enhancedPrompt += `, ${stylePrompts[style as keyof typeof stylePrompts]}`;
  }
  
  // Add quality and format specifications
  enhancedPrompt += ', high quality, detailed, professional artwork, 4K resolution';
  
  return enhancedPrompt;
}

// Extract image URL from AI response
function extractImageUrl(response: any): string | null {
  // Handle different response formats from AI models
  if (response.choices?.[0]?.message?.content) {
    const content = response.choices[0].message.content;
    
    // Look for image URL patterns
    const urlMatch = content.match(/https?:\/\/[^\s]+\.(jpg|jpeg|png|webp|gif)/i);
    if (urlMatch) {
      return urlMatch[0];
    }
  }
  
  // Alternative response structures
  if (response.data?.url) return response.data.url;
  if (response.output?.[0]) return response.output[0];
  if (response.image_url) return response.image_url;
  
  return null;
}

// Generic API helper function
export async function apiRequest<T>(
  endpoint: string,
  options: RequestInit = {}
): Promise<ApiResponse<T>> {
  try {
    const response = await fetch(endpoint, {
      headers: {
        'Content-Type': 'application/json',
        ...options.headers
      },
      ...options
    });

    const data = await response.json();

    if (!response.ok) {
      return {
        success: false,
        error: data.message || `Request failed: ${response.status}`
      };
    }

    return {
      success: true,
      data
    };

  } catch (error) {
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Network error'
    };
  }
}

// Art style presets
export const ART_STYLES = [
  {
    id: 'abstract',
    name: 'Abstract',
    description: 'Geometric shapes and vibrant colors',
    category: 'abstract' as const,
    previewUrl: 'https://placehold.co/300x300?text=Abstract+geometric+art+with+vibrant+colors+and+modern+composition'
  },
  {
    id: 'photorealistic',
    name: 'Photorealistic',
    description: 'Detailed, lifelike imagery',
    category: 'photorealistic' as const,
    previewUrl: 'https://placehold.co/300x300?text=Photorealistic+portrait+with+professional+lighting+and+sharp+detail'
  },
  {
    id: 'fantasy',
    name: 'Fantasy',
    description: 'Magical and mystical themes',
    category: 'fantasy' as const,
    previewUrl: 'https://placehold.co/300x300?text=Fantasy+landscape+with+magical+creatures+and+ethereal+lighting'
  },
  {
    id: 'digital',
    name: 'Digital Art',
    description: 'Modern digital aesthetics',
    category: 'digital' as const,
    previewUrl: 'https://placehold.co/300x300?text=Modern+digital+art+with+clean+lines+and+contemporary+style'
  },
  {
    id: 'painting',
    name: 'Oil Painting',
    description: 'Traditional painting techniques',
    category: 'painting' as const,
    previewUrl: 'https://placehold.co/300x300?text=Oil+painting+with+textured+brushstrokes+and+classical+composition'
  },
  {
    id: 'sketch',
    name: 'Sketch',
    description: 'Hand-drawn artistic style',
    category: 'sketch' as const,
    previewUrl: 'https://placehold.co/300x300?text=Detailed+pencil+sketch+with+artistic+line+work+and+shading'
  }
];