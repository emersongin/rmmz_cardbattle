(function() {
'use strict';
Input.isAnyKeyActiveIn = function(keys = []) {
  keys = Array.isArray(keys) ? keys : [keys];
  return keys.some(key => this._latestButton === key);
};
Scene_Boot.prototype.start = function() {
  Scene_Base.prototype.start.call(this);
  SoundManager.preloadImportantSounds();
  DataManager.setupNewGame();
  SceneManager.goto(CardBattleTestScene);
  this.resizeScreen();
  this.updateDocumentTitle();
};
ImageManager.loadCard = function(filename) {
  return this.loadBitmap("img/cards/", filename);
};
const GameConst = {
  ATTACK_POINTS: 'ATTACK_POINTS',
  HEALTH_POINTS: 'HEALTH_POINTS',
  RED_POINTS: 'RED_POINTS',
  BLUE_POINTS: 'BLUE_POINTS',
  GREEN_POINTS: 'GREEN_POINTS',
  BLACK_POINTS: 'BLACK_POINTS',
  WHITE_POINTS: 'WHITE_POINTS',
  NUM_CARDS_IN_DECK: 'NUM_CARDS_IN_DECK',
  NUM_CARDS_IN_HAND: 'NUM_CARDS_IN_HAND',
  NUM_CARDS_IN_TRASH: 'NUM_CARDS_IN_TRASH',
  LINE_TEXT: 'LINE_TEXT',
  TEXT_START: 'TEXT_START',
  CHANGE_COLOR: 'CHANGE_COLOR',
  START: 'START',
  CENTER: 'CENTER',
  END: 'END',
  TOP: 'TOP',
  MIDDLE: 'MIDDLE',
  BOTTOM: 'BOTTOM',
  RED_COLOR: 'RED_COLOR',
  BLUE_COLOR: 'BLUE_COLOR',
};

const CardTypes = {
  BATTLE: 1,
  POWER: 2,
  GAME: 3
};

const ColorTypes = {
  RED: 1,
  GREEN: 2,
  BLUE: 3,
  WHITE: 4,
  BLACK: 5,
  BROWN: 6,
};

const GameColorIndexs = {
  NORMAL_COLOR: 0,
  SYSTEM_COLOR: 16,
  CRISIS_COLOR: 17,
  DEATH_COLOR: 18,
  GAIN_COLOR: 19,
  DAMAGE_COLOR: 20,
};

const IconSetConst = {
  REDBOX: 309,
  BLUEBOX: 312,
  GREENBOX: 311,
  WHITEBOX: 307,
  BLACKBOX: 308,
  BROWNBOX: 310,
  DECK: 296,
  HAND: 142,
  TRASH: 235,
  SAPPHIRE: 161,
  RUBY: 162,
  BLUESAPPHIRE: 165
};

const HexColors = {
  RED: '#ff0000',
  GREEN: '#00ff00',
  BLUE: '#0000ff',
  WHITE: '#e5e5e5',
  BLACK: '#191919',
  BROWN: '#a52a2a',
  FADEDRED: '#990000',
  FADEDGREEN: '#009900',
  FADEDBLUE: '#000099',
  FADEDWHITE: '#959595',
  FADEDBLACK: '#101010',
  FADEDBROWN: '#852828',
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
class StringHelper {
  static convertPointsDisplay(value = 0) {
    return value.toString().padStart(2, ' ');
  }

  static convertPointsDisplayPad(value = 0, pad = 2) {
    return value.toString().padStart(pad, '0');
  }
}

class IntegerHelper {
  static findBigger() {
    let bigger = arguments[0];
    for (let i = 1; i < arguments.length; i++) {
        if (arguments[i] > bigger) {
          bigger = arguments[i];
        }
    }
    return bigger;
  }
}

class ObjectHelper {
  static copyObject(obj) {
    const copiedObj = Object.create(Object.getPrototypeOf(obj));
    const descriptors = Object.getOwnPropertyDescriptors(obj);
    Object.defineProperties(copiedObj, descriptors);
    return copiedObj;
  }

  static parseReference(params, reference) {
    let obj = {};
    Object.keys(params).forEach((key, index) => {
      if (reference) return obj[reference[index]] = params[key];
      obj[index] = params[key];
    });
    return obj;
  }
}


class CardGenerator {
  static generateCards(amount = 1) {
    const cards = [];
    for (let i = 0; i < amount; i++) {
      cards.push(CardGenerator.generateCard());
    }
    return cards;
  }

  static generateCard(type) {
    return {
      type: type ? type : (Math.floor(Math.random() * 3) + 1),
      color: Math.floor(Math.random() * 6) + 1,
      figureName: 'default',
      attack: Math.floor(Math.random() * 99) + 1,
      health: Math.floor(Math.random() * 99) + 1
    };
  }
}

class HashGenerator {
  static uuidv4() {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
      const r = (Math.random() * 16) | 0,
          v = c === 'x' ? r : (r & 0x3) | 0x8;
      return v.toString(16);
    });
  }
}
class WindowStoppedState {
  _window;

  constructor(window) {
    this._window = window;
  }

  updateStatus() {
    // nothing
  }
}
class WindowUpdatedState {
  _window;
  _values = {};
  _interval = 0;
  _counter = 0;

  constructor(window, updates) {
    this._window = window;
    this.restore();
    this.processUpdates(updates);
    this.calculateInterval(updates);
  }

  restore() {
    const that = this._window;
    const values = that._values;
    for (const name in values) {
      const value = values[name];
      this.setUpdateValue(name, value);
    }
  }

  processUpdates(updates) {
    updates.forEach(update => {
      const { name, value } = update;
      this.setUpdateValue(name, value);
    });
  }

  setUpdateValue(name, value) {
    this._values[name] = value;
  }

  calculateInterval(updates) {
    const that = this._window;
    const values = updates.map(update => {
      const { name, value: newValue } = update;
      const currentValue = that.getValue(name);
      return Math.abs(currentValue - newValue);
    });
    const highValue = IntegerHelper.findBigger(...values);
    const fps = 30;
    this._interval = Math.floor(fps / (highValue || 1)) || 1;
  }

  updateStatus() {
    const that = this._window;
    const values = this._values;
    if (this._counter) return this._counter--;
    if (this.isToUpdate()) {
      for (const name in values) {
        const currentValue = that.getValue(name);
        const updateValue = values[name];
        if (this.isToUpdateValue(currentValue, updateValue)) {
          const value = this.getUpdateValue(currentValue, updateValue);
          that.setValue(name, value); 
        }
      }
      that.refresh();
      this._counter = this._interval;
    } else {
      that.stop();
    }
  }

  getUpdateValue(currentValue, updateValue) {
    return currentValue > updateValue ? currentValue - 1 : currentValue + 1;
  }

  isToUpdate() {
    const that = this._window;
    const values = this._values;
    return Object.keys(values).some(name => {
      const currentValue = that.getValue(name);
      const updateValue = values[name];
      return this.isToUpdateValue(currentValue, updateValue);
    });
  }

  isToUpdateValue(currentValue, updateValue) {
    return currentValue !== updateValue;
  }
}

class CardBattleWindowBase extends Window_Base {
  initialize(rect) {
    super.initialize(rect);
    this._iconset = "IconSet";
    this._status = {};
    this._windowColor = GameConst.BLUE_COLOR;
    this.closed();
    this.stop();
  }

  closed() {
    this._openness = 0;
  }

  stop() {
    this.changeStatus(WindowStoppedState);
  }

  changeStatus(status, ...params) {
    this._status = new status(this, ...params);
  }

  reset() {
    this.refresh();
  }

  refresh() {
    this.contents.clear();
  }

  static create(x, y, width, height) {
    return new CardBattleWindowBase(new Rectangle(x, y, width, height));
  }

  static createWindowMiddleSize(x, y) {
    const width = Graphics.boxWidth / 2;
    const height = CardBattleWindowBase.minHeight();
    return CardBattleWindowBase.create(x, y, width, height);
  }

  static minHeight() {
    return 60;
  }

  static createWindowFullSize(x, y) {
    const width = Graphics.boxWidth;
    const height = CardBattleWindowBase.minHeight();
    return CardBattleWindowBase.create(x, y, width, height);
  }

  update() {
    super.update();
    if (this.isOpen() && this.getStatus()) this._status.updateStatus();
    this.updateTone();
  }

  getStatus() {
    return this._status;
  }

  updateTone() {
    switch (this._windowColor) {
      case GameConst.BLUE_COLOR:
        this.setTone(0, 0, 255);
        break;
      case GameConst.RED_COLOR:
        this.setTone(255, 0, 0);
        break;
      default:
        this.setTone(0, 0, 0);
    }
  }

  drawIcon(iconIndex, x, y) {
    const bitmap = ImageManager.loadSystem(this._iconset);
    const pw = ImageManager.iconWidth;
    const ph = ImageManager.iconHeight;
    const sx = (iconIndex % 16) * pw;
    const sy = Math.floor(iconIndex / 16) * ph;
    this.contents.blt(bitmap, sx, sy, pw, ph, x, y);
  };

  setBlueColor() {
    this._windowColor = GameConst.BLUE_COLOR;
  }

  setRedColor() {
    this._windowColor = GameConst.RED_COLOR;
  }

  setDefaultColor() {
    this._windowColor = GameConst.DEFAULT;
  }

  isBlueColor() {
    return this._windowColor === GameConst.BLUE_COLOR;
  }

  isRedColor() {
    return this._windowColor === GameConst.RED_COLOR;
  }

  isDefaultColor() {
    return this._windowColor === GameConst.DEFAULT;
  }

  setCenteredAlignment() {
    this.setVerticalAlign(GameConst.MIDDLE);
    this.setHorizontalAlign(GameConst.CENTER);
  }

  setVerticalAlign(position) {
    this.y = CardBattleWindowBase.getVerticalAlign(position, this);
  }

  setHorizontalAlign(position) {
    this.x = CardBattleWindowBase.getHorizontalAlign(position, this);
  }

  static getVerticalAlign(position, window) {
    switch (position) {
      case GameConst.MIDDLE:
        return (Graphics.boxHeight / 2) - ((window.height || 0) / 2);
        break;
      case GameConst.BOTTOM:
        return Graphics.boxHeight - (window.height || 0);
        break;
      default: //TOP
        return 0;
    }
  }

  static getHorizontalAlign(position, window) {
    switch (position) {
      case GameConst.CENTER:
        return (Graphics.boxWidth / 2) - ((window.width || 0) / 2);
        break;
      case GameConst.END:
        return (Graphics.boxWidth - (window.width || 0));
        break;
      default: //START
        return 0;
    }
  }

  isFullsize() {
    return this.width === Graphics.boxWidth;
  }

  isMiddleSize() {
    return this.width === Graphics.boxWidth / 2;
  }

  isCenterAligned() {
    return this.x === (Graphics.boxWidth / 2) - (this.width / 2) && 
      this.y === (Graphics.boxHeight / 2) - (this.height / 2);
  }

  itemHeightByIndex(index) {
    return this.itemHeight() * index;
  }

  isAvailable() {
    return !this.isBusy();
  }

  isBusy() {
    return this.isOpening() || this.isClosing() || this.isUpdating();
  }

  isUpdating() {
    return this.getStatus() instanceof WindowUpdatedState;
  }
}
class ValuesWindow extends CardBattleWindowBase {
  initialize(rect) {
    super.initialize(rect);
    this._values = {};
    this._updates = [];
  }

  static createValueUpdate(name, value) {
    return { name, value };
  }

  update() {
    super.update();
    if (this.hasUpdates() && this.isStopped()) this.executeUpdate();
  }

  hasUpdates() {
    return this._updates.length > 0;
  }

  isStopped() {
    return this.getStatus() instanceof WindowStoppedState;
  }

  executeUpdate() {
    const updates = this._updates;
    if (updates.length > 0) {
      const update = updates[0];
      const executed = update.execute();
      if (executed) updates.shift();
    }
  }

  updateValues(updates) {
    updates = Array.isArray(updates) ? updates : [updates];
    this.addUpdate(this.commandUpdateValues, updates);
  }

  addUpdate(fn, ...params) {
    const update = this.createUpdate(fn, ...params);
    this._updates.push(update);
  }

  commandUpdateValues(updates) {
    if (!(this.isOpen() && this.isStopped())) return;
    this.changeStatus(WindowUpdatedState, updates);
    return true;
  }

  createUpdate(fn, ...params) {
    const action = {
      fn: fn.name || 'anonymous',
      execute: () => fn.call(this, ...params)
    };
    return action;
  }

  addValue(name, value) {
    if (this._values.hasOwnProperty(name)) {
      return this.setValue(name, value);
    }
    Object.defineProperty(this._values, name, {
        value: value,
        writable: true,
        enumerable: true,
        configurable: true
    });
  }

  setValue(name, value) {
    this._values[name] = value;
  }

  getValueAndConvertToDisplay(name) {
    const points = this.getValue(name) || 0;
    return StringHelper.convertPointsDisplay(points);
  }

  getValue(name) {
    return this._values[name];
  }

  getValueAndConvertToDisplayPad(name) {
    const pad = 2;
    const points = this.getValue(name) || 0;
    return StringHelper.convertPointsDisplayPad(points, pad);
  }
}
class TextWindow extends CardBattleWindowBase {
  initialize(rect) {
    super.initialize(rect);
    this.resetContent();
  }

  resetContent() {
    this._contents = [];
    this._history = [];
    this._textColorIndex = GameColorIndexs.NORMAL_COLOR;
    this.setHorizontalAlignContent(GameConst.TEXT_START);
    this.setDefaultColor(GameConst.DEFAULT);
  }

  reset() {
    super.reset();
    this.resetContent();
  }

  setHorizontalAlignContent(align) {
    this._textHorizontalAlign = align;
  }

  static create(x, y, width, height) {
    return new TextWindow(new Rectangle(x, y, width, height));
  }

  static createWindowMiddleSize(x, y) {
    const width = Graphics.boxWidth / 2;
    const height = CardBattleWindowBase.minHeight();
    return TextWindow.create(x, y, width, height);
  }

  static createWindowFullSize(x, y) {
    const width = Graphics.boxWidth;
    const height = CardBattleWindowBase.minHeight();
    return TextWindow.create(x, y, width, height);
  }

  static appendChangeColor(colorIndex = GameColorIndexs.NORMAL_COLOR) {
    return `\\c[${colorIndex}]`;
  }

  changeTextColorHere(colorIndex) {
    this.addContent({ 
      type: GameConst.CHANGE_COLOR, 
      colorIndex 
    });
  }

  addContent(data = {}) {
    const { type, text, colorIndex } = data;
    this._contents.push({ type, text, colorIndex });
  }

  addText(text = '') {
    this.addContent({ 
      type: GameConst.LINE_TEXT, 
      text 
    });
  }

  renderContents() {
    this.clearContentRendered();
    const contents = this.getContents();
    if (contents.length) this.processContents(contents);
  }

  clearContentRendered() {
    this.contents.clear();
  }

  getContents() {
    return this._contents;
  }

  processContents(contents) {
    const contentsProsseced = this.processLines(contents);
    const maxWidth = this.getMaxWidthContentsProcessed(contentsProsseced);
    this.resize(maxWidth);
    this.drawContents(contentsProsseced, maxWidth);
  }

  processLines(contents) {
    const linesProcessed = [];
    contents.forEach((content, index) => {
      const text = this.processLine(content, index);
      if (text) linesProcessed.push(text);
    });
    return linesProcessed;
  }

  processLine(content, index) {
    const { type, text, colorIndex } = content;
    switch (type) {
      case GameConst.CHANGE_COLOR:
        this._textColorIndex = colorIndex;
        return;
      default:
        return this.addTextLine(text, index);
    }
  }

  addTextLine(text = '', index) {
    const color = TextWindow.appendChangeColor(this._textColorIndex);
    text = `${color}${text}`;
    return text;
  }

  getMaxWidthContentsProcessed(contents) {
    return contents.reduce((max, content) => {
      const width = this.getTextWidth(content);
      return Math.max(max, width);
    }, 0);
  }

  getTextWidth(text) {
    const textState = this.createTextState(text, 0, 0, 0);
    textState.drawing = false;
    this.processAllText(textState);
    return textState.outputWidth;
  }

  resize(maxWidth) {
    this.resizeContent(maxWidth);
    this.resizeWindow(maxWidth);
  }

  resizeContent(maxWidth) {
    const contentWidth = Math.max(maxWidth, this.width);
    this.contents.resize(contentWidth, this.calculeTextHeight());
  }

  calculeTextHeight() {
    return Math.max(this.fittingHeight(this.numLines()), this.height);
  }

  numLines() {
    return this.getLines().length;
  }

  getLines() {
    return this.getContents().filter(content => content.type == GameConst.LINE_TEXT);
  }

  resizeWindow(maxWidth) {
    const windowPadding = this.padding + this.itemPadding();
    let width = Math.ceil(maxWidth) + windowPadding + 6;
    let windowWidth = Math.max(width, this.width);
    windowWidth = Math.min(windowWidth, Graphics.boxWidth);
    this.move(this.x, this.y, windowWidth, this.calculeTextHeight());
  }

  drawContents(contentsProsseced, maxWidth) {
    contentsProsseced.forEach((content, index) => {
      const x = this.getXAlign(content, this.getAlignContent(), maxWidth);
      const y = this.itemHeightByIndex(index);
      const width = this.getTextWidth(content);
      this._history.push({ content, x, y, width });
      super.drawTextEx(content, x, y, width);
    });
  }

  getXAlign(content, align, maxWidth) {
    const textWidth = this.getTextWidth(content);
    const x = this.getTextXByAlign(textWidth, maxWidth, align);
    return x;
  }

  getTextXByAlign(textWidth, maxWidth, align) {
    maxWidth = Math.max(maxWidth, this.width - this.padding * 2);
    switch (align) {
      case GameConst.CENTER:
        return (maxWidth / 2) - (textWidth / 2);
      case GameConst.END:
        return maxWidth - textWidth;
      default:
        return 0;
    }
  }

  getAlignContent() {
    return this._textHorizontalAlign;
  }

  isWasTextDrawnPositions(x, y) {
    return this._history.some(history => {
      return history.x === x && history.y === y;
    });
  }

  getHistory() {
    return this._history.clone();
  }
}
class BoardWindow extends ValuesWindow {
  initialize(rect) {
    super.initialize(rect);
    this.resetPoints();
  }

  resetPoints() {
    this.addValue(GameConst.RED_POINTS, 0);
    this.addValue(GameConst.BLUE_POINTS, 0);
    this.addValue(GameConst.GREEN_POINTS, 0);
    this.addValue(GameConst.BLACK_POINTS, 0);
    this.addValue(GameConst.WHITE_POINTS, 0);
    this.addValue(GameConst.NUM_CARDS_IN_DECK, 0);
    this.addValue(GameConst.NUM_CARDS_IN_HAND, 0);
  }

  reset() {
    super.reset();
    this.resetPoints();
  }

  static create(x, y, width, height) {
    return new BoardWindow(new Rectangle(x, y, width, height));
  }

  static createWindowMiddleSize(x, y) {
    const width = Graphics.boxWidth / 2;
    const height = CardBattleWindowBase.minHeight();
    return BoardWindow.create(x, y, width, height);
  }

  static createWindowFullSize(x, y) {
    const width = Graphics.boxWidth;
    const height = CardBattleWindowBase.minHeight();
    return BoardWindow.create(x, y, width, height);
  }

  static createValueUpdate(name, value) {
    return ValuesWindow.createValueUpdate(name, value);
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
class BattlePointsWindow extends ValuesWindow {
  initialize(rect) {
    super.initialize(rect);
    this.resetPoints();
  }

  resetPoints() {
    this.addValue(GameConst.ATTACK_POINTS, 0);
    this.addValue(GameConst.HEALTH_POINTS, 0);
  }

  reset() {
    super.reset();
    this.resetPoints();
  }

  static create(x, y) {
    const width = Graphics.boxWidth / 4;
    const height = CardBattleWindowBase.minHeight();
    return new BattlePointsWindow(new Rectangle(x, y, width, height));
  }

  static createValueUpdate(name, value) {
    return ValuesWindow.createValueUpdate(name, value);
  }

  refresh() {
    super.refresh();
    this.drawPoints();
  }

  drawPoints() {
    const attack = this.getValueAndConvertToDisplay(GameConst.ATTACK_POINTS);
    const health = this.getValueAndConvertToDisplay(GameConst.HEALTH_POINTS);
    const points = `AP ${attack} HP ${health}`;
    this.contents.drawText(
      points, 
      0, 
      0, 
      this.contents.width, 
      this.contents.height,
      'center'
    );
  }
}
class TrashWindow extends ValuesWindow {
  initialize(rect) {
    super.initialize(rect);
    this.resetPoints();
  }

  resetPoints() {
    this.addValue(GameConst.NUM_CARDS_IN_TRASH, 0);
    this.startIcon();
  }

  reset() {
    super.reset();
    this.resetPoints();
  }

  startIcon() {
    this._startIcon = true;
  }

  startValues() {
    this._startIcon = false;
  }

  static create(x, y) {
    const width = (Graphics.boxWidth / 4) / 2;
    const height = CardBattleWindowBase.minHeight() * 2;
    return new TrashWindow(new Rectangle(x, y, width, height));
  }

  static createValueUpdate(name, value) {
    return ValuesWindow.createValueUpdate(name, value);
  }

  refresh() {
    super.refresh();
    this.drawIcons();
    this.drawPoints();
  }

  drawIcons() {
    const x = (this.contents.width / 2) - (ImageManager.iconWidth / 2);
    const y = this.getYItemHeight(this._startIcon ? 0 : 1) + this.getMiddleIconHeight();
    this.drawIcon(IconSetConst.TRASH, x, y);
  }

  getYItemHeight(number) {
    return this.itemHeight() * number;
  }

  getMiddleIconHeight() {
    return ImageManager.iconHeight / 2;
  }

  drawPoints() {
    const numCards = this.getValueAndConvertToDisplayPad(GameConst.NUM_CARDS_IN_TRASH);
    this.contents.drawText(
      numCards, 
      0, 
      this.getYItemHeight(this._startIcon ? 1 : 0) - this.getMiddleIconHeight(), 
      this.contents.width, 
      this.contents.height,
      'center'
    );
  }
}
class WindowUpdatedScoreState {
  _window;
  _lastScore = 0;
  _score = 0;
  _toggleFps = 6;
  _interval = 0;
  _counter = 60;
  _blink = false;

  constructor(window, lastScore, score) {
    this._window = window;
    this.restore(lastScore);
    this.newScore(score);
  }

  restore(score) {
    this._lastScore = score;
  }

  newScore(score) {
    this._score = score;
  }

  updateStatus() {
    const that = this._window;
    this.updateBlinkEffect();
    if (this._counter) return this._counter--;
    that.refresh(this._score);
    that.stop();
  }

  updateBlinkEffect() {
    const that = this._window;
    if (!this._blink && this._interval <= this._toggleFps) {
      this._interval++;
      if (this._interval >= this._toggleFps) {
        this._blink = true;
        that.refresh(this._lastScore);
      }
    }
    if (this._blink && this._interval >= 0) {
      this._interval--;
      if (this._interval <= 0) {
        this._blink = false;
        that.refresh(this._score);
      }
    }
  }
}

class ScoreWindow extends CardBattleWindowBase { 
  initialize(rect) {
    super.initialize(rect);
    this.reset();
  }

  reset() {
    this._score = 0;
    this.refresh(this._score);
  }

  refresh(score = 0) {
    super.refresh();
    this.drawScore(score);
  }

  drawScore(score) {
    const padding = 4;
    const centerX = (this.contents.width / 2) - ((ImageManager.iconWidth * 2) / 2);
    for (let index = 0; index < 2; index++) {
      const x = centerX + (ImageManager.iconWidth + padding) * index;
      const icone = index <= (score - 1) ? IconSetConst.RUBY : IconSetConst.SAPPHIRE;
      this.drawIcon(icone, x, 0);
    }
  }

  static create(x, y) {
    const width = Graphics.boxWidth / 4;
    const height = CardBattleWindowBase.minHeight();
    return new ScoreWindow(new Rectangle(x, y, width, height));
  }

  isUpdating() {
    return this.getStatus() instanceof WindowUpdatedScoreState;
  }

  changeScore(score) {
    const lastScore = this._score;
    this._score = score;
    this.changeStatus(WindowUpdatedScoreState, lastScore, score);
  }
}
class ChooseFolderWindow extends Window_Command {
  initialize() {
    super.initialize();
    this.closed();
  }
  
  closed() {
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
    this._status = {};
    this._actions = [];
    this._delayActions = [];
    this._positiveIntensityEffect = false;
    this._intensityEffect = 255;
    this._opacityEffect = 255;
  }

  addAction(fn, ...params) {
    const action = this.createAction({ fn, delay: 0 }, ...params);
    this.addActions(action);
  }

  addDelayAction(fn, delay, ...params) {
    const action = this.createAction({ fn, delay }, ...params);
    this.addActions(action);
  }

  createAction(props, ...params) {
    const { fn, delay } = props;
    const action = { 
      fn: fn.name || 'anonymous',
      delay: delay || 0,
      execute: () => fn.call(this, ...params)
    };
    return action;
  }

  addActions(actions) {
    actions = this.toArray(actions);
    this._actions.push(actions);
  }

  toArray(items = []) {
    return (Array.isArray(items) === false) ? [items] : items;
  }

  executeAction() {
    const actions = this._actions[0];
    if (actions.length > 0) {
      for (const action of actions) {
        if (action.delay > 0) {
          this._delayActions.push(action);
          continue;
        }
        const executed = action.execute();
        if (executed) {
          this._actions.shift();
          continue;
        }
        break;
      }
    }
  }

  changeStatus(status, ...params) {
    this._status = new status(this, ...params);
  }

  getStatus() {
    return this._status;
  }

  update() {
    this.updateDelayActions();
    this.updateChildrenEffect();
    super.update();
  }

  updateDelayActions() {
    if (this.hasDelayActions()) {
      const action = this._delayActions[0];
      action.delay -= 1;
      if (action.delay <= 0) {
        action.execute();
        this._delayActions.shift();
      }
    }
  }

  updateChildrenEffect() {
    this.updateIntensityEffect();
    this.updateOpacityEffect();
  }

  updateIntensityEffect() {
    if (this._intensityEffect <= 255 && !this._positiveIntensityEffect) {
      this._intensityEffect += 6;
      if (this._intensityEffect >= 255) {
        this._positiveIntensityEffect = true;
      }
    }
    if (this._intensityEffect >= 100 && this._positiveIntensityEffect) {
      this._intensityEffect -= 6;
      if (this._intensityEffect <= 100) {
        this._positiveIntensityEffect = false;
      }
    }
  }

  updateOpacityEffect() {
    this._opacityEffect -= 32;
    if (this._opacityEffect <= 0) {
      this._opacityEffect = 255;
    }
  }

  updateStatus() {
    if (this._status) this._status.updateStatus();
  }

  isAvailable() {
    return !this.isBusy();
  }

  isBusy() {
    return this._delayActions.some(action => action.delay > 0);
  }

  hasDelayActions() {
    return this._delayActions.length > 0;
  }

  hasActions() {
    return this._actions.length > 0;
  }

  hasChildren() {
    return this.numberOfChildren() > 0;
  }

  numberOfChildren() {
    return this.children.length;
  }

  show() {
    this.addAction(this.commandShow);
  }

  commandShow() {
    this.visible = true;
    return true;
  }

  hide() {
    this.addAction(this.commandHide);
  }

  commandHide() {
    this.visible = false;
    return true;
  }

  isHidden() {
    return !this.isVisible();
  }

  isVisible() {
    return this.visible;
  }

  calculateTimeInterval(origin = 0, destiny = 0, duration = 0) {
    const distance = Math.abs(origin - destiny);
    const time = Math.abs(duration * 60);
    return (distance / (time || 1)) || (Graphics.width / 30);
  }

  indexOfSprite(sprite) {
    for (let i = 0; i < this.numberOfChildren(); i++) {
      if (this.compareObjects(this.children[i], sprite)) {
        return i;
      }
    }
    return -1;
  }
  
  compareObjects(object1, object2) {
    const keys1 = Object.keys(object1);
    const keys2 = Object.keys(object2);
    if (keys1.length !== keys2.length) {
      return false;
    }
    for (let key of keys1) {
      if (object1[key] !== object2[key]) {
        return false;
      }
    }
    return true;
  }

  clear() {
    while (this.numberOfChildren()) {
      this.children.forEach(async child => {
        await this.removeChild(child);
      });
    }
  }

  generateQuakeMoves(times = 1, distance = 2) {
    const directions = ['TOP', 'BOTTOM', 'LEFT', 'RIGHT'];
    const moves = [];
    let direction = '';
    for (let index = 0; index < (times * 3); index++) {
      const dirs = directions.filter(dir => dir !== direction);
      direction = dirs[Math.randomInt(3)];
      switch (direction) {
        case 'TOP':
          moves.push({x: 0, y: -distance}, {x: 0, y: 0});
          break;
        case 'BOTTOM':
          moves.push({x: 0, y: distance}, {x: 0, y: 0});
          break;
        case 'LEFT':
          moves.push({x: -distance, y: 0}, {x: 0, y: 0});
          break;
        case 'RIGHT':
          moves.push({x: distance, y: 0}, {x: 0, y: 0});
          break;
      }
    }
    return moves;
  }
}
class CardSpriteStoppedState {
  _card;
  
  constructor(sprite) {
    this._card = sprite;
  }

  updateStatus() {
    // nothing
  }
}
class CardSpriteMovingState {
  _card;
  _moves;
  _x;
  _y;
  _xInterval;
  _yInterval;
  
  constructor(sprite, moves) {
    this._card = sprite;
    this._moves = moves;
    this._x = this._card.x;
    this._y = this._card.y;
  }

  updateStatus() {
    const that = this._card;
    if (this.hasMoves() && this.isStopped()) this.startMove();
    if (this.isToMove()) {
      this.updateXPosition();
      this.updateYPosition();
    } else {
      that.stop();
    }
  }

  hasMoves() {
    return this._moves.length > 0;
  }

  isStopped() {
    return !this.isToMove();
  }

  startMove() {
    const move = this._moves[0];
    if (move) {
      let { destinyXPosition, destinyYPosition, originXPosition, originYPosition, duration } = move;
      originXPosition = originXPosition || this._card.x;
      originYPosition = originYPosition || this._card.y;
      duration = duration >= 0 ? duration : this._card._duration;
      this._x = destinyXPosition;
      this._y = destinyYPosition;
      this._xInterval = this._card.calculateTimeInterval(originXPosition, destinyXPosition, duration);
      this._yInterval = this._card.calculateTimeInterval(originYPosition, destinyYPosition, duration);
      this._moves.shift();
    }
  }

  isToMove() {  
    const that = this._card;
    return this._x !== that.x || this._y !== that.y;
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
  _y;
  _isUpdateHorizontally;
  _isUpdateVertically;
  _isToOpenHorizontally;
  _isToOpenVertically;
  _interval;
  
  constructor(sprite, xPosition, yPosition) {
    this._card = sprite;
    const that = this._card;
    this._x = xPosition;
    this._y = yPosition;
    this._isUpdateHorizontally = this._x !== that.x;
    this._isUpdateVertically = this._y !== that.y;
    this._isToOpenHorizontally = this._x < that.x;
    this._isToOpenVertically = this._y < that.y;
    this._interval = that.calculateTimeInterval(0, that.contentOriginalWidth(), that._duration);
  }

  updateStatus() {
    const that = this._card;
    if (this.isUpdatingPosition() || this.isUpdatingOpening()) {
      this.updatePosition();
      this.updateOpening();
      that.refresh();
      return;
    }
    if (that.isOpened()) that.opened();
    if (that.isClosed()) that.closed();
  }

  isUpdatingPosition() {
    return this._x !== this._card.x || this._y !== this._card.y;
  }

  updatePosition() {
    this.updatePositionHorizontally();
    this.updatePositionVertically();
  }

  updatePositionHorizontally() {
    const that = this._card;
    if (this._isUpdateHorizontally) {
      if (this.isToOpenHorizontally()) {
        that.x = that.x - this._interval;
        if (that.x < this._x) that.x = this._x;
      }
      if (this.isToCloseHorizontally()) {
        that.x = that.x + this._interval;
        if (that.x > this._x) that.x = this._x;
      }
    }
  }

  isToOpenHorizontally() {
    return this._isToOpenHorizontally;
  }

  isToCloseHorizontally() {
    return !this.isToOpenHorizontally();
  }

  updatePositionVertically() {
    const that = this._card;
    if (this._isUpdateVertically) {
      if (this.isToOpenVertically()) {
        that.y = that.y - this._interval;
        if (that.y < this._y) that.y = this._y;
      }
      if (this.isToCloseVertically()) {
        that.y = that.y + this._interval;
        if (that.y > this._y) that.y = this._y;
      }
    }
  }

  isToOpenVertically() {
    return this._isToOpenVertically;
  }

  isToCloseVertically() {
    return !this.isToOpenVertically();
  }

  isUpdatingOpening() {
    const that = this._card;
    const width = that.width < that.contentOriginalWidth() && that.width > 0;
    const height = that.height < that.contentOriginalHeight() && that.height > 0;
    return width || height; 
  }

  updateOpening() {
    this.updateOpeningHorizontally();
    this.updateOpeningVertically();
  }

  updateOpeningHorizontally() {
    const that = this._card;
    if (this._isUpdateHorizontally) {
      if (this.isToOpenHorizontally()) {
        that.width += (this._interval * 2);
        if (that.width > that.contentOriginalWidth()) that.width = that.contentOriginalWidth();
      }
      if (this.isToCloseHorizontally()) {
        that.width -= (this._interval * 2);
        if (that.width < 0) that.width = 0;
      }
    }
  }

  updateOpeningVertically() {
    const that = this._card;
    if (this._isUpdateVertically) {
      if (this.isToOpenVertically()) {
        that.height += (this._interval * 2);
        if (that.height > that.contentOriginalHeight()) that.height = that.contentOriginalHeight();
      }
      if (this.isToCloseVertically()) {
        that.height -= (this._interval * 2);
        if (that.height < 0) that.height = 0;
      }
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

  updateStatus() {
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
  // initMembers() {
  //   super.initMembers();
  // }

  // setup(targets, animation, mirror, delay) {
  //   super.setup(targets, animation, mirror, delay);
  // }

  update() {
    super.update();
    if (!this.isPlaying()) this.destroy();
  }
}



class CardSpriteAnimatedBehavior {
  _card;
  _parent;
  _animation;
  _animationSprite;
  _times;
  
  constructor(sprite, animation, times, anchorParent) {
    this._card = sprite;
    this._parent = anchorParent || sprite.parent;
    this._animation = animation;
    this._times = times;
  }

  updateBehavior() {
    const that = this._card;
    if (this.hasTimes() || this.isPlayingAnimation()) {
      if (this.noHasAnimationSprite()) {
        this._animationSprite = new CardAnimationSprite();
        this._animationSprite.setup([that], this._animation);
        this._parent.addChild(this._animationSprite);
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
    layer.bitmap.fillAll('Coral');
    layer.bitmap.clearRect(4, 4, that.width - 8, that.height - 8);
  }

  updateBehavior() {
    const that = this._card;
    const parent = that.parent;
    const layer = that._selectedLayer;
    const opacity = parent?._opacityEffect || that._opacityEffect;
    layer.opacity = opacity;
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
    layer.bitmap.fillAll('CornflowerBlue');
    layer.bitmap.clearRect(4, 4, that.width - 8, that.height - 8);
  }

  updateBehavior() {
    const that = this._card;
    const parent = that.parent;
    const layer = that._hoveredLayer;
    const opacity = parent?._opacityEffect || that._opacityEffect;
    layer.opacity = opacity;
  }
}
class CardSpriteUpdatedBehavior {
  _card;
  _attack;
  _health;
  _interval = 0;
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
class CardSpriteIluminatedBehavior {
  _card;
  
  constructor(sprite) {
    this._card = sprite;
    this.fillLayer();
  }

  fillLayer() {
    const that = this._card;
    const layer = this._card._selectedLayer;
    layer.bitmap.clear();
    layer.bitmap.fillAll('White');
    layer.bitmap.clearRect(4, 4, that.width - 8, that.height - 8);
  }

  updateBehavior() {
    const that = this._card;
    const parent = that.parent;
    const layer = that._selectedLayer;
    const opacity = parent?._intensityEffect || that._intensityEffect;
    layer.opacity = opacity;
  }
}

class CardSprite extends ActionSprite {
  initialize() {
    super.initialize();
    this._type = 0;
    this._color = 0;
    this._figure = {};
    this._backImage = {};
    this._behaviors = [];
    this._turned = false;
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
    this.commandHide();
    this.setToUp();
    this.setSize();
    this.createLayers();
    this.stop();
  }

  setToUp() {
    this._turned = true;
  }

  setToDown() {
    this._turned = false;
  }

  setSize() {
    this.width = this.contentOriginalWidth();
    this.height = this.contentOriginalHeight();
  }

  contentOriginalWidth() {
    return 96;
  }

  contentOriginalHeight() {
    return 128;
  }

  createLayers() {
    this.createContentLayer();
    this.createSelectedLayer();
    this.createHoveredLayer();
  }

  createContentLayer() {
    this._contentLayer = new Sprite();
    this._contentLayer.bitmap = new Bitmap(this.contentOriginalWidth(), this.contentOriginalHeight());
    this.createDisableLayer();
    this.createFlashLayer();
    this.addChild(this._contentLayer);
  }

  createDisableLayer() {
    this._disabledLayer = new Sprite();
    this._disabledLayer.visible = false;
    this._disabledLayer.opacity = 128;
    this._disabledLayer.bitmap = new Bitmap(this.contentOriginalWidth(), this.contentOriginalHeight());
    this._disabledLayer.bitmap.fillAll('black');
    this._contentLayer.addChild(this._disabledLayer);
  }

  createFlashLayer() {
    this._flashedLayer = new Sprite();
    this._flashedLayer.bitmap = new Bitmap(this.contentOriginalWidth(), this.contentOriginalHeight());
    this._contentLayer.addChild(this._flashedLayer);
  }

  createHoveredLayer() {
    this._hoveredLayer = new Sprite();
    this._hoveredLayer.bitmap = new Bitmap(this.contentOriginalWidth(), this.contentOriginalHeight());
    this.addChild(this._hoveredLayer);
  }

  createSelectedLayer() {
    this._selectedLayer = new Sprite();
    this._selectedLayer.bitmap = new Bitmap(this.contentOriginalWidth(), this.contentOriginalHeight());
    this.addChild(this._selectedLayer);
  }

  enable() {
    this._disabled = false;
    this._disabledLayer.visible = false;
    this.refresh();
  }

  stop() {
    this.changeStatus(CardSpriteStoppedState);
  }

  update() {
    if (this.hasActions() && this.isStopped()) this.executeAction();
    if (this.isMoving() && this.isHidden()) this.commandShow();
    if (this.isVisible()) {
      this.updateStatus();
      this.updateBehaviors();
    }
    super.update();
  }

  isStopped() {
    return this.getStatus() instanceof CardSpriteStoppedState;
  }

  isMoving() {
    return this.getStatus() instanceof CardSpriteMovingState;
  }

  commandShow() {
    super.commandShow();
    if (this.isOpened()) this.refresh();
    return true;
  }

  refresh() {
    this.clearContent();
    this.drawCard();
    this.drawFilter();
  }

  drawCard() {
    if (this.isTurnedToUp()) {
      this.drawBackground();
      this.drawFigure();
      this.drawDisplay();
    } else {
      this.drawBack();
    }
  }

  drawFilter() {
    if (this.isDisabled()) {
      this._contentLayer.setColorTone([0, 0, 0, 255]);
    } else {
      this._contentLayer.setColorTone([0, 0, 0, 0]);
    }
  }

  clearContent() {
    this._contentLayer.bitmap.clear();
  }

  isTurnedToDown() {
    return !this._turned;
  }

  isTurnedToUp() {
    return this._turned;
  }

  drawBackground() {
    const xPosition = 0;
    const yPosition = 0;
    const borderColor = this.getBorderColor();
    this._contentLayer.bitmap.fillRect(xPosition, yPosition, this.width, this.height, borderColor);
    const color = this.getBackgroundColor();
    this._contentLayer.bitmap.fillRect(xPosition + 2, yPosition + 2, this.width - 4, this.height - 4, color);
  }

  getBorderColor() {
    switch (this._color) {
      case ColorTypes.RED:
        return HexColors.FADEDRED;
        break;
      case ColorTypes.GREEN:
        return HexColors.FADEDGREEN;
        break;
      case ColorTypes.BLUE:
        return HexColors.FADEDBLUE;
        break;
      case ColorTypes.WHITE:
        return HexColors.FADEDWHITE;
        break;
      case ColorTypes.BLACK:
        return HexColors.FADEDBLACK;
        break;
      default:
        return HexColors.FADEDBROWN;
        break;
    }
  }

  getBackgroundColor() {
    switch (this._color) {
      case ColorTypes.RED:
        return HexColors.RED;
        break;
      case ColorTypes.GREEN:
        return HexColors.GREEN;
        break;
      case ColorTypes.BLUE:
        return HexColors.BLUE;
        break;
      case ColorTypes.WHITE:
        return HexColors.WHITE;
        break;
      case ColorTypes.BLACK:
        return HexColors.BLACK;
        break;
      default:
        return HexColors.BROWN;
        break;
    }
  }

  drawFigure() {
    const contentX = 4;
    const contentY = 4;
    const contentWidth = this.contentOriginalWidth() - 8;
    const contentHeight = this.contentOriginalHeight() - 28;
    const openWidthPercent = Math.floor((this.width / this.contentOriginalWidth()) * 100);
    const openHeightPercent = Math.floor((this.height / this.contentOriginalHeight()) * 100);
    const openWidth = Math.floor((contentWidth * openWidthPercent) / 100);
    const openHeight = Math.floor((contentHeight * openHeightPercent) / 100);
    const figureX = 0;
    const figureY = 0;
    const figureWidth = openWidth ? this._figure.width : 0;
    const figureHeight = openHeight ? this._figure.height : 0;
    this._contentLayer.bitmap.blt(
      this._figure, 
      figureX, 
      figureY, 
      figureWidth, 
      figureHeight,
      contentX,
      contentY,
      openWidth,
      openHeight
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
    const attack = StringHelper.convertPointsDisplay(this._attackPoints);
    const health = StringHelper.convertPointsDisplay(this._healthPoints);
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

  isEnabled() {
    return !this.isDisabled();
  }

  isDisabled() {
    return this._disabled;
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
      color || HexColors.BROWN, 
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
    if (!(this.isStopped() && this.isClosed())) return;
    const xPositionOpening = this.x - (this.contentOriginalWidth() / 2);
    const yPositionOpening = this.y;
    this.visible = true;
    this.changeStatus(CardSpriteOpeningState, xPositionOpening, yPositionOpening);
    return true;
  }

  isClosed() {
    return this.width === 0;
  }

  opened() {
    this.setSize();
    this.stop();
  }

  close() {
    this.addAction(this.commandClose);
  }

  commandClose() {
    if (!(this.isVisible() && this.isStopped() && this.isOpened())) return;
    const xPositionClosing = this.x + (this.contentOriginalWidth() / 2);
    const yPositionOpening = this.y;
    this.changeStatus(CardSpriteOpeningState, xPositionClosing, yPositionOpening);
    return true;
  }

  isOpened() {
    return this.width === this.contentOriginalWidth();
  }

  closed() {
    this.width = 0;
    this.visible = false;
    this.stop();
  }

  static createMove(destinyXPosition, destinyYPosition, originXPosition, originYPosition, duration) {
    return { destinyXPosition, destinyYPosition, originXPosition, originYPosition, duration };
  }

  toMove(moves) {
    moves = this.toArray(moves);
    this.addAction(
      this.commandMoving,
      moves
    );
  }

  commandMoving(moves) {
    if (!(this.isVisible() && this.isStopped())) return;
    this.changeStatus( 
      CardSpriteMovingState,
      moves
    );
    return true;
  }

  hover() {
    this.addAction(this.commandHover);
  }

  commandHover() {
    if (!(this.isVisible() && this.isStopped())) return;
    this.addBehavior(CardSpriteHoveredBehavior);
    return true;
  }

  unhover() {
    this.addAction(this.commandUnhover);
  }

  commandUnhover() {
    this._hoveredLayer.bitmap.clear();
    this.removeBehavior(CardSpriteHoveredBehavior);
    return true;
  }

  select() {
    this.addAction(this.commandSelect);
  }

  commandSelect() {
    if (!(this.isVisible() && 
      (this.isStopped() || this.isOpening() || this.isMoving() || this.isZooming()))) return; 
    this.addBehavior(CardSpriteSelectedBehavior);
    return true;
  }

  isZooming() {
    return this.getStatus() instanceof CardSpriteZoomState;
  }

  isOpening() {
    return this.getStatus() instanceof CardSpriteOpeningState;
  }

  unselect() {
    this.addAction(this.commandUnselect);
  }

  commandUnselect() {
    this._selectedLayer.bitmap.clear();
    this.removeBehavior(CardSpriteSelectedBehavior);
    return true;
  }

  flash(color = 'white', duration = 60, times = 1) {
    this.addAction(this.commandFlash, color, duration, times);
  }

  commandFlash(color, duration, times) {
    if (!(this.isVisible() 
      && (this.isStopped() || this.isOpening() || this.isMoving() || this.isZooming()))) return;
    this.addBehavior(
      CardSpriteFlashedBehavior,
      color, 
      duration, 
      times
    );
    return true;
  }

  damage(times = 1, anchorParent = this.parent) {
    const animation = this.damageAnimation();
    this.addAction(this.commandAnimate, animation, times, anchorParent);
  }

  damageAnimation() {
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

  commandAnimate(animation, times, anchorParent) {
    if (this.isVisible() && (this.isStopped() || this.isOpening() || this.isMoving() || this.isZooming())) {
      this.addBehavior(
        CardSpriteAnimatedBehavior, 
        animation,
        times,
        anchorParent
      );
    }
    return true;
  }

  changeAttackPoints(attackPoints) {
    this.changePoints(attackPoints);
  }

  changeHealthPoints(healtPoints) {
    this.changePoints(this._attackPoints, healtPoints);
  }

  changePoints(attackPoints = this._attackPoints, healtPoints = this._healthPoints) {
    this.addAction(this.commandChangePoints, attackPoints, healtPoints);
  }

  commandChangePoints(attackPoints, healtPoints) {
    if (!(this.isVisible() && this.isStopped())) return;
    this.addBehavior(
      CardSpriteUpdatedBehavior, 
      attackPoints,
      healtPoints
    );
    return true;
  }

  disable() {
    this._disabled = true;
    this._disabledLayer.visible = true;
    this.refresh();
  }

  isBusy() {
    return this.hasActions() || this.isNotStopped() || this.isAnimated();
  }

  isNotStopped() {
    return !this.isStopped();
  }

  zoom() {
    this.addAction(this.commandZoom);
  }

  commandZoom() {
    if (!(this.isVisible() && this.isStopped() && this.isOpened() && this.isOriginalScale())) return;
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
    return true;
  }

  isOriginalScale() {
    return this.scale.x === 1 && this.scale.y === 1;
  }

  zoomOut() {
    this.addAction(this.commandZoomOut);
  }

  commandZoomOut() {
    if (!(this.isVisible() && this.isStopped() && this.isOpened() && this.isZoom())) return;
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
    return true;
  }

  isZoom() {
    return this.scale.x > 1 || this.scale.y > 1;
  }

  leave() {
    this.addAction(this.commandLeave);
  }

  commandLeave() {
    if (!(this.isVisible() && this.isStopped() && this.isOpened())) return;
    const xPositionClosing = this.x + (this.contentOriginalWidth() / 2);
    const yPositionClosing = this.y + (this.contentOriginalHeight() / 2);
    this.changeStatus(CardSpriteOpeningState, xPositionClosing, yPositionClosing);
    return true;
  }

  quake(times = 1, distance = 8, movements = null) {
    this.addAction(this.commandQuake, times, distance, movements);
  }

  commandQuake(times, distance, movements) {
    if (!this.isVisible() && this.isStopped() && this.isOpened()) return;
    const moves = movements || this.generateQuakeMoves(times, distance);
    const cardXPosition = this.x;
    const cardYPosition = this.y; 
    moves.forEach((move, index) => {
      const xMove = cardXPosition + move.x;
      const yMove = cardYPosition + move.y;
      const duration = 0;
      const directionMove = CardSprite.createMove(xMove, yMove, cardXPosition, cardYPosition, duration);
      this.toMove(directionMove);
    });
    return true;
  }

  isAnimated() {
    return this.isUpdating() || this.isAnimationPlaying() || this.isFlashPlaying();
  }

  isAnimationPlaying() {
    return this.getBehavior(CardSpriteAnimatedBehavior) instanceof CardSpriteAnimatedBehavior;
  }

  isFlashPlaying() {
    return this.getBehavior(CardSpriteFlashedBehavior) instanceof CardSpriteFlashedBehavior;
  }

  isUpdating() {
    return this.getBehavior(CardSpriteUpdatedBehavior) instanceof CardSpriteUpdatedBehavior;
  }
  
  isAnimationPlaying() {
    const behavior = this.getBehavior(CardSpriteAnimatedBehavior);
    if (behavior) return behavior.isPlayingAnimation();
    return false;
  }

  setPosition(xPosition, yPosition) {
    this.x = xPosition;
    this.y = yPosition;
  }

  startOpen(xPosition = this.x, yPosition = this.y) {
    this.x = xPosition;
    this.y = yPosition;
    if (this.width !== 0) return;
    this.opened();
  }

  startClosed(xPosition = this.x, yPosition = this.y) {
    this.x = xPosition;
    this.y = yPosition;
    if (this.width === 0) return;
    const cardWidthHalf = (this.contentOriginalWidth() / 2);
    this.x = this.x + cardWidthHalf;
    this.closed();
  }

  flipToUp() {
    this.addAction(this.commandClose);
    this.addAction(this.commandFlipToUp);
    this.addAction(this.commandOpen);
  }

  commandFlipToUp() {
    if (!(this.isHidden() && this.isStopped() && this.isClosed() && this.isTurnedToDown())) return;
    this.setToUp();
    this.refresh();
    return true;
  }

  flipToDown() {
    this.addAction(this.commandClose);
    this.addAction(this.commandFlipToDown);
    this.addAction(this.commandOpen);
  }

  commandFlipToDown() {
    if (!(this.isHidden() && this.isStopped() && this.isClosed() && this.isTurnedToUp())) return;
    this.setToDown();
    this.refresh();
    return true;
  }

  isHovered() {
    return this.getBehavior(CardSpriteHoveredBehavior) instanceof CardSpriteHoveredBehavior;
  }

  isSelected() {
    return this.getBehavior(CardSpriteSelectedBehavior) instanceof CardSpriteSelectedBehavior;
  }

  iluminate() {
    this.addAction(this.commandIluminate);
  }

  commandIluminate() {
    if (!(this.isVisible() && 
      (this.isStopped() || this.isOpening() || this.isMoving() || this.isZooming()))) return; 
    this.addBehavior(CardSpriteIluminatedBehavior);
    return true;
  }

  isIluminated() {
    return this.getBehavior(CardSpriteIluminatedBehavior) instanceof CardSpriteIluminatedBehavior;
  }

  static createPosition(x, y, index) {
    return { x, y, index };
  }

  isNormal() {
    return !this.isHovered() && !this.isSelected() && !this.isIluminated();
  }
}
class CardsetSpriteStaticModeState {
  _cardset;
  
  constructor(sprite) {
    this._cardset = sprite;
    this.unhouverSprites();
  }

  unhouverSprites() {
    const spritesHovered = this.getSpritesHovered();
    spritesHovered.forEach(({ sprite, index }) => {
      this.unhoverSprite(sprite);
      this._cardset.removeChild(sprite);
      this._cardset.addChildAt(sprite, index);
    });
  }

  getSpritesHovered() {
    const sprites = this._cardset._sprites.map((sprite, index) => {
      return { sprite, index };
    });
    return sprites.filter(({ sprite, index }) => sprite.isHovered());
  }

  unhoverSprite(sprite) {
    const destinyXPosition = sprite.x;
    const destinyYPosition = 0;
    const duration = 0.03;
    sprite.unhover();
    const move = CardSprite.createMove(destinyXPosition, destinyYPosition, sprite.x, sprite.y, duration);
    sprite.toMove(move);
  }

  updateStatus() {
    // nothing
  }
}
class CardsetSpriteSelectModeState {
  _cardset;
  _cursorIndex;
  
  constructor(sprite) {
    this._cardset = sprite;
    this._cursorIndex = 0;
    this.updateSpriteCards();
  }

  updateStatus() {
    const cardset = this._cardset;
    const keys = ['right', 'left'];
    if (cardset.isAvailable()) this.updateCursor();
    if (Input.isAnyKeyActiveIn(keys) && cardset.isAvailable()) this.updateSpriteCards();
    if (cardset.isAvailable() && cardset._enableSelected) {
      if (Input.isTriggered('ok')) this.selectSprite();
      if (Input.isTriggered('cancel') || this.selecteLimit()) cardset.unselectMode();
    }
  }

  selecteLimit() {
    const cardset = this._cardset;
    const allowedAmount = cardset._sprites.filter(sprite => sprite.isEnabled()).length;
    const selectedAmount = cardset._selectedIndexs.length;
    return selectedAmount === allowedAmount;
  }

  updateCursor() {
    if (Input.isRepeated('right') || Input.isLongPressed('right')) {
      this.moveCursorRight();
    } else if (Input.isRepeated('left') || Input.isLongPressed('left')) {
      this.moveCursorLeft();
    }
  }

  moveCursorRight(times = 1) {
    const sprites = this._cardset._sprites;
    const indexsAmount = sprites.length - 1;
    if (this._cursorIndex < indexsAmount) {
      const nextIndex = this._cursorIndex + times;
      this._cursorIndex = nextIndex > indexsAmount ? indexsAmount : nextIndex;
    } else {
      this._cursorIndex = 0;
    }
  }

  moveCursorLeft(times = 1) {
    const minIndex = 0;
    const sprites = this._cardset._sprites;
    const indexsAmount = sprites.length - 1;
    if (this._cursorIndex > minIndex) {
      const nextIndex = this._cursorIndex - times;
      this._cursorIndex = nextIndex < minIndex ? minIndex : nextIndex;
    } else {
      this._cursorIndex = indexsAmount;
    }
  }

  updateSpriteCards() {
    const cardset = this._cardset;
    const sprites = cardset._sprites;
    const indexsAmount = sprites.length - 1;
    sprites.forEach((sprite, index) => {
      if (index === this._cursorIndex) {
        this.hoverSprite(sprite);
        cardset.removeChild(sprite);
        cardset.addChildAt(sprite, indexsAmount);
      } else {
        this.unhoverSprite(sprite);
        cardset.removeChild(sprite);
        const fixLastCardindex = (index === indexsAmount ? indexsAmount - 1 : index);
        cardset.addChildAt(sprite, fixLastCardindex);
      }
    });
  }

  hoverSprite(sprite) {
    const destinyXPosition = sprite.x;
    const destinyYPosition = -10;
    const duration = 0.03;
    sprite.hover();
    const move = CardSprite.createMove(destinyXPosition, destinyYPosition, sprite.x, sprite.y, duration);
    sprite.toMove(move);
  }

  unhoverSprite(sprite) {
    const destinyXPosition = sprite.x;
    const destinyYPosition = 0;
    const duration = 0.03;
    sprite.unhover();
    const move = CardSprite.createMove(destinyXPosition, destinyYPosition, sprite.x, sprite.y, duration);
    sprite.toMove(move);
  }

  selectSprite() {
    const cardset = this._cardset;
    const sprites = cardset._sprites;
    const selectedSprite = sprites[this._cursorIndex];
    if (selectedSprite.isDisabled()) return;
    if (this.isSelectedSprite()) {
      selectedSprite.unselect();
      this.removeSelectedIndex(this._cursorIndex);
      return;
    }
    selectedSprite.select();
    this.addSelectedIndex(this._cursorIndex);
  }

  isSelectedSprite() {
    const cardset = this._cardset;
    return cardset._selectedIndexs.find(index => index === this._cursorIndex);
  }

  addSelectedIndex(index) {
    const cardset = this._cardset;
    cardset._selectedIndexs.push(index);
  }

  removeSelectedIndex(index) {
    const cardset = this._cardset;
    cardset._selectedIndexs = cardset._selectedIndexs.filter(selectedIndex => selectedIndex !== index);
  }
}

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
    if (this.hasActions() && this.isAvailable()) this.executeAction();
    if (this.numberOfChildren() && this.isHidden()) this.commandShow();
    if (this.isVisible()) {
      this.updateStatus();
    }
    super.update();
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

  animateCardsQuake(times = 1, distance = 2, sprites = this._sprites) {
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

// tests CARD
class SceneTest {
  scene;
  name;
  subject;
  tests = [];
  asserts = [];
  results = [];
  subjects = [];
  nextAsserts = {};
  assertsName = '';
  assertTitle = '';
  assertValue = undefined;
  childrenToAdd = [];
  WindowsToAdd = [];
  counter = 0;

  constructor(scene) {
    this.scene = scene;
  }

  create() {
    // Override this method in the child class
  }

  start() {
    // Override this method in the child class
  }

  run() {
    return new Promise(async res => {
      this.start();
      res(await this.finish());
    });
  }

  finish() {
    return new Promise(async res => {
      const total = this.totalSeconds();
      await this.timertoTrue((1000 * total) + 200);
      res({
        passed: this.results.every(result => result.passed),
        testName: this.name,
        assertsResult: this.results
      });
    });
  }

  async test(assertsName, act, asserts, seconds = 1) {
    const msgDefault = 'Nenhum titulo para asserts definido.';
    const actDefault = () => { 
      console.error('Nenhum act de asserts definido.');
    };
    const assertsDefault = () => { 
      this.asserts.push({
        passed: false,
        message: 'Nenhuma assert definida!'
      });
    };
    this.tests.push({
      seconds,
      act: () => {
        act ? act() : actDefault();
        return true;
      },
      asserts: () => {
        this.assertsName = assertsName;
        asserts ? asserts() : assertsDefault();
        return true;
      }
    });
  }

  totalSeconds() {
    return this.tests.reduce((acc, test) => acc + test.seconds, 0);
  }

  timertoTrue(milliseconds = 600, callback) {
    if (callback) callback();
    return new Promise(resolve => {
      setTimeout(() => {
        resolve(true)
      }, milliseconds)
    });
  }

  update() {
    this.copySubject();
    if (this.counter) return this.counter--;
    if (this.hasAsserts()) return this.startAsserts();
    if (this.hasTests()) this.startTest();
  }

  hasAsserts() {
    return typeof this.nextAsserts === 'function';
  }

  startAsserts() {
    const completed = this.nextAsserts();
    if (completed) {
      this.results.push({
        passed: this.asserts.every(assert => assert.passed),
        assertsName: this.assertsName,
        asserts: this.asserts
      });
      this.nextAsserts = null;
      this.asserts = [];
    }
  }

  hasTests() {
    return this.tests.length > 0;
  }

  startTest() {
    const fps = 60;
    const test = this.tests[0];
    const { seconds, act, asserts } = test;
    if (test) {
      this.counter = (fps * seconds);
      this.appendChildren();
      this.appendWindows();
      const completed = act();
      if (completed) {
        this.nextAsserts = asserts;
        this.tests.shift();
      }
    }
  }

  copySubject() {
    const subjectCopy = ObjectHelper.copyObject(this.subject);
    this.subjects.push(subjectCopy);
  }

  appendChildren() {
    this.childrenToAdd.forEach(child => {
      this.scene.addChild(child);
    });
    this.childrenToAdd = [];
  }

  appendWindows() {
    this.WindowsToAdd.forEach(window => {
      this.scene._windowLayer.addChild(window);
    });
    this.WindowsToAdd = [];
  }

  assertWasTrue(title, fnOrValue, ...params) {
    const result = this.subjects.some(subject => {
      if (typeof fnOrValue === 'function') {
        return subject[fnOrValue.name](...params);
      }
      return subject[fnOrValue];
    });
    
    this.assert(title, result);
    return this.toBe(true);
  }

  assertTrue(title, value) {
    this.assert(title, value);
    return this.toBe(true);
  }

  assert(title, value) {
    this.assertTitle = title;
    this.assertValue = value;
    return this;
  }

  toBe(value) {
    const assertResult = this.resultTest(this.assertValue === value, value);
    this.asserts.push(assertResult);
  }

  resultTest(test, value) {
    if (test === false) {
      return this.testFailed(value, this.assertValue);
    }
    const testSuccess = {
      passed: true,
      title: this.assertTitle,
      message: 'Test passed!'
    };
    return testSuccess;
  }

  testFailed(valueExpected, valueReceived) {
    return {
      passed: false,
      title: this.assertTitle,
      message: `Expected: ${valueExpected} Received: ${valueReceived}`
    };
  }

  toBeInstanceof(value) {
    const assertResult = this.resultTest(this.assertValue instanceof value, value);
    this.asserts.push(assertResult);
  }

  addChild(child) {
    this.childrenToAdd.push(child);
  }

  addWindow(window) {
    this.WindowsToAdd.push(window);
  }

}
class StartClosedAndStartOpenCardSpriteTest extends SceneTest {
  name = 'StartClosedAndStartOpenCardSpriteTest';

  create() {
    const card = CardGenerator.generateCard();
    this.subject = CardSprite.create(
      card.type,
      card.color,
      card.figureName,
      card.attack,
      card.health
    );
    this.addChild(this.subject);
  }

  start() {
    const centerXPosition = (Graphics.boxWidth / 2 - this.subject.width / 2);
    const centerYPosition = (Graphics.boxHeight / 2 - this.subject.height / 2);
    this.test('Deve apresentar o cartão fechado!', () => {
      this.subject.startClosed(centerXPosition, centerYPosition);
      this.subject.show();
    }, () => {
      this.assertTrue('Esta fechado?', this.subject.isClosed());
    });
    this.test('Deve apresentar o cartão aberto!', () => {
      this.subject.startOpen(centerXPosition, centerYPosition);
      this.subject.show();
    }, () => {
      this.assertTrue('Esta aberto?', this.subject.isOpened());
    });
  }
}
class CloseAndOpenCardSpriteTest extends SceneTest {
  name = 'CloseAndOpenCardSpriteTest';

  create() {
    const card = CardGenerator.generateCard();
    this.subject = CardSprite.create(
      card.type,
      card.color,
      card.figureName,
      card.attack,
      card.health
    );
    const centerXPosition = (Graphics.boxWidth / 2 - this.subject.width / 2);
    const centerYPosition = (Graphics.boxHeight / 2 - this.subject.height / 2);
    this.subject.startOpen(centerXPosition, centerYPosition);
    this.addChild(this.subject);
  }

  start() {
    this.subject.show();
    this.test('Deve fechar!', () => {
      this.subject.close();
    }, () => {
      this.assertTrue('Esta fechado?', this.subject.isClosed());
    });
    this.test('Deve abrir o cartão!', () => {
      this.subject.open();
    }, () => {
      this.assertTrue('Esta aberto?', this.subject.isOpened());
    });
  }

  // exemplo de teste de unidade
  // this.update(() => {
  //   this.subject.update();
  // });
  // this.assert(this.subject._status).toBeInstanceof(CardSpriteStoppedState);
  // this.assert(this.subject.width).toBe(0);
}
class MoveCardSpriteTest extends SceneTest {
  name = 'MoveCardSpriteTest';

  create() {
    const card = CardGenerator.generateCard();
    this.subject = CardSprite.create(
      card.type,
      card.color,
      card.figureName,
      card.attack,
      card.health
    );
    this.subject.startOpen(0, 0);
    this.addChild(this.subject);
  }

  start() {
    this.subject.show();
    const destinyXPosition = (Graphics.boxWidth / 2 - this.subject.width / 2);
    const destinyYPosition = (Graphics.boxHeight / 2 - this.subject.height / 2);
    const avanceXposition = (Graphics.boxWidth - this.subject.width);
    const avanceYposition = (Graphics.boxHeight - this.subject.height);
    const returnStartPosition = 0;
    const move1 = CardSprite.createMove(destinyXPosition, destinyYPosition);
    const move2 = CardSprite.createMove(avanceXposition, destinyYPosition);
    const move3 = CardSprite.createMove(avanceXposition, avanceYposition);
    const move4 = CardSprite.createMove(destinyXPosition, avanceYposition);
    const move5 = CardSprite.createMove(returnStartPosition, returnStartPosition);
    const move6 = CardSprite.createMove(destinyXPosition, destinyYPosition);
    const moves = [move1, move2, move3, move4, move5, move6];
    this.test('Deve mover!', () => {
      this.subject.toMove(moves);
    }, () => {
      this.assert('Esta na Posição x?', this.subject.x).toBe(destinyXPosition);
      this.assert('Esta na Posição x?', this.subject.y).toBe(destinyYPosition);
    }, moves.length * 0.3);
  }
}
class HoveredCardSpriteTest extends SceneTest {
  name = 'HoveredCardSpriteTest';

  create() {
    const card = CardGenerator.generateCard();
    this.subject = CardSprite.create(
      card.type,
      card.color,
      card.figureName,
      card.attack,
      card.health
    );
    const centerXPosition = (Graphics.boxWidth / 2 - this.subject.width / 2);
    const centerYPosition = (Graphics.boxHeight / 2 - this.subject.height / 2);
    this.subject.startOpen(centerXPosition, centerYPosition);
    this.addChild(this.subject);
  }

  start() {
    this.subject.show();
    this.test('Deve estar em estado de hover!', () => {
      this.subject.hover();
    }, () => {
      this.assertTrue('esta hover?', this.subject.isHovered());
    });
    this.test('Deve retornar ao normal!', () => {
      this.subject.unhover();
    }, () => {
      this.assertTrue('Esta normal?', this.subject.isNormal());
    });
  } 
}
class SelectedCardSpriteTest extends SceneTest {
  name = 'SelectedCardSpriteTest';

  create() {
    const card = CardGenerator.generateCard();
    this.subject = CardSprite.create(
      card.type,
      card.color,
      card.figureName,
      card.attack,
      card.health
    );
    const centerXPosition = (Graphics.boxWidth / 2 - this.subject.width / 2);
    const centerYPosition = (Graphics.boxHeight / 2 - this.subject.height / 2);
    this.subject.startOpen(centerXPosition, centerYPosition);
    this.addChild(this.subject);
  }

  start() {
    this.subject.show();
    this.test('O cartão deve estar em estado de select!', () => {
      this.subject.select();
    }, () => {
      this.assertTrue('Esta selecioando?', this.subject.isSelected());
    });
    this.test('O cartão deve estar em estado de select!', () => {
      this.subject.unselect();
    }, () => {
      this.assertTrue('Esta normal?', this.subject.isNormal());
    });
  }
}
class FlashCardSpriteTest extends SceneTest {
  name = 'FlashCardSpriteTest';

  create() {
    const card = CardGenerator.generateCard();
    this.subject = CardSprite.create(
      card.type,
      card.color,
      card.figureName,
      card.attack,
      card.health
    );
    const centerXPosition = (Graphics.boxWidth / 2 - this.subject.width / 2);
    const centerYPosition = (Graphics.boxHeight / 2 - this.subject.height / 2);
    this.subject.startOpen(centerXPosition, centerYPosition);
    this.addChild(this.subject);
  }

  start() {
    const color = 'white';
    const duration = 60;
    const infinity = -1;
    this.subject.show();
    this.test('Deve receber um flash de luz!', () => {
      this.subject.flash(color, duration, infinity);
    }, () => {
      this.assertWasTrue('Houve flash de luz?', this.subject.isFlashPlaying);
    });
  } 
}
class DamageAnimationCardSpriteTest extends SceneTest {
  name = 'DamageAnimationCardSpriteTest';

  create() {
    const card = CardGenerator.generateCard();
    this.subject = CardSprite.create(
      card.type,
      card.color,
      card.figureName,
      card.attack,
      card.health
    );
    const centerXPosition = (Graphics.boxWidth / 2 - this.subject.width / 2);
    const centerYPosition = (Graphics.boxHeight / 2 - this.subject.height / 2);
    this.subject.startOpen(centerXPosition, centerYPosition);
    this.addChild(this.subject);
  }

  start() {
    const times = 1;
    this.subject.show();
    this.test('Deve receber animação de dano!', () => {
      this.subject.damage(times);
    }, () => {
      this.assertWasTrue('Houve animação?', this.subject.isAnimationPlaying);
    });
  }
}
class UpdatingPointsCardSpriteTest extends SceneTest {
  name = 'UpdatingPointsCardSpriteTest';

  create() {
    const card = CardGenerator.generateCard(CardTypes.BATTLE);
    this.subject = CardSprite.create(
      card.type,
      card.color,
      card.figureName,
      0,
      0
    );
    const centerXPosition = (Graphics.boxWidth / 2 - this.subject.width / 2);
    const centerYPosition = (Graphics.boxHeight / 2 - this.subject.height / 2);
    this.subject.startOpen(centerXPosition, centerYPosition);
    this.addChild(this.subject);
  }

  start() {
    this.subject.show();
    this.test('Deve atualizar os pontos!', () => {
      this.subject.changePoints(18, 17);
    }, () => {
      this.assertWasTrue('Foi atualizando?', this.subject.isUpdating);
    });
  }
}
class DisableAndEnableCardSpriteTest extends SceneTest {
  name = 'DisableAndEnableCardSpriteTest';

  create() {
    const card = CardGenerator.generateCard();
    this.subject = CardSprite.create(
      card.type,
      card.color,
      card.figureName,
      card.attack,
      card.health
    );
    const centerXPosition = (Graphics.boxWidth / 2 - this.subject.width / 2);
    const centerYPosition = (Graphics.boxHeight / 2 - this.subject.height / 2);
    this.subject.startOpen(centerXPosition, centerYPosition);
    this.addChild(this.subject);
  }

  start() {
    this.subject.show();
    this.test('Deve desabilitar!', () => {
      this.subject.disable();
    }, () => {
      this.assertTrue('Esta disabilitado?', this.subject.isDisabled());
    });
    this.test('Deve habilitar!', () => {
      this.subject.enable();
    }, () => {
      this.assertTrue('Esta habilitado?', this.subject.isEnabled());
    });
  }
}
class ZoomAndZoomoutCardSpriteTest extends SceneTest {
  name = 'ZoomAndZoomoutCardSpriteTest';

  create() {
    const card = CardGenerator.generateCard();
    this.subject = CardSprite.create(
      card.type,
      card.color,
      card.figureName,
      card.attack,
      card.health
    );
    const centerXPosition = (Graphics.boxWidth / 2 - this.subject.width / 2);
    const centerYPosition = (Graphics.boxHeight / 2 - this.subject.height / 2);
    this.subject.startOpen(centerXPosition, centerYPosition);
    this.addChild(this.subject);
  }

  start() {
    this.subject.show();
    this.test('Deve amplicar!', () => {
      this.subject.zoom();
    }, () => {
      this.assertTrue('Esta ampliado?', this.subject.isZoom());
    });
    this.test('Deve retonar a escala normal!', () => {
      this.subject.zoomOut();
    }, () => {
      this.assertTrue('Esta em escala original?', this.subject.isOriginalScale());
    });
  }
}
class LeaveCardSpriteTest extends SceneTest {
  name = 'LeaveCardSpriteTest';

  create() {
    const card = CardGenerator.generateCard();
    this.subject = CardSprite.create(
      card.type,
      card.color,
      card.figureName,
      card.attack,
      card.health
    );
    const centerXPosition = (Graphics.boxWidth / 2 - this.subject.width / 2);
    const centerYPosition = (Graphics.boxHeight / 2 - this.subject.height / 2);
    this.subject.startOpen(centerXPosition, centerYPosition);
    this.addChild(this.subject);
  }

  start() {
    this.subject.show();
    this.test('Deve aplicar um zoom até sumir!', () => {
      this.subject.leave();
    }, () => {
      this.assert('Largura é zero?', this.subject.width).toBe(0);
      this.assert('Altura é zero?', this.subject.height).toBe(0);
    })
  }
}
class QuakeCardSpriteTest extends SceneTest {
  name = 'QuakeCardSpriteTest';

  create() {
    const card = CardGenerator.generateCard();
    this.subject = CardSprite.create(
      card.type,
      card.color,
      card.figureName,
      card.attack,
      card.health
    );
    const centerXPosition = (Graphics.boxWidth / 2 - this.subject.width / 2);
    const centerYPosition = (Graphics.boxHeight / 2 - this.subject.height / 2);
    this.subject.startOpen(centerXPosition, centerYPosition);
    this.addChild(this.subject);
  }

  start() {
    this.subject.show();
    const infinity = 10;
    this.test('Deve aplicar um chacoalhar!', () => {
      this.subject.quake(3);
    }, () => {
      this.assertWasTrue('Esta chacoalhando?', this.subject.isMoving);
    });
  }
}
class FlipCardSpriteTest extends SceneTest {
  name = 'FlipCardSpriteTest';

  create() {
    const card = CardGenerator.generateCard();
    this.subject = CardSprite.create(
      card.type,
      card.color,
      card.figureName,
      card.attack,
      card.health
    );
    const centerXPosition = (Graphics.boxWidth / 2 - this.subject.width / 2);
    const centerYPosition = (Graphics.boxHeight / 2 - this.subject.height / 2);
    this.subject.startOpen(centerXPosition, centerYPosition);
    this.subject.setToDown();
    this.addChild(this.subject);
  }

  start() {
    this.subject.show();
    this.test('Deve estar em estado virado para cima!', () => {
      this.subject.flipToUp();
    }, () => {
      this.assertTrue('Esta virado para cima?', this.subject.isTurnedToUp());
      this.assertTrue('Esta aberto?', this.subject.isOpened());
    });
    this.test('Deve estar em estado virado para baixo!', () => {
      this.subject.flipToDown();
    }, () => {
      this.assertTrue('Esta virado para baixo?', this.subject.isTurnedToDown());
      this.assertTrue('Esta aberto?', this.subject.isOpened());
    });
  }
}
class IluminatedCardSpriteTest extends SceneTest {
  name = 'IluminatedCardSpriteTest';

  create() {
    const card = CardGenerator.generateCard();
    this.subject = CardSprite.create(
      card.type,
      card.color,
      card.figureName,
      card.attack,
      card.health
    );
    const centerXPosition = (Graphics.boxWidth / 2 - this.subject.width / 2);
    const centerYPosition = (Graphics.boxHeight / 2 - this.subject.height / 2);
    this.subject.startOpen(centerXPosition, centerYPosition);
    this.addChild(this.subject);
  }

  start() {
    this.subject.show();
    this.test('Deve estar em estado iluminado!', () => {
      this.subject.iluminate();
    }, () => {
      this.assertTrue('Esta iluminado?', this.subject.isIluminated());
    });
    this.test('Deve estar em estado normal!', () => {
      this.subject.iluminate();
    }, () => {
      this.assertTrue('Esta normal?', this.subject.isIluminated());
    });
  }
}
// tests CARDSET
class SetBackgroundAndStartPositionCardsetSpriteTest extends SceneTest {
  name = 'SetBackgroundAndStartPositionCardsetSpriteTest';

  create() {
    this.subject = CardsetSprite.create();
    this.subject.setBackgroundColor('rgba(255, 0, 0, 0.5)');
    const centerXPosition = (Graphics.boxWidth / 2 - this.subject.width / 2);
    const centerYPosition = (Graphics.boxHeight / 2 - this.subject.height / 2);
    this.subject.startPosition(centerXPosition, centerYPosition);
    this.addChild(this.subject);
  }

  start() {
    this.test('Deve apresentar o set de cartões!', () => {
      this.subject.show();
    }, () => {
      this.assertTrue('É visível?', this.subject.isVisible());
    });
  }
}
class SetCardsCardsetSpriteTest extends SceneTest {
  name = 'SetCardsCardsetSpriteTest';

  create() {
    this.subject = CardsetSprite.create();
    const centerXPosition = (Graphics.boxWidth / 2 - this.subject.width / 2);
    const centerYPosition = (Graphics.boxHeight / 2 - this.subject.height / 2);
    this.subject.startPosition(centerXPosition, centerYPosition);
    this.subject.setBackgroundColor('white');
    this.addChild(this.subject);
  }

  start() {
    this.subject.show();
    let times = 1;
    for (let index = 0; index < 2; index++) {
      const cards = CardGenerator.generateCard(times);
      this.test('Deve mostrar todos os cartões abertos do set na mesma posição!', () => {
        this.subject.setCards(cards);
        this.subject.showCards();
      }, () => {
        this.assertTrue('Estão aberto?', this.subject.allCardsOpened());
      }, 0.3);
      times++;
    }
  }
}
class StartPositionCardsCardsetSpriteTest extends SceneTest {
  name = 'StartPositionCardsCardsetSpriteTest';

  create() {
    this.subject = CardsetSprite.create();
    const centerXPosition = (Graphics.boxWidth / 2 - this.subject.width / 2);
    const centerYPosition = (Graphics.boxHeight / 2 - this.subject.height / 2);
    this.subject.startPosition(centerXPosition, centerYPosition);
    this.subject.setBackgroundColor('white');
    this.addChild(this.subject);
  }

  start() {
    this.subject.show();
    let numCards = 1;
    const x = 100;
    const y = 0;
    const paddingLeft = 0;
    const cards = CardGenerator.generateCards(numCards);
    const positions = CardsetSprite.createPositions(numCards, paddingLeft, x, y);
    this.test('Deve mostrar todos os cartões do set em posição!', () => {
      this.subject.setCards(cards);
      this.subject.startPositionCards(x, y);
      this.subject.showCards();
    }, () => {
      this.assertTrue('Estão aberto?', this.subject.allCardsOpened());
      this.assertTrue('Estão na posição?', this.subject.isSpritesPositions(positions));
    });
  }
}
class StartListCardsCardsetSpriteTest extends SceneTest {
  name = 'StartListCardsCardsetSpriteTest';

  create() {
    this.subject = CardsetSprite.create();
    const centerXPosition = (Graphics.boxWidth / 2 - this.subject.width / 2);
    const centerYPosition = (Graphics.boxHeight / 2 - this.subject.height / 2);
    this.subject.startPosition(centerXPosition, centerYPosition);
    this.subject.setBackgroundColor('white');
    this.addChild(this.subject);
  }

  start() {
    const numCards = 40;
    this.subject.show();
    const cards = CardGenerator.generateCards(numCards);
    const positions = CardsetSprite.createPositions(numCards);
    this.test('Deve mostrar todos os cartões em lista!', () => {
      this.subject.setCards(cards);
      this.subject.startListCards();
      this.subject.showCards();
    }, () => {
      this.assertTrue('Estão em lista?', this.subject.isSpritesPositions(positions));
    });
  }
}



class StartClosedAndOpenCardsCardsetSpriteTest extends SceneTest {
  name = 'StartClosedAndOpenCardsCardsetSpriteTest';

  create() {
    this.subject = CardsetSprite.create();
    const centerXPosition = (Graphics.boxWidth / 2 - this.subject.width / 2);
    const centerYPosition = (Graphics.boxHeight / 2 - this.subject.height / 2);
    this.subject.startPosition(centerXPosition, centerYPosition);
    this.subject.setBackgroundColor('white');
    this.addChild(this.subject);
  }

  start() {
    this.subject.show();
    let times = 1;
    for (let i = 0; i < 6; i++) {
      const cards = CardGenerator.generateCards(times);
      this.test('Deve abrir todos os cartões do set!', () => {
        this.subject.setCards(cards);
        this.subject.startListCards();
        this.subject.startClosedCards();
        this.subject.showCards();
        this.subject.openCards();
      }, () => {
        this.assertTrue('Estão aberto?', this.subject.allCardsOpened());
      });
      this.test('Deve fechar todos os cartões do set!', () => {
        this.subject.startOpenCards();
        this.subject.closeCards();
      }, () => {
        this.assertTrue('Estão fechados?', this.subject.allCardsClosed());
      });
      times++;
    }
  }
}
class StartClosedAndOpenCardsDelayCardsetSpriteTest extends SceneTest {
  name = 'StartClosedAndOpenCardsDelayCardsetSpriteTest';

  create() {
    this.subject = CardsetSprite.create();
    const centerXPosition = (Graphics.boxWidth / 2 - this.subject.width / 2);
    const centerYPosition = (Graphics.boxHeight / 2 - this.subject.height / 2);
    this.subject.startPosition(centerXPosition, centerYPosition);
    this.subject.setBackgroundColor('white');
    this.addChild(this.subject);
  }

  start() {
    this.subject.show();
    let times = 40;
    for (let i = 0; i < 1; i++) {
      const cards = CardGenerator.generateCards(times);
      this.test('Deve abrir todos os cartões do set com delay!', () => {
        this.subject.setCards(cards);
        this.subject.startListCards();
        this.subject.startClosedCards();
        this.subject.showCards();
        this.subject.openCardsWithDelay();
      }, () => {
        this.assertTrue('Estão aberto?', this.subject.allCardsOpened());
      });
      this.test('Deve fechar todos os cartões do set com delay!', () => {
        this.subject.startOpenCards();
        this.subject.closeCardsWithDelay();
      }, () => {
        this.assertTrue('Estão fechados?', this.subject.allCardsClosed());
      });
      times++;
    }
  }
}
class MoveCardsToListCardsetSpriteTest extends SceneTest {
  name = 'MoveCardsToListCardsetSpriteTest';

  create() {
    this.subject = CardsetSprite.create();
    const centerXPosition = (Graphics.boxWidth / 2 - this.subject.width / 2);
    const centerYPosition = (Graphics.boxHeight / 2 - this.subject.height / 2);
    this.subject.startPosition(centerXPosition, centerYPosition);
    this.subject.setBackgroundColor('white');
    this.addChild(this.subject);
  }

  start() {
    this.subject.show();
    let times = 1;
    for (let i = 0; i < 6; i++) {
      const cards = CardGenerator.generateCards(times);
      const screenWidth = Graphics.boxWidth;
      const paddingLeft = 97;
      const positions = CardsetSprite.createPositions(6, paddingLeft);
      this.test('Deve mover todos os cartões do set na posição em lista!', () => {
        const sprites = this.subject.setCards(cards);
        this.subject.startPositionCards(screenWidth, 0);
        this.subject.startOpenCards();
        this.subject.showCards();
        this.subject.moveCardsToList();
      }, () => {
        this.assertTrue('Foram movidos em lista?', this.subject.isSpritesPositions(positions));
      });
      times++;
    }
  }
}
class MoveCardsToListDelayCardsetSpriteTest extends SceneTest {
  name = 'MoveCardsToListDelayCardsetSpriteTest';

  create() {
    this.subject = CardsetSprite.create();
    const centerXPosition = (Graphics.boxWidth / 2 - this.subject.width / 2);
    const centerYPosition = (Graphics.boxHeight / 2 - this.subject.height / 2);
    this.subject.startPosition(centerXPosition, centerYPosition);
    this.subject.setBackgroundColor('white');
    this.addChild(this.subject);
  }

  start() {
    this.subject.show();
    let times = 40;
    for (let i = 0; i < 1; i++) {
      const cards = CardGenerator.generateCards(times);
      const screenWidth = Graphics.boxWidth;
      const positions = CardsetSprite.createPositions(6);
      this.test('Deve mover todos os cartões do set na posição em lista com delay!', () => {
        this.subject.setCards(cards);
        this.subject.startOpenCards();
        this.subject.startListCards();
        this.subject.startPositionCards(screenWidth, 0);
        this.subject.showCards();
        const delay = 10;
        this.subject.moveCardsToListDelay(delay);
      }, () => {
        this.assertTrue('Foram movidos em lista?', this.subject.isSpritesPositions(positions));
      }, 8);
      times++;
    }
  }
}
class MoveCardsToPositionCardsetSpriteTest extends SceneTest {
  name = 'MoveCardsToPositionCardsetSpriteTest';

  create() {
    this.subject = CardsetSprite.create();
    const centerXPosition = (Graphics.boxWidth / 2 - this.subject.width / 2);
    const centerYPosition = (Graphics.boxHeight / 2 - this.subject.height / 2);
    this.subject.startPosition(centerXPosition, centerYPosition);
    this.subject.setBackgroundColor('white');
    this.addChild(this.subject);
  }

  start() {
    const numCards = 40;
    this.subject.show();
    const cards = CardGenerator.generateCards(numCards);
    const screenWidth = Graphics.boxWidth;
    const cardWidth = 96;
    const xPosition = (this.subject.width / 2) - (cardWidth / 2);
    const yPosition = 0;
    const paddingLeft = 0;
    const positions = CardsetSprite.createPositions(6, paddingLeft, xPosition, yPosition);
    this.test('Deve mover todos os cartões do set na posição!', () => {
      this.subject.setCards(cards);
      this.subject.startPositionCards(screenWidth, 0);
      this.subject.startOpenCards();
      this.subject.showCards();
      this.subject.moveCardsToPosition(xPosition, 0);
    }, () => {
      this.assertTrue('Foram movidos para posição?', this.subject.isSpritesPositions(positions));
    });
  }
}
class AddCardAndMoveToListCardsetSpriteTest extends SceneTest {
  name = 'AddCardAndMoveToListCardsetSpriteTest';

  create() {
    this.subject = CardsetSprite.create();
    const centerXPosition = (Graphics.boxWidth / 2 - this.subject.width / 2);
    const centerYPosition = (Graphics.boxHeight / 2 - this.subject.height / 2);
    this.subject.startPosition(centerXPosition, centerYPosition);
    this.subject.setBackgroundColor('white');
    this.addChild(this.subject);
  }

  start() {
    this.subject.show();
    let times = 1;
    for (let i = 0; i < 3; i++) {
      const cards = CardGenerator.generateCards(3);
      const newCards = CardGenerator.generateCards(times);
      const screenWidth = Graphics.boxWidth;
      const positions = CardsetSprite.createPositions(6, 97);
      positions.shift();
      positions.shift();
      positions.shift();
      this.test('Deve adicionar e mover novos para set na posição em lista!', () => {
        const sprites = this.subject.setCards(cards);
        this.subject.startListCards(sprites);
        this.subject.showCards(sprites);
        const newSprites = this.subject.addCards(newCards);
        this.subject.startPositionCards(screenWidth, 0, newSprites);
        this.subject.showCards(newSprites);
        this.subject.moveCardsToList(newSprites);
      }, () => {
        this.assertTrue('Foram movidos em lista?', this.subject.isSpritesPositions(positions));
      });
      times++;
    }
  }
}
class AddCardAndMoveToListDelayCardsetSpriteTest extends SceneTest {
  name = 'AddCardAndMoveToListDelayCardsetSpriteTest';

  create() {
    this.subject = CardsetSprite.create();
    const centerXPosition = (Graphics.boxWidth / 2 - this.subject.width / 2);
    const centerYPosition = (Graphics.boxHeight / 2 - this.subject.height / 2);
    this.subject.startPosition(centerXPosition, centerYPosition);
    this.subject.setBackgroundColor('white');
    this.addChild(this.subject);
  }

  start() {
    this.subject.show();
    let times = 1;
    for (let i = 0; i < 3; i++) {
      const cards = CardGenerator.generateCards(3);
      const newCards = CardGenerator.generateCards(times);
      const screenWidth = Graphics.boxWidth;
      const positions = CardsetSprite.createPositions(6, 97);
      positions.shift();
      positions.shift();
      positions.shift();
      this.test('Deve adicionar e mover novos para set na posição em lista com delay!', () => {
        const sprites = this.subject.setCards(cards);
        this.subject.startListCards(sprites);
        this.subject.showCards(sprites);
        const newSprites = this.subject.addCards(newCards);
        this.subject.startPositionCards(screenWidth, 0, newSprites);
        this.subject.showCards(newSprites);
        const delay = 10;
        this.subject.moveCardsToListDelay(delay, newSprites);
      }, () => {
        this.assertTrue('Foram movidos em lista?', this.subject.isSpritesPositions(positions));
      });
      times++;
    }
  }
}
class SelectModeCardsetSpriteTest extends SceneTest {
  name = 'SelectModeCardsetSpriteTest';

  create() {
    this.subject = CardsetSprite.create();
    const centerXPosition = (Graphics.boxWidth / 2 - this.subject.width / 2);
    const centerYPosition = (Graphics.boxHeight / 2 - this.subject.height / 2);
    this.subject.startPosition(centerXPosition, centerYPosition);
    this.subject.setBackgroundColor('white');
    this.addChild(this.subject);
  }

  start() {
    return new Promise(async resolve => {
      this.subject.show();
      const cards = CardGenerator.generateCards(10);
      this.test('Deve entrar em modo seleção!', () => {
        this.subject.setCards(cards);
        this.subject.startListCards();
        this.subject.showCards();
        this.subject.selectMode();
      }, () => {
        this.assertTrue('Esta em modo seleção?', this.subject.isSelectMode());
      });
      this.test('Deve entrar em modo estático!', () => {
        this.subject.unselectMode();
      }, () => {
        this.assertTrue('esta em modo estático?', this.subject.isStaticMode());
      });
    });
  }
}
class SelectModeAndEnableChoiceCardsetSpriteTest extends SceneTest {
  name = 'SelectModeAndEnableChoiceCardsetSpriteTest';

  create() {
    this.subject = CardsetSprite.create();
    const centerXPosition = (Graphics.boxWidth / 2 - this.subject.width / 2);
    const centerYPosition = (Graphics.boxHeight / 2 - this.subject.height / 2);
    this.subject.startPosition(centerXPosition, centerYPosition);
    this.subject.setBackgroundColor('white');
    this.addChild(this.subject);
  }

  start() {
    return new Promise(async resolve => {
      this.subject.show();
      const cards = CardGenerator.generateCards(10);
      this.test('Deve entrar em modo seleção!', () => {
        this.subject.setCards(cards);
        this.subject.startListCards();
        this.subject.showCards();
        const sprites = this.subject.getCardIndexs([4, 5]);
        this.subject.disableCards();
        this.subject.enableCards(sprites);
        this.subject.selectMode();
        this.subject.enableChoice();
      }, () => {
        this.assertTrue('Esta em modo seleção?', this.subject.isSelectMode());
        this.assertTrue('Esta em modo escolha?', this.subject.isEnableChoice());
      });
    });
  }
}
class AnimateQuakeCardsCardsetSpriteTest extends SceneTest {
  name = 'AnimateQuakeCardsCardsetSpriteTest';

  create() {
    this.subject = CardsetSprite.create();
    const centerXPosition = (Graphics.boxWidth / 2 - this.subject.width / 2);
    const centerYPosition = (Graphics.boxHeight / 2 - this.subject.height / 2);
    this.subject.startPosition(centerXPosition, centerYPosition);
    this.subject.setBackgroundColor('white');
    this.addChild(this.subject);
  }

  start() {
    this.subject.show();
    const cards = CardGenerator.generateCards(6);
    this.test('Deve realizar chacoalhar os cartões!', () => {
      const sprites = this.subject.setCards(cards);
      this.subject.startListCards();
      this.subject.showCards();
      const sprite = this.subject.getCardIndex(0);
      this.subject.animateCardQuake(sprite, 3);
      this.subject.animateCardsQuake(50);
    }, () => {
      this.assertWasTrue('Houve um chacoalhar?', this.subject.someSpriteIsMoving);
    });
  }
}
class AnimateFlashCardsCardsetSpriteTest extends SceneTest {
  name = 'AnimateFlashCardsCardsetSpriteTest';

  create() {
    this.subject = CardsetSprite.create();
    const centerXPosition = (Graphics.boxWidth / 2 - this.subject.width / 2);
    const centerYPosition = (Graphics.boxHeight / 2 - this.subject.height / 2);
    this.subject.startPosition(centerXPosition, centerYPosition);
    this.subject.setBackgroundColor('white');
    this.addChild(this.subject);
  }

  start() {
    this.subject.show();
    const cards = CardGenerator.generateCards(6);
    this.test('Deve realizar um flash nos cartões!', () => {
      const sprites = this.subject.setCards(cards);
      this.subject.startListCards();
      this.subject.showCards();
      const sprite = this.subject.getCardIndex(0);
      this.subject.animateCardFlash(sprite);
      this.subject.animateCardsFlash();
    }, () => {
      this.assertWasTrue('Houve um flash de luz?', this.subject.someSpriteIsFlashPlaying);
    });
  }
}
class AnimateDamageCardsCardsetSpriteTest extends SceneTest {
  name = 'AnimateDamageCardsCardsetSpriteTest';

  create() {
    this.subject = CardsetSprite.create();
    const centerXPosition = (Graphics.boxWidth / 2 - this.subject.width / 2);
    const centerYPosition = (Graphics.boxHeight / 2 - this.subject.height / 2);
    this.subject.startPosition(centerXPosition, centerYPosition);
    this.subject.setBackgroundColor('white');
    this.addChild(this.subject);
  }

  start() {
    this.subject.show();
    const cards = CardGenerator.generateCards(6);
    this.test('Deve realizar animações nos cartões!', () => {
      const sprites = this.subject.setCards(cards);
      this.subject.startListCards();
      this.subject.showCards();
      const sprite = this.subject.getCardIndex(0);
      this.subject.animateCardDamage(sprite);
      this.subject.animateCardsDamage();
    }, () => {
      this.assertWasTrue('Houve uma animação?', this.subject.someSpriteIsAnimationPlaying);
    });
  }
}
class DisableAndEnableCardsCardsetSpriteTest extends SceneTest {
  name = 'DisableAndEnableCardsCardsetSpriteTest';

  create() {
    this.subject = CardsetSprite.create();
    const centerXPosition = (Graphics.boxWidth / 2 - this.subject.width / 2);
    const centerYPosition = (Graphics.boxHeight / 2 - this.subject.height / 2);
    this.subject.startPosition(centerXPosition, centerYPosition);
    this.subject.setBackgroundColor('white');
    this.addChild(this.subject);
  }

  start() {
    return new Promise(async resolve => {
      this.subject.show();
      const cards = CardGenerator.generateCards(10);
      const enableCardsIndex = [0, 3, 4, 5, 6];
      const disableCardsIndex = [1, 2, 7, 8, 9];
      this.test('Deve apresentar habilitados e desabilitados por indices!', () => {
        this.subject.setCards(cards);
        this.subject.startListCards();
        this.subject.showCards();
        this.subject.disableCards();
        const sprite = this.subject.getCardIndex();
        this.subject.enableCard(sprite);
        const sprites = this.subject.getCardIndexs([3, 4, 5, 6]);
        this.subject.enableCards(sprites);
      }, () => {
        this.assertTrue('Estão desabilitados?', this.subject.isDisabledCardsIndex(disableCardsIndex));
        this.assertTrue('Estão habilitados?', this.subject.isEnabledCardsIndex(enableCardsIndex));
      });
    });
  }
}
// tests CARD BATTLE WINDOW BASE
class OpenAndCloseCardBattleWindowBaseTest extends SceneTest {
  name = 'OpenAndCloseCardBattleWindowBaseTest';

  create() {
    this.subject = CardBattleWindowBase.create(0, 0, Graphics.width, Graphics.height);
    this.addWindow(this.subject);
  }

  start() {
    this.subject.setCenteredAlignment();
    this.test('Deve abrir e renderizar!', () => {
      this.subject.open();
    }, () => {
      this.assertTrue('Esta aberta?', this.subject.isOpen());
    });
    this.test('Deve abrir e renderizar!', () => {
      this.subject.close();
    }, () => {
      this.assertTrue('Esta fechada?', this.subject.isClosed());
    });
  }
}
class ChangeColorCardBattleWindowBaseTest extends SceneTest {
  name = 'ChangeColorCardBattleWindowBaseTest';

  create() {
    this.subject = CardBattleWindowBase.create(0, 0, Graphics.width, Graphics.height);
    this.addWindow(this.subject);
  }

  start() {
    this.subject.setCenteredAlignment();
    this.subject.open();
    this.test('Deve mudar para cor azul a janela!', () => {
      this.subject.setBlueColor();
    }, () => {
      this.assertTrue('Esta na cor azul?', this.subject.isBlueColor());
    });
    this.test('Deve mudar para cor vermelha a janela!', () => {
      this.subject.setRedColor();
    }, () => {
      this.assertTrue('Esta na cor vermelha?', this.subject.isRedColor());
    });
    this.test('Deve mudar para cor vermelha a janela!', () => {
      this.subject.setDefaultColor();
    }, () => {
      this.assertTrue('Esta na cor default?', this.subject.isDefaultColor());
    });
  }
}
class SetMiddleSizeCardBattleWindowBaseTest extends SceneTest {
  name = 'SetMiddleSizeCardBattleWindowBaseTest';

  create() {
    const x = 0;
    const y = 0;
    this.subject = CardBattleWindowBase.createWindowMiddleSize(x, y);
    this.addWindow(this.subject);
  }

  start() {
    this.subject.show();
    this.test('Deve abrir na largura média!', () => {
      this.subject.open();
    }, () => {
      this.assertTrue('Esta na largura média?', this.subject.isMiddleSize());
    });
  }
  
}
class SetFullSizeCardBattleWindowBaseTest extends SceneTest {
  name = 'SetFullSizeCardBattleWindowBaseTest';

  create() {
    const x = 0;
    const y = 0;
    this.subject = CardBattleWindowBase.createWindowFullSize(x, y);
    this.addWindow(this.subject);
  }

  start() {
    this.subject.show();
    this.test('Deve abrir na largura total!', () => {
      this.subject.open();
    }, () => {
      this.assertTrue('Esta na largura total?', this.subject.isFullsize());
    });
  }

}
class AlignMiddleSizeCardBattleWindowBaseTest extends SceneTest {
  name = 'AlignMiddleSizeCardBattleWindowBaseTest';

  create() {
    const x = 0;
    const y = 0;
    this.subject = CardBattleWindowBase.createWindowMiddleSize(x, y);
    this.addWindow(this.subject);
  }

  start() {
    this.subject.show();
    this.subject.open();
    this.test('Deve move para inicio no top!', () => {
      this.subject.setHorizontalAlign(GameConst.START);
      this.subject.setVerticalAlign(GameConst.TOP);
    }, () => {
      this.assert('Esta na posição x?', this.subject.x).toBe(TextWindow.getHorizontalAlign(GameConst.START, this.subject));
      this.assert('Esta na posição y?', this.subject.y).toBe(TextWindow.getVerticalAlign(GameConst.TOP, this.subject));
    });
    this.test('Deve move para inicio no meio!', () => {
      this.subject.setHorizontalAlign(GameConst.START);
      this.subject.setVerticalAlign(GameConst.MIDDLE);
    }, () => {
      this.assert('Esta na posição x?', this.subject.x).toBe(TextWindow.getHorizontalAlign(GameConst.START, this.subject));
      this.assert('Esta na posição y?', this.subject.y).toBe(TextWindow.getVerticalAlign(GameConst.MIDDLE, this.subject));
    });
    this.test('Deve move para inicio embaixo!', () => {
      this.subject.setHorizontalAlign(GameConst.START);
      this.subject.setVerticalAlign(GameConst.BOTTOM);
    }, () => {
      this.assert('Esta na posição x?', this.subject.x).toBe(TextWindow.getHorizontalAlign(GameConst.START, this.subject));
      this.assert('Esta na posição y?', this.subject.y).toBe(TextWindow.getVerticalAlign(GameConst.BOTTOM, this.subject));
    });
    this.test('Deve move para centro no top!', () => {
      this.subject.setHorizontalAlign(GameConst.CENTER);
      this.subject.setVerticalAlign(GameConst.TOP);
    }, () => {
      this.assert('Esta na posição x?', this.subject.x).toBe(TextWindow.getHorizontalAlign(GameConst.CENTER, this.subject));
      this.assert('Esta na posição y?', this.subject.y).toBe(TextWindow.getVerticalAlign(GameConst.TOP, this.subject));
    });
    this.test('Deve move para centro no meio!', () => {
      this.subject.setCenteredAlignment();
    }, () => {
      this.assert('Esta na posição x?', this.subject.x).toBe(TextWindow.getHorizontalAlign(GameConst.CENTER, this.subject));
      this.assert('Esta na posição y?', this.subject.y).toBe(TextWindow.getVerticalAlign(GameConst.MIDDLE, this.subject));
    });
    this.test('Deve move para centro embaixo!', () => {
      this.subject.setHorizontalAlign(GameConst.CENTER);
      this.subject.setVerticalAlign(GameConst.BOTTOM);
    }, () => {
      this.assert('Esta na posição x?', this.subject.x).toBe(TextWindow.getHorizontalAlign(GameConst.CENTER, this.subject));
      this.assert('Esta na posição y?', this.subject.y).toBe(TextWindow.getVerticalAlign(GameConst.BOTTOM, this.subject));
    });
    this.test('Deve move para final no top!', () => {
      this.subject.setHorizontalAlign(GameConst.END);
      this.subject.setVerticalAlign(GameConst.TOP);
    }, () => {
      this.assert('Esta na posição x?', this.subject.x).toBe(TextWindow.getHorizontalAlign(GameConst.END, this.subject));
      this.assert('Esta na posição y?', this.subject.y).toBe(TextWindow.getVerticalAlign(GameConst.TOP, this.subject));
    });
    this.test('Deve move para final no meio!', () => {
      this.subject.setHorizontalAlign(GameConst.END);
      this.subject.setVerticalAlign(GameConst.MIDDLE);
    }, () => {
      this.assert('Esta na posição x?', this.subject.x).toBe(TextWindow.getHorizontalAlign(GameConst.END, this.subject));
      this.assert('Esta na posição y?', this.subject.y).toBe(TextWindow.getVerticalAlign(GameConst.MIDDLE, this.subject));
    });
    this.test('Deve move para final no embaixo!', () => {
      this.subject.setHorizontalAlign(GameConst.END);
      this.subject.setVerticalAlign(GameConst.BOTTOM);
    }, () => {
      this.assert('Esta na posição x?', this.subject.x).toBe(TextWindow.getHorizontalAlign(GameConst.END, this.subject));
      this.assert('Esta na posição y?', this.subject.y).toBe(TextWindow.getVerticalAlign(GameConst.BOTTOM, this.subject));
    });
  }

}
class AlignFullSizeCardBattleWindowBaseTest extends SceneTest {
  name = 'AlignFullSizeCardBattleWindowBaseTest';

  create() {
    const x = 0;
    const y = 0;
    this.subject = CardBattleWindowBase.createWindowFullSize(x, y);
    this.addWindow(this.subject);
  }

  start() {
    this.subject.show();
    this.subject.open();
    this.test('Deve move para centro no top!', () => {
      this.subject.setHorizontalAlign(GameConst.CENTER);
      this.subject.setVerticalAlign(GameConst.TOP);
    }, () => {
      this.assert('Esta na posição x?', this.subject.x).toBe(TextWindow.getHorizontalAlign(GameConst.CENTER, this.subject));
      this.assert('Esta na posição y?', this.subject.y).toBe(TextWindow.getVerticalAlign(GameConst.TOP, this.subject));
    });
    this.test('Deve move para centro no meio!', () => {
      this.subject.setCenteredAlignment();
    }, () => {
      this.assert('Esta na posição x?', this.subject.x).toBe(TextWindow.getHorizontalAlign(GameConst.CENTER, this.subject));
      this.assert('Esta na posição y?', this.subject.y).toBe(TextWindow.getVerticalAlign(GameConst.MIDDLE, this.subject));
    });
    this.test('Deve move para centro embaixo!', () => {
      this.subject.setHorizontalAlign(GameConst.CENTER);
      this.subject.setVerticalAlign(GameConst.BOTTOM);
    }, () => {
      this.assert('Esta na posição x?', this.subject.x).toBe(TextWindow.getHorizontalAlign(GameConst.CENTER, this.subject));
      this.assert('Esta na posição y?', this.subject.y).toBe(TextWindow.getVerticalAlign(GameConst.BOTTOM, this.subject));
    });
  }
}
// tests TEXT WINDOW
class DrawTextStartAlignFullSizeTextWindowTest extends SceneTest {
  name = 'DrawTextStartAlignFullSizeTextWindowTest';

  create() {
    const x = 0;
    const y = 0;
    this.subject = TextWindow.createWindowFullSize(x, y);
    this.addWindow(this.subject);
  }

  start() {
    this.subject.setCenteredAlignment();
    this.subject.show();
    const line = "Hello World";
    this.subject.addText(line.repeat(1) + ' 0');
    this.subject.addText(line.repeat(5) + ' 1');
    this.subject.addText(line.repeat(3) + ' 2');
    this.subject.addText(line.repeat(2) + ' 3');
    this.test('Deve alinhar o texto no início!', () => {
      this.subject.setHorizontalAlignContent(GameConst.START);
      this.subject.renderContents();
      this.subject.setCenteredAlignment();
      this.subject.open();
    }, () => {
      const xStartAlign = 0;
      const yStartAlignPrimaryLine = 0;
      const yStartAlignSecondaryLine = 36;
      const yStartAlignTertiaryLine = 72;
      const yStartAlignQuaternaryLine = 108;
      this.assertTrue('Foi alinhado no início?', this.subject.isWasTextDrawnPositions(xStartAlign, yStartAlignPrimaryLine));
      this.assertTrue('Foi alinhado no início?', this.subject.isWasTextDrawnPositions(xStartAlign, yStartAlignSecondaryLine));
      this.assertTrue('Foi alinhado no início?', this.subject.isWasTextDrawnPositions(xStartAlign, yStartAlignTertiaryLine));
      this.assertTrue('Foi alinhado no início?', this.subject.isWasTextDrawnPositions(xStartAlign, yStartAlignQuaternaryLine));
    });
  }
}
class DrawTextStartAlignMiddleSizeTextWindowTest extends SceneTest {
  name = 'DrawTextStartAlignMiddleSizeTextWindowTest';

  create() {
    const x = 0;
    const y = 0;
    this.subject = TextWindow.createWindowMiddleSize(x, y);
    this.addWindow(this.subject);
  }

  start() {
    this.subject.setCenteredAlignment();
    this.subject.show();
    const line = "Hello World";
    this.subject.addText(line.repeat(1) + ' 0');
    this.subject.addText(line.repeat(2) + ' 1');
    this.subject.addText(line.repeat(3) + ' 2');
    this.subject.addText(line.repeat(1) + ' 3');
    this.test('Deve alinhar o texto no início!', () => {
      this.subject.setHorizontalAlignContent(GameConst.START);
      this.subject.renderContents();
      this.subject.setCenteredAlignment();
      this.subject.open();
    }, () => {
      const xStartAlign = 0;
      const yStartAlignPrimaryLine = 0;
      const yStartAlignSecondaryLine = 36;
      const yStartAlignTertiaryLine = 72;
      const yStartAlignQuaternaryLine = 108;
      this.assertTrue('Foi alinhado no início?', this.subject.isWasTextDrawnPositions(xStartAlign, yStartAlignPrimaryLine));
      this.assertTrue('Foi alinhado no início?', this.subject.isWasTextDrawnPositions(xStartAlign, yStartAlignSecondaryLine));
      this.assertTrue('Foi alinhado no início?', this.subject.isWasTextDrawnPositions(xStartAlign, yStartAlignTertiaryLine));
      this.assertTrue('Foi alinhado no início?', this.subject.isWasTextDrawnPositions(xStartAlign, yStartAlignQuaternaryLine));
    });
  }
}
class DrawTextCenterAlignFullSizeTextWindowTest extends SceneTest {
  name = 'DrawTextCenterAlignFullSizeTextWindowTest';

  create() {
    const x = 0;
    const y = 0;
    this.subject = TextWindow.createWindowFullSize(x, y);
    this.addWindow(this.subject);
  }

  start() {
    this.subject.setCenteredAlignment();
    this.subject.show();
    const line = "Hello World";
    this.subject.addText(line.repeat(1) + ' 0');
    this.subject.addText(line.repeat(5) + ' 1');
    this.subject.addText(line.repeat(3) + ' 2');
    this.subject.addText(line.repeat(2) + ' 3');
    this.test('Deve alinhar o texto no centro!', () => {
      this.subject.setHorizontalAlignContent(GameConst.CENTER);
      this.subject.renderContents();
      this.subject.setCenteredAlignment();
      this.subject.open();
    }, () => {
      const xCenterAlignPrimaryLine = 307.5;
      const xCenterAlignSecondaryLine = 21.5;
      const xCenterAlignTertiaryLine = 164.5;;
      const xCenterAlignQuaternaryLine = 236;
      const yCenterAlignPrimaryLine = 0;
      const yCenterAlignSecondaryLine = 36;
      const yCenterAlignTertiaryLine = 72;
      const yCenterAlignQuaternaryLine = 108;
      this.assertTrue('Foi alinhado no centro?', this.subject.isWasTextDrawnPositions(xCenterAlignPrimaryLine, yCenterAlignPrimaryLine));
      this.assertTrue('Foi alinhado no centro?', this.subject.isWasTextDrawnPositions(xCenterAlignSecondaryLine, yCenterAlignSecondaryLine));
      this.assertTrue('Foi alinhado no centro?', this.subject.isWasTextDrawnPositions(xCenterAlignTertiaryLine, yCenterAlignTertiaryLine));
      this.assertTrue('Foi alinhado no centro?', this.subject.isWasTextDrawnPositions(xCenterAlignQuaternaryLine, yCenterAlignQuaternaryLine));
    });
  }
}
class DrawTextCenterAlignMiddleSizeTextWindowTest extends SceneTest {
  name = 'DrawTextCenterAlignMiddleSizeTextWindowTest';

  create() {
    const x = 0;
    const y = 0;
    this.subject = TextWindow.createWindowMiddleSize(x, y);
    this.addWindow(this.subject);
  }

  start() {
    this.subject.setCenteredAlignment();
    this.subject.show();
    const line = "Hello World";
    this.subject.addText(line.repeat(1) + ' 0');
    this.subject.addText(line.repeat(1) + ' 1');
    this.subject.addText(line.repeat(2) + ' 2');
    this.subject.addText(line.repeat(3) + ' 3');
    this.test('Deve alinhar o texto no centro!', () => {
      this.subject.setHorizontalAlignContent(GameConst.CENTER);
      this.subject.renderContents();
      this.subject.setCenteredAlignment();
      this.subject.open();
    }, () => {
      const xCenterAlignPrimaryLine = 144;
      const xCenterAlignSecondaryLine = 144;
      const xCenterAlignTertiaryLine = 72.5;;
      const xCenterAlignQuaternaryLine = 1;
      const yCenterAlignPrimaryLine = 0;
      const yCenterAlignSecondaryLine = 36;
      const yCenterAlignTertiaryLine = 72;
      const yCenterAlignQuaternaryLine = 108;
      this.assertTrue('Foi alinhado no centro?', this.subject.isWasTextDrawnPositions(xCenterAlignPrimaryLine, yCenterAlignPrimaryLine));
      this.assertTrue('Foi alinhado no centro?', this.subject.isWasTextDrawnPositions(xCenterAlignSecondaryLine, yCenterAlignSecondaryLine));
      this.assertTrue('Foi alinhado no centro?', this.subject.isWasTextDrawnPositions(xCenterAlignTertiaryLine, yCenterAlignTertiaryLine));
      this.assertTrue('Foi alinhado no centro?', this.subject.isWasTextDrawnPositions(xCenterAlignQuaternaryLine, yCenterAlignQuaternaryLine));
    });
  }
}
class DrawTextEndAlignFullSizeTextWindowTest extends SceneTest {
  name = 'DrawTextEndAlignFullSizeTextWindowTest';

  create() {
    const x = 0;
    const y = 0;
    this.subject = TextWindow.createWindowFullSize(x, y);
    this.addWindow(this.subject);
  }

  start() {
    this.subject.setCenteredAlignment();
    this.subject.show();
    const line = "Hello World";
    this.subject.addText(line.repeat(1) + ' 0');
    this.subject.addText(line.repeat(5) + ' 1');
    this.subject.addText(line.repeat(3) + ' 2');
    this.subject.addText(line.repeat(2) + ' 3');
    this.test('Deve alinhar o texto no final!', () => {
      this.subject.setHorizontalAlignContent(GameConst.END);
      this.subject.renderContents();
      this.subject.setCenteredAlignment();
      this.subject.open();
    }, () => {
      const xCenterAlignPrimaryLine = 615;
      const xCenterAlignSecondaryLine = 43;
      const xCenterAlignTertiaryLine = 329;;
      const xCenterAlignQuaternaryLine = 472;
      const yCenterAlignPrimaryLine = 0;
      const yCenterAlignSecondaryLine = 36;
      const yCenterAlignTertiaryLine = 72;
      const yCenterAlignQuaternaryLine = 108;
      this.assertTrue('Foi alinhado no final?', this.subject.isWasTextDrawnPositions(xCenterAlignPrimaryLine, yCenterAlignPrimaryLine));
      this.assertTrue('Foi alinhado no final?', this.subject.isWasTextDrawnPositions(xCenterAlignSecondaryLine, yCenterAlignSecondaryLine));
      this.assertTrue('Foi alinhado no final?', this.subject.isWasTextDrawnPositions(xCenterAlignTertiaryLine, yCenterAlignTertiaryLine));
      this.assertTrue('Foi alinhado no final?', this.subject.isWasTextDrawnPositions(xCenterAlignQuaternaryLine, yCenterAlignQuaternaryLine));
    });
  }
}
class DrawTextEndAlignMiddleSizeTextWindowTest extends SceneTest {
  name = 'DrawTextEndAlignMiddleSizeTextWindowTest';

  create() {
    const x = 0;
    const y = 0;
    this.subject = TextWindow.createWindowMiddleSize(x, y);
    this.addWindow(this.subject);
  }

  start() {
    this.subject.setCenteredAlignment();
    this.subject.show();
    const line = "Hello World";
    this.subject.addText(line.repeat(1) + ' 0');
    this.subject.addText(line.repeat(1) + ' 1');
    this.subject.addText(line.repeat(2) + ' 2');
    this.subject.addText(line.repeat(3) + ' 3');
    this.test('Deve alinhar o texto no final!', () => {
      this.subject.setHorizontalAlignContent(GameConst.END);
      this.subject.renderContents();
      this.subject.setCenteredAlignment();
      this.subject.open();
    }, () => {
      const xCenterAlignPrimaryLine = 288;
      const xCenterAlignSecondaryLine = 288;
      const xCenterAlignTertiaryLine = 145;;
      const xCenterAlignQuaternaryLine = 2;
      const yCenterAlignPrimaryLine = 0;
      const yCenterAlignSecondaryLine = 36;
      const yCenterAlignTertiaryLine = 72;
      const yCenterAlignQuaternaryLine = 108;
      this.assertTrue('Foi alinhado no final?', this.subject.isWasTextDrawnPositions(xCenterAlignPrimaryLine, yCenterAlignPrimaryLine));
      this.assertTrue('Foi alinhado no final?', this.subject.isWasTextDrawnPositions(xCenterAlignSecondaryLine, yCenterAlignSecondaryLine));
      this.assertTrue('Foi alinhado no final?', this.subject.isWasTextDrawnPositions(xCenterAlignTertiaryLine, yCenterAlignTertiaryLine));
      this.assertTrue('Foi alinhado no final?', this.subject.isWasTextDrawnPositions(xCenterAlignQuaternaryLine, yCenterAlignQuaternaryLine));
    });
  }
}
class SetTextColorTextWindowTest extends SceneTest {
  name = 'SetTextColorTextWindowTest';

  create() {
    const x = 0;
    const y = 0;
    this.subject = TextWindow.createWindowMiddleSize(x, y);
    this.addWindow(this.subject);
  }

  start() {
    this.subject.setCenteredAlignment();
    this.subject.show();
    const line = "Hello World";
    const normalColor = TextWindow.appendChangeColor(GameColorIndexs.NORMAL_COLOR); 
    const systemColor = TextWindow.appendChangeColor(GameColorIndexs.SYSTEM_COLOR); 
    this.subject.changeTextColorHere(GameColorIndexs.DAMAGE_COLOR);
    this.subject.addText(`Primeira linha deve ser de cor!`);
    this.subject.changeTextColorHere(GameColorIndexs.NORMAL_COLOR);
    this.subject.addText(`Texto normal${systemColor} mudança de cor${normalColor} texto normal!`);
    this.test('Deve mudar cor do texto!', () => {
      this.subject.setHorizontalAlignContent(GameConst.START);
      this.subject.renderContents();
      this.subject.setCenteredAlignment();
      this.subject.open();
    }, () => {
      const assertOne = /^\\c\[(\d+)\](.*)$/;
      const assertTwo = /^\\c\[(\d+)\](.*?)\\c\[(\d+)\](.*?)\\c\[(\d+)\](.*?)!$/;
      const history = this.subject.getHistory();
      const lineOne = history[0].content;
      const lineTwo = history[1].content;
      const validateOne = assertOne.test(lineOne);
      const validateTwo = assertTwo.test(lineTwo);
      this.assertTrue('A primeira linha é colorida?', validateOne);
      this.assertTrue('O texto mudou de cor no centro?', validateTwo);
    });
  }
}
// tests BOARD WINDOW
class UpdatingBoardWindowTest extends SceneTest {
  name = 'UpdatingBoardWindowTest';

  create() {
    this.subject = BoardWindow.createWindowFullSize(0, 0);
    this.addWindow(this.subject);
  }

  start() {
    this.subject.setCenteredAlignment();
    this.subject.refresh();
    this.subject.open();
    const updateRedPoints = BoardWindow.createValueUpdate(GameConst.RED_POINTS, 10);
    const updateBluePoints = BoardWindow.createValueUpdate(GameConst.BLUE_POINTS, 10);
    const updateGreenPoints = BoardWindow.createValueUpdate(GameConst.GREEN_POINTS, 10);
    const updateBlackPoints = BoardWindow.createValueUpdate(GameConst.BLACK_POINTS, 10);
    const updateWhitePoints = BoardWindow.createValueUpdate(GameConst.WHITE_POINTS, 10);
    const updateDeckPoints = BoardWindow.createValueUpdate(GameConst.NUM_CARDS_IN_DECK, 10);
    const updateHandPoints = BoardWindow.createValueUpdate(GameConst.NUM_CARDS_IN_HAND, 10);
    const manyUpdates = [
      updateRedPoints,
      updateBluePoints,
      updateGreenPoints,
      updateBlackPoints,
      updateWhitePoints,
      updateDeckPoints,
      updateHandPoints
    ];
    manyUpdates.forEach(update => {
      this.test('Deve atualizar os pontos!', () => {
        this.subject.updateValues(update);
      }, () => {
        this.assertWasTrue('Foi atualizada?', this.subject.isUpdating);
      });
    });
    this.test('Deve atualizar todos os pontos!', () => {
      this.subject.reset();
      this.subject.updateValues(manyUpdates);
    }, () => {
      this.assertWasTrue('Foi atualizada?', this.subject.isUpdating);
    });
  }

}
// tests BATTLE POINTS WINDOW
class UpdatingBattlePointsWindowTest extends SceneTest {
  name = 'UpdatingBattlePointsWindowTest';

  create() {
    this.subject = BattlePointsWindow.create(0, 0);
    this.addWindow(this.subject);
  }

  start() {
    this.subject.setCenteredAlignment();
    this.subject.refresh();
    this.subject.open();
    const updateAttackPoints = BattlePointsWindow.createValueUpdate(GameConst.ATTACK_POINTS, 30);
    const updateHealtPoints = BattlePointsWindow.createValueUpdate(GameConst.HEALTH_POINTS, 30);
    const manyUpdates = [
      updateAttackPoints,
      updateHealtPoints
    ];
    manyUpdates.forEach(update => {
      this.test('Deve atualizar os pontos!', () => {
        this.subject.updateValues(update);
      }, () => {
        this.assertWasTrue('Foi atualizada?', this.subject.isUpdating);
      });
    });
    this.test('Deve atualizar todos os pontos!', () => {
      this.subject.reset();
      this.subject.updateValues(manyUpdates);
    }, () => {
      this.assertWasTrue('Foi atualizada?', this.subject.isUpdating);
    });
  }
}
// tests TRASH WINDOW
class UpdatingTrashWindowTest extends SceneTest {
  name = 'UpdatingTrashWindowTest';

  create() {
    this.subject = TrashWindow.create(0, 0);
    this.addWindow(this.subject);
  }

  start() {
    this.subject.setCenteredAlignment();
    this.subject.refresh();
    this.subject.open();
    const updateCardsNumber = TrashWindow.createValueUpdate(GameConst.NUM_CARDS_IN_TRASH, 10);
    this.test('Deve atualizar os pontos!', () => {
      this.subject.updateValues(updateCardsNumber);
    }, () => {
      this.assertWasTrue('Foi atualizada?', this.subject.isUpdating);
    });
  }
}
// tests SCORE WINDOW
class UpdatingScoreWindowTest extends SceneTest {
  name = 'UpdatingScoreWindowTest';

  create() {
    this.subject = ScoreWindow.create(0, 0);
    this.addWindow(this.subject);
  }

  start() {
    this.subject.setCenteredAlignment();
    this.subject.open();
    this.test('Deve abrir e renderizar!', () => {
      this.subject.changeScore(1);
    }, () => {
      this.assertWasTrue('Foi atualizada?', this.subject.isUpdating);
    }, 2);
    this.test('Deve abrir e renderizar!', () => {
      this.subject.changeScore(2);
    }, () => {
      this.assertWasTrue('Foi atualizada?', this.subject.isUpdating);
    }, 2);
  }
}

class Window_BaseTest extends Window_Base {
  updateTone() {
    this.setTone(255, 0, 0);
  }
}

class WindowTest extends SceneTest {
  name = 'WindowTest';

  create() {
    this.subject = new Window_BaseTest(new Rectangle(0, 0, 100, 100));
    this.subject.setTone(255, 0, 0);
    this.addWindow(this.subject);
  }

  start() {
    this.test('Deve abrir e renderizar!', () => {
      this.subject.open();
    }, () => {
      this.assertTrue('Esta aberta?', this.subject.isOpen());
    }, 5);
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
  }

  createDisplayObjects() {
    this.createWindowLayer();
  }

  start() {
    super.start();
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
class CardBattleTestScene extends Scene_Message {
  initialize() {
    super.initialize();
    this.css = 'color: #FFFFFF; font-size: 12px; padding: 5px;';
    this.tests = [];
    this._test = null;
  }

  create() {
    super.create();
    this.createWindowLayer();
    this.createTests();
  }

  data() {
    const cardSpriteTests = [
      StartClosedAndStartOpenCardSpriteTest,
      CloseAndOpenCardSpriteTest,
      MoveCardSpriteTest,
      DisableAndEnableCardSpriteTest,
      HoveredCardSpriteTest,
      SelectedCardSpriteTest,
      FlashCardSpriteTest,
      DamageAnimationCardSpriteTest,
      UpdatingPointsCardSpriteTest,
      ZoomAndZoomoutCardSpriteTest,
      LeaveCardSpriteTest,
      QuakeCardSpriteTest,
      FlipCardSpriteTest,
      IluminatedCardSpriteTest
    ];
    const cardsetTests = [
      SetBackgroundAndStartPositionCardsetSpriteTest,
      SetCardsCardsetSpriteTest,
      StartPositionCardsCardsetSpriteTest,
      StartListCardsCardsetSpriteTest,
      StartClosedAndOpenCardsCardsetSpriteTest,
      StartClosedAndOpenCardsDelayCardsetSpriteTest,
      MoveCardsToListCardsetSpriteTest,
      MoveCardsToListDelayCardsetSpriteTest,
      MoveCardsToPositionCardsetSpriteTest,
      AddCardAndMoveToListCardsetSpriteTest,
      AddCardAndMoveToListDelayCardsetSpriteTest,
      SelectModeCardsetSpriteTest,
      DisableAndEnableCardsCardsetSpriteTest,
      SelectModeAndEnableChoiceCardsetSpriteTest,
      AnimateQuakeCardsCardsetSpriteTest,
      AnimateFlashCardsCardsetSpriteTest,
      AnimateDamageCardsCardsetSpriteTest,
    ];
    const CardBattleWindowBaseTests = [
      OpenAndCloseCardBattleWindowBaseTest,
      ChangeColorCardBattleWindowBaseTest,
      SetMiddleSizeCardBattleWindowBaseTest,
      SetFullSizeCardBattleWindowBaseTest,
      AlignMiddleSizeCardBattleWindowBaseTest,
      AlignFullSizeCardBattleWindowBaseTest,
    ];
    const textWindowTests = [
      DrawTextStartAlignFullSizeTextWindowTest,
      DrawTextStartAlignMiddleSizeTextWindowTest,
      DrawTextCenterAlignFullSizeTextWindowTest,
      DrawTextCenterAlignMiddleSizeTextWindowTest,
      DrawTextEndAlignFullSizeTextWindowTest,
      DrawTextEndAlignMiddleSizeTextWindowTest,
      SetTextColorTextWindowTest,
    ];
    const boardWindowTests = [
      UpdatingBoardWindowTest,
    ];
    const battlePointsWindow = [
      UpdatingBattlePointsWindowTest,
    ];
    const trashWindow = [
      UpdatingTrashWindowTest,
    ];
    const scoreWindow = [
      UpdatingScoreWindowTest,
    ];
    const others = [
      WindowTest
    ];
    return [
      ...cardSpriteTests,
      ...cardsetTests,
      ...CardBattleWindowBaseTests,
      ...textWindowTests,
      ...boardWindowTests,
      ...battlePointsWindow,
      ...trashWindow,
      ...scoreWindow,
      // ...others,
    ];
  }

  async createTests() {
    this.tests = this.data();
    this.tests = this.tests.map(test => {
      const instance = new test(this);
      instance.create();
      return instance;
    });
  }

  start() {
    super.start();
    this.startTests();
  }

  async startTests() {
    let results = [];
    let index = 0;
    for (const test of this.tests) {
      this._test = test;
      const result = await this._test.run();
      results.push(result);
      await this.clearScene();
      this._test = null;
      index++;
    }
    this.printResults(results);
    this.printResultsTotals(results);
  }

  printResults(results) {
    results.forEach(test => {
      const { passed: isTestPassed, testName, assertsResult } = test;
      if (isTestPassed) {
        this.printSuccess(`Teste: ${test.testName} passou!`);
      } else {
        this.printTestError(`Teste: ${test.testName} falhou!`);
        assertsResult.forEach(allAsserts => {
          const { passed: isAssertsPassed, assertsName, asserts } = allAsserts;
          if (!isAssertsPassed) {
              this.printAssertError(`Assert: ${assertsName}`);
              asserts.forEach(assert => {
                const { passed: isAssertPassed, title, message } = assert;
                if (!isAssertPassed) {
                  this.printError(`${title}: ${message}`);
                }
              });
          }
        });
      }
    });
  }

  printResultsTotals(results) {
    const total = results.length;
    const success = results.filter(result => result.passed === true).length;
    const failed = total - success;
    this.printInfo(`Total de testes: ${total}`);
    this.printSuccess(`Testes passados: ${success}`);
    this.printError(`Testes falhados: ${failed}`);
  }

  printInfo(...msg) {
    console.log(`%c${msg.map(t => t.toString())}`,`background: #5DADE2; ${this.css}`);
  }

  printError(...msg) {
    console.log(`%c${msg.map(t => t.toString())}`,`background: #AA0000; ${this.css}`);
  }

  printTestError(...msg) {
    console.log(`%c${msg.map(t => t.toString())}`,`background: #800000; ${this.css}`);
  }

  printAssertError(...msg) {
    console.log(`%c${msg.map(t => t.toString())}`,`background: #400000; ${this.css}`);
  }

  printSuccess(...msg) {
    console.log(`%c${msg.map(t => t.toString())}`,`background: #008000; ${this.css}`);
  }

  update() {
    if (this.isActive()) {
      if (this._test) this._test.update();
    }
    super.update();
  }

  isActive() {
    return !this.isBusy();
  }

  removeWindow(window) {
    this._windowLayer.removeChild(window);
  };

  clearScene() {
    return new Promise(resolve => {
      const children = this.children;
      while (children.length > 1) {
        children.forEach(async child => {
          if (child === this._windowLayer) return;
          child.destroy();
          await this.removeChild(child);
        });
      }
      const windowChildren = this._windowLayer.children;
      while (windowChildren.length) {
        windowChildren.forEach(async window => {
          window.destroy();
          await this._windowLayer.removeChild(window);
        });
      }
      resolve(true);
    });
  }
}
class CardBattleManagerDrawPhaseState {
  _manager;

  constructor(manager) {
    this._manager = manager;
    this._manager.phaseChanged();
  }

  update() {
    // TODO: Implement update
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

})();

