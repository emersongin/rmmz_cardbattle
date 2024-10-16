// include ./StaticModeState.js
// include ./SelectionModeState.js

class CardsetSprite extends ActionSprite {
  static create(x, y) {
    const cardset = new CardsetSprite(x, y);
    return cardset;
  }

  static createPositions(numCards = 1, padingLeftToAdd = 0, x, y) {
    const positions = [];
    let padingLeft = 0;
    for (let i = 0; i < numCards; i++) {
      positions.push(CardsetSprite.createPosition(x || padingLeft, y || 0, i));
      padingLeft += padingLeftToAdd;
    }
    return positions;
  }

  static createPosition(x, y, index) {
    return { x, y, index };
  }

  static contentOriginalWidth() {
    const width = CardSprite.contentOriginalWidth() * 6;
    const spaceBetween = 5;
    return width + spaceBetween;
  }

  static contentOriginalHeight() {
    return CardSprite.contentOriginalHeight();
  }

  static createPositionsList(numCards) {
    if (numCards === 0) return [];
    const padding = CardsetSprite.getPaddingByNumCards(numCards);
    const positions = CardsetSprite.createPositions(numCards, padding);
    return positions;
  }

  static getPaddingByNumCards(numCards) {
    const maxWidth = CardsetSprite.contentOriginalWidth();
    let padding = Math.ceil(maxWidth / numCards);
    const spaceBetween = 1;
    const cardWidth = CardSprite.contentOriginalWidth() + spaceBetween;
    padding = Math.min(padding, cardWidth);
    padding = Math.max(padding, 1);
    return padding;
  }

  initialize(x, y) { 
    super.initialize(x, y);
    this._sprites = [];
    this._orderingSprites = [];
    this._status = new StaticModeState(this);
    this.setup();
  }

  setup() {
    this.setBackgroundColor('none');
    this.setSize();
    this.commandHide();
  }

  setBackgroundColor(color) {
    this.bitmap = new Bitmap(CardsetSprite.contentOriginalWidth(), CardsetSprite.contentOriginalHeight());
    if (color.toLowerCase() == 'none') return this.bitmap.clear();
    this.bitmap.fillAll(color || 'white');
  }

  setSize() {
    this.width = CardsetSprite.contentOriginalWidth();
    this.height = CardsetSprite.contentOriginalHeight();
  }

  staticMode() {
    this.addAction(this.commandStaticMode);
  }

  commandStaticMode() {
    return this._status?.staticMode();
  }

  setCards(cards, x, y) {
    cards = ArrayHelper.toArray(cards);
    const sprites = cards.map(card => this.createCardSprite(card, x, y));
    const orderingSprites = this.createOrderingNumbers(sprites);
    this._sprites = sprites;
    this._orderingSprites = orderingSprites;
    this.addAction(this.commandSetCards, sprites, orderingSprites);
    return sprites;
  }

  createCardSprite(card, x, y) {
    const { type, color, figureName, attack, health } = card;
    const sprite = CardSprite.create(type, color, figureName, attack, health, x, y);
    return sprite;
  }

  createOrderingNumbers(sprites) {
    return sprites.map((sprite, index) => {
      const number = index + 1;
      return this.createOrderingNumber(number, sprite);
    });
  }

  createOrderingNumber(number, sprite) {
    const { x: spriteX, y: spriteY, width: spriteWidth } = sprite;
    const orderingSprite = new Sprite();
    const width = 20;
    const height = 20;
    const x = (spriteX + spriteWidth) - width;
    const y = (spriteY - height);
    orderingSprite.x = x;
    orderingSprite.y = y;
    orderingSprite.bitmap = new Bitmap(width, height);
    orderingSprite.bitmap.drawText(number, 0, 0, width, height, 'center');
    orderingSprite.number = number;
    orderingSprite.hide();
    return orderingSprite;
  }

  commandSetCards(sprites, orderingSprites) {
    if (this.isHidden()) return false;
    this.clear();
    this.addSprites(sprites);
    this.addSprites(orderingSprites);
  }

