"use client"

interface YellowButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  type?: "button" | "submit" | "reset";
  className?: string;
  size?: "sm" | "md" | "lg";
  fullRounded?: boolean;
}

export default function YellowButton({ 
  children, 
  onClick, 
  type = "button",
  className = "",
  size = "md",
  fullRounded = true
}: YellowButtonProps) {
  const sizeClasses = {
    sm: "px-4 py-1.5 text-sm",
    md: "px-6 py-2 text-base",
    lg: "px-10 py-3 text-lg"
  };

  const roundedClass = fullRounded ? "rounded-full" : "rounded-[2rem]";

  return (
    <button
      type={type}
      onClick={onClick}
      className={`${sizeClasses[size]} ${roundedClass} font-bold bg-yellow-400 text-gray-900 hover:bg-yellow-500 transition-colors shadow-md cursor-pointer ${className}`}
    >
      {children}
    </button>
  );
}


