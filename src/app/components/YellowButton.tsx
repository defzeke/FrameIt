"use client"

// Reusable Yellow Button component
interface YellowButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  type?: "button" | "submit" | "reset";
  className?: string;
}

export default function YellowButton({ 
  children, 
  onClick, 
  type = "button",
  className = ""
}: YellowButtonProps) {
  return (
    <button
      type={type}
      onClick={onClick}
      className={`px-6 py-2 rounded-full text-sm font-bold transition hover:opacity-90 shadow-md ${className}`}
      style={{ 
        backgroundColor: '#FFC107', 
        color: 'black' 
      }}
    >
      {children}
    </button>
  );
}


