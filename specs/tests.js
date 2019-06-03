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
    for (let i = 0; i < bound; i++) {
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
    console.log("should change the numberOfWin by reset");
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
    console.log("should change the numberOfWin by giveUp");
    const bound = 5;
    const game = gameGenerator(bound);
    let number1;
    let number2;
    number1 = game.giveUp();
    number2 = game.giveUp();
    expect(number1).not.toEqual(number2);
  });

  it("should delete the numbersOfGuess by giveUp", () => {
    console.log("should delete the numbersOfGuess by giveUp");
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
    console.log("should add the numbersOfGuess by guess");
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
    console.log("should add the numbersOfGuess by numberGuesses ");
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

  it("should have some tests", () => {
    expect(false).toBeTruthy();
  });
});
