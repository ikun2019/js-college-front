import React from 'react';

import {
	Breadcrumb,
	BreadcrumbItem,
	BreadcrumbLink,
	BreadcrumbList,
	BreadcrumbSeparator,
} from '../ui/breadcrumb';

const BreadcrumbComponent = ({ breadcrumbs }) => {
	console.log('breadcrumbs =>', breadcrumbs);
	const breadcrumbsLength = breadcrumbs.length;
	return (
		<>
			<Breadcrumb>
				<BreadcrumbList>
					{breadcrumbs.map((breadcrumb, index) => (
						<React.Fragment key={index}>
							<BreadcrumbItem>
								<BreadcrumbLink href={breadcrumb.href}>{breadcrumb.label}</BreadcrumbLink>
							</BreadcrumbItem>
							{breadcrumbsLength !== index + 1 && <BreadcrumbSeparator />}
						</React.Fragment>
					))}
				</BreadcrumbList>
			</Breadcrumb>
		</>
	);
};

export default BreadcrumbComponent;
