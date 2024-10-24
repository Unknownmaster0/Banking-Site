# Bankist App

## Description
**Bankist App** is a simple banking application that enables users to perform essential banking operations, such as transferring money, requesting loans, closing accounts, viewing balances, and checking transaction history. The app prioritizes security by automatically logging users out after 5 minutes of inactivity.

### Features
- **User Authentication**: Users log in using their username (the first letter of their name in lowercase) and a PIN.
- **Transfer Money**: Users can send money to other users by selecting the recipient and the amount.
- **Get a Loan**: Users can request a loan if their transaction history demonstrates a balance transaction exceeding 10% of the loan amount.
- **Close Account**: Users have the option to close their bank accounts if desired.
- **Display Balance**: Users can easily view their current account balance.
- **Transaction History**: Users can access a complete history of their transactions.
- **Auto Logout**: The application logs users out automatically after 5 minutes of inactivity for enhanced security.

### User Data
The app contains predefined data for four users:

```javascript
const account1 = {
  owner: 'Sagar Singh',
  movements: [200, 450, -400, 3000, -650, -130, 70, 1300],
  interestRate: 1.2, // %
  pin: 1111,
};

const account2 = {
  owner: 'Raja Kumar',
  movements: [5000, 3400, -150, -790, -3210, -1000, 8500, -30],
  interestRate: 1.5,
  pin: 2222,
};

const account3 = {
  owner: 'Pratham Raj',
  movements: [200, -200, 340, -300, -20, 50, 400, -460],
  interestRate: 0.7,
  pin: 3333,
};

const account4 = {
  owner: 'Satyanshu Satyam',
  movements: [430, 1000, 700, 50, 90],
  interestRate: 1,
  pin: 4444,
};
```
## User Login
- To log in, users must enter:

  1. Username: The first letter of their name in lowercase (e.g., for "Sagar Singh," the username is ss).
  2. PIN: The assigned numeric PIN.
  3. Gameplay Example
  4. Transfer Money: User1 can send an amount to User2.
  5. Loan Request: If User1 has a transaction that exceeds 10% of the desired loan amount, they can apply for a loan.
  6. Account Closure: Users can choose to close their accounts at any time.
  7. Timer: Users have a security timer of 5 minutes while logged in.

## How to Run
No installation is required as this is a simple static website. To view the effect:
1. Clone the project.
2. Open the `index.html` file in your browser.

## Technologies Used
- HTML
- CSS
- JavaScript

## Author
Sagar Singh
