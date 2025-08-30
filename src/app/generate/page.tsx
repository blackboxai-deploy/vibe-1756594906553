'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import Navigation from '@/components/Navigation';
import ParticleBackground from '@/components/ParticleBackground';
import GenerationForm from '@/components/GenerationForm';
import { GenerationResponse } from '@/lib/types';

export default function GeneratePage() {
  const [generatedArt, setGeneratedArt] = useState<GenerationResponse | null>(null);
  const [showResult, setShowResult] = useState(false);

  const handleGenerate = (result: GenerationResponse) => {
    setGeneratedArt(result);
    setShowResult(true);
  };

  const handleReset = () => {
    setGeneratedArt(null);
    setShowResult(false);
  };

  const handleDownload = async () => {
    if (!generatedArt?.imageUrl) return;
    
    try {
      const response = await fetch(generatedArt.imageUrl);
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `ai-artwork-${Date.now()}.jpg`;
      document.body.appendChild(a);
      a.click();
      window.URL.revokeObjectURL(url);
      document.body.removeChild(a);
    } catch (error) {
      console.error('Download failed:', error);
    }
  };

  return (
    <>
      <Navigation />
      <ParticleBackground />
      
      <main className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 pt-24">
        <div className="container mx-auto px-6 py-12">
          
          {!showResult ? (
            /* Generation Form */
            <div className="max-w-4xl mx-auto">
              <div className="text-center mb-12 animate-reveal">
                <h1 className="text-5xl font-bold text-white mb-6">
                  <span className="bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent">
                    Generate AI Art
                  </span>
                </h1>
                <p className="text-xl text-gray-300 max-w-2xl mx-auto">
                  Transform your imagination into stunning visual art using advanced AI technology.
                  Powered by FLUX-1.1-Pro for professional quality results.
                </p>
              </div>

              <div className="bg-white/5 backdrop-blur-sm rounded-2xl border border-white/10 p-8 animate-reveal">
                <GenerationForm onGenerate={handleGenerate} />
              </div>
            </div>
          ) : (
            /* Generated Art Result */
            <div className="max-w-6xl mx-auto">
              <div className="text-center mb-8 animate-reveal">
                <h1 className="text-4xl font-bold text-white mb-4">
                  Your AI Artwork is Ready!
                </h1>
                <p className="text-gray-300">
                  Generated in {generatedArt?.generationTime ? `${(generatedArt.generationTime / 1000).toFixed(1)}s` : 'N/A'}
                </p>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
                {/* Generated Image */}
                <div className="space-y-6">
                  <div className="art-card-3d relative aspect-square bg-white/5 backdrop-blur-sm rounded-2xl overflow-hidden border border-white/10 hover:border-purple-500/50 transition-all duration-300">
                    {generatedArt?.imageUrl ? (
                      <img
                        src={generatedArt.imageUrl}
                        alt="Generated AI artwork"
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center">
                        <p className="text-gray-400">No image generated</p>
                      </div>
                    )}
                    
                    {/* Floating action buttons */}
                    <div className="absolute top-4 right-4 flex space-x-2">
                      <Button
                        onClick={handleDownload}
                        size="sm"
                        className="btn-3d bg-white/20 hover:bg-white/30 text-white border border-white/30 rounded-full"
                      >
                        Download
                      </Button>
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex gap-4">
                    <Button
                      onClick={handleReset}
                      className="flex-1 btn-3d bg-gradient-to-r from-purple-600 to-cyan-600 hover:from-purple-700 hover:to-cyan-700 text-white py-3 rounded-xl font-semibold"
                    >
                      Generate Another
                    </Button>
                    <Button
                      variant="outline"
                      className="btn-3d border-2 border-white/30 text-white hover:bg-white/10 py-3 px-6 rounded-xl font-semibold"
                    >
                      Share
                    </Button>
                  </div>
                </div>

                {/* Art Details & Stats */}
                <div className="space-y-6">
                  <div className="bg-white/5 backdrop-blur-sm rounded-2xl border border-white/10 p-6">
                    <h3 className="text-2xl font-semibold text-white mb-4">Artwork Details</h3>
                    
                    <div className="space-y-4">
                      <div>
                        <label className="text-sm text-gray-400 block mb-1">Generation Time</label>
                        <p className="text-white">
                          {generatedArt?.generationTime 
                            ? `${(generatedArt.generationTime / 1000).toFixed(1)} seconds` 
                            : 'Unknown'
                          }
                        </p>
                      </div>
                      
                      <div>
                        <label className="text-sm text-gray-400 block mb-1">Model</label>
                        <p className="text-white">FLUX-1.1-Pro</p>
                      </div>
                      
                      <div>
                        <label className="text-sm text-gray-400 block mb-1">Status</label>
                        <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-green-500/20 text-green-300">
                          <div className="w-2 h-2 bg-green-400 rounded-full mr-2 animate-pulse" />
                          Successfully Generated
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Quick Actions */}
                  <div className="bg-white/5 backdrop-blur-sm rounded-2xl border border-white/10 p-6">
                    <h3 className="text-xl font-semibold text-white mb-4">Quick Actions</h3>
                    
                    <div className="space-y-3">
                      <Button
                        variant="ghost"
                        className="w-full justify-start text-gray-300 hover:text-white hover:bg-white/10"
                        onClick={handleDownload}
                      >
                        <span className="mr-3">📥</span>
                        Download High Resolution
                      </Button>
                      
                      <Button
                        variant="ghost"
                        className="w-full justify-start text-gray-300 hover:text-white hover:bg-white/10"
                      >
                        <span className="mr-3">❤️</span>
                        Add to Favorites
                      </Button>
                      
                      <Button
                        variant="ghost"
                        className="w-full justify-start text-gray-300 hover:text-white hover:bg-white/10"
                      >
                        <span className="mr-3">🔗</span>
                        Share on Social Media
                      </Button>
                      
                      <Button
                        variant="ghost"
                        className="w-full justify-start text-gray-300 hover:text-white hover:bg-white/10"
                      >
                        <span className="mr-3">🎨</span>
                        Create Variation
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </main>
    </>
  );
}