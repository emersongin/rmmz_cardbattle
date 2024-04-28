class GameBoardWindow extends CardBattleWindow {
  initialize(rect) {
    this._redPoints = 0;
    this._bluePoints = 0;
    this._greenPoints = 0;
    this._blackPoints = 0;
    this._whitePoints = 0;
    this._numCardsInDeck = 0;
    this._numCardsInHand = 0;
    super.initialize(rect);
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

  refresh() {
    this.clearContent();
    this.drawIcons();
    this.drawDisplay();
  }

  clearContent() {
    this.contents.clear();
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
    const redPoints = Helper.convertPointsDisplayPad(this._redPoints);
    const bluePoints = Helper.convertPointsDisplayPad(this._bluePoints);
    const greenPoints = Helper.convertPointsDisplayPad(this._greenPoints);
    const blackPoints = Helper.convertPointsDisplayPad(this._blackPoints);
    const whitePoints = Helper.convertPointsDisplayPad(this._whitePoints);
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
    const handPoints = Helper.convertPointsDisplayPad(this._numCardsInHand);
    const deckPoints = Helper.convertPointsDisplayPad(this._numCardsInDeck);
    this.contents.drawText(handPoints, xPositionHand, yPosition, width, height);
    this.contents.drawText(deckPoints, xPositionDeck, yPosition, width, height);
  }
}