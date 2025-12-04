import type {
	NavigationLink,
	NavigationSectionDirect,
	NavigationLinkWithSections,
	NavigationData
} from './navigation';

export function hasNavSections(
	nav: NavigationLink | NavigationSectionDirect | NavigationLinkWithSections
): nav is NavigationLinkWithSections {
	return 'sections' in nav && nav.sections !== undefined;
}

export function isNavigationSectionDirect(
	nav: NavigationLink | NavigationSectionDirect | NavigationLinkWithSections
): nav is NavigationSectionDirect {
	return 'items' in nav && !('sections' in nav);
}

export function getNavigationSections(
	nav: NavigationLink | NavigationSectionDirect | NavigationLinkWithSections
): NavigationData | null {
	return hasNavSections(nav) ? nav.sections : null;
}
