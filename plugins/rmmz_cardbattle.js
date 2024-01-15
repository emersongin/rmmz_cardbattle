(function() {
'use strict';
const CardTypes = {
  BATTLE: 1,
  POWER: 2,
  LUCK: 3
};
const CardColors = {
  RED: 1,
  BLUE: 2,
  GREEN: 3,
  WHITE: 4,
  BLACK: 5,
  BROWN: 6
};
const CardSpriteStates = {
  WAITING: 1,
  ENABLED: 2,
  DISABLED: 3
};
const playerDecksData = [
  {
    name: 'Folder 1',
    cards: [
      {
        number: 1,
        name: 'Dodge',
        description: 'Dodge',
        type: CardTypes.BATTLE,
        attack: 10,
        health: 10,
        energy: { type: 1, amount: 1 }
      },
      {
        number: 1,
        name: 'Dodge',
        description: 'Dodge',
        type: CardTypes.BATTLE,
        attack: 10,
        health: 10,
        energy: { type: 1, amount: 1 }
      },
      {
        number: 1,
        name: 'Dodge',
        description: 'Dodge',
        type: CardTypes.BATTLE,
        attack: 10,
        health: 10,
        energy: { type: 1, amount: 1 }
      }
    ]
  },
  {
    name: 'Folder 2',
    cards: []
  },
  {
    name: 'Folder 3',
    cards: []
  }
];
function uuidv4() {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
    var r = (Math.random() * 16) | 0,
        v = c === 'x' ? r : (r & 0x3) | 0x8;
    return v.toString(16);
  });
}
class TextWindow extends Window_Base {
  _text = [];
  _contentAlign = 'LEFT';
  _windowPosition = 'BOTTOM';

  constructor(rect) {
    super(rect);
    this.initClosed();
  }

  initClosed() {
    this._openness = 0;
  }

  drawContentText() {
    if (this._text?.length) {
      const textContent = this.processTextContent();
      this.drawTextEx(textContent, this.contentAlign(textContent), 0, this._width);
      this.refreshSize();
    }
  }

  processTextContent() {
    let content = [];
    this._text.forEach((text, index) => {
      if (index) content.push('\n');
      content.push(text);
    });
    return content.join('');
  }
  
  contentAlign(text) {
    switch (this._contentAlign) {
      case 'CENTER':
        return (this.contentsWidth() / 2) - (this.textSizeEx(text).width / 2);
      case 'RIGHT':
        return this.contentsWidth() - this.textSizeEx(text).width;
      default:
        // LEFT
        return 0;
    }
  }

  refreshSize() {
    this.move(this.x, this.y, this._width, this.calculeHeight());
  }

  moveWindow(x, y) {
    x = x >= 0 ? x : this.x;
    y = y >= 0 ? y : this.y;
    this.move(x, y, this._width, this.calculeHeight());
  }

  calculeHeight() {
    return this.fittingHeight(this._text.length);
  }

  addText(text) {
    if (!text) return this._text.push('\n');
    this._text.push(text);
  }
  
  alignContentCenter() {
    this._contentAlign = 'CENTER';
  }

  clearContent() {
    this._text = [];
    this.contents.clear();
  }
  
  changeContentTextColor(colorNumber) {
    if (this._text?.length) {
      this._text[0] = `\\C[${colorNumber}]` + this._text[0];
    }
  }

  moveWindowToTop() {
    this.moveWindow(this.x, 0);
  }

  moveWindowToBetweenTopAndCenter () {
    this.moveWindow(this.x, (Graphics.boxHeight / 3)  - 108);
  }

  moveWindowOnTopCenter () {
    this.moveWindow(this.x, (Graphics.boxHeight / 3));
  }

  moveWindowToCenter() {
    this.moveWindow(this.x, (Graphics.boxHeight / 2) - 36);
  }

  moveWindowToBottom() {
    this.moveWindow(this.x, Graphics.boxHeight - this.calculeHeight());
  }
}
class ChooseFolderWindow extends Window_Command {
  constructor(rect) {
    super(rect);
    this.initClosed();
  }
  
  initClosed() {
    this._openness = 0;
  }

  itemTextAlign() {
    return 'left';
  }

  makeCommandList(commands) {
    commands = commands || [
      { name: 'First Folder' },
      { name: 'Middle Folder' },
      { name: 'Last Folder' },
    ];
    this.addCommand(commands[0].name, 'FIRST_FOLDER', true);
    this.addCommand(commands[1].name, 'MIDDLE_FOLDER', true);
    this.addCommand(commands[2].name, 'LAST_FOLDER', true);
  }

  refresh(commands) {
    this.clearCommandList();
    this.makeCommandList(commands);
    this.paint();
    this.refreshWindowSize();
  }

  refreshWindowSize() {
    const windowHeight = this.fittingHeight(this.maxItems());
    this.move(this.x, this.y, this._width, windowHeight);
  }

  moveWindowToCenter() {
    this.moveWindow(this.x, (Graphics.boxHeight / 2) - 36);
  }

  moveWindow(x, y) {
    x = x >= 0 ? x : this.x;
    y = y >= 0 ? y : this.y;
    this.move(x, y, this._width, this._height);
  }
}

class PowerAction {
    constructor(command) {
        this._command = command;
    }
}
class Energy {
  constructor(type, amount) {
      this._elementType = type;
      this._amount = amount;
  }
}
class Card {
  constructor() {
    this._id = uuidv4();
    this._number = 0;
    this._name = '';
    this._description = '';
    this._type = 0;
    this._attack = 0;
    this._health = 0;
    this._energy = null;
    this._powerAction = null;
    this._attackState = 0;
    this._healthState = 0;
  }

  static makeBattleCard(cardData, energyData) {
    const battleCard = new Card();
    battleCard._number = cardData.number;
    battleCard._name = cardData.name;
    battleCard._description = cardData.description;
    battleCard._type = CardTypes.BATTLE;
    battleCard._attack = cardData.attack;
    battleCard._health = cardData.health;
    battleCard._energy = new Energy(energyData.type, energyData.amount);
    return battleCard;
  }

