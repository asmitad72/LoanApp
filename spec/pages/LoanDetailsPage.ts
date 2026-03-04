import {Page} from "@playwright/test";

export class LoanDetailsPage {
    readonly amount;
    readonly monthlyPayment;
    readonly period;
    readonly name;
    readonly language;
    readonly continueButton;

    constructor(page: Page) {
        this.amount = page.getByTestId('final-page-amount');
        this.monthlyPayment = page.getByTestId('final-page-monthly-payment');
        this.period = page.getByTestId('final-page-period');
        this.name = page.getByTestId('final-page-full-name');
        this.language = page.getByTestId('final-page-communication-language');
        this.continueButton = page.getByTestId('final-page-continue-button');
    }
}