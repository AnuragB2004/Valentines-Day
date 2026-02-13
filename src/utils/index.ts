import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs))
}

/**
 * Creates a URL path for a page by its name
 * @param pageName - The name of the page (e.g., 'Home', 'LoveGames')
 * @returns The URL path for the page (e.g., '/', '/LoveGames')
 */
export function createPageUrl(pageName: string): string {
    if (pageName === 'Home' || !pageName) {
        return '/';
    }
    return `/${pageName}`;
}