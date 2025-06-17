Feature: Actor Filmography Verification

    Scenario: Verify Anthony Mackie's acting credits from "Captain America: Brave New World"
        Given I am on the "The Movie Database (TMDb)" homepage
        When I search for "Captain America: Brave New World"
        Then I should see "Captain America: Brave New World" in the search results
        And I open the movie details page for "Captain America: Brave New World"
        And I should see "Anthony Mackie" in the Top Billed Cast
        When I click on "Anthony Mackie"
        Then I should see "The Falcon and the Winter Soldier" in his acting credits
        And I should see "The Hurt Locker" in his acting credits