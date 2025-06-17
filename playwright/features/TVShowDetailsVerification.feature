Feature: TV Show Details Verification

    Scenario: Verify "The Last of Us" TV show details
        Given I am on the "The Movie Database (TMDb)" homepage
        When I search for "The Last of Us"
        Then I should see "The Last of Us" in the search results
        And I open the TV show details page for "The Last of Us"
        Then I should see a User Score of "85%"
        And I should see "Bella Ramsey" and "Pedro Pascal" in the Series Cast
        And I should see the Status as "Returning Series"