import { expect, Page } from '@playwright/test'

export class qaPage {

  readonly sortButton = this.page.locator('button:has-text("Sort questions")')
  readonly removeButton = this.page.locator('button:has-text("Remove questions")')
  readonly createButton = this.page.locator('button:has-text("Create question")')
  readonly numQuestions = this.page.locator('//div[@class="sidebar"]')
  readonly infoMessage = this.page.locator('//div[@class="alert alert-danger"]')
  readonly questionField = this.page.locator('[id=question]')
  readonly countBoard = this.page.locator('//li')
  readonly answerBoard = this.page.locator('//li[1]/p')
  readonly questionBoard = this.page.locator('//li[1]/div')
  readonly answerField = this.page.locator('[id=answer]')

  constructor(private readonly page: Page) {}

  async goto(route = '/') {
    await this.page.goto(route, { timeout: 30 * 1000 })
  }

async createNewQuestion(question: string, answer: string) {
  await this.questionField.fill(question);
  await this.answerField.fill(answer);
  await this.createButton.click();
  const questionCount = await this.countBoard.count();

  if (questionCount <= 0) {
    console.error(`Error: question was not created due to empty field. Question count: ${questionCount}`);
  }
}

  async validateNumberOfQuestions() {
    const text = await this.numQuestions.innerText()
    const num1 = parseInt(text.match(/\d+/g)[0])
    await expect(this.page.locator('//ul/li')).toHaveCount(num1)
  }

  async validateFirstQuestion(firstQuestion: string, firstAnswer: string) {
    await expect(this.questionBoard).toHaveText(firstQuestion)
    await expect(this.answerBoard).toHaveText(firstAnswer)
  }
  async openFirstQuestion() {
    await expect(this.answerBoard).toBeHidden()
    await expect(this.questionBoard).toBeVisible()
    await this.questionBoard.click()
    await expect(this.answerBoard).toBeVisible()
  }
  async removeQuestions() {
    await this.removeButton.click()
    await expect(this.infoMessage).toHaveText('No questions yet :-(')
  }
  async sortQuestions() {
    await this.sortButton.click()
  }
}

