import React from 'react';
import Article from './Article';

const PaginatedArticles = ({ metas }) => {
	console.log('PaginatedArticles =>', metas);
	return (
		<>
			<ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
				{metas.map((meta) => (
					<li key={meta.slug} className="h-full">
						<Article meta={meta} />
					</li>
				))}
			</ul>
		</>
	);
};

export default PaginatedArticles;
