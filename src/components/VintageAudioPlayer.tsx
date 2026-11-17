import React, { useEffect, useRef, useState } from 'react';
import { Disc3, Pause, Play, Volume2, VolumeX, Minimize2 } from 'lucide-react';
import {
  BACKGROUND_MUSIC_SRC,
  BACKGROUND_MUSIC_TITLE,
} from '../config/letterConfig';
import { BirthdayMusicSynth } from '../utils/birthdayMusicSynth';

interface VintageAudioPlayerProps {
  isOpened: boolean;
  autoStartTrigger: number;
}

export const VintageAudioPlayer: React.FC<VintageAudioPlayerProps> = ({
  isOpened,
  autoStartTrigger,
}) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [volume, setVolume] = useState(0.35);
  const [isMinimized, setIsMinimized] = useState(false);
  const [showVolumeSlider, setShowVolumeSlider] = useState(false);

  const synthRef = useRef<BirthdayMusicSynth | null>(null);
  const audioElRef = useRef<HTMLAudioElement | null>(null);
  const hasExternalAudio = Boolean(BACKGROUND_MUSIC_SRC);

  useEffect(() => {
    if (!hasExternalAudio) {
      synthRef.current = new BirthdayMusicSynth();
    }

    return () => {
      synthRef.current?.dispose();
      synthRef.current = null;
      if (audioElRef.current) {
        audioElRef.current.pause();
      }
    };
  }, [hasExternalAudio]);

  // Inicia suavemente ao abrir a surpresa (gesto válido do usuário)
  useEffect(() => {
    if (autoStartTrigger <= 0) return;

    const startAudio = async () => {
      if (hasExternalAudio && audioElRef.current) {
        audioElRef.current.volume = isMuted ? 0 : volume;
        try {
          await audioElRef.current.play();
          setIsPlaying(true);
        } catch {
          setIsPlaying(false);
        }
      } else if (synthRef.current) {
        synthRef.current.setVolume(volume);
        synthRef.current.setMuted(isMuted);
        const started = await synthRef.current.start();
        setIsPlaying(started);
      }
    };

    startAudio();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [autoStartTrigger]);

  useEffect(() => {
    if (hasExternalAudio && audioElRef.current) {
      audioElRef.current.volume = isMuted ? 0 : volume;
    } else if (synthRef.current) {
      synthRef.current.setVolume(volume);
      synthRef.current.setMuted(isMuted);
    }
  }, [volume, isMuted, hasExternalAudio]);

  const togglePlay = async () => {
    if (hasExternalAudio && audioElRef.current) {
      if (isPlaying) {
        audioElRef.current.pause();
        setIsPlaying(false);
      } else {
        try {
          await audioElRef.current.play();
          setIsPlaying(true);
        } catch {
          setIsPlaying(false);
        }
      }
      return;
    }

    if (!synthRef.current) return;
    if (isPlaying) {
      synthRef.current.pause();
      setIsPlaying(false);
    } else {
      const started = await synthRef.current.start();
      setIsPlaying(started);
    }
  };

  const toggleMute = () => {
    setIsMuted((prev) => !prev);
  };

  if (!isOpened) return null;

  return (
    <>
      {hasExternalAudio && (
        <audio
          ref={audioElRef}
          src={BACKGROUND_MUSIC_SRC}
          loop
          preload="metadata"
          aria-hidden="true"
        />
      )}

      <aside
        aria-label="Player de música ambiente"
        className="fixed bottom-4 left-4 z-40"
      >
        {isMinimized ? (
          <button
            type="button"
            onClick={() => setIsMinimized(false)}
            aria-label="Expandir player de música"
            title={BACKGROUND_MUSIC_TITLE}
            className="paper-texture flex items-center justify-center w-11 h-11 rounded-full border border-[#8B5947]/25 polaroid-shadow text-[#4A2925] hover:bg-[#F7ECDF] transition-colors cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-[#8B5947]"
          >
            <Disc3
              className={`w-5 h-5 text-[#4A2925] ${
                isPlaying ? 'motion-safe:animate-[spin_6s_linear_infinite]' : ''
              }`}
              aria-hidden="true"
            />
          </button>
        ) : (
          <div className="paper-texture flex items-center gap-2 rounded-xl border border-[#8B5947]/20 px-2.5 py-1.5 polaroid-shadow">
            {/* Disco de vinil vintage */}
            <div
              className="relative flex items-center justify-center w-8 h-8 rounded-full bg-[#4A2925] text-[#FFF7ED] shrink-0"
              aria-hidden="true"
            >
              <Disc3
                className={`w-5 h-5 text-[#E9A6AD] ${
                  isPlaying ? 'motion-safe:animate-[spin_6s_linear_infinite]' : ''
                }`}
              />
            </div>

            {/* Informações da faixa (sem pílulas, tipografia limpa) */}
            <div className="min-w-0 pr-1 max-w-[130px] sm:max-w-[165px]">
              <p className="font-serif text-xs font-medium text-[#4A2925] truncate">
                {BACKGROUND_MUSIC_TITLE}
              </p>
              <p className="text-[11px] text-[#8B5947] leading-tight truncate">
                {isPlaying ? (isMuted ? 'Sem som' : 'Tocando suave') : 'Em pausa'}
              </p>
            </div>

            {/* Controles silenciosos e táteis */}
            <div className="flex items-center gap-0.5">
              <button
                type="button"
                onClick={togglePlay}
                aria-label={isPlaying ? 'Pausar música' : 'Tocar música'}
                className="inline-flex items-center justify-center w-10 h-10 rounded-lg bg-[#E9A6AD]/30 hover:bg-[#E9A6AD]/50 text-[#4A2925] transition-colors cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-[#8B5947]"
              >
                {isPlaying ? (
                  <Pause className="w-4 h-4" aria-hidden="true" />
                ) : (
                  <Play className="w-4 h-4 translate-x-[0.5px]" aria-hidden="true" />
                )}
              </button>

              <div className="relative flex items-center">
                <button
                  type="button"
                  onClick={toggleMute}
                  onMouseEnter={() => setShowVolumeSlider(true)}
                  aria-label={isMuted ? 'Ativar som' : 'Silenciar música'}
                  className="inline-flex items-center justify-center w-10 h-10 rounded-lg hover:bg-[#8B5947]/10 text-[#8B5947] hover:text-[#4A2925] transition-colors cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-[#8B5947]"
                >
                  {isMuted || volume === 0 ? (
                    <VolumeX className="w-4 h-4" aria-hidden="true" />
                  ) : (
                    <Volume2 className="w-4 h-4" aria-hidden="true" />
                  )}
                </button>

                {showVolumeSlider && (
                  <div
                    onMouseLeave={() => setShowVolumeSlider(false)}
                    className="hidden sm:flex items-center ml-1 pr-1"
                  >
                    <input
                      type="range"
                      min={0}
                      max={1}
                      step={0.05}
                      value={isMuted ? 0 : volume}
                      onChange={(e) => {
                        const next = parseFloat(e.target.value);
                        setVolume(next);
                        if (next > 0 && isMuted) setIsMuted(false);
                      }}
                      aria-label="Volume da música"
                      className="w-16 h-1 accent-[#8B5947] cursor-pointer"
                    />
                  </div>
                )}
              </div>

              <button
                type="button"
                onClick={() => setIsMinimized(true)}
                aria-label="Recolher player de música"
                className="inline-flex items-center justify-center w-10 h-10 rounded-lg hover:bg-[#8B5947]/10 text-[#8B5947] hover:text-[#4A2925] transition-colors cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-[#8B5947]"
              >
                <Minimize2 className="w-4 h-4" aria-hidden="true" />
              </button>
            </div>
          </div>
        )}
      </aside>
    </>
  );
};