  addSprites(sprites) {
    sprites.forEach((sprite, index) => this.addChild(sprite));
  }

  setAllCardsInPositions(sprites = this._sprites, positions) {
    sprites = ArrayHelper.toArray(sprites);
    this.addAction(this.commandSetAllCardsPositions, sprites, positions);
  }

  commandSetAllCardsPositions(sprites, positions) {
    if (this.isHidden()) return false;
    positions.forEach(({ x, y, index }) => {
      const sprite = sprites[index];
      sprite.setPosition(x, y);
    });
  }

  setAllCardsInPosition(sprites = this._sprites, x = 0, y = 0) {
    sprites = ArrayHelper.toArray(sprites);
    this.addAction(this.commandSetAllCardsPosition, sprites, x, y);
  }

  commandSetAllCardsPosition(sprites, x, y) {
    if (this.isHidden()) return false;
    sprites.forEach(sprite => sprite.setPosition(x, y));
  }

  showCards(sprites = this._sprites) {
    sprites = ArrayHelper.toArray(sprites);
    this.addAction(this.commandShowCards, sprites);
  }

  commandShowCards(sprites) {
    if (this.isHidden()) return false;
    sprites.forEach((sprite, index) => sprite.show());
    return true;
  }

  allCardsAreVisible(sprites = this._sprites) {
    return sprites.length && sprites.every(sprite => sprite.isVisible());
  }

  isSpritesPositions(positions, sprites = this._sprites) {
    return sprites.length && sprites.every((sprite, index) => {
      const position = positions.find(position => position.index === index);
      if (!position) return true;
      const { x, y } = position;
      return sprite.x === x && sprite.y === y;
    });
  }

  createCardSpritesPositions(positions, cards) {
    return positions.map(({ x, y, index }) => {
      const card = cards[index];
      return this.createCardSprite(card, x, y);
    });
  }

  listCards(cards) {
    cards = ArrayHelper.toArray(cards);
    const numCards = cards.length;
    const positions = CardsetSprite.createPositionsList(numCards);
    const sprites = this.createCardSpritesPositions(positions, cards);
    const orderingSprites = this.createOrderingNumbers(sprites);
    this._sprites = sprites;
    this._orderingSprites = orderingSprites;
    this.addAction(this.commandSetCards, sprites, orderingSprites);
    return sprites;
  }

  startClosedCards(sprites = this._sprites) {
    this.addAction(this.commandStartClosedCards, sprites);
  }

  commandStartClosedCards(sprites) {
    if (this.isHidden()) return false;
    sprites = ArrayHelper.toArray(sprites);
    sprites.forEach((sprite, index) => sprite.startClosed());
  }

  allCardsAreOpen(sprites = this._sprites) {
    return sprites.length && sprites.every(sprite => sprite.isOpened());
  }

  allCardsAreClosed(sprites = this._sprites) {
    return sprites.length && sprites.every(sprite => sprite.isClosed());
  }

  openAllCards(sprites = this._sprites) {
    sprites = ArrayHelper.toArray(sprites);
    this.addAction(this.commandOpenAllCards, sprites);
  }

  commandOpenAllCards(sprites) {
    if (this.isHidden()) return false;
    sprites.forEach(sprite => sprite.open());
  }

  closeAllCards(sprites = this._sprites) {
    sprites = ArrayHelper.toArray(sprites);
    this.addAction(this.commandCloseAllCards, sprites);
  }

  commandCloseAllCards(sprites) {
    if (this.isHidden()) return false;
    sprites.forEach(sprite => {
      const cardIndex = this.indexOfCardSprite(sprite);
      const orderingSprite = this.getOrderingSpriteByIndex(cardIndex);
      this.commandHideOrderingSprites([orderingSprite]);
      sprite.close();
    });
  }

  indexOfCardSprite(sprite) {
    return this._sprites.indexOf(sprite);
  }

  getOrderingSpriteByIndex(index) {
    return this._orderingSprites[index];
  }

