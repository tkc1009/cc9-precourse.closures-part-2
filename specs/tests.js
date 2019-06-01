describe("gameGenerator", () => {

  beforeEach(() => {
    this.bound = 4;
    this.game = gameGenerator(this.bound);
  });

  it("should be there", () => {
    expect(gameGenerator).toBeDefined();
    expect(typeof gameGenerator).toBe("function");
  });

  it("should generate some games!", () => {
    const game = gameGenerator(4);
    expect(typeof game).toBe("object");
  });

  it("should have just one winning number", () => {
    const number = [];
    for (let i = 0; i <= this.bound; i++) {
      if (this.game.guess(i)) {
        number.push(i);
      }
    }
    expect(number.length).toBe(1);
  });

  it("should have a reset method generates a game with the same upper bound", () => {
    this.game.reset();
    const number = [];
    for (let i = 0; i <= this.bound; i++) {
      if (this.game.guess(i)) {
        number.push(i);
      } 
    }
    expect(number.length).toBe(1);
  });

  it("should have a reset method that has a different winning number", () => {
    const results = [];

    let firstWinningNumber; 
    for (let i = 0; i <= this.bound; i++) {
      if (this.game.guess(i)) { firstWinningNumber = i; }
    }

    // Reset and the same winning number until it returns false 
    while (this.game.guess(firstWinningNumber)) {
      this.game.reset();
      results.push(this.game.guess(firstWinningNumber));
    }
    expect(results).toContain(false);
  });

  it("should have a reset method that resets the guess counter", () => {
    this.game.guess(1);
    this.game.guess(2);
    this.game.guess(3);
    expect(this.game.numberGuesses()).toEqual(3);
    this.game.reset();
    expect(this.game.numberGuesses()).toEqual(0);
  });

  it("should have a give up function that returns the winning number", () => {
    let winningNumber; 
    for (let i = 0; i <= this.bound; i++) {
      if (this.game.guess(i)) { winningNumber = i; }
    }
    expect(this.game.giveUp()).toEqual(winningNumber);

  });

});

describe("accountGenerator", () => {

  beforeEach(() => {
    this.initialBalance = 100;
    this.account = accountGenerator(this.initialBalance);
  });

  it("should be there", () => {
    expect(accountGenerator).toBeDefined();
    expect(typeof accountGenerator).toBe("function");
  });

  it("should have a getBalance function that returns the right balance", () => {
    expect(this.account.getBalance()).toEqual(initialBalance);
  });

  it("should have a withdraw function that decreases the balance", () => {
    const withdrawalAmount = 50;
    this.account.withdraw(withdrawalAmount);
    expect(this.account.getBalance()).toEqual(this.initialBalance - withdrawalAmount);
  });

  it("should have a deposit function that increases the balance", () => {
    const depositAmount = 50;
    this.account.deposit(depositAmount);
    expect(this.account.getBalance()).toEqual(this.initialBalance + depositAmount);
  });

  it("should return an approved transaction object upon withdrawal of amount less than balance", () => {
    const withdrawalAmount = 50;
    const returnedTransaction = this.account.withdraw(withdrawalAmount);
    expect(returnedTransaction.type).toEqual("withdrawal")
    expect(returnedTransaction.amount).toEqual(withdrawalAmount)
    expect(returnedTransaction.before).toEqual(this.initialBalance)
    expect(returnedTransaction.after).toEqual(this.initialBalance - withdrawalAmount)
    expect(returnedTransaction.status).toEqual("approved")
  })

  it("should return an denied transaction object upon withdrawal of amount less than balance", () => {
    const withdrawalAmount = 150;
    const returnedTransaction = this.account.withdraw(withdrawalAmount);
    expect(returnedTransaction.type).toEqual("withdrawal")
    expect(returnedTransaction.amount).toEqual(withdrawalAmount)
    expect(returnedTransaction.before).toEqual(this.initialBalance)
    expect(returnedTransaction.after).toEqual(this.initialBalance)
    expect(returnedTransaction.status).toEqual("denied")
  })

  it("should return an approved transaction object upon deposit of any amount", () => {
    const depositAmount = 50;
    const returnedTransaction = this.account.deposit(depositAmount);
    expect(returnedTransaction.type).toEqual("deposit")
    expect(returnedTransaction.amount).toEqual(depositAmount)
    expect(returnedTransaction.before).toEqual(this.initialBalance)
    expect(returnedTransaction.after).toEqual(this.initialBalance + depositAmount)
    expect(returnedTransaction.status).toEqual("approved")
  })

  it("should have a function to return the transaction history", () => {
    const transactionHistory = [];
    transactionHistory.push(this.account.deposit(10));
    transactionHistory.push(this.account.deposit(100));
    transactionHistory.push(this.account.withdraw(50));
    transactionHistory.push(this.account.withdraw(120));
    transactionHistory.push(this.account.deposit(1));
    const returnedTransactionHistory = this.account.transactionHistory(5);
    for (let i = 0; i < transactionHistory.length; i++) {
      expect(transactionHistory[i]).toEqual(returnedTransactionHistory[i]);
    }
  })

  it("should have a function to return the transaction history that returns last n transactions", () => {  
    const transactionHistory = [];
    transactionHistory.push(this.account.deposit(10));
    transactionHistory.push(this.account.deposit(100));
    transactionHistory.push(this.account.withdraw(50));
    transactionHistory.push(this.account.withdraw(120));
    transactionHistory.push(this.account.deposit(1));
    const returnedTransactionHistory = this.account.transactionHistory(3);
    for (let i = 0; i < returnedTransactionHistory.length; i++) {
      expect(transactionHistory[2 + i]).toEqual(returnedTransactionHistory[i]);
    }
  })

  it("should have a function to return the average of successful transactions", () => {
    this.account.deposit(10);
    this.account.deposit(100);
    this.account.deposit(20);
    this.account.deposit(30);

    this.account.withdraw(40);
    this.account.withdraw(100);
    this.account.withdraw(10);
    this.account.withdraw(1000);

    const expectedDepositAverage = (10 + 100 + 20 + 30) / 4;
    const expectedWithdrawalAverage = (40 + 100 + 10) / 3;
    expect(account.averageTransaction().deposit).toEqual(expectedDepositAverage);
    expect(account.averageTransaction().withdrawal).toEqual(expectedWithdrawalAverage);
  })


});
