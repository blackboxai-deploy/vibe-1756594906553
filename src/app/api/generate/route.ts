import { NextRequest, NextResponse } from 'next/server';
import { generateArtwork } from '@/lib/api';
import { GenerationRequest } from '@/lib/types';

export async function POST(request: NextRequest) {
  try {
    const body: GenerationRequest = await request.json();
    
    // Validate request
    if (!body.prompt || body.prompt.trim().length === 0) {
      return NextResponse.json(
        { success: false, error: 'Prompt is required' },
        { status: 400 }
      );
    }

    if (body.prompt.length > 500) {
      return NextResponse.json(
        { success: false, error: 'Prompt is too long (max 500 characters)' },
        { status: 400 }
      );
    }

    // Generate artwork
    console.log('Generating artwork with prompt:', body.prompt);
    const result = await generateArtwork(body);

    if (!result.success) {
      console.error('Generation failed:', result.error);
      return NextResponse.json(result, { status: 500 });
    }

    console.log('Generation successful, URL:', result.imageUrl);
    return NextResponse.json(result);

  } catch (error) {
    console.error('API route error:', error);
    return NextResponse.json(
      { 
        success: false, 
        error: 'Internal server error',
        details: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    );
  }
}

export async function GET() {
  return NextResponse.json({
    message: 'AI Art Generation API',
    endpoint: '/api/generate',
    method: 'POST',
    requiredFields: ['prompt'],
    optionalFields: ['style', 'aspectRatio', 'quality'],
    maxPromptLength: 500
  });
}