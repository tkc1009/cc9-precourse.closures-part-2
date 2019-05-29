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

  const STATUS = {
    APPROVED: 'approved',
    DENIED: 'denied'
  };

  const TYPE = {
    DEPOSIT: 'deposit',
    WITHDRAW: 'withdrawal'
  };

  const processTransaction = (type, amount) => {
    var result = {
      'type': type,
      'amount': amount,
      'before': balance,
      'after': null,
      'status': null,
      'time': new Date()
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

  const transactionHistory = (n) => {
    if(n && typeof n !== 'number')
      return;
    else if(!n || n >= transactions.length)
      return transactions.slice();
    else
      return transactions.slice(0,n);
  }

  const averageTransaction = () => {
    const result = {
      deposit: null,
      withdrawal: null
    };

    const calculateAverage = (arr) => {
      return arr.reduce((total, transaction) => {
          return total + transaction.amount;
      }, 0) / arr.length;
    };

    const deposits = transactions.filter((transaction) => {
      return transaction.type === TYPE.DEPOSIT && transaction.status === STATUS.APPROVED
    });
    const withdrawals = transactions.filter((transaction) => {
      return transaction.type === TYPE.WITHDRAW && transaction.status === STATUS.APPROVED}
    );

    result.deposit = deposits.length ? calculateAverage(deposits) : 0;
    result.withdrawal = withdrawals.length ? calculateAverage(withdrawals) : 0;
    return result;
  };

  return {
    'withdraw': withdraw,
    'deposit': deposit,
    'getBalance': getBalance,
    'transactionHistory': transactionHistory,
    'averageTransaction': averageTransaction
  };
}
