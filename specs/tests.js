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

  it("should have a reset method", () => {
    const bound = 4;
    const game = gameGenerator(bound);
    expect(game.reset).toBeDefined();
    expect(typeof game.reset).toBe("function");
  });

  it("should have a giveUp method", () => {
    const bound = 4;
    const game = gameGenerator(bound);
    expect(game.giveUp).toBeDefined();
    expect(typeof game.giveUp).toBe("function");
  });

  it("should have a guess method", () => {
    const bound = 4;
    const game = gameGenerator(bound);
    expect(game.guess).toBeDefined();
    expect(typeof game.guess).toBe("function");
  });

  it("should have a numberGuesses method", () => {
    const bound = 4;
    const game = gameGenerator(bound);
    expect(game.numberGuesses).toBeDefined();
    expect(typeof game.numberGuesses).toBe("function");
  });

  it("should change the numberOfWin by reset", () => {
    const bound = 5;
    const game = gameGenerator(bound);
    let number1;
    let number2;
    for (let i = 0; i <= bound; i++) {
      if (game.guess(i)) {
        number1 = i;
      }
    }
    game.reset();
    for (let i = 0; i <= bound; i++) {
      if (game.guess(i)) {
        number2 = i;
      }
    }
    expect(number1).not.toEqual(number2);
  });

  it("should change the numberOfWin by giveUp", () => {
    const bound = 5;
    const game = gameGenerator(bound);
    let number1;
    let number2;
    number1 = game.giveUp();
    number2 = game.giveUp();
    expect(number1).not.toEqual(number2);
  });

  it("should delete the numbersOfGuess by giveUp", () => {
    const bound = 5;
    const game = gameGenerator(bound);
    let number1;
    let number2;
    for (let i = 0; i <= bound; i++) {
      game.guess(i)
    }
    number1 = game.numberGuesses();
    game.giveUp();
    number2 = game.numberGuesses();
    expect(number1).toBeGreaterThan(number2);
  });

  it("should add the numbersOfGuess by guess", () => {
    const bound = 5;
    const game = gameGenerator(bound);
    let number1;
    let number2;
    game.guess(1);
    number1 = game.numberGuesses();
    game.guess(2);
    number2 = game.numberGuesses();
    expect(number1).toEqual(1);
    expect(number2).toEqual(2);
  });

  it("should return the numbersOfGuess by numberGuesses ", () => {
    const bound = 4;
    const game = gameGenerator(bound);
    const number = [];
    for (let i = 0; i <= bound; i++) {
      game.guess(i);
      number.push(i);
    }
    expect(game.numberGuesses()).toEqual(number.length);
  });

});

describe("accountGenerator", () => {
  it("should be there", () => {
    expect(accountGenerator).toBeDefined();
    expect(typeof accountGenerator).toBe("function");
  });

  it("should have a getBalance method", () => {
    const initial = 10;
    const account = accountGenerator(initial);
    expect(account.getBalance).toBeDefined();
    expect(typeof account.getBalance).toBe("function");
  });

  it("should have a withdraw method", () => {
    const initial = 10;
    const account = accountGenerator(initial);
    expect(account.withdraw).toBeDefined();
    expect(typeof account.withdraw).toBe("function");
  });

  it("should have a deposit method", () => {
    const initial = 10;
    const account = accountGenerator(initial);
    expect(account.deposit).toBeDefined();
    expect(typeof account.deposit).toBe("function");
  });

  it("should have a transactionHistory method", () => {
    const initial = 10;
    const account = accountGenerator(initial);
    expect(account.transactionHistory).toBeDefined();
    expect(typeof account.transactionHistory).toBe("function");
  });

  it("should have a averageTransaction method", () => {
    const initial = 10;
    const account = accountGenerator(initial);
    expect(account.averageTransaction).toBeDefined();
    expect(typeof account.averageTransaction).toBe("function");
  });

  it("should return a current balance by getBalance", () => {
    const initial = 100;
    const account = accountGenerator(initial);
    account.deposit(1000);
    expect(account.getBalance()).toEqual(1100);
  });

  it("should return a transaction object by deposit", () => {
    const initial = 100;
    const account = accountGenerator(initial);
    const target = account.deposit(2000);
    expect(target).toEqual({
      type: "deposit",
      amount: 2000,
      before: 100,
      after: 2100,
      status: "approved",
      time: target.time
    });
  });

  it("should return a transaction object by withdraw", () => {
    const initial = 100;
    const account = accountGenerator(initial);
    const target = account.withdraw(100);
    expect(target).toEqual({
      type: "withdrawal",
      amount: 100,
      before: 100,
      after: 0,
      status: "approved",
      time: target.time
    });
  });

  it("should return a denied transaction object by withdraw", () => {
    const initial = 100;
    const account = accountGenerator(initial);
    const target = account.withdraw(2000)
    expect(target).toEqual({
      type: "withdrawal",
      amount: 2000,
      before: 100,
      after: 100,
      status: "denied",
      time: target.time
    });
  });

  it("should return transaction objects of the history by transactionHistory", () => {
    const initial = 100;
    const account = accountGenerator(initial);
    account.deposit(2000);
    account.withdraw(5000);
    account.withdraw(1000);
    const target = account.transactionHistory(2);
    expect(target).toEqual([{
      type: "withdrawal",
      amount: 5000,
      before: 2100,
      after: 2100,
      status: "denied",
      time: target[1].time
    }, {
      type: "withdrawal",
      amount: 1000,
      before: 2100,
      after: 1100,
      status: "approved",
      time: target[0].time
    }]);
  });

  it("should return an average of deposit and withdrawal by averageTransaction", () => {
    const initial = 100;
    const account = accountGenerator(initial);
    account.deposit(2000);
    account.withdraw(5000);
    account.withdraw(1000);
    account.deposit(2000);
    account.withdraw(5000);
    account.withdraw(1000);
    expect(account.averageTransaction()).toEqual({
      deposit: 2000,
      withdrawal: 1000
    });
  });

});