  static makePowerCard(cardData, energyData, powerData) {
    const powerCard = new Card();
    powerCard._number = cardData.number;
    powerCard._name = cardData.name;
    powerCard._description = cardData.description;
    powerCard._type = CardTypes.POWER;
    powerCard._energy = new Energy(energyData.type, energyData.amount);
    powerCard._powerAction = new PowerAction(powerData.command);
    return powerCard;
  }

  static makeLuckCard(cardData) {
    const luckCard = new Card();
    luckCard._number = cardData.number;
    luckCard._name = cardData.name;
    luckCard._description = cardData.description;
    luckCard._type = CardTypes.LUCK;
    luckCard._energy = new Energy(energyData.energy, energyData.amount);
    return luckCard;
  }
}
class CardBattlePlayer {
  constructor(name, level, deck = null) {
    this._name = name;
    this._level = level;
    this._deck = deck;
  }

  getName() {
    return this._name;
  }

  getLevel() {
    return this._level;
  }

  setDeck(deck) {
    this._deck = deck;
  }

  hasDeck() {
    return !!this._deck;
  }
}
class ActionSprite extends Sprite {
  initialize() { 
    super.initialize();
    this._duration = 0.5;
    this._actions = [];
  }

  addAction(fn, ...params) {
    const action = { 
      execute: () => fn.call(this, ...params),
      fn: fn.name,
    };
    this._actions.push(action);
  }

  executeAction() {
    const action = this._actions.shift();
    if (this instanceof CardsetSprite) console.log(action);
    if (action) action.execute();
  }

  hasActions() {
    return this._actions.length > 0;
  }
}
class CardSpriteStoppedState {
  _cardSprite;
  
  constructor(cardSprite) {
    this._cardSprite = cardSprite;
  }

  updateState() {
    this.updateBackground();
  }

  updateBackground() {
    const that = this._cardSprite;
    that._backgroundLayer.bitmap.clear();
    if (that._highlighted || that._selected) {
      this.fillBackground();
      this.updateBackgroundPulse();
    }
  }

  fillBackground() {
    const that = this._cardSprite;
    this.fillSelectBackground();
    this.fillHighlightBackground();
  }

  fillSelectBackground() {
    const that = this._cardSprite;
    if (that._highlighted) {
      that._backgroundLayer.bitmap.fillRect(0, 0, that.width, that.height, 'red');
    }
  }

  fillHighlightBackground() {
    const that = this._cardSprite;
    if (that._highlighted) {
      that._backgroundLayer.bitmap.fillRect(0, 0, that.width, that.height, 'yellow');
    }
  }

  updateBackgroundPulse() {
    const that = this._cardSprite;
    that._backgroundLayer.opacity -= 32;
    if(that._backgroundLayer.opacity <= 0) {
      that._backgroundLayer.opacity = 255;
    }
  }
}
class CardSpriteMovingState {
  _cardSprite;
  
  constructor(cardSprite) {
      this._cardSprite = cardSprite;
  }

  updateState() {
    const that = this._cardSprite;
    if (that._x !== that.x || that._y !== that.y) {
      this.updateMovingPosition();
    } else {
      that.stop();
    }
  }

  updateMovingPosition() {
    const that = this._cardSprite;
    const interval = that.calculateInterval(0, Graphics.boxWidth, that._duration);
    const reachedX = that.x > that._x;
    const reachedY = that.y > that._y;
    if (that._x !== that.x) {
      that.x = that.x > that._x 
        ? that.x - interval 
        : that.x + interval;
    }
    const xLimit = (reachedX && that.x < that._x || !reachedX && that.x > that._x);
    if (xLimit) that.x = that._x;
    if (that._y !== that.y) {
      that.y = that.y > that._y 
        ? that.y - interval 
        : that.y + interval;
    }
    const yLimit = (reachedY && that.y < that._y || !reachedY && that.y > that._y);
    if (yLimit) that.y = that._y;
  }

}
class CardSpriteClosedState {
  _cardSprite;
  
  constructor(cardSprite) {
      this._cardSprite = cardSprite;
  }

  updateState() {
    const that = this._cardSprite;
    that.refreshAndStop();
  }
}
class CardSpriteOpeningState {
  _cardSprite;
  
  constructor(cardSprite) {
      this._cardSprite = cardSprite;
  }

  updateState() {
    const that = this._cardSprite;
    if (that._x !== that.x || that.width < that.cardOriginalWidth()) {
      this.updateOpening();
      that.refresh();
    } else {
      that.opened();
    }
  }

  updateOpening() {
    const that = this._cardSprite;
    const interval = that.calculateInterval(0, that.cardOriginalWidth(), that._duration);
    if (that.width < that.cardOriginalWidth()) {
      that.width += (interval * 2);
    }
    if (that._x !== that.x) {
      that.x -= interval;
    }
    if (that.width > that.cardOriginalWidth()) that.width = that.cardOriginalWidth();
    if (that._x > that.x) that.x = that._x;
  }
}
class CardSpriteOpenState {
  _cardSprite;
  
  constructor(cardSprite) {
      this._cardSprite = cardSprite;
  }

  updateState() {
    const that = this._cardSprite;
    that.refreshAndStop();
  }
}
class CardSpriteClosingState {
  _cardSprite;
  
  constructor(cardSprite) {
      this._cardSprite = cardSprite;
  }

  updateState() {
    const that = this._cardSprite;
    if (that._x !== that.x || that.width > 0) {
      this.updateClosing();
      that.refresh();
    } else {
      that.closed();
    }
  }

  updateClosing() {
    const that = this._cardSprite;
    const interval = that.calculateInterval(0, that.cardOriginalWidth(), that._duration);
    if (that.width > 0) {
      that.width -= (interval * 2);
    }
    if (that._x !== that.x) {
      that.x += interval;
    }
    if (that.width < 0) that.width = 0;
    if (that._x < that.x) that.x = that._x;
  }
}

class CardSprite extends ActionSprite {
  initialize() {
    super.initialize();
    // fixs
    this._type = 0;
    this._color = 0;
    // bitmaps
    this._figure = null;
    this._backImage = null;
    // states
    this._state = null;
    this._attackPoints = 0;
    this._healthPoints = 0;
    this._x = this.x;
    this._y = this.y;
    this._highlighted = false;
    this._selected = false;
    this._turnedtoUp = true;
    this._disabled = false;
    // display
    this.attack = 0;
    this.health = 0;
    // layers
    this._backgroundLayer = null;
    this._contentLayer = null;
    this._flashLayer = null;
    this._actionsLayer = null;
    this.setup();
  }

