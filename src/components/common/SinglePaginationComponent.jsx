import React from 'react';

import {
	Pagination,
	PaginationContent,
	PaginationItem,
	PaginationPrevious,
	PaginationNext,
} from '../ui/pagination';

const SinglePagenationComponent = ({ page, prevSlug, nextSlug }) => {
	return (
		<div className="flex justify-between items-center">
			<Pagination>
				<PaginationContent>
					{prevSlug && (
						<PaginationItem>
							<PaginationPrevious href={`${page}/${prevSlug}`} />
						</PaginationItem>
					)}
					{nextSlug && (
						<PaginationItem>
							<PaginationNext href={`${page}/${nextSlug}`} />
						</PaginationItem>
					)}
				</PaginationContent>
			</Pagination>
		</div>
	);
};

export default SinglePagenationComponent;
