'use client';

import Link from 'next/link';
import { Button } from '@/components/ui/button';
import ParticleBackground from '@/components/ParticleBackground';
import Navigation from '@/components/Navigation';

export default function HomePage() {
  return (
    <>
      <Navigation />
      <ParticleBackground />
      
      <main className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 animate-gradient relative overflow-hidden">
        {/* Hero Section */}
        <section className="relative z-10 pt-32 pb-20">
          <div className="container mx-auto px-6">
            {/* Floating Art Previews */}
            <div className="absolute inset-0 pointer-events-none">
              <div className="absolute top-20 left-10 w-32 h-32 bg-gradient-to-br from-purple-500/30 to-pink-500/30 rounded-xl animate-float backdrop-blur-sm border border-white/10">
                <img 
                  src="https://placehold.co/128x128?text=Abstract+digital+art+with+geometric+patterns+and+vibrant+neon+colors" 
                  alt="Abstract digital art with geometric patterns and vibrant neon colors"
                  className="w-full h-full object-cover rounded-xl opacity-80"
                />
              </div>
              <div className="absolute top-40 right-20 w-28 h-28 bg-gradient-to-br from-cyan-500/30 to-blue-500/30 rounded-full animate-float-delay backdrop-blur-sm border border-white/10">
                <img 
                  src="https://placehold.co/112x112?text=Fantasy+landscape+with+magical+creatures+and+ethereal+lighting" 
                  alt="Fantasy landscape with magical creatures and ethereal lighting"
                  className="w-full h-full object-cover rounded-full opacity-80"
                />
              </div>
              <div className="absolute bottom-40 left-20 w-36 h-36 bg-gradient-to-br from-green-500/30 to-teal-500/30 rounded-2xl animate-morph backdrop-blur-sm border border-white/10">
                <img 
                  src="https://placehold.co/144x144?text=Photorealistic+portrait+with+dramatic+studio+lighting+and+professional+composition" 
                  alt="Photorealistic portrait with dramatic studio lighting and professional composition"
                  className="w-full h-full object-cover rounded-2xl opacity-80"
                />
              </div>
              <div className="absolute bottom-20 right-16 w-30 h-30 bg-gradient-to-br from-orange-500/30 to-red-500/30 rounded-xl animate-float backdrop-blur-sm border border-white/10" style={{ animationDelay: '4s' }}>
                <img 
                  src="https://placehold.co/120x120?text=Oil+painting+style+artwork+with+textured+brushstrokes+and+classical+composition" 
                  alt="Oil painting style artwork with textured brushstrokes and classical composition"
                  className="w-full h-full object-cover rounded-xl opacity-80"
                />
              </div>
            </div>

            <div className="text-center animate-reveal">
              <h1 className="text-7xl lg:text-8xl font-bold text-white mb-8 leading-tight">
                <span className="bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-400 bg-clip-text text-transparent animate-gradient">
                  AI Art Studio
                </span>
              </h1>
              
              <p className="text-2xl text-gray-300 mb-12 max-w-3xl mx-auto leading-relaxed">
                Create stunning AI-generated artwork with advanced 3D animations and cutting-edge technology.
                Powered by FLUX-1.1-Pro for professional-quality results.
              </p>

              {/* CTA Buttons */}
              <div className="flex flex-col sm:flex-row gap-6 justify-center items-center mb-16">
                <Link href="/generate">
                  <Button className="btn-3d bg-gradient-to-r from-purple-600 to-cyan-600 hover:from-purple-700 hover:to-cyan-700 text-white px-8 py-4 text-lg font-semibold rounded-full shadow-2xl hover:shadow-purple-500/25 transition-all duration-300">
                    Start Creating
                    <span className="ml-2">✨</span>
                  </Button>
                </Link>
                
                <Link href="/gallery">
                  <Button variant="outline" className="btn-3d border-2 border-white/30 text-white hover:bg-white/10 px-8 py-4 text-lg font-semibold rounded-full backdrop-blur-sm transition-all duration-300">
                    Explore Gallery
                    <span className="ml-2">🎭</span>
                  </Button>
                </Link>
              </div>

              {/* Features Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-6xl mx-auto">
                {features.map((feature, index) => (
                  <div 
                    key={feature.title}
                    className="art-card-3d bg-white/5 backdrop-blur-sm rounded-xl p-6 border border-white/10 hover:border-purple-500/50 transition-all duration-300"
                    style={{ animationDelay: `${index * 0.2}s` }}
                  >
                    <div className="text-4xl mb-4 animate-float" style={{ animationDelay: `${index * 0.5}s` }}>
                      {feature.icon}
                    </div>
                    <h3 className="text-xl font-semibold text-white mb-3">{feature.title}</h3>
                    <p className="text-gray-400 text-sm leading-relaxed">{feature.description}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Statistics Section */}
        <section className="relative z-10 py-20 border-t border-white/10">
          <div className="container mx-auto px-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
              {stats.map((stat, index) => (
                <div 
                  key={stat.label}
                  className="text-center animate-pulse3d"
                  style={{ animationDelay: `${index * 0.3}s` }}
                >
                  <div className="text-5xl font-bold bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent mb-2">
                    {stat.value}
                  </div>
                  <p className="text-gray-300 font-medium">{stat.label}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>
    </>
  );
}

// Features data
const features = [
  {
    icon: '🤖',
    title: 'AI Generation',
    description: 'Powered by FLUX-1.1-Pro for professional-quality AI artwork generation with advanced prompting.'
  },
  {
    icon: '🎨',
    title: '3D Animations',
    description: 'Immersive 3D effects and smooth animations throughout the entire user experience.'
  },
  {
    icon: '🖼️',
    title: 'Interactive Gallery',
    description: 'Browse and explore AI artwork with dynamic filtering and beautiful 3D presentations.'
  },
  {
    icon: '📊',
    title: 'Personal Dashboard',
    description: 'Manage your art collection, track statistics, and organize your favorite creations.'
  }
];

// Statistics data
const stats = [
  { value: '10K+', label: 'Artworks Generated' },
  { value: '500+', label: 'Active Users' },
  { value: '50+', label: 'Art Styles' }
];