  hideOrderingSprites(sprites) {
    this.addAction(this.commandHideOrderingSprites, sprites);
  }

  commandHideOrderingSprites(sprites) {
    if (this.isHidden()) return false;
    sprites.forEach(sprite => sprite.hide());
  }

  openCards(sprites = this._sprites, delay = 6, reverse = false) {
    if (this.noSprites()) return;
    sprites = ArrayHelper.toArray(sprites);
    sprites = sprites.map(sprite => [sprite]);
    if (reverse) sprites.reverse();
    this.addDelayedActions(this.commandOpenCard, delay, sprites);
  }

  noSprites() {
    return this._sprites.length === 0;
  }

  commandOpenCard(sprite) {
    if (this.isHidden()) return false;
    sprite.open();
  }

  closeCards(sprites = this._sprites, delay = 6, reverse = false) {
    if (this.noSprites()) return;
    sprites = ArrayHelper.toArray(sprites);
    sprites = sprites.map(sprite => [sprite]);
    if (reverse) sprites.reverse();
    this.addDelayedActions(this.commandCloseCard, delay, sprites);
  }

  commandCloseCard(sprite) {
    if (this.isHidden()) return false;
    const cardIndex = this.indexOfCardSprite(sprite);
    const orderingSprite = this.getOrderingSpriteByIndex(cardIndex);
    this.commandHideOrderingSprites([orderingSprite]);
    sprite.close();
  }

  moveAllCardsInlist(sprites = this._sprites) {
    sprites = ArrayHelper.toArray(sprites);
    const numCards = sprites.length;
    const positions = CardsetSprite.createPositionsList(numCards);
    const moves = this.moveCardsPositions(positions, sprites);
    this.addAction(this.commandMoveAllCards, moves);
  }

  moveCardsPositions(positions, sprites) {
    return positions.map(({ x, y, index }) => {
      const sprite = sprites[index];
      return { sprite, x, y };
    });
  }

  commandMoveAllCards(moves) {
    if (this.isHidden()) return false;
    moves.forEach(({ sprite, x, y }) => {
      const move = CardSprite.createMove(x, y);
      sprite.toMove(move);
    });
  }

  moveCardsInlist(sprites = this._sprites, delay = 6, triggerActions) {
    sprites = ArrayHelper.toArray(sprites);
    const numCards = sprites.length;
    const positions = CardsetSprite.createPositionsList(numCards);
    let moves = this.moveCardsPositions(positions, sprites);
    moves = moves.map(({ sprite, x, y }) => [sprite, x, y]);
    this.addDelayedActions(this.commandMoveCard, delay, moves, triggerActions);
  }

  commandMoveCard(sprite, x, y) {
    if (this.isHidden()) return false;
    const move = CardSprite.createMove(x, y);
    sprite.toMove(move);
  }

  moveAllCardsToPosition(sprites = this._sprites, x = 0, y = 0) {
    sprites = ArrayHelper.toArray(sprites);
    const numCards = sprites.length;
    const noPading = 0;
    const positions = CardsetSprite.createPositions(numCards, noPading, x, y);
    const moves = this.moveCardsPositions(positions, sprites);
    this.addAction(this.commandMoveAllCards, moves);
  }

  moveCardsToPosition(sprites = this._sprites, x = 0, y = 0, delay = 6) {
    sprites = ArrayHelper.toArray(sprites);
    const numCards = sprites.length;
    const noPading = 0;
    const positions = CardsetSprite.createPositions(numCards, noPading, x, y);
    let moves = this.moveCardsPositions(positions, sprites);
    moves = moves.map(({ sprite, x, y }) => [sprite, x, y]);
    this.addDelayedActions(this.commandMoveCard, delay, moves);
  }

  moveAllCardsToPositions(sprites = this._sprites, positions) {
    sprites = ArrayHelper.toArray(sprites);
    const moves = this.moveCardsPositions(positions, sprites);
    this.addAction(this.commandMoveAllCards, moves);
  }

