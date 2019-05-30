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

    // Che
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
    expect(game.numGuesses).toEqual(3);
    game.reset();
    expect(game.numGuesses).toEqual(0);
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
