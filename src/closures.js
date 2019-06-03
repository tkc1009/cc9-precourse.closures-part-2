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
  let numberOfLastWin = 0;
  let numbersOfGuess = [];
  return {
    reset: () => {
      numberOfLastWin = numberOfWin;
      do {
        numberOfWin = randomInteger(upperBound);
      } while(numberOfWin === numberOfLastWin);  
      numbersOfGuess = [];
    },
    giveUp: () => {
      numberOfLastWin = numberOfWin;
      do {
        numberOfWin = randomInteger(upperBound);
      } while(numberOfWin === numberOfLastWin);
      numbersOfGuess = [];
      return numberOfLastWin;
    },
    guess: (y) => {
      numbersOfGuess.push(y);
      return numberOfWin === y;
    },
    numberGuesses: () => {
      return numbersOfGuess.length;
    }
  }
}

function accountGenerator(initial) {
  let balance = initial;
  let history = [];
  return {
    getBalance: () => balance,
    withdraw: function(amount) {
      let objectOfTransaction = {};
      if (balance - amount >= 0) {
        let balanceOflast = balance;
        balance = balance - amount;
        objectOfTransaction = {
          type: "withdrawal",
          amount: amount,
          before: balanceOflast,
          after: balance,
          status: "approved"
        };
      } else {
        objectOfTransaction = {
          type: "withdrawal",
          amount: amount,
          before: balance,
          after: balance,
          status: "denied"
        };
      }
      history.push(objectOfTransaction);
      return objectOfTransaction;
    },
    deposit: function(amount) {
      let objectOfTransaction = {};
      let balanceOflast = balance;
      balance = balance + amount;
      objectOfTransaction = {
        type: "deposit",
        amount: amount,
        before: balanceOflast,
        after: balance,
        status: "approved"
      };
      history.push(objectOfTransaction);
      return objectOfTransaction;
    },
    transactionHistory: function(n){
      const historyForReturn = [];
      for(i = history.length - 1; 0 <= i; i--){
        if(0 < n){
          historyForReturn.push(history[i]);
          n--;
        }
      }
      return historyForReturn;
    },
    averageTransaction: function(){
      let totalOfDeposit = 0;
      let lengthOfDeposit = 0;
      let totalOfWithdrawal = 0;
      let lengthOfWithdrawal = 0;
      for(i = history.length - 1; 0 <= i; i--){
        if(history[i].status === "approved"){
          if(history[i].type === "deposit"){
            totalOfDeposit += history[i].amount;
            lengthOfDeposit++;
          } else if(history[i].type === "withdrawal"){
            totalOfWithdrawal += history[i].amount;
            lengthOfWithdrawal++;
          }
        }
      }
      return {
        deposit: totalOfDeposit / lengthOfDeposit,
        withdrawal: totalOfWithdrawal / lengthOfWithdrawal
      };
    }
  };
}
