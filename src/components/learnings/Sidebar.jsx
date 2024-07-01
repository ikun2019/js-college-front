import React from 'react';

const Sidebar = () => {
	return (
		<>
			<aside className="w-full lg:w-1/4 px-6 mb-12 lg:mb-0 mt-6 lg:mt-0">
				<div className="bg-white p-6 rounded-lg shadow-lg mb-6">
					<h2 className="text-2xl font-bold mb-4">Filters</h2>
					<div>
						<h3 className="text-xl font-bold mb-2">Collections</h3>
						<ul>
							<li className="mb-2">
								<a href="#" className="text-gray-700">
									Broadway (23)
								</a>
							</li>
							<li className="mb-2">
								<a href="#" className="text-gray-700">
									Water Adventures (120)
								</a>
							</li>
							<li className="mb-2">
								<a href="#" className="text-gray-700">
									Adventures (67)
								</a>
							</li>
							<li className="mb-2">
								<a href="#" className="text-gray-700">
									Sport Shows (33)
								</a>
							</li>
							<li>
								<a href="#" className="text-gray-700">
									+23 more
								</a>
							</li>
						</ul>
					</div>

					<div className="mt-6">
						<h3 className="text-xl font-bold mb-2">Price Range</h3>
						<div className="flex items-center justify-between">
							<span>$120</span>
							<span>$855</span>
						</div>
						<input type="range" min="120" max="855" className="w-full mt-2" />
					</div>

					<div className="mt-6">
						<h3 className="text-xl font-bold mb-2">Select Dates</h3>
						<input type="date" className="w-full border rounded-lg p-2" />
					</div>

					<div className="mt-6">
						<h3 className="text-xl font-bold mb-2">Event Time</h3>
						<div>
							<label className="flex items-center mb-2">
								<input type="checkbox" className="mr-2" />
								<span>Morning</span>
							</label>
							<label className="flex items-center mb-2">
								<input type="checkbox" className="mr-2" />
								<span>Afternoon</span>
							</label>
							<label className="flex items-center mb-2">
								<input type="checkbox" className="mr-2" />
								<span>Evening</span>
							</label>
							<label className="flex items-center mb-2">
								<input type="checkbox" className="mr-2" />
								<span>Night</span>
							</label>
						</div>
					</div>

					<div className="mt-6">
						<h3 className="text-xl font-bold mb-2">Duration</h3>
						<div>
							<label className="flex items-center mb-2">
								<input type="checkbox" className="mr-2" />
								<span>less than 1 hour</span>
							</label>
							<label className="flex items-center mb-2">
								<input type="checkbox" className="mr-2" />
								<span>1 - 2 hours</span>
							</label>
							<label className="flex items-center mb-2">
								<input type="checkbox" className="mr-2" />
								<span>2 - 4 hours</span>
							</label>
							<label className="flex items-center mb-2">
								<input type="checkbox" className="mr-2" />
								<span>more than 4 hours</span>
							</label>
						</div>
					</div>
				</div>
			</aside>
		</>
	);
};

export default Sidebar;
