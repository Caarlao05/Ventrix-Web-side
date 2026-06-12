import React, { useState, useRef, useEffect } from 'react';
import { ChevronDown } from 'lucide-react';

interface GlassSelectProps {
  options: string[];
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  required?: boolean;
}

export default function GlassSelect({ options, value, onChange, placeholder = "Seleccione una opción...", required = false }: GlassSelectProps) {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className="glass-select-container" ref={dropdownRef} style={{ position: 'relative', width: '100%' }}>
      {/* Required invisible input to handle native form validation if needed */}
      {required && (
        <input 
          type="text" 
          required={required} 
          value={value} 
          onChange={() => {}} 
          style={{ opacity: 0, position: 'absolute', top: 0, left: 0, height: '100%', width: '100%', pointerEvents: 'none', zIndex: -1 }} 
        />
      )}
      
      <div 
        className={`form-input ${isOpen ? 'active' : ''}`}
        onClick={() => setIsOpen(!isOpen)}
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          cursor: 'pointer',
          background: isOpen ? 'rgba(15, 23, 42, 0.8)' : 'rgba(255, 255, 255, 0.05)',
          borderColor: isOpen ? 'var(--secondary-accent)' : 'rgba(255, 255, 255, 0.1)',
          transition: 'all 0.3s ease',
          userSelect: 'none'
        }}
      >
        <span style={{ color: value ? 'var(--text-primary)' : 'rgba(255, 255, 255, 0.5)' }}>
          {value || placeholder}
        </span>
        <div style={{ color: 'var(--text-secondary)', transition: 'transform 0.3s ease', transform: isOpen ? 'rotate(180deg)' : 'rotate(0)' }}>
          <ChevronDown size={20} />
        </div>
      </div>

      <div 
        className="glass-dropdown-menu"
        style={{
          position: 'absolute',
          top: 'calc(100% + 8px)',
          left: 0,
          width: '100%',
          background: 'rgba(15, 23, 42, 0.85)',
          backdropFilter: 'blur(16px)',
          WebkitBackdropFilter: 'blur(16px)',
          border: '1px solid rgba(255, 255, 255, 0.1)',
          borderRadius: '16px',
          boxShadow: '0 20px 40px -10px rgba(0, 0, 0, 0.5), inset 0 1px 0 rgba(255, 255, 255, 0.1)',
          overflow: 'hidden',
          zIndex: 9999,
          opacity: isOpen ? 1 : 0,
          transform: isOpen ? 'translateY(0) scale(1)' : 'translateY(-10px) scale(0.95)',
          pointerEvents: isOpen ? 'auto' : 'none',
          transition: 'opacity 0.3s cubic-bezier(0.16, 1, 0.3, 1), transform 0.3s cubic-bezier(0.16, 1, 0.3, 1)'
        }}
      >
        <ul style={{ listStyle: 'none', margin: 0, padding: '8px 0', maxHeight: '250px', overflowY: 'auto' }}>
          {options.map((option, idx) => (
            <li 
              key={idx}
              onClick={() => {
                onChange(option);
                setIsOpen(false);
              }}
              className="glass-option"
              style={{
                padding: '12px 20px',
                color: value === option ? 'var(--secondary-accent)' : 'var(--text-primary)',
                background: value === option ? 'rgba(255, 255, 255, 0.05)' : 'transparent',
                cursor: 'pointer',
                transition: 'all 0.2s ease',
                fontWeight: value === option ? 600 : 400
              }}
              onMouseEnter={(e) => {
                if (value !== option) {
                  e.currentTarget.style.background = 'rgba(255, 255, 255, 0.1)';
                  e.currentTarget.style.paddingLeft = '24px';
                }
              }}
              onMouseLeave={(e) => {
                if (value !== option) {
                  e.currentTarget.style.background = 'transparent';
                  e.currentTarget.style.paddingLeft = '20px';
                }
              }}
            >
              {option}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
