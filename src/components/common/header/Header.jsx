import React, { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';

import { Button } from '../../ui/button';
import useAuthSesseion from '../../../hooks/useAuthSession';
import HamburgerMenu from './HamburgerMenu';
import useAuth from '../../../hooks/useAuth';

const Header = () => {
	const { user } = useAuthSesseion();
	const { handleSignout } = useAuth();

	const [isOpen, setIsOpen] = useState(false); // profileの開閉
	const [isActive, setIsActive] = useState(false); // ハンバーガーメニューの開閉
	const menuRef = useRef(null);
	const handleClickOutside = (event) => {
		if (menuRef.current && !menuRef.current.contains(event.target)) {
			setIsOpen(false);
		}
	};
	useEffect(() => {
		document.addEventListener('mousedown', handleClickOutside);
		return () => {
			document.addEventListener('mousedown', handleClickOutside);
		};
	}, []);

	const toggleMenu = () => {
		setIsOpen(!isOpen);
	};

	const toggleHamburger = () => {
		setIsActive(!isActive);
	};

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
			<HamburgerMenu
				toggleHamburger={toggleHamburger}
				isActive={isActive}
				user={user}
				onSignout={onSignout}
			/>
			<nav className="md:flex md:items-center hidden">
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
					{user ? (
						<>
							<li>
								<div className="relative">
									<Image
										src="/header/user.svg"
										alt="ユーザーアイコン"
										width={15}
										height={15}
										className="w-7 h-7 rounded-full cursor-pointer outline-thin"
										onClick={toggleMenu}
									/>
									{isOpen && (
										<ul
											className="absolute block mt-2 right-0 bg-gray-100 w-48 text-gray-600 rounded-sm shadow-lg"
											ref={menuRef}
										>
											<li className="block hover:bg-gray-200">
												<Link href="/auth/profile" className="block w-full px-4 py-2 text-center">
													Profile
												</Link>
											</li>
											<hr />
											<li className="block hover:bg-gray-200">
												<button className="block w-full px-4 py-2" onClick={onSignout}>
													SignOut
												</button>
											</li>
										</ul>
									)}
								</div>
							</li>
						</>
					) : (
						<>
							<li>
								<Button variant="gohst" asChild>
									<Link href="/auth/signin" className="text-gray-100 font-bold bg-blue-500">
										SignIn
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
