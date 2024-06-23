import React from 'react';
import Head from 'next/head';
import Image from 'next/image';

// コンポーネントのインポート
import BreadcrumbComponent from '@/components/common/BreadcrumbComponent';

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
							src="/top_hero.webp"
							width={1200}
							height={400}
							className="w-full h-64 object-cover rounded-lg"
						/>
						<div class="absolute bottom-0 left-0 p-6 bg-gray-900 bg-opacity-50 text-white rounded-b-lg w-full">
							<h1 class="text-4xl font-bold">PROGRAMMING LEARNING</h1>
							<p>From development to operation...</p>
						</div>
					</div>
				</section>

				{/* パンくずリスト */}
				<BreadcrumbComponent breadcrumbs={breadcrumbs} />

				<section class="flex flex-wrap -mx-6">
					{/* <!-- Experiences Section --> */}
					<div class="w-full lg:w-3/4 px-6">
						<div class="flex justify-between items-center mb-4">
							<div>
								<h2 class="font-bold text-left">Courses</h2>
							</div>
						</div>

						<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
							{/* <!-- Experience Card --> */}
							<div class="bg-white p-4 rounded-lg shadow-lg">
								<div class="relative">
									<img
										src="https://via.placeholder.com/400x300"
										alt="Experience Image"
										class="w-full h-40 object-cover rounded-t-lg"
									/>
									<span class="absolute top-2 left-2 bg-blue-500 text-white text-sm px-2 py-1 rounded">
										10% Cashback
									</span>
								</div>
								<div class="p-4">
									<h3 class="text-lg font-bold mb-2">Best of Maui Tour</h3>
									<p class="text-gray-700 mb-2">1,724 Reviews</p>
									<p class="text-gray-700 mb-2">
										<span class="line-through">$150</span> <span class="font-bold">$130</span>
									</p>
									<p class="text-gray-700 mb-4">save upto 50% off</p>
									<div class="flex items-center justify-between">
										<p class="text-gray-700">56 people viewing now</p>
										<button class="text-red-500">
											<svg
												xmlns="http://www.w3.org/2000/svg"
												fill="none"
												viewBox="0 0 24 24"
												stroke="currentColor"
												class="w-6 h-6"
											>
												<path
													stroke-linecap="round"
													stroke-linejoin="round"
													stroke-width="2"
													d="M5 13l4 4L19 7"
												/>
											</svg>
										</button>
									</div>
								</div>
							</div>

							{/* <!-- Duplicate above block for more experience cards --> */}
						</div>
					</div>

					{/* Sidebar */}
					<aside class="w-full lg:w-1/4 px-6 mb-12 lg:mb-0">
						<div class="bg-white p-6 rounded-lg shadow-lg mb-6">
							<h2 class="text-2xl font-bold mb-4">Filters</h2>
							<div>
								<h3 class="text-xl font-bold mb-2">Collections</h3>
								<ul>
									<li class="mb-2">
										<a href="#" class="text-gray-700">
											Broadway (23)
										</a>
									</li>
									<li class="mb-2">
										<a href="#" class="text-gray-700">
											Water Adventures (120)
										</a>
									</li>
									<li class="mb-2">
										<a href="#" class="text-gray-700">
											Adventures (67)
										</a>
									</li>
									<li class="mb-2">
										<a href="#" class="text-gray-700">
											Sport Shows (33)
										</a>
									</li>
									<li>
										<a href="#" class="text-gray-700">
											+23 more
										</a>
									</li>
								</ul>
							</div>

							<div class="mt-6">
								<h3 class="text-xl font-bold mb-2">Price Range</h3>
								<div class="flex items-center justify-between">
									<span>$120</span>
									<span>$855</span>
								</div>
								<input type="range" min="120" max="855" class="w-full mt-2" />
							</div>

							<div class="mt-6">
								<h3 class="text-xl font-bold mb-2">Select Dates</h3>
								<input type="date" class="w-full border rounded-lg p-2" />
							</div>

							<div class="mt-6">
								<h3 class="text-xl font-bold mb-2">Event Time</h3>
								<div>
									<label class="flex items-center mb-2">
										<input type="checkbox" class="mr-2" />
										<span>Morning</span>
									</label>
									<label class="flex items-center mb-2">
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
