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
    this.answer = randomInteger(upper);
  },

    giveUp: function giveUp() {
      let old = this.answer;
      guesses = 0;
      this.reset();
      return old;
    },

    guess: function guess(guess) {
      guesses++;
      return guess === this.answer;
    },

    numberGuesses: function numberGuesses() {
      return guesses;
    }
  }
};

class Transaction {
  constructor(type, amount, before, after, status, time) {
    this.type = type;
    this.amount = amount;
    this.before = before;
    this.after = after;
    this.status = status;
    this.time = Date.now();
  }
}

function accountGenerator(initial) {
  let balance = initial;
  let history = [];
  let averages = {withdrawal: [], deposit: []};
  
  return {
    balance: balance,
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
      return {deposit: averages.deposit.reduce((a, b) => {
        return a + b;
      }) / averages.deposit.length, withdrawal: averages.withdrawal.reduce((a, b) => {
        return a + b;
      }) / averages.withdrawal.length}
    }
  };
}