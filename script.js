'use strict';

/////////////////////////////////////////////////
/////////////////////////////////////////////////
// BANKIST APP

// Data
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

const accounts = [account1, account2, account3, account4];

// Elements
const labelWelcome = document.querySelector('.welcome');
const labelDate = document.querySelector('.date');
const labelBalance = document.querySelector('.balance__value');
// const labelSumIcon = document.querySelector('.summary__value');
const labelSumIn = document.querySelector('.summary__value--in');
const labelSumOut = document.querySelector('.summary__value--out');
const labelSumInterest = document.querySelector('.summary__value--interest');
const labelTimer = document.querySelector('.timer');

const containerApp = document.querySelector('.app');
const containerMovements = document.querySelector('.movements');

const btnLogin = document.querySelector('.login__btn');
const btnTransfer = document.querySelector('.form__btn--transfer');
const btnLoan = document.querySelector('.form__btn--loan');
const btnClose = document.querySelector('.form__btn--close');
const btnSort = document.querySelector('.btn--sort');

const inputLoginUsername = document.querySelector('.login__input--user');
const inputLoginPin = document.querySelector('.login__input--pin');
const inputTransferTo = document.querySelector('.form__input--to');
const inputTransferAmount = document.querySelector('.form__input--amount');
const inputLoanAmount = document.querySelector('.form__input--loan-amount');
const inputCloseUsername = document.querySelector('.form__input--user');
const inputClosePin = document.querySelector('.form__input--pin');

// Creating userName for all the above user.
const assiningUserName = function (account) {
  account.forEach(customer => {
    const user = customer.owner;
    // console.log(user);
    const userName = user
      .toLowerCase()
      .split(' ')
      .map(el => el[0])
      .join('');

    customer['userName'] = userName;
  });
};
assiningUserName(accounts);

// Implementing login.
let user;
let originalMovement;
let timerId;
const login = function (acnt, username, password) {
  // find account for which this username belongs to.
  user = acnt.find(account => account.userName === username);
  originalMovement = [...user.movements];
  if (user?.pin === Number(password)) {
    // display uI and message.
    containerApp.style.opacity = 100;
    welcomeMsg(user);

    // display movements, balance, summary.
    updateUi(user);

    // update timer.
    if(timerId){
      clearTimeout(timerId);
    }
    updateTimer(user);

    inputLoginUsername.value = inputLoginPin.value = ''; // set to empty string, so disapper.

    // removing the focus from the login buttion and form.
    inputLoginPin.blur();
  }
};

btnLogin.addEventListener('click', function (event) {
  event.preventDefault();
  // pass the data of username, pin.
  login(accounts, inputLoginUsername.value, inputLoginPin.value);
});

// Showing welcome message to user.
const welcomeMsg = user => {
  labelWelcome.textContent = `Welcome back, ${user.owner.split(' ')[0]}`;
};

// Displaying the movements of account.
const displayMovements = function (mov, doSort = false) {
  containerMovements.innerHTML = '';

  const movements = doSort ? [...mov].sort((a, b) => a - b) : mov;

  // add a new row for each movements.
  movements.forEach(function (element, idx) {
    const type = element > 0 ? 'deposit' : 'withdrawal';
    const row = `<div class="movements__row">
            <div class="movements__type movements__type--${type}">${
      idx + 1
    } ${type}</div>
            <div class="movements__value"><i class="fa-solid fa-indian-rupee-sign"></i>${Math.abs(
              element
            )}</div>
          </div>`;

    containerMovements.insertAdjacentHTML('afterbegin', row);
  });
};

// Showing the balance of the user.
const showBalance = function (user) {
  // const balance = user.movements.reduce((acc, val) => acc + val, 0);
  // return balance;
  labelBalance.innerHTML = `<i class="fa-solid fa-indian-rupee-sign"></i>${user.movements.reduce(
    (acc, val) => acc + val,
    0
  )}`;
};

