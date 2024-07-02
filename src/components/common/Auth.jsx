import React, { useState } from 'react';
import useAuth from '@/hooks/useAuth';

const Auth = () => {
	const { error, handleLogin, handleSignup } = useAuth();
	const [name, setName] = useState('');
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');

	const onLogin = (e) => {
		e.preventDefault();
		handleLogin(email, password);
	};

	const onSignup = (e) => {
		e.preventDefault();
		handleSignup(email, password, name);
	};

	return (
		<div>
			<h1>Login</h1>
			<label htmlFor="name">Name</label>
			<br />
			<input
				type="text"
				name="name"
				id="name"
				placeholder="Name"
				value={name}
				onChange={(e) => setName(e.target.value)}
			/>
			<br />
			<label htmlFor="email">Email</label>
			<br />
			<input
				type="email"
				name="email"
				id="email"
				placeholder="Email"
				value={email}
				onChange={(e) => setEmail(e.target.value)}
			/>
			<br />
			<label htmlFor="password">Password</label>
			<br />
			<input
				type="password"
				name="password"
				id="password"
				placeholder="Password"
				value={password}
				onChange={(e) => setPassword(e.target.value)}
			/>
			<br />
			<button onClick={onLogin}>Login</button>
			<br />
			<button onClick={onSignup}>Signup</button>
			{error && <p>{error}</p>}
		</div>
	);
};

export default Auth;
