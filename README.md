# Precourse: Closures Part 2

## Objectives

By the end of this assignment, you should be able to:

- Create tests
- Understand test syntax
- Pass the tests you write
- Predict the values of variables within closure scopes through multiple invocations

### Exercises

Now that you've written some closures and have passed some tests we created for you, you'll gain some practice writing unit tests alongside regular code.

✅ This assignment will start you off with tests and then give you a chance to write them.

### Getting Started

- These tests will be found in `specs/tests.js` and can be run by opening up `SpecRunner.html` in your browser.

### Basic Requirements

- [ ] `gameGenerator`: Below is some very basic code for a guessing game. Let's make it more complex using closures. `gameGenerator` should create guessing games using closures so you can make multiple games. Remember to write your tests. Your game should:

  - [ ] take a number input that provides the 'upper bound' (limit)
  - [ ] generate a random number between 0 and the upper bound
  - [ ] have a method `reset` that resets the game (new winning number, reset guesses, same upper bound)
  - [ ] have a method `giveUp` that returns the correct number and resets the game
  - [ ] have a method `guess` that allows you to guess the number and returns true or false if the guess is right or wrong
  - [ ] keep track of how many guesses have been made
  - [ ] have a method `numGuesses` that provides a way to see the number of guesses that have been made

  ```js
  function randomInteger(n) {
    return Math.floor(Math.random() * (n + 1));
  }

  const upperBound = 5;

  function guessThisNumber(n) {
    if (n > upperBound) {
      return {
        message: `Wrong. Please try a number between 0 and ${upperBound}.`,
        status: false
      };
    } else if (n === randomInteger(upperBound)) {
      return {
        message: "You win!",
        status: true
      };
    }

    return {
      message: `Wrong. Please try a number between 0 and ${upperBound}.`,
      status: false
    };
  }
  ```

- [ ] `accountGenerator`: You'll be provided with a function called `accountGenerator` in `src/closures.js`. Please add more functionality:

  - [ ] Add function `getBalance` that returns the current balance
  - [ ] Change `withdraw` to return a transaction object (see below)
  - [ ] Change `deposit` to return a transaction object (see below)
  - [ ] Implement a function `transactionHistory` to get the last `n` withdrawals or deposits 💵 (see below)
  - [ ] Implement a function `averageTransaction` that determines the average withdrawal and deposit amounts 💰. _IMPORTANT: Only approved transactions count towards the total!_. It should return an object that looks like

    ```js
    {
      deposit: number,
      withdrawal: number
    }
    ```

  - [ ] Use the `Date` object to incorporate a key `time` into the transactions 📅

  A single transaction should be represented by an object. For instance:

  ```js
  const exampleDeposit = {
    type: "deposit",
    amount: 1000,
    before: 500,
    after: 1500,
    status: "approved"
  };

  const exampleWithdrawal = {
    type: "withdrawal",
    amount: 1000,
    before: 520,
    after: 520,
    status: "denied"
  };
  ```

  Transaction history, for instance:

  ```js
  const account = accountGenerator(100);
  account.transactionHistory(2); // => [{...}, {...}]
  ```

  Remember to write tests!☝️

## Resources

- [Let's Learn JS Closures! (Free Code Camp)](https://medium.freecodecamp.com/lets-learn-javascript-closures-66feb44f6a44)
- [Jasmine unit testing tutorial](http://howtodoinjava.com/scripting/javascript/jasmine-javascript-unit-testing-tutorial/)
- [Jasmine documentation](https://jasmine.github.io/pages/docs_home.html)