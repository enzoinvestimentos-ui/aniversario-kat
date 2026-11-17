import React from 'react';

interface FloatingMotifsProps {
  variant?: 'hero' | 'closing';
}

export const FloatingMotifs: React.FC<FloatingMotifsProps> = ({ variant = 'hero' }) => {
  return (
    <div
      className="pointer-events-none absolute inset-0 overflow-hidden select-none"
      aria-hidden="true"
    >
      {/* Top-left tiny heart */}
      <svg
        className="animate-gentle-float absolute top-[12%] left-[8%] w-5 h-5 text-[#E9A6AD]/65"
        style={{ animationDelay: '0s', animationDuration: '6.5s' }}
        viewBox="0 0 24 24"
        fill="currentColor"
      >
        <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
      </svg>

      {/* Top-right four-point star */}
      <svg
        className="animate-soft-twinkle absolute top-[16%] right-[11%] w-6 h-6 text-[#D6A36A]/70"
        style={{ animationDelay: '0.8s' }}
        viewBox="0 0 24 24"
        fill="currentColor"
      >
        <path d="M12 2L14.4 9.6L22 12L14.4 14.4L12 22L9.6 14.4L2 12L9.6 9.6L12 2Z" />
      </svg>

      {/* Mid-left snapped chocolate wafer piece (only in hero) or star (in closing) */}
      {variant === 'hero' ? (
        <svg
          className="animate-gentle-float absolute top-[52%] left-[6%] w-7 h-7 text-[#8B5947]/35 hidden sm:block"
          style={{ animationDelay: '1.4s', animationDuration: '7.5s' }}
          viewBox="0 0 32 32"
          fill="none"
        >
          <rect
            x="4"
            y="8"
            width="10"
            height="16"
            rx="1.5"
            transform="rotate(-8 4 8)"
            fill="currentColor"
          />
          <rect
            x="17"
            y="7"
            width="10"
            height="16"
            rx="1.5"
            transform="rotate(6 17 7)"
            fill="currentColor"
            fillOpacity="0.85"
          />
        </svg>
      ) : (
        <svg
          className="animate-soft-twinkle absolute top-[45%] left-[9%] w-4 h-4 text-[#D98C98]/60 hidden sm:block"
          style={{ animationDelay: '1.2s' }}
          viewBox="0 0 24 24"
          fill="currentColor"
        >
          <path d="M12 2L14.4 9.6L22 12L14.4 14.4L12 22L9.6 14.4L2 12L9.6 9.6L12 2Z" />
        </svg>
      )}

      {/* Mid-right musical eighth note (hero) or heart (closing) */}
      {variant === 'hero' ? (
        <svg
          className="animate-gentle-float absolute top-[42%] right-[8%] w-6 h-6 text-[#8B5947]/45 hidden sm:block"
          style={{ animationDelay: '2.1s', animationDuration: '7s' }}
          viewBox="0 0 24 24"
          fill="currentColor"
        >
          <path d="M12 3v10.55c-.59-.34-1.27-.55-2-.55-2.21 0-4 1.79-4 4s1.79 4 4 4 4-1.79 4-4V7h4V3h-6z" />
        </svg>
      ) : (
        <svg
          className="animate-gentle-float absolute top-[38%] right-[9%] w-5 h-5 text-[#E9A6AD]/65 hidden sm:block"
          style={{ animationDelay: '1.8s' }}
          viewBox="0 0 24 24"
          fill="currentColor"
        >
          <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
        </svg>
      )}

      {/* Bottom-left subtle star */}
      <svg
        className="animate-soft-twinkle absolute bottom-[18%] left-[14%] w-4 h-4 text-[#D6A36A]/65"
        style={{ animationDelay: '1.9s' }}
        viewBox="0 0 24 24"
        fill="currentColor"
      >
        <path d="M12 2L14.4 9.6L22 12L14.4 14.4L12 22L9.6 14.4L2 12L9.6 9.6L12 2Z" />
      </svg>

      {/* Bottom-right tiny heart */}
      <svg
        className="animate-gentle-float absolute bottom-[16%] right-[14%] w-4 h-4 text-[#D98C98]/60"
        style={{ animationDelay: '0.5s', animationDuration: '5.8s' }}
        viewBox="0 0 24 24"
        fill="currentColor"
      >
        <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
      </svg>
    </div>
  );
};
