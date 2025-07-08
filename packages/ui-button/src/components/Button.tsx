import React from 'react';
import { button } from '@astro-react/design-tokens';

export interface ButtonProps {
  text: string;
  variant?: 'primary' | 'secondary';
  size?: 'sm' | 'md' | 'lg';
  disabled?: boolean;
  loading?: boolean;
  onClick?: () => void;
  className?: string;
}

const Button: React.FC<ButtonProps> = ({ 
  text, 
  variant = 'primary', 
  size = 'md',
  disabled = false,
  loading = false,
  onClick,
  className = ''
}) => {
  const handleClick = () => {
    if (disabled || loading) return;
    
    // Remove the annoying alert!
    console.log('Button clicked:', text);
    
    if (onClick) onClick();
  };

  const baseStyles: React.CSSProperties = {
    border: 'none',
    cursor: disabled || loading ? 'not-allowed' : 'pointer',
    transition: 'all 0.2s ease-in-out',
    fontFamily: 'inherit',
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '0.5rem',
    opacity: disabled ? 0.6 : 1,
    outline: 'none',
    position: 'relative',
  };

  const variantStyles = button[variant];
  
  const sizeStyles = {
    sm: { padding: '0.5rem 1rem', fontSize: '0.875rem' },
    md: { padding: variantStyles.padding, fontSize: variantStyles.fontSize },
    lg: { padding: '1rem 2rem', fontSize: '1.125rem' },
  };

  const buttonStyle: React.CSSProperties = {
    ...baseStyles,
    ...sizeStyles[size],
    backgroundColor: variantStyles.bg,
    color: variantStyles.text,
    borderRadius: variantStyles.borderRadius,
    fontWeight: variantStyles.fontWeight,
  };

  const [isHovered, setIsHovered] = React.useState(false);
  const [isPressed, setIsPressed] = React.useState(false);

  const currentBg = isPressed 
    ? variantStyles.bgHover 
    : isHovered 
      ? variantStyles.bgHover 
      : variantStyles.bg;

  return (
    <button
      onClick={handleClick}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onMouseDown={() => setIsPressed(true)}
      onMouseUp={() => setIsPressed(false)}
      disabled={disabled || loading}
      className={className}
      style={{
        ...buttonStyle,
        backgroundColor: currentBg,
      }}
      aria-label={text}
    >
      {loading && (
        <span style={{ 
          animation: 'spin 1s linear infinite',
          width: '1rem',
          height: '1rem',
          border: '2px solid transparent',
          borderTop: '2px solid currentColor',
          borderRadius: '50%',
        }} />
      )}
      {text}
    </button>
  );
};

export default Button; 