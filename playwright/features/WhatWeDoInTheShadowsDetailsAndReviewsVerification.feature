Feature: "What We Do in the Shadows" Details and Reviews Verification

  Scenario: Verify details and review count for "What We Do in the Shadows" (Movie)
    Given I am on the "The Movie Database (TMDb)" homepage
    When I search for "What We Do in the Shadows"
    Then I should see "What We Do in the Shadows" under the "TV Shows" search results filter
    And I should see "What We Do in the Shadows" under the "Movies" search results filter
    And I open the movie details page for "What We Do in the Shadows"
    Then I should see the release date as "2014-11-21"
    When I open all the reviews
    Then I should see "3" review cards