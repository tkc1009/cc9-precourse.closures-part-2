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
      return { 
        message: `Wrong input, please try a number between 0 and ${upperBound}`,
        status : false
      };
    }

    //Win or Wrong
    if (val === answer) {
      games.result.won ++;
      games.played = 0;
      changeAnswer();
      games.status = true;
      return {
        message: "You win!",
        result: games.result,
        status: true,
      };
    } else if(val !== answer){
        games.played ++;
        games.status = false;
       return {
        message: `No... Please try a number again.`,
        life: games.life - games.played,
        hints: hint(val),
        status: false,
      };
    }
  }

  //change answer
  function changeAnswer() {
    answer = randomInteger(Math.floor(Math.random() * upperBound));
    return answer;
  }

  //reset
  function reset() {
    this.result = { won: 0, lost: 0 };
    this.played = 0;
    changeAnswer();
    return { message: `Oh, Yushayo, yokuzo modottekite kureta!`}
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
    changeAnswer();
    return { 
      message: 'Oh, Yusha yo, shinde shimautowa, nasakenai!',
      result: games.result,
    }
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

  return games;
}



function accountGenerator(initial) {
  let balance = initial;
  let history = [];
    
  return {
    getBalance: function() {
      return balance;
    },
    withdraw: function(amount) {
      let beforeWithdraw = balance;
      if (balance - amount >= 0) {
        balance = balance - amount;
        let detail = {};
        detail.type = "withdrawal";
        detail.amount = amount;
        detail.before = beforeWithdraw;
        detail.after = balance;
        detail.status = "approved";
        history.push(detail);
        return detail;
      } else if(balance - amount < 0){
        let detail = {};
        detail.type = "error";
        detail.amount = amount;
        detail.balance = balance;
        detail.status = "denied";
        history.push(detail);
        return detail;
      }
    },
    deposit: function(amount) {
      let beforeDeposit = balance;
      balance = balance + amount;
      let detail = {};
        detail.type = "deposit";
        detail.amount = amount;
        detail.before = beforeDeposit;
        detail.after = balance;
        detail.status = "approved";
        history.push(detail);
      return detail;
    },
    transactionHistory: function(last) {
      return history.slice(last);
    }
  };
}
