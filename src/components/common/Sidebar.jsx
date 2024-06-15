import React from 'react';

const Sidebar = () => {
	return (
		<>
			{/* <!-- Sidebar --> */}
			<div className="w-full lg:w-1/3 px-6">
				{/* <!-- Categories --> */}
				<div className="bg-white p-6 rounded-lg shadow-lg mb-6">
					<h3 className="text-xl font-bold mb-4">Categories</h3>
					<ul>
						<li className="mb-2">
							<a href="#" className="text-gray-700">
								Appetizers
							</a>
						</li>
						<li className="mb-2">
							<a href="#" className="text-gray-700">
								Main Course
							</a>
						</li>
						<li className="mb-2">
							<a href="#" className="text-gray-700">
								Desserts
							</a>
						</li>
						<li className="mb-2">
							<a href="#" className="text-gray-700">
								Drinks
							</a>
						</li>
						<li>
							<a href="#" className="text-gray-700">
								Teas
							</a>
						</li>
					</ul>
				</div>

				{/* <!-- Search --> */}
				<div className="bg-white p-6 rounded-lg shadow-lg mb-6">
					<h3 className="text-xl font-bold mb-4">Search</h3>
					<div className="relative">
						<input
							type="text"
							className="w-full px-4 py-2 border rounded-lg"
							placeholder="Search..."
						/>
						<button className="absolute right-2 top-2 text-gray-500">
							<svg
								xmlns="http://www.w3.org/2000/svg"
								fill="none"
								viewBox="0 0 24 24"
								stroke="currentColor"
								className="w-5 h-5"
							>
								<path
									strokeLinecap="round"
									strokeLinejoin="round"
									strokeWidth="2"
									d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
								/>
							</svg>
						</button>
					</div>
				</div>

				{/* <!-- Top Posts --> */}
				<div className="bg-white p-6 rounded-lg shadow-lg mb-6">
					<h3 className="text-xl font-bold mb-4">Top Posts</h3>
					<ul>
						<li className="mb-2">
							<a href="#" className="text-gray-700">
								1. Aenean mattis tortor ac sapien congue molestie.
							</a>
						</li>
						<li className="mb-2">
							<a href="#" className="text-gray-700">
								2. Vestibulum atme ipsum primis in arcu faucibus.
							</a>
						</li>
						<li className="mb-2">
							<a href="#" className="text-gray-700">
								3. Sapien atám odio ultrices posuere vulputate vitae lorem.
							</a>
						</li>
						<li className="mb-2">
							<a href="#" className="text-gray-700">
								4. Etiam eu odio in sapien posuere bibendum vitae sit amet lorem.
							</a>
						</li>
						<li>
							<a href="#" className="text-gray-700">
								5. Morbi eget leo et gravida sagittis nec noe facilis.
							</a>
						</li>
					</ul>
				</div>

				{/* <!-- Instagram --> */}
				<div className="bg-white p-6 rounded-lg shadow-lg">
					<h3 className="text-xl font-bold mb-4">Instagram</h3>
					<div className="grid grid-cols-3 gap-2">
						<img
							src="https://via.placeholder.com/100"
							alt="Instagram image"
							className="w-full h-24 object-cover rounded"
						/>
						<img
							src="https://via.placeholder.com/100"
							alt="Instagram image"
							className="w-full h-24 object-cover rounded"
						/>
						<img
							src="https://via.placeholder.com/100"
							alt="Instagram image"
							className="w-full h-24 object-cover rounded"
						/>
						<img
							src="https://via.placeholder.com/100"
							alt="Instagram image"
							className="w-full h-24 object-cover rounded"
						/>
						<img
							src="https://via.placeholder.com/100"
							alt="Instagram image"
							className="w-full h-24 object-cover rounded"
						/>
						<img
							src="https://via.placeholder.com/100"
							alt="Instagram image"
							className="w-full h-24 object-cover rounded"
						/>
					</div>
				</div>
			</div>
		</>
	);
};

export default Sidebar;
