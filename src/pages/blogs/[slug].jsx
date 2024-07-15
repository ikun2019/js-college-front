import React from 'react';
import Head from 'next/head';

// ライブラリのインポート
import ReactMarkdown from 'react-markdown';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { dracula } from 'react-syntax-highlighter/dist/cjs/styles/prism';

// コンポーネントのインポート
import Sidebar from '../../components/blogs/Sidebar';
import BreadcrumbComponent from '../../components/common/BreadcrumbComponent';
import SinglePagenationComponent from '../../components/common/SinglePaginationComponent';

const ArticlePage = ({ content, allBlogs, prevSlug, nextSlug }) => {
	console.log('ArticlePage =>', allBlogs);
	console.log('content =>', content);
	const breadcrumbs = [
		{ label: 'Home', href: '/' },
		{ label: 'blogs', href: '/blogs' },
		{ label: content.metadata.slug, href: `/${content.metadata.slug}` },
	];

	return (
		<>
			<Head>
				<title>{`${content.metadata.title} | JS College`}</title>
				<meta name="description" content={content.metadata.description} />
				<meta name="robots" content="index,follow" />
			</Head>
			<div className="container mx-auto px-6 py-8">
				<section className="flex flex-wrap -mx-6">
					{/* <!-- Blog Post --> */}
					<div className="w-full lg:w-3/4 px-6">
						<div className="bg-white p-6 rounded-lg shadow-lg">
							{content.metadata.image?.file?.url && (
								<img
									src={content.metadata.image.file.url}
									alt="Blog image"
									className="w-full h-64 object-cover rounded-t-lg mb-4"
								/>
							)}
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

export async function getStaticPaths() {
	const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/blogs`);
	const blogs = await response.json();
	const slugs = blogs.metadatas.map((blog) => blog.slug);
	const params = slugs.map((slug) => ({ params: { slug: slug } }));
	return {
		paths: params,
		fallback: false,
	};
}

export async function getStaticProps(context) {
	try {
		const { slug } = context.params;
		const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/blogs/${slug}`);

		if (!response.ok) {
			throw new Error(`${response.statusText}`);
		}
		const data = await response.json();

		console.log('data =>', data);

		const allBlogsResponse = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/blogs`);
		if (!allBlogsResponse.ok) {
			throw new Error(`Error: ${allBlogsResponse.statusText}`);
		}
		const allBlogs = await allBlogsResponse.json();
		const allSlugs = allBlogs.metadatas.map((blog) => blog.slug);
		const currentIndex = allSlugs.indexOf(slug);
		const nextSlug = currentIndex > 0 ? allSlugs[currentIndex - 1] : null;
		const prevSlug = currentIndex < allSlugs.length - 1 ? allSlugs[currentIndex + 1] : null;
		return {
			props: {
				content: data,
				allBlogs,
				prevSlug,
				nextSlug,
			},
			revalidate: 600,
		};
	} catch (error) {
		return {
			props: {
				content: null,
				allBlogs: [],
				prevSlug: null,
				nextSlug: null,
				error: error.message,
			},
		};
	}
}

export default ArticlePage;
