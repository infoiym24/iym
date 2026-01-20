import { motion, Variants, useInView } from 'framer-motion';
import { useRef, ReactNode, createContext, useContext, useState, useEffect } from 'react';

// Context for sequential reveal
interface RevealContextType {
  registerElement: (id: string, order: number) => void;
  isElementRevealed: (id: string) => boolean;
  markRevealed: (id: string) => void;
  isParentInView: boolean;
}

const RevealContext = createContext<RevealContextType | null>(null);

// Provider for sequential reveal within a section
interface RevealSectionProps {
  children: ReactNode;
  className?: string;
}

export const RevealSection = ({ children, className }: RevealSectionProps) => {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-50px' });
  const [revealedElements, setRevealedElements] = useState<Set<string>>(new Set());
  const [elementOrder, setElementOrder] = useState<Map<string, number>>(new Map());

  const registerElement = (id: string, order: number) => {
    setElementOrder(prev => {
      const newMap = new Map(prev);
      newMap.set(id, order);
      return newMap;
    });
  };

  const isElementRevealed = (id: string): boolean => {
    return revealedElements.has(id);
  };

  const markRevealed = (id: string) => {
    setRevealedElements(prev => new Set(prev).add(id));
  };

  return (
    <RevealContext.Provider value={{ registerElement, isElementRevealed, markRevealed, isParentInView: isInView }}>
      <div ref={ref} className={className}>
        {children}
      </div>
    </RevealContext.Provider>
  );
};

// Text reveal - word by word like a train
interface TextRevealProps {
  children: string;
  className?: string;
  delay?: number;
  staggerDelay?: number;
  as?: 'h1' | 'h2' | 'h3' | 'h4' | 'p' | 'span';
}

export const TextReveal = ({ 
  children, 
  className = '', 
  delay = 0,
  staggerDelay = 0.08,
  as: Component = 'p'
}: TextRevealProps) => {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-30px' });
  const words = children.split(' ');

  const containerVariants: Variants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: staggerDelay,
        delayChildren: delay,
      }
    }
  };

  const wordVariants: Variants = {
    hidden: { 
      opacity: 0,
      y: 20,
      filter: 'blur(8px)',
    },
    visible: { 
      opacity: 1,
      y: 0,
      filter: 'blur(0px)',
      transition: {
        duration: 0.5,
        ease: [0.25, 0.46, 0.45, 0.94],
      }
    }
  };

  const MotionComponent = motion[Component as keyof typeof motion] as typeof motion.p;

  return (
    <div ref={ref} className="overflow-hidden">
      <MotionComponent
        className={className}
        variants={containerVariants}
        initial="hidden"
        animate={isInView ? "visible" : "hidden"}
      >
        {words.map((word, index) => (
          <motion.span
            key={index}
            variants={wordVariants}
            className="inline-block mr-[0.25em]"
          >
            {word}
          </motion.span>
        ))}
      </MotionComponent>
    </div>
  );
};

// Letter by letter reveal
interface LetterRevealProps {
  children: string;
  className?: string;
  delay?: number;
  staggerDelay?: number;
  as?: 'h1' | 'h2' | 'h3' | 'h4' | 'p' | 'span';
}

export const LetterReveal = ({ 
  children, 
  className = '', 
  delay = 0,
  staggerDelay = 0.03,
  as: Component = 'span'
}: LetterRevealProps) => {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-30px' });
  const letters = children.split('');

  const containerVariants: Variants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: staggerDelay,
        delayChildren: delay,
      }
    }
  };

  const letterVariants: Variants = {
    hidden: { 
      opacity: 0,
      y: 30,
    },
    visible: { 
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.4,
        ease: [0.25, 0.46, 0.45, 0.94],
      }
    }
  };

  const MotionComponent = motion[Component as keyof typeof motion] as typeof motion.span;

  return (
    <div ref={ref} className="overflow-hidden">
      <MotionComponent
        className={className}
        variants={containerVariants}
        initial="hidden"
        animate={isInView ? "visible" : "hidden"}
      >
        {letters.map((letter, index) => (
          <motion.span
            key={index}
            variants={letterVariants}
            className="inline-block"
            style={{ whiteSpace: letter === ' ' ? 'pre' : 'normal' }}
          >
            {letter}
          </motion.span>
        ))}
      </MotionComponent>
    </div>
  );
};

// Pop-in effect for important elements
interface PopRevealProps {
  children: ReactNode;
  className?: string;
  delay?: number;
  scale?: number;
}

