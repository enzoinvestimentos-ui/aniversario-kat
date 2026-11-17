import React from 'react';
import { CHAPTERS } from '../config/letterConfig';

interface NavigationChromeProps {
  activeSectionId: string;
  scrollProgress: number;
  isOpened: boolean;
  onJumpTo: (id: string) => void;
}

export const NavigationChrome: React.FC<NavigationChromeProps> = ({
  activeSectionId,
  scrollProgress,
  isOpened,
  onJumpTo,
}) => {
  if (!isOpened) return null;

  return (
    <>
      {/* Subtle 3px reading progress hairline */}
      <div
        className="fixed top-0 left-0 right-0 h-[3px] z-40 bg-[#4A2925]/10 pointer-events-none"
        aria-hidden="true"
      >
        <div
          className="h-full bg-gradient-to-r from-[#D6A36A] via-[#E9A6AD] to-[#D98C98] transition-[width] duration-150 ease-out"
          style={{ width: `${Math.min(100, Math.max(0, scrollProgress * 100))}%` }}
        />
      </div>

      {/* Pontos de navegação lateral entre capítulos (desktop) */}
      <nav
        aria-label="Capítulos da surpresa de aniversário"
        className="hidden lg:flex fixed right-7 top-1/2 -translate-y-1/2 z-30 flex-col items-end gap-3.5"
      >
        {CHAPTERS.map((chapter) => {
          const isActive = activeSectionId === chapter.id;
          return (
            <button
              key={chapter.id}
              type="button"
              onClick={() => onJumpTo(chapter.id)}
              aria-label={`Ir para ${chapter.label}`}
              aria-current={isActive ? 'location' : undefined}
              className="group flex items-center gap-3 py-1 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#8B5947] rounded-md px-1"
            >
              <span
                className={`text-xs tracking-wide transition-all duration-200 whitespace-nowrap ${
                  isActive
                    ? 'opacity-100 text-[#4A2925] font-medium translate-x-0'
                    : 'opacity-0 group-hover:opacity-100 text-[#8B5947] translate-x-1 group-hover:translate-x-0'
                }`}
              >
                {chapter.number} · {chapter.label}
              </span>
              <span
                className={`block rounded-full transition-all duration-200 ${
                  isActive
                    ? 'w-2.5 h-2.5 bg-[#D98C98] ring-4 ring-[#E9A6AD]/25'
                    : 'w-2 h-2 bg-[#8B5947]/35 group-hover:bg-[#8B5947]'
                }`}
              />
            </button>
          );
        })}
      </nav>
    </>
  );
};
