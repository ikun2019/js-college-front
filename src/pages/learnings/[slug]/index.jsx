import React, { useEffect, useState } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import dynamic from 'next/dynamic';

import useAuthSession from '@/hooks/useAuthSession';
// import { fetchNotionData, fetchNestedPages } from '@/lib/notionClient';

const Sidebar = dynamic(() => import('@/components/learnings/Sidebar'), { ssr: false });
import BreadcrumbComponent from '@/components/common/BreadcrumbComponent';
import Spinner from '@/components/common/Spinner';
import {
	AlertDialog,
	AlertDialogAction,
	AlertDialogCancel,
	AlertDialogContent,
	AlertDialogDescription,
	AlertDialogFooter,
	AlertDialogHeader,
	AlertDialogTitle,
} from '@/components/ui/alert-dialog';

// ライブラリのインポート
// import ReactMarkdown from 'react-markdown';
import { useRouter } from 'next/router';

const fetcher = async (url) => {
	const response = await fetch(url);
	const data = await response.json();
	return data;
};

const index = ({ initialParentData: parentData, initialChildData: childDatas, slug }) => {
	console.log('Learnings Slug Page');

	const router = useRouter();
	const { user, session, profile, loading, fetchUserProfile } = useAuthSession();
	const [showAlert, setShowAlert] = useState(false);

	// SWRでデータをフェッチし初期データを渡す
	// const { data: parentData } = useSWR(`/api/notion/parent?slug=${slug}`, fetcher, {
	// 	fallback: initialParentData,
	// });
	// console.log('parentData =>', parentData);

	// パンくずリスト
	const breadcrumbs = [
		{ label: 'Home', href: '/' },
		{ label: 'Learning', href: '/learnings' },
		{
			label: parentData?.Slug?.rich_text[0].plain_text,
			href: `/learnings/${parentData?.Slug}`,
		},
	];

	const handleRedirectSignin = () => {
		setShowAlert(false);
		router.push('/auth/signup');
	};

	useEffect(() => {
		if (!loading && !session) {
			setShowAlert(true);
		}
		if (session && !profile) {
			fetchUserProfile();
		}
	}, [user, loading, router, profile]);

	if (loading) {
		return <Spinner />;
	}

	// if (!user) {
	// 	return null;
	// }

	return (
		<>
			<Head>
				<title>{`${parentData?.Title?.title[0].plain_text} | JS College`}</title>
				<meta name="description" content={`${parentData?.Description?.rich_text[0].plain_text}`} />
				<meta name="robots" content="noindex,nofollow" />
			</Head>
			<div className="container mx-auto px-6 py-8">
				<section className="flex flex-wrap -mx-6">
					{/* Learnings Page */}
					<div className="w-full lg:w-3/4 px-6">
						<div className="bg-white p-8 rounded-lg shadow-lg">
							<div>
								{/* パンくずリスト */}
								<BreadcrumbComponent breadcrumbs={breadcrumbs} />
							</div>
							<h1 className="text-4xl font-bold mb-6 text-gray-800 mt-3">
								{parentData?.Title?.title[0].plain_text}
							</h1>
							<ul className="grid grid-cols-1 md:grid-cols-2 gap-6">
								{childDatas.map((item, index) => (
									<li key={index} className="mb-3">
										<div className="bg-gray-100 p-4 rounded-lg hover:shadow-md active:shadow-none transition-shadow duration-300">
											<Link
												href={`/learnings/${parentData.Slug.rich_text[0].plain_text}/${item.slug}`}
												className={`cursor-pointer ${
													item.premium && !profile?.is_subscribed ? 'disabled' : ''
												}`}
											>
												<div className="flex justify-between">
													<span className="text-gray-600 text-sm">{`Lesson ${index + 1}`}</span>
													{!item.premium && !profile?.is_subscribed ? (
														<span className="inline-flex items-center justify-center px-3 py-1 text-sm font-bold leading-none text-white bg-red-700 rounded-full shadow-lg border-2 border-red-900">
															Free
														</span>
													) : (
														''
													)}
												</div>
												<h2 className="font-bold mb-2 text-gray-700 mt-3">{item.title}</h2>
												<p className="text-gray-600 text-sm">{item.description}</p>
											</Link>
										</div>
									</li>
								))}
							</ul>
						</div>
					</div>
					{/* Sidebar */}
					<Sidebar />
				</section>
			</div>
			{showAlert && (
				<AlertDialog open={showAlert} onOpenChange={() => setShowAlert(false)}>
					<AlertDialogContent>
						<AlertDialogHeader>
							<AlertDialogTitle>購読するにはユーザー登録が必要です。</AlertDialogTitle>
							<AlertDialogDescription>
								一部コンテンツは無料登録で閲覧できますが、ユーザー登録しますか？
							</AlertDialogDescription>
						</AlertDialogHeader>
						<AlertDialogFooter>
							<AlertDialogCancel onClick={() => setShowAlert(false)}>Cancel</AlertDialogCancel>
							<AlertDialogAction onClick={handleRedirectSignin}>SignUp</AlertDialogAction>
						</AlertDialogFooter>
					</AlertDialogContent>
				</AlertDialog>
			)}
		</>
	);
};

export async function getServerSideProps(context) {
	const { slug } = context.params;
	try {
		const slugResponse = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/learnings/${slug}`, {
			method: 'GET',
			headers: {
				'Content-Type': 'application/json',
			},
		});
		const slugResponseData = await slugResponse.json();
		return {
			props: {
				initialParentData: slugResponseData.parentMetadata,
				initialChildData: slugResponseData.nestedMetadatas.reverse(),
			},
		};
	} catch (error) {
		return {
			props: {
				initialParentData: null,
				initialChildData: [],
				metas: [],
			},
		};
	}
}

export default index;
