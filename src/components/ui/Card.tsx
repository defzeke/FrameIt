import React from 'react';

interface CardProps {
	children: React.ReactNode;
}

const Card: React.FC<CardProps> = ({ children }) => {
	return (
		<div 
			className="w-full max-w-xl p-12 md:p-16 rounded-[3rem] flex flex-col items-center transform transition-transform duration-300 hover:scale-[1.02]" 
			style={{ 
				backgroundColor: '#4C91E2',
				boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.4), 0 20px 25px -5px rgba(0, 0, 0, 0.2), 0 0 60px rgba(74, 144, 226, 0.3)' 
			}}
		>
			{children}
		</div>
	);
};

export default Card;
