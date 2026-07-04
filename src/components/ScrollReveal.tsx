import { useEffect, useRef, useState, type ReactNode } from 'react';

type Direction = 'from-left' | 'from-right' | 'from-up';

interface ScrollRevealProps {
  children: ReactNode;
  direction?: Direction;
  /** Retardo en ms (para escalonar grillas). */
  delay?: number;
  className?: string;
  as?: keyof JSX.IntrinsicElements;
}

const hiddenClasses: Record<Direction, string> = {
  'from-left': '-translate-x-8 sm:-translate-x-12',
  'from-right': 'translate-x-8 sm:translate-x-12',
  'from-up': 'translate-y-8',
};

/**
 * Revela su contenido con fade + desplazamiento al entrar en viewport.
 * En mobile, los reveals laterales se convierten en verticales.
 * Respeta prefers-reduced-motion.
 */
export function ScrollReveal({
  children,
  direction = 'from-up',
  delay = 0,
  className = '',
  as: Tag = 'div',
}: ScrollRevealProps) {
  const ref = useRef<HTMLElement | null>(null);
  const [visible, setVisible] = useState(false);
  const [reduced, setReduced] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
    setReduced(mq.matches);
  }, []);

  useEffect(() => {
    if (reduced) {
      setVisible(true);
      return;
    }
    const node = ref.current;
    if (!node) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setVisible(true);
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12, rootMargin: '0px 0px -8% 0px' }
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, [reduced]);

  const Component = Tag as 'div';

  return (
    <Component
      ref={ref as React.Ref<HTMLDivElement>}
      className={[
        'transition-all ease-[cubic-bezier(0.22,1,0.36,1)] duration-700 motion-reduce:transition-none',
        visible
          ? 'translate-x-0 translate-y-0 opacity-100'
          : `opacity-0 ${hiddenClasses[direction]}`,
        className,
      ].join(' ')}
      style={{ transitionDelay: visible ? `${delay}ms` : '0ms' }}
    >
      {children}
    </Component>
  );
}

/** Alterna izquierda/derecha según índice para grillas. */
export function revealSide(i: number): Direction {
  return i % 2 === 0 ? 'from-left' : 'from-right';
}

export default ScrollReveal;
