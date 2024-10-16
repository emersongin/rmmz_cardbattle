class BoardWindow extends ValuesWindow {
  static create(x, y) {
    const width = Graphics.boxWidth;
    const height = StateWindow.minHeight();
    const rect = new Rectangle(x, y, width, height);
    return new BoardWindow(rect);
  }

  static createValueUpdate(name, value) {
    return ValuesWindow.createValueUpdate(name, value);
  }

  initialize(rect) {
    super.initialize(rect);
    this.reset();
  }
  
  reset() {
    super.reset();
    this._pass = false;
    this.refreshPoints();
  }

  refreshPoints(redPoints = 0, bluePoints = 0, greenPoints = 0, blackPoints = 0, whitePoints = 0, cardsInDeck = 0, cardsInHand = 0) {
    this.addValue(GameConst.RED, redPoints);
    this.addValue(GameConst.BLUE, bluePoints);
    this.addValue(GameConst.GREEN, greenPoints);
    this.addValue(GameConst.BLACK, blackPoints);
    this.addValue(GameConst.WHITE, whitePoints);
    this.addValue(GameConst.CARDS_IN_DECK, cardsInDeck);
    this.addValue(GameConst.CARDS_IN_HAND, cardsInHand);
    this.refresh();
  }

  noPass() {
    this.addAction(this.commandNoPass);
  }

  commandNoPass() {
    if (this.isBusy()) return false;
    this._pass = false;
    this.refresh();
  }

  refresh() {
    super.refresh();
    this.drawIcons();
    this.drawDisplay();
    if (this._pass) this.drawPass();
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
    const redPoints = this.getValueAndConvertToDisplayPad(GameConst.RED);
    const bluePoints = this.getValueAndConvertToDisplayPad(GameConst.BLUE);
    const greenPoints = this.getValueAndConvertToDisplayPad(GameConst.GREEN);
    const blackPoints = this.getValueAndConvertToDisplayPad(GameConst.BLACK);
    const whitePoints = this.getValueAndConvertToDisplayPad(GameConst.WHITE);
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
    const handPoints = this.getValueAndConvertToDisplayPad(GameConst.CARDS_IN_HAND);
    const deckPoints = this.getValueAndConvertToDisplayPad(GameConst.CARDS_IN_DECK);
    this.contents.drawText(handPoints, xPositionHand, yPosition, width, height);
    this.contents.drawText(deckPoints, xPositionDeck, yPosition, width, height);
  }

  drawPass() {
    const x = this.contents.width - 336 + 40;
    const y = 0;
    const width = 64;
    const height = 32;
    this.contents.drawText('Pass', x, y, width, height);
  }

  pass() {
    this.addAction(this.commandPass);
  }

  commandPass() {
    if (this.isBusy()) return false;
    this._pass = true;
    this.refresh();
  }

  isNoPass() {
    return !this.isPass();
  }

  isPass() {
    return this._pass;
  }
}