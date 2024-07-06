import React from 'react';
import Head from 'next/head';
import Link from 'next/link';
import Sidebar from '@/components/learnings/Sidebar';

// ライブラリのインポート
import ReactMarkdown from 'react-markdown';

const index = ({ parentMetadata, childMetadatas }) => {
	console.log('Learnings Slug Page');
	console.log('parentMetadata =>', parentMetadata);
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
						<div className="bg-white p-6 rounded-lg shadow-lg">
							<h1 className="text-3xl font-bold mb-6 font-serif">{parentMetadata.title}</h1>
							<ReactMarkdown
								children={parentMetadata.content}
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
							<ul>
								{childMetadatas.map((item, index) => (
									<li key={index} className="mb-3">
										<div>
											<Link
												href={`/learnings/${parentMetadata.slug}/${item.slug}`}
												className="hover:underline"
											>
												<h2 className="text-xl font-bold mb-2">{item.title}</h2>
											</Link>
											<p className="ml-6">{item.description}</p>
										</div>
									</li>
								))}
							</ul>
						</div>
					</div>
				</section>
			</div>
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
		console.log('data =>', data.metadata.title);

		return {
			props: {
				parentMetadata: data.metadata,
				childMetadatas: data.nestedMetadatas.reverse(),
			},
		};
	} catch (error) {
		return {
			props: {
				parentMetadata: null,
				childMetadatas: [],
			},
		};
	}
}

export default index;
