import { Page } from '@playwright/test';

export class Loginpage {
    constructor(private page: Page) { }

    async login(email: string, password: string) {
       await this.page.goto("https://dailyfinance.roadtocareer.net") 
        await this.page
            .getByRole("textbox", { name: "Email" })
            .fill(email);
        await this.page.getByRole("textbox", { name: "Password" }).fill(password);
        await this.page.getByRole("button", { name: "LOGIN" }).click();
        
    }

}