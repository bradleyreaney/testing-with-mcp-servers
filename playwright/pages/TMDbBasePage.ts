import { Page, Locator, expect } from '@playwright/test';

export class TMDbBasePage {
    readonly page: Page;
    readonly searchInput: Locator;
    readonly searchButton: Locator;
    readonly searchResults: Locator;

    constructor(page: Page) {
        this.page = page;
        this.searchInput = page.locator('#search_v4');
        this.searchButton = page.locator('input[type="submit"][value="Search"]');
        this.searchResults = page.locator('.results');
    }

    async navigateToHomepage() {
        await this.page.goto('https://www.themoviedb.org/');
        await this.page.waitForLoadState('networkidle');
    }

    async searchFor(query: string) {
        await this.searchInput.fill(query);
        await this.searchInput.press('Enter');
        await this.page.waitForLoadState('networkidle');
    }

    async search(query: string) {
        await this.searchInput.fill(query);
        await this.searchInput.press('Enter');
        await this.page.waitForLoadState('networkidle');
    }

    async verifySearchResult(title: string) {
        const searchResultItem = this.page.locator('.results .result', { hasText: title }).first();
        await expect(searchResultItem).toBeVisible();
        return searchResultItem;
    }

    async openMovieDetails(title: string) {
        // Wait for search results to be visible first
        await this.page.waitForSelector('.results', { timeout: 10000 });
        await this.page.waitForTimeout(2000); // Additional wait for dynamic content

        // Find the movie link more reliably - try multiple approaches
        let movieLink = this.page.locator('.results a[href*="/movie/"]').first();

        // If not visible, try scrolling the page first
        await this.page.evaluate(() => window.scrollTo(0, 500));
        await this.page.waitForTimeout(1000);

        // Try to make it visible and clickable
        try {
            await movieLink.waitFor({ state: 'visible', timeout: 5000 });
            await movieLink.scrollIntoViewIfNeeded();
            await movieLink.click();
            await this.page.waitForLoadState('networkidle');
            return;
        } catch {
            // If not visible, try force approach
            try {
                await movieLink.scrollIntoViewIfNeeded();
                await this.page.waitForTimeout(1000);
                await movieLink.click({ force: true });
                await this.page.waitForLoadState('networkidle');
                return;
            } catch {
                // Last resort: use URL navigation
                const href = await movieLink.getAttribute('href');
                if (href) {
                    await this.page.goto(`https://www.themoviedb.org${href}`);
                    await this.page.waitForLoadState('networkidle');
                }
            }
        }
    }

    async openTVShowDetails(title: string) {
        // Wait for search results to be visible first
        await this.page.waitForSelector('.results', { timeout: 10000 });

        const tvLink = this.page.locator('.results a[href*="/tv/"]').first();
        await tvLink.waitFor({ state: 'visible', timeout: 10000 });
        await tvLink.scrollIntoViewIfNeeded();
        await tvLink.click();
        await this.page.waitForLoadState('networkidle');
    }

    async openPersonDetails(name: string) {
        const personLink = this.page.locator('.results a[href*="/person/"]').first();
        await personLink.click();
        await this.page.waitForLoadState('networkidle');
    }
}
