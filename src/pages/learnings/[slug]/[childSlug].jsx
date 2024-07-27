import React, { useEffect, useState } from 'react';
import Head from 'next/head';
import { useRouter } from 'next/router';

// ライブラリのインポート
import ReactMarkdown from 'react-markdown';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { dracula } from 'react-syntax-highlighter/dist/cjs/styles/prism';
import rehypeRaw from 'rehype-raw';
import remarkGfm from 'remark-gfm';

// コンポーネントのインポート
import SinglePagenationComponent from '../../../components/common/SinglePaginationComponent';
import SidebarCourse from '../../../components/learnings/SidebarCourse';
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

	if (loading || !profile) {
		return <Spinner />;
	}

	if (metadata.premium && !profile.is_subscribed) {
		return <Spinner />;
	}

	console.log('Markdown =>', markdown);

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
									h2: (props) => (
										<h2 className="text-2xl border-b-2 border-gray-500 pl-4 pb-2 mb-2 mt-6 font-semibold">
											{props.children}
										</h2>
									),
									h3: (props) => (
										<h3 className="text-xl border-l-4 border-gray-500 pl-4 mb-4 mt-3">
											{props.children}
										</h3>
									),
									p: (paragraph) => {
										const { node } = paragraph;
										if (node.children[0].tagName === 'img') {
											const image = node.children[0];
											return (
												<div className="relative w-full">
													<img
														src={image.properties.src}
														alt={image.properties.alt}
														className="object-cover mb-3"
													/>
												</div>
											);
										}
										return <p className="text-sm leading-relaxed mb-4">{paragraph.children}</p>;
									},
									ul: (props) => <ul className="">{props.children}</ul>,
									li: (props) => <li className="list-disc ml-6">{props.children}</li>,
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
										<th className="px-4 py-2 border border-gray-400" {...props} />
									),
									td: ({ node, ...props }) => (
										<td className="px-4 py-2 border border-gray-400" {...props} />
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
							{user && (
								<div className="mt-4 text-center">
									<Button variant="outline">Complete</Button>
								</div>
							)}
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

	// * slug内のデータを取得
	const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/learnings/${slug}`);
	if (!response.ok) {
		throw new Error('Data fetch failed');
	}
	const contents = await response.json();

	// * 開いているコンテンツのデータを取得
	const childResponse = await fetch(
		`${process.env.NEXT_PUBLIC_API_URL}/learnings/${slug}/${childSlug}`
	);
	const childContent = await childResponse.json();

	// * ページネーションのためのデータ取得
	const allChildSlugs = contents.nestedMetadatas.map((item) => item.slug).reverse();
	const currentIndex = allChildSlugs.indexOf(childSlug);
	const prevSlug = currentIndex > 0 ? allChildSlugs[currentIndex - 1] : null;
	const nextSlug = currentIndex < allChildSlugs.length - 1 ? allChildSlugs[currentIndex + 1] : null;

	return {
		props: {
			metadata: childContent.metadata,
			markdown: childContent.markdown,
			headings: childContent.headings,
			prevSlug,
			nextSlug,
			slug,
		},
	};
}

export default LearningContent;