// Summary part of account.
const showSummary = function (user) {
  // insering the rupee icon in summary in.
  labelSumIn.innerHTML = '';
  const iconIn = `<i class="fa-solid fa-indian-rupee-sign"></i>`;
  // labelSumIn.insertAdjacentHTML('afterbegin',iconIn);
  labelSumIn.innerHTML = iconIn;

  const totalDeposit = user.movements
    .filter(val => val > 0)
    .reduce((acc, val) => acc + val, 0);
  labelSumIn.insertAdjacentHTML('beforeend', `${totalDeposit}`);

  // insering the rupee icon in out.
  labelSumOut.innerHTML = '';
  labelSumOut.innerHTML = iconIn;

  const totalWithdraw = user.movements
    .filter(val => val < 0)
    .reduce((acc, val) => acc + val, 0);
  labelSumOut.insertAdjacentHTML('beforeend', `${Math.abs(totalWithdraw)}`);

  // interest part.
  // inserting icon to interest.
  labelSumInterest.innerHTML = '';
  labelSumInterest.innerHTML = iconIn;

  // displaying interest.
  const interest = user.movements
    .filter(val => val > 0)
    .map(val => (val * user.interestRate) / 100)
    .reduce((acc, val) => acc + val, 0);

  labelSumInterest.insertAdjacentHTML('beforeend', `${interest}`);
};

// Update ui functionality for user.
const updateUi = function (user) {
  // show balance
  showBalance(user);
  // show movements
  displayMovements(user.movements);
  // show summary.
  showSummary(user);
};

// Request a loan than must add to the account.
btnLoan.addEventListener('click', function (event) {
  event.preventDefault();
  const loanAmount = Number(inputLoanAmount.value);
  const isEligible = user.movements
    .filter(val => val > 0)
    .some(val => val > loanAmount * 0.1);
  // .find(val => val > 0.1 * loanAmount);
  console.log(isEligible);
  if (isEligible) {
    user.movements.push(loanAmount);
    updateUi(user);
  }
  inputLoanAmount.value = '';
});

// Transfer functionality.
btnTransfer.addEventListener('click', function (event) {
  event.preventDefault();
  const userTransfer = inputTransferTo.value;
  const amount = Number(inputTransferAmount.value);

  const crntBalance = labelBalance.value;

  const receiverAcc = accounts.find(acc => acc.owner === userTransfer);

  inputTransferTo.value = inputTransferAmount.value = '';
  if (
    amount > 0 &&
    receiverAcc &&
    receiverAcc?.owner !== user.owner &&
    crntBalance >= Number(amount)
  ) {
    // then only transfer.
    // 2. Add negative movement to crnt user.
    user.movements.push(-1 * amount);

    // 3. Add (+)ve movement to transfered user.
    receiverAcc.movements.push(amount);

    // 4. Show the movements, summary, balance.
    updateUi(user);
  }
});

// Close Account functionality.
btnClose.addEventListener('click', function (event) {
  event.preventDefault(); // to stop page to reload.

  if (
    user.userName === inputCloseUsername.value &&
    user.pin === Number(inputClosePin.value)
  ) {
    const idx = accounts.findIndex(
      acc =>
        acc.userName === inputCloseUsername.value &&
        acc.pin == Number(inputClosePin.value)
    );
    // deleting user.
    accounts.splice(idx, 1);
    // Hide UI
    containerApp.style.opacity = 0;
  }
  // clear input block
  inputCloseUsername.value = inputClosePin.value = '';
});

// sorting functionality
let doSort = false;
btnSort.addEventListener('click', function (event) {
  event.preventDefault();
  // use the simple trick, that we use the display movements methods only to show the sorted movements.

  displayMovements(user.movements, !doSort);
  doSort = !doSort;
});

// when the user logged in then after we need to update the timer also.
function updateTimer() {
  if (user) {
    // if user exist menas we have logged in.
    // then immediately need to start the timer
    // console.log(labelTimer);
    let a = 1;
    let b = 60;
    x();
    function x() {
      if (b == 0) {
        a--;
        b = 59;
      } else {
        b--;
      }
      // console.log(`a: ${a}, b: ${b}`);
      labelTimer.innerHTML = `0${a}:${b == 0 ? '00' : b}`;
      if (a == 0 && b == 0) {
        containerApp.style.opacity = '0';
      }
      timerId = setTimeout(x, 1000);
    }
    
  }
}
