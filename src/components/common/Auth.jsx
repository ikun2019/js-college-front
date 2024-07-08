import React, { useState } from 'react';
import Link from 'next/link';

import useAuth from '../../hooks/useAuth';
import GmailSignupButton from './GmailSignupButton';
import GithubSignupButton from './GithubSignupButton';

const Auth = ({ signup }) => {
	const { error, handleSignin, handleSignup, handleGmailSignin, handleGitHubSignin } = useAuth();
	const [name, setName] = useState('');
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');

	const onSignin = (e) => {
		e.preventDefault();
		handleSignin(email, password);
	};

	const onSignup = (e) => {
		e.preventDefault();
		handleSignup(email, password, name);
	};

	const onGmail = (e) => {
		e.preventDefault();
		handleGmailSignin();
	};

	const onGithub = (e) => {
		e.preventDefault();
		handleGitHubSignin();
	};

	return (
		<>
			<div className="bg-gray-100 flex items-center justify-center h-screen">
				<div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
					{signup ? (
						<h2 className="text-2xl font-bold mb-6 text-center">Signup</h2>
					) : (
						<h2 className="text-2xl font-bold mb-6 text-center">Login</h2>
					)}
					<form>
						{signup && (
							<div className="mb-4">
								<label htmlFor="name" className="block text-sm font-medium text-gray-700">
									ニックネーム
								</label>
								<input
									id="name"
									name="name"
									type="name"
									required
									className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
									value={name}
									onChange={(e) => setName(e.target.value)}
								/>
							</div>
						)}
						<div className="mb-4">
							<label htmlFor="email" className="block text-sm font-medium text-gray-700">
								メールアドレス
							</label>
							<input
								id="email"
								name="email"
								type="email"
								required
								className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
								value={email}
								onChange={(e) => setEmail(e.target.value)}
							/>
						</div>
						<div className="mb-6">
							<label htmlFor="password" className="block text-sm font-medium text-gray-700">
								パスワード
							</label>
							<input
								id="password"
								name="password"
								type="password"
								required
								className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
								value={password}
								onChange={(e) => setPassword(e.target.value)}
							/>
						</div>
						{signup ? (
							<button
								type="submit"
								className="w-full py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
								onClick={onSignup}
							>
								サインアップ
							</button>
						) : (
							<button
								type="submit"
								className="w-full py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
								onClick={onSignin}
							>
								ログイン
							</button>
						)}
					</form>
					{!signup && (
						<p className="mt-4 text-sm">
							<Link href="#" className="text-indigo-600 hover:text-indigo-500 text-sm text-right">
								パスワードをお忘れですか？
							</Link>
						</p>
					)}
					<p className="mt-4">
						<GmailSignupButton onGmail={onGmail} signup={signup} />
					</p>
					<p className="mt-4">
						<GithubSignupButton onGithub={onGithub} signup={signup} />
					</p>
					{signup ? (
						<p className="mt-4 text-center text-sm text-gray-600">
							すでにアカウントをお持ちですか？{' '}
							<Link href="/auth/login" className="text-indigo-600 hover:text-indigo-500">
								ログイン
							</Link>
						</p>
					) : (
						<p className="mt-4 text-center text-sm text-gray-600">
							アカウントをお持ちではないですか？{' '}
							<Link href="/auth/signup" className="text-indigo-600 hover:text-indigo-500">
								サインアップ
							</Link>
						</p>
					)}
				</div>
			</div>
		</>
	);
};

export default Auth;
