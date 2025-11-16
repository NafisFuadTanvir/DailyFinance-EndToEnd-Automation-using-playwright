import {Page} from '@playwright/test';
import { UserModel } from '../models/user.model';

export class CreateUser{
    constructor(private page:Page){}

async create(usermodel:UserModel){
await this.page.goto("https://dailyfinance.roadtocareer.net")
await this.page.getByRole("link",{name:"Register"}).click()
await this.page.getByRole("textbox",{name:"First Name"}).fill(usermodel.firstname)
await this.page.getByRole("textbox",{name:"Last Name"}).fill(usermodel.lastname)
await this.page.getByRole("textbox",{name:"Email"}).fill(usermodel.email)
await this.page.getByRole("textbox",{name:"password"}).fill(usermodel.password)
await this.page.getByRole("textbox",{name:"Phone Number"}).fill(usermodel.phone)
await this.page.getByRole("textbox",{name:"Address"}).fill(usermodel.address)
await this.page.getByRole('radio').first().check();
await this.page.getByRole('checkbox').check();
await this.page.getByRole('button', { name: 'Register' }).click();
    }
}