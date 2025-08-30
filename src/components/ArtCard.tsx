'use client';

import { useState } from 'react';
import Image from 'next/image';
import { ArtPiece } from '@/lib/types';
import { Button } from '@/components/ui/button';

interface ArtCardProps {
  art: ArtPiece;
  onView?: (art: ArtPiece) => void;
  className?: string;
}

export default function ArtCard({ art, onView, className = '' }: ArtCardProps) {
  const [imageLoaded, setImageLoaded] = useState(false);
  const [liked, setLiked] = useState(false);

  const handleLike = () => {
    setLiked(!liked);
    // TODO: Implement like functionality
  };

  const handleView = () => {
    onView?.(art);
  };

  return (
    <div className={`art-card-3d group relative bg-white/5 backdrop-blur-sm rounded-xl overflow-hidden border border-white/10 hover:border-purple-500/50 transition-all duration-300 ${className}`}>
      {/* Art Image */}
      <div className="relative aspect-square overflow-hidden">
        <Image
          src={art.imageUrl}
          alt={art.prompt}
          fill
          className={`object-cover transition-all duration-500 group-hover:scale-110 ${
            imageLoaded ? 'opacity-100' : 'opacity-0'
          }`}
          onLoad={() => setImageLoaded(true)}
        />
        
        {/* Loading skeleton */}
        {!imageLoaded && (
          <div className="absolute inset-0 bg-gradient-to-br from-gray-800 to-gray-900 animate-pulse flex items-center justify-center">
            <div className="w-8 h-8 border-2 border-purple-500 border-t-transparent rounded-full animate-spin3d" />
          </div>
        )}

        {/* Overlay on hover */}
        <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
          <div className="flex space-x-3">
            <Button
              onClick={handleView}
              size="sm"
              className="btn-3d bg-white/20 hover:bg-white/30 text-white border border-white/30 rounded-full"
            >
              View
            </Button>
            <Button
              onClick={handleLike}
              size="sm"
              variant="ghost"
              className={`btn-3d rounded-full ${
                liked 
                  ? 'text-red-400 hover:text-red-300' 
                  : 'text-white hover:text-red-400'
              }`}
            >
              <HeartIcon filled={liked} />
            </Button>
          </div>
        </div>

        {/* Style badge */}
        <div className="absolute top-3 left-3 bg-black/70 backdrop-blur-sm rounded-full px-3 py-1">
          <span className="text-xs font-medium text-white capitalize">
            {art.style.name}
          </span>
        </div>
      </div>

      {/* Art Info */}
      <div className="p-4">
        <p className="text-gray-300 text-sm mb-2 line-clamp-2">
          {art.prompt}
        </p>
        
        <div className="flex items-center justify-between text-xs text-gray-400">
          <span>{art.likes} likes</span>
          <span>{art.downloads} downloads</span>
        </div>
      </div>

      {/* 3D hover glow effect */}
      <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
        <div className="absolute inset-0 bg-gradient-to-r from-purple-500/10 to-cyan-500/10 rounded-xl" />
      </div>
    </div>
  );
}

// Heart icon component
function HeartIcon({ filled = false }: { filled?: boolean }) {
  return (
    <svg 
      className="w-4 h-4" 
      fill={filled ? 'currentColor' : 'none'} 
      stroke="currentColor" 
      viewBox="0 0 24 24"
    >
      <path 
        strokeLinecap="round" 
        strokeLinejoin="round" 
        strokeWidth={2} 
        d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" 
      />
    </svg>
  );
}