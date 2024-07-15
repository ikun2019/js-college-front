import React, { useEffect, useState } from 'react';
import Head from 'next/head';
import { useRouter } from 'next/router';

// ライブラリのインポート
import ReactMarkdown from 'react-markdown';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { dracula } from 'react-syntax-highlighter/dist/cjs/styles/prism';

// コンポーネントのインポート
import SinglePagenationComponent from '../../../components/common/SinglePaginationComponent';
import SidebarCourse from '../../../components/learnings/SidebarCourse';
import BreadcrumbComponent from '@/components/common/BreadcrumbComponent';
import { Button } from '@/components/ui/button';
import Spinner from '@/components/common/Spinner';

// hooksのインポート
import useAuthSesseion from '@/hooks/useAuthSession';
import fetchUserProfile from '@/lib/fetchUserProfile';

const LearningContent = ({ slug, metadata, markdown, prevSlug, nextSlug, headings }) => {
	const breadcrumbs = [
		{ label: 'Home', href: '/' },
		{ label: 'Learning', href: '/learnings' },
		{ label: slug, href: `/${slug}` },
		{ label: metadata.slug, href: `/${metadata.slug}` },
	];

	const router = useRouter();
	const [profile, setProfile] = useState(null);
	const { user, session, loading } = useAuthSesseion();

	useEffect(() => {
		if (!loading && session) {
			const profileData = fetchUserProfile(session.access_token);
			setProfile(profileData);
		}
	}, [loading, session]);

	useEffect(() => {
		if (metadata.premium && profile && !profile.is_subscribed) {
			alert('プレミアム会員へのアップグレードが必要です');
			router.push('/auth/profile');
		}
	}, [profile, router]);

	if (loading || !profile) {
		return <Spinner />;
	}

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
								components={{
									h2(props) {
										return (
											<h2 className="text-2xl border-b-4 border-gray-500 pl-4 mb-4">
												{props.children}
											</h2>
										);
									},
									h3(props) {
										return (
											<h3 className="text-xl border-l-4 border-gray-500 pl-4 mb-4 mt-3">
												{props.children}
											</h3>
										);
									},
									p(paragraph) {
										const { node } = paragraph;
										if (node.children[0].tagName === 'img') {
											const image = node.children[0];
											return (
												<div className="relative w-full">
													<img
														src={image.properties.src}
														alt={image.properties.alt}
														className="object-cover"
													/>
												</div>
											);
										}
										return <p>{paragraph.children}</p>;
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
												customStyle={{ fontSize: '0.8em' }}
											/>
										) : (
											<code className={`${className} text-sm`}>{children}</code>
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
