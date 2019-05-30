/* exported gameGenerator accountGenerator randomInteger */
/*
We've written a few tests for your Game Generator function which you can find them in the 'specs' folder.
By the end of this exercise, you'll be writing tests for the functions yourself.
*/

function randomInteger(n) {
  return Math.floor(Math.random() * (n + 1));
}

function gameGenerator(limit) {
  let targetValue = randomInteger(limit);
  let guessCounter = 0;
  const game = {
    reset: () => {
      targetValue = randomInteger(limit);
      guessCounter = 0;
    },
    guess: (guessValue) => {
      guessCounter++;
      return (guessValue === targetValue);
    },
    numGuesses: () => {
      return guessCounter;
    },
    giveUp: () => {
      const oldTargetValue = targetValue;
      game.reset();
      return oldTargetValue;
    }
  }
  return game;
}

function accountGenerator(initial) {
  let balance = initial;
  const transactionHistory = [];
  const account = {
    getBalance: () => {
      return balance;
    },
    withdraw: (amount) => {
      if (balance - amount >= 0) {
        const transaction = {
          type: "withdrawal",
          amount: amount,
          before: balance,
          after: balance - amount,
          status: "approved"
        }
        balance = balance - amount;
        transactionHistory.push(transaction);
        return transaction;
      } else {
        const transaction = {
          type: "withdrawal",
          amount: amount,
          before: balance,
          after: balance,
          status: "denied"
        }
        transactionHistory.push(transaction);
        return transaction;
      }
      
    },
    deposit: (amount) => {
      const transaction = {
        type: "deposit",
        amount: amount,
        before: balance,
        after: balance + amount,
        status: "approved"
      }
      balance = balance + amount;
      transactionHistory.push(transaction);
      return transaction;
    },
    transactionHistory: (length) => {
      return transactionHistory.slice(0, length);
    },
    averageTransaction: () => {
      let total = 0;
      let count = 0;
      const transactionHistory = account.transactionHistory();
      for (let i = 0; i < transactionHistory.length; i++) {
        if (transactionHistory[i].status === "approved") {
          total = total + transactionHistory[i].amount;
          count = count + 1;
        }
      }
      return (total / count);
    }
  };
  return account;
}
