import React from 'react';
import Head from 'next/head';
import Link from 'next/link';

const index = ({ parentMetadata, childMetadatas }) => {
	console.log('Learnings Slug Page');

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

		return {
			props: {
				parentMetadata: data.metadata,
				childMetadatas: data.nestedMetadatas[0].items.reverse(),
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
