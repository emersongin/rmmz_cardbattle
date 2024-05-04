// include ./state/CardsetSpriteStaticModeState.js
// include ./state/CardsetSpriteSelectModeState.js

class CardsetSprite extends ActionSprite {
  initialize() { 
    super.initialize();
    this._sprites = [];
    this._enableSelected = false;
    this._selectedIndexs = [];
    this.setup();
  }

  setup() {
    this.startPosition(0, 0);
    this.setBackgroundColor('none');
    this.setSize();
    this.staticMode();
    this.commandHide();
  }

  startPosition(xPosition, yPosition) {
    this.x = xPosition || this.x;
    this.y = yPosition || this.y;
  }

  setBackgroundColor(color) {
    this.bitmap = new Bitmap(this.contentOriginalWidth(), this.contentOriginalHeight());
    if (color.toLowerCase() == 'none') return this.bitmap.clear();
    this.bitmap.fillAll(color || 'white');
  }

  setSize() {
    this.width = this.contentOriginalWidth();
    this.height = this.contentOriginalHeight();
  }

  contentOriginalWidth() {
    const widthLimit = 576;
    const padding = 1;
    return widthLimit + padding;
  }

  contentOriginalHeight() {
    const heightLimit = 128;
    return heightLimit;
  }

  staticMode() {
    this.changeStatus(CardsetSpriteStaticModeState);
  }

  static create() {
    const cardset = new CardsetSprite();
    return cardset;
  }

  setCard(card) {
    return this.setCards(card).shift();
  }

  setCards(cards) {
    this.clear();
    cards = this.toArray(cards);
    const sprites = cards.map(card => this.createCardSprite(card));
    this.addSprites(sprites);
    this._sprites = sprites;
    return sprites;
  }

  addSprites(sprites) {
    sprites = this.toArray(sprites);
    sprites.forEach((sprite, index) => {
      sprite.setPosition(0, 0);
      this.addChild(sprite);
    });
  }

