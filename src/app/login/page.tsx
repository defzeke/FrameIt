"use client";

import { useRouter } from 'next/navigation';
import Card from '@/app/components/Card'; 
import Input from '@/app/components/Input';
import YellowButton from '@/app/components/YellowButton'; 

export default function LoginPage() {
  const router = useRouter();
  const primaryBlue = '#4A90E2';
  const accentGreen = '#50E3C2';

  const handleSignIn = () => {
    router.push('/upload');
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100 relative overflow-hidden">
      {/* Decorative dots pattern */}
      <div 
        className="absolute inset-0 opacity-10"
        style={{
          backgroundImage: `
            radial-gradient(circle at 20% 30%, ${primaryBlue} 2px, transparent 2px),
            radial-gradient(circle at 80% 20%, ${accentGreen} 1.5px, transparent 1.5px),
            radial-gradient(circle at 30% 70%, ${accentGreen} 1px, transparent 1px),
            radial-gradient(circle at 75% 80%, ${primaryBlue} 2.5px, transparent 2.5px),
            radial-gradient(circle at 10% 90%, ${primaryBlue} 1.5px, transparent 1.5px),
            radial-gradient(circle at 90% 60%, ${accentGreen} 2px, transparent 2px)
          `,
          backgroundSize: '100px 100px, 150px 150px, 120px 120px, 180px 180px, 90px 90px, 110px 110px',
          backgroundPosition: '0 0, 40px 40px, 80px 20px, 20px 60px, 60px 80px, 30px 30px'
        }}
      />

      {/* Floating decorative shapes */}
      <div 
        className="absolute w-40 h-40 rounded-full opacity-5 blur-2xl"
        style={{ 
          backgroundColor: primaryBlue,
          top: '10%',
          left: '10%',
          animation: 'floatSlow 10s ease-in-out infinite'
        }}
      />
      <div 
        className="absolute w-32 h-32 rounded-full opacity-5 blur-2xl"
        style={{ 
          backgroundColor: accentGreen,
          bottom: '15%',
          right: '10%',
          animation: 'floatSlow 12s ease-in-out infinite 2s'
        }}
      />

      <div className="relative z-10">
        <Card>
        <h1 className="text-4xl font-semibold mb-8 text-white">
          Login
        </h1>
        
        <div className="w-full space-y-8 mb-10"> 
          <Input id="username" label="Username" type="text" />
          <Input id="password" label="Password" type="password" />
        </div>
        
        <YellowButton onClick={handleSignIn}>
          Sign In
        </YellowButton>

        <p className="mt-6 text-sm text-white">
          Don't have an account? <a href="/signup" className="underline font-medium hover:text-gray-200 cursor-pointer">Sign Up</a>
        </p>
      </Card>
      </div>
    </div>
  );
}
