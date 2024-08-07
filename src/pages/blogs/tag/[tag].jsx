import React, { useState } from 'react';
import Head from 'next/head';
import fetch from 'node-fetch';

import BreadcrumbComponent from '../../../components/common/BreadcrumbComponent';
import Cards from '../../../components/blogs/Cards';
import PaginationComponent from '../../../components/common/PaginationComponent';
import Sidebar from '../../../components/blogs/Sidebar';

const TagPage = ({ metas, filteredMetas, tag }) => {
	const breadcrumbs = [
		{ label: 'Home', href: '/' },
		{ label: 'blogs', href: '/blogs' },
		{ label: tag, href: `/blogs/tag/${tag}` },
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
			<div className="container mx-auto px-6 py-8">
				{/* パンくずリスト */}
				<BreadcrumbComponent breadcrumbs={breadcrumbs} />
				<section className="flex flex-wrap -mx-6">
					<div className="w-full lg:w-3/4 px-6">
						<div class="flex justify-between items-center mb-4">
							<div>
								<h2 className="font-bold text-left mt-6">Tags Page</h2>
							</div>
						</div>
						<Cards metas={paginatedMetas} />
						<PaginationComponent
							metas={filteredMetas}
							articlePerPage={articlePerPage}
							onPagenatedMetasChange={handlePaginatedMetasChange}
						/>
					</div>
					<Sidebar metas={metas.metadatas} />
				</section>
			</div>
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
