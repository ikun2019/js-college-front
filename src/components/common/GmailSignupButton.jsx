import React from 'react';
import Image from 'next/image';

import { Button } from '../ui/button';

const GmailSignupButton = ({ onGmail, signup }) => {
	return (
		<Button
			variant="outline"
			onClick={onGmail}
			className="d-flex items-center px-3 py-5 bg-blue-100 text-gray-600 border-none rounded cursor-pointer text-base w-full"
		>
			<Image src="/auth/google.svg" alt="Gmail Icon" width={20} height={20} className="mr-3" />
			{signup ? 'Sign up with Gmail' : 'Login with Gmail'}
		</Button>
	);
};

export default GmailSignupButton;
