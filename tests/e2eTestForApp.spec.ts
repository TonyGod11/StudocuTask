import { test, Page } from '@playwright/test'
import { qaPage } from '../pages/qaPage'

const question1 = 'Love belongs to ...'
const question2 = 'An apple has a form of ...'
const answer1 = 'everyone'
const answer2 = 'circle'

let page: Page
let QAPage: qaPage

test.describe('Functionality check of application of The awesome Q/A tool', () => {
  test.beforeAll(async ({ browser }) => {
    page = await browser.newPage()
    QAPage = new qaPage(page)
    QAPage.goto()
    await QAPage.removeQuestions()
  })

  test('Positive test covers main functions of app - create, sort, remove', async () => {
    await test.step('Create 2 questions', async () => {
      await QAPage.createNewQuestion(question1, answer1)
      await QAPage.createNewQuestion(question2, answer2)
      await QAPage.validateNumberOfQuestions()
    })

    await test.step('Open first created question', async () => {
      await QAPage.openFirstQuestion()
      await QAPage.validateFirstQuestion(question1, answer1)
    })

    await test.step('Sort questions', async () => {
      await QAPage.sortQuestions()
      await QAPage.validateFirstQuestion(question2, answer2)
    })

    await test.step('Delete questions', async () => {
      await QAPage.removeQuestions()
    })
  })
    test('Negative test covers scenario with empty Answer field', async () => {
      await test.step('Create 2 questions', async () => {
        await QAPage.createNewQuestion(question2, '')
      })
    })
})