  setup() {
    this.setSize();
    this.stop();
    this.hide();
    this.createLayers();
  }

  setSize() {
    this.width = this.cardOriginalWidth();
    this.height = this.cardOriginalHeight();
  }

  cardOriginalWidth() {
    return 96;
  }

  cardOriginalHeight() {
    return 128;
  }

  stop() {
    this._state = new CardSpriteStoppedState(this);
  }

  hide() {
    this.visible = false;
  }

  createLayers() {
    this.createBackgroundLayer();
    this.createContentLayer();
    this.createFlashLayer();
    this.createActionsLayer();
  }

  createBackgroundLayer() {
    this._backgroundLayer = new Sprite();
    this._backgroundLayer.bitmap = new Bitmap(this.cardOriginalWidth(), this.cardOriginalHeight());
    this.addChild(this._backgroundLayer);
  }

  createContentLayer() {
    this._contentLayer = new Sprite();
    this._contentLayer.bitmap = new Bitmap(this.cardOriginalWidth(), this.cardOriginalHeight());
    this.addChild(this._contentLayer);
  }

  createFlashLayer() {
    this._flashLayer = new Sprite();
    this._flashLayer.bitmap = new Bitmap(this.cardOriginalWidth(), this.cardOriginalHeight());
    this._contentLayer.addChild(this._flashLayer);
  }

  createActionsLayer() {
    this._actionsLayer = new Sprite();
    this._actionsLayer.bitmap = new Bitmap(this.cardOriginalWidth(), this.cardOriginalHeight());
    this._contentLayer.addChild(this._actionsLayer);
  }

  update() {
    if (this.hasActions() && this.isStopped()) this.executeAction();
    if (this.isMoving() && this.isHidden()) this.show();
    if (this.isVisible()) this.updateState();
    super.update();
    // console.log(this._state);
  }

  isVisible() {
    return this.visible;
  }

  isHidden() {
    return !this.isVisible();
  }

  isStopped() {
    return this._state instanceof CardSpriteStoppedState;
  }

  isBusy() {
    return !this.isStopped() || this.hasActions();
  }

  isMoving() {
    return this._state instanceof CardSpriteMovingState;
  }

  updateState() {
    if (this._state) this._state.updateState();
  }

  refreshAndStop() {
    this.refresh();
    this.stop();
  }

  calculateInterval(origin, target, duration = 1) {
    return Math.floor(Math.abs(origin - target) / (duration * 60)) || 1;
  }
  
  closed() {
    this._state = new CardSpriteClosedState(this);
  }
  
  moving() {
    this._state = new CardSpriteMovingState(this);
  }

  refresh() {
    this.drawCard();
  }

  drawCard() {
    this._contentLayer.bitmap.clear();
    if (this._turnedtoUp) {
      this.drawBackground();
      this.drawFigure();
      this.drawDisplay();
    } else {
      this.drawBack();
    }
  }

  drawBackground() {
    const xPosition = 2;
    const yPosition = 2;
    const width = this.width - 4;
    const height = this.height - 4;
    const color = this.getBackgroundColor();
    this._contentLayer.bitmap.fillRect(xPosition, yPosition, width, height, color);
  }

  getBackgroundColor() {
    switch (this._color) {
      case CardColors.RED:
        return '#ff0000';
        break;
      case CardColors.BLUE:
        return '#0000ff';
        break;
      case CardColors.GREEN:
        return '#00ff00';
        break;
      case CardColors.WHITE:
        return '#ffffff';
        break;
      case CardColors.BLACK:
        return '#000000';
        break;
      default: // BRONW
        return '#a52a2a';
        break;
    }
  }

  drawFigure() {
    const contentWidth = this.cardOriginalWidth() - 8;
    const contentHeight = this.cardOriginalHeight() - 28;
    const openPercent = Math.floor((this.width / this.cardOriginalWidth()) * 100);
    const openWidth = Math.floor((contentWidth * openPercent) / 100);
    const figureWidth = openWidth ? this._figure.width : 0;
    const figureHeight = this._figure.height;
    this._contentLayer.bitmap.blt(
      this._figure, 
      0, 
      0, 
      figureWidth, 
      figureHeight,
      4,
      4,
      openWidth,
      contentHeight
    );
  }

  drawDisplay() {
    switch (this._type) {
      case CardTypes.BATTLE:
          this.drawPoints();
        break;
      case CardTypes.POWER:
        this.drawPowerCaption();
        break;
      default:
        this._contentLayer.bitmap.drawText(
          '???', 
          this.displayXPosition(), 
          this.displayYPosition(), 
          this.displayWidth(), 
          this.displayHeight(), 
          'center'
        );
        break;
    }
  }

  drawPoints() {
    const attack = this._attackPoints.toString().padStart(2, ' ');
    const health = this._healthPoints.toString().padStart(2, ' ');
    const points = `${attack} / ${health}`;
    this._contentLayer.bitmap.drawText(
      points, 
      this.displayXPosition(), 
      this.displayYPosition(), 
      this.displayWidth(), 
      this.displayHeight(),
      'center'
    );
  }

  displayXPosition() {
    return 0;
  }

  displayYPosition() {
    return this.height - 24;
  }

  displayWidth() {
    return this.width;
  }

  displayHeight() {
    return 20;
  }

  drawPowerCaption() {
    this._contentLayer.bitmap.drawText(
      '( P )', 
      this.displayXPosition(), 
      this.displayYPosition(), 
      this.displayWidth(), 
      this.displayHeight(), 
      'center'
    );
  }

  drawBack() {
    this._contentLayer.bitmap.blt(this._backImage, 0, 0, this.width, this.height, 0, 0);
  }

  setCard(card) {
    this.setType(card.type);
    this.setColor(card.color);
    this.setFigure(card.figureName);
    this.setBackImage();
    this._attackPoints = card.attack;
    this._healthPoints = card.health;
  }

  setType(type) {
    this._type = type || 1;
  }

  setColor(color) {
    this._color = color || 6;
  }

