import React from 'react';
import Header from '../common/Header';
import Footer from '../common/Footer';

const Layout = ({ children }) => {
	return (
		<>
			<Header />
			<main className="pt-16 pb-16 bg-gray-50">{children}</main>
			<Footer />
		</>
	);
};

export default Layout;
