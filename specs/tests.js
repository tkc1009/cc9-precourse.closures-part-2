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
    const bound = 4;
    const game = gameGenerator(bound);
    const number = [];
    for (let i = 0; i < bound; i++) {
      if (game.guess(i)) {
        number.push(i);
      }
    }
    const reset = game.reset;
    expect(reset).toBeTruthy(bound);
  });

  //own test
  it("should have a giveUp method", () => {
    expect(false).toBeTruthy();
  });

  it("should have a numGuesses method", () => {
    expect(false).toBeTruthy();
  });

  it("should keep tracking of guesses have been made", () => {
    expect(false).toBeTruthy();
  });

  it("should take number and pass to upper bound", () => {
    expect(false).toBeTruthy();
  });

  it("should be false if the number is not between 0 and upper bound", () => {
    expect(false).toBeTruthy();
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
