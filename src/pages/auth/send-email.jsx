import React, { useState } from 'react';
import Head from 'next/head';

import useAuth from '@/hooks/useAuth';

import { Button } from '@/components/ui/button';

const SendEmail = () => {
	const [email, setEmail] = useState('');
	const { handleSendEmail, message } = useAuth();

	const onSendEmail = (e) => {
		e.preventDefault();
		handleSendEmail(email);
	};
	return (
		<>
			<Head>
				<title>Reset Password</title>
				<meta name="description" content="パスワードリセットメール送信画面です。" />
				<meta name="robots" content="noindex,nofollow" />
			</Head>
			<div className="bg-gray-100 flex items-center justify-center h-screen">
				<div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
					<h1 className="text-2xl font-bold mb-6 text-center">ResetPassword</h1>
					<form onSubmit={onSendEmail}>
						<div className="mb-4">
							<label htmlFor="email" className="block text-sm font-medium text-gray-700">
								Email
							</label>
							<input
								type="email"
								name="email"
								id="email"
								required
								className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
								value={email}
								onChange={(e) => setEmail(e.target.value)}
							/>
							<span className="text-sm text-red-500">{message}</span>
						</div>
						<Button variant="outline">Send Email</Button>
					</form>
				</div>
			</div>
		</>
	);
};

export default SendEmail;
