import React from 'react';
import Card from './Card';

const Cards = ({ metas }) => {
	return (
		<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6">
			{metas.map((meta) => (
				<div key={meta.Slug?.rich_text[0].plain_text} className="h-full">
					<Card meta={meta} />
				</div>
			))}
		</div>
	);
};

export default Cards;
