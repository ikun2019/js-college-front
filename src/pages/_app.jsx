import '@/styles/globals.css';
import Head from 'next/head';

import Layout from '@/components/layouts/Layout';

export default function App({ Component, pageProps }) {
	return (
		<>
			<Head>
				<title>JS College</title>
				<meta
					name="description"
					content="個人開発者のためにJavaScriptを使用したWebアプリケーションを開発・運用する技術を習得するためのサイトです。"
				/>
				<meta name="viewport" content="initial-scale=1.0, width=device-width" />
			</Head>
			<Layout>
				<Component {...pageProps} />
			</Layout>
		</>
	);
}
