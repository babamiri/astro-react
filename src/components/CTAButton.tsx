import React from 'react';

interface CTAButtonProps {
  text: string;
  onClick?: () => void;
}

const CTAButton: React.FC<CTAButtonProps> = ({ text, onClick }) => {
  const handleClick = () => {
    console.log('CTA button clicked');
    alert('دکمه با موفقیت کلیک شد!');
    if (onClick) onClick();
  };

  return (
    <button
      onClick={handleClick}
      className="bg-orange-500 hover:bg-orange-600 text-brown-100 font-bold py-3 px-6 rounded-lg transition duration-300"
    >
      {text}
    </button>
  );
};

export default CTAButton;
