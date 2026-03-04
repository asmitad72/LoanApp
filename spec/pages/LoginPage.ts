import {Page} from "@playwright/test";

export class LoginPage {
    readonly usernameInput;
    readonly passwordInput;
    readonly continueButton;

    constructor(page: Page) {
        this.usernameInput = page.getByTestId('login-popup-username-input');
        this.passwordInput = page.getByTestId('login-popup-password-input');
        this.continueButton = page.getByTestId('login-popup-continue-button');
    }

    async login(username: string, password: string) {
        await this.usernameInput.fill(username);
        await this.passwordInput.fill(password);
        await this.continueButton.click();
    }
}