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

export const ScrollRevealText = ({
  children,
  className = '',
  as: Component = 'p',
  delay = 0,
  staggerDelay = 0.03,
  wordByWord = false,
  onComplete,
}: ScrollRevealTextProps) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-50px' });
  
  const words = children.split(' ');
  const letters = children.split('');

  const container: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: staggerDelay,
        delayChildren: delay,
      },
    },
  };

  const child: Variants = {
    hidden: {
      opacity: 0,
      y: 20,
      filter: 'blur(4px)',
    },
    visible: {
      opacity: 1,
      y: 0,
      filter: 'blur(0px)',
      transition: {
        type: 'spring',
        damping: 20,
        stiffness: 100,
      },
    },
  };

  if (wordByWord) {
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
            variants={child}
            className="inline-block mr-[0.25em]"
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
      variants={container}
      initial="hidden"
      animate={isInView ? 'visible' : 'hidden'}
      onAnimationComplete={() => onComplete?.()}
    >
      {letters.map((letter, index) => (
        <motion.span
          key={index}
          variants={child}
          className="inline-block"
          style={{ whiteSpace: letter === ' ' ? 'pre' : 'normal' }}
        >
          {letter === ' ' ? '\u00A0' : letter}
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
  staggerDelay = 0.2,
}: SequentialRevealProps) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  const container: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: staggerDelay,
      },
    },
  };

  const item: Variants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: 'spring',
        damping: 25,
        stiffness: 100,
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

export const PopReveal = ({ children, className = '', delay = 0 }: PopRevealProps) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-50px' });

  return (
    <motion.div
      ref={ref}
      className={className}
      initial={{ opacity: 0, scale: 0.8, y: 20 }}
      animate={isInView ? { opacity: 1, scale: 1, y: 0 } : { opacity: 0, scale: 0.8, y: 20 }}
      transition={{
        type: 'spring',
        damping: 15,
        stiffness: 150,
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
  charDelay?: number;
  lineDelay?: number;
}

export const TrainReveal = ({
  lines,
  className = '',
  lineClassName = '',
  charDelay = 0.02,
  lineDelay = 0.1,
}: TrainRevealProps) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-50px' });

  let totalChars = 0;

  return (
    <div ref={ref} className={className}>
      {lines.map((line, lineIndex) => {
        const lineStartDelay = totalChars * charDelay + lineIndex * lineDelay;
        const chars = line.split('');
        totalChars += chars.length;

        return (
          <motion.div
            key={lineIndex}
            className={lineClassName}
            initial="hidden"
            animate={isInView ? 'visible' : 'hidden'}
          >
            {chars.map((char, charIndex) => (
              <motion.span
                key={charIndex}
                className="inline-block"
                style={{ whiteSpace: char === ' ' ? 'pre' : 'normal' }}
                initial={{ opacity: 0, y: 10 }}
                animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 }}
                transition={{
                  duration: 0.1,
                  delay: lineStartDelay + charIndex * charDelay,
                  ease: 'easeOut',
                }}
              >
                {char === ' ' ? '\u00A0' : char}
              </motion.span>
            ))}
          </motion.div>
        );
      })}
    </div>
  );
};