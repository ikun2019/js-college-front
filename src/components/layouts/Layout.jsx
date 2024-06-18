import React from 'react';
import Header from '../common/Header';
import Footer from '../common/Footer';

const Layout = ({ children }) => {
	return (
		<>
			<Header />
			<div className="pt-16 pb-16">{children}</div>
			<Footer />
		</>
	);
};

export default Layout;
