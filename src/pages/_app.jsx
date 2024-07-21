import '@/styles/globals.css';
import { useState } from 'react';
import Head from 'next/head';

import { SessionContextProvider } from '@supabase/auth-helpers-react';

import supabase from '@/lib/supabaesClient';

import Layout from '../components/layouts/Layout';

export default function App({ Component, pageProps }) {
	const [session, setSession] = useState(pageProps.initialSession);
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
			<SessionContextProvider supabaseClient={supabase} initialSession={session}>
				<Layout>
					<Component {...pageProps} />
				</Layout>
			</SessionContextProvider>
		</>
	);
}
