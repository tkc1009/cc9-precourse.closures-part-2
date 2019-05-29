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
    for (let i = 0; i < bound + 1; i++) {
      if (game.guess(i)) {
        number.push(i);
      }
    }
    expect(number.length).toBe(1);
  });

  it("should have a reset method", () => {
    const game = gameGenerator(3);
    expect(game.reset).toBeDefined();
  });

  it("should be able to identify winning number", () => {
    const game = gameGenerator(1);
    expect(() => {
      if (game.answer === 1) {
        game.guess(1) === true;
      } else if (game.answer === 0) {
        game.guess(0) === true;
      }
    }).toBeTruthy();
  });
});

describe("accountGenerator", () => {
  it("should be there", () => {
    expect(accountGenerator).toBeDefined();
    expect(typeof accountGenerator).toBe("function");
  });

  it("should return an object", () => {
    var ret = accountGenerator();
    expect(typeof ret === 'object' && ret.constructor === Object).toBeTruthy();
  });

  it("should return an object with getBalance property", () => {
    var ret = accountGenerator();
    expect(ret.getBalance).toBeDefined();
  });

  it("should return accurate balances after transactions", () => {
    var account = accountGenerator(300);
    account.deposit(300);
    account.withdraw(400);
    expect(account.getBalance()).toBe(200);
  });

  it("should reject withdrawals over the limit", () => {
    var account = accountGenerator(100);
    account.withdraw(1000);
    expect(account.balance).toBe(100);
  });

  it("should return transaction history", () => {
    var account = accountGenerator(500);
    account.deposit(100);
    account.withdraw(300);
    account.withdraw(100);
    expect(account.transactionHistory().length).toBe(3);
  });

  it("should return average deposits and withdrawals in an array", () => {
    var account = accountGenerator(0);
    account.deposit(50);
    account.deposit(150);
    account.withdraw(100);
    account.withdraw(100);
    expect(account.averageTransaction()).toEqual([100, 100]);
  });
});
