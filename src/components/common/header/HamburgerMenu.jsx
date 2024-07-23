import React from 'react';
import Link from 'next/link';

const HamburgerMenu = ({ toggleHamburger, isActive, user, onSignout }) => {
	return (
		<>
			{/* ハンバーガーアイコン */}
			<div
				className={`relative bg-gray-800 cursor-pointer rounded-md w-[50px] h-[50px] md:hidden z-10 ${
					isActive ? 'active' : ''
				}`}
				onClick={toggleHamburger}
			>
				<span
					className={`block absolute h-[2px] bg-gray-50 w-[62%] left-[10px] transition-all duration-300 ease-in-out ${
						isActive ? 'top-[24px] left-[11px] rotate-[-45deg] w-[50%]' : 'top-[14px]'
					}`}
				></span>
				<span
					className={`block transition-all absolute top-[18px] text-center w-full text-xs mx-auto text-gray-50 ${
						isActive ? 'opacity-0' : 'opacity-100'
					}`}
				>
					Menu
				</span>
				<span
					className={`block absolute h-[2px] bg-gray-50 w-[62%] left-[10px] transition-all duration-300 ease-in-out ${
						isActive ? 'top-[24px] left-[11px] rotate-[45deg] w-[50%]' : 'top-[36px]'
					}`}
				></span>
			</div>
			{/* メニューコンテンツ */}
			<nav
				className={`fixed top-[4.7rem] right-0 h-full w-3/4 bg-gray-100 transform transition-transform duration-300 ease-in-out md:hidden ${
					isActive ? 'translate-x-0' : 'translate-x-full'
				}`}
			>
				<ul className="flex flex-col items-center justify-center h-ful">
					<li className="py-2 block w-full hover:bg-gray-200">
						<Link href="/" className="block w-full px-4 py-2 text-center">
							Home
						</Link>
					</li>
					<hr className="w-full border-gray-300" />
					<li className="py-2 block w-full hover:bg-gray-200">
						<Link href="/blogs" className="block w-full px-4 py-2 text-center">
							Blogs
						</Link>
					</li>
					<hr className="w-full border-gray-300" />
					<li className="py-2 block w-full hover:bg-gray-200">
						<Link href="/learnings" className="block w-full px-4 py-2 text-center">
							Learning
						</Link>
					</li>
					<hr className="w-full border-gray-300" />
					{user ? (
						<>
							<li className="py-2 block w-full hover:bg-gray-200">
								<Link href="/auth/profile" className="block w-full px-4 py-2 text-center">
									Profile
								</Link>
							</li>
							<hr className="w-full border-gray-300" />
							<li className="py-2 block w-full hover:bg-gray-200">
								<button className="block w-full px-4 py-2" onClick={onSignout}>
									SignOut
								</button>
							</li>
						</>
					) : (
						<li className="py-2 block w-full hover:bg-gray-200">
							<Link href="/auth/signin" className="block w-full px-4 py-2 text-center">
								SignIn
							</Link>
						</li>
					)}
				</ul>
			</nav>
		</>
	);
};

export default HamburgerMenu;
