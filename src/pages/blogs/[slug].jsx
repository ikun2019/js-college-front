import React from 'react';
import Head from 'next/head';

// ライブラリのインポート
import ReactMarkdown from 'react-markdown';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { atomDark } from 'react-syntax-highlighter/dist/cjs/styles/prism';

// コンポーネントのインポート
import Sidebar from '@/components/common/Sidebar';
import BreadcrumbComponent from '@/components/common/BreadcrumbComponent';
import SinglePagePagination from '@/components/blogs/SinglePagePagination';

const ArticlePage = ({ content }) => {
	console.log('ArticlePage =>', content);
	const breadcrumbs = [
		{ label: 'Home', href: '/' },
		{ label: 'blogs', href: '/blogs' },
		{ label: content.metadata.slug, href: `/${content.metadata.slug}` },
	];
	return (
		<>
			<Head>
				<title>{content.metadata.title}</title>
				<meta name="description" content={content.metadata.description} />
			</Head>
			<main className="container mx-auto px-6 py-8">
				<div className="flex flex-wrap -mx-6">
					{/* <!-- Blog Post --> */}
					<div className="w-full lg:w-2/3 px-6 mb-12">
						<div className="bg-white p-6 rounded-lg shadow-lg">
							<img
								src="https://via.placeholder.com/800x400"
								alt="Blog image"
								className="w-full h-64 object-cover rounded-t-lg mb-4"
							/>
							<BreadcrumbComponent breadcrumbs={breadcrumbs} />
							<h1 className="text-2xl font-bold mb-2 mt-6">{content.metadata.title}</h1>
							<p className="text-gray-700 mb-4 text-right">{content.metadata.date}</p>
							<div className="space-x-2 mb-16">
								{content.metadata.tags &&
									content.metadata.tags.map((tag) => (
										<span key={tag} className="px-4 py-2 bg-gray-800 text-white rounded-full">
											{tag}
										</span>
									))}
							</div>
							<ReactMarkdown
								children={content.markdown.parent}
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
											<h3 className="text-xl border-l-4 border-gray-500 pl-4 mb-4">
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
												style={atomDark}
											/>
										) : (
											<code className={className}>{children}</code>
										);
									},
								}}
								className="text-gray-700 mb-4"
							></ReactMarkdown>
							{/* <blockquote className="italic border-l-4 pl-4 border-gray-500 mb-4">
								Class aptent taciti sociosqu...
							</blockquote>
							<p className="text-gray-700 mb-4">
								Proin gravida nibh vel velit auctor aliquet. Aenean sollicitudin...
							</p> */}
							<SinglePagePagination />
						</div>
					</div>
					<Sidebar />
				</div>
			</main>
		</>
	);
};

export async function getStaticPaths() {
	const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/blogs`);
	const blogs = await response.json();
	const slugs = blogs.map((blog) => blog.slug);
	const params = slugs.map((slug) => ({ params: { slug: slug } }));
	return {
		paths: params,
		fallback: false,
	};
}

export async function getStaticProps(context) {
	const { slug } = context.params;
	const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/blogs/${slug}`);
	const data = await response.json();
	return {
		props: {
			content: data,
		},
		revalidate: 600,
	};
}

export default ArticlePage;