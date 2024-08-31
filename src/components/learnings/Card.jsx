import Image from 'next/image';
import Link from 'next/link';
import React from 'react';
import useImageUrl from '@/hooks/useImageurl';

const Card = ({ meta }) => {
	// const { imageUrl, error } = useImageUrl(meta.image_url);

	// if (error) return <div>Failed to load image</div>;
	// if (!imageUrl) return <div>Loading...</div>;

	return (
		<>
			<article className="h-full">
				<Link href={`/learnings/${meta.slug}`}>
					<div className="bg-white p-4 rounded-lg shadow-lg h-full flex flex-col">
						<div className="relative">
							<Image
								src={meta.image_url}
								alt={meta.image_name}
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
							<hr />
							<ul className="mt-3">
								{meta.tags.map((tag, index) => (
									<li key={index} className="inline-block bg-gray-200 px-2 py-1 rounded-md mr-3">
										<span>{`# ${tag}`}</span>
									</li>
								))}
							</ul>
						</div>
					</div>
				</Link>
			</article>
		</>
	);
};

export default Card;