  setFigure(figureName) {
    this._figure = ImageManager.loadCard(figureName);
    // this._figure = new Bitmap(this.width, this.height);
    // this._figure.fillAll('yellow');
  }

  setBackImage() {
    this._backImage = new Bitmap(this.width, this.height);
    this._backImage.gradientFillRect (0, 0, this.width, this.height, '#555', '#000');
  }
  
  show() {
    this.refresh();
    this.visible = true;
  }

  isTurnedToUp() {
    return this._turnedtoUp;
  }
  
  open() {
    this.addAction(this.commandOpen);
  }

  opened() {
    this._state = new CardSpriteOpenState(this);
  }

  close() {
    this.addAction(this.commandClose);
  }
  
  toMove(originPosition, destinationPosition) {
    this.addAction(this.commandMoving, originPosition, destinationPosition);
  }

  commandMoving(originPosition, destinationPosition) {
    if (this.isStopped() && this.isVisible()) {
      this._x = destinationPosition.x;
      this._y = destinationPosition.y;
      this.x = originPosition.x;
      this.y = originPosition.y;
      this.moving();
    }
  }

  commandOpen() {
    if (this.isStopped() && this.isClosed()) {
      this._x = this.x - (this.cardOriginalWidth() / 2);
      this.opening();
    }
  }

  isClosed() {
    return this._state instanceof CardSpriteClosedState || 
      this.width === 0;
  }

  opening() {
    this._state = new CardSpriteOpeningState(this);
  }

  commandClose() {
    if (this.isStopped() || this.isOpened()) {
      this._x = this.x + (this.cardOriginalWidth() / 2);
      this.closing();
    }
  }

  isOpened() {
    return this._state instanceof CardSpriteOpenState ||
      this.width === this.cardOriginalWidth();
  }

  closing() {
    this._state = new CardSpriteClosingState(this);
  }

  setXPosition(xPosition) {
    this._x = xPosition;
    this.x = xPosition;
  }

  setYPosition(yPosition) {
    this._y = yPosition;
    this.y = yPosition;
  }

  highlight() {
    this.addAction(this.commandHighlight);
  }

  commandHighlight() {
    if (this.isStopped()) {
      this._highlighted = true;
    }
  }

  unhighlight() {
    this.addAction(this.commandUnhighlight);
  }

  commandUnhighlight() {
    if (this.isStopped()) {
      this._highlighted = false;
    }
  }

  select() {
    this.addAction(this.commandSelect);
  }

  commandSelect() {
    if (this.isStopped()) {
      this._selected = true;
    }
  }

  unselect() {
    this.addAction(this.commandUnselect);
  }

  commandUnselect() {
    if (this.isStopped()) {
      this._selected = false;
    }
  }
}
class CardsetSprite extends ActionSprite {
  initialize() { 
    super.initialize();
    this._cardSprites = [];
    this._selectMode = false;
    this._changedMode = false;
    this._selectedCards = [];
    this._cursorIndex = 0;
    this._active = false;
    this.setup();
    this.test();
  }

  setup() {
    this.visible = false;
    this.setWidthLimit();
  }

  test() {
    this.bitmap = new Bitmap(this.setWidthLimit(), this.setHeightLimit());
    this.bitmap.fillAll('#555');
  }

  setWidthLimit() {
    this._lengthLimit = 96 * 6;
  }

  setHeightLimit() {
    this._heightLimit = 128;
  }

  setCards(cards) {
    this.clearContents();
    if (Array.isArray(cards) && cards.length) {
      const cardsAmount = cards.length + this.countCardSprites();
      cards.forEach((card, index) => this.addCard(card, index, cardsAmount));
    }
  }

  clearContents() {
    this._cardSprites.forEach(card => card.sprite.destroy());
    this._cardSprites = [];
  }

  addCard(card, index, cardsAmount) {
    const cardSprite = this.createCardSprite(card);
    this.setInitialPosition(cardSprite, index, cardsAmount);
    this.addChild(cardSprite);
    this._cardSprites.push(this.createCardObject(cardSprite));
  }

  addCards(cards) {
    if (Array.isArray(cards) && cards.length) {
      const cardsAmount = cards.length + this.countCardSprites();
      cards.forEach((card, index) => this.addCard(card, index, cardsAmount));
    }
  }

  createCardSprite(card) {
    const cardSprite = new CardSprite();
    cardSprite.setCard(card);
    return cardSprite;
  }

  setInitialPosition(cardSprite, index, cardsAmount) {
    const widthCard = cardSprite.cardOriginalWidth();
    cardSprite.setXPosition(this.xCardPosition(widthCard, index, cardsAmount));
    cardSprite.setYPosition(0);
    return cardSprite;
  }

  countCardSprites() {
    return this._cardSprites.length;
  }

  xCardPosition(widthCard, index, cardsAmount) {
    const lengthLimit = this._lengthLimit;
    return (this.xCardMargin(widthCard, cardsAmount, lengthLimit) * index);
  }

  xCardMargin(widthCard, cardsAmount, lengthLimit) {
      const padding = 1;
      const space = (lengthLimit - (padding * cardsAmount)) / (cardsAmount || 1);
      return parseInt((space < widthCard ? space : widthCard) + padding) || padding;
  }

  createCardObject(cardSprite) {
    return {
      state: CardSpriteStates.WAITING,
      sprite: cardSprite
    };
  }

  show() {
    this.visible = true;
  }

  showCards(cardIndexs) {
    this.addAction(this.commandShowCards, cardIndexs);
  }
  
  commandShowCards(cardIndexs) {
    this._cardSprites = this._cardSprites.map((card, index) => {
      if (cardIndexs && cardIndexs.includes(index) || !cardIndexs) {
        card.sprite.show();
        card.state = CardSpriteStates.ENABLED;
      }
      return card;
    });
  }

  showCardsAndStartMoving(cardIndexs, timeInterval) {
    this.addAction(this.commandShowCardsAndStartMoving, cardIndexs, timeInterval);
  }

  commandShowCardsAndStartMoving(cardIndexs = [], timeInterval = 1) {
    this._cardSprites = this._cardSprites.map((card, index) => {
      if ((cardIndexs && cardIndexs.includes(index)) || (cardIndexs.length == false)) {
        card.sprite.hide();
        card.state = CardSpriteStates.ENABLED;
        setTimeout(() => {
          this.moveCardToStartPosition(card.sprite);
          card.sprite.show();
        }, (index * (timeInterval * 1000)));
      }
      return card;
    });
  }
  
