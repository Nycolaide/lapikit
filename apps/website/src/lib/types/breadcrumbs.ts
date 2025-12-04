export interface BreadcrumbItem {
	label: string;
	href?: string;
}

export interface StructuredDataBreadcrumbItem {
	'@type': string;
	position: number;
	name: string;
	item?: string;
}

export interface StructuredDataBreadcrumb {
	'@context': string;
	'@type': string;
	itemListElement: StructuredDataBreadcrumbItem[];
}

export interface BreadcrumbsProps {
	url: string;
	class?: string;
	[key: string]: unknown;
}
