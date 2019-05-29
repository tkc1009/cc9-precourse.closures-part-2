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
