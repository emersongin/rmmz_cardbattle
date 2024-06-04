class CardSpriteStoppedState {
  _card;
  
  constructor(sprite) {
    if (!(sprite instanceof CardSprite)) {
      throw new Error('sprite is not a CardSprite instance!');
    }
    this._card = sprite;
  }

  stop() {
    return false;
  }

  open() {
    const that = this._card;
    if (that.isOpened()) return false;
    const xPositionOpening = that.x - (CardSprite.contentOriginalWidth() / 2);
    const yPositionOpening = that.y;
    that.changeStatus(CardSpriteOpeningState, xPositionOpening, yPositionOpening);
  }

  close() {
    const that = this._card;
    if (that.isClosed()) return false;
    const xPositionClosing = that.x + (CardSprite.contentOriginalWidth() / 2);
    const yPositionOpening = that.y;
    that.changeStatus(CardSpriteOpeningState, xPositionClosing, yPositionOpening);
  }
  
  toMove(moves) {
    const that = this._card;
    if (that.isClosed()) return false;
    that.changeStatus(CardSpriteMovingState, moves);
  }
  
  zoom() {
    const that = this._card;
    if (that.isClosed() || that.isZoom()) return false;
    const destinyXPosition = that.x - ((that.width / 2) / 2);
    const destinyYPosition = that.y - ((that.height / 2) / 2);
    const destinyXScale = (that.scale.x / 2) * 3;
    const destinyYScale = (that.scale.y / 2) * 3;
    that.changeStatus(CardSpriteZoomState, destinyXPosition, destinyYPosition, destinyXScale, destinyYScale);
  }
  
  zoomOut() {
    const that = this._card;
    if (that.isClosed() || that.isOriginalScale()) return false;
    const destinyXPosition = that.x + ((that.width / 2) / 2);
    const destinyYPosition = that.y + ((that.height / 2) / 2);
    const destinyXScale = ((that.scale.x / 3) * 2);
    const destinyYScale = ((that.scale.y / 3) * 2);
    that.changeStatus(CardSpriteZoomState, destinyXPosition, destinyYPosition, destinyXScale, destinyYScale);
  }
  
  leave() {
    const that = this._card;
    if (that.isClosed()) return false;
    const xPositionClosing = that.x + (CardSprite.contentOriginalWidth() / 2);
    const yPositionClosing = that.y + (CardSprite.contentOriginalHeight() / 2);
    that.changeStatus(CardSpriteOpeningState, xPositionClosing, yPositionClosing);
  }

  updateStatus() {
    // nothing
  }
}