Feature: Movie Details Verification

    Scenario: Verify "Mission: Impossible - Dead Reckoning Part One" details
        Given I navigate to https://www.themoviedb.org/
        When I search for "Mission: Impossible - Dead Reckoning Part One"
        Then I should see "Mission: Impossible - Dead Reckoning Part One" in the search results
        And I open the movie details page for "Mission: Impossible - Dead Reckoning Part One"
        Then I should see a User Score of "75%"
        And I should see "Tom Cruise", "Hayley Atwell", and "Simon Pegg" in the Top Billed Cast