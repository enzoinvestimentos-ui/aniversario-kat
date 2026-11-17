/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useCallback, useEffect, useState } from 'react';
import { motion } from 'motion/react';
import { CHAPTERS } from './config/letterConfig';
import { ConfettiBurst } from './components/ConfettiBurst';
import { NavigationChrome } from './components/NavigationChrome';
import { HeroSurpriseSection } from './components/HeroSurpriseSection';
import { BirthdayCelebrationSection } from './components/BirthdayCelebrationSection';
import { FavoritesSection } from './components/FavoritesSection';
import { SmallMessageSection } from './components/SmallMessageSection';
import { HandwrittenLetterSection } from './components/HandwrittenLetterSection';
import { ClosingSection } from './components/ClosingSection';
import { VintageAudioPlayer } from './components/VintageAudioPlayer';

export default function App() {
  const [isOpened, setIsOpened] = useState(false);
  const [confettiKey, setConfettiKey] = useState(0);
  const [musicStartTrigger, setMusicStartTrigger] = useState(0);
  const [activeSectionId, setActiveSectionId] = useState<string>('surprise');
  const [scrollProgress, setScrollProgress] = useState<number>(0);

  const triggerConfetti = useCallback(() => {
    setConfettiKey((prev) => prev + 1);
  }, []);

  const scrollToSection = useCallback((sectionId: string) => {
    const target = document.getElementById(sectionId);
    if (!target) return;
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    target.scrollIntoView({
      behavior: prefersReducedMotion ? 'auto' : 'smooth',
      block: 'start',
    });
  }, []);

  const handleOpenSurprise = useCallback(() => {
    if (!isOpened) {
      setIsOpened(true);
      triggerConfetti();
      setMusicStartTrigger((prev) => prev + 1);
      window.setTimeout(() => {
        scrollToSection('celebration');
      }, 90);
    } else {
      scrollToSection('celebration');
    }
  }, [isOpened, scrollToSection, triggerConfetti]);

  const handleBackToTop = useCallback(() => {
    scrollToSection('surprise');
  }, [scrollToSection]);

  useEffect(() => {
    if (!isOpened) return;

    const handleScroll = () => {
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const progress = docHeight > 0 ? scrollTop / docHeight : 0;
      setScrollProgress(progress);

      const viewportFocus = scrollTop + window.innerHeight * 0.35;
      let currentId = CHAPTERS[0].id;

      for (const chapter of CHAPTERS) {
        const el = document.getElementById(chapter.id);
        if (el && el.offsetTop <= viewportFocus) {
          currentId = chapter.id;
        }
      }

      setActiveSectionId(currentId);
    };

    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('resize', handleScroll, { passive: true });

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleScroll);
    };
  }, [isOpened]);

  return (
    <div className="min-h-screen bg-[#FFF7ED] text-[#4A2925] selection:bg-[#E9A6AD] selection:text-[#4A2925]">
      <ConfettiBurst triggerKey={confettiKey} />

      <NavigationChrome
        activeSectionId={activeSectionId}
        scrollProgress={scrollProgress}
        isOpened={isOpened}
        onJumpTo={scrollToSection}
      />

      <VintageAudioPlayer isOpened={isOpened} autoStartTrigger={musicStartTrigger} />

      <main>
        <HeroSurpriseSection isOpened={isOpened} onOpenSurprise={handleOpenSurprise} />

        {isOpened && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          >
            <BirthdayCelebrationSection onTriggerConfetti={triggerConfetti} />
            <FavoritesSection />
            <SmallMessageSection />
            <HandwrittenLetterSection />
            <ClosingSection onBackToTop={handleBackToTop} />
          </motion.div>
        )}
      </main>
    </div>
  );
}
