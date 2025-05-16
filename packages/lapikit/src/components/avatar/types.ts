import type { Component } from '$lib/internal/types.js';

type AvatarSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl' | 'full';
type AvatarDensity = 'compact' | 'comfortable' | 'default';
type AvatarVariant = 'outline' | 'text' | 'dash';

export interface AvatarProps extends Component {
	ref?: HTMLElement | null;
	dark?: boolean;
	light?: boolean;
	color?: string;
	background?: string;
	image?: string;
	size?: AvatarSize | { [key: string]: AvatarSize };
	variant?: AvatarVariant | { [key: string]: AvatarVariant };
	density?: AvatarDensity | { [key: string]: AvatarDensity };
}
