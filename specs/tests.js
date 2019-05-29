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
    const game = gameGenerator(4);
    expect(game.guess).toBeDefined();
  });

  it("should have a giveUp method", () => {
    const game = gameGenerator(4);
    expect(game.guess).toBeDefined();
  });

  it("giveUp method should return correct number and reset", () => {
    const bound = 10;
    const game = gameGenerator(bound);
    const number = [];
    for (let i = 0; i <= bound; i++) {
      if (game.guess(i)) {
        number.push(i);
      }
    }
    expect(number.length).toBe(1);
    expect(number[0]).toBe(game.giveUp());
  });

  it("should have a numberGuesses method", () => {
    const game = gameGenerator(4);
    expect(game.numberGuesses).toBeDefined();
  });

  it("numberGuesses method should return totalGuesses properly", () => {
    const game = gameGenerator(4);
    for(var i=0; i<3; i++){
      game.guess(i);
    }
    expect(game.numberGuesses()).toBe(3);
    game.reset();
    expect(game.numberGuesses()).toBe(0);
  });

});

describe("accountGenerator", () => {
  beforeEach(() => {
    jasmine.clock().install();
  });

  afterEach(function() {
    jasmine.clock().uninstall();
  });

  it("should be there", () => {
    expect(accountGenerator).toBeDefined();
    expect(typeof accountGenerator).toBe("function");
  });

  it("should have a getBalance method", () => {
    const account = accountGenerator(10000);
    expect(account.getBalance).toBeDefined();
  });

  it("getBalance method should properly retrieve current balance", () => {
    const account = accountGenerator(10000);
    expect(account.getBalance()).toBe(10000);
  });

  it("withdraw method should return a transaction object", () => {
    const account = accountGenerator(1000);
    const transaction = account.withdraw(100);
    expect(typeof transaction).toBe('object');
    expect(transaction.type).toBeDefined();
    expect(transaction.amount).toBeDefined();
    expect(transaction.before).toBeDefined();
    expect(transaction.after).toBeDefined();
    expect(transaction.status).toBeDefined();
  });

  it("transaction will be denied if balance is insufficient", () => {
    const account = accountGenerator(100);
    const transaction = account.withdraw(1000);
    const denyStatusStr = 'denied'
    expect(transaction.status).toBe(denyStatusStr);
  });

  it("deposit method should return a transaction object", () => {
    const account = accountGenerator(1000);
    const transaction = account.deposit(1000);
    expect(typeof transaction).toBe('object');
    expect(transaction.type).toBeDefined();
    expect(transaction.amount).toBeDefined();
    expect(transaction.before).toBeDefined();
    expect(transaction.after).toBeDefined();
    expect(transaction.status).toBeDefined();
  });

  it("should have a transactionHistory method", () => {
    const account = accountGenerator(10000);
    expect(account.transactionHistory).toBeDefined();
  });

  it("transactionHistory method should retrieve last n transactions", () => {
    const account = accountGenerator(10000);
    expect(account.transactionHistory(2).length).toBe(0);
    account.deposit(1000);
    account.deposit(1000);
    account.deposit(1000);
    account.deposit(1000);
    expect(account.transactionHistory().length).toBe(4);
    expect(account.transactionHistory(2).length).toBe(2);
  });

  it("should have a averageTransaction method", () => {
    const account = accountGenerator(1000);
    expect(account.averageTransaction).toBeDefined();
  });

  it("averageTransaction method should retrieve averageTransaction obj", () => {
    const account = accountGenerator(1000);
    const average = account.averageTransaction();
    expect(average.deposit).toBeDefined();
    expect(average.withdrawal).toBeDefined();
  });

  it("averageTransaction method should calculate averages properly", () => {
    const account = accountGenerator(1000);
    account.deposit(1);
    account.deposit(2);
    account.deposit(3);
    account.withdraw(100);
    account.withdraw(200);
    account.withdraw(300);
    const average = account.averageTransaction();
    expect(average.deposit).toBe(2);
    expect(average.withdrawal).toBe(200);
  });

  it("transactions should have a time field that stores transaction Date", () => {
    const account = accountGenerator(1000);
    jasmine.clock().mockDate();
    var transactionTime = new Date();
    account.deposit(100);
    jasmine.clock().tick(600);
    expect(account.transactionHistory()[0].time).toBeDefined();
    expect(account.transactionHistory()[0].time instanceof Date).toBe(true);
    expect(account.transactionHistory()[0].time.getTime())
        .toBe(transactionTime.getTime());
  });
});
