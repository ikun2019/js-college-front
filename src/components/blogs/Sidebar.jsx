import React, { useEffect, useState } from 'react';
import Link from 'next/link';

const Sidebar = ({ metas }) => {
	const [searchWord, setSearchWord] = useState('');
	const [results, setResults] = useState([]);

	useEffect(() => {
		if (searchWord) {
			const results = metas.filter((meta) => {
				return meta.title.toLowerCase().includes(searchWord.toLowerCase());
			});
			console.log(results);
			setResults(results);
		} else {
			setResults([]);
		}
	}, [searchWord, metas]);

	// ユニークなtagを格納した配列を作成
	const uniqueTags = metas.reduce((acc, meta) => [...acc, ...meta.tags], []);
	return (
		<>
			{/* <!-- Sidebar --> */}
			<aside className="w-full lg:w-1/4 px-6 mb-12 lg:mb-0 mt-6 lg:mt-0">
				{/* <!-- Categories --> */}
				<div className="bg-white p-6 rounded-lg shadow-lg mb-6">
					<span className="text-2xl font-semibold mb-4 block font-sans">Filters</span>
					{/* Tags */}
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

					{/* Search */}
					<div className="mt-6">
						<span className="text-xl font-semibold mb-2 block">Search</span>
						<div className="relative">
							<input
								type="text"
								className="w-full px-4 py-2 border rounded-lg"
								placeholder="Search..."
								value={searchWord}
								onChange={(e) => setSearchWord(e.target.value)}
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
							{results.length > 0 && (
								<ul className="absolute z-10 w-full bg-white border border-gray-300 rounded-lg mt-2">
									{results.map((result, index) => (
										<li key={index} className="hover:bg-gray-100 cursor-pointer">
											<Link
												href={`/blogs/${result.slug}`}
												className="px-4 py-2 inline-block w-full h-full"
											>
												{result.title}
											</Link>
										</li>
									))}
								</ul>
							)}
						</div>
					</div>

					{/* <!-- Top Posts --> */}
					{/* <div className="mt-6">
						<span className="text-xl font-semibold mb-2 block">Top Posts</span>
						<ul>
							<li className="mb-2">
								<Link href="#" className="text-gray-700">
									1. Aenean mattis tortor ac sapien congue molestie.
								</Link>
							</li>
						</ul>
					</div> */}
				</div>
			</aside>
		</>
	);
};

export default Sidebar;
