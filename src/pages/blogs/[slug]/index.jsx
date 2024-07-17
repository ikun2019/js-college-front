import React from 'react';
import Head from 'next/head';

// ライブラリのインポート
import ReactMarkdown from 'react-markdown';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { dracula } from 'react-syntax-highlighter/dist/cjs/styles/prism';

// コンポーネントのインポート
import Sidebar from '@/components/blogs/Sidebar';
import BreadcrumbComponent from '@/components/common/BreadcrumbComponent';
import SinglePagenationComponent from '@/components/common/SinglePaginationComponent';

const ArticlePage = ({ content, allBlogs, prevSlug, nextSlug }) => {
	console.log('ArticlePage =>', allBlogs);
	console.log('content =>', content);
	const breadcrumbs = [
		{ label: 'Home', href: '/' },
		{ label: 'blogs', href: '/blogs' },
		{ label: content.metadata?.slug, href: `/${content.metadata?.slug}` },
	];

	const date = new Date(content.metadata.date);
	const year = date.getFullYear();
	const month = date.getMonth();
	const day = date.getDate();

	return (
		<>
			<Head>
				<title>{`${content.metadata?.title} | JS College`}</title>
				<meta name="description" content={content.metadata?.description} />
				<meta name="robots" content="index,follow" />
			</Head>
			<div className="container mx-auto px-6 py-8">
				<section className="flex flex-wrap -mx-6">
					{/* <!-- Blog Post --> */}
					<div className="w-full lg:w-3/4 px-6">
						<div className="bg-white p-6 rounded-lg shadow-lg">
							{content.metadata?.image?.file?.url && (
								<img
									src={content.metadata?.image.file.url}
									alt="Blog image"
									className="w-full h-64 object-cover rounded-t-lg mb-4"
								/>
							)}
							<BreadcrumbComponent breadcrumbs={breadcrumbs} />
							<h1 className="text-2xl font-bold mb-2 mt-6">{content.metadata?.title}</h1>
							<p className="text-gray-700 mb-4 text-right">{`${year}年${month}月${day}日`}</p>
							<div className="space-x-2 mb-16">
								{content.metadata?.tags &&
									content.metadata.tags.map((tag) => (
										<span key={tag} className="px-4 py-2 bg-gray-800 text-white rounded-full">
											{tag}
										</span>
									))}
							</div>
							<ReactMarkdown
								children={content.markdown}
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
								className="text-gray-700 mb-4"
							></ReactMarkdown>
							<SinglePagenationComponent page="/blogs" prevSlug={prevSlug} nextSlug={nextSlug} />
						</div>
					</div>

					{/* Sidebar */}
					<Sidebar metas={allBlogs.metadatas} />
				</section>
			</div>
		</>
	);
};

export async function getServerSideProps(context) {
	const { slug } = context.params;
	// 単一の記事を取得
	const singleResponse = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/blogs/${slug}`);
	const singleData = await singleResponse.json();
	if (!singleResponse.ok) {
		throw new Error(`Errro: ${singleData.statusText}`);
	}
	// 全ての記事を取得
	const allResponse = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/blogs`);
	const allBlogs = await allResponse.json();
	if (!allResponse.ok) {
		throw new Error(`Error: ${allBlogs.statusText}`);
	}

	// ページネーション
	const allSlugs = allBlogs.metadatas.map((blog) => blog.slug);
	const currentIndex = allSlugs.indexOf(slug);
	const nextSlug = currentIndex > 0 ? allSlugs[currentIndex - 1] : null;
	const prevSlug = currentIndex < allSlugs.length - 1 ? allSlugs[currentIndex + 1] : null;

	return {
		props: {
			content: singleData,
			allBlogs: allBlogs,
			prevSlug: prevSlug,
			nextSlug: nextSlug,
		},
	};
}

export default ArticlePage;
