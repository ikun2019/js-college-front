import React from 'react';
import Link from 'next/link';

import { Button } from '../ui/button';
import useAuthSesseion from '../../hooks/useAuthSession';
import useAuth from '../../hooks/useAuth';

const Header = () => {
	const { session, loading } = useAuthSesseion();

	const { handleSignout } = useAuth();

	const onSignout = async (e) => {
		e.preventDefault();
		await handleSignout();
	};

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
					{session ? (
						<>
							<li>
								<Button variant="gohst" asChild>
									<button className="text-gray-600" onClick={onSignout}>
										Logout
									</button>
								</Button>
							</li>
						</>
					) : (
						<>
							<li>
								<Button variant="gohst" asChild>
									<Link href="/auth/login" className="text-gray-600">
										Login
									</Link>
								</Button>
							</li>
							<li>
								<Button variant="gohst" asChild>
									<Link href="/auth/signup" className="text-gray-600">
										Signup
									</Link>
								</Button>
							</li>
						</>
					)}
				</ul>
			</nav>
		</header>
	);
};

export default Header;
