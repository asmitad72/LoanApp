import {Page} from "@playwright/test";

export class ApplicationPage {
    readonly amountInput;
    readonly applyButton;
    readonly durationDropdown;
    readonly errorMessage ;
    readonly monthlyPayment;
    readonly applyForLoanButton;
    constructor(page: Page) {
        this.amountInput = page.getByTestId('id-small-loan-calculator-field-amount');
        this.applyButton = page.getByTestId('id-small-loan-calculator-field-apply');
        this.durationDropdown = page.getByTestId('ib-small-loan-calculator-field-period');
        this.errorMessage = page.getByTestId('id-small-loan-calculator-field-error');
        this.monthlyPayment = page.getByTestId('ib-small-loan-calculator-field-monthlyPayment');
        this.applyForLoanButton = page.getByTestId('id-image-element-button-image-1');
    }
}