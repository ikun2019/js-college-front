import React from 'react';
import Head from 'next/head';
import fs from 'fs';
import path from 'path';

// ライブラリのインポート
import ReactMarkdown from 'react-markdown';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { dracula } from 'react-syntax-highlighter/dist/cjs/styles/prism';

// コンポーネントのインポート
import SinglePagenationComponent from '@/components/common/SinglePaginationComponent';
import SidebarCourse from '@/components/learnings/SidebarCourse';

const LearningContent = ({ slug, metadata, markdown, prevSlug, nextSlug, headings }) => {
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
							<h1 className="text-2xl font-bold mb-2 mt-6">{metadata.title}</h1>
							<ReactMarkdown
								children={markdown.parent}
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
							<button type="submit">complete</button>
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

export async function getStaticPaths() {
	const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/learnings`);
	const learnings = await response.json();

	let paths = [];
	let slugData = {};

	for (const learning of learnings.metadatas) {
		const slug = learning.slug;
		const childResponse = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/learnings/${slug}`);
		const childLearnings = await childResponse.json();
		slugData[slug] = childLearnings.nestedMetadatas;
		if (childLearnings.nestedMetadatas && childLearnings.nestedMetadatas.length > 0) {
			for (const child of childLearnings.nestedMetadatas) {
				paths.push({ params: { slug: slug, childSlug: child.slug } });
			}
		}
	}

	fs.writeFileSync(path.join(process.cwd(), 'slugData.json'), JSON.stringify(slugData));

	return {
		paths: paths,
		fallback: false,
	};
}

export async function getStaticProps(context) {
	const { slug, childSlug } = context.params;

	const slugDataPath = path.join(process.cwd(), 'slugData.json');
	const slugData = JSON.parse(fs.readFileSync(slugDataPath, 'utf8'));

	const childLearnings = slugData[slug];
	if (!childLearnings) {
		throw new Error(`No data found for slug: ${slug}`);
	}

	const childResponse = await fetch(
		`${process.env.NEXT_PUBLIC_API_URL}/learnings/${slug}/${childSlug}`
	);
	if (!childResponse.ok) {
		throw new Error(`No data found for childSlug: ${childSlug}`);
	}
	const childCourse = await childResponse.json();

	console.log('childCourse =>', childCourse);

	const allChildSlugs = childLearnings.map((item) => item.slug).reverse();
	const currentIndex = allChildSlugs.indexOf(childSlug);
	const prevSlug = currentIndex > 0 ? allChildSlugs[currentIndex - 1] : null;
	const nextSlug = currentIndex < allChildSlugs.length - 1 ? allChildSlugs[currentIndex + 1] : null;

	return {
		props: {
			metadata: childCourse.metadata,
			markdown: childCourse.markdown,
			headings: childCourse.headings,
			prevSlug,
			nextSlug,
			slug,
		},
	};
}

export default LearningContent;