  hiddenCards(cardIndexs) {
    this._cardSprites = this._cardSprites.map((card, index) => {
      if (cardIndexs && cardIndexs.includes(index) || !cardIndexs) {
        card.sprite.hide();
      }
      return card;
    });
  }

  moveCardToStartPosition(cardSprite) {
    const cardsetYPosition = 0;
    const origin = {
      x: Graphics.boxWidth,
      y: cardsetYPosition
    };
    const destination = {
      x: cardSprite.x,
      y: cardSprite.y
    };
    this.startCardMoving(cardSprite, origin, destination);
  }

  startCardMoving(cardSprite, origin, destination) {
    cardSprite.toMove(origin, destination);
  }

  startCloseCards(cardIndexs, timeInterval) {
    this.addAction(this.commandStartCloseCards, cardIndexs, timeInterval);
  }

  commandStartCloseCards(cardIndexs = [], timeInterval = 1) {
    cardIndexs.forEach((cardIndex, index) => {
      const cardSprite = this._cardSprites[index].sprite;
      const cardState = this._cardSprites[index].state;
      setTimeout(() => {
        if (cardState === CardSpriteStates.ENABLED) {
          this.startCloseCard(cardSprite);
        }
      }, (index * (timeInterval * 1000)));
    });
  }

  startCloseCard(cardSprite) {
    cardSprite.close();
  }

  startOpenCards(cardIndexs, timeInterval) {
    this.addAction(this.commandStartOpenCards, cardIndexs, timeInterval);
  }

  commandStartOpenCards(cardIndexs = [], timeInterval = 1) {
    cardIndexs.forEach((cardIndex, index) => {
      const cardSprite = this._cardSprites[index].sprite;
      const cardState = this._cardSprites[index].state;
      setTimeout(() => {
        if (cardState === CardSpriteStates.ENABLED) {
          this.startOpenCard(cardSprite);
        }
      }, (index * (timeInterval * 1000)));
    });
  }

  startOpenCard(cardSprite) {
    cardSprite.open();
  }

  getWaitingCardSpriteIndexs() {
    const indexs = [];
    this._cardSprites.forEach((card, index) => {
      if (card.state === CardSpriteStates.WAITING) {
        indexs.push(index);
      }
    });
    return indexs;
  }

  isNotBusy() {
    return !this.isBusy();
  }
  
  isBusy() {
    return this._selectMode || this.isBusyCards();
  }
  
  isBusyCards() {
    return this._cardSprites.some(card => {
      return card.sprite.isBusy();
    });
  }

  isNotBusyCards() {
    return !this.isBusyCards();
  }
  
  update() {
    if (this.isDisabled()) return;
    if (this.hasActions() && this.isNotBusy()) this.executeAction();
    if (this.isCardSpritesMoving() && this.isHidden()) this.show();
    if (this.isVisible()) {
      if (this._selectMode && this.isNotBusyCards()) {
        this.updateSelectMode();
      }
    }
    super.update();
  }

  isDisabled() {
    return !this._active;
  }

  isCardSpritesMoving() {
    return this._cardSprites.some(card => card.sprite.isMoving());
  }

  isVisible() {
    return this.visible;
  }

  isHidden() {
    return !this.isVisible();
  }

  updateSelectMode() {
    this.updateCursor();
    if (Input.isAnyKeyActive() || this.isModeHasChanged()) this.updateSpriteCards();
  }

  isModeHasChanged() {
    if (this._changedMode) {
      this._changedMode = false;
      return true;
    }
    return this._changedMode;
  }

  updateCursor() {
    const timesWhenLongPressed = 4;
    if (Input.isRepeated('right')) {
      this.moveCursorRight();
      if (Input.isLongPressed('right')) this.moveCursorRight(timesWhenLongPressed);
    } else if (Input.isRepeated('left')) {
      this.moveCursorLeft();
      if (Input.isLongPressed('left')) this.moveCursorLeft(timesWhenLongPressed);
    }
  }

  moveCursorRight(times = 1) {
    const indexsAmount = this._cardSprites.length - 1;
    if (this._cursorIndex < indexsAmount) {
      const nextIndex = this._cursorIndex + times;
      this._cursorIndex = nextIndex > indexsAmount ? indexsAmount : nextIndex;
    }
  }

  moveCursorLeft(times = 1) {
    const minIndex = 0;
    if (this._cursorIndex > minIndex) {
      const nextIndex = this._cursorIndex - times;
      this._cursorIndex = nextIndex < minIndex ? minIndex : nextIndex;
    }
  }

  updateSpriteCards() {
    this._cardSprites.forEach((card, index) => {
      const sprite = card.sprite;
      const indexsAmount = this._cardSprites.length - 1;
      if (index === this._cursorIndex) {
        this.highlightedCard(sprite);
        this.removeChild(sprite);
        this.addChildAt(sprite, indexsAmount);
      } else {
        this.clearHighlightedCard(sprite);
        this.removeChild(sprite);
        const fixLastCardindex = (index === indexsAmount ? indexsAmount - 1 : index);
        this.addChildAt(sprite, fixLastCardindex);
      }
    });
  }

  highlightedCard(cardSprite) {
    const cardsetYPosition = 0;
    const origin = {
      x: cardSprite.x,
      y: cardsetYPosition
    };
    const destination = {
      x: cardSprite.x,
      y: cardsetYPosition - 10
    };
    this.startCardMoving(cardSprite, origin, destination);
    cardSprite.highlight();
  }

  clearHighlightedCard(cardSprite) {
    const cardsetYPosition = 0;
    const origin = {
      x: cardSprite.x,
      y: cardSprite.y
    };
    const destination = {
      x: cardSprite.x,
      y: cardsetYPosition
    };
    cardSprite.unhighlight();
    this.startCardMoving(cardSprite, origin, destination);
  }

  activeSelectMode() {
    this.addAction(this.commandActiveSelectMode);
  }

  commandActiveSelectMode() {
    if (this.hasEnabledCardSprite()) {
      this._selectMode = true;
      this._changedMode = true;
      this._cursorIndex = 0;
    }
  }

