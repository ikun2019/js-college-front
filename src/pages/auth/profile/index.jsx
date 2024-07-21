import React, { useEffect, useState } from 'react';
import Head from 'next/head';
import { useRouter } from 'next/router';

// コンポーネントのインポート
import BreadcrumbComponent from '@/components/common/BreadcrumbComponent';
import Spinner from '@/components/common/Spinner';
import EditProfile from '@/components/profile/EditProfile';

// カスタムAPIのインポート
import useAuthSesseion from '@/hooks/useAuthSession';

const Profile = () => {
	const router = useRouter();
	const { user, loading, profile, session, fetchUserProfile } = useAuthSesseion();

	const breadcrumbs = [
		{ label: 'Home', href: '/' },
		{ label: 'profile', href: '/auth/profile' },
	];

	useEffect(() => {
		if (!loading && !session) {
			router.push('/auth/signin');
		}
		if (session && !profile) {
			fetchUserProfile();
		}
	}, [user, loading, profile, router]);

	if (loading) {
		return <Spinner />;
	}
	if (!user) {
		return null;
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
								<p className="text-gray-600">{user?.user_metadata.email}</p>
							</div>
						</div>
						<table className="min-w-full bg-white">
							<tbody>
								<tr className="w-full border-b">
									<td className="px-4 py-2 font-bold">Name</td>
									<td className="px-5 py-2">{profile?.name}</td>
								</tr>
								<tr className="w-full border-b">
									<td className="px-4 py-2 font-bold">Email</td>
									<td className="px-4 py-2">{user?.user_metadata.email}</td>
								</tr>
								<tr className="w-full border-b">
									<td className="px-4 py-2 font-bold">Subscription</td>
									<td className="px-4 py-2">{profile?.is_subscribed ? '契約中' : '未加入'}</td>
								</tr>
							</tbody>
						</table>
						<div className="mt-6">
							<EditProfile
								session={session}
								loading={loading}
								profile={profile}
								fetchUserProfile={fetchUserProfile}
							/>
						</div>
					</div>
				</section>
			</div>
		</>
	);
};

export default Profile;
