import React from 'react';
import Head from 'next/head';
import Link from 'next/link';
import Sidebar from '../../../components/learnings/Sidebar';

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
						<div className="bg-white p-8 rounded-lg shadow-lg">
							<h1 className="text-4xl font-bold mb-6 text-gray-800">{parentMetadata.title}</h1>
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
												className="cursor-pointer"
											>
												<h2 className="text-xl font-bold mb-2 text-gray-700">{item.title}</h2>
												<p className="text-gray-600">{item.description}</p>
											</Link>
										</div>
									</li>
								))}
							</ul>
						</div>
					</div>
					{/* Sidebar */}
					{/* <div className="w-full lg:w-1/4 px-6 mt-8 lg:mt-0">
						<Sidebar />
					</div> */}
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
