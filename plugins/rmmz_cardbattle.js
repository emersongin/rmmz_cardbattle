(function() {
'use strict';
const CardTypes = {
  BATTLE: 1,
  POWER: 2,
  GAME: 3
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

  isBusy() {
    return this.isOpening() || this.isClosing();
  }

  isAvailable() {
    return !this.isBusy();
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
    this._duration = 0.3;
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
    if (action) action.execute();
  }

  hasActions() {
    return this._actions.length > 0;
  }

  calculateTimeInterval(origin, destiny, duration = 1) {
    const distance = Math.abs(origin - destiny);
    const time = Math.abs(duration * 60);
    return (distance / time) || 1;
  }
}
class CardSpriteStoppedState {
  _card;
  
  constructor(sprite) {
    this._card = sprite;
  }

  updateState() {
    // nothing
  }
}
class CardSpriteMovingState {
  _card;
  _x;
  _y;
  _xInterval;
  _yInterval;
  
  constructor(sprite, destinyXPosition, destinyYPosition, originXPosition, originYPosition) {
    this._card = sprite;
    this._x = destinyXPosition;
    this._y = destinyYPosition;
    const duration = this._card._duration;
    this._xInterval = this._card.calculateTimeInterval(originXPosition, destinyXPosition, duration);
    this._yInterval = this._card.calculateTimeInterval(originYPosition, destinyYPosition, duration);
  }

  updateState() {
    const that = this._card;
    if (this._x !== that.x || this._y !== that.y) {
      this.updateXPosition();
      this.updateYPosition();
    } else {
      that.stop();
    }
  }

  updateXPosition() {
    const that = this._card;
    const reached = that.x > this._x;
    if (this._x !== that.x) {
      that.x = reached ? that.x - this._xInterval : that.x + this._xInterval;
    }
    const limit = (reached && that.x < this._x || !reached && that.x > this._x);
    if (limit) that.x = this._x;
  }

  updateYPosition() {
    const that = this._card;
    const reached = that.y > this._y;
    if (this._y !== that.y) {
      that.y = reached ? that.y - this._yInterval : that.y + this._yInterval;
    }
    const limit = (reached && that.y < this._y || !reached && that.y > this._y);
    if (limit) that.y = this._y;
  }

}
class CardSpriteOpeningState {
  _card;
  _x;
  _isToOpen;
  _interval;
  
  constructor(sprite, xPosition) {
    this._card = sprite;
    const that = this._card;
    this._x = xPosition;
    this._isToOpen = xPosition < that.x;
    this._interval = that.calculateTimeInterval(0, that.cardOriginalWidth(), that._duration);
  }

  isToOpen() {
    return this._isToOpen;
  }

  isToClose() {
    return !this.isToOpen();
  }

  updateState() {
    const that = this._card;
    if (this.isUpdatingPosition() || this.isUpdatingWidth()) {
      this.updatePosition();
      this.updateWidth();
      that.refresh();
    }
    if (that.isOpened()) that.opened();
    if (that.isClosed()) that.closed();
  }

  isUpdatingPosition() {
    return this._x !== this._card.x;
  }

  updatePosition() {
    const that = this._card;
    if (this.isToOpen()) {
      that.x = that.x - this._interval;
      if (that.x < this._x) that.x = this._x;
    }
    if (this.isToClose()) {
      that.x = that.x + this._interval;
      if (that.x > this._x) that.x = this._x;
    }
    console.log(that.x);
  }

  isUpdatingWidth() {
    const that = this._card;
    return that.width < that.cardOriginalWidth() && that.width > 0;
  }

  updateWidth() {
    const that = this._card;
    if (this.isToOpen()) {
      that.width += (this._interval * 2);
      if (that.width > that.cardOriginalWidth()) that.width = that.cardOriginalWidth();
    }
    if (this.isToClose()) {
      that.width -= (this._interval * 2);
      if (that.width < 0) that.width = 0;
    }
  }
}
class CardSpriteZoomState {
  _card;
  _xScale;
  _yScale;
  _x;
  _y;
  _xInterval;
  _yInterval;
  _xScaleInterval;
  _yScaleInterval;
  
  constructor(sprite, destinyXPosition, destinyYPosition, destinyXScale, destinyYScale) {
    this._card = sprite;
    const duration = this._card._duration / 2;
    this._x = destinyXPosition;
    this._y = destinyYPosition;
    this._xScale = destinyXScale;
    this._yScale = destinyYScale;
    this.definePosition(duration);
    this.defineScale(duration);
  }

  definePosition(duration) {
    const that = this._card;
    const originXPosition = that.x;
    const originYPosition = that.y;
    const destinyXPosition = this._x;
    const destinyYPosition = this._y;
    this._xInterval = that.calculateTimeInterval(originXPosition, destinyXPosition, duration);
    this._yInterval = that.calculateTimeInterval(originYPosition, destinyYPosition, duration);
  }

  defineScale(duration) {
    const that = this._card;
    const originXScale = that.scale.x;
    const originYScale = that.scale.y;
    const destinyXScale = this._xScale;
    const destinyYScale = this._yScale;
    this._xScaleInterval = that.calculateTimeInterval(originXScale, destinyXScale, duration);
    this._yScaleInterval = that.calculateTimeInterval(originYScale, destinyYScale, duration);

  }

  updateState() {
    const that = this._card;
    if (
        this.isXpositionDifferent() || 
        this.isYpositionDifferent() || 
        this.isXScaleDifferent() ||
        this.isYScaleDifferent()
    ) {
      this.updateXPosition();
      this.updateYPosition();
      this.updateXScale();
      this.updateYScale();
    } else {
      that.stop();
    }
  }

  isXScaleDifferent() {
    return this._xScale !== this._card.scale.x;
  }

  isYScaleDifferent() {
    return this._yScale !== this._card.scale.y;
  }

  isXpositionDifferent() {
    return this._x !== this._card.x;
  }

  isYpositionDifferent() {
    return this._y !== this._card.y;
  }

  updateXScale() {
    const that = this._card;
    const reached = that.scale.x > this._xScale;
    if (this._xScale !== that.scale.x) {
      that.scale.x = reached ? that.scale.x - this._xScaleInterval : that.scale.x + this._xScaleInterval;
    }
    const limit = (reached && that.scale.x < this._xScale || !reached && that.scale.x > this._xScale);
    if (limit) that.scale.x = this._xScale;
  }

  updateYScale() {
    const that = this._card;
    const reached = that.scale.y > this._yScale;
    if (this._yScale !== that.scale.y) {
      that.scale.y = reached ? that.scale.y - this._yScaleInterval : that.scale.y + this._yScaleInterval;
    }
    const limit = (reached && that.scale.y < this._yScale || !reached && that.scale.y > this._yScale);
    if (limit) that.scale.y = this._yScale;
  }

  updateXPosition() {
    const that = this._card;
    const reached = that.x > this._x;
    if (this._x !== that.x) {
      that.x = reached ? that.x - this._xInterval : that.x + this._xInterval;
    }
    const limit = (reached && that.x < this._x || !reached && that.x > this._x);
    if (limit) that.x = this._x;
  }

  updateYPosition() {
    const that = this._card;
    const reached = that.y > this._y;
    if (this._y !== that.y) {
      that.y = reached ? that.y - this._yInterval : that.y + this._yInterval;
    }
    const limit = (reached && that.y < this._y || !reached && that.y > this._y);
    if (limit) that.y = this._y;
  }

}
class CardAnimationSprite extends Sprite_Animation {
  initMembers() {
    super.initMembers();
    // this._quakeEffect = false;
    // this._quakeDirection = '';
  }

  setup(targets, animation, mirror, delay) {
    super.setup(targets, animation, mirror, delay);
    // this._quakeEffect = animation.quakeEffect || false;
  }

  update() {
    super.update();
    if (this.isPlaying()) {
      // this.updateQuakeEffect();
    } else {
      // for (const target of this._targets) {
      //   if (this.isNotOriginPosition(target)) {
      //     this.returnOriginPosition(target);
      //   }
      // }
      this.destroy();
    }
  }

  // isNotOriginPosition(target) {
  //   return target._x !== target.x || target._y !== target.y;
  // }

  // returnOriginPosition(target, time = 1) {
  //   if (target._x !== target.x) {
  //     target.x = target._x > target.x ? target.x + time : target.x - time;
  //   }
  //   if (target._y !== target.y) {
  //     target.y = target._y > target.y ? target.y + time : target.y - time;
  //   }
  // }

  // updateQuakeEffect() {
  //   if (this.isPlaying() && this.isQuakeEffect()) {
  //     for (const target of this._targets) {
  //       if (this.isNotOriginPosition(target)) {
  //         this.returnOriginPosition(target);
  //       } else {
  //         const directions = ['TOP', 'BOTTOM', 'LEFT', 'RIGHT'];
  //         directions.filter(direction => this._quakeDirection !== direction);
  //         const direction = directions[Math.randomInt(3)];
  //         this.startQuakeEffect(target, direction);
  //       }
  //     }
  //   }
  // }

  // startQuakeEffect(target, direction, time = 1) {
  //   switch (direction) {
  //     case 'TOP':
  //       target.y -= time;
  //       break;
  //     case 'BOTTOM':
  //       target.y += time;
  //       break;
  //     case 'LEFT':
  //       target.x -= time;
  //       break;
  //     case 'RIGHT':
  //       target.x += time;
  //       break;
  //   }
  // }

  // isQuakeEffect() {
  //   return this._quakeEffect;
  // }
}



class CardSpriteAnimatedBehavior {
  _card;
  _animation;
  _animationSprite;
  _times;
  
  constructor(sprite, animation, times) {
    this._card = sprite;
    this._animation = animation;
    this._times = times;
  }

  updateBehavior() {
    const that = this._card;
    if (this.hasTimes() || this.isPlayingAnimation()) {
      if (this.noHasAnimationSprite()) {
        this._animationSprite = new CardAnimationSprite();
        this._animationSprite.setup([that], this._animation);
        that.parent.addChild(this._animationSprite);
        this._times--;
      } else {
        if (this.isNoPlayingAnimation()) this._animationSprite = null;
      }
    } else {
      that.removeBehavior(this);
    }
  }

  isNoPlayingAnimation() {
    return !this.isPlayingAnimation();
  }

  isPlayingAnimation() {
    return this.hasAnimationSprite() && this._animationSprite.isPlaying();
  }

  hasAnimationSprite() {
    return this._animationSprite;
  }

  noHasAnimationSprite() {
    return !this.hasAnimationSprite();
  }

  hasTimes() {
    return this._times > 0;
  }
}
class CardSpriteFlashedBehavior {
  _card;
  _duration;
  _flashDuration = 0;
  _times;
  
  constructor(sprite, color, duration, times) {
    this._card = sprite;
    this.drawFlash(color);
    this._duration = duration;
    this._times = times;
  }

  drawFlash(color = 'white') {
    const layer = this._card._flashedLayer;
    layer.bitmap.clear();
    layer.bitmap.fillAll(color);
  }

  updateBehavior() {
    if (this.hasTimesOrInfinity() && this.isNoPlaying()) {
      if (this.hasTimes()) this._times--;
      this._flashDuration = this._duration;
    } else {
      this.updateFlash();
    }
  }

  hasTimesOrInfinity() {
    const infinity = this._times === -1;
    return this.hasTimes() || infinity;
  }

  hasTimes() {
    return this._times > 0;
  }

  isNoPlaying() {
    return this._flashDuration === 0;
  }

  updateFlash() {
    const that = this._card;
    const layer = this._card._flashedLayer;
    if (this._flashDuration > 0) {
      this._flashDuration--;
      this.updateFlashOpacity();
    } else {
      that._flashedLayer.bitmap.clear();
      that.removeBehavior(this);
    }
  }

  updateFlashOpacity() {
    const layer = this._card._flashedLayer;
    layer.opacity = (this._flashDuration / this._duration) * 255;
  }
}
class CardSpriteSelectedBehavior {
  _card;
  
  constructor(sprite) {
    this._card = sprite;
    this.fillLayer();
  }

  fillLayer() {
    const that = this._card;
    const layer = this._card._selectedLayer;
    layer.bitmap.clear();
    layer.bitmap.fillAll('orange');
    layer.bitmap.clearRect(4, 4, that.width - 8, that.height - 8);
  }

  updateBehavior() {
    this.updatePulse();
  }

  updatePulse() {
    const layer = this._card._selectedLayer;
    layer.opacity -= 32;
    if (layer.opacity <= 0) {
      layer.opacity = 255;
    }
  }
}
class CardSpriteHoveredBehavior {
  _card;
  
  constructor(sprite) {
    this._card = sprite;
    this.fillLayer();
  }

  fillLayer() {
    const that = this._card;
    const layer = this._card._hoveredLayer;
    layer.bitmap.clear();
    layer.bitmap.fillAll('yellow');
    layer.bitmap.clearRect(4, 4, that.width - 8, that.height - 8);
  }

  updateBehavior() {
    this.updatePulse();
  }

  updatePulse() {
    const layer = this._card._hoveredLayer;
    layer.opacity -= 32;
    if (layer.opacity <= 0) {
      layer.opacity = 255;
    }
  }
}
class CardSpriteUpdatedBehavior {
  _card;
  _attack;
  _health;
  _interval;
  _counter = 0;
  
  constructor(sprite, attackPoints, healtPoints) {
    this._card = sprite;
    this._attack = attackPoints;
    this._health = healtPoints;
    this.calculateInterval();
  }

  calculateInterval() {
    const that = this._card;
    const atk = Math.abs(that._attackPoints - this._attack);
    const hlt = Math.abs(that._healthPoints - this._health);
    const points = atk > hlt ? atk : hlt;
    const fps = 30;
    this._interval = Math.floor(fps / (points || 1)) || 1;
  }

  updateBehavior() {
    const that = this._card;
    if (this._counter) return this._counter--;
    if (that._attackPoints !== this._attack || that._healthPoints !== this._health) {
      if (that._attackPoints !== this._attack) {
        that._attackPoints = that._attackPoints > this._attack ? that._attackPoints - 1 : that._attackPoints + 1;
      }
      if (that._healthPoints !== this._health) {
        that._healthPoints = that._healthPoints > this._health ? that._healthPoints - 1 : that._healthPoints + 1;
      }
      that.refresh();
      this._counter = this._interval;
    } else {
      that.removeBehavior(this);
    }
  }
}

class CardSprite extends ActionSprite {
  initialize() {
    super.initialize();
    this._type = 0;
    this._color = 0;
    this._figure = {};
    this._backImage = {};
    this._status = {};
    this._behaviors = [];
    this._turned = true;
    this._disabled = false;
    this._attackPoints = 0;
    this._healthPoints = 0;
    this._contentLayer = {};
    this._disabledLayer = {};
    this._flashedLayer = {};
    this._hoveredLayer = {};
    this._selectedLayer = {};
    this.setup();
  }

  setup() {
    this.setSize();
    this.createLayers();
    this.hide();
    this.stop();
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

  createLayers() {
    this.createContentLayer();
    this.createSelectedLayer();
    this.createHoveredLayer();
  }

  createContentLayer() {
    this._contentLayer = new Sprite();
    this._contentLayer.bitmap = new Bitmap(this.cardOriginalWidth(), this.cardOriginalHeight());
    this.createDisableLayer();
    this.createFlashLayer();
    this.addChild(this._contentLayer);
  }

  createDisableLayer() {
    this._disabledLayer = new Sprite();
    this._disabledLayer.visible = false;
    this._disabledLayer.opacity = 128;
    this._disabledLayer.bitmap = new Bitmap(this.cardOriginalWidth(), this.cardOriginalHeight());
    this._disabledLayer.bitmap.fillAll('black');
    this._contentLayer.addChild(this._disabledLayer);
  }

  createFlashLayer() {
    this._flashedLayer = new Sprite();
    this._flashedLayer.bitmap = new Bitmap(this.cardOriginalWidth(), this.cardOriginalHeight());
    this._contentLayer.addChild(this._flashedLayer);
  }

  createHoveredLayer() {
    this._hoveredLayer = new Sprite();
    this._hoveredLayer.bitmap = new Bitmap(this.cardOriginalWidth(), this.cardOriginalHeight());
    this.addChild(this._hoveredLayer);
  }

  createSelectedLayer() {
    this._selectedLayer = new Sprite();
    this._selectedLayer.bitmap = new Bitmap(this.cardOriginalWidth(), this.cardOriginalHeight());
    this.addChild(this._selectedLayer);
  }

  enable() {
    this._disabled = false;
    this._disabledLayer.visible = false;
    this.refresh();
  }

  hide() {
    this.visible = false;
  }

  stop() {
    this.changeStatus(CardSpriteStoppedState);
  }

  changeStatus(status, ...params) {
    this._status = new status(this, ...params);
  }

  update() {
    if (this.hasActions() && (this.isStopped())) this.executeAction();
    if (this.isMoving() && this.isHidden()) this.show();
    if (this.isVisible()) {
      this.updateStates();
      this.updateBehaviors();
    }
    super.update();
  }

  isStopped() {
    return this.getStatus() instanceof CardSpriteStoppedState;
  }

  getStatus() {
    return this._status;
  }

  isMoving() {
    return this.getStatus() instanceof CardSpriteMovingState;
  }

  isHidden() {
    return !this.isVisible();
  }

  isVisible() {
    return this.visible;
  }

  show() {
    this.visible = true;
    this.refresh();
  }

  refresh() {
    this.drawCard();
  }

  drawCard() {
    this.clearContent();
    if (this.isTurnedToUp()) {
      this.drawCardBackground();
      this.drawCardFigure();
      this.drawCardDisplay();
    } else {
      this.drawCardBack();
    }
    if (this.isDisabled()) {
      this._contentLayer.setColorTone([0, 0, 0, 255]);
    } else {
      this._contentLayer.setColorTone([0, 0, 0, 0]);
    }
  }

  clearContent() {
    this._contentLayer.bitmap.clear();
  }

  isTurnedToUp() {
    return this._turned;
  }

  drawCardBackground() {
    const xPosition = 0;
    const yPosition = 0;
    const color = this.getBackgroundColor();
    this._contentLayer.bitmap.fillRect(xPosition, yPosition, this.width, this.height, color);
  }

  getBackgroundColor() {
    switch (this._color) {
      case CardColors.RED:
        return '#ff0000';
        break;
      case CardColors.GREEN:
        return '#00ff00';
        break;
      case CardColors.BLUE:
        return '#0000ff';
        break;
      case CardColors.WHITE:
        return '#ffffff';
        break;
      case CardColors.BLACK:
        return '#000000';
        break;
      default:
        return brown = '#a52a2a';
        break;
    }
  }

  drawCardFigure() {
    const contentX = 4;
    const contentY = 4;
    const contentWidth = this.cardOriginalWidth() - 8;
    const contentHeight = this.cardOriginalHeight() - 28;
    const openPercent = Math.floor((this.width / this.cardOriginalWidth()) * 100);
    const openWidth = Math.floor((contentWidth * openPercent) / 100);
    const figureX = 0;
    const figureY = 0;
    const figureWidth = openWidth ? this._figure.width : 0;
    const figureHeight = this._figure.height;
    this._contentLayer.bitmap.blt(
      this._figure, 
      figureX, 
      figureY, 
      figureWidth, 
      figureHeight,
      contentX,
      contentY,
      openWidth,
      contentHeight
    );
  }

  drawCardDisplay() {
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

  drawCardBack() {
    this._contentLayer.bitmap.blt(this._backImage, 0, 0, this.width, this.height, 0, 0);
  }

  isDisabled() {
    return this._disabled;
  }

  updateStates() {
    if (this._status) this._status.updateState();
  }

  updateBehaviors() {
    if (Array.isArray(this._behaviors)) {
      this._behaviors.forEach(behavior => {
        if (behavior) behavior.updateBehavior();
      });
    }
  }

  addBehavior(behavior, ...params) {
    this._behaviors.push(new behavior(this, ...params));
  }

  removeBehavior(behavior) {
    behavior = this.getBehavior(behavior);
    if (!behavior) return;
    this._behaviors = this._behaviors.filter(b => b !== behavior);
  }

  getBehavior(behavior) {
    if (typeof behavior === 'function') {
      return this._behaviors.find(b => b.constructor === behavior) || false;
    } else {
      return this._behaviors.find(b => b === behavior) || false;
    }
  }

  static create(type, color, figureName, attack, health) {
    const card = new CardSprite();
    card.setCard(
      type || CardTypes.BATTLE, 
      color || CardColors.BROWN, 
      figureName || 'default', 
      attack || 0, 
      health || 0
    );
    return card;
  }

  setCard(type, color, figureName, attack, health) {
    this.setType(type);
    this.setColor(color);
    this.setFigure(figureName);
    this.setBackImage();
    this._attackPoints = attack;
    this._healthPoints = health;
  }

  setType(type) {
    this._type = type;
  }

  setColor(color) {
    this._color = color;
  }

  setFigure(figureName) {
    this._figure = ImageManager.loadCard(figureName);
    // test
    // this._figure = new Bitmap(this.width, this.height);
    // this._figure.fillAll('yellow');
  }

  setBackImage() {
    this._backImage = new Bitmap(this.width, this.height);
    this._backImage.gradientFillRect (0, 0, this.width, this.height, '#555', '#000');
  }

  open() {
    this.addAction(this.commandOpen);
  }

  commandOpen() {
    if (this.isVisible() && this.isStopped() && this.isClosed()) {
      const xPositionOpening = this.x - (this.cardOriginalWidth() / 2);
      this.changeStatus(CardSpriteOpeningState, xPositionOpening);
    }
  }

  isClosed() {
    return this.width === 0;
  }

  opened() {
    this.width = this.cardOriginalWidth();
    this.stop();
  }

  close() {
    this.addAction(this.commandClose);
  }

  commandClose() {
    if (this.isVisible() && this.isStopped() && this.isOpened()) {
      const xPositionClosing = this.x + (this.cardOriginalWidth() / 2);
      this.changeStatus(CardSpriteOpeningState, xPositionClosing);
    }
  }

  isOpened() {
    return this.width === this.cardOriginalWidth();
  }

  closed() {
    this.width = 0;
    this.stop();
  }

  toMove(destinyXPosition, destinyYPosition, originXPosition, originYPosition) {
    this.addAction(
      this.commandMoving, 
      destinyXPosition, 
      destinyYPosition,
      originXPosition, 
      originYPosition
    );
  }

  commandMoving(destinyXPosition, destinyYPosition, originXPosition = this.x, originYPosition = this.y) {
    if (this.isVisible() && this.isStopped()) {
      this.changeStatus( 
        CardSpriteMovingState,
        destinyXPosition,
        destinyYPosition,
        originXPosition,
        originYPosition
      );
    }
  }

  hover() {
    if (this.isVisible() && this.isStopped()) {
      this.addBehavior(CardSpriteHoveredBehavior);
    }
  }

  unhover() {
    this._hoveredLayer.bitmap.clear();
    this.removeBehavior(CardSpriteHoveredBehavior);
  }

  select() {
    if (this.isVisible() && (this.isStopped() || this.isMoving() || this.isZooming())) {
      this.addBehavior(CardSpriteSelectedBehavior);
    }
  }

  isZooming() {
    // return this.getStatus() instanceof CardSpriteZoomingState;
    return true;
  }

  unselect() {
    this._selectedLayer.bitmap.clear();
    this.removeBehavior(CardSpriteSelectedBehavior);
  }

  flash(color = 'white', duration = 60, times = 1) {
    if (this.isVisible() && (this.isStopped() || this.isMoving() || this.isZooming())) {
      this.addBehavior(
        CardSpriteFlashedBehavior,
        color, 
        duration, 
        times
      );
    }
  }

  damageAnimation(times = 1) {
    const animation = this.damage();
    this.animate(animation, times);
  }

  damage() {
    return {
      id: 45,
      displayType: 0,
      effectName: "CureOne1",
      flashTimings:  [
        {frame: 0, duration: 10, color: [0,255,0,102]},
        {frame: 9, duration: 30, color: [102,255,0,102]},
        {frame: 19, duration: 30, color: [136,255,0,102]},
        {frame: 29, duration: 30, color: [136,255,0,102]}
      ],
      name: "Curar 1",
      offsetX: 48,
      offsetY: 128,
      rotation:  { x: 0, y: 0, z: 0 },
      scale: 100,
      soundTimings:  [
        // {frame: 1, se:  { name: "Ice1", pan: 0, pitch: 100, volume: 90}},
        // {frame: 2, se:  { name: "Recovery", pan: 0, pitch: 70, volume: 90}},
        // {frame: 6, se:  { name: "Ice4", pan: 0, pitch: 100, volume: 90}}
      ],
      speed: 100,
      timings: [],
      alignBottom: false,
      quakeEffect: false
    };
  }

  animate(animation, times) {
    if (this.isVisible() && (this.isStopped() || this.isMoving() || this.isZooming())) {
      this.addBehavior(
        CardSpriteAnimatedBehavior, 
        animation,
        times
      );
    }
  }

  changeAttackPoints(attackPoints) {
    this.changePoints(attackPoints);
  }

  changeHealthPoints(healtPoints) {
    this.changePoints(this._attackPoints, healtPoints);
  }

  changePoints(attackPoints = this._attackPoints, healtPoints = this._healthPoints) {
    if (this.isVisible() && this.isStopped()) {
      this.addBehavior(
        CardSpriteUpdatedBehavior, 
        attackPoints,
        healtPoints
      );
    }
  }

  disable() {
    this._disabled = true;
    this._disabledLayer.visible = true;
    this.refresh();
  }

  isBusy() {
    return this.isNotStopped() || this.hasActions();
  }

  isNotStopped() {
    return !this.isStopped();
  }

  zoom() {
    this.addAction(this.commandZoom);
  }

  commandZoom() {
    if (this.isVisible() && this.isStopped() && this.isNoZoom()) {
      const destinyXPosition = this.x - ((this.width / 2) / 2);
      const destinyYPosition = this.y - ((this.height / 2) / 2);
      const destinyXScale = (this.scale.x / 2) * 3;
      const destinyYScale = (this.scale.y / 2) * 3;
      this.changeStatus(
        CardSpriteZoomState,
        destinyXPosition,
        destinyYPosition,
        destinyXScale,
        destinyYScale
      );
    }
  }

  isNoZoom() {
    return this.scale.x === 1 && this.scale.y === 1;
  }

  zoomOut() {
    this.addAction(this.commandZoomOut);
  }

  commandZoomOut() {
    if (this.isVisible() && this.isStopped() && this.isZoom()) {
      const destinyXPosition = this.x + ((this.width / 2) / 2);
      const destinyYPosition = this.y + ((this.height / 2) / 2);
      const destinyXScale = ((this.scale.x / 3) * 2);
      const destinyYScale = ((this.scale.y / 3) * 2);
      this.changeStatus(
        CardSpriteZoomState,
        destinyXPosition,
        destinyYPosition, 
        destinyXScale,
        destinyYScale        
      );
    }
  }

  isZoom() {
    return this.scale.x > 1 || this.scale.y > 1;
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
  
  commandShowCards(cardSprites = []) {
    this._cardSprites = this._cardSprites.map((card, index) => {
      const cardSprite = cardSprites.find(sprite => sprite === card.sprite);
      if (cardSprite || !cardSprites.length) {
        card.sprite.show();
        card.state = CardSpriteStates.ENABLED;
      }
      return card;
    });
  }

  showCardsAndStartMoving(cardIndexs, timeInterval) {
    this.addAction(this.commandShowCardsAndStartMoving, cardIndexs, timeInterval);
  }

  commandShowCardsAndStartMoving(cardSprites = [], timeInterval = 0) {
    this._cardSprites = this._cardSprites.map((card, index) => {
      const cardSprite = cardSprites.find(sprite => sprite === card.sprite);
      if (cardSprite || !cardSprites.length) {
        card.sprite.hide();
        card.state = CardSpriteStates.ENABLED;
        setTimeout(() => {
          this.moveCardToStartPosition(card.sprite);
          card.sprite.show();
        }, (index * (timeInterval * 1000)));
      }
      return card;
    });

    this._cardSprites = this._cardSprites.map((card, index) => {
      const cardSprite = cardSprites.find(sprite => sprite === card.sprite);
      if (cardSprite) {
        card.sprite.show();
        card.state = CardSpriteStates.ENABLED;
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

  commandStartCloseCards(cardSprites = [], timeInterval = 0) {
    cardSprites.forEach((cardSprite, index) => {
      setTimeout(() => {
        if (this.isCardState(cardSprite, CardSpriteStates.ENABLED)) {
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

  commandStartOpenCards(cardSprites = [], timeInterval = 0) {
    cardSprites.forEach((cardSprite, index) => {
      setTimeout(() => {
        if (this.isCardState(cardSprite, CardSpriteStates.ENABLED)) {
          this.startOpenCard(cardSprite);
        }
      }, (index * (timeInterval * 1000)));
    });
  }

  startOpenCard(cardSprite) {
    cardSprite.open();
  }

  getWaitingCardSprites() {
    const cadSprites = [];
    this._cardSprites.forEach((card, index) => {
      if (card.state === CardSpriteStates.WAITING) {
        cadSprites.push(card.sprite);
      }
    });
    return cadSprites;
  }

  isNotBusy() {
    return !this.isBusy();
  }
  
  isBusy() {
    return this._selectMode || this.isBusyCards();
  }
  
  isBusyCards() {
    return this._cardSprites.some(card => card.sprite.isBusy());
  }

  isNotBusyCards() {
    return !this.isBusyCards();
  }
  
  update() {
    if (this.isDisabled()) return;
    if (this.hasActions() && this.isNotBusy()) this.executeAction();
    if (this.isCardSpritesMoving() && this.isHidden()) this.show();
    if (this.isVisible()) {
      console.log(this._selectMode, this.isNotBusyCards());
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
    if (this.someEnabledCardSprite()) {
      this._selectMode = true;
      this._changedMode = true;
      this._cursorIndex = 0;
    }
  }

  someEnabledCardSprite() {
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

  commandShowCardCloseds(cardSprites = []) {
    this._cardSprites = this._cardSprites.map((card, index) => {
      const cardSprite = cardSprites.find(sprite => sprite === card.sprite);
      if (cardSprite || !cardSprites.length) {
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

  startFlashCards(cardIndexs, timeInterval, color, duration) {
    this.addAction(this.commandStartFlashCards, cardIndexs, timeInterval, color, duration);
  }

  commandStartFlashCards(cardSprites = [], timeInterval = 0, color, duration) {
    cardSprites.forEach((cardSprite, index) => {
      setTimeout(() => {
        if (this.isCardState(cardSprite, CardSpriteStates.ENABLED)) {
          this.startFlashCard(cardSprite, color, duration);
        }
      }, (index * (timeInterval * 1000)));
    });
  }

  startFlashCard(cardSprite, color, duration) {
    cardSprite.flash(color, duration);
  }

  startDamageAnimation(cardIndexs, timeInterval) {
    this.addAction(this.commandStartDamageAnimationCard, cardIndexs, timeInterval);
  }

  commandStartDamageAnimationCard(cardSprites = [], timeInterval = 0) {
    cardSprites.forEach((sprite, index) => {
      setTimeout(() => {
        if (this.isCardState(sprite, CardSpriteStates.ENABLED)) {
          sprite.animationDamage();
        }
      }, (index * (timeInterval * 1000)));
    });
  }

  isCardState(cardSprite, state) {
    const card = this._cardSprites.find(card => card.sprite === cardSprite);
    return card ? card.state === state : false;

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
class StartBattleTransition extends Sprite {
  initialize() {
    super.initialize();
    this._duration = 0.5;
    this._started = false;
    this._backgroundBitmap = null;
    this._backgroundLayer = null;
    this._blackLeftSideLayer = null;
    this._blackRightSideLayer = null;
    this.loadBackgroundContents();
    this.createBackground();
    this.createSideLayers();
    this.setupTransitions();
  }

  loadBackgroundContents() {
    this._backgroundBitmap = ImageManager.loadPicture('background1');
  }

  createBackground() {
    this._backgroundLayer = new Sprite(this.createEmptyBitmap());
    this.addChild(this._backgroundLayer);
  }

  createEmptyBitmap() {
    return new Bitmap(Graphics.width, Graphics.height);
  }

  createSideLayers() { 
    this._blackLeftSideLayer = new Sprite();
    this._blackLeftSideLayer.bitmap = this.createBlackScreenImage();
    this.addChild(this._blackLeftSideLayer);
    this._blackRightSideLayer = new Sprite();
    this._blackRightSideLayer.bitmap = this.createBlackScreenImage();
    this.addChild(this._blackRightSideLayer);
  }

  createBlackScreenImage() {
    const bitmap = new Bitmap(Graphics.width, Graphics.height);
    bitmap.fillRect(0, 0, Graphics.width, Graphics.height, 'black');
    return bitmap;
  }

  setupTransitions() {
    this.setupBackgroundTransition();
    this.setupLayerTransitions();
    this.startTransition();
  }

  setupBackgroundTransition() {
    const screenMiddle = Graphics.width / 2;
    this._backgroundLayer.target = {
      rect: {
        x: this._backgroundLayer.x, 
        y: this._backgroundLayer.y,
        width: this._backgroundLayer.width, 
        height: this._backgroundLayer.height
      },
      interval: this.calculateInterval(screenMiddle, 0, this._duration),
    };
  }

  calculateInterval(origin, target, duration) {
    return Math.floor(Math.abs(origin - target) / (duration * 60)) || 1;
  }

  setupLayerTransitions() {
    const screenWidth = Graphics.width;
    const screenMiddle = Graphics.width / 2;
    this._blackLeftSideLayer.x = -Graphics.width;
    this._blackRightSideLayer.x = Graphics.width;
    this._blackLeftSideLayer.target = {
      x: 0, 
      y: 0,
      interval: this.calculateInterval(-screenWidth, -screenMiddle, this._duration)
    };
    this._blackRightSideLayer.target = {
      x: 0, 
      y: 0,
      interval: this.calculateInterval(screenWidth, screenMiddle, this._duration)
    }
  }

  startTransition() {
    this.visible = true;
    this._started = true;
  }

  update() {
    super.update();
    if (this.isStartedTransition()) {
      if (this.isBackgroundBusy()) this.updateBackgroundTransition();
      if (!this.isBackgroundBusy() && this.isLayersBusy()) this.updateLayerTransitions();
    }
    if (!this.isBackgroundBusy() && !this.isLayersBusy()) {
      if (this.isEndTransition() && this.isVisibled()) {
        this.updateOpacity();
      } else {
        this.endTransition();
        this.hideBackground();
      }
    }
  }

  isStartedTransition() {
    return this._started;
  }

  isBackgroundBusy() {
    const backgroundLayer = this._backgroundLayer;
    const { x, y, width, height, target } = backgroundLayer;
    const { rect } = target;
    const { x: xRect, y: yRect, width: widthRect, height: heightRect } = rect;
    return xRect < width || yRect < height || widthRect > x || heightRect > y;
  }

  updateBackgroundTransition() { 
    const { x, y, width, height, target } = this._backgroundLayer;
    const { rect, interval } = target;
    const { x: xRect, y: yRect, width: widthRect, height: heightRect } = rect;
    if (xRect < width) {
      this._backgroundLayer.target.rect.x = xRect + interval;
    }
    if (yRect < height) {
      this._backgroundLayer.target.rect.y = yRect + interval;
    }
    if (widthRect > x) {
      this._backgroundLayer.target.rect.width = widthRect - (interval * 2);
    }
    if (heightRect > y) {
      this._backgroundLayer.target.rect.height = heightRect - (interval * 2);
    }
    this._backgroundLayer.bitmap = this.createBackgroundBitmapWithRect(this._backgroundLayer.target.rect);
  }

  createBackgroundBitmapWithRect(rect) {
    const bitmap = this.createEmptyBitmap();
    bitmap.fillAll('red');
    bitmap.blt(this._backgroundBitmap, 0, 0, Graphics.width, Graphics.height, 0, 0);
    bitmap.clearRect(rect?.x || 0, rect?.y || 0, rect?.width || 0, rect?.height || 0);
    return bitmap;
  }

  isLayersBusy() {
    return this.isLayerInMoving(this._blackLeftSideLayer) || 
      this.isLayerInMoving(this._blackRightSideLayer);
  }

  isLayerInMoving(layer) {
    const { x, y, target } = layer;
    const { x: targetX, y: targetY } = target;
    return x != targetX || y != targetY;
  }

  updateLayerTransitions() {
    this.updateLayerTransition(this._blackLeftSideLayer)
    this.updateLayerTransition(this._blackRightSideLayer);
  }

  updateLayerTransition(layer) {
    const { x, target } = layer;
    const { x: targetX } = target;
    if (targetX == x) return; 
    this.moveLayer(layer);
  }

  moveLayer(layer) {
    const { x, target } = layer;
    const { x: targetX, interval } = target;
    if (targetX > x) {
      layer.move(x + interval, 0);
      if (!(targetX > layer.x)) layer.x = targetX;
    } else if (targetX < x) {
      layer.move(x - interval, 0);
      if (!(targetX < layer.x)) layer.x = targetX;
    }
  }

  isEndTransition() {
    return !this._started;
  }

  isVisibled() {
    return this.visible;
  }

  endTransition() {;
    this._started = false;
  }

  hideBackground() {
    this._backgroundLayer.hide();
  }

  updateOpacity() {
    if (this.isStartedTransition()) {
      if (this.opacity < 255) {
        this.visible = true;
        this.opacity = this.opacity + 8;
      }
    } else {
      if (this.opacity > 0) this.opacity = this.opacity - 8;
      if (this.opacity <= 0) this.visible = false;
    }
  }

  isBusy() {
    return this.isBackgroundBusy() || 
      this.isLayersBusy() || 
      this.opacity > 0;
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

    // this.createBackground();
    // this.createStartBattleTransition();
    // this.createLuckGame();
    this.createBattleField();
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

  createBattleField() {
    this._battleFieldSprite = new Sprite();
    this._battleFieldSprite.setFrame(0, 0, this.width, this.height);
    this._effectsContainer = this._battleFieldSprite;
  }

  findTargetSprite = function(target) {
    return target;
  };

  isBusy() {
    return this._startBattleTransition.isBusy();
  }
}

class CardBattlePhase {
  scene;

  constructor(scene) {
    this.scene = scene;
    this.createTitleWindow();
    this.showTitleWindowChallengePhase();
  }

  createTitleWindow() {
    const rect = new Rectangle(0, 0, Graphics.boxWidth, Graphics.boxHeight);
    this.titleWindow = new TextWindow(rect);
    this.scene.addWindow(this.titleWindow);
  }

  showTitleWindowChallengePhase() {
    const orangeColor = 20;
    this.titleWindow.clearContent();
    this.titleWindow.addText('Card Battle Challenge');
    this.titleWindow.changeContentTextColor(orangeColor);
    this.titleWindow.alignContentCenter();
    this.titleWindow.moveWindowOnTopCenter();
    this.titleWindow.drawContentText();
    this.titleWindow.open();
  }

  update() {
    this.updateInput();
    this.updateTeminate();
  }

  updateInput() {
    if (Input.isTriggered('ok')) {
      if (this.titleWindow.isOpen()) this.titleWindow.close();
    }
  }

  updateTeminate() {
    if (this.titleWindow.isAvailable() && this.titleWindow.isClosed()) {
      this.scene.removeWindow(this.titleWindow);
      this.scene.changePhase(CardBattleTestPhase2);
    }
  }
}

// tests
class Test {
  setTest() {
    // Override this method in the child class
  }

  start() {
    // Override this method in the child class
  }

  assert(value) {
    this.value = value;
    return this;
  }

  toBe(value) {
    if (this.value !== value) {
      console.error('Test failed!: os valores não são iguais!');
      console.error('Expected:', value);
      console.error('Received:', this.value);
      return this;
    }
    console.info('Test passed!');
    return this;
  }

  toBeInstanceof(value) {
    if (!(this.value instanceof value)) {
      console.error('Test failed!: os valores não são instâncias!');
      console.error('Expected:', value);
      console.error('Received:', this.value);
      return this;
    }
    console.info('Test passed!');
    return this;
  }

  update(callback, fps = 60) {
    if (typeof callback !== 'function') return;
    for (let i = 0; i < fps; i++) {
      callback();
    }
  }
}
class ShowCardSpriteTest extends Test {
  card;
  scene;

  constructor(scene) {
    super();
    this.scene = scene;
    this.setTest();
  }

  setTest() {
    this.card = CardSprite.create(
      CardTypes.BATTLE,
      CardColors.BLUE,
      'default',
      1,
      1
    );
    const centerXPosition = (Graphics.boxWidth / 2 - this.card.width / 2);
    const centerYPosition = (Graphics.boxHeight / 2 - this.card.height / 2);
    this.card.x = centerXPosition;
    this.card.y = centerYPosition;
    this.scene.addChild(this.card);
  }

  start() {
    return new Promise(resolve => {
      this.card.show();
      setTimeout(() => {
        this.scene.removeChild(this.card);
        resolve(true);
      }, 1000);
    });
  }

}
class OpenCardSpriteTest extends Test {
  card;
  scene;

  constructor(scene) {
    super();
    this.scene = scene;
    this.setTest();
  }

  setTest() {
    this.card = CardSprite.create(
      CardTypes.BATTLE,
      CardColors.BLUE,
      'default',
      1,
      1
    );
    const centerXPosition = (Graphics.boxWidth / 2 - this.card.width / 2);
    const centerYPosition = (Graphics.boxHeight / 2 - this.card.height / 2);
    const cardWidthHalf = (this.card.width / 2);
    this.card.x = centerXPosition + cardWidthHalf;
    this.card.y = centerYPosition;
    this.card.width = 0;
    this.scene.addChild(this.card);
  }

  start() {
    return new Promise(resolve => {
      this.card.show();
      this.card.open();
      setTimeout(() => {
        this.scene.removeChild(this.card);
        resolve(true);
      }, 1000);
    });
  }

}
class CloseCardSpriteTest extends Test {
  card;
  scene;

  constructor(scene) {
    super();
    this.scene = scene;
    this.setTest();
  }

  setTest() {
    this.card = CardSprite.create(
      CardTypes.BATTLE,
      CardColors.BLUE,
      'default',
      1,
      1
    );
    const centerXPosition = (Graphics.boxWidth / 2 - this.card.width / 2);
    const centerYPosition = (Graphics.boxHeight / 2 - this.card.height / 2);
    this.card.x = centerXPosition;
    this.card.y = centerYPosition;
    this.scene.addChild(this.card);
  }

  start() {
    return new Promise(resolve => {
      this.card.show();
      this.card.close();
      setTimeout(() => {
        // this.scene.removeChild(this.card);
        resolve(true);
      }, 1000);
    });
  }

  // exemplo de teste de unidade
  // this.update(() => {
  //   this.card.update();
  // });
  // this.assert(this.card._status).toBeInstanceof(CardSpriteStoppedState);
  // this.assert(this.card.width).toBe(0);
}
class MoveCardSpriteTest extends Test {
  card;
  scene;

  constructor(scene) {
    super();
    this.scene = scene;
    this.setTest();
  }

  setTest() {
    this.card = CardSprite.create(
      CardTypes.BATTLE,
      CardColors.BLUE,
      'default',
      1,
      1
    );
    this.card.x = 0;
    this.card.y = 0;
    this.scene.addChild(this.card);
  }

  start() {
    return new Promise(resolve => {
      const destinyXPosition = (Graphics.boxWidth / 2 - this.card.width / 2);
      const destinyYPosition = (Graphics.boxHeight / 2 - this.card.height / 2);
      this.card.show();
      this.card.toMove(destinyXPosition, destinyYPosition);
      const avanceXposition = (Graphics.boxWidth - this.card.width);
      this.card.toMove(avanceXposition, destinyYPosition);
      const avanceYposition = (Graphics.boxHeight - this.card.height);
      this.card.toMove(avanceXposition, avanceYposition);
      this.card.toMove(destinyXPosition, avanceYposition);
      const returnStartPosition = 0;
      this.card.toMove(returnStartPosition, returnStartPosition);
      this.card.toMove(destinyXPosition, destinyYPosition);
      setTimeout(() => {
        this.scene.removeChild(this.card);
        resolve(true);
      }, 2000);
    });
  }

}
class HoveredCardSpriteTest extends Test {
  card;
  scene;

  constructor(scene) {
    super();
    this.scene = scene;
    this.setTest();
  }

  setTest() {
    this.card = CardSprite.create(
      CardTypes.BATTLE,
      CardColors.BLUE,
      'default',
      1,
      1
    );
    const centerXPosition = (Graphics.boxWidth / 2 - this.card.width / 2);
    const centerYPosition = (Graphics.boxHeight / 2 - this.card.height / 2);
    this.card.x = centerXPosition;
    this.card.y = centerYPosition;
    this.scene.addChild(this.card);
  }

  start() {
    return new Promise(resolve => {
      this.card.show();
      this.card.hover();
      setTimeout(() => {
        this.card.unhover();
        setTimeout(() => {
          this.scene.removeChild(this.card);
          resolve(true);
        }, 300);
      }, 1000);
    });
  } 

}
class SelectedCardSpriteTest extends Test {
  card;
  scene;

  constructor(scene) {
    super();
    this.scene = scene;
    this.setTest();
  }

  setTest() {
    this.card = CardSprite.create(
      CardTypes.BATTLE,
      CardColors.BLUE,
      'default',
      1,
      1
    );
    const centerXPosition = (Graphics.boxWidth / 2 - this.card.width / 2);
    const centerYPosition = (Graphics.boxHeight / 2 - this.card.height / 2);
    this.card.x = centerXPosition;
    this.card.y = centerYPosition;
    this.scene.addChild(this.card);
  }

  start() {
    return new Promise(resolve => {
      this.card.show();
      this.card.select();
      setTimeout(() => {
        this.card.unselect();
        setTimeout(() => {
          this.scene.removeChild(this.card);
          resolve(true);
        }, 300);
      }, 1000);
    });
  }

}
class FlashCardSpriteTest extends Test {
  card;
  scene;

  constructor(scene) {
    super();
    this.scene = scene;
    this.setTest();
  }

  setTest() {
    this.card = CardSprite.create(
      CardTypes.BATTLE,
      CardColors.BLUE,
      'default',
      1,
      1
    );
    const centerXPosition = (Graphics.boxWidth / 2 - this.card.width / 2);
    const centerYPosition = (Graphics.boxHeight / 2 - this.card.height / 2);
    this.card.x = centerXPosition;
    this.card.y = centerYPosition;
    this.scene.addChild(this.card);
  }

  start() {
    return new Promise(resolve => {
      this.card.show();
      setTimeout(() => {
        const color = 'white';
        const duration = 60;
        const times = 1;
        this.card.flash(color, duration, times);
        setTimeout(() => {
          this.scene.removeChild(this.card);
          resolve(true);
        }, 2000);
      }, 300);
    });
  } 

  testInfinityFlash() {
    this.card.show();
    setTimeout(() => {
      const color = 'white';
      const duration = 60;
      const infinity = -1;
      this.card.flash(color, duration, infinity);
      setTimeout(() => {
        this.card.stopFlash();
      }, 3000);
    }, 300);
  }

}
class DamageAnimationCardSpriteTest extends Test {
  card;
  scene;

  constructor(scene) {
    super();
    this.scene = scene;
    this.setTest();
  }

  setTest() {
    this.card = CardSprite.create(
      CardTypes.BATTLE,
      CardColors.BLUE,
      'default',
      1,
      1
    );
    const centerXPosition = (Graphics.boxWidth / 2 - this.card.width / 2);
    const centerYPosition = (Graphics.boxHeight / 2 - this.card.height / 2);
    this.card.x = centerXPosition;
    this.card.y = centerYPosition;
    this.scene.addChild(this.card);
  }

  start() {
    return new Promise(resolve => {
      this.card.show();
      const times = 1;
      this.card.damageAnimation(times);
      setTimeout(() => {
        this.scene.removeChild(this.card);
        resolve(true);
      }, 2000);
    });
  }

}
class UpdatingPointsCardSpriteTest extends Test {
  card;
  scene;

  constructor(scene) {
    super();
    this.scene = scene;
    this.setTest();
  }

  setTest() {
    this.card = CardSprite.create(
      CardTypes.BATTLE,
      CardColors.BLUE,
      'default',
      1,
      1
    );
    const centerXPosition = (Graphics.boxWidth / 2 - this.card.width / 2);
    const centerYPosition = (Graphics.boxHeight / 2 - this.card.height / 2);
    this.card.x = centerXPosition;
    this.card.y = centerYPosition;
    this.scene.addChild(this.card);
  }

  start() {
    return new Promise(resolve => {
      this.card.show();
      this.card.changePoints(30, 30);
      setTimeout(() => {
        this.scene.removeChild(this.card);
        resolve(true);
      }, 2000);
    });
  }

}
class DisableCardSpriteTest extends Test {
  card;
  scene;

  constructor(scene) {
    super();
    this.scene = scene;
    this.setTest();
  }

  setTest() {
    this.card = CardSprite.create(
      CardTypes.BATTLE,
      CardColors.BLUE,
      'default',
      1,
      1
    );
    const centerXPosition = (Graphics.boxWidth / 2 - this.card.width / 2);
    const centerYPosition = (Graphics.boxHeight / 2 - this.card.height / 2);
    this.card.x = centerXPosition;
    this.card.y = centerYPosition;
    this.scene.addChild(this.card);
  }

  start() {
    return new Promise(resolve => {
      this.card.show();
      this.card.disable();
      setTimeout(() => {
        this.card.enable();
        setTimeout(() => {
          this.scene.removeChild(this.card);
          resolve(true);
        }, 300);
      }, 1000);
    });
  }

}
class ZoomInCardSpriteTest extends Test {
  card;
  scene;

  constructor(scene) {
    super();
    this.scene = scene;
    this.setTest();
  }

  setTest() {
    this.card = CardSprite.create(
      CardTypes.BATTLE,
      CardColors.BLUE,
      'default',
      1,
      1
    );
    const centerXPosition = (Graphics.boxWidth / 2 - this.card.width / 2);
    const centerYPosition = (Graphics.boxHeight / 2 - this.card.height / 2);
    this.card.x = centerXPosition;
    this.card.y = centerYPosition;
    this.scene.addChild(this.card);
  }

  start() {
    return new Promise(resolve => {
      this.card.show();
      setTimeout(() => {
        this.card.zoom();
        setTimeout(() => {
          this.scene.removeChild(this.card);
          resolve(true);
        }, 1000);
      }, 500);
    });
  }

}
class ZoomOutCardSpriteTest extends Test {
  card;
  scene;

  constructor(scene) {
    super();
    this.scene = scene;
    this.setTest();
  }

  setTest() {
    this.card = CardSprite.create(
      CardTypes.BATTLE,
      CardColors.BLUE,
      'default',
      1,
      1
    );
    const centerXPosition = (Graphics.boxWidth / 2 - this.card.width / 2);
    const centerYPosition = (Graphics.boxHeight / 2 - this.card.height / 2);
    this.card.x = centerXPosition;
    this.card.y = centerYPosition;
    this.card.x = this.card.x - ((this.card.width / 2) / 2);
    this.card.y = this.card.y - ((this.card.height / 2) / 2);
    this.card.scale.x = (this.card.scale.x / 2) * 3;
    this.card.scale.y = (this.card.scale.y / 2) * 3;
    this.scene.addChild(this.card);
  }

  start() {
    return new Promise(resolve => {
      this.card.show();
      setTimeout(() => {
        this.card.zoomOut();
        setTimeout(() => {
          this.scene.removeChild(this.card);
          resolve(true);
        }, 1000);
      }, 500);
    });
  }

}

class CardBattleScene extends Scene_Message {
  initialize() {
    super.initialize();
    this._phase = null;
  }

  create() {
    super.create();
    this.createDisplayObjects();
    this.loadAssets();
  }

  createDisplayObjects() {
    this.createWindowLayer();
  }

  loadAssets() {
    ImageManager.loadCard('default');
  }

  start() {
    super.start();
    this.startTests();
  }

  async startTests() {
    const list = [
      ShowCardSpriteTest,
      CloseCardSpriteTest,
      OpenCardSpriteTest,
      MoveCardSpriteTest,
      DisableCardSpriteTest,
      HoveredCardSpriteTest,
      SelectedCardSpriteTest,
      FlashCardSpriteTest,
      DamageAnimationCardSpriteTest,
      UpdatingPointsCardSpriteTest,
      ZoomInCardSpriteTest,
      ZoomOutCardSpriteTest
    ];

    for (const test of list) {
      this.changePhase(test);
      await this._phase.start();
    }
  }

  update() {
    if (this.isActive()) {
      if (this._phase) this._phase.update();
    }
    super.update();
  }

  changePhase(phase) {
    this._phase = new phase(this);
  }

  isActive() {
    return !this.isBusy();
  }

  isBusy() {
    return super.isBusy();
  };

  stop() {
    super.stop();
  }

  terminate() {
    super.terminate();
  }

  removeWindow(window) {
    this._windowLayer.removeChild(window);
  };

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

