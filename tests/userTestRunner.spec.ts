import {test, expect,Page} from '@playwright/test';
import {CreateUser} from '../page/CreateUser';
import {Loginpage} from '../page/Loginpage';
import {UserModel} from '../models/user.model';
import { faker } from "@faker-js/faker";
import { generateRandomNumber, saveJsonData, getLastUser,saveTableData } from "../utils/utils";
import { AddItem } from '../page/AddItem';
import { readLatestEmail } from "../services/Gmail_data_read.service";
let page: Page

test.beforeAll(async ({ browser }) => {
    page = await browser.newPage();
});

test.afterAll(async () => {
    await page.close();
});

test("user can register successfully", async () => {
const { faker } = await import("@faker-js/faker");
const user= new CreateUser(page);
 
const userData:UserModel={
firstname: faker.person.firstName(),
lastname:faker.person.lastName(),
  email: `nafisf026+${generateRandomNumber(1000, 9999)}@gmail.com` ,
  password: "1234",
  phone: `0132${generateRandomNumber(1000000,999999)}`,
  address: faker.location.streetAddress()
}

await user.create(userData);

saveJsonData(userData,'./resources/users.json')

await page.waitForTimeout(5000);

    let latestEmail = await readLatestEmail();
    console.log(latestEmail);

    expect( latestEmail ).toContain("Welcome to our platform");



})

test("login newly created user", async () =>{

const loginpage= new Loginpage(page)
const userData=getLastUser("./resources/users.json")
await loginpage.login(userData.email,userData.password)
await expect(page).toHaveURL(/https:\/\/dailyfinance\.roadtocareer\.net\/user/);


})


test("add two items store the table value in text file", async () => {

  const item= new AddItem(page);
  await item.additem('laptop','1500','2024-06-10','work');
  await item.additem('phone','800','2024-06-11','personal')

  await page.waitForSelector("table tbody tr");
 const rows = page.locator("table  tbody tr");
const rowCount = await rows.count();

let tableText = "";

for (let i = 0; i < rowCount; i++) {
  const row = rows.nth(i);
  const cells = row.locator("td");
  const cellCount = await cells.count();

  let rowData = "";

  for (let j = 0; j < cellCount; j++) {
    const cellText = await cells.nth(j).innerText();
    rowData += cellText.trim() + " | ";
  }

  tableText += rowData + "\n";
}



saveTableData(tableText, "./resources/tableData.txt");
    console.log(tableText);


})

test("logout user", async () =>{
await page.getByRole('button', { name: 'account of current user' }).click();
await page.getByRole('menuitem', { name: 'Logout' }).click();
    await page.pause();
})