  hasEnabledCardSprite() {
    return this._cardSprites.some(card => card.state === CardSpriteStates.ENABLED);
  }

  isCardsStarted() {
    return this._cardsStarted;
  }

  activate() {
    this._active = true;
  }

  showCardCloseds(cardIndexs) {
    this.addAction(this.commandShowCardCloseds, cardIndexs);
  }

  commandShowCardCloseds(cardIndexs) {
    this._cardSprites = this._cardSprites.map((card, index) => {
      if (cardIndexs && cardIndexs.includes(index) || !cardIndexs) {
        card.state = CardSpriteStates.ENABLED;
        const sprite = card.sprite;
        const closedXPosition = sprite.x + (sprite.cardOriginalWidth() / 2);
        const closedWidth = 0;
        sprite._x = closedXPosition;
        sprite.x = closedXPosition;
        sprite.width = closedWidth;
        sprite.closed();
        sprite.show();
      }
      return card;
    });
  }
}
class BackgroundSprite extends Sprite {
  initialize() {
    super.initialize();
    this._backgrounds = [];
    this._direction = 0;
    this.createBackgrounds();
    this.createBackgroundsOriginPositions();
  }

  createBackgrounds() {
    for (let i = 0; i < 4; i++) {
      let bg = this.createBackgroundSprite();
      this.addChild(bg);
      this._backgrounds.push(bg);
    }
  }

  createBackgroundSprite() {
    const bg = new Sprite();
    bg.bitmap = ImageManager.loadParallax('StarlitSky');
    return bg;
  }

  createBackgroundsOriginPositions() {
    this._backgrounds[0].move(0, 0);
    this._backgrounds[1].move(Graphics.width, 0);
    this._backgrounds[2].move(Graphics.width, Graphics.height);
    this._backgrounds[3].move(0, Graphics.height);
  }

  update() {
    super.update();
    this.updateBackground();
    this.updateResetPosition();
  }

  updateBackground() {
    let xPlus = 0;
    let yPlus = 0;
    switch (this._direction) {
      case 1:
        xPlus = -1;
        yPlus = 1;
        break;
      case 2:
        xPlus = -1;
        yPlus = -1;
        break;
      case 3:
        xPlus = 1;
        yPlus = -1;
        break;
      default:
        xPlus = 1;
        yPlus = 1;
        break;
    }
    this._backgrounds.forEach(bg => {
      bg.move(bg.x + xPlus,bg.y + yPlus);
    });
  }

  updateResetPosition() {
    this._backgrounds.forEach(bg => {
      if (bg.x <= -Graphics.width) {
        bg.x = Graphics.width;
      }
      if (bg.x >= Graphics.width) {
        bg.x = -Graphics.width;
      }
      if (bg.y <= -Graphics.height) {
        bg.y = Graphics.height;
      }
      if (bg.y >= Graphics.height) {
        bg.y = -Graphics.height;
      }
    });
  }
}
class CardBattleSpriteset extends Spriteset_Base {
  initialize() {
    super.initialize();
    this._backgroundSprite;
    this._startBattleTransition;
    this._luckGameSprite;
    this._battleFieldSprite;
    this._battlePainelSprite;

    this.createBackground();
    this.createStartBattleTransition();
    // this.createLuckGame();
    // this.createBattleField();
    // this.createBattlePainel();
  }

  loadSystemImages() {
    super.loadSystemImages();
  }

  createBackground() {
    this._backgroundSprite = new BackgroundSprite();
    this.addChild(this._backgroundSprite);
  }

  createStartBattleTransition() {
    this._startBattleTransition = new StartBattleTransition();
    this.addChild(this._startBattleTransition);
  }

  isBusy() {
    return this._startBattleTransition.isBusy();
  }
}

class CardBattleScene extends Scene_Message {
  initialize() {
    super.initialize();
    this._titleWindow = null;
    this._textWindow = null;
    this._chooseFolderWindow = null;
  }

  create() {
    super.create();
    // this.createDisplayObjects();

    const cardset = new CardsetSprite();
    cardset.x = 0;
    cardset.y = 100;
    this.addChild(cardset);
    cardset.setCards([
      { type: 1, color: 1, figureName: 'default', attack: 0, health: 0 },
      { type: 1, color: 2, figureName: 'default', attack: 0, health: 99 },
      { type: 1, color: 3, figureName: 'default', attack: 99, health: 0 },
      { type: 1, color: 4, figureName: 'default', attack: 99, health: 99 },
      { type: 2, color: 5, figureName: 'default', attack: 99, health: 99 },
      { type: 3, color: 6, figureName: 'default', attack: 99, health: 99 },
      { type: 1, color: 1, figureName: 'default', attack: 0, health: 0 },
      { type: 1, color: 2, figureName: 'default', attack: 0, health: 99 },
      { type: 1, color: 3, figureName: 'default', attack: 99, health: 0 },
      { type: 1, color: 4, figureName: 'default', attack: 99, health: 99 },
      { type: 2, color: 5, figureName: 'default', attack: 99, health: 99 },
      { type: 3, color: 6, figureName: 'default', attack: 99, health: 99 },
      { type: 1, color: 1, figureName: 'default', attack: 0, health: 0 },
      { type: 1, color: 2, figureName: 'default', attack: 0, health: 99 },
      { type: 1, color: 3, figureName: 'default', attack: 99, health: 0 },
      { type: 1, color: 4, figureName: 'default', attack: 99, health: 99 },
      { type: 2, color: 5, figureName: 'default', attack: 99, health: 99 },
      { type: 3, color: 6, figureName: 'default', attack: 99, health: 99 },
      { type: 1, color: 1, figureName: 'default', attack: 0, health: 0 },
      { type: 1, color: 2, figureName: 'default', attack: 0, health: 99 },
      { type: 1, color: 3, figureName: 'default', attack: 99, health: 0 },
      { type: 1, color: 4, figureName: 'default', attack: 99, health: 99 },
      { type: 2, color: 5, figureName: 'default', attack: 99, health: 99 },
      { type: 3, color: 6, figureName: 'default', attack: 99, health: 99 },
      { type: 1, color: 1, figureName: 'default', attack: 0, health: 0 },
      { type: 1, color: 2, figureName: 'default', attack: 0, health: 99 },
      { type: 1, color: 3, figureName: 'default', attack: 99, health: 0 },
      { type: 1, color: 4, figureName: 'default', attack: 99, health: 99 },
      { type: 2, color: 5, figureName: 'default', attack: 99, health: 99 },
      { type: 3, color: 6, figureName: 'default', attack: 99, health: 99 },
      { type: 1, color: 1, figureName: 'default', attack: 0, health: 0 },
      { type: 1, color: 2, figureName: 'default', attack: 0, health: 99 },
      { type: 1, color: 3, figureName: 'default', attack: 99, health: 0 },
      { type: 1, color: 4, figureName: 'default', attack: 99, health: 99 },
      { type: 2, color: 5, figureName: 'default', attack: 99, health: 99 },
      { type: 3, color: 6, figureName: 'default', attack: 99, health: 99 },
      { type: 1, color: 1, figureName: 'default', attack: 99, health: 0 },
      { type: 1, color: 2, figureName: 'default', attack: 99, health: 99 },
      { type: 2, color: 3, figureName: 'default', attack: 99, health: 99 },
      { type: 3, color: 4, figureName: 'default', attack: 99, health: 99 }
    ]);
    const cardIndexs = cardset.getWaitingCardSpriteIndexs();
    // cardset.showCards(cardIndexs);
    cardset.showCardCloseds(cardIndexs);
    // cardset.showCardsAndStartMoving(cardIndexs);
    // cardset.startCloseCards(cardIndexs);
    cardset.startOpenCards(cardIndexs, 0.01);
    cardset.activeSelectMode();
    cardset.activate();
    cardset.show();
  }

