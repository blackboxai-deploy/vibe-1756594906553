'use client';

interface LoadingSpinnerProps {
  size?: 'sm' | 'md' | 'lg' | 'xl';
  text?: string;
  variant?: 'default' | '3d' | 'pulse' | 'wave';
}

export default function LoadingSpinner({ 
  size = 'md', 
  text, 
  variant = 'default' 
}: LoadingSpinnerProps) {
  const sizeClasses = {
    sm: 'w-6 h-6',
    md: 'w-10 h-10',
    lg: 'w-16 h-16',
    xl: 'w-24 h-24'
  };

  const renderSpinner = () => {
    switch (variant) {
      case '3d':
        return (
          <div className={`relative ${sizeClasses[size]}`}>
            <div className="absolute inset-0 border-4 border-purple-500/30 rounded-lg animate-spin3d" />
            <div className="absolute inset-2 border-2 border-cyan-500/50 rounded-md animate-spin3d" style={{ animationDirection: 'reverse', animationDuration: '2s' }} />
            <div className="absolute inset-4 bg-gradient-to-br from-purple-500 to-cyan-500 rounded-sm animate-pulse3d" />
          </div>
        );
      
      case 'pulse':
        return (
          <div className={`${sizeClasses[size]} relative`}>
            <div className="absolute inset-0 bg-gradient-to-r from-purple-500 to-cyan-500 rounded-full animate-pulse3d" />
            <div className="absolute inset-2 bg-gradient-to-r from-cyan-500 to-purple-500 rounded-full animate-pulse3d" style={{ animationDelay: '0.5s' }} />
          </div>
        );
      
      case 'wave':
        return (
          <div className={`flex items-center space-x-1 ${size === 'sm' ? 'space-x-0.5' : size === 'lg' ? 'space-x-2' : 'space-x-1'}`}>
            {[0, 1, 2, 3, 4].map((i) => (
              <div
                key={i}
                className={`bg-gradient-to-t from-purple-500 to-cyan-500 rounded-full ${
                  size === 'sm' ? 'w-1 h-4' : 
                  size === 'md' ? 'w-2 h-8' : 
                  size === 'lg' ? 'w-3 h-12' : 'w-4 h-16'
                }`}
                style={{
                  animation: 'wave 1.5s ease-in-out infinite',
                  animationDelay: `${i * 0.1}s`
                }}
              />
            ))}
          </div>
        );
      
      default:
        return (
          <div className={`${sizeClasses[size]} border-4 border-purple-500/30 border-t-purple-500 rounded-full animate-spin`} />
        );
    }
  };

  return (
    <div className="flex flex-col items-center justify-center space-y-4">
      {renderSpinner()}
      {text && (
        <p className="text-gray-300 text-center animate-pulse">
          {text}
        </p>
      )}
    </div>
  );
}

// AI Generation specific loader
export function AIGenerationLoader({ progress = 0 }: { progress?: number }) {
  return (
    <div className="flex flex-col items-center justify-center space-y-6 p-8">
      {/* 3D Cube Loader */}
      <div className="relative w-20 h-20 perspective-1000">
        <div className="w-full h-full preserve-3d animate-spin3d">
          {/* Cube faces */}
          <div className="absolute inset-0 bg-gradient-to-br from-purple-500/80 to-cyan-500/80 rounded-lg transform rotateY-0" />
          <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/80 to-purple-500/80 rounded-lg transform rotateY-90 translateZ-10" />
          <div className="absolute inset-0 bg-gradient-to-br from-purple-500/80 to-cyan-500/80 rounded-lg transform rotateY-180" />
          <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/80 to-purple-500/80 rounded-lg transform rotateY-270 translateZ-10" />
        </div>
      </div>

      {/* Progress text */}
      <div className="text-center space-y-2">
        <p className="text-white font-medium">Creating your AI artwork...</p>
        <p className="text-gray-400 text-sm">This may take 30-60 seconds</p>
        {progress > 0 && (
          <div className="w-64 bg-gray-700 rounded-full h-2">
            <div 
              className="bg-gradient-to-r from-purple-500 to-cyan-500 h-2 rounded-full transition-all duration-500"
              style={{ width: `${progress}%` }}
            />
          </div>
        )}
      </div>

      {/* Floating particles around loader */}
      <div className="absolute inset-0 pointer-events-none">
        {[...Array(8)].map((_, i) => (
          <div
            key={i}
            className="absolute w-2 h-2 bg-gradient-to-r from-purple-400 to-cyan-400 rounded-full animate-particles"
            style={{
              left: `${20 + Math.cos(i * 45) * 30}%`,
              top: `${50 + Math.sin(i * 45) * 30}%`,
              animationDelay: `${i * 0.3}s`
            }}
          />
        ))}
      </div>
    </div>
  );
}