import { Page, Locator, expect } from '@playwright/test';
import { TMDbBasePage } from './TMDbBasePage';

export class MovieDetailsPage extends TMDbBasePage {
    readonly userScore: Locator;
    readonly topBilledCast: Locator;
    readonly releaseDate: Locator;
    readonly reviewsSection: Locator;
    readonly reviewCards: Locator;

    constructor(page: Page) {
        super(page);
        this.userScore = page.locator('.user_score_chart .percent');
        this.topBilledCast = page.locator('.people.scroller .card');
        this.releaseDate = page.locator('.release_date');
        this.reviewsSection = page.locator('#reviews');
        this.reviewCards = page.locator('.review_card');
    }

    async verifyUserScore(expectedScore: string) {
        // Wait for the user score to load with a more specific selector
        const scoreElement = this.page.locator('.user_score_chart').locator('text=' + expectedScore);
        await expect(scoreElement).toBeVisible({ timeout: 10000 });
    }

    async verifyCastMember(actorName: string) {
        const castMember = this.topBilledCast.filter({ hasText: actorName });
        await expect(castMember).toBeVisible();
        return castMember;
    }

    async clickOnCastMember(actorName: string) {
        const castMember = await this.verifyCastMember(actorName);
        await castMember.locator('a').first().click();
        await this.page.waitForLoadState('networkidle');
    }

    async verifyReleaseDate(expectedDate: string) {
        await expect(this.releaseDate).toContainText(expectedDate);
    }

    async openAllReviews() {
        const reviewsLink = this.page.locator('a[href*="reviews"]', { hasText: /reviews?/i });
        await reviewsLink.click();
        await this.page.waitForLoadState('networkidle');
    }

    async verifyReviewCount(expectedCount: string) {
        await expect(this.reviewCards).toHaveCount(parseInt(expectedCount));
    }

    async verifySearchResultsFilter(title: string, filterType: 'Movies' | 'TV Shows') {
        const filterSection = this.page.locator('.results')
            .locator('.filter', { hasText: filterType });
        const resultInFilter = filterSection.locator('.result', { hasText: title });
        await expect(resultInFilter).toBeVisible();
    }

    async verifyMovieTitle(expectedTitle: string) {
        const titleElement = this.page.locator('h2 a, h1').filter({ hasText: expectedTitle }).first();
        await expect(titleElement).toContainText(expectedTitle, { timeout: 10000 });
    }

    async verifyReleaseYear(expectedYear: string) {
        const yearElement = this.page.locator('.release_date, .facts').filter({ hasText: expectedYear }).first();
        await expect(yearElement).toBeVisible({ timeout: 10000 });
    }

    async verifyGenre(expectedGenre: string) {
        const genreElement = this.page.locator('.genres a, .genre a').filter({ hasText: expectedGenre }).first();
        await expect(genreElement).toBeVisible({ timeout: 10000 });
    }
}
