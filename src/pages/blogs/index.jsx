import React from 'react';
import Image from 'next/image';

import PaginatedArticles from '@/components/blogs/PaginatedArticles';
import BreadcrumbComponent from '@/components/common/BreadcrumbComponent';
import Sidebar from '@/components/common/Sidebar';

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
				<section className="container">
					<div className="flex flex-wrap -mx-6">
						<div className="w-full lg:w-2/3 px-6 mb-12">
							<BreadcrumbComponent breadcrumbs={breadcrumbs} />
							<h2 className="font-bold text-2xl text-left mt-6">Latest Strories</h2>
							<PaginatedArticles metas={metas} />
						</div>
						<aside className="w-full lg:w-1/3 lg:mt-6">
							<Sidebar />
						</aside>
					</div>
				</section>
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
