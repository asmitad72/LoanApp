import { test, expect } from '@playwright/test';
import {ApplicationPage} from "./pages/ApplicationPage";
import {LoginPage} from "./pages/LoginPage";
import {LoanDetailsPage} from "./pages/LoanDetailsPage";

let applicationPage: ApplicationPage;
test.beforeEach(async ({ page }) => {
    await page.goto('');
    applicationPage = new ApplicationPage(page);
})
test.describe('Apply for load with invalid data',()=>{
    const scenarios = [{ amount: '0'}, { amount: '-1000' }, { amount: '20000' }];
    for (const scenario of scenarios) {
        const amount=scenario.amount;
        test(  `Apply with "${amount}" as amount`, async ({ page }) => {
            // await page.goto('');
            // const applicationPage = new ApplicationPage(page);
            await applicationPage.amountInput.fill(amount);

            await expect(applicationPage.errorMessage).toBeVisible();
            await expect(applicationPage.errorMessage).toHaveText('Oops, something went wrong');
        });
    }
})

test.describe('Apply for loan with valid data', () => {
    const scenarios = [
        { amount: '1000', duration: '24', language: 'Estonian' },
        { amount: '2000', duration: '20', language: 'English' },
        { amount: '5000', duration: '36', language: 'Russian' },
    ];

    for (const scenario of scenarios) {
        const amount = scenario.amount;
        const duration = scenario.duration;
        const language = scenario.language;

        test(`Apply for "${amount}" loan for ${duration} months`, async ({ page }) => {
            // await page.goto('');
            // const applicationPage = new ApplicationPage(page);
            await applicationPage.amountInput.fill(amount);
            await applicationPage.durationDropdown.selectOption(duration);
            await expect(applicationPage.errorMessage).toBeHidden();
            await expect(applicationPage.monthlyPayment).toBeVisible()
            await applicationPage.applyButton.click();

            const loginPage = new LoginPage(page);
            await loginPage.login('test','test');

            const loanDetailsPage=new LoanDetailsPage(page);
            await expect(loanDetailsPage.amount).toHaveText(`${amount} €`);
            await expect(loanDetailsPage.period).toHaveText(`${duration} months`);
            await expect(loanDetailsPage.monthlyPayment).toBeVisible();
            await expect(loanDetailsPage.name).toBeVisible()

            await loanDetailsPage.language.selectOption(language);
            await loanDetailsPage.continueButton.click();
        });
    }
})

test('Viewport validation', async ({ page }) => {
    await expect(applicationPage.applyForLoanButton).not.toBeInViewport();
})

//loan application page scrolling
test('Loan application page scroll', async ({ page }) => {
    await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
    await expect(applicationPage.applyForLoanButton2).toBeVisible();
    await expect(applicationPage.applyForLoanButton2).toBeInViewport();
})

//loan application page slider
test('loan amount slider test', async ({ page }) => {
    const amountSlider = page.getByTestId('id-small-loan-calculator-field-amount-slider');
    // Move slider to 500 (minimum)
    await amountSlider.fill('500');
    // Move slider to 5000 (middle)
    await amountSlider.fill('5000');
    // Move slider to 10000 (maximum)
    await amountSlider.fill('10000');
});

