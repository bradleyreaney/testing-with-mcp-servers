import { test, expect } from '@playwright/test';
import { TMDbBasePage } from '../pages/TMDbBasePage';
import { MovieDetailsPage } from '../pages/MovieDetailsPage';
import { PersonDetailsPage } from '../pages/PersonDetailsPage';

test.describe('Actor Filmography Verification', () => {
    test('Verify Anthony Mackie\'s acting credits from "Captain America: Brave New World"', async ({ page }) => {
        const tmdbBase = new TMDbBasePage(page);
        const movieDetails = new MovieDetailsPage(page);
        const personDetails = new PersonDetailsPage(page);

        // Navigate to TMDb homepage
        await tmdbBase.navigateToHomepage();

        // Search for the movie
        await tmdbBase.searchFor('Captain America: Brave New World');

        // Verify search results
        await tmdbBase.verifySearchResult('Captain America: Brave New World');

        // Open movie details
        await tmdbBase.openMovieDetails('Captain America: Brave New World');

        // Verify Anthony Mackie is in the cast
        await movieDetails.verifyCastMember('Anthony Mackie');

        // Click on Anthony Mackie
        await movieDetails.clickOnCastMember('Anthony Mackie');

        // Verify his acting credits
        await personDetails.verifyActingCredit('The Falcon and the Winter Soldier');
        await personDetails.verifyActingCredit('The Hurt Locker');
    });
});
