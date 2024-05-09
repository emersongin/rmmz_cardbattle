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

  initialize(x, y) { 
    super.initialize(x, y);
    this._sprites = [];
    this._enableSelected = false;
    this._selectedIndexs = [];
    this.setup();
  }

  setup() {
    this.setBackgroundColor('white' || 'none');
    this.setSize();
    this.hide();
    this.staticMode();
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

  static contentOriginalWidth() {
    const width = CardSprite.contentOriginalWidth() * 6;
    const spaceBetween = 5;
    return width + spaceBetween;
  }

  static contentOriginalHeight() {
    const heightLimit = 128;
    return heightLimit;
  }

  staticMode() {
    this.addAction(this.commandStaticMode);
  }

  commandStaticMode() {
    this.changeStatus(CardsetSpriteStaticModeState);
    return true;
  }

  setCards(cards, x, y) {
    cards = this.toArray(cards);
    const sprites = cards.map(card => this.createCardSprite(card, x, y));
    this.addAction(this.commandSetCards, sprites);
    return sprites;
  }

  createCardSprite(card, x, y) {
    const { type, color, figureName, attack, health } = card;
    const sprite = CardSprite.create(type, color, figureName, attack, health, x, y);
    return sprite;
  }

  commandSetCards(sprites) {
    if (this.isHidden()) return;
    this.clear();
    this._sprites = sprites;
    this.addSprites(sprites);
    return true;
  }

  addSprites(sprites) {
    sprites.forEach((sprite, index) => this.addChild(sprite));
  }

  showCards(sprites = this._sprites) {
    sprites = this.toArray(sprites);
    this.addAction(this.commandShowCards, sprites);
  }

  commandShowCards(sprites) {
    if (this.isHidden()) return;
    sprites.forEach((sprite, index) => sprite.show());
    return true;
  }

  allCardsAreVisible() {
    return this._sprites.every(sprite => sprite.isVisible());
  }

  isSpritesPositions(positions, sprites = this.children) {
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
    this.addAction(this.commandSetCards, sprites);
    return sprites;
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

  startClosedCards(sprites = this._sprites) {
    this.addAction(this.commandStartClosedCards, sprites);
  }

  commandStartClosedCards(sprites) {
    if (this.isHidden()) return;
    sprites = this.toArray(sprites);
    sprites.forEach((sprite, index) => sprite.startClosed());
    return true;
  }

  allCardsIsClosed(sprites = this._sprites) {
    return sprites.every(sprite => sprite.isClosed());
  }

  openAllCards(sprites = this._sprites) {
    sprites = this.toArray(sprites);
    this.addAction(this.commandOpenAllCards, sprites);
  }

  commandOpenAllCards(sprites) {
    if (this.isHidden()) return;
    sprites.forEach(sprite => sprite.open());
    return true;
  }

  closeAllCards(sprites = this._sprites) {
    sprites = this.toArray(sprites);
    this.addAction(this.commandCloseAllCards, sprites);
  }

  commandCloseAllCards(sprites) {
    if (this.isHidden()) return;
    sprites.forEach(sprite => sprite.close());
    return true;
  }

  openCards(sprites = this._sprites, delay = 6, reverse = false) {
    sprites = this.toArray(sprites);
    sprites = sprites.map(sprite => [sprite]);
    if (reverse) sprites.reverse();
    const actions = this.createActionsWithDelay(this.commandOpenCard, delay, sprites);
    this.addActions(actions);
  }

  commandOpenCard(sprite) {
    if (this.isHidden()) return;
    sprite.open();
    return true;
  }

  closeCards(sprites = this._sprites, delay = 6, reverse = false) {
    sprites = this.toArray(sprites);
    sprites = sprites.map(sprite => [sprite]);
    if (reverse) sprites.reverse();
    const actions = this.createActionsWithDelay(this.commandCloseCard, delay, sprites);
    this.addActions(actions);
  }

  commandCloseCard(sprite) {
    if (this.isHidden()) return;
    sprite.close();
    return true;
  }

  moveAllCardsInlist(sprites = this._sprites) {
    sprites = this.toArray(sprites);
    const numCards = sprites.length;
    const positions = CardsetSprite.createPositionsList(numCards);
    const moves = this.moveCardsPositions(positions, sprites);
    this.addAction(this.commandMoveAllCards, moves);
  }

  commandMoveAllCards(moves) {
    if (this.isHidden()) return;
    moves.forEach(({ sprite, x, y }) => {
      const move = CardSprite.createMove(x, y);
      sprite.toMove(move);
    });
    return true;
  }

  moveCardsInlist(sprites = this._sprites, delay = 6) {
    sprites = this.toArray(sprites);
    const numCards = sprites.length;
    const positions = CardsetSprite.createPositionsList(numCards);
    let moves = this.moveCardsPositions(positions, sprites);
    moves = moves.map(({ sprite, x, y }) => [sprite, x, y]);
    const actions = this.createActionsWithDelay(this.commandMoveCard, delay, moves);
    this.addActions(actions);
  }

  commandMoveCard(sprite, x, y) {
    if (this.isHidden()) return;
    const move = CardSprite.createMove(x, y);
    sprite.toMove(move);
    return true;
  }

  moveAllCardsToPosition(sprites = this._sprites, x = 0, y = 0) {
    sprites = this.toArray(sprites);
    const numCards = sprites.length;
    const noPading = 0;
    const positions = CardsetSprite.createPositions(numCards, noPading, x, y);
    const moves = this.moveCardsPositions(positions, sprites);
    this.addAction(this.commandMoveAllCards, moves);
  }

  moveCardsToPosition(sprites = this._sprites, x = 0, y = 0, delay = 6) {
    sprites = this.toArray(sprites);
    const numCards = sprites.length;
    const noPading = 0;
    const positions = CardsetSprite.createPositions(numCards, noPading, x, y);
    let moves = this.moveCardsPositions(positions, sprites);
    moves = moves.map(({ sprite, x, y }) => [sprite, x, y]);
    const actions = this.createActionsWithDelay(this.commandMoveCard, delay, moves);
    this.addActions(actions);
  }

  setAllCardsToPosition(sprites = this._sprites, x = 0, y = 0) {
    sprites = this.toArray(sprites);
    this.addAction(this.commandSetAllCardsToPosition, sprites, x, y);
  }

  commandSetAllCardsToPosition(sprites, x, y) {
    if (this.isHidden()) return;
    sprites.forEach(sprite => sprite.startPosition(x, y));
    return true;
  }

  disableCards(sprites = this._sprites) {
    sprites = this.toArray(sprites);
    this.addAction(this.commandDisableCards, sprites);
  }

  commandDisableCards(sprites) {
    if (this.isHidden()) return;
    sprites.forEach(sprite => {
      sprite.disable();
    });
    return true;
  }

  isEnabledCardIndexs(indexs) {
    return indexs.every(index => this.getCardIndex(index).isEnabled());
  }

  isDisabledCardIndexs(indexs) {
    return indexs.every(index => this.getCardIndex(index).isDisabled());
  }

  selectMode() {
    this.addAction(this.commandSelectMode);
  }

  commandSelectMode() {
    const isNot = !(this.isVisible() && this.allCardsIsOpened());
    if (isNot) return;
    this.changeStatus(CardsetSpriteSelectModeState);
    return true;
  }

  allCardsIsOpened(sprites = this._sprites) {
    return sprites.every(sprite => sprite.isOpened());
  }

  isSelectMode() {
    return this.getStatus() instanceof CardsetSpriteSelectModeState;
  }

  unselectMode() {
    this.addAction(this.commandUnselectMode);
  }

  commandUnselectMode() {
    if (this.isStaticMode()) return true;
    this._enableSelected = false;
    if (this._selectedIndexs.length) {
      this._selectedIndexs.forEach(index => {
        const sprite = this.getCardIndex(index);
        sprite.unselect();
        sprite.iluminate();
      });
    }
    this.staticMode();
    return true;
  }

  isStaticMode() {
    return this.getStatus() instanceof CardsetSpriteStaticModeState;
  }

  enableChoice() {
    this.addAction(this.commandEnableChoice);
  }

  commandEnableChoice() {
    const isNot = !this.isSelectMode();
    if (isNot) return;
    this._enableSelected = true;
    this._selectedIndexs = [];
    return true;
  }

  isEnableChoice() {
    return this._enableSelected;
  }

















  moveCardsPositions(positions, sprites) {
    return positions.map(({ x, y, index }) => {
      const sprite = sprites[index];
      return { sprite, x, y };
    });
  }

  commandMoveCards(moves) {
    if (this.isHidden()) return;
    moves.forEach(({ sprite, x, y }) => {
      const move = CardSprite.createMove(x, y);
      sprite.toMove(move);
    });
  }

  update() {
    super.update();
    if (this.numberOfChildren() && this.isHidden()) this.show();
  }

  isBusy() {
    return super.isBusy() || this.someSpriteIsBusy();
  }

  someSpriteIsBusy() {
    return this._sprites.some(sprite => sprite.isBusy());
  }

  setCard(card) {
    return this.setCards(card).shift();
  }

  addCard(card) {
    return this.addCards(card).shift();
  }

  addCards(cards) {
    cards = this.toArray(cards);
    const sprites = cards.map(card => this.createCardSprite(card));
    this.addSprites(sprites);
    sprites.forEach(sprite => this._sprites.push(sprite));
    return sprites;
  }

  // startPositionCard(sprite, xPosition, yPosition) {
  //   this.startPositionCards(xPosition, yPosition, sprite);
  // }

  // startPositionCards(xPosition, yPosition, sprites = this._sprites) {
  //   sprites = this.toArray(sprites);
  //   sprites.forEach(sprite => {
  //     sprite.setPosition(xPosition, yPosition);
  //   });
  // }

  // startListCard(sprite) {
  //   return this.startListCards(sprite);
  // }

  // startListCards(sprites = this._sprites, exceptSprites = []) {
  //   const positions = [];
  //   sprites = this.toArray(sprites);
  //   sprites.forEach(sprite => {
  //     if (exceptSprites.includes(sprite)) return;
  //     const index = this.indexOfSprite(sprite);
  //     if (index < 0) return;
  //     const { x, y } = this.getSpritePosition(index);
  //     sprite.setPosition(x, y);
  //     positions.push({ index, x, y });
  //   });
  //   return positions;
  // }

  getSpritePosition(index, numberOfChildren = this.numberOfChildren()) {
    const spaceBetween = this.spaceBetweenCards(numberOfChildren) * index;
    const x = index ? spaceBetween : 0;
    const y = 0;
    return { x, y };
  }

  spaceBetweenCards(total) {
    const contentLimit = CardsetSprite.contentOriginalWidth();
    const padding = 1;
    const cardWidth = 96;
    const space = (contentLimit - (padding * total)) / (total || 1);
    return parseInt(Math.ceil(space) < cardWidth ? space : cardWidth + padding) || padding;
  }

  startOpenCard(sprite) {
    this.startOpenCards(sprite);
  }

  startOpenCards(sprites = this._sprites) {
    sprites = this.toArray(sprites);
    sprites.forEach(sprite => {
      sprite.startOpen();
    });
  }

  startClosedCard(sprite) {
    this.startClosedCards(sprite);
  }



  showCard(sprite) {
    this.showCards(sprite);
  }

  openCard(sprite) {
    this.openCards(sprite);
  }



  closeCard(sprite) {
    this.closeCards(sprite);
  }





  moveCardToList(sprite, exceptSprites) {
    return this.moveCardsToList(sprite, exceptSprites);
  }

  moveCardsToList(sprites = this._sprites, exceptSprites) {
    sprites = this.toArray(sprites);
    this.startListCards(this._sprites, exceptSprites || sprites);
    const positions = this.calculateSpritesPositionsToList(sprites);
    this.addAction(this.commandMoveCardsToList, positions);
    return positions;
  }

  calculateSpritesPositionsToList(sprites = this._sprites) {
    const positions = [];
    sprites.forEach(sprite => {
      const index = this.indexOfSprite(sprite);
      const { x, y } = this.getSpritePosition(index);
      positions.push({ index, x, y });
    });
    return positions;
  }

  moveCardsToListDelay(delay = 10, sprites = this._sprites, exceptSprites) {
    sprites = this.toArray(sprites);
    this.startListCards(this._sprites, exceptSprites || sprites);
    const positions = this.calculateSpritesPositionsToList(sprites);
    const actions = this.createActionsWithDelay(this.commandMoveCardsToList, delay, positions);
    this.addActions(actions);
    return positions;
  }

  commandMoveCardsToList(positions) {
    if (this.isHidden()) return;
    positions.forEach(({ index, x, y }) => {
      if (index < 0) return;
      const move = CardSprite.createMove(x, y);
      this._sprites[index].toMove(move);
    });
  }

  moveCardToPosition(sprite, x, y) {
    this.moveCardsToPosition(x, y, sprite);
  }



  commandMoveCardsToPosition(x, y, sprites) {
    if (this.isHidden()) return;
    sprites.forEach(sprite => {
      const move = CardSprite.createMove(x, y);
      sprite.toMove(move);
    });
  }









  getCardIndexs(indexs) {
    return indexs.map(index => this.getCardIndex(index)) || this._sprites;
  }

  getCardIndex(index) {
    return this._sprites[index || 0];
  }



  animateCardFlash(sprite, color, duration, times) {
    this.animateCardsFlash(color, duration, times, sprite);
  }

  animateCardsFlash(color = 'white', duration = 60, times = 1, sprites = this._sprites) {
    sprites = this.toArray(sprites);
    this.addAction(this.commandAnimateCardsFlash, sprites, color, duration, times);
  }

  commandAnimateCardsFlash(sprites, color, duration, times) {
    if (this.isHidden() || this.isBusy()) return;
    sprites.forEach(sprite => {
      sprite.flash(color, duration, times);
    });
  }

  animateCardDamage(sprite, times) {
    this.animateCardsDamage(times, sprite);
  }

  animateCardsDamage(times = 1, sprites = this._sprites) {
    sprites = this.toArray(sprites);
    this.addAction(this.commandAnimateCardsDamage, sprites, times);
  }

  commandAnimateCardsDamage(sprites, times) {
    if (this.isHidden() || this.isBusy()) return;
    sprites.forEach(sprite => {
      sprite.damage(times, this.parent);
    });
  }

  animateCardQuake(sprite, times, distance) {
    this.animateCardsQuake(times, distance, sprite);
  }

  animateCardsQuake(times, distance, sprites = this._sprites) {
    sprites = this.toArray(sprites);
    this.addAction(this.commandAnimateCardsQuake, sprites, times, distance);
  }

  commandAnimateCardsQuake(sprites, times, distance) {
    if (this.isHidden() || this.isBusy()) return;
    const movements = this.generateQuakeMoves(times, distance);
    sprites.forEach(sprite => {
      sprite.quake(times, distance, movements);
    });
  }

  disableCard(sprite) {
    this.disableCards(sprite);
  }



  enableCard(sprite) {
    this.enableCards(sprite);
  }

  enableCards(sprites = this._sprites) {
    sprites = this.toArray(sprites);
    this.addAction(this.commandEnableCards, sprites);
  }

  commandEnableCards(sprites) {
    if (this.isHidden()) return;
    sprites.forEach(sprite => {
      sprite.enable();
    });
  }

  allCardsClosed() {
    return this._sprites.every(sprite => sprite.isClosed());
  }



  someSpriteIsAnimationPlaying() {
    return this.children.some(sprite => sprite.isAnimationPlaying());
  }

  someSpriteIsFlashPlaying() {
    return this.children.some(sprite => sprite.isFlashPlaying());
  }

  someSpriteIsMoving() {
    return this.children.some(sprite => sprite.isMoving());
  }

 



}