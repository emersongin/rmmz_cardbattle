class GameBoardWindow extends CardBattleWindow {
  initialize(rect) {
    super.initialize(rect);
    this.setup();
    this.reset();
  }

  setup() {
    this.addValue(GameBoardValues.RED_POINTS, 0);
    this.addValue(GameBoardValues.BLUE_POINTS, 0);
    this.addValue(GameBoardValues.GREEN_POINTS, 0);
    this.addValue(GameBoardValues.BLACK_POINTS, 0);
    this.addValue(GameBoardValues.WHITE_POINTS, 0);
    this.addValue(GameBoardValues.NUM_CARDS_IN_DECK, 0);
    this.addValue(GameBoardValues.NUM_CARDS_IN_HAND, 0);
  }

  reset() {
    const attackUpdate = GameBoardWindow.createValueUpdate(GameBoardValues.RED_POINTS, 0);
    const healthUpdate = GameBoardWindow.createValueUpdate(GameBoardValues.BLUE_POINTS, 0);
    const greenUpdate = GameBoardWindow.createValueUpdate(GameBoardValues.GREEN_POINTS, 0);
    const blackUpdate = GameBoardWindow.createValueUpdate(GameBoardValues.BLACK_POINTS, 0);
    const whiteUpdate = GameBoardWindow.createValueUpdate(GameBoardValues.WHITE_POINTS, 0);
    const numCardsInDeckUpdate = GameBoardWindow.createValueUpdate(GameBoardValues.NUM_CARDS_IN_DECK, 0);
    const numCardsInHandUpdate = GameBoardWindow.createValueUpdate(GameBoardValues.NUM_CARDS_IN_HAND, 0); 
    this.updateValues([
      attackUpdate,
      healthUpdate,
      greenUpdate,
      blackUpdate,
      whiteUpdate,
      numCardsInDeckUpdate,
      numCardsInHandUpdate
    ]);
  }

  static create(x, y, width, height) {
    return new GameBoardWindow(new Rectangle(x, y, width, height));
  }

  static createWindowMiddleSize(x, y) {
    const width = Graphics.boxWidth / 2;
    const height = CardBattleWindow.minHeight();
    return GameBoardWindow.create(x, y, width, height);
  }

  static createWindowFullSize(x, y) {
    const width = Graphics.boxWidth;
    const height = CardBattleWindow.minHeight();
    return GameBoardWindow.create(x, y, width, height);
  }

  static createValueUpdate(name, value) {
    return CardBattleWindow.createValueUpdate(name, value);
  }

  refresh() {
    super.refresh();
    this.drawIcons();
    this.drawDisplay();
  }
  
  drawIcons() {
    this.drawColorBoxIcons();
    this.drawAllIcons();
  }

  drawColorBoxIcons() {
    const indexOne = 0;
    const indexTwo = 96;
    const indexThree = 192;
    const indexFour = 288;
    const indexFive = 384;
    this.drawIcon(IconSet.WHITEBOX, indexOne, 0);
    this.drawIcon(IconSet.REDBOX, indexTwo, 0);
    this.drawIcon(IconSet.BLUEBOX, indexThree, 0);
    this.drawIcon(IconSet.GREENBOX, indexFour, 0);
    this.drawIcon(IconSet.BLACKBOX, indexFive, 0);
  }

  drawAllIcons() {
    const floatRightIndexOne = this.contents.width - 96;
    const floatRightIndexTwo = this.contents.width - 192;
    this.drawIcon(IconSet.HAND, floatRightIndexOne, 0);
    this.drawIcon(IconSet.DECK, floatRightIndexTwo, 0);
  }

  drawDisplay() {
    this.drawEnergiesPoints();
    this.drawCardsPoints();
  }

  drawEnergiesPoints() {
    const width = 64;
    const height = 32;
    const yPosition = 0;
    const xPositionWhitePoints = 40;
    const xPositonRedPoints = 136;
    const xPositionBluePoints = 232;
    const xPositionGreenPoints = 328;
    const xPositionBlackPoints = 424;
    const redPoints = this.getValueAndconvertToDisplayPad(GameBoardValues.RED_POINTS);
    const bluePoints = this.getValueAndconvertToDisplayPad(GameBoardValues.BLUE_POINTS);
    const greenPoints = this.getValueAndconvertToDisplayPad(GameBoardValues.GREEN_POINTS);
    const blackPoints = this.getValueAndconvertToDisplayPad(GameBoardValues.BLACK_POINTS);
    const whitePoints = this.getValueAndconvertToDisplayPad(GameBoardValues.WHITE_POINTS);
    this.contents.drawText(whitePoints, xPositionWhitePoints, yPosition, width, height);
    this.contents.drawText(redPoints, xPositonRedPoints, yPosition, width, height);
    this.contents.drawText(bluePoints, xPositionBluePoints, yPosition, width, height);
    this.contents.drawText(greenPoints, xPositionGreenPoints, yPosition, width, height);
    this.contents.drawText(blackPoints, xPositionBlackPoints, yPosition, width, height);
  }

  drawCardsPoints() {
    const width = 64;
    const height = 32;
    const yPosition = 0;
    const xPositionHand = this.contents.width - 96 + 40;
    const xPositionDeck = this.contents.width - 192 + 40;
    const handPoints = this.getValueAndconvertToDisplayPad(GameBoardValues.NUM_CARDS_IN_HAND);
    const deckPoints = this.getValueAndconvertToDisplayPad(GameBoardValues.NUM_CARDS_IN_DECK);
    this.contents.drawText(handPoints, xPositionHand, yPosition, width, height);
    this.contents.drawText(deckPoints, xPositionDeck, yPosition, width, height);
  }
}