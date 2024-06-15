import React from 'react';
import Link from 'next/link';
import Image from 'next/image';

const Article = ({ meta }) => {
	console.log('Article =>', meta);
	return (
		<>
			<article className="h-full">
				<Link href={`/blogs/${meta.slug}`} className="h-full flex flex-col">
					<div class="bg-white p-4 rounded-lg shadow-lg h-full flex flex-col">
						<div class="relative">
							<Image
								src="https://via.placeholder.com/400x300"
								alt={meta.title}
								width={400}
								height={300}
								class="w-full h-40 object-cover rounded-t-lg"
							/>
							{/* <span class="absolute top-2 left-2 bg-blue-500 text-white text-sm px-2 py-1 rounded">
								10% Cashback
							</span> */}
						</div>
						<div className="p-4 flex-grow">
							<h3 className="text-lg font-bold mb-2">{meta.title}</h3>
							{/* <p className="text-gray-700 mb-2">1,724 Reviews</p> */}
							{/* <p className="text-gray-700 mb-2">
              <span className="line-through">$150</span> <span className="font-bold">$130</span>
            </p> */}
							<p className="text-gray-700 mb-4">{meta.description}</p>
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

export default Article;
