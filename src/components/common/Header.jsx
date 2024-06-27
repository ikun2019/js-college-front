import React from 'react';
import Link from 'next/link';

import { Button } from '../ui/button';
// import { HomeIcon, NewspaperIcon } from '@heroicons/react/16/solid/index.js';

const Header = () => {
	return (
		<header className="font-mono flex justify-between py-3 px-6 fixed bg-white shadow-md w-full z-50">
			<div>
				<p className="font-sans text-sm text-gray-500">JavaScriptを学ぶなら</p>
				<p className="text-xl">JS College</p>
			</div>
			<nav className="flex items-center">
				<ul className="flex items-center">
					<li>
						<Button variant="ghost" asChild>
							<Link href="/" className="text-gray-600">
								{/* <HomeIcon className="size-4" /> */}
								Home
							</Link>
						</Button>
					</li>
					<li>
						<Button variant="ghost" asChild>
							<Link href="/blogs" className="text-gray-600">
								{/* <NewspaperIcon className="size-4" /> */}
								Blogs
							</Link>
						</Button>
					</li>
					<li>
						<Button variant="gohst" asChild>
							<Link href="/learnings" className="text-gray-600">
								Learning
							</Link>
						</Button>
					</li>
				</ul>
			</nav>
		</header>
	);
};

export default Header;
