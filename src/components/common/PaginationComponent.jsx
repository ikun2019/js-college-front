import React, { useEffect, useState } from 'react';
import {
	Pagination,
	PaginationContent,
	PaginationEllipsis,
	PaginationItem,
	PaginationLink,
	PaginationNext,
	PaginationPrevious,
} from '../ui/pagination';

const PaginationComponent = ({ metas, articlePerPage, onPagenatedMetasChange }) => {
	const [currentPage, setCurrenPage] = useState(1);

	const totalPages = Math.ceil(metas.length / articlePerPage);

	const handlePage = (page) => {
		if (page < 1 || page > totalPages) return;
		setCurrenPage(page);
	};

	useEffect(() => {
		updatePaginatedMetas();
	}, [currentPage, metas]);

	const updatePaginatedMetas = () => {
		const paginatedMetas = metas.slice(
			(currentPage - 1) * articlePerPage,
			currentPage * articlePerPage
		);
		onPagenatedMetasChange(paginatedMetas);
	};

	const getPaginationItems = () => {
		const items = [];
		const startPage = Math.max(1, currentPage - 1);
		const endPage = Math.min(totalPages, currentPage + 1);
		if (startPage > 1) {
			items.push(
				<PaginationItem key={1}>
					<PaginationLink
						href="#"
						onClick={(e) => {
							e.preventDefault();
							handlePage(1);
						}}
					>
						1
					</PaginationLink>
				</PaginationItem>
			);
		}
		if (startPage > 2) {
			items.push(
				<PaginationItem key="ellipsis1">
					<PaginationEllipsis />
				</PaginationItem>
			);
		}
		for (let page = startPage; page <= endPage; page++) {
			items.push(
				<PaginationItem key={page}>
					<PaginationLink
						href="#"
						onClick={(e) => {
							e.preventDefault();
							handlePage(page);
						}}
						className={currentPage === page ? 'bg-gray-100' : ''}
					>
						{page}
					</PaginationLink>
				</PaginationItem>
			);
		}
		if (endPage < totalPages) {
			if (endPage < totalPages - 1) {
				items.push(
					<PaginationItem key="ellipsis2">
						<PaginationEllipsis />
					</PaginationItem>
				);
			}
			items.push(
				<PaginationItem key={totalPages}>
					<PaginationLink
						href="#"
						onClick={(e) => {
							e.preventDefault();
							handlePage(totalPages);
						}}
					>
						{totalPages}
					</PaginationLink>
				</PaginationItem>
			);
		}
		return items;
	};

	return (
		<div className="flex justify-between items-center mt-6">
			<Pagination>
				<PaginationContent>
					<PaginationItem>
						<PaginationPrevious
							href="#"
							onClick={(e) => {
								e.preventDefault();
								handlePage(currentPage - 1);
							}}
							className={currentPage === 1 ? 'disabled' : ''}
						/>
					</PaginationItem>
					{getPaginationItems()}
					<PaginationItem>
						<PaginationNext
							href="#"
							onClick={(e) => {
								e.preventDefault();
								handlePage(currentPage + 1);
							}}
							className={currentPage === totalPages ? 'disabled' : ''}
						/>
					</PaginationItem>
				</PaginationContent>
			</Pagination>
		</div>
	);
};

export default PaginationComponent;
