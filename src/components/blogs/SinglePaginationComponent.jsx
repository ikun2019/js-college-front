import React from 'react';

import {
	Pagination,
	PaginationContent,
	PaginationItem,
	PaginationPrevious,
	PaginationNext,
} from '../ui/pagination';

const SinglePagenationComponent = ({ prevSlug, nextSlug }) => {
	return (
		<div className="flex justify-between items-center">
			<Pagination>
				<PaginationContent>
					{prevSlug && (
						<PaginationItem>
							<PaginationPrevious href={`/blogs/${prevSlug}`} />
						</PaginationItem>
					)}
					{nextSlug && (
						<PaginationItem>
							<PaginationNext href={`/blogs/${nextSlug}`} />
						</PaginationItem>
					)}
				</PaginationContent>
			</Pagination>
		</div>
	);
};

export default SinglePagenationComponent;
