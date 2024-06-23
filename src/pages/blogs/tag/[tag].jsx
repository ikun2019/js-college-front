import React, { useState } from 'react';
import Head from 'next/head';
import fetch from 'node-fetch';

import BreadcrumbComponent from '@/components/common/BreadcrumbComponent';
import PaginatedArticles from '@/components/blogs/PaginatedArticles';
import PaginationComponent from '@/components/blogs/PaginationComponent';
import Sidebar from '@/components/common/Sidebar';

const TagPage = ({ metas, filteredMetas, tag }) => {
	const breadcrumbs = [
		{ label: 'Home', href: '/' },
		{ label: 'blogs', href: '/blogs' },
		{ label: 'tag', href: '/tag' },
		{ label: tag, href: `/${tag}` },
	];

	const [paginatedMetas, setPaginatedMetas] = useState([]);

	const articlePerPage = 10;
	const handlePaginatedMetasChange = (newPaginatedMetas) => {
		setPaginatedMetas(newPaginatedMetas);
	};

	return (
		<>
			<Head>
				<meta name="robots" content="index,follow" />
			</Head>
			<main className="container mx-auto px-6 py-8">
				{/* パンくずリスト */}
				<BreadcrumbComponent breadcrumbs={breadcrumbs} />
				<section className="flex flex-wrap -mx-6">
					<div className="w-full lg:w-3/4 px-6">
						<div class="flex justify-between items-center mb-4">
							<div>
								<h2 className="font-bold text-left mt-6">Tags Page</h2>
							</div>
						</div>
						<PaginatedArticles metas={paginatedMetas} />
						<PaginationComponent
							metas={filteredMetas}
							articlePerPage={articlePerPage}
							onPagenatedMetasChange={handlePaginatedMetasChange}
						/>
					</div>
					<Sidebar metas={metas} />
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
