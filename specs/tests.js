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
    // How do you test for this?
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
    for (let i = 0; i < bound; i++) {
      if (game.guess(i)) {
        number.push(i);
      }
    }
    expect(number.length).toBe(1);
    expect(number[0]).toBe(game.giveUp());
  });

  it("should have a numGuesses method", () => {
    const game = gameGenerator(4);
    expect(game.numGuesses).toBeDefined();
  });

  it("numGuesses method should return totalGuesses properly", () => {
    const game = gameGenerator(4);
    for(var i=0; i<3; i++){
      game.guess(i);
    }
    expect(game.numGuesses()).toBe(3);
    game.reset();
    expect(game.numGuesses()).toBe(0);
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
