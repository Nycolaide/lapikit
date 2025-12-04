export interface GitHubRepositoryData {
	full_name: string;
	description: string | null;
	stargazers_count: number;
	subscribers_count: number;
	open_issues_count: number;
	forks_count: number;
	html_url: string;
	homepage: string | null;
	language: string | null;
	license: string | null;
	updated_at: string;
}

export interface NpmPackageData {
	name: string;
	version: string;
	description: string;
	homepage?: string;
	license?: string;
	repository?: string;
	lastPublished?: string;
	downloads: number;
}

export interface ApiData {
	github?: GitHubRepositoryData | null;
	npm?: NpmPackageData | null;
}
