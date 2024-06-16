import { Html, Head, Main, NextScript } from 'next/document';
import Header from '@/components/common/Header';
import Footer from '@/components/common/Footer';

export default function Document() {
	return (
		<Html lang="ja">
			<Head>
				<title>JS College</title>
				<meta
					name="description"
					content="個人開発者のためにJavaScriptを使用したWebアプリケーションを開発・運用する技術を習得するためのサイトです。"
				/>
			</Head>
			<body>
				<Header />
				<div className="pt-16 pb-16">
					<Main />
				</div>
				<Footer />
				<NextScript />
			</body>
		</Html>
	);
}