export const PopReveal = ({ 
  children, 
  className = '', 
  delay = 0,
  scale = 0.5
}: PopRevealProps) => {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-50px' });

  const variants: Variants = {
    hidden: { 
      opacity: 0,
      scale: scale,
      filter: 'blur(10px)',
    },
    visible: { 
      opacity: 1,
      scale: 1,
      filter: 'blur(0px)',
      transition: {
        duration: 0.8,
        delay,
        ease: [0.34, 1.56, 0.64, 1], // Bouncy ease
      }
    }
  };

  return (
    <motion.div
      ref={ref}
      className={className}
      variants={variants}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
    >
      {children}
    </motion.div>
  );
};

// Slide up fade reveal
interface SlideRevealProps {
  children: ReactNode;
  className?: string;
  delay?: number;
  direction?: 'up' | 'down' | 'left' | 'right';
}

export const SlideReveal = ({ 
  children, 
  className = '', 
  delay = 0,
  direction = 'up'
}: SlideRevealProps) => {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-50px' });

  const getInitialPosition = () => {
    switch (direction) {
      case 'up': return { x: 0, y: 60 };
      case 'down': return { x: 0, y: -60 };
      case 'left': return { x: 60, y: 0 };
      case 'right': return { x: -60, y: 0 };
    }
  };

  const variants: Variants = {
    hidden: { 
      opacity: 0,
      ...getInitialPosition(),
    },
    visible: { 
      opacity: 1,
      x: 0,
      y: 0,
      transition: {
        duration: 0.7,
        delay,
        ease: [0.25, 0.46, 0.45, 0.94],
      }
    }
  };

  return (
    <motion.div
      ref={ref}
      className={className}
      variants={variants}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
    >
      {children}
    </motion.div>
  );
};

// Staggered children reveal
interface StaggerRevealProps {
  children: ReactNode;
  className?: string;
  delay?: number;
  staggerDelay?: number;
}

export const StaggerReveal = ({ 
  children, 
  className = '', 
  delay = 0,
  staggerDelay = 0.1
}: StaggerRevealProps) => {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-50px' });

  const containerVariants: Variants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: staggerDelay,
        delayChildren: delay,
      }
    }
  };

  return (
    <motion.div
      ref={ref}
      className={className}
      variants={containerVariants}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
    >
      {children}
    </motion.div>
  );
};

// Stagger child item
export const StaggerItem = ({ children, className = '' }: { children: ReactNode; className?: string }) => {
  const itemVariants: Variants = {
    hidden: { 
      opacity: 0,
      y: 30,
      scale: 0.95,
    },
    visible: { 
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        duration: 0.5,
        ease: [0.25, 0.46, 0.45, 0.94],
      }
    }
  };

  return (
    <motion.div className={className} variants={itemVariants}>
      {children}
    </motion.div>
  );
};

// Highlight text with gold glow effect on reveal
interface GlowRevealProps {
  children: string;
  className?: string;
  delay?: number;
}

export const GlowReveal = ({ 
  children, 
  className = '', 
  delay = 0
}: GlowRevealProps) => {
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-30px' });

  return (
    <motion.span
      ref={ref}
      className={className}
      initial={{ 
        opacity: 0, 
        textShadow: '0 0 0px transparent',
        filter: 'blur(4px)',
      }}
      animate={isInView ? { 
        opacity: 1,
        textShadow: [
          '0 0 0px transparent',
          '0 0 30px hsl(43 80% 55% / 0.8)',
          '0 0 60px hsl(43 80% 55% / 0.5)',
          '0 0 20px hsl(43 80% 55% / 0.3)',
        ],
        filter: 'blur(0px)',
      } : {}}
      transition={{
        duration: 1.2,
        delay,
        ease: 'easeOut',
      }}
    >
      {children}
    </motion.span>
  );
};

// Line reveal - draws in from left
interface LineRevealProps {
  className?: string;
  delay?: number;
}

export const LineReveal = ({ className = '', delay = 0 }: LineRevealProps) => {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-30px' });

  return (
    <motion.div
      ref={ref}
      className={className}
      initial={{ scaleX: 0, originX: 0 }}
      animate={isInView ? { scaleX: 1 } : { scaleX: 0 }}
      transition={{
        duration: 0.8,
        delay,
        ease: [0.25, 0.46, 0.45, 0.94],
      }}
    />
  );
};
