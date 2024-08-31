import React from 'react';
import Link from 'next/link';

const SidebarCourse = ({ headings }) => {
	const headingsIndex = (text) => {
		return headings.findIndex((heading) => heading.text === text);
	};

	return (
		<aside className="w-full lg:w-1/4 px-6 mb-12 lg:mb-0 mt-6 lg:mt-0 lg:fixed lg:right-0 lg:h-screen lg:overflow-y-auto">
			<div className="bg-white p-6 rounded-lg shadow-lg mb-6">
				{headings
					.filter((heading) => heading.level === 2 || heading.level === 3)
					.map((heading) => {
						const index = headingsIndex(heading.text.toString());
						const id = `headings-${index}`;
						return (
							<Link href={`#${id}`} className="hover:underline" key={index}>
								<span
									className={`block ${
										heading.level === 2
											? 'text-md font-semibold mb-1'
											: heading.level === 3
											? 'ml-3 mb-1'
											: ''
									}`}
								>
									{heading.text}
								</span>
							</Link>
						);
					})}
			</div>
		</aside>
	);
};

export default SidebarCourse;
