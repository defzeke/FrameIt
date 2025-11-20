// sign-up page component

import Card from '@/app/components/Card'; 
import Input from '@/app/components/Input';

export default function SignupPage() {
  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <Card>
        {/* Title */}
        <h1 className="text-4xl font-semibold mb-8 text-white">
          Create an account
        </h1>
        
        {/* Form Inputs */}
        <div className="w-full space-y-8 mb-6"> 
          <Input id="email" label="Email" type="text" />
          <Input id="username" label="Username" type="text" />
          <Input id="password" label="Password" type="password" />
          <Input id="confirm-password" label="Confirm Password" type="password" />
        </div>
        npm run dev

        {/* Sign Up Button */}
        <button
          className="px-6 py-2 rounded-full text-sm font-bold transition hover:opacity-90 shadow-md"
          style={{ 
            backgroundColor: '#FFBE0B', 
            color: 'black' 
          }}
        >
          Sign Up
        </button>

        {/* Login Link */}
        <p className="mt-6 text-sm text-white">
          Already have an account? <a href="/login" className="underline font-medium hover:text-gray-200">Sign in</a>
        </p>
      </Card>
    </div>
  );
}