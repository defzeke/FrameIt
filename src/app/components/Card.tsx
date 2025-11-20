// Reusable card component for login and signup pages

import React from 'react';

interface CardProps {
  children: React.ReactNode;
}

const Card: React.FC<CardProps> = ({ children }) => {
  return (
    <div 
      className="w-full max-w-3xl p-16 rounded-[2rem] shadow-2xl flex flex-col items-center" 
      style={{ 
        backgroundColor: '#4C91E2',
        boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.3), 0 4px 6px -2px rgba(0, 0, 0, 0.15)' 
      }}
    >
      {children}
    </div>
  );
};

export default Card;