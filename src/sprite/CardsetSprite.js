// include ./state/CardsetSpriteStaticModeState.js
// include ./state/CardsetSpriteSelectModeState.js

class CardsetSprite extends ActionSprite {
  static create(x, y) {
    const cardset = new CardsetSprite(x, y);
    return cardset;
  }

  static createPositions(numCards = 1, padingLeftToAdd = 0, x, y) {
    const positions = [];
    let padingLeft = 0;
    for (let i = 0; i < numCards; i++) {
      positions.push(CardSprite.createPosition(x || padingLeft, y || 0, i));
      padingLeft += padingLeftToAdd;
    }
    return positions;
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
    this._status = new CardsetSpriteStaticModeState(this);
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
    this.addCommand(this.commandStaticMode);
  }

  commandStaticMode() {
    return this._status.staticMode();
  }

  setCards(cards, x, y) {
    cards = this.toArray(cards);
    const sprites = cards.map(card => this.createCardSprite(card, x, y));
    const orderingSprites = this.createOrderingNumbers(sprites);
    this._sprites = sprites;
    this._orderingSprites = orderingSprites;
    this.addCommand(this.commandSetCards, sprites, orderingSprites);
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
    sprites = this.toArray(sprites);
    this.addCommand(this.commandSetAllCardsPositions, sprites, positions);
  }

  commandSetAllCardsPositions(sprites, positions) {
    if (this.isHidden()) return false;
    positions.forEach(({ x, y, index }) => {
      const sprite = sprites[index];
      sprite.setPosition(x, y);
    });
  }

  setAllCardsInPosition(sprites = this._sprites, x = 0, y = 0) {
    sprites = this.toArray(sprites);
    this.addCommand(this.commandSetAllCardsPosition, sprites, x, y);
  }

  commandSetAllCardsPosition(sprites, x, y) {
    if (this.isHidden()) return false;
    sprites.forEach(sprite => sprite.setPosition(x, y));
  }

  showCards(sprites = this._sprites) {
    sprites = this.toArray(sprites);
    this.addCommand(this.commandShowCards, sprites);
  }

  commandShowCards(sprites) {
    if (this.isHidden()) return false;
    sprites.forEach((sprite, index) => sprite.show());
    return true;
  }

  allCardsAreVisible() {
    return this._sprites.every(sprite => sprite.isVisible());
  }

