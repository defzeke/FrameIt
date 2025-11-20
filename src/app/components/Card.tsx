// This is the card component used in the login page


interface CardProps {
  children: React.ReactNode;
}

const Card: React.FC<CardProps> = ({ children }) => {
  return (
    <div 
      // Increased max-w-xl to max-w-3xl for much larger width.
      // Increased padding from p-10 to p-16 for more vertical height.
      // Changed rounded-2xl to rounded-[4rem] for significantly more rounded corners.
      className="w-full max-w-3xl p-16 rounded-[4rem] shadow-2xl flex flex-col items-center" 
      // Custom styling to match the blue color and shadow from the model
      style={{ 
        backgroundColor: '#4C91E2', // A blue color close to the model
        boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.3), 0 4px 6px -2px rgba(0, 0, 0, 0.15)' 
      }}
    >
      {children}
    </div>
  );
};

export default Card;