import React from 'react';
import Link from 'next/link';

const Sidebar = ({ metas }) => {
	const uniqueTags = metas.reduce((acc, meta) => [...acc, ...meta.tags], []);
	return (
		<>
			<aside className="w-full lg:w-1/4 px-6 mb-12 lg:mb-0 mt-6 lg:mt-0">
				<div className="bg-white p-6 rounded-lg shadow-lg mb-6">
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