  createDisplayObjects() {
    this.createSpriteset();
    this.createWindowLayer();
    this.createAllWindows();
  }

  createSpriteset() {
    this._spriteset = new CardBattleSpriteset();
    this.addChild(this._spriteset);
  }

  createAllWindows() {
    this.createTitleWindow();
    this.createTextWindow();
    this.createChooseFolderWindow();
    super.createAllWindows();
  }

  createTitleWindow() {
    const rect = new Rectangle(0, 0, Graphics.boxWidth, Graphics.boxHeight);
    this._titleWindow = new TextWindow(rect);
    this.addWindow(this._titleWindow);
  }

  createTextWindow() {
    const rect = new Rectangle(0, 0, Graphics.boxWidth, Graphics.boxHeight);
    this._textWindow = new TextWindow(rect);
    this.addWindow(this._textWindow);
  }

  createChooseFolderWindow() {
    const rect = new Rectangle(0, 0, Graphics.boxWidth, Graphics.boxHeight);
    this._chooseFolderWindow = new ChooseFolderWindow(rect);
    this.addWindow(this._chooseFolderWindow);
  }

  start() {
    super.start();
    CardBattleManager.setup();
  }

  update() {
    if (!this.isBusy()) {
      // this.updateWindows();
      // CardBattleManager.update();
    }
    super.update();
  }

  isBusy() {
    return (
      // this._spriteset.isBusy() ||
      super.isBusy()
    );
  };

  updateWindows() {
    this.updateChallengePhaseWindows();
    this.updateChooseFolderPhaseWindows();
    this.updateStartPhaseWindows();
    this.updatePhaseChanged();
  }

  updateChallengePhaseWindows() {
    if (CardBattleManager.isChallengerPhase() && !CardBattleManager.isPhaseChanged()) {
      if (this._titleWindow.isClosed() && this.isNoBusyWindows()) 
        this.showTitleWindowChallengePhase();
      if (this._textWindow.isClosed() && this.isNoBusyWindows()) 
        this.showTextWindowChallengePhase();
    }
  }
  
  isNoBusyWindows() {
    return !this.isAnyWindowBusy();
  }

  isAnyWindowBusy() {
    return (
      this._titleWindow.isOpening() ||
      this._textWindow.isOpening() ||
      this._chooseFolderWindow.isOpening()
    );
  }

  showTitleWindowChallengePhase() {
    const orangeColor = 20;
    this._titleWindow.clearContent();
    this._titleWindow.addText('Card Battle Challenge');
    this._titleWindow.changeContentTextColor(orangeColor);
    this._titleWindow.alignContentCenter();
    this._titleWindow.moveWindowOnTopCenter();
    this._titleWindow.drawContentText();
    this._titleWindow.open();
  }

  showTextWindowChallengePhase() {
    const enemyName = CardBattleManager.getEnemyName();
    const enemyLevel = CardBattleManager.getEnemyLevel();
    this._textWindow.clearContent();
    this._textWindow.addText(`Lv ${enemyLevel}`);
    this._textWindow.addText(enemyName);
    this._textWindow.drawContentText();
    this._textWindow.moveWindowToCenter();
    this._textWindow.open();
  }

  updateChooseFolderPhaseWindows() {
    if (CardBattleManager.isChooseFolderPhase() && !CardBattleManager.isPhaseChanged()) {
      if (this._titleWindow.isClosed() && this.isNoBusyWindows()) 
        this.showTitleWindowChooseFolderPhase();
      if (this._chooseFolderWindow.isClosed() && this.isNoBusyWindows()) 
        this.showChooseFolderWindowChooseFolderPhase();
    }
  }

  showTitleWindowChooseFolderPhase() {
    this._titleWindow.clearContent();
    this._titleWindow.addText('Choose a folder');
    this._titleWindow.alignContentCenter();
    this._titleWindow.moveWindowToBetweenTopAndCenter();
    this._titleWindow.drawContentText();
    this._titleWindow.open();
  }

  showChooseFolderWindowChooseFolderPhase() {
    const firstFolderName = CardBattleManager.getPlayerFolderName(0);
    const middleFolderName = CardBattleManager.getPlayerFolderName(1);
    const lastFolderName = CardBattleManager.getPlayerFolderName(2);
    this._chooseFolderWindow.refresh([
      { name: firstFolderName },
      { name: middleFolderName },
      { name: lastFolderName }
    ]);
    this._chooseFolderWindow.setHandler('FIRST_FOLDER', () => { this.selectPlayerFolderCommand(0) });
    this._chooseFolderWindow.setHandler('MIDDLE_FOLDER', () => { this.selectPlayerFolderCommand(1) });
    this._chooseFolderWindow.setHandler('LAST_FOLDER', () => { this.selectPlayerFolderCommand(2) });
    this._chooseFolderWindow.moveWindowToCenter();;
    this._chooseFolderWindow.open();
  }

