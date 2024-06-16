import React from 'react';
import Image from 'next/image';

import PaginatedArticles from '@/components/blogs/PaginatedArticles';
import BreadcrumbComponent from '@/components/common/BreadcrumbComponent';

const BlogsPage = ({ metas }) => {
	const breadcrumbs = [
		{ label: 'Home', href: '/' },
		{ label: 'blogs', href: '/blogs' },
	];
	return (
		<>
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
				<div className="flex content-center">
					<section className="container mt-6 mx-auto">
						<BreadcrumbComponent breadcrumbs={breadcrumbs} />
						<h2 className="font-bold text-2xl text-left mt-6">Latest Strories</h2>
						<PaginatedArticles metas={metas} />
					</section>
				</div>
			</main>
		</>
	);
};

export async function getServerSideProps() {
	try {
		const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/blogs`);
		const data = await response.json();
		return {
			props: {
				metas: data,
			},
		};
	} catch (err) {
		console.error(err);
	}
}

export default BlogsPage;
