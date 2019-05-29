/* exported gameGenerator accountGenerator randomInteger */
/*
We've written a few tests for your Game Generator function which you can find them in the 'specs' folder.
By the end of this exercise, you'll be writing tests for the functions yourself.
*/

function randomInteger(n) {
  return Math.floor(Math.random() * (n + 1));
}

function gameGenerator(upperBound) {
  let secretNumber = randomInteger(upperBound || 10);
  let totalGuesses = 0;

  const guess = (n) => {
    totalGuesses++;
    if(n === secretNumber)
      return true;
    else
      return false;
  };
  const reset = () => {
    secretNumber = randomInteger(upperBound);
    totalGuesses = 0;
  };

  const giveUp = () => {
    let result = secretNumber;
    reset();
    return result;
  };

  const numGuesses = () => totalGuesses;

  return {
    'guess': guess,
    'reset': reset,
    'giveUp': giveUp,
    'numGuesses': numGuesses
  };
}
function accountGenerator(initial) {
  let balance = initial;
  const transactions = [];

  STATUS = {
    APPROVED: 'approved',
    DENIED: 'denied'
  };

  TYPE = {
    DEPOSIT: 'deposit',
    WITHDRAW: 'withdrawal'
  };

  const processTransaction = (type, amount) => {
    var result = {
      'type': type,
      'amount': amount,
      'before': balance,
      'after': null,
      'status': null
    };

    if(type === TYPE.DEPOSIT) {
      balance = balance + amount;
      result.after = balance;
      result.status = STATUS.APPROVED;
    }

    if(type === TYPE.WITHDRAW) {
      if (balance - amount >= 0) {
        balance = balance - amount;
        result.after = balance;
        result.status = STATUS.APPROVED;
      }  else {
        result.after = balance;
        result.status = STATUS.DENIED;
      }
    }

    transactions.push(result);
    return result;
  };

  const withdraw = (amount) => {
    const result = processTransaction(TYPE.WITHDRAW, amount);
    return result;
  };

  const deposit = (amount) => {
    const result = processTransaction(TYPE.DEPOSIT, amount);
    return result;
  };

  const getBalance = () => balance;

  const transactionHistory = () => transactions;

  return {
    'withdraw': withdraw,
    'deposit': deposit,
    'getBalance': getBalance,
    'transactionHistory': transactionHistory
  };
}
