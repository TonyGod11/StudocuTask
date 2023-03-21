# The awesome Q/A tool tested by Playwright and Typescript
## Explanation
For the autotest, we need to determine the area of testing we will do it by  acceptance criterias:

The test should cover these functions - `create questions`, `sort questions`, `delete questions`.

All these tests will be performed by end-to-end test, that is presented in the Tests folder.

### Here are steps for the E2E test with my thoughts:

`BeforeAll` Remove the precreated question

Positive scenario
1. Create 2 new questions (questions and answers are constants)
2. Validate the number of questions is the same as in description (we compare the number of locators with their counter in the left corner)
3. Check that the questions are clickable, the answer is hidden
4. Check the sortability (the sorting is in alphabetical order)
5. delete the created questions

Negative scenario:
1. Try to create new question with empthy field Answer (Console log shows an error - question was not created due to empty field)

## Playright advantages

The main advantage of Playright is the ability to write understandable clear tests with step-by-step descriptions of actions, this allows you to create understandable, reliable tests that are easy to explain to other people in the team.

Playright provides all the features out of the box, there is no need to install separate plugins, libraries, etc. (in this case, I added an allure report, but this is not necessary at all)
   
The methods and locators represent in Page folder as a Page Model Object

The most important file is the `playwright.config.ts` where you can -
- set timeouts
- set `Baseurl` for all tests
- combine tests runs into `projects`, e.g. integration tests, e2e tests, API tests
- set сonditions for `parallelization` tests - the number of workers and number of repeats
- set `browsers` can be used for testing (this test uses 3 different browsers for each test)
- create reports for different tasks I added `json` report for easy integration with instant messengers (slack, microsoft team), `Allure` report for reporting integration in e.g. Jenkins, added `xml` format of report for PMs and other managers
- In case of failure, a `screenshot` of the moment of failure will be created

## Setup and run

1. Clone the repository

2. Install playwright by command -
 ```bash 
 npm init playwright@latest
 ```
 
3. Install Allure by command -
 ```bash 
npm i -D @playwright/test allure-playwrite
```

4. Run tests by command:
```bash
npx playwright test
```
5. Go to output Folder: 

There will be presented all reports
