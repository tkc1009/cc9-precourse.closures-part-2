/* exported gameGenerator accountGenerator randomInteger */
/*
We've written a few tests for your Game Generator function which you can find them in the 'specs' folder.
By the end of this exercise, you'll be writing tests for the functions yourself.
*/

function randomInteger(n) {
  return Math.floor(Math.random() * (n + 1));
}

function gameGenerator(x) {
  const upperBound = x;
  let numberOfWin = randomInteger(upperBound);
  let numbersOfGuess = [];

  return {
    reset: () => {
      numberOfWin = randomInteger(upperBound);
      let numbersOfGuess = [];
    },
    giveUp: () => {
      reset();
      return numberOfWin;
    },
    guess: (y) => {
      numbersOfGuess.push(y);
      return numberOfWin === y;
    },
    numGuesses: () => {
      return numbersOfGuess;
    }
  }
}

function accountGenerator(initial) {
  let balance = initial;

  return {
    withdraw: function(amount) {
      if (balance - amount >= 0) {
        balance = balance - amount;
        return `Here’s your money: $${amount}`;
      }
      return "Insufficient funds.";
    },
    deposit: function(amount) {
      balance = balance + amount;
      return `Your balance is: $${balance}`;
    }
  };
}
