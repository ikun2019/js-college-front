import React, { useEffect, useState } from 'react';
import Link from 'next/link';

const Sidebar = ({ className }) => {
	const [uniqueTags, setUniqueTags] = useState([]);

	useEffect(() => {
		const fetchTags = async () => {
			const response = await fetch(`${process.env.NEXT_PUBLIC_API_CLIENT_URL}/learnings`, {
				method: 'GET',
				headers: {
					'Content-Type': 'application/json',
				},
			});
			const data = await response.json();
			const tags = [...new Set(data.metadatas.flatMap((meta) => meta.tags))];
			setUniqueTags(tags);
		};
		fetchTags();
	}, []);

	return (
		<>
			<aside
				className={`mx-6 w-full lg:w-1/4 px-6 mb-12 lg:mb-0 rounded-lg shadow-lg mt-6 lg:mt-0 lg:mr-4 lg:fixed lg:right-0 ${
					className || ''
				}`}
			>
				<div>
					<span className="text-2xl font-semibold mb-4 block font-sans">Filters</span>
					<div>
						<span className="text-xl font-semibold mb-2 block">Tags</span>
						<ul>
							{uniqueTags.map((uniqueTag, index) => (
								<li key={index} className="mb-2">
									<Link
										href={`/blogs/tag/${uniqueTag.toLowerCase()}`}
										className="text-gray-700 hover:underline"
									>
										{uniqueTag}
									</Link>
								</li>
							))}
						</ul>
					</div>
				</div>
			</aside>
		</>
	);
};

export default Sidebar;
