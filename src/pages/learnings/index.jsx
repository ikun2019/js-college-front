import React, { useState } from 'react';
import Head from 'next/head';
import Image from 'next/image';
import dynamic from 'next/dynamic';

// コンポーネントのインポート
import BreadcrumbComponent from '../../components/common/BreadcrumbComponent';
import Cards from '../../components/learnings/Cards';
const Sidebar = dynamic(() => import('@/components/learnings/Sidebar'), { ssr: false });
import PaginationComponent from '../../components/common/PaginationComponent';

const LearningPage = ({ metas }) => {
	const breadcrumbs = [
		{ label: 'Home', href: '/' },
		{ label: 'Learning', href: '/learnings' },
	];

	const [paginatedMetas, setPaginatedMetas] = useState([]);

	const articlePerPage = 10;
	const handlePaginatedMetasChange = (newPaginatedMetas) => {
		setPaginatedMetas(newPaginatedMetas);
	};

	return (
		<>
			<Head>
				<meta name="robots" content="noindex,nofollow" />
			</Head>
			<div className="container mx-auto px-6 py-8">
				{/* ヒーローセクション */}
				<section className="mb-12">
					<div className="relative">
						<Image
							src="/learning_hero.WEBP"
							alt="LearningページのHero画像"
							width={1200}
							height={400}
							className="w-full h-64 object-cover rounded-lg"
						/>
						<div className="absolute bottom-0 left-0 p-6 bg-gray-900 bg-opacity-50 text-white rounded-b-lg w-full">
							<h1 className="text-4xl font-bold font-serif">PROGRAMMING LEARNING</h1>
							<p>From development to operation...</p>
						</div>
					</div>
				</section>

				{/* パンくずリスト */}
				<BreadcrumbComponent breadcrumbs={breadcrumbs} />

				<section className="flex flex-wrap -mx-6">
					{/* <!-- Experiences Section --> */}
					<div className="w-full lg:w-3/4 px-6">
						<div className="flex justify-between items-center mb-4">
							<div>
								<h2 className="font-bold text-left">Courses</h2>
							</div>
						</div>

						{/* <!-- Experience Card --> */}
						<Cards metas={paginatedMetas} />

						<PaginationComponent
							metas={metas}
							articlePerPage={articlePerPage}
							onPagenatedMetasChange={handlePaginatedMetasChange}
						/>
					</div>

					{/* Sidebar */}
					<Sidebar className="lg:mt-10" />
				</section>
			</div>
		</>
	);
};

export async function getServerSideProps() {
	try {
		const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/learnings`, {
			method: 'GET',
			headers: {
				'Content-Type': 'application/json',
			},
		});
		const data = await response.json();
		console.log('data =>', data);
		return {
			props: {
				metas: data.metadatas || [],
			},
		};
	} catch (error) {
		console.error(error);
		return {
			props: {
				metas: [],
			},
		};
	}
}

export default LearningPage;
