import React from 'react';

interface ButtonProps {
  text: string;
  onClick?: () => void;
}

const Button: React.FC<ButtonProps> = ({ text, onClick }) => {
  const handleClick = () => {
    console.log('Button clicked');
    alert('دکمه با موفقیت کلیک شد!');

    if (onClick) onClick();
  };

  const buttonStyle = {
    backgroundColor: '#f97316', // orange-500
    color: '#f5e6d3', // brown-100
    fontWeight: 'bold',
    padding: '0.75rem 1.5rem',
    borderRadius: '0.5rem',
    transition: 'background-color 0.3s ease',
    cursor: 'pointer',
    border: 'none',
    outline: 'none'
  };

  const handleMouseOver = (e: React.MouseEvent<HTMLButtonElement>) => {
    (e.target as HTMLButtonElement).style.backgroundColor = '#ea580c'; // orange-600
  };

  const handleMouseOut = (e: React.MouseEvent<HTMLButtonElement>) => {
    (e.target as HTMLButtonElement).style.backgroundColor = '#f97316'; // orange-500
  };

  return (
    <button
      onClick={handleClick}
      onMouseOver={handleMouseOver}
      onMouseOut={handleMouseOut}
      style={buttonStyle}
    >
      {text}
    </button>
  );
};

export default Button; 