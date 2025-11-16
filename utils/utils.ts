import fs from "fs";
import { UserModel } from '../models/user.model'
import { test, request } from "@playwright/test";

export function generateRandomNumber(min:number,max:number):number{

    const randomNumber= Math.random()*(max-min)+min
    return Math.floor(randomNumber)

}

export function saveJsonData(jsonObject: object, fileUrl: string): void {
  let dataArray: object[] = [];
  
  if (fs.existsSync(fileUrl)) {
    const fileContent = fs.readFileSync(fileUrl, 'utf-8');
    dataArray = JSON.parse(fileContent);
  }
  
  dataArray.push(jsonObject);
  fs.writeFileSync(fileUrl, JSON.stringify(dataArray, null, 2), 'utf-8');
}

export function getLastUser(fileUrl:string):UserModel{
  const fileContent= fs.readFileSync(fileUrl,'utf-8')
  let dataArray= JSON.parse(fileContent)
  return dataArray[dataArray.length-1]

}

export function saveTableData(tableText: string, fileUrl: string): void {
  try {
    let content = "";
    if (fs.existsSync(fileUrl)) {
      content = fs.readFileSync(fileUrl, "utf-8");
    }
    content += tableText + "\n";
    fs.writeFileSync(fileUrl, content, "utf-8");
    console.log(`Table data saved successfully to ${fileUrl}`);
  } catch (err) {
    console.error("Error saving table data:", err);
  }
}

async function fetchID() {
    const api = await request.newContext({
      baseURL: 'https://gmail.googleapis.com',
      extraHTTPHeaders: {
        "Accept" : "*/*",
        "Content-Type" : "application/json",
        "Authorization" : `Bearer ${process.env.google_access_token}`,
      }
    });
  
    const response = await api.get("/gmail/v1/users/me/messages");
    const data = await response.json();
  
    const emailID = data.messages[0].id;
  
    return emailID;
  }
  

export  async function fetchEmail() {
    
    const emailId = await fetchID();
   console.log(typeof(emailId));
    const api = await request.newContext({
      baseURL: 'https://gmail.googleapis.com',
      extraHTTPHeaders: {
        "Accept" : "*/*",
        "Content-Type" : "application/json",
        "Authorization" : `Bearer ${process.env.google_access_token}`
      }
    });
  
    const response = await api.get("/gmail/v1/users/me/messages/"+ emailId);
    const resJson = await  response.json();
    const latestEmail = resJson.snippet
    return latestEmail;
  }