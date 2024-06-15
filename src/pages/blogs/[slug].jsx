import React from 'react';

// コンポーネントのインポート
import Sidebar from '@/components/common/Sidebar';

const ArticlePage = ({ content }) => {
	console.log('ArticlePage =>', content);
	return (
		<>
			<main className="container mx-auto px-6 py-8">
				<div className="flex flex-wrap -mx-6">
					{/* <!-- Blog Post --> */}
					<div className="w-full lg:w-2/3 px-6 mb-12">
						<div className="bg-white p-6 rounded-lg shadow-lg">
							<img
								src="https://via.placeholder.com/800x400"
								alt="Blog image"
								className="w-full h-64 object-cover rounded-t-lg mb-4"
							/>
							<h1 className="text-2xl font-bold mb-2">{content.metadata.title}</h1>
							<p className="text-gray-700 mb-4">{content.metadata.date}</p>
							<p className="text-gray-700 mb-4">{content.markdown.parent}</p>
							{/* <blockquote className="italic border-l-4 pl-4 border-gray-500 mb-4">
								Class aptent taciti sociosqu...
							</blockquote>
							<p className="text-gray-700 mb-4">
								Proin gravida nibh vel velit auctor aliquet. Aenean sollicitudin...
							</p>*/}
							<div className="flex justify-between items-center">
								<div className="space-x-2">
									<span className="px-4 py-2 bg-gray-200 rounded-full text-gray-700">Creative</span>
									<span className="px-4 py-2 bg-gray-200 rounded-full text-gray-700">Design</span>
								</div>
								<div className="space-x-2">
									<button className="px-4 py-2 bg-gray-200 rounded-lg">Previous Post</button>
									<button className="px-4 py-2 bg-gray-200 rounded-lg">Next Post</button>
								</div>
							</div>
						</div>
					</div>
					<Sidebar />
				</div>
			</main>
		</>
	);
};

export async function getStaticPaths() {
	const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/blogs`);
	const blogs = await response.json();
	const slugs = blogs.map((blog) => blog.slug);
	const params = slugs.map((slug) => ({ params: { slug: slug } }));
	return {
		paths: params,
		fallback: false,
	};
}

export async function getStaticProps(context) {
	const { slug } = context.params;
	const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/blogs/${slug}`);
	const data = await response.json();
	return {
		props: {
			content: data,
		},
	};
}

export default ArticlePage;
