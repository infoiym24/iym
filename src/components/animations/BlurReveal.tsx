import { motion, Variants, useScroll, useTransform } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef, ReactNode, useMemo } from 'react';

interface TrainRevealTextProps {
  children: string;
  className?: string;
  charDelay?: number;
}

/**
 * TrainRevealText - Sequential letter-by-letter reveal with brightness animation
 * Each letter brightens smoothly, word by word, line by line
 * Next word doesn't start until previous is complete
 */
export const TrainRevealText = ({
  children,
  className = '',
  charDelay = 0.015,
}: TrainRevealTextProps) => {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: false, margin: '-30px' });
  
  const words = children.split(' ');
  
  // Calculate cumulative delay for each character
  let cumulativeDelay = 0;
  const wordsWithDelays = words.map((word) => {
    const chars = word.split('').map((char, charIndex) => {
      const delay = cumulativeDelay + charIndex * charDelay;
      return { char, delay };
    });
    cumulativeDelay += word.length * charDelay + charDelay; // Faster between words
    return { word, chars };
  });

  return (
    <div
      ref={ref}
      className={`${className} flex flex-wrap`}
      style={{ gap: '0.3em' }}
    >
      {wordsWithDelays.map((wordData, wordIndex) => (
        <span
          key={wordIndex}
          className="inline-flex"
          style={{ whiteSpace: 'nowrap' }}
        >
          {wordData.chars.map((charData, charIndex) => (
            <motion.span
              key={charIndex}
              className="inline-block"
              initial={{ opacity: 0.12, filter: 'blur(4px)', y: 8 }}
              animate={isInView ? { 
                opacity: 1, 
                filter: 'blur(0px)',
                y: 0,
              } : { 
                opacity: 0.12, 
                filter: 'blur(4px)',
                y: 8,
              }}
              transition={{
                duration: 0.25,
                delay: isInView ? charData.delay : 0,
                ease: [0.25, 0.46, 0.45, 0.94],
              }}
            >
              {charData.char}
            </motion.span>
          ))}
        </span>
      ))}
    </div>
  );
};

interface GoldenHeadingProps {
  children: string;
  className?: string;
  as?: 'h1' | 'h2' | 'h3' | 'h4';
  charDelay?: number;
}

/**
 * GoldenHeading - Golden text that reveals letter by letter
 * Perfect for section headings
 */
export const GoldenHeading = ({
  children,
  className = '',
  as: Component = 'h2',
  charDelay = 0.012,
}: GoldenHeadingProps) => {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: false, margin: '-30px' });
  
  const words = children.split(' ');
  
  let cumulativeDelay = 0;
  const wordsWithDelays = words.map((word) => {
    const chars = word.split('').map((char, charIndex) => {
      const delay = cumulativeDelay + charIndex * charDelay;
      return { char, delay };
    });
    cumulativeDelay += word.length * charDelay + charDelay * 2;
    return { word, chars };
  });

  return (
    <div
      ref={ref}
      className={`${className} flex flex-wrap`}
      style={{ gap: '0.35em' }}
    >
      {wordsWithDelays.map((wordData, wordIndex) => (
        <span
          key={wordIndex}
          className="inline-flex"
          style={{ whiteSpace: 'nowrap' }}
        >
          {wordData.chars.map((charData, charIndex) => (
            <motion.span
              key={charIndex}
              className="inline-block"
              style={{
                background: 'linear-gradient(135deg, hsl(42 85% 60%) 0%, hsl(38 75% 48%) 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
              }}
              initial={{ opacity: 0.1, filter: 'blur(6px)', y: 10 }}
              animate={isInView ? { 
                opacity: 1, 
                filter: 'blur(0px)',
                y: 0,
              } : { 
                opacity: 0.1, 
                filter: 'blur(6px)',
                y: 10,
              }}
              transition={{
                duration: 0.3,
                delay: isInView ? charData.delay : 0,
                ease: [0.25, 0.46, 0.45, 0.94],
              }}
            >
              {charData.char}
            </motion.span>
          ))}
        </span>
      ))}
    </div>
  );
};

interface BlurRevealTextProps {
  children: string;
  className?: string;
  as?: 'h1' | 'h2' | 'h3' | 'h4' | 'p' | 'span' | 'div';
  delay?: number;
  staggerDelay?: number;
  wordByWord?: boolean;
}

/**
 * BlurRevealText - Text reveals from blurred to clear, word by word
 * Inspired by modern luxury sites like Fullstack.de
 */
