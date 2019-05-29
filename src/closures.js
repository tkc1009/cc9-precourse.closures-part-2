/* exported gameGenerator accountGenerator randomInteger */
/*
We've written a few tests for your Game Generator function which you can find them in the 'specs' folder.
By the end of this exercise, you'll be writing tests for the functions yourself.
*/

function randomInteger(n) {
  return Math.floor(Math.random() * (n + 1));
}

function gameGenerator(upper) {
  let answer = randomInteger(upper);
  let guesses = 0;

  return {
    answer: answer,
    
    reset: function reset() {    
    guesses = 0;
    answer = randomInteger(upper);
  },

    giveUp: function giveUp() {
      console.log(`The answer is ${answer}`);
      reset();
    },

    guess: function guess(guess) {
      guesses++;
      return guess === this.answer;
    },

    numGuesses: function numGuesses() {
      return guesses;
    }
  }
};

class Transaction {
  constructor(type, amount, before, after, status) {
    this.type = type;
    this.amount = amount;
    this.before = before;
    this.after = after;
    this.status = status;
  }
}

function accountGenerator(initial) {
  let balance = initial;
  let history = [];
  let averages = {withdrawal: [], deposit: []};
  
  return {
    balance: initial,
    history: history,
    withdraw: function(amount) {
      const transaction = new Transaction('withdrawal', amount, balance);
      if (balance - amount >= 0) {
        balance -= amount;
        transaction.after = balance;
        transaction.status = 'approved';
        averages.withdrawal.push(transaction.amount);
      } else {
        transaction.after = balance;
        transaction.status = 'denied';
      }
      history.push(transaction);
      return transaction;
    },
    deposit: function(amount) {
      const transaction = new Transaction('deposit', amount, balance, balance + amount, 'approved');
      balance = balance + amount;
      history.push(transaction);
      averages.deposit.push(transaction.amount);
      return transaction;
    },
    getBalance: function() {
      return balance;
    },
    transactionHistory: function() {
      return history;
    },
    averageTransaction: function() {
      return [averages.deposit.reduce((a, b) => {
        return a + b;
      }) / averages.deposit.length, averages.withdrawal.reduce((a, b) => {
        return a + b;
      }) / averages.withdrawal.length]
    }
  };
}

const testAccount = accountGenerator(500);
console.log(testAccount.balance);
testAccount.withdraw(10);
testAccount.withdraw(15);
testAccount.withdraw(19);
testAccount.withdraw(27);
testAccount.withdraw(13);
testAccount.deposit(200);
testAccount.withdraw(45);
testAccount.withdraw(643);
testAccount.deposit(100);
testAccount.withdraw(23);
console.log(testAccount.averageTransaction());