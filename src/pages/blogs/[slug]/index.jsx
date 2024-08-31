import React from 'react';
import Head from 'next/head';
import dynamic from 'next/dynamic';
import rehypeRaw from 'rehype-raw';
import remarkGfm from 'remark-gfm';

// ライブラリのインポート
import ReactMarkdown from 'react-markdown';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { dracula } from 'react-syntax-highlighter/dist/cjs/styles/prism';

// コンポーネントのインポート
const Sidebar = dynamic(() => import('@/components/blogs/Sidebar'), { ssr: false });
import BreadcrumbComponent from '@/components/common/BreadcrumbComponent';
import SinglePagenationComponent from '@/components/common/SinglePaginationComponent';
import Image from 'next/image';

const ArticlePage = ({ content, allBlogs, prevSlug, nextSlug }) => {
	const breadcrumbs = [
		{ label: 'Home', href: '/' },
		{ label: 'blogs', href: '/blogs' },
		{ label: content.metadata?.slug, href: `/blogs/${content.metadata?.slug}` },
	];

	const date = new Date(content.metadata.date);
	const year = date.getFullYear();
	const month = date.getMonth() + 1;
	const day = date.getDate();

	// const fetchImageSize = async (imageUrl) => {
	// 	const img = new Image();
	// 	img.src = imageUrl;

	// 	return new Promise((resolve) => {
	// 		img.onload = () => {
	// 			resolve({width: img.width, height: img.height});
	// 		};
	// 	})
	// };

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
							{content.metadata?.image_url && (
								<Image
									src={content.metadata?.image_url}
									alt="Blog image"
									width={800}
									height={600}
									className="w-full h-64 object-cover rounded-t-lg mb-4"
								/>
							)}
							<BreadcrumbComponent breadcrumbs={breadcrumbs} />
							<h1 className="text-2xl font-bold mb-2 mt-6">{content.metadata?.title}</h1>
							<p className="text-gray-700 mb-4 text-right">{`${year}年${month}月${day}日`}</p>
							<div className="space-x-2 mb-16">
								{content.metadata?.tags &&
									content.metadata?.tags.map((tag) => (
										<span key={tag} className="px-4 py-2 bg-gray-800 text-white rounded-full">
											{tag}
										</span>
									))}
							</div>
							<ReactMarkdown
								children={content.markdown}
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
											// return renderImage(node.children[0]);
											const image = node.children[0];
											return (
												<div className="relative w-full">
													<img src={image.properties.src} alt={image.properties.alt} />
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

	const [singleResponse, allResponse] = await Promise.all([
		await fetch(`${process.env.NEXT_PUBLIC_API_URL}/blogs/${slug}`, {
			method: 'GET',
			headers: {
				'Content-Type': 'application/json',
			},
		}),
		await fetch(`${process.env.NEXT_PUBLIC_API_URL}/blogs`, {
			method: 'GET',
			headers: {
				'Content-Type': 'application/json',
			},
		}),
	]);
	// 単一の記事を取得
	const singleData = await singleResponse.json();
	// 全ての記事を取得
	const allBlogs = await allResponse.json();

	if (!singleResponse.ok || !allResponse.ok) {
		throw new Error('Failed to fetch data');
	}

	// ページネーション
	const allSlugs = allBlogs.metadatas.map((blog) => blog.Slug?.rich_text[0].plain_text);
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