  disableCards(sprites = this._sprites) {
    sprites = ArrayHelper.toArray(sprites);
    this.addAction(this.commandDisableCards, sprites);
  }

  commandDisableCards(sprites) {
    if (this.isHidden()) return false;
    sprites.forEach(sprite => {
      sprite.disable();
    });
  }

  isEnabledCardIndexs(indexs) {
    return indexs.every(index => this.getCardIndex(index).isEnabled());
  }

  getCardIndex(index) {
    return this._sprites[index || 0];
  }

  isDisabledCardIndexs(indexs) {
    return indexs.every(index => this.getCardIndex(index).isDisabled());
  }

  selectMode(selectNumber, onSelectHandler, onChangeCursor, onCancelHandler) {
    this.addAction(this.commandSelectMode, selectNumber, onSelectHandler, onChangeCursor, onCancelHandler);
  }

  commandSelectMode(selectNumber, onSelectHandler, onChangeCursor, onCancelHandler) {
    return this._status?.selectMode(selectNumber, onSelectHandler, onChangeCursor, onCancelHandler);
  }

  isSelectMode() {
    return this.getStatus() instanceof SelectionModeState;
  }

  isStaticMode() {
    return this.getStatus() instanceof StaticModeState;
  }

  iluminateSelectedSprites(selectedIndexs) {
    this.addAction(this.commandIluminateSelectedSprites, selectedIndexs);
  }

  commandIluminateSelectedSprites(selectedIndexs) {
    if (this.isHidden() || this.isStaticMode()) return false;
    const sprites = this._sprites;
    sprites.forEach((sprite, index) => {
      this.unhoverSprite(sprite, index);
      if (selectedIndexs.includes(index)) {
        sprite.unselect();
        sprite.iluminate();
      }
    });
  }

  unhoverSprite(sprite, index) {
    const destinyXPosition = sprite.x;
    const destinyYPosition = 0;
    const duration = 0.03;
    sprite.unhover();
    const move = CardSprite.createMove(destinyXPosition, destinyYPosition, sprite.x, sprite.y, duration);
    sprite.toMove(move);
    this.removeChild(sprite);
    this.addChildAt(sprite, index);
  }

  flashCardsAnimate(sprites = this._sprites, color = 'white', duration = 10, times = 1, trigger) {
    sprites = ArrayHelper.toArray(sprites);
    this.addTriggerAction(this.commandAnimateCardsFlash, trigger, sprites, color, duration, times);
  }

  commandAnimateCardsFlash(sprites, color, duration, times) {
    if (this.isHidden() || this.isBusy()) return false;
    sprites.forEach(sprite => {
      sprite.flash(color, duration, times);
    });
  }

  someSpriteIsFlashPlaying() {
    return this._sprites.some(sprite => sprite.isFlashPlaying());
  }

  quakeCardsAnimate(sprites = this._sprites, times = 2, distance = 3) {
    sprites = ArrayHelper.toArray(sprites);
    this.addAction(this.commandAnimateCardsQuake, sprites, times, distance);
  }

  commandAnimateCardsQuake(sprites, times, distance) {
    if (this.isHidden() || this.isBusy()) return false;
    const movements = CardSprite.generateQuakeMoves(times, distance);
    sprites.forEach(sprite => {
      sprite.quake(times, distance, movements);
    });
  }

  someSpriteIsMoving() {
    return this._sprites.some(sprite => sprite.isMoving());
  }

  damageCardsAnimate(times = 1, sprites = this._sprites, anchorParent = this.parent, trigger) {
    sprites = ArrayHelper.toArray(sprites);
    this.addTriggerAction(this.commandAnimateCardsDamage, trigger, times, sprites, anchorParent);
  }

  commandAnimateCardsDamage(times, sprites, anchorParent) {
    if (this.isHidden() || this.isBusy()) return false;
    sprites.forEach(sprite => {
      sprite.damage(times, anchorParent);
    });
  }

  someSpriteIsAnimationPlaying() {
    return this._sprites.some(sprite => sprite.isAnimationPlaying());
  }

