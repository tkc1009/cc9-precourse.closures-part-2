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

  it("should have a numGuesses method", () => {
    const bound = 4;
    const game = gameGenerator(bound);
    expect(game.numGuesses).toBeDefined();
    expect(typeof game.numGuesses).toBe("function");
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
