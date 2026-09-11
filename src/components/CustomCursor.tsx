import { useEffect, useState } from 'react';
import { motion } from 'motion/react';

export default function CustomCursor() {
  const [mousePosition, setMousePosition] = useState({ x: -100, y: -100 });
  const [cursorText, setCursorText] = useState('');
  const [cursorVariant, setCursorVariant] = useState<'default' | 'hover' | 'view' | 'explore'>('default');
  const [isVisible, setIsVisible] = useState(false);

  const isLight = typeof document !== 'undefined' && document.documentElement.classList.contains('light');

  useEffect(() => {
    // Only enable on non-touch devices
    if (window.matchMedia('(pointer: coarse)').matches) {
      return;
    }

    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
      if (!isVisible) setIsVisible(true);

      const target = e.target as HTMLElement;
      const interactiveEl = target.closest('[data-cursor]');
      
      if (interactiveEl) {
        const type = interactiveEl.getAttribute('data-cursor');
        if (type === 'view') {
          setCursorVariant('view');
          setCursorText('VIEW');
        } else if (type === 'explore') {
          setCursorVariant('explore');
          setCursorText('EXPLORE');
        } else if (type === 'open') {
          setCursorVariant('view');
          setCursorText('OPEN');
        } else {
          setCursorVariant('hover');
          setCursorText('');
        }
      } else if (target.closest('button, a, input, textarea, select')) {
        setCursorVariant('hover');
        setCursorText('');
      } else {
        setCursorVariant('default');
        setCursorText('');
      }
    };

    const handleMouseLeave = () => {
      setIsVisible(false);
    };

    window.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, [isVisible]);

  if (!isVisible) return null;

  return (
    <>
      {/* Primary Dot / Expanding Badge */}
      <motion.div
        id="custom-cursor-follower"
        className="fixed top-0 left-0 pointer-events-none z-[9999] flex items-center justify-center font-bold text-[10px] tracking-widest text-black"
        animate={{
          x: mousePosition.x - (cursorVariant === 'view' || cursorVariant === 'explore' ? 36 : cursorVariant === 'hover' ? 18 : 6),
          y: mousePosition.y - (cursorVariant === 'view' || cursorVariant === 'explore' ? 36 : cursorVariant === 'hover' ? 18 : 6),
          width: cursorVariant === 'view' || cursorVariant === 'explore' ? 72 : cursorVariant === 'hover' ? 36 : 12,
          height: cursorVariant === 'view' || cursorVariant === 'explore' ? 72 : cursorVariant === 'hover' ? 36 : 12,
          backgroundColor: cursorVariant === 'view' || cursorVariant === 'explore' 
            ? (isLight ? '#0284c7' : '#38bdf8') 
            : cursorVariant === 'hover' 
            ? (isLight ? 'rgba(2, 132, 199, 0.25)' : 'rgba(56, 189, 248, 0.4)') 
            : (isLight ? '#0284c7' : '#38bdf8'),
          borderRadius: '9999px',
          mixBlendMode: cursorVariant === 'hover' ? (isLight ? 'multiply' : 'screen') : 'normal'
        }}
        transition={{
          type: 'spring',
          damping: 28,
          stiffness: 350,
          mass: 0.2
        }}
      >
        {cursorText && (
          <span className="select-none text-[#0b0c10] font-bold">{cursorText}</span>
        )}
      </motion.div>
    </>
  );
}
