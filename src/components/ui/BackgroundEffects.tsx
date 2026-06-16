import { motion, useScroll, useTransform } from 'framer-motion';

export default function BackgroundEffects() {
  const { scrollY } = useScroll();
  // Move text UP when scrolling DOWN
  const textY = useTransform(scrollY, [0, 2000], [0, -600]);

  // Generate 15 bubbles with random properties
  const bubbles = Array.from({ length: 15 }).map((_, i) => {
    const size = Math.random() * 60 + 20; // 20px to 80px
    const left = Math.random() * 100; // 0% to 100%
    const delay = Math.random() * 10; // 0s to 10s
    const duration = Math.random() * 10 + 15; // 15s to 25s
    return { id: i, size, left, delay, duration };
  });

  return (
    <div style={{
      position: 'fixed',
      top: 0,
      left: 0,
      width: '100vw',
      height: '100vh',
      zIndex: -1, // Behind everything except the shader
      pointerEvents: 'none',
      overflow: 'hidden'
    }}>
      {/* --- BUBBLES / ORBS --- */}
      {bubbles.map(b => (
        <div
          key={b.id}
          className="bg-bubble"
          style={{
            position: 'absolute',
            bottom: '-100px', // Start below the screen
            left: `${b.left}%`,
            width: `${b.size}px`,
            height: `${b.size}px`,
            borderRadius: '50%',
            background: 'radial-gradient(circle at 30% 30%, rgba(96, 165, 250, 0.4), rgba(11, 45, 92, 0.1))',
            boxShadow: '0 0 20px rgba(96, 165, 250, 0.2), inset 0 0 10px rgba(255, 255, 255, 0.1)',
            backdropFilter: 'blur(4px)',
            WebkitBackdropFilter: 'blur(4px)',
            animation: `floatUp ${b.duration}s infinite linear`,
            animationDelay: `${b.delay}s`,
            opacity: 0, // Starts invisible, fades in via CSS animation
          }}
        />
      ))}

      {/* --- PARALLAX BACKGROUND TEXT WITH TEXTREWIND EFFECT AND MARQUEE --- */}
      <motion.div
        style={{
          y: textY,
          position: 'absolute',
          top: '20vh',
          width: '100%',
          display: 'flex',
          alignItems: 'center',
          opacity: 0.15, // Slightly more opaque
          color: '#FFFFFF',
          fontFamily: 'var(--font-display)',
          fontSize: '25vw', // Massive text
          fontWeight: 900,
          userSelect: 'none',
          whiteSpace: 'nowrap',
          textShadow: `10px 10px 0px #00d2ff, 
                       15px 15px 0px #00a8ff, 
                       20px 20px 0px #007bff, 
                       25px 25px 0px #0056b3, 
                       45px 45px 10px #0056b3`,
          transition: 'text-shadow 0.2s ease-in-out'
        }}
        whileHover={{ textShadow: "none" }}
      >
        <motion.div
          animate={{ x: [0, -3000] }}
          transition={{ repeat: Infinity, duration: 50, ease: "linear" }}
          style={{ display: 'flex', gap: '20vw' }}
          className="text-black dark:text-white italic tracking-widest stroke-[#d6f4f4]"
        >
          <span>VENTRIX</span>
          <span>VENTRIX</span>
          <span>VENTRIX</span>
          <span>VENTRIX</span>
          <span>VENTRIX</span>
          <span>VENTRIX</span>
        </motion.div>
      </motion.div>
    </div>
  );
}
