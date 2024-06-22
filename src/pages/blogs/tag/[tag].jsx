import React from 'react';
import Head from 'next/head';
import fetch from 'node-fetch';

import BreadcrumbComponent from '@/components/common/BreadcrumbComponent';
import PaginatedArticles from '@/components/blogs/PaginatedArticles';
import Sidebar from '@/components/common/Sidebar';

const TagPage = ({ metas, filteredMetas, tag }) => {
	const breadcrumbs = [
		{ label: 'Home', href: '/' },
		{ label: 'blogs', href: '/blogs' },
		{ label: 'tag', href: '/tag' },
		{ label: tag, href: `/${tag}` },
	];
	return (
		<>
			<Head>
				<meta name="robots" content="index,follow" />
			</Head>
			<main className="mt-6">
				<section className="container">
					<div className="flex flex-wrap -mx-6">
						<div className="w-full lg:w-2/3 px-6 mb-12">
							<BreadcrumbComponent breadcrumbs={breadcrumbs} />
							<h2 className="font-bold text-2xl text-left mt-6">Latest Strories</h2>
							<PaginatedArticles metas={filteredMetas} />
						</div>
						<aside className="w-full lg:w-1/3 lg:mt-6">
							<Sidebar metas={metas} />
						</aside>
					</div>
				</section>
			</main>
		</>
	);
};

export async function getServerSideProps(context) {
	const { tag } = context.params;
	try {
		const [tagResponse, allResponse] = await Promise.all([
			fetch(`${process.env.NEXT_PUBLIC_API_URL}/blogs/tag/${tag}`),
			fetch(`${process.env.NEXT_PUBLIC_API_URL}/blogs`),
		]);
		const tagData = await tagResponse.json();
		const allData = await allResponse.json();
		return {
			props: {
				metas: allData,
				filteredMetas: tagData,
				tag: tag,
			},
		};
	} catch (err) {
		console.error(err);
		return res.status(500).json({ message: 'error' });
	}
}

export default TagPage;
