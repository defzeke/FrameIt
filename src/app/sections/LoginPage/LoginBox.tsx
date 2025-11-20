//This is the login page

import Card from '@/app/components/Card'; 
import Input from '@/app/components/Input';
import YellowButton from '@/app/components/YellowButton'; 

export default function LoginPage() {
  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <Card>
        {/* Title */}
        <h1 className="text-4xl font-semibold mb-8 text-white">
          Login
        </h1>
        
        {/* Form Inputs */}
        <div className="w-full space-y-8 mb-10"> 
          <Input id="username" label="Username" type="text" />
          <Input id="password" label="Password" type="password" />
        </div>
        
        {/* Sign In Button */}
        <YellowButton>
          Sign In
        </YellowButton>

        {/* Sign Up Link */}
        <p className="mt-6 text-sm text-white">
          Don't have an account? <a href="/signup" className="underline font-medium hover:text-gray-200">Sign Up</a>
        </p>
      </Card>
    </div>
  );
}