  update() {
    super.update();
    if (this.hasChildren() && this.isHidden()) this.commandShow();
  }

  isBusy() {
    return super.isBusy() || this.someChildrenIsBusy();
  }

  someChildrenIsBusy() {
    if (!this.children || this.hasChildren() === false) return false;
    return this.children.some(sprite => {
      return (sprite instanceof CardSprite) && (sprite.hasActions() || sprite.isBusy());
    });
  }

  centralize() {
    const centerXPosition = (Graphics.boxWidth / 2 - CardsetSprite.contentOriginalWidth() / 2);
    const centerYPosition = (Graphics.boxHeight / 2 - CardsetSprite.contentOriginalHeight() / 2);
    this.x = centerXPosition;
    this.y = centerYPosition;
  }

  displayOrdering(indexes) {
    this.addAction(this.commandDisplayOrdering, indexes);
  }

  commandDisplayOrdering(indexes = this._orderingSprites.map((sprite, index) => index)) {
    if (this.isHidden() || this.hasOrderingNumbers() === false) return false;
    indexes.forEach(index => this._orderingSprites[index].show());
  }

  hasOrderingNumbers() {
    return this._orderingSprites.length;
  }

  setNumberColor(number, color) {
    this.addAction(this.commandSetNumberColor, number, color);
  }

  commandSetNumberColor(number, color) {
    const orderingSprite = this._orderingSprites[number - 1];
    const cardSprite = this._sprites[number - 1];
    if (orderingSprite) {
      this.redrawOrderingNumber(orderingSprite, number, cardSprite, ColorHelper.getColorHex(color));
    }
  }

  redrawOrderingNumber(orderingSprite, number, cardSprite, colorHex) {
    orderingSprite.bitmap.textColor = colorHex || orderingSprite.bitmap.textColor;
    orderingSprite.bitmap.clear();
    orderingSprite.number = number;
    orderingSprite.x = (cardSprite.x + cardSprite.width) - orderingSprite.width;
    orderingSprite.y = (cardSprite.y) - orderingSprite.height;
    orderingSprite.bitmap.drawText(number, 0, 0, orderingSprite.width, orderingSprite.height, 'center');
  }

  isOrderingDisplayed() {
    return this._orderingSprites.every(sprite => sprite.visible);
  }

  isOrderingSpriteDisplayed(index) {
    return this._orderingSprites[index].visible;
  }

  isOrdering() {
    const ordering = this._orderingSprites.map(sprite => sprite.number);
    return ordering.every((number, index) => number === index + 1);
  }

  displayReverseOrdering(indexes) {
    this.addAction(this.commandDisplayReverseOrdering, indexes);
  }

  commandDisplayReverseOrdering(indexes = this._orderingSprites.map((sprite, index) => index)) {
    if (this.isHidden() || this.hasOrderingNumbers() === false) return false;
    const ordering = this._orderingSprites.filter((sprite, index) => indexes.includes(index));
    ordering.forEach(sprite => {
      const number = ordering.length - (sprite.number - 1);
      const cardSprite = this._sprites[sprite.number - 1];
      this.redrawOrderingNumber(sprite, number, cardSprite);
    });
    indexes.forEach(index => this._orderingSprites[index].show());
  }

  isOrderingSpriteDrawedByIndex(index, number) {
    return this._orderingSprites[index].number === number;
  }

  isReverseOrdering() {
    const ordering = this._orderingSprites.map(sprite => sprite.number);
    return ordering.every((number, index) => number === this._orderingSprites.length - index);
  }

  getEnabledSpritesAmount() {
    return this.getSprites().filter(sprite => sprite.isEnabled()).length;
  }

  getSprites(indexes) {
    if (Array.isArray(indexes)) return this._sprites.filter((sprite, index) => indexes.includes(index));
    if (typeof indexes === 'number') return [this._sprites[indexes]];
    return this._sprites;
  }

  setTurnToDownCards(sprite = this._sprites) {
    this.addAction(this.commandFlipTurnToDownCards, sprite);
  }

