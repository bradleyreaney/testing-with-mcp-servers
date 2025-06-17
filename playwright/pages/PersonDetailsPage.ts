import { Page, Locator, expect } from '@playwright/test';
import { TMDbBasePage } from './TMDbBasePage';

export class PersonDetailsPage extends TMDbBasePage {
    readonly actingCredits: Locator;
    readonly knownForSection: Locator;

    constructor(page: Page) {
        super(page);
        this.actingCredits = page.locator('.credits');
        this.knownForSection = page.locator('.known_for');
    }

    async verifyActingCredit(title: string) {
        // Use more specific selector to avoid multiple matches
        // Look for the title within the credits section specifically
        const creditItem = this.page.locator('.credits').locator(`text=${title}`).first();
        await expect(creditItem).toBeVisible({ timeout: 10000 });
    }

    async verifyKnownFor(title: string) {
        const knownForItem = this.knownForSection.locator('.card', { hasText: title });
        await expect(knownForItem).toBeVisible();
    }
}
