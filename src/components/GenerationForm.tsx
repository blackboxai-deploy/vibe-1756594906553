'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { ART_STYLES } from '@/lib/api';
import { GenerationRequest, GenerationResponse } from '@/lib/types';
import { AIGenerationLoader } from '@/components/LoadingSpinner';

interface GenerationFormProps {
  onGenerate: (result: GenerationResponse) => void;
}

export default function GenerationForm({ onGenerate }: GenerationFormProps) {
  const [prompt, setPrompt] = useState('');
  const [style, setStyle] = useState<string>('');
  const [aspectRatio, setAspectRatio] = useState<'1:1' | '16:9' | '4:3' | '3:4'>('1:1');
  const [quality, setQuality] = useState<'standard' | 'high' | 'ultra'>('high');
  const [isGenerating, setIsGenerating] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!prompt.trim()) {
      setError('Please enter a prompt');
      return;
    }

    setIsGenerating(true);
    setError(null);

    try {
      const request: GenerationRequest = {
        prompt: prompt.trim(),
        style: style || undefined,
        aspectRatio,
        quality
      };

      const response = await fetch('/api/generate', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(request)
      });

      const result: GenerationResponse = await response.json();

      if (!result.success) {
        throw new Error(result.error || 'Generation failed');
      }

      onGenerate(result);

    } catch (err) {
      console.error('Generation error:', err);
      setError(err instanceof Error ? err.message : 'Failed to generate artwork');
    } finally {
      setIsGenerating(false);
    }
  };

  const handleStyleSelect = (styleId: string) => {
    setStyle(styleId);
  };

  const promptSuggestions = [
    'A mystical forest with glowing mushrooms and ethereal lighting',
    'Cyberpunk cityscape with neon lights and flying cars',
    'Abstract geometric patterns in vibrant rainbow colors',
    'Majestic mountain landscape during golden hour',
    'Futuristic robot in a post-apocalyptic setting',
    'Underwater palace with coral gardens and sea creatures'
  ];

  if (isGenerating) {
    return (
      <div className="min-h-[600px] flex items-center justify-center">
        <AIGenerationLoader />
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-8">
      {/* Prompt Input */}
      <div className="space-y-4">
        <label htmlFor="prompt" className="block text-xl font-semibold text-white">
          Describe your artwork
        </label>
        <Textarea
          id="prompt"
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          placeholder="Enter your creative prompt here..."
          className="min-h-[120px] bg-white/10 border-white/20 text-white placeholder-gray-400 rounded-xl resize-none focus:border-purple-500/50 focus:ring-purple-500/20"
          maxLength={500}
        />
        <div className="text-right text-sm text-gray-400">
          {prompt.length}/500 characters
        </div>

        {/* Prompt Suggestions */}
        <div className="space-y-2">
          <p className="text-sm text-gray-400">Quick suggestions:</p>
          <div className="flex flex-wrap gap-2">
            {promptSuggestions.map((suggestion, index) => (
              <Button
                key={index}
                type="button"
                variant="outline"
                size="sm"
                className="text-xs border-white/30 text-gray-300 hover:bg-white/10 hover:text-white rounded-full"
                onClick={() => setPrompt(suggestion)}
              >
                {suggestion.length > 50 ? `${suggestion.slice(0, 50)}...` : suggestion}
              </Button>
            ))}
          </div>
        </div>
      </div>

      {/* Style Selection */}
      <div className="space-y-4">
        <label className="block text-xl font-semibold text-white">
          Choose an art style
        </label>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {ART_STYLES.map((artStyle) => (
            <div
              key={artStyle.id}
              className={`art-card-3d cursor-pointer rounded-xl overflow-hidden border-2 transition-all duration-300 ${
                style === artStyle.id 
                  ? 'border-purple-500 ring-2 ring-purple-500/30' 
                  : 'border-white/20 hover:border-white/40'
              }`}
              onClick={() => handleStyleSelect(artStyle.id)}
            >
              <div className="aspect-square relative overflow-hidden">
                <img
                  src={artStyle.previewUrl}
                  alt={`${artStyle.name} style preview`}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-3">
                  <h3 className="font-semibold text-white text-sm">{artStyle.name}</h3>
                  <p className="text-xs text-gray-300 mt-1">{artStyle.description}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Advanced Options */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-2">
          <label className="block text-lg font-medium text-white">Aspect Ratio</label>
          <Select value={aspectRatio} onValueChange={(value: any) => setAspectRatio(value)}>
            <SelectTrigger className="bg-white/10 border-white/20 text-white">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="1:1">Square (1:1)</SelectItem>
              <SelectItem value="16:9">Landscape (16:9)</SelectItem>
              <SelectItem value="4:3">Standard (4:3)</SelectItem>
              <SelectItem value="3:4">Portrait (3:4)</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <label className="block text-lg font-medium text-white">Quality</label>
          <Select value={quality} onValueChange={(value: any) => setQuality(value)}>
            <SelectTrigger className="bg-white/10 border-white/20 text-white">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="standard">Standard</SelectItem>
              <SelectItem value="high">High Quality</SelectItem>
              <SelectItem value="ultra">Ultra HD</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Error Display */}
      {error && (
        <div className="bg-red-500/20 border border-red-500/50 rounded-xl p-4">
          <p className="text-red-200">{error}</p>
        </div>
      )}

      {/* Generate Button */}
      <Button
        type="submit"
        disabled={!prompt.trim() || isGenerating}
        className="w-full btn-3d bg-gradient-to-r from-purple-600 to-cyan-600 hover:from-purple-700 hover:to-cyan-700 text-white py-4 text-lg font-semibold rounded-xl shadow-2xl hover:shadow-purple-500/25 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {isGenerating ? 'Generating...' : 'Generate Artwork'}
        <span className="ml-2">✨</span>
      </Button>
    </form>
  );
}