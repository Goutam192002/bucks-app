### Bucks App - Daily Payouts for Gig Workers

Demo Link: https://bucks-app.herokuapp.com/

A pre-paid card for gig workers. Payments are made after every ride/task completed.

## Architecture
![alt text](https://github.com/Goutam192002/bucks-app/raw/master/architecture.png "Architecture")



## How to test this project?

- Go to https://bucks-app.herokuapp.com/invite.html. Enter your mobile number and name and select a company.
On submitting, the backend creates new user and links him/her to the respective company.

- Go to https://bucks-app.herokuapp.com/. This is the app for gig worker. You can find card details, transactions, balance etc. Enter mobile, verify code, complete kyc to be able to reach home screen.

NOTE:
    -  The login is a bit hacky for now. There's no actual authentication implemented
    -  The app will ask for OTP, but you won't receive an actual OTP. Use this code `454545` to verify yourself. We call it the magic OTP :wink:
  
- Go to https://bucks-app.herokuapp.com/disburse.html. Select the same company, enter the employee id and enter amount.
- Refresh the gig worker app again and balance, transactions should be updated.

Cheers🍻


