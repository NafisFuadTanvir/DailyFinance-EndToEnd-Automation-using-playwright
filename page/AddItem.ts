import { Page } from '@playwright/test';

export class AddItem {
    constructor(private page: Page) { }

    async additem(itemname: string, itemamount: string,PurchaseDate:string,remarks:string) {

        await this.page.getByRole('button', { name: 'Add Cost' }).click();
        await this.page.getByRole('textbox', { name: 'Item Name' }).fill(itemname);
        await this.page.getByRole('button', { name: '+' }).click();
        await this.page.getByRole('spinbutton', { name: 'Amount' }).fill(itemamount);
        await this.page.getByRole('textbox', { name: 'Purchase Date' }).fill(PurchaseDate);
        await this.page.getByRole('textbox', { name: 'Remarks' }).fill(remarks);
        this.page.once('dialog', dialog => {
            console.log(`Dialog message: ${dialog.message()}`);
            dialog.dismiss().catch(() => { });
        });
        await this.page.getByRole('button', { name: 'Submit' }).click();

    }

}