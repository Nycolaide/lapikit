export interface HeadingItem {
	id: string;
	text: string;
	level: number;
}

export interface PageSummary {
	slug: string;
	path: string;
	title: string;
	headings: HeadingItem[];
}

export interface SummariesData {
	generatedAt: string;
	totalPages: number;
	summaries: PageSummary[];
}

export class SummariesManager {
	private summaries: PageSummary[] = [];
	private summariesMap = new Map<string, PageSummary>();

	constructor(data: SummariesData) {
		this.summaries = data.summaries;
		this.summariesMap = new Map(data.summaries.map((summary) => [summary.slug, summary]));
	}

	/**
	 * Récupère le summary d'une page par son slug
	 */
	getPageSummary(slug: string): PageSummary | undefined {
		return this.summariesMap.get(slug);
	}

	/**
	 * Récupère les headings d'une page par son slug
	 */
	getPageHeadings(slug: string): HeadingItem[] {
		const summary = this.summariesMap.get(slug);
		return summary?.headings || [];
	}

	/**
	 * Recherche dans tous les summaries par texte
	 */
	searchInHeadings(query: string): Array<{ page: PageSummary; heading: HeadingItem }> {
		const results: Array<{ page: PageSummary; heading: HeadingItem }> = [];
		const lowerQuery = query.toLowerCase();

		for (const page of this.summaries) {
			for (const heading of page.headings) {
				if (heading.text.toLowerCase().includes(lowerQuery)) {
					results.push({ page, heading });
				}
			}
		}

		return results;
	}

	/**
	 * Récupère tous les headings d'un niveau spécifique
	 */
	getHeadingsByLevel(level: number): Array<{ page: PageSummary; heading: HeadingItem }> {
		const results: Array<{ page: PageSummary; heading: HeadingItem }> = [];

		for (const page of this.summaries) {
			for (const heading of page.headings) {
				if (heading.level === level) {
					results.push({ page, heading });
				}
			}
		}

		return results;
	}

	/**
	 * Récupère les pages avec le plus de headings
	 */
	getPagesWithMostHeadings(limit: number = 10): PageSummary[] {
		return [...this.summaries]
			.sort((a, b) => b.headings.length - a.headings.length)
			.slice(0, limit);
	}

	/**
	 * Récupère toutes les pages
	 */
	getAllPages(): PageSummary[] {
		return this.summaries;
	}

	/**
	 * Statistiques des summaries
	 */
	getStats() {
		const totalHeadings = this.summaries.reduce((sum, page) => sum + page.headings.length, 0);
		const pagesWithHeadings = this.summaries.filter((page) => page.headings.length > 0).length;

		const headingsByLevel: Record<number, number> = {};
		for (const page of this.summaries) {
			for (const heading of page.headings) {
				headingsByLevel[heading.level] = (headingsByLevel[heading.level] || 0) + 1;
			}
		}

		return {
			totalPages: this.summaries.length,
			totalHeadings,
			pagesWithHeadings,
			pagesWithoutHeadings: this.summaries.length - pagesWithHeadings,
			headingsByLevel,
			averageHeadingsPerPage: totalHeadings / this.summaries.length
		};
	}
}
