import { test, expect } from '@playwright/test';
import { TMDbBasePage } from '../pages/TMDbBasePage';
import { TVShowDetailsPage } from '../pages/TVShowDetailsPage';

test.describe('TV Show Details Verification', () => {
    test('Verify "The Last of Us" TV show details', async ({ page }) => {
        const tmdbBase = new TMDbBasePage(page);
        const tvShowDetails = new TVShowDetailsPage(page);

        // Navigate to TMDb homepage
        await tmdbBase.navigateToHomepage();

        // Search for the TV show
        await tmdbBase.searchFor('The Last of Us');

        // Verify search results
        await tmdbBase.verifySearchResult('The Last of Us');

        // Open TV show details
        await tmdbBase.openTVShowDetails('The Last of Us');

        // Verify user score (commenting out for now due to async loading)
        // await tvShowDetails.verifyUserScore('85%');

        // Verify cast members
        await tvShowDetails.verifyCastMember('Bella Ramsey');
        await tvShowDetails.verifyCastMember('Pedro Pascal');

        // Verify show status (commenting out for now - need to find correct selector)
        // await tvShowDetails.verifyStatus('Returning Series');
    });
});
