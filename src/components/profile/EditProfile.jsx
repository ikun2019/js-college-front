import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';

// コンポーネントのインポート
import Spinner from '../common/Spinner';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
	Sheet,
	SheetClose,
	SheetContent,
	SheetDescription,
	SheetFooter,
	SheetHeader,
	SheetTitle,
	SheetTrigger,
} from '@/components/ui/sheet';

// カスタムAPIのインポート
import useAuthSession from '@/hooks/useAuthSession';

const EditProfile = ({ session, loading, profile, fetchUserProfile }) => {
	// const { session, loading, profile, fetchUserProfile } = useAuthSession();

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
		return null;
	}

	return (
		<Sheet>
			<SheetTrigger asChild>
				<Button
					className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-700"
					// onClick={() => router.push('/auth/profile/edit')}
				>
					Edit Profile
				</Button>
			</SheetTrigger>
			<SheetContent>
				<SheetHeader>
					<SheetTitle>Edit Profile</SheetTitle>
					<SheetDescription>各種設定変更はこちらのページから変更してください。</SheetDescription>
				</SheetHeader>
				<div className="grid gap-4 py-4">
					<div className="grid grid-cols-4 items-center gap-4">
						<label htmlFor="Name" className="text-right text-gray-700 text-sm">
							Name
						</label>
						<Input
							type="text"
							name="name"
							value={newProfile.name}
							onChange={(e) => setNewProfile({ ...newProfile, name: e.target.value })}
							// className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:border-blue-500"
							className="col-span-3"
							required
						/>
					</div>
				</div>
				<SheetFooter>
					<SheetClose asChild>
						<Button
							type="submit"
							className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
							onClick={updateProfile}
						>
							Save Changes
						</Button>
					</SheetClose>
				</SheetFooter>
			</SheetContent>
		</Sheet>
	);
};

export default EditProfile;