  isSpritesPositions(positions, sprites = this._sprites) {
    return sprites.every((sprite, index) => {
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
    cards = this.toArray(cards);
    const numCards = cards.length;
    const positions = CardsetSprite.createPositionsList(numCards);
    const sprites = this.createCardSpritesPositions(positions, cards);
    const orderingSprites = this.createOrderingNumbers(sprites);
    this._sprites = sprites;
    this._orderingSprites = orderingSprites;
    this.addCommand(this.commandSetCards, sprites, orderingSprites);
    return sprites;
  }

  startClosedCards(sprites = this._sprites) {
    this.addCommand(this.commandStartClosedCards, sprites);
  }

  commandStartClosedCards(sprites) {
    if (this.isHidden()) return false;
    sprites = this.toArray(sprites);
    sprites.forEach((sprite, index) => sprite.startClosed());
  }

  allCardsIsClosed(sprites = this._sprites) {
    return sprites.every(sprite => sprite.isClosed());
  }

  openAllCards(sprites = this._sprites) {
    sprites = this.toArray(sprites);
    this.addCommand(this.commandOpenAllCards, sprites);
  }

  commandOpenAllCards(sprites) {
    if (this.isHidden()) return false;
    sprites.forEach(sprite => sprite.open());
  }

  closeAllCards(sprites = this._sprites) {
    sprites = this.toArray(sprites);
    this.addCommand(this.commandCloseAllCards, sprites);
  }

  commandCloseAllCards(sprites) {
    if (this.isHidden()) return false;
    sprites.forEach(sprite => sprite.close());
  }

  openCards(sprites = this._sprites, delay = 6, reverse = false) {
    if (this.noSprites()) return;
    sprites = this.toArray(sprites);
    sprites = sprites.map(sprite => [sprite]);
    if (reverse) sprites.reverse();
    const commands = this.createDelayCommands(this.commandOpenCard, delay, sprites);
    this.addCommands(commands);
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
    sprites = this.toArray(sprites);
    sprites = sprites.map(sprite => [sprite]);
    if (reverse) sprites.reverse();
    const commands = this.createDelayCommands(this.commandCloseCard, delay, sprites);
    this.addCommands(commands);
  }

  commandCloseCard(sprite) {
    if (this.isHidden()) return false;
    sprite.close();
  }

  moveAllCardsInlist(sprites = this._sprites) {
    sprites = this.toArray(sprites);
    const numCards = sprites.length;
    const positions = CardsetSprite.createPositionsList(numCards);
    const moves = this.moveCardsPositions(positions, sprites);
    this.addCommand(this.commandMoveAllCards, moves);
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

  moveCardsInlist(sprites = this._sprites, delay = 6, chainActions) {
    sprites = this.toArray(sprites);
    const numCards = sprites.length;
    const positions = CardsetSprite.createPositionsList(numCards);
    let moves = this.moveCardsPositions(positions, sprites);
    moves = moves.map(({ sprite, x, y }) => [sprite, x, y]);
    const commands = this.createDelayCommands(this.commandMoveCard, delay, moves, chainActions);
    this.addCommands(commands);
  }

  commandMoveCard(sprite, x, y) {
    if (this.isHidden()) return false;
    const move = CardSprite.createMove(x, y);
    sprite.toMove(move);
  }

  moveAllCardsToPosition(sprites = this._sprites, x = 0, y = 0) {
    sprites = this.toArray(sprites);
    const numCards = sprites.length;
    const noPading = 0;
    const positions = CardsetSprite.createPositions(numCards, noPading, x, y);
    const moves = this.moveCardsPositions(positions, sprites);
    this.addCommand(this.commandMoveAllCards, moves);
  }

  moveCardsToPosition(sprites = this._sprites, x = 0, y = 0, delay = 6) {
    sprites = this.toArray(sprites);
    const numCards = sprites.length;
    const noPading = 0;
    const positions = CardsetSprite.createPositions(numCards, noPading, x, y);
    let moves = this.moveCardsPositions(positions, sprites);
    moves = moves.map(({ sprite, x, y }) => [sprite, x, y]);
    const commands = this.createDelayCommands(this.commandMoveCard, delay, moves);
    this.addCommands(commands);
  }

  moveAllCardsToPositions(sprites = this._sprites, positions) {
    sprites = this.toArray(sprites);
    const moves = this.moveCardsPositions(positions, sprites);
    this.addCommand(this.commandMoveAllCards, moves);
  }

  disableCards(sprites = this._sprites) {
    sprites = this.toArray(sprites);
    this.addCommand(this.commandDisableCards, sprites);
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

  selectMode(selectNumber, onSelectHandler, onChangeCursor) {
    const chainActionVoid = () => {};
    this.addCommand(this.commandSelectMode, selectNumber, onSelectHandler, onChangeCursor, chainActionVoid);
  }

  commandSelectMode(selectNumber, onSelectHandler, onChangeCursor) {
    return this._status.selectMode(selectNumber, onSelectHandler, onChangeCursor);
  }

  allCardsAreOpened(sprites = this._sprites) {
    return sprites.every(sprite => sprite.isOpened());
  }

  isSelectMode() {
    return this.getStatus() instanceof CardsetSpriteSelectModeState;
  }

  isStaticMode() {
    return this.getStatus() instanceof CardsetSpriteStaticModeState;
  }

  iluminateSelectedSprites(selectedIndexs) {
    this.addCommand(this.commandIluminateSelectedSprites, selectedIndexs);
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

  flashCardsAnimate(sprites = this._sprites, color = 'white', duration = 10, times = 1, chainAction) {
    sprites = this.toArray(sprites);
    this.addCommand(this.commandAnimateCardsFlash, sprites, color, duration, times, chainAction);
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
    sprites = this.toArray(sprites);
    this.addCommand(this.commandAnimateCardsQuake, sprites, times, distance);
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

  damageCardsAnimate(times = 1, sprites = this._sprites, anchorParent = this.parent, chainAction) {
    sprites = this.toArray(sprites);
    this.addCommand(this.commandAnimateCardsDamage, times, sprites, anchorParent, chainAction);
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

  executeCommand() {
    super.executeCommand();
  }

  isBusy() {
    return super.isBusy() || this.someChildrenIsBusy();
  }

  someChildrenIsBusy() {
    return this.children.some(sprite => {
      return (sprite instanceof CardSprite) && (sprite.hasCommands() || sprite.isBusy());
    });
  }

  centralize() {
    const centerXPosition = (Graphics.boxWidth / 2 - CardsetSprite.contentOriginalWidth() / 2);
    const centerYPosition = (Graphics.boxHeight / 2 - CardsetSprite.contentOriginalHeight() / 2);
    this.x = centerXPosition;
    this.y = centerYPosition;
  }

  displayOrdering() {
    this.addCommand(this.commandDisplayOrdering);
  }

  commandDisplayOrdering() {
    if (this.isHidden() || this.hasOrderingNumbers() === false) return false;
    this._orderingSprites.forEach(sprite => sprite.show());
  }

  hasOrderingNumbers() {
    return this._orderingSprites.length;
  }

  setNumberColor(number, color) {
    this.addCommand(this.commandSetNumberColor, number, color);
  }

  commandSetNumberColor(number, color) {
    const orderingSprite = this._orderingSprites[number - 1];
    if (orderingSprite) {
      this.redrawOrderingNumber(orderingSprite, number, ColorHelper.getColorHex(color));
    }
  }

  redrawOrderingNumber(orderingSprite, number, colorHex) {
    orderingSprite.bitmap.textColor = colorHex || orderingSprite.bitmap.textColor;
    orderingSprite.bitmap.clear();
    orderingSprite.number = number;
    orderingSprite.bitmap.drawText(number, 0, 0, orderingSprite.width, orderingSprite.height, 'center');
  }

  isOrderingDisplayed() {
    return this._orderingSprites.every(sprite => sprite.visible);
  }

  isOrdering() {
    return this._orderingSprites.every((sprite, index) => sprite.number === index + 1);
  }

  displayReverseOrdering() {
    this.addCommand(this.commandDisplayReverseOrdering);
  }

  commandDisplayReverseOrdering() {
    if (this.isHidden() || this.hasOrderingNumbers() === false) return false;
    this._orderingSprites.forEach(sprite => {
      const number = this._orderingSprites.length - (sprite.number - 1);
      this.redrawOrderingNumber(sprite, number);
    });
    this._orderingSprites.forEach(sprite => sprite.show());
  }

  isReverseOrdering() {
    return this._orderingSprites.every((sprite, index) => sprite.number === this._orderingSprites.length - index);
  }

  getEnabledSpritesAmount() {
    return this.getSprites().filter(sprite => sprite.isEnabled()).length;
  }

  getSprites(index) {
    if (index >= 0) return this._sprites[index];
    return this._sprites;
  }

  setTurnToDownCards(sprite = this._sprites) {
    this.addCommand(this.commandFlipTurnToDownCards, sprite);
  }

  commandFlipTurnToDownCards(sprite) {
    if (this.isHidden()) return false;
    sprite.forEach(sprite => sprite.setTurnToDown());
  }

  allCardsTurnedToDown() {
    return this._sprites.every(sprite => sprite.isTurnedToDown());
  }

  zoomAllCards(sprites = this._sprites) {
    sprites = this.toArray(sprites);
    this.addCommand(this.commandZoomAllCards, sprites);
  }

  commandZoomAllCards(sprites) {
    if (this.isHidden()) return false;
    sprites.forEach(sprite => sprite.zoom());
  }

  isCardsZoom() {
    return this._sprites.every(sprite => sprite.isZoom());
  }

  zoomOutAllCards(sprites = this._sprites) {
    sprites = this.toArray(sprites);
    this.addCommand(this.commandZoomOutAllCards, sprites);
  }

  commandZoomOutAllCards(sprites) {
    if (this.isHidden()) return false;
    sprites.forEach(sprite => sprite.zoomOut());
  }

  isCardsOriginalScale() {
    return this._sprites.every(sprite => sprite.isOriginalScale());
  }

  getSpriteByIndex(index) {
    return this._sprites[index];
  }

  flipTurnToUpAllCards(sprites = this._sprites) {
    sprites = this.toArray(sprites);
    this.addCommand(this.commandFlipTurnToUpAllCards, sprites);
  }

  commandFlipTurnToUpAllCards(sprites) {
    if (this.isHidden()) return false;
    sprites.forEach(sprite => sprite.flipTurnToUp());
  }

  allCardsAreTurnToUp() {
    return this._sprites.every(sprite => sprite.isTurnedToUp());
  }

  flipTurnToUpCards(sprites = this._sprites, delay = 6) {
    sprites = this.toArray(sprites);
    sprites = sprites.map(sprite => [sprite]);
    const commands = this.createDelayCommands(this.commandFlipTurnToUpCard, delay, sprites);
    this.addCommands(commands);
  }

  commandFlipTurnToUpCard(sprite) {
    if (this.isHidden()) return false;
    sprite.flipTurnToUp();
  }

  addChildToEnd(sprite) {
    this.addCommand(this.commandAddChildToEnd, sprite);
  }

  commandAddChildToEnd(spriteToAdd) {
    if (this.isHidden()) return false;
    const indexsAmount = this._sprites.length - 1;
    this._sprites.forEach((sprite, index) => {
      if (spriteToAdd === sprite) {
        this.removeChild(sprite);
        this.addChildAt(sprite, indexsAmount);
      } else {
        this.removeChild(sprite);
        const fixLastCardIndex = (index === indexsAmount ? indexsAmount - 1 : index);
        this.addChildAt(sprite, fixLastCardIndex);
      }
    });
  }
}