import { dev } from '$app/environment';

export const url: string = dev ? 'http://localhost:5173' : '';

export const staticPages: Array<string> = [''];
