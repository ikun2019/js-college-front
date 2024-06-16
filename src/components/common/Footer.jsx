import React from 'react';

const Footer = () => {
	const date = new Date();
	const year = date.getFullYear();

	return (
		<footer className="bg-gray-900 text-gray-200 py-8">
			<div className="container mx-auto px-6">
				<div className="flex flex-wrap -mx-6">
					<div className="w-full md:w-1/3 px-6 mb-6">
						<p className="text-xl font-bold mb-4">JS College</p>
						<p>&copy; {year} JS College</p>
					</div>
				</div>
			</div>
		</footer>
	);
};

export default Footer;
