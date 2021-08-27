### Bucks App - Daily Payouts for Gig Workers

Demo Link: https://bucks-app.herokuapp.com/

A pre-paid card for gig workers. Payments are made after every ride/task completed.

## How does this work?
Head over to: https://docs.google.com/presentation/d/1yTTV94cpBeL7XJQanr1nK8AfEg0iZtKy_5LqNlgJaY0/edit?usp=sharing

## How to test this project?

- Go to https://bucks-app.herokuapp.com/invite.html. Enter your mobile number and name and select a company.
On submitting, the backend creates new user and links him/her to the respective company. Save the `_id` field value for future use. (Needed for making a disbursal)

- Go to https://bucks-app.herokuapp.com/. This is the app for gig worker. You can find card details, transactions, balance etc. Enter mobile, verify code, complete kyc to be able to reach home screen.

NOTE:
    -  The login is a bit hacky for now. There's no actual authentication implemented
    -  The app will ask for OTP, but you won't receive an actual OTP. Use this code `454545` to verify yourself. We call it the magic OTP :wink:
  
- Go to https://bucks-app.herokuapp.com/disburse.html. Select the same company, enter the employee id you received earlier and enter amount. In real world scenario, the client would make an API call to bucks API.
  
- Refresh the gig worker app again and balance, transactions should be updated.


## How to run this project?

- Clone this repo.
- Open up your terminal and run this command `cd bucks-app`
- Run `npm install`
- In one tab, run `node index.js` , this command starts the nodejs server
- In seperate tab run `webapck`, this command builds the react app. If you want to run in watch mode add option `--watch`
- In browser, browse to http://localhost:3000

Cheers🍻


## Why we used what we used?

Web - We wanted to able to demo something without having the user to install an APK
MongoDB - Say goodbye to painful migrations. We had to change the schemas frequenty because we didn't know how to go about it.
Node.js - Just one language for both backend and frontend..minimal complexity


