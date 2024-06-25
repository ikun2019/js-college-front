import React from 'react';
import Head from 'next/head';
import Image from 'next/image';

// コンポーネントのインポート
import BreadcrumbComponent from '@/components/common/BreadcrumbComponent';
import Card from '@/components/learnings/Card';

const LearningPage = () => {
	const breadcrumbs = [
		{ label: 'Home', href: '/' },
		{ label: 'Learning', href: '/learning' },
	];

	return (
		<>
			<Head>
				<meta name="robots" content="noindex,nofollow" />
			</Head>
			<main class="container mx-auto px-6 py-8">
				{/* ヒーローセクション */}
				<section class="mb-12">
					<div class="relative">
						<Image
							src="/learning_hero.webp"
							width={1200}
							height={400}
							className="w-full h-64 object-cover rounded-lg"
						/>
						<div class="absolute bottom-0 left-0 p-6 bg-gray-900 bg-opacity-50 text-white rounded-b-lg w-full">
							<h1 class="text-4xl font-bold font-serif">PROGRAMMING LEARNING</h1>
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

						<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
							{/* <!-- Experience Card --> */}
							<Card />

							{/* <!-- Duplicate above block for more experience cards --> */}
						</div>
					</div>

					{/* Sidebar */}
					<aside className="w-full lg:w-1/4 px-6 mb-12 lg:mb-0">
						<div className="bg-white p-6 rounded-lg shadow-lg mb-6">
							<h2 className="text-2xl font-bold mb-4">Filters</h2>
							<div>
								<h3 className="text-xl font-bold mb-2">Collections</h3>
								<ul>
									<li className="mb-2">
										<a href="#" className="text-gray-700">
											Broadway (23)
										</a>
									</li>
									<li className="mb-2">
										<a href="#" className="text-gray-700">
											Water Adventures (120)
										</a>
									</li>
									<li className="mb-2">
										<a href="#" className="text-gray-700">
											Adventures (67)
										</a>
									</li>
									<li className="mb-2">
										<a href="#" className="text-gray-700">
											Sport Shows (33)
										</a>
									</li>
									<li>
										<a href="#" className="text-gray-700">
											+23 more
										</a>
									</li>
								</ul>
							</div>

							<div className="mt-6">
								<h3 className="text-xl font-bold mb-2">Price Range</h3>
								<div className="flex items-center justify-between">
									<span>$120</span>
									<span>$855</span>
								</div>
								<input type="range" min="120" max="855" className="w-full mt-2" />
							</div>

							<div className="mt-6">
								<h3 className="text-xl font-bold mb-2">Select Dates</h3>
								<input type="date" className="w-full border rounded-lg p-2" />
							</div>

							<div className="mt-6">
								<h3 className="text-xl font-bold mb-2">Event Time</h3>
								<div>
									<label className="flex items-center mb-2">
										<input type="checkbox" className="mr-2" />
										<span>Morning</span>
									</label>
									<label className="flex items-center mb-2">
										<input type="checkbox" class="mr-2" />
										<span>Afternoon</span>
									</label>
									<label class="flex items-center mb-2">
										<input type="checkbox" class="mr-2" />
										<span>Evening</span>
									</label>
									<label class="flex items-center mb-2">
										<input type="checkbox" class="mr-2" />
										<span>Night</span>
									</label>
								</div>
							</div>

							<div class="mt-6">
								<h3 class="text-xl font-bold mb-2">Duration</h3>
								<div>
									<label class="flex items-center mb-2">
										<input type="checkbox" class="mr-2" />
										<span>less than 1 hour</span>
									</label>
									<label class="flex items-center mb-2">
										<input type="checkbox" class="mr-2" />
										<span>1 - 2 hours</span>
									</label>
									<label class="flex items-center mb-2">
										<input type="checkbox" class="mr-2" />
										<span>2 - 4 hours</span>
									</label>
									<label class="flex items-center mb-2">
										<input type="checkbox" class="mr-2" />
										<span>more than 4 hours</span>
									</label>
								</div>
							</div>
						</div>
					</aside>
				</section>
			</main>
		</>
	);
};

export default LearningPage;
