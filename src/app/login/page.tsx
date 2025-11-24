"use client";

import { useRouter } from 'next/navigation';
import Card from '@/app/components/Card'; 
import Input from '@/app/components/Input';
import YellowButton from '@/app/components/YellowButton'; 

export default function LoginPage() {
  const router = useRouter();

  const handleSignIn = () => {
    // TODO: Implement actual authentication
    router.push('/upload');
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
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
  );
}
