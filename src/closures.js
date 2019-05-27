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

const game = gameGenerator(4);
for (let i = 0; i < 5; i++) {
  console.log(game.guess(i));
}