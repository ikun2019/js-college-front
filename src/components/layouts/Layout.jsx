import React from 'react';
import Header from '../common/header/Header';
import Footer from '../common/Footer';

const Layout = ({ children }) => {
	return (
		<>
			<div className="flex flex-col min-h-screen">
				<Header />
				<main className="flex-grow pt-16 pb-16 bg-gray-50">{children}</main>
				<Footer />
			</div>
		</>
	);
};

export default Layout;
