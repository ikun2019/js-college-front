import React, { useEffect, useState } from 'react';
import Head from 'next/head';
import { useRouter } from 'next/router';

import { Button } from '@/components/ui/button';
import BreadcrumbComponent from '@/components/common/BreadcrumbComponent';
import useAuthSesseion from '@/hooks/useAuthSession';

const Profile = () => {
	const router = useRouter();
	const { user, session, loading } = useAuthSesseion();
	const [profile, setProfile] = useState({});
	const breadcrumbs = [
		{ label: 'Home', href: '/' },
		{ label: 'profile', href: '/auth/profile' },
	];

	useEffect(() => {
		if (loading) return;
		if (!session) {
			router.push('/auth/signin');
		} else {
			fetchProfile();
		}
	}, [session, user, loading]);

	const fetchProfile = async () => {
		const response = await fetch(`${process.env.NEXT_PUBLIC_API_CLIENT_URL}/auth/profile`, {
			method: 'GET',
			headers: {
				'Content-Type': 'application/json',
				Authorization: `Bearer ${session.access_token}`,
			},
		});
		const userProfile = await response.json();
		setProfile(userProfile);
	};

	if (loading) {
		return <div>Loading...</div>;
	}
	return (
		<>
			<Head>
				<title>Profileページ | JS College</title>
				<meta name="description" content="profileページです。" />
				<meta name="robots" content="noindex,nofollow" />
			</Head>
			<div className="container mx-auto px-6 py-8">
				<section>
					<div className="bg-white p-8 rounded-lg shadow-lg">
						{/* パンくずリスト */}
						<div>
							<BreadcrumbComponent breadcrumbs={breadcrumbs} />
						</div>
						<div className="flex items-center mb-6">
							<div>
								<h1 className="text-2xl font-bold mb-6 text-gray-800">Your Profile</h1>
								<p className="text-gray-600">email address</p>
							</div>
						</div>
						<table className="min-w-full bg-white">
							<tbody>
								<tr className="w-full border-b">
									<td className="px-4 py-2 font-bold">Name</td>
									<td className="px-5 py-2">{profile.user_metadata?.displayName}</td>
								</tr>
								<tr className="w-full border-b">
									<td className="px-4 py-2 font-bold">Email</td>
									<td className="px-4 py-2">{profile.email}</td>
								</tr>
								<tr className="w-full border-b">
									<td className="px-4 py-2 font-bold">Subscription</td>
									<td className="px-4 py-2">2,000円/月</td>
								</tr>
							</tbody>
						</table>
						<div className="mt-6">
							<Button
								className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-700"
								onClick={() => router.push('/auth/profile/edit')}
							>
								Edit Profile
							</Button>
						</div>
					</div>
				</section>
			</div>
		</>
	);
};

export default Profile;
