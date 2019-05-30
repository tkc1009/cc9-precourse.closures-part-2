describe("gameGenerator", () => {
  it("should be there", () => {
    expect(gameGenerator).toBeDefined();
    expect(typeof gameGenerator).toBe("function");
  });

  it("should generate some games!", () => {
    const game = gameGenerator(4);
    expect(typeof game).toBe("object");
  });

  it("should have just one winning number", () => {
    const bound = 4;
    const game = gameGenerator(bound);
    const number = [];
    for (let i = 0; i <= bound; i++) {
      if (game.guess(i)) {
        number.push(i);
      }
    }
    expect(number.length).toBe(1);
  });

  it("should have a reset method generates a game with the same upper bound", () => {
    const bound = 4;
    const game = gameGenerator(bound);
    game.reset();
    const number = [];
    for (let i = 0; i <= bound; i++) {
      if (game.guess(i)) {
        number.push(i);
      }
    }
    expect(number.length).toBe(1);
  });

  it("should have a reset method that has a different winning number", () => {
    const bound = 4;
    const game = gameGenerator(bound);
    const results = [];

    let firstWinningNumber; 
    for (let i = 0; i <= bound; i++) {
      if (game.guess(i)) { firstWinningNumber = i; }
    }

    // Reset and the same winning number until it returns false 
    while (game.guess(firstWinningNumber)) {
      game.reset();
      results.push(game.guess(firstWinningNumber));
    }
    expect(results).toContain(false);
  });

  it("should have a reset method that resets the guess counter", () => {
    const bound = 4;
    const game = gameGenerator(bound);
    game.guess(1);
    game.guess(2);
    game.guess(3);
    expect(game.numGuesses()).toEqual(3);
    game.reset();
    expect(game.numGuesses()).toEqual(0);
  });

  it("should have a give up function that returns the winning number", () => {
    const bound = 4;
    const game = gameGenerator(bound);
    let winningNumber; 
    for (let i = 0; i <= bound; i++) {
      if (game.guess(i)) { winningNumber = i; }
    }
    expect(game.giveUp()).toEqual(winningNumber);

  });

});

describe("accountGenerator", () => {
  it("should be there", () => {
    expect(accountGenerator).toBeDefined();
    expect(typeof accountGenerator).toBe("function");
  });

  it("should have a getBalance function that returns the right balance", () => {
    const initialBalance = 100;
    const account = accountGenerator(initialBalance);
    expect(account.getBalance()).toEqual(initialBalance);
  });

  it("should have a withdraw function that decreases the balance", () => {
    const initialBalance = 100;
    const account = accountGenerator(initialBalance);
    const withdrawalAmount = 50;
    account.withdraw(withdrawalAmount);
    expect(account.getBalance()).toEqual(initialBalance - withdrawalAmount);
  });

  it("should have a deposit function that increases the balance", () => {
    const initialBalance = 100;
    const account = accountGenerator(initialBalance);
    const depositAmount = 50;
    account.deposit(depositAmount);
    expect(account.getBalance()).toEqual(initialBalance + depositAmount);
  });

  it("should return an approved transaction object upon withdrawal of amount less than balance", () => {
    const initialBalance = 100;
    const account = accountGenerator(initialBalance);
    const withdrawalAmount = 50;
    const returnedTransaction = account.withdraw(withdrawalAmount);
    expect(returnedTransaction.type).toEqual("withdrawal")
    expect(returnedTransaction.amount).toEqual(withdrawalAmount)
    expect(returnedTransaction.before).toEqual(initialBalance)
    expect(returnedTransaction.after).toEqual(initialBalance - withdrawalAmount)
    expect(returnedTransaction.status).toEqual("approved")
  })

  it("should return an denied transaction object upon withdrawal of amount less than balance", () => {
    const initialBalance = 100;
    const account = accountGenerator(initialBalance);
    const withdrawalAmount = 150;
    const returnedTransaction = account.withdraw(withdrawalAmount);
    expect(returnedTransaction.type).toEqual("withdrawal")
    expect(returnedTransaction.amount).toEqual(withdrawalAmount)
    expect(returnedTransaction.before).toEqual(initialBalance)
    expect(returnedTransaction.after).toEqual(initialBalance)
    expect(returnedTransaction.status).toEqual("denied")
  })

  it("should return an approved transaction object upon deposit of any amount", () => {
    const initialBalance = 100;
    const account = accountGenerator(initialBalance);
    const depositAmount = 50;
    const returnedTransaction = account.deposit(depositAmount);
    expect(returnedTransaction.type).toEqual("deposit")
    expect(returnedTransaction.amount).toEqual(depositAmount)
    expect(returnedTransaction.before).toEqual(initialBalance)
    expect(returnedTransaction.after).toEqual(initialBalance + depositAmount)
    expect(returnedTransaction.status).toEqual("approved")
  })

  it("should have a function to return the transaction history", () => {
    const initialBalance = 100;
    const account = accountGenerator(initialBalance);
    const transactionHistory = [];
    transactionHistory.push(account.deposit(10));
    transactionHistory.push(account.deposit(100));
    transactionHistory.push(account.withdraw(50));
    transactionHistory.push(account.withdraw(120));
    transactionHistory.push(account.deposit(1));
    const returnedTransactionHistory = account.transactionHistory(5);
    for (let i = 0; i < transactionHistory.length; i++) {
      expect(transactionHistory[i]).toEqual(returnedTransactionHistory[i]);
    }
  })

  it("should have a function to return the average of successful transactions", () => {
    const initialBalance = 100;
    const account = accountGenerator(initialBalance);

    account.deposit(10);
    account.deposit(100);
    account.deposit(20);
    account.deposit(30);

    account.withdraw(40);
    account.withdraw(100);
    account.withdraw(10);
    account.withdraw(1000);

    const expectedDepositAverage = (10 + 100 + 20 + 30) / 4;
    const expectedWithdrawalAverage = (40 + 100 + 10) / 3;
    expect(account.averageTransaction().deposit).toEqual(expectedDepositAverage);
    expect(account.averageTransaction().withdrawal).toEqual(expectedWithdrawalAverage);
  })


});