  createCardSprite(card) {
    const { type, color, figureName, attack, health } = card;
    const sprite = CardSprite.create(type, color, figureName, attack, health);
    return sprite;
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

  startPositionCard(sprite, xPosition, yPosition) {
    this.startPositionCards(xPosition, yPosition, sprite);
  }

  startPositionCards(xPosition, yPosition, sprites = this._sprites) {
    sprites = this.toArray(sprites);
    sprites.forEach(sprite => {
      sprite.setPosition(xPosition, yPosition);
    });
  }

  startListCard(sprite) {
    return this.startListCards(sprite);
  }

  startListCards(sprites = this._sprites, exceptSprites = []) {
    const positions = [];
    sprites = this.toArray(sprites);
    sprites.forEach(sprite => {
      if (exceptSprites.includes(sprite)) return;
      const index = this.indexOfSprite(sprite);
      if (index < 0) return;
      const { x, y } = this.getSpritePosition(index);
      sprite.setPosition(x, y);
      positions.push({ index, x, y });
    });
    return positions;
  }

  getSpritePosition(index, numberOfChildren = this.numberOfChildren()) {
    const spaceBetween = this.spaceBetweenCards(numberOfChildren) * index;
    const x = index ? spaceBetween : 0;
    const y = 0;
    return { x, y };
  }

  spaceBetweenCards(total) {
    const contentLimit = this.contentOriginalWidth();
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

  startClosedCards(sprites = this._sprites) {
    sprites = this.toArray(sprites);
    sprites.forEach((sprite, index) => {
      sprite.startClosed();
    });
  }

  showCard(sprite) {
    this.showCards(sprite);
  }

  showCards(sprites = this._sprites) {
    sprites = this.toArray(sprites);
    this.addAction(this.commandShowCards, sprites);
  }

  commandShowCards(sprites) {
    if (this.isHidden()) return;
    sprites.forEach((sprite, index) => {
      sprite.show();
    });
    return true;
  }

  openCard(sprite) {
    this.openCards(sprite);
  }

  openCards(sprites = this._sprites) {
    sprites = this.toArray(sprites);
    this.addAction(this.commandOpenCards, sprites);
  }

  commandOpenCards(sprites) {
    if (this.isHidden()) return;
    sprites.forEach(sprite => {
      sprite.open();
    });
    return true;
  }

  openCardsWithDelay(delay = 1, sprites = this._sprites) {
    sprites = this.toArray(sprites);
    const actions = this.createActionsWithDelay(this.commandOpenCards, delay, sprites);
    this.addActions(actions);
  }

  createActionsWithDelay(fn, delay, sprites) {
    sprites = this.toArray(sprites);
    const actions = sprites.map((sprite, index) => {
      return this.createAction({
        fn, 
        delay: (index === 0) ? 0 : delay
      }, this.toArray(sprite));
    });
    return actions;
  }

  closeCard(sprite) {
    this.closeCards(sprite);
  }

  closeCards(sprites = this._sprites) {
    sprites = this.toArray(sprites);
    this.addAction(this.commandCloseCards, sprites);
  }

  commandCloseCards(sprites) {
    if (this.isHidden()) return;
    sprites.forEach(sprite => {
      sprite.close();
    });
    return true;
  }

  closeCardsWithDelay(delay = 1, sprites = this._sprites) {
    sprites = this.toArray(sprites);
    const actions = this.createActionsWithDelay(this.commandCloseCards, delay, sprites);
    this.addActions(actions);
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
    return true;
  }

  moveCardToPosition(sprite, x, y) {
    this.moveCardsToPosition(x, y, sprite);
  }

  moveCardsToPosition(x = 0, y = 0, sprites = this._sprites) {
    sprites = this.toArray(sprites);
    this.addAction(this.commandMoveCardsToPosition, x, y, sprites);
  }

  commandMoveCardsToPosition(x, y, sprites) {
    if (this.isHidden()) return;
    sprites.forEach(sprite => {
      const move = CardSprite.createMove(x, y);
      sprite.toMove(move);
    });
    return true;
  }

  update() {
    super.update();
    if (this.hasActions() && this.isAvailable()) this.executeAction();
    if (this.numberOfChildren() && this.isHidden()) this.commandShow();
    if (this.isVisible()) {
      this.updateStatus();
    }
  }

  isBusy() {
    return this._sprites.some(sprite => sprite.isBusy()) || super.isBusy();
  }

  selectMode() {
    this.addAction(this.commandSelectMode);
  }

  commandSelectMode() {
    if (!(this.isVisible() && this.allSpritesIsOpened())) return;
    this.changeStatus(CardsetSpriteSelectModeState);
    return true;
  }

  allSpritesIsOpened() {
    return this._sprites.every(sprite => sprite.isOpened());
  }

  unselectMode() {
    this.addAction(this.commandUnselectMode);
  }

  commandUnselectMode() {
    if (!this.isVisible() && this.isSelectMode()) return;
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

  isSelectMode() {
    return this.getStatus() instanceof CardsetSpriteSelectModeState;
  }

  getCardIndexs(indexs) {
    return indexs.map(index => this.getCardIndex(index)) || this._sprites;
  }

  getCardIndex(index) {
    return this._sprites[index || 0];
  }

  enableChoice() {
    this.addAction(this.commandEnableChoice);
  }

  commandEnableChoice() {
    if (!this.isSelectMode()) return;
    this._enableSelected = true;
    this._selectedIndexs = [];
    return true;
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
    return true;
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
    return true;
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
    return true;
  }

  disableCard(sprite) {
    this.disableCards(sprite);
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
    return true;
  }

  allCardsOpened() {
    return this._sprites.every(sprite => sprite.isOpened());
  }

  allCardsClosed() {
    return this._sprites.every(sprite => sprite.isClosed());
  }

  isEnableChoice() {
    return this._enableSelected;
  }

  isSpritesPositions(positions, sprites = this.children) {
    return sprites.every((sprite, index) => {
      const position = positions.find(position => position.index === index);
      if (!position) return true;
      const { x, y } = position;
      return sprite.x === x && sprite.y === y;
    });
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

  isEnabledCardsIndex(indexs) {
    return indexs.every(index => this.getCardIndex(index).isEnabled());
  }

  isDisabledCardsIndex(indexs) {
    return indexs.every(index => this.getCardIndex(index).isDisabled());
  }

  static createPositions(numCards = 1, padingLeftToAdd = 13, x, y) {
    const positions = [];
    let padingLeft = 0;
    for (let i = 0; i < numCards; i++) {
      positions.push(CardSprite.createPosition(x || padingLeft, y || 0, i));
      padingLeft += padingLeftToAdd;
    }
    return positions;
  }

  isStaticMode() {
    return this.getStatus() instanceof CardsetSpriteStaticModeState;
  }

}