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
      if (game.guess(i).status === true) {
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
    game.reset();
    result = game.result;
    let joc = jasmine.objectContaining;
    expect(result).toEqual(joc({ won: 0, lost: 0}));
  });

  //own test
  it("should have a giveUp method", () => {
    const bound = 4;
    const game = gameGenerator(bound);
    const giveUp = game.giveUp();
    let joc = jasmine.objectContaining;
    expect(giveUp).toEqual(joc({message: 'Oh, Yusha yo, shinde shimautowa, nasakenai!'}));
  });

  it("should have a hint method", () => {
    const bound = 4;
    const game = gameGenerator(bound);
    const number = [];
    for (let i = 0; i < bound; i++) {
      if (game.guess(i).status === false) {
        number.push(game.hints);
      }
    }
    expect(number.length).not.toBe(0);
  });

  it("should keep tracking of guesses have been made", () => {
    const bound = 10;
    const game = gameGenerator(bound);
    game.guess(1);
    expect(game.played).not.toBe(0);
  });

  it("should be false if the number is not between 0 and upper bound", () => {
    const bound = 4;
    const game = gameGenerator(bound);
    expect(game.guess(10).status).not.toBeTruthy();
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
