"use client";

import { useRouter } from 'next/navigation';
import Card from '@/app/components/Card'; 
import Input from '@/app/components/Input';
import YellowButton from '@/app/components/YellowButton';

export default function SignupPage() {
  const router = useRouter();
  const primaryBlue = '#4A90E2';
  const accentGreen = '#50E3C2';

  const handleSignUp = () => {
    router.push('/upload');
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100 relative overflow-hidden">
      {/* Decorative dots pattern */}
      <div 
        className="absolute inset-0 opacity-10"
        style={{
          backgroundImage: `
            radial-gradient(circle at 20% 30%, ${accentGreen} 2px, transparent 2px),
            radial-gradient(circle at 80% 20%, ${primaryBlue} 1.5px, transparent 1.5px),
            radial-gradient(circle at 30% 70%, ${primaryBlue} 1px, transparent 1px),
            radial-gradient(circle at 75% 80%, ${accentGreen} 2.5px, transparent 2.5px),
            radial-gradient(circle at 10% 90%, ${accentGreen} 1.5px, transparent 1.5px),
            radial-gradient(circle at 90% 60%, ${primaryBlue} 2px, transparent 2px)
          `,
          backgroundSize: '100px 100px, 150px 150px, 120px 120px, 180px 180px, 90px 90px, 110px 110px',
          backgroundPosition: '0 0, 40px 40px, 80px 20px, 20px 60px, 60px 80px, 30px 30px'
        }}
      />

      {/* Floating decorative shapes */}
      <div 
        className="absolute w-40 h-40 rounded-full opacity-5 blur-2xl"
        style={{ 
          backgroundColor: accentGreen,
          top: '10%',
          right: '10%',
          animation: 'floatSlow 10s ease-in-out infinite'
        }}
      />
      <div 
        className="absolute w-32 h-32 rounded-full opacity-5 blur-2xl"
        style={{ 
          backgroundColor: primaryBlue,
          bottom: '15%',
          left: '10%',
          animation: 'floatSlow 12s ease-in-out infinite 2s'
        }}
      />

      <div className="relative z-10">
        <Card>
        <h1 className="text-4xl font-semibold mb-8 text-white">
          Create an account
        </h1>
        
        <div className="w-full space-y-8 mb-6"> 
          <Input id="email" label="Email" type="text" />
          <Input id="username" label="Username" type="text" />
          <Input id="password" label="Password" type="password" />
          <Input id="confirm-password" label="Confirm Password" type="password" />
        </div>

        <YellowButton onClick={handleSignUp}>
          Sign Up
        </YellowButton>

        <p className="mt-6 text-sm text-white">
          Already have an account? <a href="/login" className="underline font-medium hover:text-gray-200 cursor-pointer">Sign in</a>
        </p>
      </Card>
      </div>
    </div>
  );
}
