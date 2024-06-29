import React from 'react';
import Header from '../common/Header';
import Footer from '../common/Footer';

const Layout = ({ children }) => {
	return (
		<>
			<Header />
			<main className="pt-16 pb-16">{children}</main>
			<Footer />
		</>
	);
};

export default Layout;
