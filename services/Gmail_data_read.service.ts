import { request } from "@playwright/test";
import * as dotenv from "dotenv"
dotenv.config();

async function fetchId(){
    const api = await request.newContext({
      baseURL : "https://gmail.googleapis.com", 
      extraHTTPHeaders : {
        "Authorization" : `Bearer ${process.env.gmail_access_token}`
      }
    });


    const response = await api.get("/gmail/v1/users/me/messages");

    let data = await response.json();

    console.log( data )

    let emailID = await data.messages[0].id;

    return emailID;

}

export async function readLatestEmail() {

    const emailId = await fetchId();

    const api = await request.newContext({
      baseURL : "https://gmail.googleapis.com", 
      extraHTTPHeaders : {
        "Authorization" : `Bearer ${process.env.gmail_access_token}`
      }

    })

    console.log( emailId )

       
    const response = await api.get("/gmail/v1/users/me/messages/"+emailId);

    const resJson = await response.json();

    const latestEmail = resJson.snippet ;

    return latestEmail;



    
}