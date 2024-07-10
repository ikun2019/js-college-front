import React, { useEffect, useState } from 'react';
import Head from 'next/head';

import supabase from '@/lib/supabaesClient';
import useAuthSesseion from '@/hooks/useAuthSession';
import { useRouter } from 'next/router';

const edit = () => {
	const [profile, setProfile] = useState({ name: '' });
	const { user, session, loading } = useAuthSesseion();
	const router = useRouter();

	useEffect(() => {
		if (loading) return;
		if (!user) {
			router.push('/auth/signin');
		} else {
			setProfile({ name: user.user_metadata?.displayName || '' });
		}
	}, [user, session, loading, router]);

	const updateProfile = async (e) => {
		e.preventDefault();
		console.log(session.access_token);
		try {
			const response = await fetch(`${process.env.NEXT_PUBLIC_API_CLIENT_URL}/auth/profile`, {
				method: 'PUT',
				headers: {
					'Content-Type': 'application/json',
					Authorization: `Bearer ${session.access_token}`,
				},
				body: JSON.stringify({
					profileData: { name: profile.name },
				}),
			});
			if (!response.ok) {
				const errorData = await response.json();
				console.error('Error updating profile:', errorData.error);
				return;
			}
			const data = await response.json();
			router.push('/auth/profile');
		} catch (error) {
			console.error('Error', error);
		}
	};

	if (loading || !user) {
		return <div>Loading...</div>;
	}

	return (
		<>
			<Head>
				<title>Edit Profile | JS College</title>
				<meta name="description" content="Edit user profile page" />
				<meta name="robots" content="noindex,nofollow" />
			</Head>
			<div className="container mx-auto px-6 py-8">
				<div className="bg-white p-6 rounded-lg shadow-lg">
					<h1 className="text-2xl font-bold mb-6">Edit Profile</h1>
					<form onSubmit={updateProfile}>
						<div className="mb-4">
							<label className="block text-gray-700">Name</label>
							<input
								type="text"
								name="name"
								value={profile.name}
								onChange={(e) => setProfile({ ...profile, name: e.target.value })}
								className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:border-blue-500"
								required
							/>
						</div>
						<div className="mt-6">
							<button
								type="submit"
								className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-700"
							>
								Save Changes
							</button>
							<button
								type="button"
								className="ml-4 bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-700"
								onClick={() => router.push('/auth/profile')}
							>
								Cancel
							</button>
						</div>
					</form>
				</div>
			</div>
		</>
	);
};

export default edit;
