import React from 'react';
import Link from 'next/link';
import Image from 'next/image';

const Card = ({ meta }) => {
	const formatDate = (metaDate) => {
		const date = new Date(metaDate);
		const formatedDate = `${date.getFullYear()}年${date.getMonth() + 1}月${date.getDate()}日`;
		return formatedDate;
	};

	console.log('meta =>', meta);

	return (
		<>
			<article className="h-full">
				<Link href={`/blogs/${meta.Slug?.rich_text[0].plain_text}`}>
					<div className="bg-white p-4 rounded-lg shadow-lg h-full flex flex-col">
						<div className="relative">
							<Image
								src={meta.Image?.files[0].file.url}
								alt={meta.Image?.files[0].name}
								width={400}
								height={300}
								className="w-full h-40 object-cover rounded-t-lg"
							/>
							{/* <span class="absolute top-2 left-2 bg-blue-500 text-white text-sm px-2 py-1 rounded">
								10% Cashback
							</span> */}
						</div>
						<div className="p-4 flex-grow">
							<h3 className="font-bold mb-2">{meta.Title?.title[0].plain_text}</h3>
							{/* <p className="text-gray-700 mb-2">1,724 Reviews</p> */}
							{/* <p className="text-gray-700 mb-2">
              <span className="line-through">$150</span> <span className="font-bold">$130</span>
            </p> */}
							<div className="space-x-2 mb-3">
								{meta.Tags &&
									meta.Tags?.multi_select.map((tag) => (
										<span
											key={tag}
											className="px-4 py-2 bg-gray-800 text-white rounded-full text-sm"
										>
											{tag.name}
										</span>
									))}
							</div>
							<p className="text-gray-700 mb-4 text-sm">
								{meta.Description?.rich_text[0].plain_text}
							</p>
						</div>
						<div className="mt-auto">
							<span className="text-gray-500">{formatDate(meta.Date?.date.start)}</span>
						</div>
					</div>
				</Link>
			</article>
		</>
	);
};

export default Card;
