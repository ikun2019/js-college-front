import React from 'react';
import Link from 'next/link';

const HamburgerMenu = ({ toggleHamburger, isActive, user, onSignout }) => {
	return (
		<>
			{/* ハンバーガーアイコン */}
			<div
				className={`relative bg-gray-800 cursor-pointer rounded-md w-[50px] h-[50px] md:hidden ${
					isActive ? 'active' : ''
				}`}
				onClick={toggleHamburger}
			>
				<span
					className={`inline-block absolute h-[2px] bg-gray-50 w-[62%] left-[10px] transition-all top-[13px] ${
						isActive ? 'top-[18px] left-[18px] translate-y-[6px] rotate-[-45deg] w-[30%]' : ''
					}`}
				></span>
				<span
					className={`inline-block transition-all absolute top-[18px] left-[11px] text-xs mx-auto text-gray-50 ${
						isActive ? 'opacity-0' : ''
					}`}
				>
					Menu
				</span>
				<span
					className={`inline-block absolute h-[2px] bg-gray-50 w-[62%] left-[10px] transition-all top-[36px] ${
						isActive ? 'top-[30px] left-[18px] translate-y-[-6px] rotate-[45deg] w-[30%]' : ''
					}`}
				></span>
			</div>
			{/* メニューコンテンツ */}
			<nav className={`${isActive ? 'block' : 'hidden'}`}>
				<ul>
					<li>
						<Link href="/" className="block w-full px-4 py-2 text-center">
							Home
						</Link>
					</li>
					<hr />
					<li>
						<Link href="/blogs" className="block w-full px-4 py-2 text-center">
							Blogs
						</Link>
					</li>
					<hr />
					<li>
						<Link href="/learnings" className="block w-full px-4 py-2 text-center">
							Learning
						</Link>
					</li>
					<hr />
					{user ? (
						<>
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
						</>
					) : (
						<li>
							<Link href="/auth/signin" className="text-gray-100 font-bold bg-blue-500">
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
