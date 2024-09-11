import React, { useEffect, useState } from 'react';
import Head from 'next/head';
import { useRouter } from 'next/router';
import dynamic from 'next/dynamic';
import Image from 'next/image';

// ライブラリのインポート
import ReactMarkdown from 'react-markdown';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { dracula } from 'react-syntax-highlighter/dist/cjs/styles/prism';
import rehypeRaw from 'rehype-raw';
import remarkGfm from 'remark-gfm';

// コンポーネントのインポート
const SinglePagenationComponent = dynamic(() =>
	import('@/components/common/SinglePaginationComponent')
);
const SidebarCourse = dynamic(() => import('@/components/learnings/SidebarCourse'), { ssr: false });
import BreadcrumbComponent from '@/components/common/BreadcrumbComponent';
import { Button } from '@/components/ui/button';
import Spinner from '@/components/common/Spinner';

// hooksのインポート
import useAuthSesseion from '@/hooks/useAuthSession';
// import fetchUserProfile from '@/lib/fetchUserProfile';

const LearningContent = ({ slug, metadata, markdown, prevSlug, nextSlug, headings }) => {
	const breadcrumbs = [
		{ label: 'Home', href: '/' },
		{ label: 'Learning', href: '/learnings' },
		{ label: slug, href: `/learnings/${slug}` },
		{ label: metadata.slug, href: `/learnings/${slug}/${metadata.slug}` },
	];

	const [updatedImageUrl, setUpdatedImageUrl] = useState(null);

	const router = useRouter();
	const { user, session, loading, profile, fetchUserProfile } = useAuthSesseion();

	useEffect(() => {
		if (!loading && !session) {
			router.push('/auth/signin');
		}
		if (session && !profile) {
			fetchUserProfile();
		}
	}, [loading, session, user, profile]);

	useEffect(() => {
		if (metadata.premium && profile && !profile?.is_subscribed) {
			alert('プレミアム会員へのアップグレードが必要です');
			router.push('/auth/profile');
		}
	}, [profile, router]);

	// const handleImageError = async (imageUrl) => {
	// 	try {
	// 		const response = await fetch(
	// 			`${process.env.NEXT_PUBLIC_API_CLIENT_URL}/learnings/get-new-image-url`
	// 		);
	// 		if (response.ok) {
	// 			const data = await response.json();
	// 			setUpdatedImageUrl(data.newImageUrl);
	// 		} else {
	// 			console.error('Failed to fetch new image URL.');
	// 		}
	// 	} catch (error) {
	// 		console.error('Failed to fetch new image URL:', error);
	// 	}
	// };

	// const renderImage = (image) => {
	// 	const imageUrl = updatedImageUrl || image.properties.src;
	// 	return (
	// 		<div className="relative w-full">
	// 			<img
	// 				src={imageUrl}
	// 				alt={image.properties.alt}
	// 				className="object-cover mb-3"
	// 				onError={() => handleImageError(imageUrl)}
	// 			/>
	// 		</div>
	// 	);
	// };

	if (loading || !profile) {
		return <Spinner />;
	}

	if (metadata.premium && !profile.is_subscribed) {
		return <Spinner />;
	}

	const headingsIndex = (text) => {
		return headings.findIndex((heading) => heading.text === text);
	};

	return (
		<>
			<Head>
				<title>{`${metadata.title} | JS College`}</title>
				<meta name="description" content={metadata.description} />
				<meta name="robots" content="noindex,nofollow" />
			</Head>
			<div className="container mx-auto px-6 py-8">
				<section className="flex flex-wrap -mx-6">
					{/* Learning Content */}
					<div className="w-full lg:w-3/4 px-6">
						<div className="bg-white p-6 rounded-lg shadow-lg">
							<div>
								{/* パンくずリスト */}
								<BreadcrumbComponent breadcrumbs={breadcrumbs} />
							</div>
							<h1 className="text-2xl font-bold mb-2 mt-6">{metadata.title}</h1>
							<ReactMarkdown
								children={markdown}
								rehypePlugins={[rehypeRaw]}
								remarkPlugins={[remarkGfm]}
								components={{
									h2: (props) => {
										const index = headingsIndex(props.children.toString());
										const id = `headings-${index}`;
										return (
											<h2
												id={id}
												className="text-2xl border-b-2 border-gray-500 pl-4 pb-2 mb-2 mt-6 font-semibold"
											>
												{props.children}
											</h2>
										);
									},
									h3: (props) => {
										const index = headingsIndex(props.children.toString());
										const id = `headings-${index}`;
										return (
											<h3 id={id} className="text-xl border-l-4 border-gray-500 pl-4 mb-4 mt-3">
												{props.children}
											</h3>
										);
									},
									p: (paragraph) => {
										const { node } = paragraph;
										if (node.children[0].tagName === 'img') {
											const image = node.children[0];
											return (
												<div className="relative w-full">
													<Image
														src={image.properties.src}
														alt={image.properties.alt}
														width={800}
														height={600}
														placeholder="blur"
														blurDataURL="./loading_image.webp"
													/>
												</div>
											);
										}
										return <p className="text-sm leading-relaxed mb-4">{paragraph.children}</p>;
									},
									ul: (props) => <ul className="list-disc ml-6">{props.children}</ul>,
									li: (props) => <li className="mb-3">{props.children}</li>,
									ol: (props) => <ol className="list-decimal ml-6">{props.children}</ol>,
									a: (props) => (
										<a href={props.href} className="text-blue-600">
											{props.children}
										</a>
									),
									hr: () => <hr className="my-6" />,
									table: ({ node, ...props }) => (
										<table className="table-auto w-full border-collapse" {...props} />
									),
									thead: ({ node, ...props }) => <thead className="bg-gray-100" {...props} />,
									tbody: ({ node, ...props }) => <tbody {...props} />,
									tr: ({ node, ...props }) => <tr {...props} />,
									th: ({ node, ...props }) => (
										<th className="px-4 py-2 border border-gray-400 text-sm" {...props} />
									),
									td: ({ node, ...props }) => (
										<td className="px-4 py-2 border border-gray-400 text-sm" {...props} />
									),
									code: ({ children, className, inline }) => {
										const match = /language-(\w+)/.exec(className || '');
										const codeContent = String(children).replace(/\n$/, '');
										const lines = codeContent.split('\n');
										const fileName = lines[0].startsWith('# ') ? lines[0].slice(2) : '';
										const code = fileName ? lines.slice(1).join('\n') : codeContent;
										return !inline && match ? (
											<div className="relative my-4">
												{fileName && (
													<div className="absolute right-0 top-0 bg-gray-800 text-white px-2 py-1 rounded-bl-md text-xs">
														{fileName}
													</div>
												)}
												<SyntaxHighlighter
													PreTag="div"
													children={code}
													language={match[1]}
													style={dracula}
													customStyle={{ fontSize: '0.8em' }}
												/>
											</div>
										) : (
											<code className={`${className} text-sm bg-gray-200 text-red-500`}>
												{children}
											</code>
										);
									},
								}}
							/>
							{/* {user && (
								<div className="mt-4 text-center">
									<Button variant="outline">Complete</Button>
								</div>
							)} */}
							<SinglePagenationComponent
								page={`/learnings/${slug}`}
								prevSlug={prevSlug}
								nextSlug={nextSlug}
							/>
						</div>
					</div>
					<SidebarCourse headings={headings} />
				</section>
			</div>
		</>
	);
};

