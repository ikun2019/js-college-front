import React from 'react';

const SidebarCourse = ({ headings }) => {
	return (
		<aside className="w-full lg:w-1/4 px-6 mb-12 lg:mb-0 mt-6 lg:mt-0">
			<div className="bg-white p-6 rounded-lg shadow-lg mb-6">
				{headings.map((heading, index) => (
					<span
						key={index}
						className={`block ${
							heading.level === 2
								? 'text-md font-semibold mb-1'
								: heading.level === 3
								? 'ml-3 font-semibold mb-1'
								: ''
						}`}
					>
						{heading.text}
					</span>
				))}
			</div>
		</aside>
	);
};

export default SidebarCourse;