  commandFlipTurnToDownCards(sprite) {
    if (this.isHidden()) return false;
    sprite.forEach(sprite => sprite.setTurnToDown());
  }

  allCardsTurnedToDown(sprites = this._sprites) {
    return sprites.length && sprites.every(sprite => sprite.isTurnedToDown());
  }

  zoomAllCards(sprites = this._sprites) {
    sprites = ArrayHelper.toArray(sprites);
    this.addAction(this.commandZoomAllCards, sprites);
  }

  commandZoomAllCards(sprites) {
    if (this.isHidden()) return false;
    sprites.forEach(sprite => sprite.zoom());
  }

  isCardsZoom(sprites = this._sprites) {
    return sprites.length && sprites.every(sprite => sprite.isZoom());
  }

  zoomOutAllCards(sprites = this._sprites) {
    sprites = ArrayHelper.toArray(sprites);
    this.addAction(this.commandZoomOutAllCards, sprites);
  }

  commandZoomOutAllCards(sprites) {
    if (this.isHidden()) return false;
    sprites.forEach(sprite => sprite.zoomOut());
  }

  isCardsOriginalScale(sprites = this._sprites) {
    return sprites.length && sprites.every(sprite => sprite.isOriginalScale());
  }

  getSpriteByIndex(index) {
    return this._sprites[index];
  }

  flipTurnToUpAllCards(sprites = this._sprites) {
    sprites = ArrayHelper.toArray(sprites);
    this.addAction(this.commandFlipTurnToUpAllCards, sprites);
  }

  commandFlipTurnToUpAllCards(sprites) {
    if (this.isHidden()) return false;
    sprites.forEach(sprite => sprite.flipTurnToUp());
  }

  allCardsAreTurnToUp(sprites = this._sprites) {
    return sprites.length && sprites.every(sprite => sprite.isTurnedToUp());
  }

  flipTurnToUpCards(sprites = this._sprites, delay = 6) {
    sprites = ArrayHelper.toArray(sprites);
    sprites = sprites.map(sprite => [sprite]);
    this.addDelayedActions(this.commandFlipTurnToUpCard, delay, sprites);
  }

  commandFlipTurnToUpCard(sprite) {
    if (this.isHidden()) return false;
    sprite.flipTurnToUp();
  }

  addChildToEnd(sprites) {
    this.addAction(this.commandAddChildToEnd, sprites);
  }

  commandAddChildToEnd(spritesToAdd) {
    if (this.isHidden()) return false;
    spritesToAdd = ArrayHelper.toArray(spritesToAdd);
    const indexsAmount = this._sprites.length - 1;
    this._sprites.forEach((sprite, index) => {
      if (spritesToAdd.includes(sprite)) {
        this.removeChild(sprite);
        this.addChildAt(sprite, indexsAmount);
      } else {
        this.removeChild(sprite);
        const fixLastCardIndex = (index === indexsAmount ? indexsAmount - 1 : index);
        this.addChildAt(sprite, fixLastCardIndex);
      }
    });
  }

  leaveAllCards(sprites = this._sprites) {
    sprites = ArrayHelper.toArray(sprites);
    this.addAction(this.commandLeaveAllCards, sprites);
  }

  commandLeaveAllCards(sprites) {
    if (this.isHidden()) return false;
    sprites.forEach(sprite => sprite.leave());
  }

  isCardsHidden(sprites = this._sprites) {
    return sprites.length && sprites.every(sprite => sprite.isHidden());
  }

  select(indexes) {
    const commandSelectHandler = this.getSelectHandler();
    this.addAction(commandSelectHandler, indexes);
    this.commandStaticMode();
  }

  getSelectHandler() {
    return this._status?.getSelectHandler();
  }

  cancel() {
    const commandCancelHandler = this.getCancelHandler();
    this.addAction(commandCancelHandler);
    this.commandStaticMode();
  }

  getCancelHandler() {
    return this._status?.getCancelHandler();
  }

  getIndexes() {
    return this._sprites.map((sprite, index) => index);
  }
}