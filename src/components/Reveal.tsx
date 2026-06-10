import React from 'react';
import { useScrollReveal } from '../hooks/useScrollReveal';

interface RevealProps {
  children: React.ReactNode;
  delay?: string;
  className?: string;
}

export function Reveal({ children, delay = '', className = '' }: RevealProps) {
  const ref = useScrollReveal();
  return (
    <div ref={ref} className={`reveal-element ${delay} ${className}`}>
      {children}
    </div>
  );
}