  updateStartPhaseWindows() {
    if (CardBattleManager.isStartPhase() && !CardBattleManager.isPhaseChanged()) {
      if (this._titleWindow.isClosed() && this.isNoBusyWindows()) 
        this.showTitleWindowStartPhase();
      if (this._textWindow.isClosed() && this.isNoBusyWindows()) 
        this.showTextWindowStartPhase();
    }
  }

  showTitleWindowStartPhase() {
    this._titleWindow.clearContent();
    this._titleWindow.addText('Start Phase');
    this._titleWindow.alignContentCenter();
    this._titleWindow.moveWindowOnTopCenter();
    this._titleWindow.drawContentText();
    this._titleWindow.open();
  }

  showTextWindowStartPhase() {
    this._textWindow.clearContent();
    this._textWindow.addText('Draw white card to go first.');
    this._textWindow.drawContentText();
    this._textWindow.moveWindowToCenter();
    this._textWindow.open();
  }

  updatePhaseChanged() {
    if (CardBattleManager.isPhaseChanged()) {
      if (this._titleWindow.isOpen()) this._titleWindow.close();
      if (this._textWindow.isOpen()) this._textWindow.close();
      if (this._chooseFolderWindow.isOpen()) this._chooseFolderWindow.close();
      setTimeout(() => {
        if (this.isNoBusyWindows()) CardBattleManager.phaseChangeDone();
      }, 400);
    }
  }

  selectPlayerFolderCommand(number) {
    CardBattleManager.selectPlayerFolder(number);
  }

  stop() {
    super.stop();
  }

  terminate() {
    super.terminate();
  }
}
class CardBattleManagerDrawPhaseState {
  _manager;

  constructor(manager) {
    this._manager = manager;
    this._manager.phaseChanged();
  }

  update() {
    console.log('Draw phase updated');
  }

}

class CardBattleManagerStartPhaseState {
  _manager;

  constructor(manager) {
    this._manager = manager;
    this._manager.phaseChanged();
  }

  update() {
    if (Input.isTriggered('ok')) {
      this._manager.changePhase(new CardBattleManagerDrawPhaseState(this._manager));
    }
  }
}

class CardBattleManagerChooseFolderPhaseState {
  _manager;

  constructor(manager) {
    this._manager = manager;
    this._manager.phaseChanged();
  }

  update() {
    if (this._manager.hasPlayerDeck()) {
      this._manager.changePhase(new CardBattleManagerStartPhaseState(this._manager));
    }
  }

}

class CardBattleManagerChallengePhaseState {
  _manager;

  constructor(manager) {
    this._manager = manager;
    this._manager.phaseChanged();
    this.createCardBattePlayer();
    this.createCardBatteEnemy();
  }

  createCardBattePlayer() {
    const playerName = 'Player';
    const playerLevel = 1;
    const player = new CardBattlePlayer(playerName, playerLevel);
    this._manager.setPlayer(player);
  }
  
  createCardBatteEnemy() {
    const enemyName = 'Shining Dragon';
    const enemyLevel = 102;
    const enemy = new CardBattlePlayer(enemyName, enemyLevel);
    this._manager.setEnemy(enemy);
  }

  update() {
    if (Input.isTriggered('ok')) {
      this._manager.changePhase(new CardBattleManagerChooseFolderPhaseState(this._manager));
    }
  }
}

class CardBattleManager {
  _phase;
  _isPhaseChanged;
  _player;
  _enemy;

  static phaseChanged() {
    this._isPhaseChanged = true;
  }

  static phaseChangeDone() {
    this._isPhaseChanged = false;
  }

  static isPhaseChanged() {
    return this._isPhaseChanged;
  }

  static changePhase(phase) {
    this._phase = phase;
  }

  static setup() {
    this.changePhase(new CardBattleManagerChallengePhaseState(this));
  }

  static setPlayer(player) {
    this._player = player;
  }

  static getPlayerName() {
    return this._player.getName();
  }

  static getPlayerLevel() {
    return this._player.getLevel();
  }

  static setEnemy(enemy) {
    this._enemy = enemy;
  }

  static getEnemyName() {
    return this._enemy.getName();
  }

  static getEnemyLevel() {
    return this._enemy.getLevel();
  }

  static update() {
    this._phase.update();
  }

  static getPlayerFolderName(index) {
    return playerDecksData[index].name;
  }

  static selectPlayerFolder(index) {
    const cards = playerDecksData[index].cards;
    const cardset = this.createCardset(cards);
    this._player.setDeck(cardset);
    console.log(cardset);
  }

  static hasPlayerDeck() {
    return this._player?.hasDeck();
  }

  static createCardset(cards) {
    const cardset = cards.map(card => {
      return this.createCard(card);
    });
    return cardset;
  }

  static createCard(card) {
    const type = card.type;
    const energyData = card.energy;
    const powerData = card.power;
    switch (type) {
      case CardTypes.LUCK:
        return Card.makeBattleCard(card);
        break;
      case CardTypes.POWER:
        return Card.makeBattleCard(card, energyData, powerData);
        break;
      default: //CardTypes.BATTLE
        return Card.makeBattleCard(card, energyData);
        break;
    }
  }

  static isChallengerPhase() {
    return this._phase instanceof ChallengePhase;
  }

  static isChooseFolderPhase() {
    return this._phase instanceof ChooseFolderPhase;
  }

  static isStartPhase() {
    return this._phase instanceof StartPhase;
  }
}
Input.isAnyKeyActive = function() {
  return this._latestButton !== null;
};
Scene_Boot.prototype.start = function() {
  Scene_Base.prototype.start.call(this);
  SoundManager.preloadImportantSounds();
  DataManager.setupNewGame();
  SceneManager.goto(CardBattleScene);
  this.resizeScreen();
  this.updateDocumentTitle();
};
ImageManager.loadCard = function(filename) {
  return this.loadBitmap("img/cards/", filename);
};

})();

