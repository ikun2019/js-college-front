import React, { useEffect, useState } from 'react';
import Head from 'next/head';
import { useRouter } from 'next/router';

import useAuthSesseion from '@/hooks/useAuthSession';

import Spinner from '@/components/common/Spinner';

const edit = () => {
	const { session, loading, profile, fetchUserProfile } = useAuthSesseion();
	const [newProfile, setNewProfile] = useState({ name: '' });
	const router = useRouter();

	useEffect(() => {
		if (!loading && !session) {
			router.push('/auth/signin');
		}
		if (session && !profile) {
			fetchUserProfile();
		}
		setNewProfile({ name: profile?.name });
	}, [session, loading, router, profile]);

	const updateProfile = async (e) => {
		e.preventDefault();
		try {
			const response = await fetch(`${process.env.NEXT_PUBLIC_API_CLIENT_URL}/auth/profile`, {
				method: 'PUT',
				headers: {
					'Content-Type': 'application/json',
					Authorization: `Bearer ${session.access_token}`,
				},
				body: JSON.stringify({
					profileData: { name: newProfile.name },
				}),
			});
			if (!response.ok) {
				const errorData = await response.json();
				console.error('Error updating profile:', errorData.error);
				return;
			}
			await fetchUserProfile();
			router.push('/auth/profile');
		} catch (error) {
			console.error('Error', error.message);
		}
	};

	if (loading || !profile) {
		return <Spinner />;
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
								value={newProfile.name}
								onChange={(e) => setNewProfile({ ...newProfile, name: e.target.value })}
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
