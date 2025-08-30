// Custom animation utilities for 3D effects

export const animations = {
  // Floating animation for hero art pieces
  float: `
    @keyframes float {
      0%, 100% { transform: translate3d(0, 0, 0) rotateY(0deg); }
      25% { transform: translate3d(10px, -15px, 10px) rotateY(5deg); }
      50% { transform: translate3d(-5px, -25px, 5px) rotateY(-3deg); }
      75% { transform: translate3d(-10px, -10px, -5px) rotateY(8deg); }
    }
  `,
  
  // Particle movement animation
  particles: `
    @keyframes particles {
      0% { transform: translate3d(0, 0, 0) scale(0.5); opacity: 0; }
      50% { opacity: 1; }
      100% { transform: translate3d(100vw, -100vh, 50px) scale(1); opacity: 0; }
    }
  `,
  
  // Card hover tilt effect
  tilt: `
    @keyframes tilt {
      0% { transform: perspective(1000px) rotateX(0deg) rotateY(0deg); }
      100% { transform: perspective(1000px) rotateX(5deg) rotateY(10deg); }
    }
  `,
  
  // 3D pulse for loading states
  pulse3d: `
    @keyframes pulse3d {
      0%, 100% { transform: scale3d(1, 1, 1); }
      50% { transform: scale3d(1.05, 1.05, 1.05); }
    }
  `,
  
  // Smooth reveal animation
  reveal: `
    @keyframes reveal {
      0% { 
        opacity: 0; 
        transform: translate3d(0, 50px, 0) rotateX(15deg); 
      }
      100% { 
        opacity: 1; 
        transform: translate3d(0, 0, 0) rotateX(0deg); 
      }
    }
  `,
  
  // Rotating background gradient
  gradientRotate: `
    @keyframes gradientRotate {
      0% { background-position: 0% 50%; }
      50% { background-position: 100% 50%; }
      100% { background-position: 0% 50%; }
    }
  `
};

export const animationClasses = {
  float: 'animate-[float_6s_ease-in-out_infinite]',
  floatDelay: 'animate-[float_6s_ease-in-out_infinite_2s]',
  particles: 'animate-[particles_8s_linear_infinite]',
  tilt: 'hover:animate-[tilt_0.3s_ease-out_forwards]',
  pulse3d: 'animate-[pulse3d_2s_ease-in-out_infinite]',
  reveal: 'animate-[reveal_0.8s_ease-out_forwards]',
  gradientBg: 'animate-[gradientRotate_15s_ease_infinite]'
};

export const transform3d = {
  perspective: 'perspective-1000',
  preserve3d: 'transform-style-preserve-3d',
  backfaceHidden: 'backface-visibility-hidden'
};

// Intersection Observer for scroll animations
export const useScrollAnimation = (threshold = 0.1) => {
  return {
    threshold,
    rootMargin: '0px 0px -100px 0px'
  };
};

// 3D transform utilities
export const create3DTransform = (
  x = 0, 
  y = 0, 
  z = 0, 
  rotateX = 0, 
  rotateY = 0, 
  scale = 1
) => {
  return `translate3d(${x}px, ${y}px, ${z}px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(${scale}, ${scale}, ${scale})`;
};