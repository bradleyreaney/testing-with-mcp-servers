# testing-with-mcp-servers

## Playwright-MCP

- Ensure you have 'code' command setup for VS Code - `Command Palette > Shell Command: Install 'code' command in PATH`
- Install the Playwright MCP server - `code --add-mcp '{"name":"playwright","command":"npx","args":["@playwright/mcp@latest"]}'`
- Add the mcp config file - `.vscode > mcp.json`
- Add a prompt file - `.github > prompts > prompt_file_name.prompt.md`
- In copilot, set the following:
  - Agent mode
  - Claude 3.5 Sonnet
  - Give the prompt as context
- Use the following script as an example

Generate a Playwright test for the following scenario:

1. Navigate to https://www.themoviedb.org/
2. search for 'Garfield'
3. verify the movie is in the list

In the search.spec.ts file, add another playwright test for the following scenario:

1. Open the TMDP page
2. Search for 'Mission: Impossible - The Final Reckoning'
3. Verify the user score number
4. Verify the names of the first 5 people listed in the Top Billed Cast

- Decided to find `Mission: Impossible - Dead Reckoning Part One` rather than `Mission: Impossible - The Final Reckoning`
- Verified the score but checking it was >0% and <100% rather than the actual number
- Stuck in a loop because it though i expect th Top Billed Cast to be 5 long rather than getting the first five.
- Stuck in a loop because it though there was an error. All tests were passing. Only thing i think this could be was during the first loop, it added some console.logs for debugging
- Eventually just crashed

One of my tests are failing. Can you help me fix it

- Found and fix the strick mode violation
- Got stuck once again trying to run the command `npx playwright test "verify Mission Impossible movie details" --headed`. Missing the `-g` so should have read `npx playwright test -g "verify Mission Impossible movie details" --headed`
- Left an unnecessary comma in the PO file. Might have found this is it could get past the error in the command above.

SAVED FILE 1

Can you review the steps used in the tests found in 'search.spec.ts'. Remove any that are not unnecessary for the test to run and pass.

- For some reason it now new it needed the `-g` when running individual tests
- Test is now erroring as it expected `0` to be `>0` rather than `>=0`

SAVED FILE 2

One of my tests are failing. Can you help me fix it

- Fixed the issue. Asked it i wanted to run the test to verify the fix but didn't give me the option. Was any to just type `Yes` instead.

SAVED FILE 3

Can you review the steps used in the tests found in 'search.spec.ts'. It's going to `Mission: Impossible - Dead Reckoning Part One` but should be `Mission: Impossible - The Final Reckoning`

Generate a Playwright test based on the following acceptant criteria:

- GIVEN i navigate to https://nimbleapproach.com/
- AND i expand the 'What we do' menu option
- WHEN i click the 'testing' link
- THEN i should verify i've arrived at the 'Software Testing and Quality Assurance' page
- AND i should verify that i see the sub-heading 'Get better software to market quicker. With less hassle, less bugs and more happy customers.'

Generate a Playwright test for the following scenario:

1. Navigate to https://www.themoviedb.org/
2. Search for 'Mission: Impossible - Dead Reckoning Part One'
3. Verify the movie is in the list
4. Open the movie
5. Verify the User Score is 75%
6. Confirm 'Tom Cruise', 'Hayley Atwell' and 'Simon Pegg' are in the Top Billed Cast

Generate a Playwright test for the following acceptance criteria:

Feature: Movie Details Verification

Scenario: Verify "Mission: Impossible - Dead Reckoning Part One" details
Given I navigate to https://www.themoviedb.org/
When I search for "Mission: Impossible - Dead Reckoning Part One"
Then I should see "Mission: Impossible - Dead Reckoning Part One" in the search results
And I open the movie details page for "Mission: Impossible - Dead Reckoning Part One"
Then I should see a User Score of "75%"
And I should see "Tom Cruise", "Hayley Atwell", and "Simon Pegg" in the Top Billed Cast
