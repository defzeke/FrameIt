

import { NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

export async function POST(request: Request) {
	const { email, password } = await request.json();
	const supabase = createClient(
		process.env.NEXT_PUBLIC_SUPABASE_URL!,
		process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
	);

	const { data, error } = await supabase.auth.signInWithPassword({ email, password });
	if (error) {
		return NextResponse.json({ error: error.message }, { status: 401 });
	}

	// Set JWT in HTTP-only cookie
	const response = NextResponse.json({ user: data.user });
	if (data.session && data.session.access_token) {
		response.cookies.set('frameit_token', data.session.access_token, {
			httpOnly: true,
			secure: process.env.NODE_ENV === 'production',
			sameSite: 'lax',
			path: '/',
			maxAge: 60 * 60 * 24 * 7 // 7 days
		});
	}
	return response;
}
