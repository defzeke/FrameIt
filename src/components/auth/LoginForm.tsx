import React, { useState } from 'react';
import YellowButton from '@/components/ui/YellowButton';
import { supabase } from '@/lib/supabase/supabase';

export default function LoginPage() {
  const [remember, setRemember] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    try {
      const res = await fetch('/api/auth/sign-in', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });
      const result = await res.json();
      setLoading(false);
      if (!res.ok) {
        if (result.error && result.error.toLowerCase().includes('invalid login credentials')) {
          setError('No account found with that email and password.');
        } else {
          setError(result.error || 'Sign in failed');
        }
      } else {
        // Set session in Supabase client
        if (result.session) {
          await supabase.auth.setSession({
            access_token: result.session.access_token,
            refresh_token: result.session.refresh_token,
          });
        }
        window.location.href = '/upload';
      }
    } catch {
      setLoading(false);
      setError('Network error');
    }
  };

  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-gradient-to-b from-[#4A90E2] via-[#8CB8E8] to-white px-4">
      <div className="flex-1 flex justify-center items-center py-12">
        <div className="bg-white/90 rounded-3xl shadow-2xl px-10 py-12 w-full max-w-md border-0 backdrop-blur-md">
          <h1 className="text-4xl font-extrabold mb-8 text-center text-black tracking-tight">Sign in</h1>
          <form className="space-y-6" onSubmit={handleSubmit}>
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">Email</label>
              <input
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                required
                className="w-full px-4 py-3 rounded-xl bg-white border border-gray-300 text-black placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#4A90E2]"
                placeholder="your@email.com"
                value={email}
                onChange={e => setEmail(e.target.value)}
                disabled={loading}
              />
            </div>
            <div>
              <div className="flex justify-between items-center mb-1">
                <label htmlFor="password" className="block text-sm font-medium text-gray-700">Password</label>
                <a href="#" className="text-xs text-black hover:text-[#50E3C2] hover:underline transition-colors duration-200">Forgot your password?</a>
              </div>
              <input
                id="password"
                name="password"
                type="password"
                autoComplete="current-password"
                required
                className="w-full px-4 py-3 rounded-xl bg-white border border-gray-300 text-black placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#4A90E2]"
                placeholder="••••••••"
                value={password}
                onChange={e => setPassword(e.target.value)}
                disabled={loading}
              />
            </div>
            <div className="flex items-center mb-2">
              <input
                id="remember"
                name="remember"
                type="checkbox"
                checked={remember}
                onChange={() => setRemember(!remember)}
                className="h-4 w-4 text-[#50E3C2] focus:ring-[#50E3C2] border-gray-300 rounded"
                disabled={loading}
              />
              <label htmlFor="remember" className="ml-2 block text-sm text-gray-700">Remember me</label>
            </div>
            {error && (
              <div className="text-red-600 text-sm text-center font-medium">{error}</div>
            )}
            <YellowButton type="submit" className="w-full py-3 text-lg rounded-xl shadow-md hover:shadow-lg transition-all bg-[#FFD700] text-[#10151c]" disabled={loading}>
              {loading ? 'Signing in...' : 'Sign in'}
            </YellowButton>
          </form>
        </div>
      </div>
    </div>
  );
}