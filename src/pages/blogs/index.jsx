import React, { useState } from 'react';
import Image from 'next/image';
import Head from 'next/head';

import PaginatedArticles from '@/components/blogs/PaginatedArticles';
import BreadcrumbComponent from '@/components/common/BreadcrumbComponent';
import Sidebar from '@/components/common/Sidebar';
import PaginationComponent from '@/components/blogs/PaginationComponent';

const BlogsPage = ({ metas }) => {
	const breadcrumbs = [
		{ label: 'Home', href: '/' },
		{ label: 'blogs', href: '/blogs' },
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
			<main>
				<section className="relative">
					<Image
						src="/hero.jpg"
						alt="hero画像"
						width={1000}
						height={500}
						layout="responsive"
						className="max-h-72"
					/>
					<div className="absolute inset-0 h-full bg-black bg-opacity-40"></div>
					<div className="absolute inset-0 h-full flex items-center justify-center">
						<div>
							<h1 className="text-white text-3xl font-bold">
								Engineering blog for individual developers
							</h1>
						</div>
					</div>
				</section>
				<section className="container mt-6">
					<div className="flex flex-wrap -mx-6">
						<div className="w-full lg:w-2/3 px-6 mb-12">
							<BreadcrumbComponent breadcrumbs={breadcrumbs} />
							<h2 className="font-bold text-2xl text-left mt-6">Latest Strories</h2>
							<PaginatedArticles metas={paginatedMetas} />
							<PaginationComponent
								metas={metas}
								articlePerPage={articlePerPage}
								onPagenatedMetasChange={handlePaginatedMetasChange}
							/>
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

export async function getServerSideProps() {
	try {
		console.log(process.env.NEXT_PUBLIC_API_URL);
		const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/blogs`);
		if (!response.ok) {
			throw new Error(`${response.statusText}`);
		}
		const data = await response.json();
		return {
			props: {
				metas: data,
			},
		};
	} catch (err) {
		console.error(err);
		return {
			props: {
				metas: [],
			},
		};
	}
}

export default BlogsPage;
