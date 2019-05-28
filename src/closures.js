/* exported gameGenerator accountGenerator randomInteger */
/*
We've written a few tests for your Game Generator function which you can find them in the 'specs' folder.
By the end of this exercise, you'll be writing tests for the functions yourself.
*/


function randomInteger(n) {
  return Math.floor(Math.random() * (n + 1));
}

function gameGenerator(n) {
  const upperBound = n;
  let games = {};
  let answer = randomInteger(n-1);
  let life = n
  
  function guessThisNumber(val) {
    games.played = numberGuesses(1);
    //Lose
    if(games.life - games.played === 0){
      games.played = 0;
      games.life = life;
      games.result.lost ++;
      return {
        message: `You lose... Please try again!`,
        result: games.result
      }
    }
    //input value check
    if(val > upperBound ||typeof val !== "number"){
      return true;
    }

    //Win or Wrong
    if (val === answer) {
      games.result.won ++;
      games.played = 0;
      changeAnswer();
      games.status = true;
      return true;
    } else if(val !== answer){
        games.status = false;
        games.hint = hint();
       return false;
    }
  }

  //change answer
  function changeAnswer() {
    answer = randomInteger(Math.floor(Math.random() * upperBound));
    return answer;
  };

  //reset
  function reset() {
    let oldAnswer = answer;
    changeAnswer();
    return oldAnswer;
  };

  //increase guess
  function numberGuesses(n) {
    if(n === undefined){
      return games.played
    };
    if(n === 0){
      games.played = 0;
    } else {
      games.played += 1;
    }
    return games.played;
  }

  //hint message creator
  function hint(val) {
    let result;
    if(val > answer){
      result = "your answer is higher than the answer"
    } else {
      result = "your answer is less than the answer"
    }
    return result;
  }

  //giveUp function
  function giveUp(){
    this.played = 0;
    this.result.lost ++;
    let oldAnswer = answer;
    numberGuesses(0);
    changeAnswer();
    return oldAnswer;
  }

  //object inside
  games.guess = guessThisNumber;
  games.giveUp = giveUp;
  games.played = 0;
  games.life = life;
  games.reset = reset;
  games.result = { won: 0, lost: 0 };
  games.status = false;
  games.answer = answer;
  games.numberGuesses = numberGuesses;

  return games;
}



function accountGenerator(initial) {
  let balance = initial;
  let history = [];
  let detail = {};

  function getBalance() {
    return balance;
  };

  function transactionHistory(last) {
    return history.slice(last);
  };

  function withdraw(amount) {
    let beforeWithdraw = balance;
    if (balance - amount >= 0) {
      balance = balance - amount;
      detail.type = "withdrawal";
      detail.amount = amount;
      detail.before = beforeWithdraw;
      detail.after = balance;
      detail.status = "approved";
      detail.time = Date();
      history.push(detail);
      return detail;
    } else if(balance - amount < 0){
      detail.type = "error";
      detail.amount = amount;
      detail.balance = balance;
      detail.status = "denied";
      history.push(detail);
      return detail;
    }
    return detail;
  };

  function deposit(amount) {
    let beforeDeposit = balance;
    balance = balance + amount;
      detail.type = "deposit";
      detail.amount = amount;
      detail.before = beforeDeposit;
      detail.after = balance;
      detail.status = "approved";
      detail.time = Date();
      history.push(detail);
    return detail;
  };

  function averageTransaction() {
    let numberOfHistories = transactionHistory();
    return 
  }
    
  return {
    getBalance: getBalance,
    withdraw: withdraw,
    deposit: deposit,
    transactionHistory: transactionHistory,
    averageTransaction: averageTransaction,
  };
}
