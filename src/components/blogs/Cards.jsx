import React from 'react';
import Card from './Card';

const Cards = ({ metas }) => {
	return (
		<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
			{metas.map((meta) => (
				<div key={meta.slug} className="h-full">
					<Card meta={meta} />
				</div>
			))}
		</div>
	);
};

export default Cards;
