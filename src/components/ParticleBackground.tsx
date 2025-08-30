'use client';

import { useEffect, useState } from 'react';

interface Particle {
  id: number;
  x: number;
  y: number;
  size: number;
  opacity: number;
  duration: number;
  delay: number;
}

export default function ParticleBackground() {
  const [particles, setParticles] = useState<Particle[]>([]);

  useEffect(() => {
    // Generate particles
    const newParticles: Particle[] = [];
    for (let i = 0; i < 50; i++) {
      newParticles.push({
        id: i,
        x: Math.random() * 100,
        y: Math.random() * 100,
        size: Math.random() * 4 + 1,
        opacity: Math.random() * 0.5 + 0.2,
        duration: Math.random() * 20 + 10,
        delay: Math.random() * 5
      });
    }
    setParticles(newParticles);
  }, []);

  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
      {particles.map((particle) => (
        <div
          key={particle.id}
          className="absolute rounded-full bg-gradient-to-r from-purple-400 to-cyan-400"
          style={{
            left: `${particle.x}%`,
            top: `${particle.y}%`,
            width: `${particle.size}px`,
            height: `${particle.size}px`,
            opacity: particle.opacity,
            animation: `particles ${particle.duration}s linear infinite ${particle.delay}s`
          }}
        />
      ))}
      
      {/* Floating geometric shapes */}
      <div className="absolute top-20 left-10 w-20 h-20 bg-gradient-to-r from-purple-500/20 to-pink-500/20 rounded-lg animate-float" />
      <div className="absolute top-40 right-20 w-16 h-16 bg-gradient-to-r from-cyan-500/20 to-blue-500/20 rounded-full animate-float-delay" />
      <div className="absolute bottom-40 left-20 w-24 h-24 bg-gradient-to-r from-green-500/20 to-teal-500/20 animate-morph" />
      <div className="absolute bottom-20 right-10 w-18 h-18 bg-gradient-to-r from-orange-500/20 to-red-500/20 rounded-lg animate-float" 
           style={{ animationDelay: '4s' }} />
    </div>
  );
}