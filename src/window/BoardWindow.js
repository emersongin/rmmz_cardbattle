class BoardWindow extends ValuesWindow {
  static create(x, y, width, height) {
    return new BoardWindow(new Rectangle(x, y, width, height));
  }

  static createWindowMiddleSize(x, y) {
    const width = Graphics.boxWidth / 2;
    const height = ValuesWindow.minHeight();
    return BoardWindow.create(x, y, width, height);
  }

  static createWindowFullSize(x, y) {
    const width = Graphics.boxWidth;
    const height = ValuesWindow.minHeight();
    return BoardWindow.create(x, y, width, height);
  }

  static createValueUpdate(name, value) {
    return ValuesWindow.createValueUpdate(name, value);
  }

  reset() {
    this.addValue(GameConst.RED_POINTS, 0);
    this.addValue(GameConst.BLUE_POINTS, 0);
    this.addValue(GameConst.GREEN_POINTS, 0);
    this.addValue(GameConst.BLACK_POINTS, 0);
    this.addValue(GameConst.WHITE_POINTS, 0);
    this.addValue(GameConst.NUM_CARDS_IN_DECK, 0);
    this.addValue(GameConst.NUM_CARDS_IN_HAND, 0);
    super.reset();
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
    this.drawIcon(IconSetConst.WHITEBOX, indexOne, 0);
    this.drawIcon(IconSetConst.REDBOX, indexTwo, 0);
    this.drawIcon(IconSetConst.BLUEBOX, indexThree, 0);
    this.drawIcon(IconSetConst.GREENBOX, indexFour, 0);
    this.drawIcon(IconSetConst.BLACKBOX, indexFive, 0);
  }

  drawAllIcons() {
    const floatRightIndexOne = this.contents.width - 96;
    const floatRightIndexTwo = this.contents.width - 192;
    this.drawIcon(IconSetConst.HAND, floatRightIndexOne, 0);
    this.drawIcon(IconSetConst.DECK, floatRightIndexTwo, 0);
  }

  drawDisplay() {
    this.drawEnergiesPoints();
    this.drawAllPoints();
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
    const redPoints = this.getValueAndConvertToDisplayPad(GameConst.RED_POINTS);
    const bluePoints = this.getValueAndConvertToDisplayPad(GameConst.BLUE_POINTS);
    const greenPoints = this.getValueAndConvertToDisplayPad(GameConst.GREEN_POINTS);
    const blackPoints = this.getValueAndConvertToDisplayPad(GameConst.BLACK_POINTS);
    const whitePoints = this.getValueAndConvertToDisplayPad(GameConst.WHITE_POINTS);
    this.contents.drawText(whitePoints, xPositionWhitePoints, yPosition, width, height);
    this.contents.drawText(redPoints, xPositonRedPoints, yPosition, width, height);
    this.contents.drawText(bluePoints, xPositionBluePoints, yPosition, width, height);
    this.contents.drawText(greenPoints, xPositionGreenPoints, yPosition, width, height);
    this.contents.drawText(blackPoints, xPositionBlackPoints, yPosition, width, height);
  }

  drawAllPoints() {
    const width = 64;
    const height = 32;
    const yPosition = 0;
    const xPositionHand = this.contents.width - 96 + 40;
    const xPositionDeck = this.contents.width - 192 + 40;
    const handPoints = this.getValueAndConvertToDisplayPad(GameConst.NUM_CARDS_IN_HAND);
    const deckPoints = this.getValueAndConvertToDisplayPad(GameConst.NUM_CARDS_IN_DECK);
    this.contents.drawText(handPoints, xPositionHand, yPosition, width, height);
    this.contents.drawText(deckPoints, xPositionDeck, yPosition, width, height);
  }
}