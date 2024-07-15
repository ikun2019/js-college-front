import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import supabase from '@/lib/supabaesClient';
import { Button } from '@/components/ui/button';

const ResetPassword = () => {
	const router = useRouter();
	const [newPassword, setNewPassword] = useState('');
	const [error, setError] = useState(null);
	const [message, setMessage] = useState(null);

	const handleResetPassword = async (e) => {
		e.preventDefault();
		setError(null);

		try {
			const { error } = await supabase.auth.updateUser({
				password: newPassword,
			});
			if (error) {
				setError(error.message);
				return;
			}
			setMessage('パスワードがリセットされました。ログインページにリダイレクトします。');
			setTimeout(() => {
				router.push('/auth/signin');
			}, 3000);
		} catch (error) {
			setError(error.message);
		}
	};

	return (
		<div className="bg-gray-100 flex items-center justify-center h-screen">
			<div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
				<h1 className="text-2xl font-bold mb-6 text-center">Reset Password</h1>
				{error && <div className="text-red-500 mb-4">{error}</div>}
				{message && <div className="text-green-500 mb-4">{message}</div>}
				<form onSubmit={handleResetPassword}>
					<div className="mb-4">
						<label htmlFor="new-password" className="block text-sm font-medium text-gray-700">
							New Password
						</label>
						<input
							type="password"
							name="new-password"
							id="new-password"
							required
							className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
							value={newPassword}
							onChange={(e) => setNewPassword(e.target.value)}
						/>
					</div>
					<Button type="submit" variant="outline">
						Reset Password
					</Button>
				</form>
			</div>
		</div>
	);
};

export default ResetPassword;
