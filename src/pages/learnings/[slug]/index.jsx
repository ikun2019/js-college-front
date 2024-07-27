import React, { useEffect, useState } from 'react';
import Head from 'next/head';
import Link from 'next/link';

import useAuthSession from '@/hooks/useAuthSession';

import Sidebar from '@/components/learnings/Sidebar';
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
import ReactMarkdown from 'react-markdown';
import { useRouter } from 'next/router';

const index = ({ parentMetadata, childMetadatas, metas }) => {
	console.log('Learnings Slug Page');
	const breadcrumbs = [
		{ label: 'Home', href: '/' },
		{ label: 'Learning', href: '/learnings' },
		{ label: parentMetadata.slug, href: `/learnings/${parentMetadata.slug}` },
	];

	const router = useRouter();
	const { user, session, profile, loading, fetchUserProfile } = useAuthSession();
	const [showAlert, setShowAlert] = useState(false);

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
				<title>{`${parentMetadata.title} | JS College`}</title>
				<meta name="description" content={`${parentMetadata.description}`} />
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
							<h1 className="text-4xl font-bold mb-6 text-gray-800 mt-3">{parentMetadata.title}</h1>
							<ReactMarkdown
								children={parentMetadata.content}
								components={{
									h2(props) {
										return (
											<h2 className="text-2xl border-b-4 border-blue-500 pl-4 mb-4">
												{props.children}
											</h2>
										);
									},
									h3(props) {
										return (
											<h3 className="text-xl border-l-4 border-blue-500 pl-4 mb-4 mt-3">
												{props.children}
											</h3>
										);
									},
									p(paragraph) {
										const { node } = paragraph;
										if (node.children[0].tagName === 'img') {
											const image = node.children[0];
											return (
												<div className="relative w-full my-4">
													<img
														src={image.properties.src}
														alt={image.properties.alt}
														className="object-cover rounded-lg shadow-lg"
													/>
												</div>
											);
										}
										return <p className="text-lg leading-relaxed mb-4">{paragraph.children}</p>;
									},
									code(props) {
										const { children, className } = props;
										const language = className.split('-')[1];
										return language ? (
											<SyntaxHighlighter
												PreTag="div"
												children={String(children).replace(/\n$/, '')}
												language={language}
												style={dracula}
												customStyle={{ fontSize: '0.9em', borderRadius: '8px' }}
											/>
										) : (
											<code className={`${className} text-sm bg-gray-100 p-1 rounded`}>
												{children}
											</code>
										);
									},
								}}
								className="text-gray-700 mb-4"
							></ReactMarkdown>
							<ul className="grid grid-cols-1 md:grid-cols-2 gap-6">
								{childMetadatas.map((item, index) => (
									<li key={index} className="mb-3">
										<div className="bg-gray-100 p-4 rounded-lg hover:shadow-md transition-shadow duration-300">
											<Link
												href={`/learnings/${parentMetadata.slug}/${item.slug}`}
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
					{/* <div className="w-full lg:w-1/4 px-6 mt-8 lg:mt-0"> */}
					<Sidebar metas={metas} />
					{/* </div> */}
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
		const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/learnings/${slug}`);
		if (!response.ok) {
			throw new Error(`${response.statusText}`);
		}
		const data = await response.json();

		const allresponse = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/learnings`, {
			method: 'GET',
			headers: {
				'Content-Type': 'application/json',
			},
		});

		if (!allresponse.ok) {
			throw new Error(`${allresponse.statusText}`);
		}
		const allData = await allresponse.json();

		return {
			props: {
				parentMetadata: data.metadata,
				childMetadatas: data.nestedMetadatas.reverse(),
				metas: allData.metadatas || [],
			},
		};
	} catch (error) {
		return {
			props: {
				parentMetadata: null,
				childMetadatas: [],
				metas: [],
			},
		};
	}
}

export default index;
