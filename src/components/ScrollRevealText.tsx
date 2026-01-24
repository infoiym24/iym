import { motion, Variants } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef, ReactNode } from 'react';

interface ScrollRevealTextProps {
  children: string;
  className?: string;
  as?: 'h1' | 'h2' | 'h3' | 'h4' | 'p' | 'span';
  delay?: number;
  staggerDelay?: number;
  wordByWord?: boolean;
  onComplete?: () => void;
}

// Elegant blur-to-focus reveal animation
export const ScrollRevealText = ({
  children,
  className = '',
  as: Component = 'p',
  delay = 0,
  staggerDelay = 0.08,
  wordByWord = true,
  onComplete,
}: ScrollRevealTextProps) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-80px' });
  
  const words = children.split(' ');

  const container: Variants = {
    hidden: { opacity: 1 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: staggerDelay,
        delayChildren: delay,
      },
    },
  };

  // Blur-to-focus animation for each word
  const wordReveal: Variants = {
    hidden: {
      opacity: 0.15,
      filter: 'blur(10px)',
      y: 4,
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

  return (
    <motion.div
      ref={ref}
      className={`${className} flex flex-wrap`}
      variants={container}
      initial="hidden"
      animate={isInView ? 'visible' : 'hidden'}
      onAnimationComplete={() => onComplete?.()}
    >
      {words.map((word, index) => (
        <motion.span
          key={index}
          variants={wordReveal}
          className="inline-block mr-[0.3em] whitespace-nowrap"
        >
          {word}
        </motion.span>
      ))}
    </motion.div>
  );
};

interface SequentialRevealProps {
  children: ReactNode[];
  className?: string;
  staggerDelay?: number;
}

export const SequentialReveal = ({
  children,
  className = '',
  staggerDelay = 0.15,
}: SequentialRevealProps) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-80px' });

  const container: Variants = {
    hidden: { opacity: 1 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: staggerDelay,
      },
    },
  };

  const item: Variants = {
    hidden: { 
      opacity: 0.1, 
      filter: 'blur(6px)',
      y: 15 
    },
    visible: {
      opacity: 1,
      filter: 'blur(0px)',
      y: 0,
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

interface PopRevealProps {
  children: ReactNode;
  className?: string;
  delay?: number;
}

// Refined glow reveal instead of pop
export const PopReveal = ({ children, className = '', delay = 0 }: PopRevealProps) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-60px' });

  return (
    <motion.div
      ref={ref}
      className={className}
      initial={{ 
        opacity: 0.1, 
        filter: 'blur(8px) brightness(0.6)',
        scale: 0.98,
        y: 20 
      }}
      animate={isInView ? { 
        opacity: 1, 
        filter: 'blur(0px) brightness(1)',
        scale: 1, 
        y: 0 
      } : { 
        opacity: 0.1, 
        filter: 'blur(8px) brightness(0.6)',
        scale: 0.98, 
        y: 20 
      }}
      transition={{
        duration: 0.7,
        ease: [0.25, 0.46, 0.45, 0.94],
        delay,
      }}
    >
      {children}
    </motion.div>
  );
};

interface TrainRevealProps {
  lines: string[];
  className?: string;
  lineClassName?: string;
  wordDelay?: number;
  lineDelay?: number;
}

// Elegant word-by-word blur reveal (like a "train" effect)
export const TrainReveal = ({
  lines,
  className = '',
  lineClassName = '',
  wordDelay = 0.06,
  lineDelay = 0.3,
}: TrainRevealProps) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-60px' });

  let totalWords = 0;

  return (
    <div ref={ref} className={className}>
      {lines.map((line, lineIndex) => {
        const words = line.split(' ');
        const lineStartDelay = totalWords * wordDelay + lineIndex * lineDelay;
        totalWords += words.length;

        return (
          <motion.div
            key={lineIndex}
            className={`${lineClassName} flex flex-wrap`}
            initial="hidden"
            animate={isInView ? 'visible' : 'hidden'}
          >
            {words.map((word, wordIndex) => (
              <motion.span
                key={wordIndex}
                className="inline-block mr-[0.3em] whitespace-nowrap"
                initial={{ 
                  opacity: 0.12, 
                  filter: 'blur(12px)',
                  y: 6
                }}
                animate={isInView ? { 
                  opacity: 1, 
                  filter: 'blur(0px)',
                  y: 0
                } : { 
                  opacity: 0.12, 
                  filter: 'blur(12px)',
                  y: 6
                }}
                transition={{
                  duration: 0.5,
                  delay: lineStartDelay + wordIndex * wordDelay,
                  ease: [0.25, 0.46, 0.45, 0.94],
                }}
              >
                {word}
              </motion.span>
            ))}
          </motion.div>
        );
      })}
    </div>
  );
};

interface GlowRevealProps {
  children: ReactNode;
  className?: string;
  delay?: number;
}

// Premium glow-in reveal for special elements
export const GlowReveal = ({ children, className = '', delay = 0 }: GlowRevealProps) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-50px' });

  return (
    <motion.div
      ref={ref}
      className={className}
      initial={{ 
        opacity: 0, 
        filter: 'blur(15px) brightness(0.3)',
      }}
      animate={isInView ? { 
        opacity: 1, 
        filter: 'blur(0px) brightness(1)',
      } : { 
        opacity: 0, 
        filter: 'blur(15px) brightness(0.3)',
      }}
      transition={{
        duration: 1,
        ease: [0.25, 0.46, 0.45, 0.94],
        delay,
      }}
    >
      {children}
    </motion.div>
  );
};