import React from 'react';
import Link from 'next/link';
import Image from 'next/image';

const Card = ({ meta }) => {
	return (
		<>
			<article className="h-full">
				<Link href={`/blogs/${meta.slug}`}>
					<div className="bg-white p-4 rounded-lg shadow-lg h-full flex flex-col">
						<div className="relative">
							<Image
								src={meta.image_url}
								alt={meta.image_name}
								width={400}
								height={300}
								className="w-full h-40 object-cover rounded-t-lg"
							/>
							{/* <span class="absolute top-2 left-2 bg-blue-500 text-white text-sm px-2 py-1 rounded">
								10% Cashback
							</span> */}
						</div>
						<div className="p-4 flex-grow">
							<h3 className="font-bold mb-2">{meta.title}</h3>
							{/* <p className="text-gray-700 mb-2">1,724 Reviews</p> */}
							{/* <p className="text-gray-700 mb-2">
              <span className="line-through">$150</span> <span className="font-bold">$130</span>
            </p> */}
							<div className="space-x-2 mb-3">
								{meta.tags &&
									meta.tags.map((tag) => (
										<span
											key={tag}
											className="px-4 py-2 bg-gray-800 text-white rounded-full text-sm"
										>
											{tag}
										</span>
									))}
							</div>
							<p className="text-gray-700 mb-4 text-sm">{meta.description}</p>
						</div>
						<div className="mt-auto">
							<span className="text-gray-500">{meta.date}</span>
						</div>
					</div>
				</Link>
			</article>
		</>
	);
};

export default Card;
