## Daily Finance Automation Project
This is an end-to-end Playwright automation project for testing the Daily Finance:- https://dailyfinance.roadtocareer.net/
web application. The project automates user registration, login, item management, password reset, profile image upload, and CI/CD setup.

## Project Overview
The automated workflow covers:
i) Register a new user

ii) Assert the congratulation mail received

iii) Save the user info to a JSON file

iv) Login with the new user and assert /user persists in URL

v) Add 2 items, store the table values in a TXT file, and logout

vi) Now reset your password. Set new password from the email

vii) Login again and upload a profile image and update. Image size should not be longer than 100KB. If upload is not successful, manually verify the upload and use the image for upload automation

viii) Assert the img src contains this text "profileImage" to verify image is uploaded successfully

ix) Configure CI/CD pipeline and create a cronjob in playwright.yml so that it runs once every Friday at 11:59 PM

## Tech Used

Node.js, Playwright, TypeScript, Page Object Model (POM),Gmail Api service,Faker.js (for generating random user data)

## Installation & Setup

-> Clone the repository : git clone Repo link

-> Install dependencies: npm install

-> Install Playwright browsers: npx playwright install

-> How to Run Tests? npx playwright test

## Notes

i) Ensure that the profile image for upload is ≤100KB.

ii) Emails are read programmatically using the Gmail service for verification

## Result
<img width="1467" height="712" alt="image" src="https://github.com/user-attachments/assets/8d985df8-6229-4865-abc2-b8f687da2c02" />

## Vedio Demonastration

https://drive.google.com/drive/folders/12HFpJ46QrYAbKSZloLzMRZu9K6_8Luky?dmr=1&ec=wgc-drive-globalnav-goto

