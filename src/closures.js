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
    numberGuesses: () => {
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
      let transaction;
      if (balance - amount >= 0) {
        transaction = {
          type: "withdrawal",
          amount: amount,
          before: balance,
          after: balance - amount,
          status: "approved",
          time: new Date(Date.now())
        }
        balance = balance - amount;
      } else {
        transaction = {
          type: "withdrawal",
          amount: amount,
          before: balance,
          after: balance,
          status: "denied",
          time: new Date(Date.now())
        }
      }
      console.log(transaction);
      transactionHistory.push(transaction);
      return transaction;
    },

    deposit: (amount) => {
      const transaction = {
        type: "deposit",
        amount: amount,
        before: balance,
        after: balance + amount,
        status: "approved",
        time: new Date(Date.now())
      }
      balance = balance + amount;
      transactionHistory.push(transaction);
      console.log(transaction);
      return transaction;
    },

    transactionHistory: (length = 0) => {
      return transactionHistory.slice(-length);
    },

    averageTransaction: () => {
      let depositTotal = 0;
      let depositCount = 0;
      let withdrawalTotal = 0;
      let withdrawalCount = 0;
      const transactionHistory = account.transactionHistory();
      for (let i = 0; i < transactionHistory.length; i++) {
        if (transactionHistory[i].status === "approved") {
          if (transactionHistory[i].type === "deposit") {
            depositTotal = depositTotal + transactionHistory[i].amount;
            depositCount++;
          } else if (transactionHistory[i].type === "withdrawal") {
            withdrawalTotal = withdrawalTotal + transactionHistory[i].amount;
            withdrawalCount++;
          }
        }
      }
      return {
        deposit: depositTotal / depositCount,
        withdrawal: withdrawalTotal / withdrawalCount
      }
    }
  };
  return account;
}