export async function getServerSideProps(context) {
	const { slug, childSlug } = context.params;

	const [contentsResponse, childResponse] = await Promise.all([
		await fetch(`${process.env.NEXT_PUBLIC_API_URL}/learnings/${slug}`, {
			method: 'GET',
			headers: {
				'Content-Type': 'application/json',
				'Cache-Control': 'public, max-age=31536000, imutable',
			},
		}),
		await fetch(`${process.env.NEXT_PUBLIC_API_URL}/learnings/${slug}/${childSlug}`, {
			method: 'GET',
			headers: {
				'Content-Type': 'application/json',
				'Cache-Control': 'public, max-age=31536000, imutable',
			},
		}),
	]);
	// * slug内のデータを取得
	if (!contentsResponse.ok || !childResponse.ok) {
		throw new Error('Data fetch failed');
	}
	const contents = await contentsResponse.json();
	const childContent = await childResponse.json();

	// * ページネーションのためのデータ取得
	const allChildSlugs = contents.nestedMetadatas
		.sort((a, b) => a.number - b.number)
		.map((item) => item.slug);
	const currentIndex = allChildSlugs.indexOf(childSlug);
	const prevSlug = currentIndex > 0 ? allChildSlugs[currentIndex - 1] : null;
	const nextSlug = currentIndex < allChildSlugs.length - 1 ? allChildSlugs[currentIndex + 1] : null;

	return {
		props: {
			metadata: childContent.metadata,
			markdown: childContent.markdown.parent,
			headings: childContent.headings,
			prevSlug,
			nextSlug,
			slug,
		},
	};
}

export default LearningContent;
