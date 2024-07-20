import React, { useEffect } from 'react';
import { useRouter } from 'next/router';

import Spinner from '@/components/common/Spinner';

const Callback = () => {
	const router = useRouter();
	const { code } = router.query;
	console.log('code', code);
	useEffect(() => {
		const fetchSession = async () => {
			if (code) {
				try {
					const response = await fetch(
						`${process.env.NEXT_PUBLIC_API_CLIENT_URL}/auth/callback?code=${code}`,
						{
							method: 'GET',
							headers: {
								'Content-Type': 'application/json',
							},
							credentials: 'include',
						}
					);
					if (response.ok) {
						router.push('/');
					} else {
						console.error('Failed to fetch session');
						router.push('/auth/signin');
					}
				} catch (error) {
					console.error('Error fetching session', error);
					router.push('/auth/signin');
				}
			}
		};
		fetchSession();
	}, [code, router]);

	return <Spinner />;
};

export default Callback;
