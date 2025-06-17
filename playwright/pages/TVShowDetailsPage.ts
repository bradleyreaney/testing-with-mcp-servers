import { Page, Locator, expect } from '@playwright/test';
import { TMDbBasePage } from './TMDbBasePage';

export class TVShowDetailsPage extends TMDbBasePage {
    readonly userScore: Locator;
    readonly seriesCast: Locator;
    readonly showStatus: Locator;

    constructor(page: Page) {
        super(page);
        this.userScore = page.locator('.user_score_chart .percent');
        this.seriesCast = page.locator('.people.scroller .card');
        this.showStatus = page.locator('.facts .status');
    }

    async verifyUserScore(expectedScore: string) {
        // Wait for the user score to load with a more specific selector
        const scoreElement = this.page.locator('.user_score_chart').locator('text=' + expectedScore);
        await expect(scoreElement).toBeVisible({ timeout: 10000 });
    }

    async verifyCastMember(actorName: string) {
        const castMember = this.seriesCast.filter({ hasText: actorName });
        await expect(castMember).toBeVisible();
    }

    async verifyStatus(expectedStatus: string) {
        // Use text locator for more reliable matching
        const statusElement = this.page.locator('text=' + expectedStatus);
        await expect(statusElement).toBeVisible({ timeout: 10000 });
    }
}
