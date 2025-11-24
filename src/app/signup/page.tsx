"use client";

import { useRouter } from 'next/navigation';
import Card from '@/app/components/Card'; 
import Input from '@/app/components/Input';
import YellowButton from '@/app/components/YellowButton';

export default function SignupPage() {
  const router = useRouter();

  const handleSignUp = () => {
    // TODO: Implement actual registration
    router.push('/upload');
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
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
  );
}
