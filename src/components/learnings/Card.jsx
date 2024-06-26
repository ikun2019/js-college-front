import Image from 'next/image';
import Link from 'next/link';
import React from 'react';

const Card = ({ meta }) => {
	return (
		<>
			<article className="h-full">
				<Link href={`/learnings/${meta.slug}`}>
					<div className="bg-white p-4 rounded-lg shadow-lg h-full flex flex-col">
						<div className="relative">
							<Image
								src={meta.image.file.url}
								alt={meta.title}
								width={400}
								height={300}
								className="w-full h-40 object-cover rounded-t-lg"
							/>
						</div>
						<div className="p-4">
							<h3 className="font-bold mb-2">{meta.title}</h3>
							{/* <p className="text-gray-700 mb-2">1,724 Reviews</p> */}
							{/* <p className="text-gray-700 mb-2">
              <span className="line-through">$150</span> <span className="font-bold">$130</span>
            </p> */}
							<div className="space-x-2 mb-3">
								<p className="text-gray-700 mb-4 test-sm">{meta.description}</p>
							</div>
						</div>
					</div>
				</Link>
			</article>
		</>
		// <div class="bg-white p-4 rounded-lg shadow-lg">
		// 	<div class="relative">
		// 		<img
		// 			src="https://via.placeholder.com/400x300"
		// 			alt="Experience Image"
		// 			class="w-full h-40 object-cover rounded-t-lg"
		// 		/>
		// 		<span class="absolute top-2 left-2 bg-blue-500 text-white text-sm px-2 py-1 rounded">
		// 			10% Cashback
		// 		</span>
		// 	</div>
		// 	<div class="p-4">
		// 		<h3 class="text-lg font-bold mb-2">Best of Maui Tour</h3>
		// 		<p class="text-gray-700 mb-2">1,724 Reviews</p>
		// 		<p class="text-gray-700 mb-2">
		// 			<span class="line-through">$150</span> <span class="font-bold">$130</span>
		// 		</p>
		// 		<p class="text-gray-700 mb-4">save upto 50% off</p>
		// 		<div class="flex items-center justify-between">
		// 			<p class="text-gray-700">56 people viewing now</p>
		// 			<button class="text-red-500">
		// 				<svg
		// 					xmlns="http://www.w3.org/2000/svg"
		// 					fill="none"
		// 					viewBox="0 0 24 24"
		// 					stroke="currentColor"
		// 					class="w-6 h-6"
		// 				>
		// 					<path
		// 						stroke-linecap="round"
		// 						stroke-linejoin="round"
		// 						stroke-width="2"
		// 						d="M5 13l4 4L19 7"
		// 					/>
		// 				</svg>
		// 			</button>
		// 		</div>
		// 	</div>
		// </div
	);
};

export default Card;