export const BlurRevealText = ({
  children,
  className = '',
  as: Component = 'div',
  delay = 0,
  staggerDelay = 0.08,
  wordByWord = true,
}: BlurRevealTextProps) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-80px' });
  
  const words = children.split(' ');

  const container: Variants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: staggerDelay,
        delayChildren: delay,
      },
    },
  };

  const wordVariant: Variants = {
    hidden: {
      opacity: 0.15,
      filter: 'blur(8px)',
      y: 8,
    },
    visible: {
      opacity: 1,
      filter: 'blur(0px)',
      y: 0,
      transition: {
        duration: 0.6,
        ease: [0.25, 0.46, 0.45, 0.94],
      },
    },
  };

  if (wordByWord) {
    return (
      <motion.div
        ref={ref}
        className={className}
        variants={container}
        initial="hidden"
        animate={isInView ? 'visible' : 'hidden'}
        style={{ display: 'flex', flexWrap: 'wrap', gap: '0.3em' }}
      >
        {words.map((word, index) => (
          <motion.span
            key={index}
            variants={wordVariant}
            className="inline-block"
            style={{ whiteSpace: 'nowrap' }}
          >
            {word}
          </motion.span>
        ))}
      </motion.div>
    );
  }

  return (
    <motion.div
      ref={ref}
      className={className}
      initial={{ opacity: 0.15, filter: 'blur(10px)', y: 15 }}
      animate={isInView ? { opacity: 1, filter: 'blur(0px)', y: 0 } : {}}
      transition={{ duration: 0.8, delay, ease: [0.25, 0.46, 0.45, 0.94] }}
    >
      {children}
    </motion.div>
  );
};

interface SlideUpRevealProps {
  children: ReactNode;
  className?: string;
  delay?: number;
  duration?: number;
}

/**
 * SlideUpReveal - Content slides up and fades in elegantly
 */
export const SlideUpReveal = ({ 
  children, 
  className = '', 
  delay = 0,
  duration = 0.7,
}: SlideUpRevealProps) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-50px' });

  return (
    <motion.div
      ref={ref}
      className={className}
      initial={{ opacity: 0, y: 40 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
      transition={{
        duration,
        delay,
        ease: [0.25, 0.46, 0.45, 0.94],
      }}
    >
      {children}
    </motion.div>
  );
};

interface StaggerContainerProps {
  children: ReactNode[];
  className?: string;
  staggerDelay?: number;
  initialDelay?: number;
}

/**
 * StaggerContainer - Children animate in with stagger effect
 */
export const StaggerContainer = ({
  children,
  className = '',
  staggerDelay = 0.1,
  initialDelay = 0,
}: StaggerContainerProps) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-80px' });

  const container: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: staggerDelay,
        delayChildren: initialDelay,
      },
    },
  };

  const item: Variants = {
    hidden: { opacity: 0, y: 30, scale: 0.95 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        duration: 0.5,
        ease: [0.25, 0.46, 0.45, 0.94],
      },
    },
  };

  return (
    <motion.div
      ref={ref}
      className={className}
      variants={container}
      initial="hidden"
      animate={isInView ? 'visible' : 'hidden'}
    >
      {children.map((child, index) => (
        <motion.div key={index} variants={item}>
          {child}
        </motion.div>
      ))}
    </motion.div>
  );
};

interface GlowPulseProps {
  children: ReactNode;
  className?: string;
  glowColor?: string;
}

/**
 * GlowPulse - Subtle pulsing glow effect for emphasis
 */
export const GlowPulse = ({ 
  children, 
  className = '',
  glowColor = 'hsl(42 85% 55% / 0.3)',
}: GlowPulseProps) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-50px' });

  return (
    <motion.div
      ref={ref}
      className={className}
      initial={{ opacity: 0 }}
      animate={isInView ? { 
        opacity: 1,
        boxShadow: [
          `0 0 30px ${glowColor}`,
          `0 0 60px ${glowColor}`,
          `0 0 30px ${glowColor}`,
        ],
      } : { opacity: 0 }}
      transition={{
        opacity: { duration: 0.5 },
        boxShadow: { duration: 2, repeat: Infinity, ease: 'easeInOut' },
      }}
    >
      {children}
    </motion.div>
  );
};

interface SplitLineRevealProps {
  lines: string[];
  className?: string;
  lineClassName?: string;
  staggerDelay?: number;
}

/**
 * SplitLineReveal - Each line reveals with blur-to-clear effect
 */
export const SplitLineReveal = ({
  lines,
  className = '',
  lineClassName = '',
  staggerDelay = 0.2,
}: SplitLineRevealProps) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-50px' });

  const container: Variants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: staggerDelay,
      },
    },
  };

  const lineVariant: Variants = {
    hidden: {
      opacity: 0.1,
      filter: 'blur(6px)',
      y: 20,
    },
    visible: {
      opacity: 1,
      filter: 'blur(0px)',
      y: 0,
      transition: {
        duration: 0.7,
        ease: [0.25, 0.46, 0.45, 0.94],
      },
    },
  };

  return (
    <motion.div
      ref={ref}
      className={className}
      variants={container}
      initial="hidden"
      animate={isInView ? 'visible' : 'hidden'}
    >
      {lines.map((line, index) => (
        <motion.div key={index} variants={lineVariant} className={lineClassName}>
          {line}
        </motion.div>
      ))}
    </motion.div>
  );
};
