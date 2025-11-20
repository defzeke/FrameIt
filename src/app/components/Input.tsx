// Reusable input component for login and signup pages

import React from 'react';

interface InputProps {
  id: string;
  label: string;
  type: 'text' | 'password';
}

const Input: React.FC<InputProps> = ({ id, label, type }) => {
  return (
    <div className="mb-4">
      <input
        id={id}
        name={id}
        type={type}
        placeholder={label}
        className="w-full py-3 pl-5 border border-gray-300 rounded-2xl text-lg text-black placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-white/80 transition shadow-sm"
        style={{ backgroundColor: 'white' }}
      />
    </div>
  );
};

export default Input;