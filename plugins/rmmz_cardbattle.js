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
  LEFT: 'LEFT',
  CENTER: 'CENTER',
  RIGHT: 'RIGHT',
  END: 'END',
  TOP: 'TOP',
  ABOVE_MIDDLE: 'ABOVE_MIDDLE',
  MIDDLE: 'MIDDLE',
  BELOW_MIDDLE: 'BELOW_MIDDLE',
  BOTTOM: 'BOTTOM',
  RED_COLOR: 'RED_COLOR',
  BLUE_COLOR: 'BLUE_COLOR',
  FPS: 60,
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

const GameColors = {
  DEFAULT: 'DEFAULT',
  BLUE: 'BLUE',
  RED: 'RED',
  GREEN: 'GREEN',
  BLACK: 'BLACK',
  WHITE: 'WHITE',
  BROWN: 'BROWN',
  FADEDRED: 'FADEDRED',
  FADEDGREEN: 'FADEDGREEN',
  FADEDBLUE: 'FADEDBLUE',
  FADEDWHITE: 'FADEDWHITE',
  FADEDBLACK: 'FADEDBLACK',
  FADEDBROWN: 'FADEDBROWN',
  //
  LIGHTBLUE: 'LIGHTBLUE',
  LIGHTRED: 'LIGHTRED',
  LIGHTGREEN: 'LIGHTGREEN',
  LIGHTBLUE2: 'LIGHTBLUE2',
  LIGHTPURPLE: 'LIGHTPURPLE',
  LIGHTYELLOW: 'LIGHTYELLOW',
  LIGHTGRAY: 'LIGHTGRAY',
  GRAY: 'GRAY',
  BLUE2: 'BLUE2',
  PURPLE: 'PURPLE',
  YELLOW: 'YELLOW',
  BLUE3: 'BLUE3',
  YELLOW2: 'YELLOW2',
  RED2: 'RED2',
  BLACK2: 'BLACK2', 
  ORANGE: 'ORANGE',
  YELLOW3: 'YELLOW3',
  GREEN2: 'GREEN2',
  GREEN3: 'GREEN3',
  LIGHTGREEN2: 'LIGHTGREEN2',
  BLUE4: 'BLUE4',
  PINK: 'PINK',
  GREEN4: 'GREEN4',
  LIGHTGREEN3: 'LIGHTGREEN3',
  VIOLET: 'VIOLET',
  LIGHTVIOLET: 'LIGHTVIOLET',
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

class NumberHelper {
  static calculateTimeInterval(origin = 0, destiny = 0, duration = 0) {
    const distance = Math.abs(origin - destiny);
    const time = Math.abs(duration * GameConst.FPS);
    return (distance / (time || 1)) || (Graphics.width / 30);
  }
}

class ObjectHelper {
  static copyObject(obj, maxDepth = 3, currentDepth = 0) {
    const propsToCopy = [
      '_actionsQueue',
      '_actionsQueueWithDelay',
      '_status',
      '_positiveIntensityEffect',
      '_intensityEffect',
      '_opacityEffect',
      '_type',
      '_color',
      '_figure',
      '_backImage',
      '_behaviors',
      '_turned',
      '_disabled',
      '_attackPoints',
      '_healthPoints',
      '_contentLayer',
      '_disabledLayer',
      '_flashedLayer',
      '_hoveredLayer',
      '_selectedLayer',
      '_sprites',
      '_enableSelected',
      '_selectedIndexs',
      '_openness',
      'visible',
    ];
    const newObj = Object.create(Object.getPrototypeOf(obj));
    for (const key in obj) {
      if (obj.hasOwnProperty && obj.hasOwnProperty(key) && propsToCopy.includes(key)) {
        const value = obj[key];
        if (typeof value === 'object' && value !== null && currentDepth < maxDepth && !Array.isArray(value)) {
          newObj[key] = ObjectHelper.copyObject(value, maxDepth, currentDepth + 1);
        } else {
          if (Array.isArray(value)) {
            newObj[key] = value.map(item => ObjectHelper.copyObject(item, maxDepth, currentDepth + 1));
          } else {
            newObj[key] = value;
          }
        }
      }
    }
    return newObj;
  }

  static mergeObjects(originalObj, dataToAdd) {
    if (typeof originalObj !== 'object' || originalObj === null ||
      typeof dataToAdd !== 'object' || dataToAdd === null) {
      throw new Error('Os argumentos devem ser objetos');
    }
    for (const key in dataToAdd) {
      if (dataToAdd.hasOwnProperty(key)) {
        originalObj[key] = dataToAdd[key];
      }
    }
    return originalObj;
  }

  static compareObjects(object1, object2) {
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
}

class ColorHelper {
  static getColorIndex(color) {
    switch (color) {
      case GameColors.DEFAULT:
        return 0;
      case GameColors.LIGHTBLUE:
        return 1;
      case GameColors.LIGHTRED:
        return 2;
      case GameColors.LIGHTGREEN:
        return 3;
      case GameColors.LIGHTBLUE2:
        return 4;
      case GameColors.LIGHTPURPLE:
        return 5;
      case GameColors.LIGHTYELLOW:
        return 6;
      case GameColors.LIGHTGRAY:
        return 7;
      case GameColors.GRAY:
        return 8;
      case GameColors.BLUE:
        return 9;
      case GameColors.RED:
        return 10;
      case GameColors.GREEN:
        return 11;
      case GameColors.BLUE2:
        return 12;
      case GameColors.PURPLE:
        return 13;
      case GameColors.YELLOW:
        return 14;
      case GameColors.BLACK:
        return 15;
      case GameColors.BLUE3:
        return 16;
      case GameColors.YELLOW2:
        return 17;
      case GameColors.RED2:
        return 18;
      case GameColors.BLACK2:
        return 19;
      case GameColors.ORANGE:
        return 20;
      case GameColors.YELLOW3:
        return 21;
      case GameColors.GREEN2:
        return 22;
      case GameColors.GREEN3:
        return 23;
      case GameColors.LIGHTGREEN2:
        return 24;
      case GameColors.BROWN:
        return 25;
      case GameColors.BLUE4:
        return 26;
      case GameColors.PINK:
        return 27;
      case GameColors.GREEN4:
        return 28;
      case GameColors.LIGHTGREEN3:
        return 29;
      case GameColors.VIOLET:
        return 30;
      case GameColors.LIGHTVIOLET:
        return 31;
      default:
        return 0;
    }
  }

  static getColorHex(color) {
    switch (color) {
      case GameColors.RED:
        return '#ff0000';
      case GameColors.GREEN:
        return '#00ff00';
      case GameColors.BLUE:
        return '#0000ff';
      case GameColors.WHITE:
        return '#e5e5e5';
      case GameColors.BLACK:
        return '#191919';
      case GameColors.BROWN:
        return '#a52a2a';
      case GameColors.FADEDRED: 
        return '#990000';
      case GameColors.FADEDGREEN: 
        return '#009900';
      case GameColors.FADEDBLUE: 
        return '#000099';
      case GameColors.FADEDWHITE: 
        return '#959595';
      case GameColors.FADEDBLACK: 
        return '#101010';
      case GameColors.FADEDBROWN: 
        return '#852828';
      case GameColors.DEFAULT:
        return '#ffffff';
      default:
        return '#ffffff';
    }
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

  static generateGameCard(color) {
    return CardGenerator.generateCard(1, color);
  }

  static generateCard(type, color) {
    return {
      type: type ? type : (Math.floor(Math.random() * 3) + 1),
      color: color ? color : Math.floor(Math.random() * 6) + 1,
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
class TextWindow extends Window_Base {
  static createWindowOneFourthSize(x, y, text) {
    const width = Graphics.boxWidth / 4;
    const height = undefined;
    return TextWindow.create(x, y, width, height, text);
  }

  static create(x, y, width, h, text = []) {
    if (!Array.isArray(text)) {
      throw new Error('text must be an array!');
    }
    const windowPadding = TextWindow.windowPadding() * 2;
    const textHeight = TextWindow.textHeight() * Math.max(text.length, 0);
    const height = windowPadding + textHeight;
    const rect = new Rectangle(x, y, width, height);
    return new TextWindow(rect, text);
  }

  static windowPadding() {
    return 12;
  }

  static textHeight() {
    return 36;
  }

  static createWindowMiddleSize(x, y, text) {
    const width = Graphics.boxWidth / 2;
    const height = undefined;
    return TextWindow.create(x, y, width, height, text);
  }

  static createWindowThreeFourthSize(x, y, text) {
    const width = Graphics.boxWidth * 3 / 4;
    const height = undefined;
    return TextWindow.create(x, y, width, height, text);
  }

  static createWindowFullSize(x, y, text) {
    const width = Graphics.boxWidth;
    const height = undefined;
    return TextWindow.create(x, y, width, height, text);
  }

  static getVerticalAlign(position, window) {
    switch (position) {
      case GameConst.ABOVE_MIDDLE:
        return (Graphics.boxHeight / 4) - ((window.height || 0) / 2);
        break;
      case GameConst.MIDDLE:
        return (Graphics.boxHeight / 2) - ((window.height || 0) / 2);
        break;
      case GameConst.BELOW_MIDDLE:
        return (Graphics.boxHeight * 3 / 4) - ((window.height || 0) / 2);
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

  static setTextColor(text, color) {
    let colorIndex = ColorHelper.getColorIndex(color);
    return `\\c[${colorIndex}]${text}`;
  }

  initialize(rect, text) {
    super.initialize(rect);
    this._text = text || [];
    this._textAlignment = GameConst.LEFT;
    this._windowColor = GameConst.DEFAULT_COLOR;
    this._history = [];
    this.closed();
    this.refresh();
  }

  closed() {
    this._openness = 0;
    this.visible = false;
    this.deactivate();
  }

  refresh() {
    this.contents.clear();
    if (this.hasText()) this.drawTexts();
  }

  hasText() {
    return this._text && this._text.length > 0;
  }

  drawTexts() {
    const texts = this.processTexts(this._text);
    const maxWidth = this.getTextMaxWidth(texts);
    texts.forEach((text, index) => {
      const state = this.getTextState(text);
      const textWidth = state.outputWidth;
      const textProcessed = state.raw;
      const aligment = this.getTextAlignment();
      const x = this.getXAlignment(textWidth, maxWidth, aligment);
      const rect = this.lineRect(index, x);
      this.addHistory('TEXT_' + index, textProcessed);
      this.drawTextEx(text, rect.x, rect.y, rect.width);
    });
  }

  flushTextState(textState) {
    textState.raw += textState.buffer || '';
    textState.raw = textState.raw.replace(/undefined/g, "");
    super.flushTextState(textState);
  }

  processColorChange(colorIndex) {
    const length = this._history.filter(h => /COLOR/i.test(h.symbol)).length;
    this.addHistory('COLOR_' + length, colorIndex);
    super.processColorChange(colorIndex);
  }

  addHistory(symbol, content) {
    const index = this._history.findIndex(h => h.symbol === symbol);
    if (index >= 0) {
      this._history[index].content = content;
      return false;
    }
    const history = this.createHistory(symbol, content);
    this._history.push(history);
  }

  createHistory(symbol, content) {
    return { symbol, content };
  }

  processTexts(text) {
    return text.map(txt => {
      if (Array.isArray(txt)) {
        return txt.reduce((acc, substring, index) => index ? `${acc} ${substring}` : `${acc}${substring}`)
      }
      return txt;
    });
  }

  getTextMaxWidth(text) {
    return text.reduce((max, txt) => {
      const state = this.getTextState(txt);
      const width = state.outputWidth;
      return Math.max(max, width);
    }, 0);
  }

  getTextState(txt) {
    const textState = this.createTextState(txt, 0, 0, 0);
    textState.drawing = false;
    this.processAllText(textState);
    return textState;
  }

  getTextAlignment() {
    this.addHistory('TEXT_ALIGN', this._textAlignment);
    return this._textAlignment;
  }

  getXAlignment(textWidth, maxWidth, align) {
    maxWidth = Math.max(maxWidth, this.width - this.padding * 2);
    switch (align) {
      case GameConst.CENTER:
        return (maxWidth / 2) - (textWidth / 2);
      case GameConst.RIGHT:
        return maxWidth - textWidth;
      default: // GameConst.LEFT
        return 0;
    }
  }

  lineRect(index, x = 0) {
    const y = index * this.lineHeight();
    const width = this.contentsWidth();
    const height = this.lineHeight();
    return new Rectangle(x, y, width, height);
  }

  update() {
    super.update();
    this.updateTone();
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

  open() {
    this.visible = true;
    this.activate();
    super.open();
  }

  alignStartTop() {
    this.setHorizontalAlign(GameConst.START);
    this.setVerticalAlign(GameConst.TOP);
  }

  setHorizontalAlign(position) {
    this.x = TextWindow.getHorizontalAlign(position, this);
  }

  setVerticalAlign(position) {
    this.y = TextWindow.getVerticalAlign(position, this);
  }

  alignCenterTop() {
    this.setHorizontalAlign(GameConst.CENTER);
    this.setVerticalAlign(GameConst.TOP);
  }

  alignEndTop() {
    this.setHorizontalAlign(GameConst.END);
    this.setVerticalAlign(GameConst.TOP);
  }

  alignStartMiddle() {
    this.setHorizontalAlign(GameConst.START);
    this.setVerticalAlign(GameConst.MIDDLE);
  }

  alignCenterAboveMiddle() {
    this.setHorizontalAlign(GameConst.CENTER);
    this.setVerticalAlign(GameConst.ABOVE_MIDDLE);
  }

  alignCenterMiddle() {
    this.setHorizontalAlign(GameConst.CENTER);
    this.setVerticalAlign(GameConst.MIDDLE);
  }

  alignCenterBelowMiddle() {
    this.setHorizontalAlign(GameConst.CENTER);
    this.setVerticalAlign(GameConst.BELOW_MIDDLE);
  }

  alignEndMiddle() {
    this.setHorizontalAlign(GameConst.END);
    this.setVerticalAlign(GameConst.MIDDLE);
  }

  alignStartBottom() {
    this.setHorizontalAlign(GameConst.START);
    this.setVerticalAlign(GameConst.BOTTOM);
  }

  alignCenterBottom() {
    this.setHorizontalAlign(GameConst.CENTER);
    this.setVerticalAlign(GameConst.BOTTOM);
  }

  alignEndBottom() {
    this.setHorizontalAlign(GameConst.END);
    this.setVerticalAlign(GameConst.BOTTOM);
  }

  changeDefaultColor() {
    this._windowColor = GameConst.DEFAULT_COLOR;
  }

  changeBlueColor() {
    this._windowColor = GameConst.BLUE_COLOR;
  }

  changeRedColor() {
    this._windowColor = GameConst.RED_COLOR;
  }

  alignTextLeft() {
    this._textAlignment = GameConst.LEFT;
    this.refresh();
  }

  alignTextCenter() {
    this._textAlignment = GameConst.CENTER;
    this.refresh();
  }

  alignTextRight() {
    this._textAlignment = GameConst.RIGHT;
    this.refresh();
  }

  isTextWasDrawing(symbol, content) {
    return this.isHistory(symbol, content);
  }

  isHistory(symbol, content) {
    const history = this.getHistory(symbol);
    if (!history.length) return false;
    return history.some(h => h.content === content);
  }

  getHistory(symbol) {
    return this._history.filter(history => history.symbol === symbol);
  }

  isOneFourthSize() {
    return this.width === Graphics.boxWidth / 4;
  }
  
  isMiddleSize() {
    return this.width === Graphics.boxWidth / 2;
  }

  isThreeFourthSize() {
    return this.width === Graphics.boxWidth * 3 / 4;
  }

  isFullsize() {
    return this.width === Graphics.boxWidth;
  }

  isBlueColor() {
    return this._windowColor === GameConst.BLUE_COLOR;
  }

  isRedColor() {
    return this._windowColor === GameConst.RED_COLOR;
  }

  isDefaultColor() {
    return this._windowColor === GameConst.DEFAULT_COLOR;
  }

  opened() {
    this._openness = 255;
    this.visible = true;
    this.activate();
  }

  isAvailable() {
    return !this.isBusy();
  }

  isBusy() {
    return this.isOpening() || this.isClosing();
  }

  isOpen() {
    return super.isOpen();
  }
}
class CommandWindow extends Window_Command {
  static create(x, y, text = [], commands = []) {
    if (!Array.isArray(text)) {
      throw new Error('text must be an array!');
    }
    const width = Graphics.boxWidth;
    const windowPadding = CommandWindow.windowPadding() * 2;
    const textHeight = CommandWindow.textHeight() * Math.max(text.length, 0);
    const itemsPadding = CommandWindow.itemPadding() * Math.max(commands.length - 1, 0);
    const itemsHeight = CommandWindow.itemHeight() * Math.max(commands.length, 0);
    const height = windowPadding + textHeight + itemsPadding + itemsHeight;
    const rect = new Rectangle(x, y, width, height);
    return new CommandWindow(rect, text, commands);
  }
  
  static windowPadding() {
    return 12;
  }

  static itemPadding() {
    return 8;
  }

  static textHeight() {
    return 36;
  }

  static itemHeight() {
    return 40;
  }

  static createCommand(name, symbol, handler, enabled = true, ext = null) {
    if (!name || !symbol) {
      throw new Error('Command name and symbol are required!');
    }
    if (typeof handler !== 'function') {
      throw new Error('Command handler must be a function!');
    }
    return { name, symbol, handler, enabled, ext };
  }

  static setTextColor(text, color) {
    let colorIndex = ColorHelper.getColorIndex(color);
    return `\\c[${colorIndex}]${text}`;
  }

  static getVerticalAlign(position, window, parent) {
    const parentY = parent?.y || 0;
    const boxHeight = (Graphics.boxHeight - parentY);
    switch (position) {
      case GameConst.MIDDLE:
        return ((Graphics.boxHeight / 2) - parentY) - ((window.height || 0) / 2);
        break;
      case GameConst.BOTTOM:
        return boxHeight - ((window.height || 0) + (boxHeight / 6));
        break;
      default: //TOP
        return boxHeight / 6;
    }
  }

  initialize(rect, text, commands) {
    super.initialize(rect);
    this._actionQueue = [];
    this._history = [];
    this._commands = commands;
    this._commandTextAlignment = GameConst.LEFT;
    this._text = text || [];
    this._textAlignment = GameConst.LEFT;
    this._windowColor = GameConst.DEFAULT_COLOR;
    this._iconset = "IconSet";
    this.closed();
    this.refresh();
  }

  closed() {
    this._openness = 0;
    this.visible = false;
    this.deactivate();
  }

  refresh() {
    this.clearCommandList();
    this.makeCommandList();
    this.setHandlers();
    this.clearContents();
    this.drawAllItems();
  }

  makeCommandList() {
    if (!this.hasCommandsAndHandlers()) return false;
    this._commands.forEach(command => {
      const { name, symbol, enabled, ext } = command;
      this.addCommand(name, symbol, enabled, ext);
    });
  }

  hasCommandsAndHandlers() {
    return this._commands && this._commands?.length > 0;
  }

  setHandlers() {
    if (!this.hasCommandsAndHandlers()) return false;
    this._commands.forEach(command => {
      const { symbol, handler } = command;
      this.setHandler(symbol, handler);
    });
  }

  clearContents() {
    this.contents.clear();
    this.contentsBack.clear();
  }
  
  drawAllItems() {
    if (this.hasText()) this.drawTexts();
    if (this.hasCommands()) super.drawAllItems();
  }

  hasText() {
    return this._text && this._text.length > 0;
  }

  drawTexts() {
    const texts = this.processTexts(this._text);
    const maxWidth = this.getTextMaxWidth(texts);
    texts.forEach((text, index) => {
      const state = this.getTextState(text);
      const textWidth = state.outputWidth;
      const textProcessed = state.raw;
      const aligment = this.getTextAlignment();
      const x = this.getXAlignment(textWidth, maxWidth, aligment);
      const rect = this.lineRect(index, x);
      this.addHistory('TEXT_' + index, textProcessed);
      this.drawTextEx(text, rect.x, rect.y, rect.width);
    });
  }

  processTexts(text) {
    return text.map(txt => {
      if (Array.isArray(txt)) {
        return txt.reduce((acc, substring, index) => index ? `${acc} ${substring}` : `${acc}${substring}`)
      }
      return txt;
    });
  }

  flushTextState(textState) {
    textState.raw += textState.buffer || '';
    textState.raw = textState.raw.replace(/undefined/g, "");
    super.flushTextState(textState);
  }

  processColorChange(colorIndex) {
    const length = this._history.filter(h => /COLOR/i.test(h.symbol)).length;
    this.addHistory('COLOR_' + length, colorIndex);
    super.processColorChange(colorIndex);
  }

  itemRect(index) {
    const maxCols = this.maxCols();
    const itemWidth = this.itemWidth();
    const itemHeight = this.itemHeight();
    const colSpacing = this.colSpacing();
    const rowSpacing = this.rowSpacing();
    const col = index % maxCols;
    const row = Math.floor(index / maxCols);
    const x = col * itemWidth + colSpacing / 2 - this.scrollBaseX();
    const addMargin = (this._text?.length || 0) * this.lineHeight();
    const y = (row * itemHeight + rowSpacing / 2 - this.scrollBaseY()) + addMargin;
    const width = itemWidth - colSpacing;
    const height = itemHeight - rowSpacing;
    return new Rectangle(x, y, width, height);
  }

  getTextMaxWidth(text) {
    return text.reduce((max, txt) => {
      const state = this.getTextState(txt);
      const width = state.outputWidth;
      return Math.max(max, width);
    }, 0);
  }

  getTextState(txt) {
    const textState = this.createTextState(txt, 0, 0, 0);
    textState.drawing = false;
    this.processAllText(textState);
    return textState;
  }

  getTextAlignment() {
    this.addHistory('TEXT_ALIGN', this._textAlignment);
    return this._textAlignment;
  }

  getXAlignment(textWidth, maxWidth, align) {
    maxWidth = Math.max(maxWidth, this.width - this.padding * 2);
    switch (align) {
      case GameConst.CENTER:
        return (maxWidth / 2) - (textWidth / 2);
      case GameConst.RIGHT:
        return maxWidth - textWidth;
      default: // GameConst.LEFT
        return 0;
    }
  }

  lineRect(index, x = 0) {
    const y = index * this.lineHeight();
    const width = this.contentsWidth();
    const height = this.lineHeight();
    return new Rectangle(x, y, width, height);
  }

  addHistory(symbol, content) {
    const index = this._history.findIndex(h => h.symbol === symbol);
    if (index >= 0) {
      this._history[index].content = content;
      return false;
    }
    const history = this.createHistory(symbol, content);
    this._history.push(history);
  }

  createHistory(symbol, content) {
    return { symbol, content };
  }

  hasCommands() {
    return this.maxItems() > 0;
  }

  update() {
    super.update();
    if (this.hasActions() && this.isAvailable()) this.executeAction();
    this.updateTone();
  }

  hasActions() {
    return this._actionQueue.length > 0;
  }

  isAvailable() {
    return !this.isBusy();
  }

  isBusy() {
    return this.isOpening() || this.isClosing();
  }

  executeAction() {
    const action = this._actionQueue[0];
    const executed = action.execute();
    if (executed) {
      this._actionQueue.shift();
    }
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

  open() {
    this.addAction(this.commandOpen);
  }

  addAction(fn, ...params) {
    const action = this.createAction(fn, ...params);
    this._actionQueue.push(action);
  }

  createAction(fn, ...params) {
    const action = { 
      fn: fn.name || 'anonymous',
      execute: () => {
        const result = fn.call(this, ...params);
        return typeof result === 'boolean' ? result : true;
      }
    };
    return action;
  }

  commandOpen() {
    if (this.isOpened()) return true;
    this.visible = true;
    this.activate();
    super.open();
  }

  isOpened() {
    return this._openness === 255;
  }

  close() {
    this.addAction(this.commandClose);
  }

  commandClose() {
    if (this.isClosed()) return true;
    super.close();
  }

  alignTop() {
    this.addAction(this.commandAlign, GameConst.TOP);
  }

  commandAlign(verticalAlign) {
    if (this.isBusy()) return false;
    this.setVerticalAlign(verticalAlign);
    this.setHorizontalAlign();
  }

  setVerticalAlign(position) {
    this.y = CommandWindow.getVerticalAlign(position, this, this.parent);
  }

  setHorizontalAlign() {
    const parentX = this.parent?.x || 0;
    this.x = -parentX;
  }

  alignMiddle(parent) {
    this.addAction(this.commandAlign, GameConst.MIDDLE, parent);
  }

  alignBottom() {
    this.addAction(this.commandAlign, GameConst.BOTTOM);
  }

  changeBlueColor() {
    this.addAction(this.commandChangeBlueColor);
  }

  commandChangeBlueColor() {
    this._windowColor = GameConst.BLUE_COLOR;
  }

  changeRedColor() {
    this.addAction(this.commandChangeRedColor);
  }

  commandChangeRedColor() {
    this._windowColor = GameConst.RED_COLOR;
  }

  changeDefaultColor() {
    this.addAction(this.commandChangeDefaultColor);
  }

  commandChangeDefaultColor() {
    this._windowColor = GameConst.DEFAULT_COLOR;
  }

  isFullsize() {
    return this.width === Graphics.boxWidth;
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

  isTextWasDrawing(symbol, content) {
    return this.isHistory(symbol, content);
  }
  
  isHistory(symbol, content) {
    const history = this.getHistory(symbol);
    if (!history.length) return false;
    return history.some(h => h.content === content);
  }

  isItemsAlign(symbol, content) {
    return this.isHistory(symbol, content);
  }
  
  getHistory(symbol) {
    return this._history.filter(history => history.symbol === symbol);
  }

  alignTextLeft() {
    this.addAction(this.commandAlignText, GameConst.LEFT);
  }

  alignTextCenter() {
    this.addAction(this.commandAlignText, GameConst.CENTER);
  }

  alignTextRight() {
    this.addAction(this.commandAlignText, GameConst.RIGHT);
  }

  commandAlignText(align) {
    this._textAlignment = align;
    this.refresh();
  }

  alignItemsLeft() {
    this.addAction(this.commandAlignItems, GameConst.LEFT);
  }

  alignItemsCenter() {
    this.addAction(this.commandAlignItems, GameConst.CENTER);
  }

  alignItemsRight() {
    this.addAction(this.commandAlignItems, GameConst.RIGHT);
  }

  commandAlignItems(align) {
    this._commandTextAlignment = align;
    this.refresh();
  }

  itemTextAlign() {
    this.addHistory('ITEMS_ALIGN', this._commandTextAlignment);
    return this._commandTextAlignment.toLowerCase();
  }

  drawIcon(iconIndex, x, y) {
    const bitmap = ImageManager.loadSystem(this._iconset);
    const pw = ImageManager.iconWidth;
    const ph = ImageManager.iconHeight;
    const sx = (iconIndex % 16) * pw;
    const sy = Math.floor(iconIndex / 16) * ph;
    this.contents.blt(bitmap, sx, sy, pw, ph, x, y);
  }

  opened() {
    this._openness = 255;
    this.visible = true;
    this.activate();
  }

  haveCommands(commands) {
    return this._commands.every((command, index) => command.symbol === commands[index]);
  }

  isOpen() {
    return super.isOpen();
  }

  //mute
  playCursorSound() {
    // SoundManager.playCursor();
  }

  playOkSound() {
    // SoundManager.playOk();
  }

  playBuzzerSound() {
    // SoundManager.playBuzzer();
  }

  processCancel() {
    // SoundManager.playCancel();
    this.updateInputData();
    this.deactivate();
    this.callCancelHandler();
  }
}
class FolderWindow extends CommandWindow {
  static create(x, y, text, commands) {
    if (!Array.isArray(text)) {
      throw new Error('text must be an array!');
    }
    const width = Graphics.boxWidth;
    const windowPadding = CommandWindow.windowPadding() * 2;
    const textHeight = CommandWindow.textHeight() * Math.max(text.length, 0);
    const itemsPadding = CommandWindow.itemPadding() * Math.max(commands.length - 1, 0);
    const itemsHeight = CommandWindow.itemHeight() * Math.max(commands.length, 0);
    const height = windowPadding + textHeight + itemsPadding + itemsHeight;
    const rect = new Rectangle(x, y, width, height);
    return new FolderWindow(rect, text, commands);
  }

  static createCommand(name, symbol, handler, energies) {
    if (!name || !symbol) {
      throw new Error('Command name and symbol are required!');
    }
    if (typeof handler !== 'function') {
      throw new Error('Command handler must be a function!');
    }
    if (energies && typeof energies !== 'object') {
      throw new Error('Command energies must be an object!');
    }
    const enabled = FolderWindow.abilityEnergies(energies);
    return { name, symbol, handler, energies, enabled, ext: null };
  }

  static createEnergies(red = 0, green = 0, blue = 0, white = 0, black = 0, brown = 0) {
    return { red, green, blue, white, black, brown };
  }

  static abilityEnergies(energies) {
    return Object.values(energies).reduce((acc, energy) => acc + energy, 0) >= 40;
  }

  drawItem(index) {
    const command = this.getCommand(index);
    const { name, energies } = command;
    const rect = this.itemLineRect(index);
    this.resetTextColor();
    this.changePaintOpacity(this.isCommandEnabled(index));
    this.drawFolderName(name, rect);
    this.drawPoints(energies, rect);
    this.drawIcons(rect);
  }

  getCommand(index) {
    return this._commands[index];
  }

  drawFolderName(name, rect) {
    const align = this.itemTextAlign();
    this.drawText(name, rect.x, rect.y, rect.width, align);
  }

  drawPoints(energies, rect) {
    const { red, green, blue, white, black, brown } = energies;
    const  { y, width } = rect;
    const points = [red, green, blue, white, black, brown];
    points.forEach((points, index) => {
      const align = (width - (width / 1.7));
      const spaceBetween = 72;
      const paddingLeft = 36;
      const x = align + (spaceBetween * index) + paddingLeft;
      const textWidth = 100;
      points = StringHelper.convertPointsDisplayPad(points);
      this.drawText(points, x, y, textWidth);
    });
  }

  drawIcons(rect) {
    const  { y, width } = rect;
    const redBox = IconSetConst.REDBOX;
    const greenBox = IconSetConst.GREENBOX;
    const blueBox = IconSetConst.BLUEBOX;
    const whiteBox = IconSetConst.WHITEBOX;
    const blackBox = IconSetConst.BLACKBOX;
    const brownBox = IconSetConst.BROWNBOX;
    const icons = [redBox, greenBox, blueBox, whiteBox, blackBox, brownBox];
    icons.forEach((iconIndex, index) => {
      const align = (width - (width / 1.7));
      const spaceBetween = 72;
      const x = align + (spaceBetween * index);
      this.drawIcon(iconIndex, x, y);
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
    const highValue = Math.max(...values);
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

class StateWindow extends Window_Base {
  static createWindowOneFourthSize(x, y) {
    const width = Graphics.boxWidth / 4;
    const height = CommandWindow.windowPadding() * 2;
    return StateWindow.create(x, y, width, height);
  }

  static windowPadding() {
    return 12;
  }

  static minHeight() {
    return 60;
  }

  static createWindowMiddleSize(x, y) {
    const width = Graphics.boxWidth / 2;
    const height = CommandWindow.windowPadding() * 2
    return StateWindow.create(x, y, width, height);
  }

  static createWindowThreeFourthSize(x, y) {
    const width = Graphics.boxWidth * 3 / 4;
    const height = CommandWindow.windowPadding() * 2
    return StateWindow.create(x, y, width, height);
  }

  static createWindowFullSize(x, y) {
    const width = Graphics.boxWidth;
    const height = CommandWindow.windowPadding() * 2
    return StateWindow.create(x, y, width, height);
  }

  static create(x, y, width, height) {
    return new StateWindow(new Rectangle(x, y, width, height));
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

  initialize(rect) {
    super.initialize(rect);
    this._iconset = "IconSet";
    this._status = {};
    this._commandQueue = [];
    this._windowColor = GameConst.DEFAULT_COLOR;
    this.closed();
    this.stop();
  }

  reset() {
    this.refresh();
  }

  refresh() {
    this.contents.clear();
  }

  closed() {
    this._openness = 0;
    this.visible = false;
  }

  stop() {
    this.changeStatus(WindowStoppedState);
  }

  changeStatus(status, ...params) {
    this._status = new status(this, ...params);
  }

  update() {
    super.update();
    if (this.hasCommands() && this.isStopped() && this.isAvailable()) this.executeCommand();
    if (this.isOpen() && this.getStatus()) this._status.updateStatus();
    this.updateTone();
  }

  hasCommands() {
    return this._commandQueue.length > 0;
  }

  isStopped() {
    return this.getStatus() instanceof WindowStoppedState;
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

  executeCommand() {
    const command = this._commandQueue[0];
    const executed = command.execute();
    if (executed) {
      this._commandQueue.shift();
    }
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

  open() {
    this.addCommand(this.commandOpen);
  }

  addCommand(fn, ...params) {
    const command = this.createCommand(fn, ...params);
    this._commandQueue.push(command);
  }

  createCommand(fn, ...params) {
    const command = { 
      fn: fn.name || 'anonymous',
      execute: () => {
        const result = fn.call(this, ...params);
        return typeof result === 'boolean' ? result : true;
      }
    };
    return command;
  }

  commandOpen() {
    if (!(this.isStopped() && this.isClosed())) return false;
    this.visible = true;
    super.open();
  }

  close() {
    this.addCommand(this.commandClose);
  }

  commandClose() {
    if (!(this.isStopped() && this.isOpen())) return false;
    super.close();
  }

  changeBlueColor() {
    this.addCommand(this.commandChangeBlueColor);
  }

  commandChangeBlueColor() {
    if (!this.isStopped()) return false;
    this._windowColor = GameConst.BLUE_COLOR;
  }

  changeRedColor() {
    this.addCommand(this.commandChangeRedColor);
  }

  commandChangeRedColor() {
    if (!this.isStopped()) return false;
    this._windowColor = GameConst.RED_COLOR;
  }

  changeDefaultColor() {
    this.addCommand(this.commandChangeDefaultColor);
  }

  commandChangeDefaultColor() {
    if (!this.isStopped()) return false;
    this._windowColor = GameConst.DEFAULT_COLOR;
  }

  alignStartTop() {
    this.addCommand(this.commandAlign, GameConst.START, GameConst.TOP);
  }

  alignCenterTop() {
    this.addCommand(this.commandAlign, GameConst.CENTER, GameConst.TOP);
  }

  alignEndTop() {
    this.addCommand(this.commandAlign, GameConst.END, GameConst.TOP);
  }

  alignStartMiddle() {
    this.addCommand(this.commandAlign, GameConst.START, GameConst.MIDDLE);
  }

  alignCenterMiddle() {
    this.addCommand(this.commandAlign, GameConst.CENTER, GameConst.MIDDLE);
  }

  alignEndMiddle() {
    this.addCommand(this.commandAlign, GameConst.END, GameConst.MIDDLE);
  }

  alignStartBottom() {
    this.addCommand(this.commandAlign, GameConst.START, GameConst.BOTTOM);
  }

  alignCenterBottom() {
    this.addCommand(this.commandAlign, GameConst.CENTER, GameConst.BOTTOM);
  }

  alignEndBottom() {
    this.addCommand(this.commandAlign, GameConst.END, GameConst.BOTTOM);
  }

  commandAlign(horizontalAlign, verticalAlign) {
    if (!this.isStopped()) return false;
    this.setHorizontalAlign(horizontalAlign);
    this.setVerticalAlign(verticalAlign);
  }

  setHorizontalAlign(position) {
    this.x = StateWindow.getHorizontalAlign(position, this);
  }

  setVerticalAlign(position) {
    this.y = StateWindow.getVerticalAlign(position, this);
  }

  isOneFourthSize() {
    return this.width === Graphics.boxWidth / 4;
  }

  isMiddleSize() {
    return this.width === Graphics.boxWidth / 2;
  }

  isThreeFourthSize() {
    return this.width === Graphics.boxWidth * 3 / 4;
  }

  isFullsize() {
    return this.width === Graphics.boxWidth;
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

  drawIcon(iconIndex, x, y) {
    const bitmap = ImageManager.loadSystem(this._iconset);
    const pw = ImageManager.iconWidth;
    const ph = ImageManager.iconHeight;
    const sx = (iconIndex % 16) * pw;
    const sy = Math.floor(iconIndex / 16) * ph;
    this.contents.blt(bitmap, sx, sy, pw, ph, x, y);
  }

  opened() {
    this._openness = 255;
    this.visible = true;
    this.activate();
  }

  isOpen() {
    return super.isOpen();
  }
}
class ValuesWindow extends StateWindow {
  static createValueUpdate(name, value) {
    return { name, value };
  }

  initialize(rect) {
    super.initialize(rect);
    this._values = {};
  }

  updateValues(updates) {
    updates = Array.isArray(updates) ? updates : [updates];
    this.addCommand(this.commandUpdateValues, updates);
  }

  commandUpdateValues(updates) {
    if (!(this.isOpen() && this.isStopped())) return false;
    this.changeStatus(WindowUpdatedState, updates);
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
    this.refreshPoints();
  }

  refreshPoints() {
    this.addValue(GameConst.RED_POINTS, 0);
    this.addValue(GameConst.BLUE_POINTS, 0);
    this.addValue(GameConst.GREEN_POINTS, 0);
    this.addValue(GameConst.BLACK_POINTS, 0);
    this.addValue(GameConst.WHITE_POINTS, 0);
    this.addValue(GameConst.NUM_CARDS_IN_DECK, 0);
    this.addValue(GameConst.NUM_CARDS_IN_HAND, 0);
    this.noPass();
  }

  noPass() {
    this.addCommand(this.commandNoPass);
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

  drawPass() {
    const x = this.contents.width - 336 + 40;
    const y = 0;
    const width = 64;
    const height = 32;
    this.contents.drawText('Pass', x, y, width, height);
  }

  pass() {
    this.addCommand(this.commandPass);
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
class BattlePointsWindow extends ValuesWindow {
  static create(x, y) {
    const width = Graphics.boxWidth / 4;
    const height = StateWindow.minHeight();
    return new BattlePointsWindow(new Rectangle(x, y, width, height));
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
    this.refreshPoints();
  }

  refreshPoints() {
    this.addValue(GameConst.ATTACK_POINTS, 0);
    this.addValue(GameConst.HEALTH_POINTS, 0);
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
  static create(x, y) {
    const width = (Graphics.boxWidth / 4) / 2;
    const height = StateWindow.minHeight() * 2;
    return new TrashWindow(new Rectangle(x, y, width, height));
  }

  static createValueUpdate(name, value) {
    return ValuesWindow.createValueUpdate(name, value);
  }

  initialize(rect) {
    super.initialize(rect);
    this._reverseIcons = true;
    this.reset();
  }

  reset() {
    super.reset();
    this.refreshPoints();
  }

  refreshPoints() {
    this.addValue(GameConst.NUM_CARDS_IN_TRASH, 0);
  }

  orderedIcons() {
    this._reverseIcons = true;
    this.refresh();
  }

  reverseIcons() {
    this._reverseIcons = false;
    this.refresh();
  }

  refresh() {
    super.refresh();
    this.drawIcons();
    this.drawPoints();
  }

  drawIcons() {
    const x = (this.contents.width / 2) - (ImageManager.iconWidth / 2);
    const y = this.getYItemHeight(this._reverseIcons ? 0 : 1) + this.getMiddleIconHeight();
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
      this.getYItemHeight(this._reverseIcons ? 1 : 0) - this.getMiddleIconHeight(), 
      this.contents.width, 
      this.contents.height,
      'center'
    );
  }

  isIconsOrdered() {
    return this._reverseIcons;
  }

  isIconsReverse() {
    return !this._reverseIcons;
  }
}
class WindowUpdatedScoreState {
  _window;
  _lastScore = 0;
  _score = 0;
  _toggleFps = 6;
  _interval = 0;
  _counter = GameConst.FPS;
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

class ScoreWindow extends StateWindow {
  static create(x, y) {
    const width = Graphics.boxWidth / 4;
    const height = StateWindow.minHeight();
    return new ScoreWindow(new Rectangle(x, y, width, height));
  }

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

  isUpdating() {
    return this.getStatus() instanceof WindowUpdatedScoreState;
  }

  changeScore(score) {
    this.addCommand(this.commandChangeScore, score);
  }

  commandChangeScore(score) {
    if (this.isBusy()) return false;
    const lastScore = this._score;
    this._score = score;
    this.changeStatus(WindowUpdatedScoreState, lastScore, score);
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
  initialize(x = 0, y = 0) { 
    super.initialize();
    this._commandQueue = [];
    this._delayCommandQueue = [];
    this._wait = 0;
    this._status = null;
    this._positiveIntensityEffect = false;
    this._intensityEffect = 255;
    this._opacityEffect = 255;
    this.setPosition(x, y);
  }

  setPosition(xPosition = this.x, yPosition = this.y) {
    this.x = xPosition;
    this.y = yPosition;
  }

  changeStatus(status, ...params) {
    this._status = new status(this, ...params);
  }

  removeStatus() {
    this._status = null;
  }

  addCommand(fn, ...params) {
    const command = this.createCommand({ fn, delay: 0 }, ...params);
    this.addCommands(command);
  }

  createDelayCommand(fn, delay, ...params) {
    const command = this.createCommand({ fn, delay }, ...params);
    return command;
  }

  createCommand(props, ...params) {
    const { fn, delay } = props;
    const command = { 
      fn: fn.name || 'anonymous',
      delay: delay || 0,
      execute: () => {
        const result = fn.call(this, ...params);
        return typeof result === 'boolean' ? result : true;
      }
    };
    return command;
  }

  addCommands(commands) {
    commands = this.toArray(commands);
    this._commandQueue.push(commands);
  }

  toArray(items = []) {
    return (Array.isArray(items) === false) ? [items] : items;
  }

  createDelayCommands(fn, delay, set) {
    const commands = set.map((params, index) => {
      const appliedDelay = (index > 0) ? delay : 0;
      const command = this.createCommand({
        fn,
        delay: appliedDelay,
      }, ...params);
      return command;
    });
    return commands;
  }

  addWait(seconds = 0.6) {
    this.addCommand(this.commandWait, seconds);
  }

  commandWait(seconds) {
    this._wait = seconds * GameConst.FPS;
  }

  show() {
    this.addCommand(this.commandShow);
  }

  commandShow() {
    this.visible = true;
  }

  hide() {
    this.addCommand(this.commandHide);
  }

  commandHide() {
    this.visible = false;
  }

  update() {
    super.update();
    if (this._wait > 0) return this._wait--;
    if (this.hasCommands() && this.isAvailable()) this.executeCommand();
    if (this.isVisible()) {
      this.updateStatus();
      this.updateDelayCommands();
      this.updateEffects();
    }
  }

  hasCommands() {
    return this._commandQueue.length > 0;
  }

  isAvailable() {
    return !this.isBusy();
  }

  isBusy() {
    return this._wait > 0 || this.someDelayCommand();
  }

  getStatus() {
    return this._status;
  }

  someDelayCommand() {
    return this._delayCommandQueue.some(command => command.delay > 0);
  }

  executeCommand() {
    const commands = this._commandQueue[0];
    if (commands.length > 0) {
      const completed = this.processCommands(commands);
      if (completed) {
        this._commandQueue.shift();
      }
    }
  }

  processCommands(commands) {
    let processed = false;
    for (const command of commands) {
      if (command.delay > 0) {
        this._delayCommandQueue.push(command);
        continue;
      }
      const completed = command.execute();
      if (completed) {
        processed = true;
        continue;
      }
      break;
    }
    return processed;
  }

  isVisible() {
    return this.visible;
  }

  isHidden() {
    return !this.isVisible();
  }

  updateStatus() {
    if (this._status) this._status?.updateStatus();
  }

  updateDelayCommands() {
    if (this.hasDelayCommands()) {
      const command = this._delayCommandQueue[0];
      command.delay -= 1;
      if (command.delay <= 0) {
        command.execute();
        this._delayCommandQueue.shift();
      }
    }
  }

  hasDelayCommands() {
    return this._delayCommandQueue.length > 0;
  }

  updateEffects() {
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

  hasChildren() {
    return this.numberOfChildren() > 0;
  }

  numberOfChildren() {
    return this.children.length;
  }

  indexOfSprite(sprite) {
    for (let i = 0; i < this.numberOfChildren(); i++) {
      if (ObjectHelper.compareObjects(this.children[i], sprite)) {
        return i;
      }
    }
    return -1;
  }

  clear() {
    while (this.numberOfChildren()) {
      this.children.forEach(async child => {
        await this.removeChild(child);
      });
    }
  }
}
class CardSpriteStoppedState {
  _card;
  
  constructor(sprite) {
    if (!(sprite instanceof CardSprite)) {
      throw new Error('sprite is not a CardSprite instance!');
    }
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
  _duration = 0.3;
  
  constructor(sprite, moves) {
    if (!(sprite instanceof CardSprite)) {
      throw new Error('sprite is not a CardSprite instance!');
    }
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
      that.changeStatus(CardSpriteStoppedState);
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
      duration = duration >= 0 ? duration : this._duration;
      this._x = destinyXPosition;
      this._y = destinyYPosition;
      this._xInterval = NumberHelper.calculateTimeInterval(originXPosition, destinyXPosition, duration);
      this._yInterval = NumberHelper.calculateTimeInterval(originYPosition, destinyYPosition, duration);
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
  _duration = 0.3;
  
  constructor(sprite, xPosition, yPosition) {
    if (!(sprite instanceof CardSprite)) {
      throw new Error('sprite is not a CardSprite instance!');
    }
    this._card = sprite;
    const that = this._card;
    this._x = xPosition;
    this._y = yPosition;
    this._isUpdateHorizontally = this._x !== that.x;
    this._isUpdateVertically = this._y !== that.y;
    this._isToOpenHorizontally = this._x < that.x;
    this._isToOpenVertically = this._y < that.y;
    this._interval = NumberHelper.calculateTimeInterval(0, CardSprite.contentOriginalWidth(), this._duration);
  }

  updateStatus() {
    const that = this._card;
    if (this.isUpdatingPosition() || this.isUpdatingOpening()) {
      this.updatePosition();
      this.updateOpening();
      that.refresh();
      return false;
    }
    if (that.isOpened()) that.opened();
    if (that.isClosed()) that.closed();
    that.changeStatus(CardSpriteStoppedState);
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
    const width = that.width < CardSprite.contentOriginalWidth() && that.width > 0;
    const height = that.height < CardSprite.contentOriginalHeight() && that.height > 0;
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
        if (that.width > CardSprite.contentOriginalWidth()) that.width = CardSprite.contentOriginalWidth();
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
  _duration = 0.3 / 2;
  
  constructor(sprite, destinyXPosition, destinyYPosition, destinyXScale, destinyYScale) {
    if (!(sprite instanceof CardSprite)) {
      throw new Error('sprite is not a CardSprite instance!');
    }
    this._card = sprite;
    this._x = destinyXPosition;
    this._y = destinyYPosition;
    this._xScale = destinyXScale;
    this._yScale = destinyYScale;
    this.definePosition(this._duration);
    this.defineScale(this._duration);
  }

  definePosition(duration) {
    const that = this._card;
    const originXPosition = that.x;
    const originYPosition = that.y;
    const destinyXPosition = this._x;
    const destinyYPosition = this._y;
    this._xInterval = NumberHelper.calculateTimeInterval(originXPosition, destinyXPosition, duration);
    this._yInterval = NumberHelper.calculateTimeInterval(originYPosition, destinyYPosition, duration);
  }

  defineScale(duration) {
    const that = this._card;
    const originXScale = that.scale.x;
    const originYScale = that.scale.y;
    const destinyXScale = this._xScale;
    const destinyYScale = this._yScale;
    this._xScaleInterval = NumberHelper.calculateTimeInterval(originXScale, destinyXScale, duration);
    this._yScaleInterval = NumberHelper.calculateTimeInterval(originYScale, destinyYScale, duration);

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
      that.changeStatus(CardSpriteStoppedState);
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
class CardAnimationSprite extends Sprite_Animation {}



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
        this.startAnimation();
        this._times--;
      }
    } else {
      that.removeBehavior(this);
    }
  }

  startAnimation() {
    const that = this._card;
    this._animationSprite = new Sprite_Animation();
    const targets = [that];
    const mirror = true;
    const delay = 8;
    const previus = this._parent.getLastAnimationSprite() || null;
    this._animationSprite.setup(targets, this._animation, mirror, delay, previus);
    this._parent.addChild(this._animationSprite);
    this._parent.addAnimationSprite(this._animationSprite);
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
    const that = this._card;
    if (this.isNoPlaying()) {
      if (this.hasTimesOrInfinity()) {
        if (this.hasTimes()) this._times--;
        this._flashDuration = this._duration;
      } else {
        that.removeBehavior(this);
      }
    }
    this.updateFlash();
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
class CardSpriteUpdatedPointsBehavior {
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
  static create(type, color, figureName, attack, health, x, y) {
    if (!type || !color || !figureName) {
      throw new Error('Card inválido!');
    }
    const card = new CardSprite(x, y);
    card.setCard(
      type, 
      color, 
      figureName, 
      attack, 
      health
    );
    return card;
  }

  setCard(type, color, figureName, attack = 0, health = 0) {
    this.setType(type);
    this.setColor(color);
    this.setFigure(figureName);
    this.setBackImage();
    this._attackPoints = attack;
    this._healthPoints = health;
  }

  setType(type) {
    if (!type) {
      throw new Error('Card type is required');
    }
    this._type = type;
  }

  setColor(color) {
    if (!color) {
      throw new Error('Card color is required');
    }
    this._color = color;
  }

  setFigure(figureName = 'default') {
    this._figure = ImageManager.loadCard(figureName);
  }

  setBackImage() {
    this._backImage = new Bitmap(this.width, this.height);
    this._backImage.gradientFillRect(0, 0, this.width, this.height, '#555', '#000');
  }

  initialize(x, y) {
    super.initialize(x, y);
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
    this.hide();
    this.enable();
    this.stop();
    this.setTurnToUp();
    this.setOriginalSize();
    this.createLayers();
  }

  stop() {
    this.addCommand(this.commandStop);
  }

  commandStop() {
    this.changeStatus(CardSpriteStoppedState);
  }

  setTurnToUp() {
    this._turned = true;
  }

  setOriginalSize() {
    this.width = CardSprite.contentOriginalWidth();
    this.height = CardSprite.contentOriginalHeight();
  }

  static contentOriginalWidth() {
    return 96;
  }

  static contentOriginalHeight() {
    return 128;
  }

  createLayers() {
    this.createContentLayer();
    this.createSelectedLayer();
    this.createHoveredLayer();
  }

  createContentLayer() {
    this._contentLayer = new Sprite();
    this._contentLayer.bitmap = new Bitmap(CardSprite.contentOriginalWidth(), CardSprite.contentOriginalHeight());
    this.createDisableLayer();
    this.createFlashLayer();
    this.addChild(this._contentLayer);
  }

  createDisableLayer() {
    this._disabledLayer = new Sprite();
    this._disabledLayer.visible = false;
    this._disabledLayer.opacity = 128;
    this._disabledLayer.bitmap = new Bitmap(CardSprite.contentOriginalWidth(), CardSprite.contentOriginalHeight());
    this._disabledLayer.bitmap.fillAll('black');
    this._contentLayer.addChild(this._disabledLayer);
  }

  createFlashLayer() {
    this._flashedLayer = new Sprite();
    this._flashedLayer.bitmap = new Bitmap(CardSprite.contentOriginalWidth(), CardSprite.contentOriginalHeight());
    this._contentLayer.addChild(this._flashedLayer);
  }

  createHoveredLayer() {
    this._hoveredLayer = new Sprite();
    this._hoveredLayer.bitmap = new Bitmap(CardSprite.contentOriginalWidth(), CardSprite.contentOriginalHeight());
    this.addChild(this._hoveredLayer);
  }

  createSelectedLayer() {
    this._selectedLayer = new Sprite();
    this._selectedLayer.bitmap = new Bitmap(CardSprite.contentOriginalWidth(), CardSprite.contentOriginalHeight());
    this.addChild(this._selectedLayer);
  }

  enable() {
    this.addCommand(this.commandEnable);
  }

  commandEnable() {
    this._disabled = false;
    this._disabledLayer.visible = false;
    if (this.isVisible()) this.refresh();
  }

  disable() {
    this.addCommand(this.commandDisable);
  }

  commandDisable() {
    this._disabled = true;
    this._disabledLayer.visible = true;
    if (this.isVisible()) this.refresh();
  }

  refresh() {
    this.clearContent();
    this.drawCard();
    this.drawDisableFilter();
  }

  clearContent() {
    this._contentLayer.bitmap.clear();
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
        return ColorHelper.getColorHex(GameColors.FADEDRED);
        break;
      case ColorTypes.GREEN:
        return ColorHelper.getColorHex(GameColors.FADEDGREEN);
        break;
      case ColorTypes.BLUE:
        return ColorHelper.getColorHex(GameColors.FADEDBLUE);
        break;
      case ColorTypes.WHITE:
        return ColorHelper.getColorHex(GameColors.FADEDWHITE);
        break;
      case ColorTypes.BLACK:
        return ColorHelper.getColorHex(GameColors.FADEDBLACK);
        break;
      default:
        return ColorHelper.getColorHex(GameColors.FADEDBROWN);
        break;
    }
  }

  getBackgroundColor() {
    switch (this._color) {
      case ColorTypes.RED:
        return ColorHelper.getColorHex(GameColors.RED);
        break;
      case ColorTypes.GREEN:
        return ColorHelper.getColorHex(GameColors.GREEN);
        break;
      case ColorTypes.BLUE:
        return ColorHelper.getColorHex(GameColors.BLUE);
        break;
      case ColorTypes.WHITE:
        return ColorHelper.getColorHex(GameColors.WHITE);
        break;
      case ColorTypes.BLACK:
        return ColorHelper.getColorHex(GameColors.BLACK);
        break;
      default:
        return ColorHelper.getColorHex(GameColors.BROWN);
        break;
    }
  }

  drawFigure() {
    const contentX = 4;
    const contentY = 4;
    const contentWidth = CardSprite.contentOriginalWidth() - 8;
    const contentHeight = CardSprite.contentOriginalHeight() - 28;
    const openWidthPercent = Math.floor((this.width / CardSprite.contentOriginalWidth()) * 100);
    const openHeightPercent = Math.floor((this.height / CardSprite.contentOriginalHeight()) * 100);
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

  drawDisableFilter() {
    if (this.isDisabled()) {
      this._contentLayer.setColorTone([0, 0, 0, 255]);
    } else {
      this._contentLayer.setColorTone([0, 0, 0, 0]);
    }
  }

  isEnabled() {
    return !this.isDisabled();
  }

  isDisabled() {
    return this._disabled;
  }

  startOpen(xPosition = this.x, yPosition = this.y) {
    this.addCommand(this.commandStartOpen, xPosition, yPosition);
  }

  commandStartOpen(xPosition, yPosition) {
    if (this.isOpened()) return false;
    this.setPosition(xPosition, yPosition);
    this.opened();
  }

  setPosition(xPosition, yPosition) {
    this.x = xPosition;
    this.y = yPosition;
  }

  opened() {
    this.visible = true;
    this.setOriginalSize();
  }

  startClosed(xPosition = this.x, yPosition = this.y) {
    this.addCommand(this.commandStartClosed, xPosition, yPosition);
  }

  commandStartClosed(xPosition, yPosition) {
    if (this.isClosed()) return false;
    this.setPosition(xPosition, yPosition);
    const cardWidthHalf = (CardSprite.contentOriginalWidth() / 2);
    this.x = this.x + cardWidthHalf;
    this.closed();
  }

  isClosed() {
    return this.width === 0;
  }

  closed() {
    this.visible = false;
    this.width = 0;
  }

  commandShow() {
    super.commandShow();
    if (this.isOpened()) this.refresh();
  }

  isOpened() {
    return this.width === CardSprite.contentOriginalWidth() && this.visible;
  }

  open() {
    this.show();
    this.addCommand(this.commandOpen);
  }

  commandOpen() {
    if (!(this.isStopped() && this.isClosed())) return false;
    const xPositionOpening = this.x - (CardSprite.contentOriginalWidth() / 2);
    const yPositionOpening = this.y;
    this.changeStatus(CardSpriteOpeningState, xPositionOpening, yPositionOpening);
  }

  isStopped() {
    return this.getStatus() instanceof CardSpriteStoppedState;
  }

  close() {
    this.addCommand(this.commandClose);
    this.hide();
  }

  commandClose() {
    if (!(this.isOpened() && this.isStopped())) return false;
    const xPositionClosing = this.x + (CardSprite.contentOriginalWidth() / 2);
    const yPositionOpening = this.y;
    this.changeStatus(CardSpriteOpeningState, xPositionClosing, yPositionOpening);
  }

  static createMove(destinyXPosition, destinyYPosition, originXPosition, originYPosition, duration) {
    return { 
      destinyXPosition, 
      destinyYPosition, 
      originXPosition, 
      originYPosition, 
      duration 
    };
  }

  toMove(moves) {
    moves = this.toArray(moves);
    this.addCommand(
      this.commandMoving,
      moves
    );
  }

  commandMoving(moves) {
    if (!(this.isOpened() && this.isStopped())) return false;
    this.changeStatus( 
      CardSpriteMovingState,
      moves
    );
  }

  hover() {
    this.addCommand(this.commandHover);
  }

  commandHover() {
    if (!(this.isOpened() && this.isStopped())) return false;
    if (this.isHovered()) return true;
    this.addBehavior(CardSpriteHoveredBehavior);
  }

  addBehavior(behavior, ...params) {
    this._behaviors.push(new behavior(this, ...params));
  }

  isHovered() {
    return this.getBehavior(CardSpriteHoveredBehavior) instanceof CardSpriteHoveredBehavior;
  }

  getBehavior(behavior) {
    if (typeof behavior === 'function') {
      return this._behaviors.find(b => b.constructor === behavior) || false;
    } else {
      return this._behaviors.find(b => b === behavior) || false;
    }
  }

  isUnhovered() {
    return !this.isHovered();
  }

  unhover() {
    this.addCommand(this.commandUnhover);
  }

  commandUnhover() {
    if (this.isUnhovered()) return true;
    this._hoveredLayer.bitmap.clear();
    this.removeBehavior(CardSpriteHoveredBehavior);
  }

  removeBehavior(behavior) {
    behavior = this.getBehavior(behavior);
    if (!behavior) return false;
    this._behaviors = this._behaviors.filter(b => b !== behavior);
  }

  select() {
    this.addCommand(this.commandSelect);
  }

  commandSelect() {
    if (!(this.isOpened() && this.isStopped())) return false; 
    if (this.isSelected()) return true;
    this.addBehavior(CardSpriteSelectedBehavior);
  }

  isSelected() {
    return this.getBehavior(CardSpriteSelectedBehavior) instanceof CardSpriteSelectedBehavior;
  }

  unselect() {
    this.addCommand(this.commandUnselect);
  }

  commandUnselect() {
    if (this.isUnselected()) return true;
    this._selectedLayer.bitmap.clear();
    this.removeBehavior(CardSpriteSelectedBehavior);
  }

  isUnselected() {
    return !this.isSelected();
  }

  iluminate() {
    this.addCommand(this.commandIluminate);
  }

  commandIluminate() {
    const isStatus = (this.isStopped() || this.isMoving() || this.isZooming());
    if (!(this.isOpened() && isStatus)) return false;
    if (this.isIluminated()) return true; 
    this.addBehavior(CardSpriteIluminatedBehavior);
  }

  isMoving() {
    return this.getStatus() instanceof CardSpriteMovingState;
  }

  isZooming() {
    return this.getStatus() instanceof CardSpriteZoomState;
  }

  isIluminated() {
    return this.getBehavior(CardSpriteIluminatedBehavior) instanceof CardSpriteIluminatedBehavior;
  }

  uniluminate() {
    this.addCommand(this.commandUniluminate);
  }

  commandUniluminate() {
    if (this.isUniluminated()) return true;
    this._selectedLayer.bitmap.clear();
    this.removeBehavior(CardSpriteIluminatedBehavior);
  }

  isUniluminated() {
    return !this.isIluminated();
  }

  flash(color = 'white', duration = 10, times = 1) {
    this.addCommand(this.commandFlash, color, duration, times);
  }

  commandFlash(color, duration, times) {
    const isStatus = (this.isStopped() || this.isMoving() || this.isZooming());
    if (!(this.isOpened() && isStatus) || this.isFlashPlaying()) return false; 
    this.addBehavior(
      CardSpriteFlashedBehavior,
      color, 
      duration, 
      times
    );
  }

  isFlashPlaying() {
    return this.getBehavior(CardSpriteFlashedBehavior) instanceof CardSpriteFlashedBehavior;
  }

  damage(times = 1, anchorParent = this.parent) {
    const animation = this.damageAnimation();
    this.addCommand(this.commandAnimate, animation, times, anchorParent);
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
    const isStatus = (this.isStopped() || this.isMoving() || this.isZooming());
    if (!(this.isOpened() && isStatus) || this.isAnimationPlaying()) return false; 
    this.addBehavior(
      CardSpriteAnimatedBehavior, 
      animation,
      times,
      anchorParent
    );
  }

  isAnimationPlaying() {
    return this.getBehavior(CardSpriteAnimatedBehavior) instanceof CardSpriteAnimatedBehavior;
  }

  quake(times = 1, distance = 8, movements = null) {
    this.addCommand(this.commandQuake, times, distance, movements);
  }

  commandQuake(times, distance, movements) {
    if (!this.isOpened() && this.isStopped()) return false;
    const moves = movements || CardSprite.generateQuakeMoves(times, distance);
    const cardXPosition = this.x;
    const cardYPosition = this.y; 
    const directionsMoves = moves.map((move, index) => {
      const xMove = cardXPosition + move.x;
      const yMove = cardYPosition + move.y;
      const duration = 0;
      const directionMove = CardSprite.createMove(xMove, yMove, cardXPosition, cardYPosition, duration);
      return directionMove;
    });
    this.toMove(directionsMoves);
  }

  zoom() {
    this.addCommand(this.commandZoom);
  }

  commandZoom() {
    if (!this.isOpened() && this.isStopped() && this.isOriginalScale()) return false;
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

  isOriginalScale() {
    return this.scale.x === 1 && this.scale.y === 1;
  }

  zoomOut() {
    this.addCommand(this.commandZoomOut);
  }

  commandZoomOut() {
    if (!this.isOpened() && this.isStopped() && this.isZoom()) return false;
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

  isZoom() {
    return this.scale.x > 1 || this.scale.y > 1;
  }

  leave() {
    this.addCommand(this.commandLeave);
    this.hide();
  }

  commandLeave() {
    if (!this.isOpened() && this.isStopped()) return false;
    const xPositionClosing = this.x + (CardSprite.contentOriginalWidth() / 2);
    const yPositionClosing = this.y + (CardSprite.contentOriginalHeight() / 2);
    this.changeStatus(CardSpriteOpeningState, xPositionClosing, yPositionClosing);
  }

  flipTurnToUp() {
    this.close();
    this.addCommand(this.commandFlipTurnToUp);
    this.open();
  }

  commandFlipTurnToUp() {
    if (!(this.isClosed() && this.isStopped() && this.isTurnedToDown())) return false;
    this.setTurnToUp();
    this.refresh();
  }

  isTurnedToDown() {
    return !this._turned;
  }

  flipTurnToDown() {
    this.close();
    this.addCommand(this.commandFlipTurnToDown);
    this.open();
  }

  commandFlipTurnToDown() {
    if (!(this.isClosed() && this.isStopped() && this.isTurnedToUp())) return false;
    this._turned = false;
    this.refresh();
  }

  setTurnToDown() {
    this.addCommand(this.commandSetTurnToDown);
  }

  commandSetTurnToDown() {
    if (this.isTurnedToDown()) return true;
    this._turned = false;
    this.refresh();
  }

  changeAttackPoints(attackPoints) {
    this.changePoints(attackPoints);
  }

  changeHealthPoints(healtPoints) {
    this.changePoints(this._attackPoints, healtPoints);
  }

  changePoints(attackPoints = this._attackPoints, healtPoints = this._healthPoints) {
    this.addCommand(this.commandChangePoints, attackPoints, healtPoints);
  }

  commandChangePoints(attackPoints, healtPoints) {
    if (!(this.isOpened() && this.isStopped())) return false;
    this.addBehavior(
      CardSpriteUpdatedPointsBehavior, 
      attackPoints,
      healtPoints
    );
  }

  update() {
    super.update();
    if (this.isVisible()) this.updateBehaviors();
  }

  updateBehaviors() {
    if (Array.isArray(this._behaviors)) {
      this._behaviors.forEach(behavior => {
        if (behavior) behavior.updateBehavior();
      });
    }
  }

  static createPosition(x, y, index) {
    return { x, y, index };
  }

  static generateQuakeMoves(times = 1, distance = 2) {
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

  isOpening() {
    return this.getStatus() instanceof CardSpriteOpeningState;
  }

  isBusy() {
    return (this.getStatus() && this.isNotStopped()) || this.isAnimated() || this.someDelayCommand();
  }

  isNotStopped() {
    return !this.isStopped();
  }

  isAnimated() {
    return this.isAnimationPlaying() || this.isFlashPlaying() || this.isUpdatingPoints();
  }

  isUpdatingPoints() {
    return this.getBehavior(CardSpriteUpdatedPointsBehavior) instanceof CardSpriteUpdatedPointsBehavior;
  }
}
class CardsetSpriteStaticModeState {
  _cardset;
  
  constructor(sprite) {
    if (!(sprite instanceof CardsetSprite)) {
      throw new Error('sprite is not a CardsetSprite instance!');
    }
    this._cardset = sprite;
    this.unhouverSprites();
  }

  unhouverSprites() {
    const spritesHovered = this.getSpritesHovered();
    spritesHovered.forEach(({ sprite, index }) => {
      this.resetSprite(sprite);
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

  resetSprite(sprite) {
    // const destinyXPosition = sprite.x;
    // const destinyYPosition = 0;
    // const duration = 0.03;
    sprite.unhover();
    sprite.unselect();
    sprite.uniluminate();
    // const move = CardSprite.createMove(destinyXPosition, destinyYPosition, sprite.x, sprite.y, duration);
    // sprite.toMove(move);
  }

  updateStatus() {
    // nothing
  }
}
class CardsetSpriteSelectModeState {
  _cardset;
  _cursorIndex;
  _selectedIndexs;
  _selectNumber;
  _confirmWindow;
  _selectHandler;

  constructor(sprite, selectHandler, number = -1) {
    if (!(sprite instanceof CardsetSprite)) {
      throw new Error('sprite is not a CardsetSprite instance!');
    }
    if (typeof selectHandler !== 'function') {
      throw new Error('selectHandler is not a function!');
    }
    this._cardset = sprite;
    this._cursorIndex = 0;
    this._selectedIndexs = [];
    this._selectNumber = number;
    this._selectHandler = selectHandler;
    this.updateHoverSprites();
  }

  updateHoverSprites() {
    const cardset = this._cardset;
    const sprites = cardset.getSprites();
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
    sprite.commandHover();
    const move = CardSprite.createMove(destinyXPosition, destinyYPosition, sprite.x, sprite.y, duration);
    sprite.commandMoving([move]);
  }

  unhoverSprite(sprite) {
    const destinyXPosition = sprite.x;
    const destinyYPosition = 0;
    const duration = 0.03;
    sprite.commandUnhover();
    const move = CardSprite.createMove(destinyXPosition, destinyYPosition, sprite.x, sprite.y, duration);
    sprite.commandMoving([move]);
  }

  updateStatus() {
    const cardset = this._cardset;
    const keys = ['right', 'left'];
    if (cardset.isAvailable()) {
      this.updateCursor();
      if (Input.isAnyKeyActiveIn(keys)) this.updateHoverSprites();
      if (this.isSelectable()) {
        if (Input.isTriggered('ok')) this.selectSprite();
        if (Input.isTriggered('cancel') || this.selectIsFull()) {
          cardset.addCommand(this._selectHandler, this._selectedIndexs);
          cardset.commandStaticMode();
        }
      }
    }
  }

  updateCursor() {
    if (Input.isRepeated('right') || Input.isLongPressed('right')) {
      this.moveCursorRight();
    } else if (Input.isRepeated('left') || Input.isLongPressed('left')) {
      this.moveCursorLeft();
    }
  }

  moveCursorRight(times = 1) {
    const sprites = this._cardset.getSprites();
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
    const sprites = this._cardset.getSprites();
    const indexsAmount = sprites.length - 1;
    if (this._cursorIndex > minIndex) {
      const nextIndex = this._cursorIndex - times;
      this._cursorIndex = nextIndex < minIndex ? minIndex : nextIndex;
    } else {
      this._cursorIndex = indexsAmount;
    }
  }

  isSelectable() {
    return this._selectNumber !== 0;
  }

  selectSprite() {
    const cursorIndex = this._cursorIndex;
    if (this._selectedIndexs.includes(cursorIndex)) {
      this.removeSelectedIndex(cursorIndex);
    } else {
      this.addSelectedIndex(cursorIndex);
    }
    this.updateSelectSprites();
  }

  removeSelectedIndex(index) {
    this._selectedIndexs = this._selectedIndexs.filter(spriteIndex => spriteIndex !== index);
  }

  addSelectedIndex(index) {
    this._selectedIndexs.push(index);
  }

  updateSelectSprites() {
    const sprites = this._cardset.getSprites();
    sprites.forEach((sprite, index) => {
      if (this._selectedIndexs.includes(index)) {
        sprite.select();
      } else {
        sprite.unselect();
      }
    });
  }

  selectIsFull() {
    const cardset = this._cardset;
    const allowedAmount = cardset.getEnabledSpritesAmount();
    const selectedAmount = this._selectedIndexs.length;
    let limit = false;
    if (this._selectNumber > 0) {
      limit = selectedAmount >= this._selectNumber;
    }
    const full = selectedAmount === allowedAmount;
    return limit || full;
  }



  

  // createConfirmWindow(message) {
  //   // message = 'confirm the selection?'
  //   const confirmHandler = () => {
  //     this._selectHandler(this._selectedIndexs);
  //   };
  //   const returnHandler = () => {
  //     this.returnToSelection();
  //   };
  //   const commandYes = CommandWindow.createCommand('Yes', 'YES', confirmHandler);
  //   const commandNo = CommandWindow.createCommand('No', 'NO', returnHandler);
  //   const text = [message];
  //   this._confirmWindow = CommandWindow.create(0, 0, text, [commandYes, commandNo]);
  //   this._confirmWindow.alignMiddle();
  //   this._cardset.addChild(this._confirmWindow);
  // }

  // returnToSelection() {
  //   if (this.selectIsFull()) {
  //     this._selectedIndexs.pop();
  //   }
  //   this.updateSelectSprites();
  //   this.updateHoverSprites();
  //   this.closeConfirmWindow();
  // }

  // openConfirmWindow() {
  //   this._confirmWindow.open();
  // }

  // closeConfirmWindow() {
  //   this._confirmWindow.close();
  // }

  // isWindowBusy() {
  //   return this._confirmWindow.isOpen();
  // }
}

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
    const heightLimit = 128;
    return heightLimit;
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
    this.setup();
  }

  setup() {
    this.setBackgroundColor('none');
    this.setSize();
    this.commandHide();
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

  staticMode() {
    this.addCommand(this.commandStaticMode);
  }

  commandStaticMode() {
    this.changeStatus(CardsetSpriteStaticModeState);
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
    sprites = this.toArray(sprites);
    sprites = sprites.map(sprite => [sprite]);
    if (reverse) sprites.reverse();
    const commands = this.createDelayCommands(this.commandOpenCard, delay, sprites);
    this.addCommands(commands);
  }

  commandOpenCard(sprite) {
    if (this.isHidden()) return false;
    sprite.open();
  }

  closeCards(sprites = this._sprites, delay = 6, reverse = false) {
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

  moveCardsInlist(sprites = this._sprites, delay = 6) {
    sprites = this.toArray(sprites);
    const numCards = sprites.length;
    const positions = CardsetSprite.createPositionsList(numCards);
    let moves = this.moveCardsPositions(positions, sprites);
    moves = moves.map(({ sprite, x, y }) => [sprite, x, y]);
    const commands = this.createDelayCommands(this.commandMoveCard, delay, moves);
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

  selectMode(selectHandler, number) {
    this.addCommand(this.commandSelectMode, selectHandler, number);
  }

  commandSelectMode(selectHandler, number) {
    this.changeStatus(CardsetSpriteSelectModeState, selectHandler, number);
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

  flashCardsAnimate(sprites = this._sprites, color = 'white', duration = 10, times = 1) {
    sprites = this.toArray(sprites);
    this.addCommand(this.commandAnimateCardsFlash, sprites, color, duration, times);
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

  damageCardsAnimate(times = 1, sprites = this._sprites, anchorParent = this.parent) {
    sprites = this.toArray(sprites);
    this.addCommand(this.commandAnimateCardsDamage, times, sprites, anchorParent);
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

  getSprites() {
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
    return Math.floor(Math.abs(origin - target) / (duration * GameConst.FPS)) || 1;
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
    if (targetX == x) return false; 
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

class Phase {
  _scene;
  _actionsQueue = [];
  _step = 'START';
  _wait = 0;

  constructor(scene) {
    this._scene = scene;
  }

  update() {
    if (this._wait > 0) return this._wait--;
    if (this.hasActions() && this.isAvailable()) this.executeAction();
  }

  hasActions() {
    return this._actionsQueue.length > 0;
  }

  isAvailable() {
    return !this.isBusy();
  }

  isBusy() {
    return this._wait > 0;
  }

  executeAction() {
    const actions = this._actionsQueue[0];
    if (actions.length > 0) {
      const completed = this.processActions(actions);
      if (completed) {
        this._actionsQueue.shift();
      }
    }
  }

  processActions(actions) {
    let processed = false;
    for (const action of actions) {
      const completed = action.execute();
      if (completed) {
        processed = true;
        continue;
      }
      break;
    }
    return processed;
  }

  addAction(fn, ...params) {
    const action = this.createAction(fn, ...params);
    const actions = this.toArray(action);
    this._actionsQueue.push(actions);
  }

  createAction(fn, ...params) {
    const action = { 
      fn: fn.name || 'anonymous',
      execute: () => {
        const result = fn.call(this, ...params);
        return typeof result === 'boolean' ? result : true;
      }
    };
    return action;
  }

  addActions(actions) {
    actions = this.toArray(actions);
    actions = actions.map((fn, ...params) => this.createAction(fn, ...params));
    this._actionsQueue.push(actions);
  }

  toArray(items = []) {
    return (Array.isArray(items) === false) ? [items] : items;
  }

  addWindow(window) {
    this._scene.addWindow(window);
  }

  addWindows(windows) {
    if (Array.isArray(windows) === false) windows = [windows];
    windows.forEach(window => this.addWindow(window));
  }

  addChild(child) {
    this._scene.addChild(child);
  }

  addWait(seconds = 0.6) {
    this.addAction(this.commandWait, seconds);
  }

  commandWait(seconds) {
    this._wait = seconds * GameConst.FPS;
  }

  commandChangeStep(step) {
    this._step = step;
  }

  getStep() {
    return this._step;
  }
}
class ChallengePhase extends Phase {
  _titleWindow;
  _descriptionWindow;
  _folderWindow;

  createTitleWindow(title) {
    this._titleWindow = TextWindow.createWindowFullSize(0, 0, title);
    this._titleWindow.alignCenterAboveMiddle();
    this._titleWindow.alignTextCenter();
  }

  createDescriptionWindow(text) {
    this._descriptionWindow = TextWindow.createWindowFullSize(0, 0, text);
    this._descriptionWindow.alignCenterMiddle();
  }

  createFolderWindow(text, folders) {
    const energies = folders.map(folder => FolderWindow.createEnergies(...folder.energies));
    const commands = folders.map((folder, index) => {
      return FolderWindow.createCommand(folder.name, `FOLDER_${index}`, folder.handler, energies[index])
    });
    this._folderWindow = FolderWindow.create(0, 0, text, commands);
    this._folderWindow.alignMiddle();
    this._folderWindow.alignTextCenter();
  }

  openTitleWindow() {
    this.addAction(this.commandOpenTitleWindow);
  }

  commandOpenTitleWindow() {
    this._titleWindow.open();
  }

  closeTitleWindow() {
    this.addAction(this.commandCloseTitleWindow);
  }

  commandCloseTitleWindow() {
    this._titleWindow.close();
  } 

  openDescriptionWindow() {
    this.addAction(this.commandOpenDescriptionWindow);
  }

  commandOpenDescriptionWindow() {
    this._descriptionWindow.open();
  }

  closeDescriptionWindow() {
    this.addAction(this.commandCloseDescriptionWindow);
  }

  commandCloseDescriptionWindow() {
    this._descriptionWindow.close();
  }

  openFolderWindow() {
    this.addAction(this.commandOpenFolderWindow);
  }

  commandOpenFolderWindow() {
    this._folderWindow.open();
  }

  closeFolderWindow() {
    this.addAction(this.commandCloseFolderWindow);
  }

  commandCloseFolderWindow() {
    this._folderWindow.close();
  }

  stepChallengePhase() {
    this.addAction(this.commandChangeStep, 'CHALLENGE_PHASE');
  }

  stepSelectFolder() {
    this.addAction(this.commandChangeStep, 'SELECT_FOLDER');
  }

  isStepChallengePhase() {
    return this.getStep() === 'CHALLENGE_PHASE';
  }

  isStepSelectFolder() {
    return this.getStep() === 'SELECT_FOLDER';
  }

  isBusy() {
    return super.isBusy() || 
      this._titleWindow.isBusy() || 
      this._descriptionWindow.isBusy() || 
      this._folderWindow.isBusy();
  }
}
class StartPhase extends Phase {
  _titleWindow;
  _descriptionWindow;
  _cardDrawGameCardset;

  createTitleWindow(title) {
    this._titleWindow = TextWindow.createWindowFullSize(0, 0, title);
    this._titleWindow.alignCenterAboveMiddle();
    this._titleWindow.alignTextCenter();
  }

  createDescriptionWindow(text) {
    this._descriptionWindow = TextWindow.createWindowFullSize(0, 0, text);
    this._descriptionWindow.alignCenterMiddle();
  }

  createCardDrawGameCardset(cards) {
    this._cardDrawGameCardset = CardsetSprite.create(0, 0);
    this._cardDrawGameCardset.centralize();
    this._cardDrawGameCardset.commandShow();
    const randomCards = this.shuffleCards(cards);
    const sprites = this._cardDrawGameCardset.setCards(randomCards, Graphics.boxWidth, Graphics.boxHeight);
    const xSprite1 = -(this._cardDrawGameCardset.x + CardSprite.contentOriginalWidth());
    const ySprite1 = -(this._cardDrawGameCardset.y + CardSprite.contentOriginalHeight());
    const position1 = CardSprite.createPosition(xSprite1, ySprite1, 0);
    const xSprite2 = (Graphics.boxWidth - this._cardDrawGameCardset.x);
    const ySprite2 = (Graphics.boxHeight - this._cardDrawGameCardset.y);
    const position2 = CardSprite.createPosition(xSprite2, ySprite2, 1);
    const positions = [position1, position2];
    this._cardDrawGameCardset.setAllCardsInPositions(sprites, positions);
    this._cardDrawGameCardset.setTurnToDownCards(sprites);
  }

  shuffleCards(cards) {
    const newCards = cards.slice();
    for (let i = newCards.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [newCards[i], newCards[j]] = [newCards[j], newCards[i]];
    }
    return newCards;
  }

  startCardDrawGame(selectHandler) {
    this.addAction(this.commandStartCardDrawGame, selectHandler);
  }

  commandStartCardDrawGame(selectHandler) {
    this.showCards();
    this.moveAllCardsToCenter();
    this.selectMode(selectHandler);
  }

  showCards() {
    this.addAction(this.commandShowCards);
  }
  
  commandShowCards() {
    this._cardDrawGameCardset.showCards();
  }

  moveAllCardsToCenter() {
    this.addAction(this.commandMoveAllCardsToCenter);
  }

  commandMoveAllCardsToCenter() {
    const center = this._cardDrawGameCardset.width / 2;
    const x = center - CardSprite.contentOriginalWidth();
    const position1 = CardSprite.createPosition(x, 0, 0);
    const position2 = CardSprite.createPosition(center, 0, 1);
    const positions = [position1, position2];
    const sprites = this._cardDrawGameCardset.getSprites();
    this._cardDrawGameCardset.moveAllCardsToPositions(sprites, positions);
  }

  selectMode(selectHandler) {
    this.addAction(this.commandSelectMode, selectHandler);
  }

  commandSelectMode(selectHandler) {
    const selectNumber = 1;
    this._cardDrawGameCardset.selectMode(selectHandler, selectNumber);
  }

  openTitleWindow() {
    this.addAction(this.commandOpenTitleWindow);
  }

  commandOpenTitleWindow() {
    this._titleWindow.open();
  }

  closeTitleWindow() {
    this.addAction(this.commandCloseTitleWindow);
  }

  commandCloseTitleWindow() {
    this._titleWindow.close();
  } 

  openDescriptionWindow() {
    this.addAction(this.commandOpenDescriptionWindow);
  }

  commandOpenDescriptionWindow() {
    this._descriptionWindow.open();
  }

  closeDescriptionWindow() {
    this.addAction(this.commandCloseDescriptionWindow);
  }

  commandCloseDescriptionWindow() {
    this._descriptionWindow.close();
  }

  addChildren() {
    this.addAction(this.commandAddChildren);
  }

  commandAddChildren() {
    this.addWindows([
      this._titleWindow,
      this._descriptionWindow
    ]);
    this.addChild(this._cardDrawGameCardset);
  }

  stepStartPhase() {
    this.addAction(this.commandChangeStep, 'START_PHASE');
  }

  stepStartCardDrawGame() {
    this.addAction(this.commandChangeStep, 'START_CARD_DRAW_GAME');
  }

  stepEndCardDrawGame() {
    this.addAction(this.commandChangeStep, 'END_CARD_DRAW_GAME');
  }

  isStepStartPhase() {
    return this.getStep() === 'START_PHASE';
  }

  isStepStartCardDrawGame() {
    return this.getStep() === 'START_CARD_DRAW_GAME';
  }

  isStepEndCardDrawGame() {
    return this.getStep() === 'END_CARD_DRAW_GAME';
  }
  
  isBusy() {
    return super.isBusy() || 
      this._titleWindow.isBusy() || 
      this._descriptionWindow.isBusy() ||
      this._cardDrawGameCardset.isBusy();
  }

  endCardDrawGame(selectedIndex) {
    this.addAction(this.commandEndCardDrawGame, selectedIndex);
  }

  commandEndCardDrawGame(selectedIndex) {
    const sprite = this._cardDrawGameCardset.getSpriteByIndex(selectedIndex);
    this._cardDrawGameCardset.zoomAllCards(sprite);
    this._cardDrawGameCardset.zoomOutAllCards(sprite);
  }
}
class SceneTest {
  scene = {};
  status = 'START';
  seconds = 1;
  counter = 0;
  waitHandler = false;
  testDescription = 'You must undertake the test(s)!';
  assertTitle = '';
  assertValue = undefined;
  assertsToTest = [];
  assertsResults = [];
  pressToStartAsserts = false;
  results = [];
  toWatched = [];
  watched = [];
  childrenToAdd = [];
  throwErrors = [];

  constructor(scene) {
    this.scene = scene;
  }

  create() {
    // Override this method in the child class
  }

  addThrowableError(error) {
    this.throwErrors.push(error);
  }

  expectToThrow(title, error) {
    this.assertsToTest.push({
      type: 'throwError',
      title,
      value: error,
      toBe: true
    });
  }

  start() {
    // Override this method in the child class
  }

  update() {
    // Override this method in the child class
  }

  run() {
    return new Promise(async res => {
      if (this.throwErrors.length) {
        this.scene._nextTest = null;
        this.scene._phase = null;
        this.asserts();
        await this.processAsserts();
        return res(this.finishResult());
      }
      this.startTest();
      res(await this.finish());
    });
  }

  startTest() {
    this.counter = (GameConst.FPS * this.seconds);
    this.start();
    this.addChildren();
  }

  addChildren() {
    this.childrenToAdd.forEach(child => this.addChild(child));
  }

  finish() {
    return new Promise(async res => {
      const intervalId = setInterval(() => {
        if (this.status === 'FINISH') {
          res(this.finishResult());
          clearInterval(intervalId);
        }
      }, 100);
    });
  }

  finishResult() {
    const testName = this.constructor.name;
    let passed = false;
    let assertsResult = [{ 
      passed: false,
      assertsName: 'No assertion was made!',
      asserts: []
    }];
    if (this.hasResults()) {
      passed = this.results.every(result => result.passed);
      assertsResult = this.results;
    }
    return { 
      testName, 
      passed, 
      assertsResult 
    };
  }

  hasResults() {
    return this.results.length > 0;
  }

  updateTest() {
    this.copyWatched();
    if (this.counter) return this.counter--;
    if (this.pressToStartAsserts && !Input.isTriggered('ok')) return false;
    if (this.waitHandler) return false;
    if (this.status === 'START') {
      this.scene._nextTest = null;
      this.scene._phase = null;
      this.asserts();
      this.processAsserts();
      this.status = 'FINISH';
    }
  }

  copyWatched() {
    const watched = this.toWatched.map(w => ObjectHelper.copyObject(w));
    this.watched.push(watched);
  }

  async processAsserts() {
    return new Promise(async res => {
      await this.clear();
      for (const assert of this.assertsToTest) {
        const { type } = assert;
        if (type === 'assert') {
          this.processAssertsToBe(assert);
        }
        if (type === 'assertWas') {
          this.processAssertsWas(assert);
        }
        if (type === 'throwError') {
          this.processThrowError(assert);
        }
      }
      if (this.hasAsserts()) {
        this.results.push({
          passed: this.assertsResults.every(assert => assert.passed),
          assertsName: this.testDescription,
          asserts: this.assertsResults
        });
      }
      res(true);
    });
  }

  hasAsserts() {
    return this.assertsResults.length > 0;
  }

  clear() {
    return new Promise(async resolve => {
      await this.clearChildren();
      await this.clearWindows();
      resolve(true);
    });
  }

  clearChildren() {
    return new Promise(resolve => {
      const children = this.scene.children;
      while (children.length > 1) {
        children.forEach(async child => {
          if (child === this.scene._windowLayer) return false;
          child.destroy();
          await this.scene.removeChild(child);
        });
      }
      resolve(true);
    });
  }

  clearWindows() {
    return new Promise(resolve => {
      const windowChildren = this.scene._windowLayer.children;
      while (windowChildren.length) {
        windowChildren.forEach(async window => {
          window.destroy();
          await this.scene._windowLayer.removeChild(window);
        });
      }
      resolve(true);
    });
  }

  processAssertsToBe(assert) {
    const { type, title, value, toBe } = assert;
    const test = value === toBe;
    const assertResult = this.resultTest(test, toBe, value, title);
    this.assertsResults.push(assertResult);
  }

  resultTest(test, valueExpected, valueReceived, title) {
    if (test === false) {
      return this.testFailed(valueExpected, valueReceived, title);
    }
    const testSuccess = {
      passed: true,
      title,
      message: 'Test passed!'
    };
    return testSuccess;
  }

  testFailed(valueExpected, valueReceived, title) {
    return {
      passed: false,
      title,
      message: `Expected: ${valueExpected} Received: ${valueReceived}`
    };
  }

  processAssertsWas(assert) {
    const { type, title, fnOrValue, reference, params } = assert;
    const indexOfWatched = this.indexOfWatched(reference);
    const watched = this.watched.map((wat, index) => wat[indexOfWatched || 0]);
    const result = watched.some((watching, index) => {
      const obj = this.toWatched[indexOfWatched || 0];
      return this.assertWatched(obj, watching, fnOrValue, params);
    });
    const toBe = true;
    const test = result === toBe;
    const assertResult = this.resultTest(test, toBe, result, title);
    this.assertsResults.push(assertResult);
  }

  indexOfWatched(reference) {
    let index = this.toWatched.indexOf(reference) || 0;
    return index < 0 ? 0 : index;
  }

  assertWatched(reference, watching, fnOrValue, params) {
    if (this.isFunction(fnOrValue)) {
      const fnName = fnOrValue.name;
      watching = ObjectHelper.mergeObjects(reference, watching);
      return watching[fnName](...params) === true;
    }
    return watching[fnOrValue] === true;
  }

  processThrowError(assert) {
    const { title, value, toBe } = assert;
    const test = this.throwErrors.some(e => e.message === value.message && e.name === value.name);
    const assertResult = this.resultTest(test, toBe, value, title);
    this.assertsResults.push(assertResult);
  }

  isFunction(fnOrValue) {
    return typeof fnOrValue === 'function';
  }

  describe(description = 'You must undertake the test(s)!') {
    this.testDescription = description;
  }

  expect(title, value) {
    if (!title || value === undefined) {
      throw new Error('The expect method must have a title and a value!');
    }
    this.assertTitle = title;
    this.assertValue = value;
    return this;
  }

  toBe(valueToBe, title = this.assertTitle, valueToCompare = this.assertValue) {
    if (valueToBe === undefined) {
      throw new Error('The toBe method must have a value to compare!');
    }
    this.assertsToTest.push({
      type: 'assert',
      title: title || '',
      value: valueToCompare,
      toBe: valueToBe
    });
  }

  expectTrue(title, value) {
    if (!title || value === undefined) {
      throw new Error('The expectTrue method must have a title and a value!');
    }
    this.assertTitle = title;
    this.assertValue = value;
    const toBe = true;
    this.toBe(toBe, title, value);
  }

  expectWasTrue(title, fnOrValue, reference = null, ...params) {
    if (!title || !fnOrValue) {
      throw new Error('The expectWasTrue method must have a title and a function or value!');
    }
    this.assertsToTest.push({
      type: 'assertWas',
      title,
      fnOrValue,
      reference,
      params
    });
  }

  addWatched(watched) {
    this.toWatched.push(watched);
    this.attachChild(watched);
  }

  addHiddenWatched(watched) {
    this.toWatched.push(watched);
  }

  attachChild(child) {
    this.childrenToAdd.push(child);
  }

  addChild(child) {
    if (child instanceof Window_Base) {
      this.addWindow(child);
    } else {
      this.scene.addChild(child);
    }
  }

  addWindow(window) {
    this.scene._windowLayer.addChild(window);
  }

  pressToAsserts() {
    this.pressToStartAsserts = true;
  }

  createHandler() {
    this.waitHandler = true;
    this.seconds = 0;
    return () => this.waitHandler = false;
  }
}

// tests CARD Sprite
class ErroOnCreateCardSpriteTest extends SceneTest {
  create() {
    CardSprite.create();
  }

  asserts() {
    this.describe('Deve retornar um erro ao tentar criar um card inválido!');
    this.expectToThrow('Houve um erro ao criar?', new Error('Card inválido!'));
  }
}
class StartOpenCardSpriteTest extends SceneTest {
  create() {
    const card = CardGenerator.generateCard();
    this.subject = CardSprite.create(
      card.type,
      card.color,
      card.figureName,
      card.attack,
      card.health
    );
    this.addWatched(this.subject);
    const centerXPosition = (Graphics.boxWidth / 2 - this.subject.width / 2);
    const centerYPosition = (Graphics.boxHeight / 2 - this.subject.height / 2);
    this.subject.startOpen(centerXPosition, centerYPosition);
    this.subject.show();
  }

  asserts() {
    this.describe('Deve iniciar o card aberto!');
    this.expectTrue('Esta aberto?', this.subject.isOpened());
  }
}
class StartClosedCardSpriteTest extends SceneTest {
  create() {
    const card = CardGenerator.generateCard();
    this.subject = CardSprite.create(
      card.type,
      card.color,
      card.figureName,
      card.attack,
      card.health
    );
    this.addWatched(this.subject);
    const centerXPosition = (Graphics.boxWidth / 2 - this.subject.width / 2);
    const centerYPosition = (Graphics.boxHeight / 2 - this.subject.height / 2);
    this.subject.startClosed(centerXPosition, centerYPosition);
    this.subject.show();
  }

  asserts() {
    this.describe('Deve iniciar o card fechado!');
    this.expectTrue('Esta fechado?', this.subject.isClosed());
  }
}
class OpenCardSpriteTest extends SceneTest {
  create() {
    const card = CardGenerator.generateCard();
    this.subject = CardSprite.create(
      card.type,
      card.color,
      card.figureName,
      card.attack,
      card.health
    );
    this.addWatched(this.subject);
    const centerXPosition = (Graphics.boxWidth / 2 - this.subject.width / 2);
    const centerYPosition = (Graphics.boxHeight / 2 - this.subject.height / 2);
    this.subject.startClosed(centerXPosition, centerYPosition);
    this.subject.open();
  }

  asserts() {
    this.describe('Deve abrir o card!');
    this.expectTrue('Esta aberta?', this.subject.isOpened());
  }
}
class CloseCardSpriteTest extends SceneTest {
  create() {
    const card = CardGenerator.generateCard();
    this.subject = CardSprite.create(
      card.type,
      card.color,
      card.figureName,
      card.attack,
      card.health
    );
    this.addWatched(this.subject);
    const centerXPosition = (Graphics.boxWidth / 2 - this.subject.width / 2);
    const centerYPosition = (Graphics.boxHeight / 2 - this.subject.height / 2);
    this.subject.startOpen(centerXPosition, centerYPosition);
    this.subject.close();
  }

  asserts() {
    this.describe('Deve fechar o card!');
    this.expectTrue('Esta fechado?', this.subject.isClosed());
  }
}
class DisableCardSpriteTest extends SceneTest {
  create() {
    const card = CardGenerator.generateCard();
    this.subject = CardSprite.create(
      card.type,
      card.color,
      card.figureName,
      card.attack,
      card.health
    );
    this.addWatched(this.subject);
    const centerXPosition = (Graphics.boxWidth / 2 - this.subject.width / 2);
    const centerYPosition = (Graphics.boxHeight / 2 - this.subject.height / 2);
    this.subject.startOpen(centerXPosition, centerYPosition);
    this.subject.show();
    this.subject.enable();
    this.subject.disable();
  }

  asserts() {
    this.describe('Deve desabilitar o card!');
    this.expectTrue('Esta disabilitado?', this.subject.isDisabled());
  }
}
class EnableCardSpriteTest extends SceneTest {
  create() {
    const card = CardGenerator.generateCard();
    this.subject = CardSprite.create(
      card.type,
      card.color,
      card.figureName,
      card.attack,
      card.health
    );
    this.addWatched(this.subject);
    const centerXPosition = (Graphics.boxWidth / 2 - this.subject.width / 2);
    const centerYPosition = (Graphics.boxHeight / 2 - this.subject.height / 2);
    this.subject.startOpen(centerXPosition, centerYPosition);
    this.subject.show();
    this.subject.disable();
    this.subject.enable();
  }

  asserts() {
    this.describe('Deve habilitar o card!');
    this.expectTrue('Esta habilitado?', this.subject.isEnabled());
  }
}
class MoveCardSpriteTest extends SceneTest {
  create() {
    const card = CardGenerator.generateCard();
    this.subject = CardSprite.create(
      card.type,
      card.color,
      card.figureName,
      card.attack,
      card.health
    );
    this.addWatched(this.subject);
    this.subject.startOpen(0, 0);
    this.subject.show();
    const destinyXPosition = (Graphics.boxWidth / 2 - this.subject.width / 2);
    const destinyYPosition = (Graphics.boxHeight / 2 - this.subject.height / 2);
    const avanceXposition = (Graphics.boxWidth - this.subject.width);
    const avanceYposition = (Graphics.boxHeight - this.subject.height);
    const returnStartPosition = 0;
    const move1 = CardSprite.createMove(destinyXPosition, destinyYPosition);
    const move2 = CardSprite.createMove(avanceXposition, destinyYPosition);
    const moves = [move1, move2];
    this.subject.toMove(moves);
  }

  asserts() {
    const destinyYPosition = (Graphics.boxHeight / 2 - this.subject.height / 2);
    const avanceXposition = (Graphics.boxWidth - this.subject.width);
    this.describe('Deve mover cartão pela tela.');
    this.expect('Esta no destino x?', this.subject.x).toBe(avanceXposition);
    this.expect('Esta no destino y', this.subject.y).toBe(destinyYPosition);
    this.expectWasTrue('Estava em movimento?', this.subject.isMoving);
  }
}
class HoveredCardSpriteTest extends SceneTest {
  create() {
    const card = CardGenerator.generateCard();
    this.subject = CardSprite.create(
      card.type,
      card.color,
      card.figureName,
      card.attack,
      card.health
    );
    this.addWatched(this.subject);
    const centerXPosition = (Graphics.boxWidth / 2 - this.subject.width / 2);
    const centerYPosition = (Graphics.boxHeight / 2 - this.subject.height / 2);
    this.subject.startOpen(centerXPosition, centerYPosition);
    this.subject.show();
    this.subject.hover();
  }

  asserts() {
    this.describe('Deve colocar o card em hovered!');
    this.expectTrue('Esta em hovered?', this.subject.isHovered());
  } 
}
class UnhoveredCardSpriteTest extends SceneTest {
  create() {
    const card = CardGenerator.generateCard();
    this.subject = CardSprite.create(
      card.type,
      card.color,
      card.figureName,
      card.attack,
      card.health
    );
    this.addWatched(this.subject);
    const centerXPosition = (Graphics.boxWidth / 2 - this.subject.width / 2);
    const centerYPosition = (Graphics.boxHeight / 2 - this.subject.height / 2);
    this.subject.startOpen(centerXPosition, centerYPosition);
    this.subject.show();
    this.subject.hover();
    this.subject.unhover();
  }

  asserts() {
    this.describe('Deve colocar o card em unhovered!');
    this.expectTrue('Esta sem hovered?', this.subject.isUnhovered());
  } 
}
class SelectedCardSpriteTest extends SceneTest {
  create() {
    const card = CardGenerator.generateCard();
    this.subject = CardSprite.create(
      card.type,
      card.color,
      card.figureName,
      card.attack,
      card.health
    );
    this.addWatched(this.subject);
    const centerXPosition = (Graphics.boxWidth / 2 - this.subject.width / 2);
    const centerYPosition = (Graphics.boxHeight / 2 - this.subject.height / 2);
    this.subject.startOpen(centerXPosition, centerYPosition);
    this.subject.show();
    this.subject.select();
  }

  asserts() {
    this.describe('Deve colocar o card em seleção!');
    this.expectTrue('Esta em seleção?', this.subject.isSelected());
  }
}
class UnselectedCardSpriteTest extends SceneTest {
  create() {
    const card = CardGenerator.generateCard();
    this.subject = CardSprite.create(
      card.type,
      card.color,
      card.figureName,
      card.attack,
      card.health
    );
    this.addWatched(this.subject);
    const centerXPosition = (Graphics.boxWidth / 2 - this.subject.width / 2);
    const centerYPosition = (Graphics.boxHeight / 2 - this.subject.height / 2);
    this.subject.startOpen(centerXPosition, centerYPosition);
    this.subject.show();
    this.subject.select();
    this.subject.unselect();
  }

  asserts() {
    this.describe('Deve retirar o card de seleção!');
    this.expectTrue('Esta sem seleção?', this.subject.isUnselected());
  }
}
class IluminatedCardSpriteTest extends SceneTest {
  create() {
    const card = CardGenerator.generateCard();
    this.subject = CardSprite.create(
      card.type,
      card.color,
      card.figureName,
      card.attack,
      card.health
    );
    this.addWatched(this.subject);
    const centerXPosition = (Graphics.boxWidth / 2 - this.subject.width / 2);
    const centerYPosition = (Graphics.boxHeight / 2 - this.subject.height / 2);
    this.subject.startOpen(centerXPosition, centerYPosition);
    this.subject.show();
    this.subject.iluminate();
  }

  asserts() {
    this.describe('Deve colocar o card em iluminado!');
    this.expectTrue('Esta em iluminado?', this.subject.isIluminated());
  }
}
class UniluminatedCardSpriteTest extends SceneTest {
  create() {
    const card = CardGenerator.generateCard();
    this.subject = CardSprite.create(
      card.type,
      card.color,
      card.figureName,
      card.attack,
      card.health
    );
    this.addWatched(this.subject);
    const centerXPosition = (Graphics.boxWidth / 2 - this.subject.width / 2);
    const centerYPosition = (Graphics.boxHeight / 2 - this.subject.height / 2);
    this.subject.startOpen(centerXPosition, centerYPosition);
    this.subject.show();
    this.subject.iluminate();
    this.subject.uniluminate();
  }

  asserts() {
    this.describe('Deve retirar a iluminação do card!');
    this.expectTrue('Esta sem iluminado?', this.subject.isUniluminated());
  }
}
class FlashCardSpriteTest extends SceneTest {
  create() {
    const card = CardGenerator.generateCard();
    this.subject = CardSprite.create(
      card.type,
      card.color,
      card.figureName,
      card.attack,
      card.health
    );
    this.addWatched(this.subject);
    const centerXPosition = (Graphics.boxWidth / 2 - this.subject.width / 2);
    const centerYPosition = (Graphics.boxHeight / 2 - this.subject.height / 2);
    this.subject.startOpen(centerXPosition, centerYPosition);
    this.subject.show();
    const color = 'white';
    const duration = GameConst.FPS;
    const infinity = -1;
    this.subject.flash(color, duration, infinity);
  }

  asserts() {
    this.describe('Deve receber um flash de luz!');
    this.expectWasTrue('Houve flash de luz?', this.subject.isFlashPlaying);
  } 
}
class AnimationCardSpriteTest extends SceneTest {
  create() {
    const baseCenterXPosition = (Graphics.boxWidth / 2 - CardsetSprite.contentOriginalWidth() / 2);
    const baseCenterYPosition = (Graphics.boxHeight / 2 - CardsetSprite.contentOriginalHeight() / 2);
    this.base = CardsetSprite.create(baseCenterXPosition, baseCenterYPosition);
    this.attachChild(this.base);
    this.base.setBackgroundColor('black');
    this.base.show();
    const card = CardGenerator.generateCard();
    this.subject = CardSprite.create(
      card.type,
      card.color,
      card.figureName,
      card.attack,
      card.health
    );
    this.addHiddenWatched(this.subject);
    const centerXPosition = (this.base.width / 2 - this.subject.width / 2);
    const centerYPosition = 0;
    this.subject.startOpen(centerXPosition, centerYPosition);
    this.subject.show();
    this.base.addChild(this.subject);
    const times = 1;
    this.subject.damage(times, this.scene);
  }

  asserts() {
    this.describe('Deve receber uma animação!');
    this.expectTrue('Base é visível?', this.base.isVisible());
    this.expectWasTrue('Houve animação?', this.subject.isAnimationPlaying);
  }
}
class QuakeCardSpriteTest extends SceneTest {
  create() {
    const card = CardGenerator.generateCard();
    this.subject = CardSprite.create(
      card.type,
      card.color,
      card.figureName,
      card.attack,
      card.health
    );
    this.addWatched(this.subject);
    const centerXPosition = (Graphics.boxWidth / 2 - this.subject.width / 2);
    const centerYPosition = (Graphics.boxHeight / 2 - this.subject.height / 2);
    this.subject.startOpen(centerXPosition, centerYPosition);
    this.subject.show();
    const times = 10;
    this.subject.quake(times);
  }

  asserts() {
    this.describe('Deve tremer o card!');
    this.expectWasTrue('Houve um movimento?', this.subject.isMoving);
  }
}
class ZoomCardSpriteTest extends SceneTest {
  create() {
    const card = CardGenerator.generateCard();
    this.subject = CardSprite.create(
      card.type,
      card.color,
      card.figureName,
      card.attack,
      card.health
    );
    this.addWatched(this.subject);
    const centerXPosition = (Graphics.boxWidth / 2 - this.subject.width / 2);
    const centerYPosition = (Graphics.boxHeight / 2 - this.subject.height / 2);
    this.subject.startOpen(centerXPosition, centerYPosition);
    this.subject.show();
    this.subject.zoom();
  }

  asserts() {
    this.describe('Deve colocar o card em zoom!');
    this.expectTrue('Esta ampliado?', this.subject.isZoom());
  }
}
class ZoomOutCardSpriteTest extends SceneTest {
  create() {
    const card = CardGenerator.generateCard();
    this.subject = CardSprite.create(
      card.type,
      card.color,
      card.figureName,
      card.attack,
      card.health
    );
    this.addWatched(this.subject);
    const centerXPosition = (Graphics.boxWidth / 2 - this.subject.width / 2);
    const centerYPosition = (Graphics.boxHeight / 2 - this.subject.height / 2);
    this.subject.startOpen(centerXPosition, centerYPosition);
    this.subject.show();
    this.subject.zoom();
    this.subject.zoomOut();
  }

  asserts() {
    this.describe('Deve colocar o card em escala original!');
    this.expectTrue('Esta em escala original?', this.subject.isOriginalScale());
  }
}
class LeaveCardSpriteTest extends SceneTest {
  create() {
    const card = CardGenerator.generateCard();
    this.subject = CardSprite.create(
      card.type,
      card.color,
      card.figureName,
      card.attack,
      card.health
    );
    this.addWatched(this.subject);
    const centerXPosition = (Graphics.boxWidth / 2 - this.subject.width / 2);
    const centerYPosition = (Graphics.boxHeight / 2 - this.subject.height / 2);
    this.subject.startOpen(centerXPosition, centerYPosition);
    this.subject.show();
    this.subject.leave();
  }

  asserts() {
    this.describe('Deve colocar o card em leave!');
    this.expect('Esta em largura zerada?', this.subject.width).toBe(0);
    this.expect('Esta em altura zerada?', this.subject.height).toBe(0);
    this.expectTrue('Esta invisível?', this.subject.isHidden());
  }
}
class FlipTurnToUpCardSpriteTest extends SceneTest {
  create() {
    const card = CardGenerator.generateCard();
    this.subject = CardSprite.create(
      card.type,
      card.color,
      card.figureName,
      card.attack,
      card.health
    );
    this.addWatched(this.subject);
    const centerXPosition = (Graphics.boxWidth / 2 - this.subject.width / 2);
    const centerYPosition = (Graphics.boxHeight / 2 - this.subject.height / 2);
    this.subject.startOpen(centerXPosition, centerYPosition);
    this.subject.setTurnToDown();
    this.subject.show();
    this.subject.flipTurnToUp();
  }

  asserts() {
    this.describe('Deve virar o card para cima!');
    this.expectTrue('Esta virado para cima?', this.subject.isTurnedToUp());
    this.expectTrue('Esta aberto?', this.subject.isOpened());
  }
}
class FlipTurnToDownCardSpriteTest extends SceneTest {
  create() {
    const card = CardGenerator.generateCard();
    this.subject = CardSprite.create(
      card.type,
      card.color,
      card.figureName,
      card.attack,
      card.health
    );
    this.addWatched(this.subject);
    const centerXPosition = (Graphics.boxWidth / 2 - this.subject.width / 2);
    const centerYPosition = (Graphics.boxHeight / 2 - this.subject.height / 2);
    this.subject.startOpen(centerXPosition, centerYPosition);
    this.subject.setTurnToUp();
    this.subject.show();
    this.subject.flipTurnToDown();
  }

  asserts() {
    this.describe('Deve virar o card para baixo!');
    this.expectTrue('Esta virado para baixo?', this.subject.isTurnedToDown());
    this.expectTrue('Esta aberto?', this.subject.isOpened());
  }
}
class UpdatingPointsCardSpriteTest extends SceneTest {
  create() {
    const card = CardGenerator.generateCard(CardTypes.BATTLE);
    this.subject = CardSprite.create(
      card.type,
      card.color,
      card.figureName,
      0,
      0
    );
    this.addWatched(this.subject);
    const centerXPosition = (Graphics.boxWidth / 2 - this.subject.width / 2);
    const centerYPosition = (Graphics.boxHeight / 2 - this.subject.height / 2);
    this.subject.startOpen(centerXPosition, centerYPosition);
    this.subject.show();
    this.subject.changePoints(25, 18);
  }

  asserts() {
    this.describe('Deve atualizar os pontos do card!');
    this.expectWasTrue('Foram atualizandos?', this.subject.isUpdatingPoints);
  }
}
// tests CARDSET
class StartPositionCardsetSpriteTest extends SceneTest {
  create() {
    const centerXPosition = (Graphics.boxWidth / 2 - CardsetSprite.contentOriginalWidth() / 2);
    const centerYPosition = (Graphics.boxHeight / 2 - CardsetSprite.contentOriginalHeight() / 2);
    this.subject = CardsetSprite.create(centerXPosition, centerYPosition);
    this.addWatched(this.subject);
    this.subject.show();
  }

  asserts() {
    const centerXPosition = (Graphics.boxWidth / 2 - CardsetSprite.contentOriginalWidth() / 2);
    const centerYPosition = (Graphics.boxHeight / 2 - CardsetSprite.contentOriginalHeight() / 2);
    this.describe('Deve iniciar na posição central!');
    this.expectTrue('Esta no meio?', this.subject.isVisible());
    this.expect('Esta na posição x?', this.subject.x).toBe(centerXPosition);
    this.expect('Esta na posição y?', this.subject.y).toBe(centerYPosition);
  }
}
class SetCardsCardsetSpriteTest extends SceneTest {
  create() {
    const x = 0;
    const y = 0;
    this.subject = CardsetSprite.create(x, y);
    this.addWatched(this.subject);
    this.subject.centralize();
    this.subject.show();
    const cards = CardGenerator.generateCards(1);
    const sprites = this.subject.setCards(cards, x, y);
    this.subject.showCards(sprites);
    this.sprites = sprites;
  }

  asserts() {
    this.describe('Deve mostrar as cartas!');
    const numCards = 1;
    const padding = 0;
    const x = 0;
    const y = 0;
    const positions = CardsetSprite.createPositions(numCards, padding, x, y);
    this.expectTrue('Esta mostrando na posição inícial?', this.subject.allCardsAreVisible());
    this.expectTrue('Estão nas posições?', this.subject.isSpritesPositions(positions, this.sprites));
  }
}
class SetTurnToDownCardsCardsetSpriteTest extends SceneTest {
  create() {
    this.subject = CardsetSprite.create(0, 0);
    this.addWatched(this.subject);
    this.subject.centralize();
    this.subject.show();
    const numCards = 6;
    const cards = CardGenerator.generateCards(numCards);
    const sprites = this.subject.listCards(cards);
    this.subject.setTurnToDownCards(sprites);
    this.subject.showCards(sprites);
    this.sprites = sprites;
  }

  asserts() {
    this.describe('Deve listar as cartas viradas para baixo!');
    this.expectTrue('Esta viradas para baixo?', this.subject.allCardsTurnedToDown());
  }
}
class SetAllCardsInPositionCardsetSpriteTest extends SceneTest {
  create() {
    const x = 0;
    const y = 0;
    this.subject = CardsetSprite.create(x, y);
    this.addWatched(this.subject);
    this.subject.centralize();
    this.subject.show();
    const cards = CardGenerator.generateCards(1);
    const sprites = this.subject.setCards(cards, 100, 100);
    this.subject.setAllCardsInPosition(sprites, x, y);
    this.subject.showCards(sprites);
    this.sprites = sprites;
  }

  asserts() {
    this.describe('Deve mostrar as cartas na posição!');
    const numCards = 1;
    const padding = 0;
    const x = 0;
    const y = 0;
    const positions = CardsetSprite.createPositions(numCards, padding, x, y);
    this.expectTrue('Esta mostrando na posição inícial?', this.subject.allCardsAreVisible());
    this.expectTrue('Estão nas posições?', this.subject.isSpritesPositions(positions, this.sprites));
  }
}
class SetAllCardsInPositionsCardsetSpriteTest extends SceneTest {
  create() {
    const x = 0;
    const y = 0;
    this.subject = CardsetSprite.create(x, y);
    this.addWatched(this.subject);
    this.subject.centralize();
    this.subject.show();
    const cards = CardGenerator.generateCards(2);
    const sprites = this.subject.setCards(cards, 0, 0);
    const position1 = CardSprite.createPosition(0, -CardSprite.contentOriginalHeight(), 0);
    const position2 = CardSprite.createPosition(CardSprite.contentOriginalWidth(), CardSprite.contentOriginalHeight(), 1);
    const positions = [position1, position2];
    this.subject.setAllCardsInPositions(sprites, positions);
    this.subject.showCards(sprites);
    this.sprites = sprites;
  }

  asserts() {
    this.describe('Deve mostrar as cartas na posição!');
    const numCards = 2;
    const position1 = CardSprite.createPosition(0, -CardSprite.contentOriginalHeight(), 0);
    const position2 = CardSprite.createPosition(CardSprite.contentOriginalWidth(), CardSprite.contentOriginalHeight(), 1);
    const positions = [position1, position2];
    this.expectTrue('Esta mostrando na posição inícial?', this.subject.allCardsAreVisible());
    this.expectTrue('Estão nas posições?', this.subject.isSpritesPositions(positions, this.sprites));
  }
}
class ListCardsCardsetSpriteTest extends SceneTest {
  create() {
    this.subject = CardsetSprite.create(0, 0);
    this.addWatched(this.subject);
    this.subject.centralize();
    this.subject.show();
    const numCards = 6;
    const cards = CardGenerator.generateCards(numCards);
    const sprites = this.subject.listCards(cards);
    this.subject.showCards(sprites);
    this.sprites = sprites;
  }

  asserts() {
    this.describe('Deve listar as cartas!');
    const numCards = 6;
    const positions = CardsetSprite.createPositionsList(numCards);
    this.expectTrue('Esta mostrando na posição de lista?', this.subject.allCardsAreVisible());
    this.expectTrue('Estão nas posições?', this.subject.isSpritesPositions(positions, this.sprites));
  }
}
class StartClosedCardsCardsetSpriteTest extends SceneTest {
  create() {
    this.subject = CardsetSprite.create(0, 0);
    this.addWatched(this.subject);
    this.subject.centralize();
    this.subject.show();
    const numCards = 1;
    const cards = CardGenerator.generateCards(numCards);
    const sprites = this.subject.setCards(cards);
    this.subject.startClosedCards(sprites);
    this.sprites = sprites;
  }

  asserts() {
    this.describe('Deve iniciar as cartas fechadas!');
    this.expectTrue('Estão nas posições?', this.subject.allCardsIsClosed(this.sprites));
  }
}
class OpenAllCardsCardsetSpriteTest extends SceneTest {
  create() {
    this.subject = CardsetSprite.create(0, 0);
    this.addWatched(this.subject);
    this.subject.centralize();
    this.subject.show();
    const numCards = 6;
    const cards = CardGenerator.generateCards(numCards);
    const sprites = this.subject.listCards(cards);
    this.subject.startClosedCards(sprites);
    this.subject.showCards(sprites);
    this.subject.openAllCards(sprites);
    this.sprites = sprites;
  }

  asserts() {
    this.describe('Deve abrir todas as cartas!');
    this.expectTrue('Estão aberto?', this.subject.allCardsAreOpened(this.sprites));
  }
}
class OpenCardsCardsetSpriteTest extends SceneTest {
  create() {
    this.subject = CardsetSprite.create(0, 0);
    this.addWatched(this.subject);
    this.subject.centralize();
    this.subject.show();
    const numCards = 6;
    const cards = CardGenerator.generateCards(numCards);
    const sprites = this.subject.listCards(cards);
    this.subject.startClosedCards(sprites);
    this.subject.showCards(sprites);
    this.subject.openCards(sprites);
    this.sprites = sprites;
  }

  asserts() {
    this.describe('Deve abrir as cartas!');
    this.expectTrue('Estão aberto?', this.subject.allCardsAreOpened(this.sprites));
  }
}
class CloseAllCardsCardsetSpriteTest extends SceneTest {
  create() {
    this.subject = CardsetSprite.create(0, 0);
    this.addWatched(this.subject);
    this.subject.centralize();
    this.subject.show();
    const numCards = 6;
    const cards = CardGenerator.generateCards(numCards);
    const sprites = this.subject.listCards(cards);
    this.subject.showCards(sprites);
    this.subject.closeAllCards(sprites);
    this.sprites = sprites;
  }

  asserts() {
    this.describe('Deve fechar todas as cartas!');
    this.expectTrue('Estão fechados?', this.subject.allCardsIsClosed(this.sprites));
  }
}
class CloseCardsCardsetSpriteTest extends SceneTest {
  create() {
    this.subject = CardsetSprite.create(0, 0);
    this.addWatched(this.subject);
    this.subject.centralize();
    this.subject.show();
    const numCards = 6;
    const cards = CardGenerator.generateCards(numCards);
    const sprites = this.subject.listCards(cards);
    this.subject.showCards(sprites);
    this.subject.closeCards(sprites);
    this.sprites = sprites;
  }

  asserts() {
    this.describe('Deve fechar as cartas!');
    this.expectTrue('Estão fechados?', this.subject.allCardsIsClosed(this.sprites));
  }
}
class MoveAllCardsInListCardsetSpriteTest extends SceneTest {
  create() {
    this.subject = CardsetSprite.create(0, 0);
    this.addWatched(this.subject);
    this.subject.centralize();
    this.subject.show();
    const numCards = 6;
    const cards = CardGenerator.generateCards(numCards);
    const screenWidth = Graphics.boxWidth;
    const sprites = this.subject.setCards(cards, screenWidth);
    this.subject.showCards(sprites);
    this.subject.moveAllCardsInlist(sprites);
    this.sprites = sprites;
  }

  asserts() {
    this.describe('Deve mover todas as cartas!');
    const numCards = 6;
    const positions = CardsetSprite.createPositionsList(numCards);
    this.expectTrue('Estão nas posições?', this.subject.isSpritesPositions(positions, this.sprites));
  }
}
class MoveCardsInListCardsetSpriteTest extends SceneTest {
  create() {
    this.subject = CardsetSprite.create(0, 0);
    this.addWatched(this.subject);
    this.subject.centralize();
    this.subject.show();
    const numCards = 6;
    const cards = CardGenerator.generateCards(numCards);
    const screenWidth = Graphics.boxWidth;
    const sprites = this.subject.setCards(cards, screenWidth);
    this.subject.showCards(sprites);
    this.subject.moveCardsInlist(sprites);
    this.sprites = sprites;
  }

  asserts() {
    this.describe('Deve mover as cartas em posição de lista!');
    const numCards = 6;
    const positions = CardsetSprite.createPositionsList(numCards);
    this.expectTrue('Estão nas posições?', this.subject.isSpritesPositions(positions, this.sprites));
  }
}
class MoveAllCardsToPositionCardsetSpriteTest extends SceneTest {
  create() {
    this.subject = CardsetSprite.create(0, 0);
    this.addWatched(this.subject);
    this.subject.centralize();
    this.subject.show();
    const numCards = 6;
    const cards = CardGenerator.generateCards(numCards);
    const sprites = this.subject.setCards(cards);
    const x = CardsetSprite.contentOriginalWidth() / 2;
    const y = 0;
    this.subject.showCards(sprites);
    this.subject.moveAllCardsToPosition(sprites, x, y);
    this.sprites = sprites;
  }

  asserts() {
    this.describe('Deve mover todas as cartas para a posição!');
    const numCards = 6;
    const padding = 0;
    const x = CardsetSprite.contentOriginalWidth() / 2;
    const y = 0;
    const positions = CardsetSprite.createPositions(numCards, padding, x, y);
    this.expectTrue('Estão nas posições?', this.subject.isSpritesPositions(positions, this.sprites));
  }
}
class MoveCardsToPositionCardsetSpriteTest extends SceneTest {
  create() {
    this.subject = CardsetSprite.create(0, 0);
    this.addWatched(this.subject);
    this.subject.centralize();
    this.subject.show();
    const numCards = 6;
    const cards = CardGenerator.generateCards(numCards);
    const sprites = this.subject.setCards(cards);
    const x = CardsetSprite.contentOriginalWidth() / 2;
    const y = 0;
    this.subject.showCards(sprites);
    this.subject.moveCardsToPosition(sprites, x, y);
    this.sprites = sprites;
  }

  asserts() {
    this.describe('Deve mover as cartas para a posição!');
    const numCards = 6;
    const padding = 0;
    const x = CardsetSprite.contentOriginalWidth() / 2;
    const y = 0;
    const positions = CardsetSprite.createPositions(numCards, padding, x, y);
    this.expectTrue('Estão nas posições?', this.subject.isSpritesPositions(positions, this.sprites));
  }
}
class MoveAllCardsToPositionsCardsetSpriteTest extends SceneTest {
  create() {
    this.subject = CardsetSprite.create(0, 0);
    this.addWatched(this.subject);
    this.subject.centralize();
    this.subject.show();
    const numCards = 2;
    const cards = CardGenerator.generateCards(numCards);
    const sprites = this.subject.setCards(cards);
    const position1 = CardSprite.createPosition(0, -CardSprite.contentOriginalHeight(), 0);
    const position2 = CardSprite.createPosition(CardSprite.contentOriginalWidth(), CardSprite.contentOriginalHeight(), 1);
    const positions = [position1, position2];
    this.subject.showCards(sprites);
    this.subject.moveAllCardsToPositions(sprites, positions);
    this.sprites = sprites;
  }

  asserts() {
    this.describe('Deve mover todas as cartas para a posição!');
    const position1 = CardSprite.createPosition(0, -CardSprite.contentOriginalHeight(), 0);
    const position2 = CardSprite.createPosition(CardSprite.contentOriginalWidth(), CardSprite.contentOriginalHeight(), 1);
    const positions = [position1, position2];
    this.expectTrue('Estão nas posições?', this.subject.isSpritesPositions(positions, this.sprites));
  }
}
class AddAllCardsToListCardsetSpriteTest extends SceneTest {
  create() {
    this.subject = CardsetSprite.create(0, 0);
    this.addWatched(this.subject);
    this.subject.centralize();
    this.subject.show();
    const numCards = 6;
    const cards = CardGenerator.generateCards(numCards);
    const sprites = this.subject.listCards(cards);
    const addSprites = sprites.filter((sprite, index) => index >= 4);
    const screenWidth = Graphics.boxWidth;
    this.subject.setAllCardsInPosition(addSprites, screenWidth);
    this.subject.showCards(sprites);
    this.subject.moveAllCardsInlist(sprites);
    this.sprites = sprites;
  }

  asserts() {
    this.describe('Deve adicionar todas as cartas na lista!');
    const numCards = 6;
    const positions = CardsetSprite.createPositionsList(numCards);
    this.expectTrue('Estão nas posições?', this.subject.isSpritesPositions(positions, this.sprites));
  }
}
class AddCardsToListCardsetSpriteTest extends SceneTest {
  create() {
    this.subject = CardsetSprite.create(0, 0);
    this.addWatched(this.subject);
    this.subject.centralize();
    this.subject.show();
    const numCards = 6;
    const cards = CardGenerator.generateCards(numCards);
    const sprites = this.subject.listCards(cards);
    const addSprites = sprites.filter((sprite, index) => index >= 4);
    const screenWidth = Graphics.boxWidth;
    this.subject.setAllCardsInPosition(addSprites, screenWidth);
    this.subject.showCards(sprites);
    this.subject.moveCardsInlist(sprites);
    this.sprites = sprites;
  }

  asserts() {
    this.describe('Deve adicionar as cartas na lista!');
    const numCards = 6;
    const positions = CardsetSprite.createPositionsList(numCards);
    this.expectTrue('Estão nas posições?', this.subject.isSpritesPositions(positions, this.sprites));
  }
}
class DisableCardsCardsetSpriteTest extends SceneTest {
  create() {
    this.subject = CardsetSprite.create(0, 0);
    this.addWatched(this.subject);
    this.subject.centralize();
    this.subject.show();
    const numCards = 10;
    const cards = CardGenerator.generateCards(numCards);
    const disableCardsIndex = [1, 2, 7, 8, 9];
    const sprites = this.subject.listCards(cards);
    const disableSprites = sprites.filter((sprite, index) => disableCardsIndex.includes(index));
    this.subject.disableCards(disableSprites);
    this.subject.showCards(sprites);
  }

  asserts() {
    this.describe('Deve desabilitar as cartas!');
    const numCards = 10;
    const enableCardsIndex = [0, 3, 4, 5, 6];
    const disableCardsIndex = [1, 2, 7, 8, 9];
    const positions = CardsetSprite.createPositionsList(numCards);
    this.expectTrue('Estão desabilitados?', this.subject.isDisabledCardIndexs(disableCardsIndex));
    this.expectTrue('Estão habilitados?', this.subject.isEnabledCardIndexs(enableCardsIndex));
  }
}
class StaticModeCardsetSpriteTest extends SceneTest {
  create() {
    this.subject = CardsetSprite.create(0, 0);
    this.addWatched(this.subject);
    this.subject.centralize();
    this.subject.show();
    const numCards = 10;
    const cards = CardGenerator.generateCards(numCards);
    const sprites = this.subject.listCards(cards);
    this.subject.showCards(sprites);
    const selectCards = (cards) => {};
    this.subject.selectMode(selectCards);
    this.subject.staticMode();
  }

  asserts() {
    this.describe('Deve entrar em modo estático!');
    this.expectTrue('Esta em modo estático?', this.subject.isStaticMode());
  }
}
class SelectModeCardsetSpriteTest extends SceneTest {
  create() {
    this.subject = CardsetSprite.create(0, 0);
    this.addWatched(this.subject);
    this.subject.centralize();
    this.subject.show();
    const numCards = 10;
    const cards = CardGenerator.generateCards(numCards);
    const sprites = this.subject.listCards(cards);
    const disableCardsIndex = [3, 4, 5, 6, 7, 8, 9];
    const disableSprites = sprites.filter((sprite, index) => disableCardsIndex.includes(index));
    this.subject.disableCards(disableSprites);
    this.subject.showCards(sprites);
    const endTest = this.createHandler();
    const unlimited = -1;
    this.cardsSelected = [];
    const selectHandler = (cards) => {
      this.cardsSelected = cards;
      endTest();
    };
    this.subject.selectMode(selectHandler, unlimited);
  }

  asserts() {
    this.describe('Deve entrar em modo seleção com escolha!');
    this.expectTrue('Deve selecionar 3 cartas', this.cardsSelected.length === 3);
    this.expectWasTrue('Esta em modo seleção?', this.subject.isSelectMode);
  }
}
class SelectModeNoSelectCardsetSpriteTest extends SceneTest {
  create() {
    this.subject = CardsetSprite.create(0, 0);
    this.addWatched(this.subject);
    this.subject.centralize();
    this.subject.show();
    const numCards = 10;
    const cards = CardGenerator.generateCards(numCards);
    const sprites = this.subject.listCards(cards);
    const disableCardsIndex = [1, 2, 7, 8, 9];
    const disableSprites = sprites.filter((sprite, index) => disableCardsIndex.includes(index));
    this.subject.disableCards(disableSprites);
    this.subject.showCards(sprites);
    const selectNumber = 0;
    this.cardsSelected = [];
    const selectHandler = (cards) => {
      this.cardsSelected = cards;
    };
    this.subject.selectMode(selectHandler, selectNumber);
  }

  asserts() {
    this.describe('Deve entrar em modo seleção com escolha!');
    this.expectTrue('Esta em modo seleção?', this.subject.isSelectMode());
    this.expectTrue('Deve ser zerado!', this.cardsSelected.length === 0);
  }
}
class SelectModeLimitedCardsetSpriteTest extends SceneTest {
  create() {
    this.subject = CardsetSprite.create(0, 0);
    this.addWatched(this.subject);
    this.subject.centralize();
    this.subject.show();
    const numCards = 10;
    const cards = CardGenerator.generateCards(numCards);
    const sprites = this.subject.listCards(cards);
    const disableCardsIndex = [1, 2, 7, 8, 9];
    const disableSprites = sprites.filter((sprite, index) => disableCardsIndex.includes(index));
    this.subject.disableCards(disableSprites);
    this.subject.showCards(sprites);
    const endTest = this.createHandler();
    const selectNumber = 1;
    this.cardsSelected = [];
    const selectHandler = (cards) => {
      this.cardsSelected = cards;
      endTest();
    };
    this.subject.selectMode(selectHandler, selectNumber);
  }

  asserts() {
    this.describe('Deve entrar em modo seleção com escolha!');
    this.expectTrue('Deve selecionar 1 cartas', this.cardsSelected.length === 1);
    this.expectWasTrue('Esta em modo seleção?', this.subject.isSelectMode);
  }
}
class FlashCardsCardsetSpriteTest extends SceneTest {
  create() {
    this.subject = CardsetSprite.create(0, 0);
    this.addWatched(this.subject);
    this.subject.centralize();
    this.subject.show();
    const numCards = 6;
    const cards = CardGenerator.generateCards(numCards);
    const sprites = this.subject.listCards(cards);
    this.subject.showCards(sprites);
    this.subject.flashCardsAnimate(sprites, 'orange');
  }

  asserts() {
    this.describe('Deve animar as cartas!');
    this.expectWasTrue('Houve um flash de luz?', this.subject.someSpriteIsFlashPlaying);
  }
}
class QuakeCardsCardsetSpriteTest extends SceneTest {
  create() {
    this.subject = CardsetSprite.create(0, 0);
    this.addWatched(this.subject);
    this.subject.centralize();
    this.subject.show();
    const numCards = 6;
    const cards = CardGenerator.generateCards(numCards);
    const sprites = this.subject.listCards(cards);
    this.subject.showCards(sprites);
    this.subject.quakeCardsAnimate(sprites);
  }

  asserts() {
    this.describe('Deve tremer as cartas!');
    this.expectWasTrue('Houve um chacoalhar?', this.subject.someSpriteIsMoving);
  }
}
class AnimationCardsCardsetSpriteTest extends SceneTest {
  create() {
    this.subject = CardsetSprite.create(0, 0);
    this.addWatched(this.subject);
    this.subject.centralize();
    this.subject.show();
    const numCards = 6;
    const cards = CardGenerator.generateCards(numCards);
    const sprites = this.subject.listCards(cards);
    this.subject.showCards(sprites);
    const times = 1;
    this.subject.damageCardsAnimate(times, sprites, this.scene);
  }

  asserts() {
    this.describe('Deve animar as cartas!');
    this.expectWasTrue('Houve um frame de aimação?', this.subject.someSpriteIsAnimationPlaying);
  }
}
class ShowOrderingCardsCardsetSpriteTest extends SceneTest {
  create() {
    this.subject = CardsetSprite.create(0, 0);
    this.addWatched(this.subject);
    this.subject.centralize();
    this.subject.show();
    const cards = CardGenerator.generateCards(3);
    const sprites = this.subject.listCards(cards);
    this.subject.showCards(sprites);
    this.subject.setNumberColor(1, GameColors.RED);
    this.subject.setNumberColor(2, GameColors.BLUE);
    this.subject.setNumberColor(3, GameColors.RED);
    this.subject.displayOrdering();
  }

  asserts() {
    this.describe('Deve mostrar númeração ordenada das cartas!');
    this.expectTrue('Esta mostrando a ordenação?', this.subject.isOrderingDisplayed());
    this.expectTrue('Ela esta ordenada?', this.subject.isOrdering());
  }
}
class ShowReverseOrderingCardsCardsetSpriteTest extends SceneTest {
  create() {
    this.subject = CardsetSprite.create(0, 0);
    this.addWatched(this.subject);
    this.subject.centralize();
    this.subject.show();
    const cards = CardGenerator.generateCards(3);
    const sprites = this.subject.listCards(cards);
    this.subject.showCards(sprites);
    this.subject.setNumberColor(1, GameColors.RED);
    this.subject.setNumberColor(2, GameColors.BLUE);
    this.subject.setNumberColor(3, GameColors.RED);
    this.subject.displayReverseOrdering();
  }

  asserts() {
    this.describe('Deve mostrar númeração em ordem inversa das cartas!');
    this.expectTrue('Esta mostrando a ordenação?', this.subject.isOrderingDisplayed());
    this.expectTrue('Ela esta em ordem reversa?', this.subject.isReverseOrdering());
  }
}
class ZoomAllCardsCardsetSpriteTest extends SceneTest {
  create() {
    this.subject = CardsetSprite.create(0, 0);
    this.addWatched(this.subject);
    this.subject.centralize();
    this.subject.show();
    const numCards = 6;
    const cards = CardGenerator.generateCards(numCards);
    const sprites = this.subject.listCards(cards);
    this.subject.showCards(sprites);
    this.subject.zoomAllCards(sprites);
  }

  asserts() {
    this.describe('Deve colocar os cards em zoom!');
    this.expectTrue('Estão com zoom?', this.subject.isCardsZoom());
  }
}
class ZoomOutAllCardsCardsetSpriteTest extends SceneTest {
  create() {
    this.subject = CardsetSprite.create(0, 0);
    this.addWatched(this.subject);
    this.subject.centralize();
    this.subject.show();
    const numCards = 6;
    const cards = CardGenerator.generateCards(numCards);
    const sprites = this.subject.listCards(cards);
    this.subject.showCards(sprites);
    this.subject.zoomAllCards(sprites);
    this.subject.zoomOutAllCards(sprites);
  }

  asserts() {
    this.describe('Deve colocar os cards em escala original!');
    this.expectTrue('Estão em escala original?', this.subject.isCardsOriginalScale());
  }
}
class FlipTurnToUpAllCardsCardsetSpriteTest extends SceneTest {
  create() {
    this.subject = CardsetSprite.create(0, 0);
    this.addWatched(this.subject);
    this.subject.centralize();
    this.subject.show();
    const numCards = 6;
    const cards = CardGenerator.generateCards(numCards);
    const sprites = this.subject.listCards(cards);
    this.subject.setTurnToDownCards(sprites);
    this.subject.showCards(sprites);
    this.subject.flipTurnToUpAllCards(sprites);
  }

  asserts() {
    this.describe('Deve virar o card para cima!');
    this.expectTrue('Estão virados para cima?', this.subject.allCardsAreTurnToUp());
    this.expectTrue('EStão abertos?', this.subject.allCardsAreOpened());
  }
}
class FlipTurnToUpCardsCardsetSpriteTest extends SceneTest {
  create() {
    this.subject = CardsetSprite.create(0, 0);
    this.addWatched(this.subject);
    this.subject.centralize();
    this.subject.show();
    const numCards = 6;
    const cards = CardGenerator.generateCards(numCards);
    const sprites = this.subject.listCards(cards);
    this.subject.setTurnToDownCards(sprites);
    this.subject.showCards(sprites);
    this.subject.flipTurnToUpCards(sprites);
  }

  asserts() {
    this.describe('Deve virar o card para cima!');
    this.expectTrue('Estão virados para cima?', this.subject.allCardsAreTurnToUp());
    this.expectTrue('EStão abertos?', this.subject.allCardsAreOpened());
  }
}
// tests STATE WINDOW
class OpenStateWindowTest extends SceneTest {
  create() {
    this.subject = StateWindow.createWindowFullSize(0, 0);
    this.addWatched(this.subject);
    this.subject.open();
  }

  asserts() {
    this.describe('Deve abrir a janela!');
    this.expectTrue('Esta aberta?', this.subject.isOpen());
  }
}
class CloseStateWindowTest extends SceneTest {
  create() {
    this.subject = StateWindow.createWindowFullSize(0, 0);
    this.addWatched(this.subject);
    this.subject.opened();
    this.subject.close();
  }

  asserts() {
    this.describe('Deve fechar a janela!');
    this.expectTrue('Esta fechada?', this.subject.isClosed());
  }
}
class CreateOneFourthSizeStateWindowTest extends SceneTest {
  create() {
    const x = 0;
    const y = 0;
    this.subject = StateWindow.createWindowOneFourthSize(x, y);
    this.addWatched(this.subject);
    this.subject.open();
  }

  asserts() {
    this.describe('Deve criar uma janela com 1/4 do tamanho da tela!');
    this.expectTrue('Esta na largura de 1/4 da tela?', this.subject.isOneFourthSize());
  }
  
}
class CreateMiddleSizeStateWindowTest extends SceneTest {
  create() {
    const x = 0;
    const y = 0;
    this.subject = StateWindow.createWindowMiddleSize(x, y);
    this.addWatched(this.subject);
    this.subject.open();
  }

  asserts() {
    this.describe('Deve criar uma janela de batalha com tamanho metade da tela!');
    this.expectTrue('Esta na largura metade da tela?', this.subject.isMiddleSize());
  }
  
}
class CreateThreeFourthSizeStateWindowTest extends SceneTest {
  create() {
    const x = 0;
    const y = 0;
    this.subject = StateWindow.createWindowThreeFourthSize(x, y);
    this.addWatched(this.subject);
    this.subject.open();
  }

  asserts() {
    this.describe('Deve criar uma janela de batalha com 3/4 do tamanho da tela!');
    this.expectTrue('Esta na largura de 3/4 da tela?', this.subject.isThreeFourthSize());
  }
  
}
class CreateFullSizeStateWindowTest extends SceneTest {
  create() {
    const x = 0;
    const y = 0;
    this.subject = StateWindow.createWindowFullSize(x, y);
    this.addWatched(this.subject);
    this.subject.open();
  }

  asserts() {
    this.describe('Deve criar uma janela de batalha com tamanho total da tela!');
    this.expectTrue('Esta na largura total da tela?', this.subject.isFullsize());
  }
}
class ChangeBlueColorStateWindowTest extends SceneTest {
  create() {
    this.subject = StateWindow.createWindowFullSize(0, 0);
    this.addWatched(this.subject);
    this.subject.changeBlueColor();
    this.subject.open();
  }

  asserts() {
    this.describe('Deve mudar a cor para azul!');
    this.expectTrue('Esta na cor azul?', this.subject.isBlueColor());
  }
}
class ChangeRedColorStateWindowTest extends SceneTest {
  create() {
    this.subject = StateWindow.createWindowFullSize(0, 0);
    this.addWatched(this.subject);
    this.subject.changeRedColor();
    this.subject.open();
  }

  asserts() {
    this.describe('Deve mudar a cor para vermelha!');
    this.expectTrue('Esta na cor vermelha?', this.subject.isRedColor());
  }
}
class ChangeDefaultColorStateWindowTest extends SceneTest {
  create() {
    this.subject = StateWindow.createWindowFullSize(0, 0);
    this.addWatched(this.subject);
    this.subject.changeDefaultColor();
    this.subject.open();
  }

  asserts() {
    this.describe('Deve mudar a cor para default!');
    this.expectTrue('Esta na cor default?', this.subject.isDefaultColor());
  }
}
class AlignStartTopStateWindowTest extends SceneTest {
  create() {
    const x = 0;
    const y = 0;
    this.subject = StateWindow.createWindowOneFourthSize(x, y);
    this.addWatched(this.subject);
    this.subject.alignStartTop();
    this.subject.open();
  }

  asserts() {
    this.describe('Deve alinhar no início e no topo!');
    this.expect('Esta na posição horizontal do início?', this.subject.x).toBe(StateWindow.getHorizontalAlign(GameConst.START, this.subject));
    this.expect('Esta na posição vertical do topo?', this.subject.y).toBe(StateWindow.getVerticalAlign(GameConst.TOP, this.subject));
  }
}
class AlignStartMiddleStateWindowTest extends SceneTest {
  create() {
    const x = 0;
    const y = 0;
    this.subject = StateWindow.createWindowOneFourthSize(x, y);
    this.addWatched(this.subject);
    this.subject.alignStartMiddle();
    this.subject.open();
  }

  asserts() {
    this.describe('Deve alinhar no início e no meio!');
    this.expect('Esta na posição horizontal do início?', this.subject.x).toBe(StateWindow.getHorizontalAlign(GameConst.START, this.subject));
    this.expect('Esta na posição vertical do meio?', this.subject.y).toBe(StateWindow.getVerticalAlign(GameConst.MIDDLE, this.subject));
  }
}
class AlignStartBottomStateWindowTest  extends SceneTest {
  create() {
    const x = 0;
    const y = 0;
    this.subject = StateWindow.createWindowOneFourthSize(x, y);
    this.addWatched(this.subject);
    this.subject.alignStartBottom();
    this.subject.open();
  }

  asserts() {
    this.describe('Deve alinhar no início e embaixo!');
    this.expect('Esta na posição horizontal do início?', this.subject.x).toBe(StateWindow.getHorizontalAlign(GameConst.START, this.subject));
    this.expect('Esta na posição vertical embaixo?', this.subject.y).toBe(StateWindow.getVerticalAlign(GameConst.BOTTOM, this.subject));
  }
}
class AlignCenterTopStateWindowTest extends SceneTest {
  create() {
    const x = 0;
    const y = 0;
    this.subject = StateWindow.createWindowOneFourthSize(x, y);
    this.addWatched(this.subject);
    this.subject.alignCenterTop();
    this.subject.open();
  }

  asserts() {
    this.describe('Deve alinhar no centro e no topo!');
    this.expect('Esta na posição horizontal do centro?', this.subject.x).toBe(StateWindow.getHorizontalAlign(GameConst.CENTER, this.subject));
    this.expect('Esta na posição vertical do topo?', this.subject.y).toBe(StateWindow.getVerticalAlign(GameConst.TOP, this.subject));
  }
}
class AlignCenterMiddleStateWindowTest extends SceneTest {
  create() {
    const x = 0;
    const y = 0;
    this.subject = StateWindow.createWindowOneFourthSize(x, y);
    this.addWatched(this.subject);
    this.subject.alignCenterMiddle();
    this.subject.open();
  }

  asserts() {
    this.describe('Deve alinhar no centro e no meio!');
    this.expect('Esta na posição horizontal do centro?', this.subject.x).toBe(StateWindow.getHorizontalAlign(GameConst.CENTER, this.subject));
    this.expect('Esta na posição vertical do meio?', this.subject.y).toBe(StateWindow.getVerticalAlign(GameConst.MIDDLE, this.subject));
  }
}
class AlignCenterBottomStateWindowTest extends SceneTest {
  create() {
    const x = 0;
    const y = 0;
    this.subject = StateWindow.createWindowOneFourthSize(x, y);
    this.addWatched(this.subject);
    this.subject.alignCenterBottom();
    this.subject.open();
  }

  asserts() {
    this.describe('Deve alinhar no centro e embaixo!');
    this.expect('Esta na posição horizontal do centro?', this.subject.x).toBe(StateWindow.getHorizontalAlign(GameConst.CENTER, this.subject));
    this.expect('Esta na posição vertical embaixo?', this.subject.y).toBe(StateWindow.getVerticalAlign(GameConst.BOTTOM, this.subject));
  }
}
class AlignEndTopStateWindowTest extends SceneTest {
  create() {
    const x = 0;
    const y = 0;
    this.subject = StateWindow.createWindowOneFourthSize(x, y);
    this.addWatched(this.subject);
    this.subject.alignEndTop();
    this.subject.open();
  }

  asserts() {
    this.describe('Deve alinhar no final e no topo!');
    this.expect('Esta na posição horizontal do final?', this.subject.x).toBe(StateWindow.getHorizontalAlign(GameConst.END, this.subject));
    this.expect('Esta na posição vertical do topo?', this.subject.y).toBe(StateWindow.getVerticalAlign(GameConst.TOP, this.subject));
  }
}
class AlignEndMiddleStateWindowTest extends SceneTest {
  create() {
    const x = 0;
    const y = 0;
    this.subject = StateWindow.createWindowOneFourthSize(x, y);
    this.addWatched(this.subject);
    this.subject.alignEndMiddle();
    this.subject.open();
  }

  asserts() {
    this.describe('Deve alinhar no final e no meio!');
    this.expect('Esta na posição horizontal do final?', this.subject.x).toBe(StateWindow.getHorizontalAlign(GameConst.END, this.subject));
    this.expect('Esta na posição vertical do meio?', this.subject.y).toBe(StateWindow.getVerticalAlign(GameConst.MIDDLE, this.subject));
  }
}
class AlignEndBottomStateWindowTest extends SceneTest {
  create() {
    const x = 0;
    const y = 0;
    this.subject = StateWindow.createWindowOneFourthSize(x, y);
    this.addWatched(this.subject);
    this.subject.alignEndBottom();
    this.subject.open();
  }

  asserts() {
    this.describe('Deve alinhar no final e embaixo!');
    this.expect('Esta na posição horizontal do final?', this.subject.x).toBe(StateWindow.getHorizontalAlign(GameConst.END, this.subject));
    this.expect('Esta na posição vertical embaixo?', this.subject.y).toBe(StateWindow.getVerticalAlign(GameConst.BOTTOM, this.subject));
  }
}
// tests BOARD WINDOW
class PassBoardWindowTest extends SceneTest {
  create() {
    this.subject = BoardWindow.create(0, 0);
    this.addWatched(this.subject);
    this.subject.alignCenterMiddle();
    this.subject.refresh();
    this.subject.open();
    this.subject.pass();
  }

  asserts() {
    this.describe('Deve mostrar a mensagem de passo!');
    this.expectTrue('Foi mostrado a mensagem de passo?', this.subject.isPass());
  }
}
class NoPassBoardWindowTest extends SceneTest {
  create() {
    this.subject = BoardWindow.create(0, 0);
    this.addWatched(this.subject);
    this.subject.alignCenterMiddle();
    this.subject.refresh();
    this.subject.open();
    this.subject.pass();
    this.subject.noPass();
  }

  asserts() {
    this.describe('Deve passar a mensagem de passo!');
    this.expectTrue('Foi retirada a mensagem de passo?', this.subject.isNoPass());
  }
}
class UpdatingPointsBoardWindowTest extends SceneTest {
  create() {
    this.subject = BoardWindow.create(0, 0);
    this.addWatched(this.subject);
    this.subject.alignCenterMiddle();
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
    this.subject.reset();
    this.subject.updateValues(manyUpdates);
  }

  asserts() {
    this.describe('Deve atualizar os pontos do tabuleiro!');
    this.expectWasTrue('Foram atualizado?', this.subject.isUpdating);
  }
}
// tests BATTLE POINTS WINDOW
class UpdatingPointsBattlePointsWindowTest extends SceneTest {
  create() {
    this.subject = BattlePointsWindow.create(0, 0);
    this.addWatched(this.subject);
    this.subject.alignCenterMiddle();
    this.subject.refresh();
    this.subject.open();
    const updateAttackPoints = BattlePointsWindow.createValueUpdate(GameConst.ATTACK_POINTS, 30);
    const updateHealtPoints = BattlePointsWindow.createValueUpdate(GameConst.HEALTH_POINTS, 30);
    const manyUpdates = [
      updateAttackPoints,
      updateHealtPoints
    ];
    this.subject.reset();
    this.subject.updateValues(manyUpdates);
  }

  asserts() {
    this.describe('Deve atualizar os pontos de batalha!');
    this.expectWasTrue('Foram atualizado?', this.subject.isUpdating);
  }
}
// tests TRASH WINDOW
class UpdatingPointsTrashWindowTest extends SceneTest {
  create() {
    this.subject = TrashWindow.create(0, 0);
    this.addWatched(this.subject);
    this.subject.alignCenterMiddle();
    this.subject.refresh();
    this.subject.open();
    const updateCardsNumber = TrashWindow.createValueUpdate(GameConst.NUM_CARDS_IN_TRASH, 10);
    this.subject.updateValues(updateCardsNumber);
  }

  asserts() {
    this.describe('Deve atualizar os pontos do lixo!');
    this.expectWasTrue('Foi atualizada?', this.subject.isUpdating);
  }
}
class OrderedIconsTrashWindowTest extends SceneTest {
  create() {
    this.subject = TrashWindow.create(0, 0);
    this.addWatched(this.subject);
    this.subject.alignCenterMiddle();
    this.subject.orderedIcons();
    this.subject.open();
  }

  asserts() {
    this.describe('Deve abrir com os icones ordenados.');
    this.expectTrue('Esta em ordem normal?', this.subject.isIconsOrdered());
  }
}
class ReverseIconsTrashWindowTest extends SceneTest {
  create() {
    this.subject = TrashWindow.create(0, 0);
    this.addWatched(this.subject);
    this.subject.alignCenterMiddle();
    this.subject.reverseIcons();
    this.subject.open();
  }

  asserts() {
    this.describe('Deve abrir com os icones ordenados.');
    this.expectTrue('Esta em ordem normal?', this.subject.isIconsReverse());
  }
}
// tests SCORE WINDOW
class OneWinUpdatingScoreWindowTest extends SceneTest {
  create() {
    this.subject = ScoreWindow.create(0, 0);
    this.addWatched(this.subject);
    this.subject.alignCenterMiddle();
    this.subject.open();
    this.subject.changeScore(1);
  }

  asserts() {
    this.describe('Deve atualizar a pontuação!');
    this.expectWasTrue('Foi atualizada?', this.subject.isUpdating);
  }
}
class TwoWinsUpdatingScoreWindowTest extends SceneTest {
  create() {
    this.subject = ScoreWindow.create(0, 0);
    this.addWatched(this.subject);
    this.subject.alignCenterMiddle();
    this.subject.open();
    this.subject.changeScore(2);
  }

  asserts() {
    this.describe('Deve atualizar a pontuação!');
    this.expectWasTrue('Foi atualizada?', this.subject.isUpdating);
  }
}
// tests TEXT WINDOW
class CreateOneFourthSizeTextWindowTest extends SceneTest {
  create() {
    this.subject = TextWindow.createWindowOneFourthSize(0, 0);
    this.addWatched(this.subject);
    this.subject.open();
  }

  asserts() {
    this.describe('Deve criar uma janela com 1/4 do tamanho da tela!');
    this.expectTrue('Esta na largura de 1/4 da tela?', this.subject.isOneFourthSize());
  }
}
class CreateMiddleSizeTextWindowTest extends SceneTest {
  create() {
    this.subject = TextWindow.createWindowMiddleSize(0, 0);
    this.addWatched(this.subject);
    this.subject.open();
  }

  asserts() {
    this.describe('Deve criar uma janela de batalha com tamanho metade da tela!');
    this.expectTrue('Esta na largura metade da tela?', this.subject.isMiddleSize());
  }
}
class CreateThreeFourthSizeTextWindowTest extends SceneTest {
  create() {
    this.subject = TextWindow.createWindowThreeFourthSize(0, 0);
    this.addWatched(this.subject);
    this.subject.open();
  }

  asserts() {
    this.describe('Deve criar uma janela de batalha com 3/4 do tamanho da tela!');
    this.expectTrue('Esta na largura de 3/4 da tela?', this.subject.isThreeFourthSize());
  }
}
class CreateFullSizeTextWindowTest extends SceneTest {
  create() {
    this.subject = TextWindow.createWindowFullSize(0, 0);
    this.addWatched(this.subject);
    this.subject.open();
  }

  asserts() {
    this.describe('Deve criar uma janela de batalha com tamanho total da tela!');
    this.expectTrue('Esta na largura total da tela?', this.subject.isFullsize());
  }
}
class OpenTextWindowTest extends SceneTest {
  create() {
    this.subject = TextWindow.createWindowFullSize(0, 0);
    this.addWatched(this.subject);
    this.subject.open();
  }

  asserts() {
    this.describe('Deve abrir a janela!');
    this.expectTrue('Esta aberta?', this.subject.isOpen());
  }
}
class CloseTextWindowTest extends SceneTest {
  create() {
    this.subject = TextWindow.createWindowFullSize(0, 0);
    this.addWatched(this.subject);
    this.subject.opened();
    this.subject.close();
  }

  asserts() {
    this.describe('Deve fechar a janela!');
    this.expectTrue('Esta fechada?', this.subject.isClosed());
  }
}
class ChangeBlueColorTextWindowTest extends SceneTest {
  create() {
    this.subject = TextWindow.createWindowFullSize(0, 0);
    this.addWatched(this.subject);
    this.subject.changeBlueColor();
    this.subject.open();
  }

  asserts() {
    this.describe('Deve mostrar janela na cor azul.');
    this.expectTrue('Esta na cor azul?', this.subject.isBlueColor());
  }
}
class ChangeRedColorTextWindowTest extends SceneTest {
  create() {
    this.subject = TextWindow.createWindowFullSize(0, 0);
    this.addWatched(this.subject);
    this.subject.changeRedColor();
    this.subject.open();
  }

  asserts() {
    this.describe('Deve mostrar janela na cor vermelha.');
    this.expectTrue('Esta na cor vermelha?', this.subject.isRedColor());
  }
}
class ChangeDefaultColorTextWindowTest extends SceneTest {
  create() {
    this.subject = TextWindow.createWindowFullSize(0, 0);
    this.addWatched(this.subject);
    this.subject.changeDefaultColor();
    this.subject.open();
  }

  asserts() {
    this.describe('Deve mostrar janela na cor padrão.');
    this.expectTrue('Esta na cor padrão?', this.subject.isDefaultColor());
  }
}
class AlignCenterBottomTextWindowTest extends SceneTest {
  create() {
    this.subject = TextWindow.createWindowOneFourthSize(0, 0);
    this.addWatched(this.subject);
    this.subject.alignCenterBottom();
    this.subject.open();
  }

  asserts() {
    this.describe('Deve alinhar no centro e embaixo!');
    const horizontalAlign = TextWindow.getHorizontalAlign(GameConst.CENTER, this.subject);
    const verticalAlign = TextWindow.getVerticalAlign(GameConst.BOTTOM, this.subject);
    this.expect('Esta na posição horizontal centro?', this.subject.x).toBe(horizontalAlign);
    this.expect('Esta na posição vertical embaixo?', this.subject.y).toBe(verticalAlign);
  }
}
class AlignCenterAboveMiddleTextWindowTest extends SceneTest {
  create() {
    this.subject = TextWindow.createWindowOneFourthSize(0, 0);
    this.addWatched(this.subject);
    this.subject.alignCenterAboveMiddle();
    this.subject.open();
  }

  asserts() {
    this.describe('Deve alinhar no centro e acima do meio!');
    const horizontalAlign = TextWindow.getHorizontalAlign(GameConst.CENTER, this.subject);
    const verticalAlign = TextWindow.getVerticalAlign(GameConst.ABOVE_MIDDLE, this.subject);
    this.expect('Esta na posição horizontal centro?', this.subject.x).toBe(horizontalAlign);
    this.expect('Esta na posição vertical acima do meio?', this.subject.y).toBe(verticalAlign);
  }
}
class AlignCenterMiddleTextWindowTest extends SceneTest {
  create() {
    this.subject = TextWindow.createWindowOneFourthSize(0, 0);
    this.addWatched(this.subject);
    this.subject.alignCenterMiddle();
    this.subject.open();
  }

  asserts() {
    this.describe('Deve alinhar no centro e meio!');
    const horizontalAlign = TextWindow.getHorizontalAlign(GameConst.CENTER, this.subject);
    const verticalAlign = TextWindow.getVerticalAlign(GameConst.MIDDLE, this.subject);
    this.expect('Esta na posição horizontal centro?', this.subject.x).toBe(horizontalAlign);
    this.expect('Esta na posição vertical meio?', this.subject.y).toBe(verticalAlign);
  }
}
class AlignCenterBelowMiddleTextWindowTest  extends SceneTest {
  create() {
    this.subject = TextWindow.createWindowOneFourthSize(0, 0);
    this.addWatched(this.subject);
    this.subject.alignCenterBelowMiddle();
    this.subject.open();
  }

  asserts() {
    this.describe('Deve alinhar no centro e abaixo do meio!');
    const horizontalAlign = TextWindow.getHorizontalAlign(GameConst.CENTER, this.subject);
    const verticalAlign = TextWindow.getVerticalAlign(GameConst.BELOW_MIDDLE, this.subject);
    this.expect('Esta na posição horizontal centro?', this.subject.x).toBe(horizontalAlign);
    this.expect('Esta na posição vertical abaixo meio?', this.subject.y).toBe(verticalAlign);
  }
}
class AlignCenterTopTextWindowTest extends SceneTest {
  create() {
    this.subject = TextWindow.createWindowOneFourthSize(0, 0);
    this.addWatched(this.subject);
    this.subject.alignCenterTop();
    this.subject.open();
  }

  asserts() {
    this.describe('Deve alinhar no centro e topo!');
    const horizontalAlign = TextWindow.getHorizontalAlign(GameConst.CENTER, this.subject);
    const verticalAlign = TextWindow.getVerticalAlign(GameConst.TOP, this.subject);
    this.expect('Esta na posição horizontal centro?', this.subject.x).toBe(horizontalAlign);
    this.expect('Esta na posição vertical topo?', this.subject.y).toBe(verticalAlign);
  }
}
class AlignEndBottomTextWindowTest extends SceneTest {
  create() {
    this.subject = TextWindow.createWindowOneFourthSize(0, 0);
    this.addWatched(this.subject);
    this.subject.alignEndBottom();
    this.subject.open();
  }

  asserts() {
    this.describe('Deve alinhar no final e embaixo!');
    const horizontalAlign = TextWindow.getHorizontalAlign(GameConst.END, this.subject);
    const verticalAlign = TextWindow.getVerticalAlign(GameConst.BOTTOM, this.subject);
    this.expect('Esta na posição horizontal final?', this.subject.x).toBe(horizontalAlign);
    this.expect('Esta na posição vertical embaixo?', this.subject.y).toBe(verticalAlign);
  }
}
class AlignEndMiddleTextWindowTest extends SceneTest {
  create() {
    this.subject = TextWindow.createWindowOneFourthSize(0, 0);
    this.addWatched(this.subject);
    this.subject.alignEndMiddle();
    this.subject.open();
  }

  asserts() {
    this.describe('Deve alinhar no final e meio!');
    const horizontalAlign = TextWindow.getHorizontalAlign(GameConst.END, this.subject);
    const verticalAlign = TextWindow.getVerticalAlign(GameConst.MIDDLE, this.subject);
    this.expect('Esta na posição horizontal final?', this.subject.x).toBe(horizontalAlign);
    this.expect('Esta na posição vertical meio?', this.subject.y).toBe(verticalAlign);
  }
}
class AlignEndTopTextWindowTest extends SceneTest {
  create() {
    this.subject = TextWindow.createWindowOneFourthSize(0, 0);
    this.addWatched(this.subject);
    this.subject.alignEndTop();
    this.subject.open();
  }

  asserts() {
    this.describe('Deve alinhar no final e topo!');
    const horizontalAlign = TextWindow.getHorizontalAlign(GameConst.END, this.subject);
    const verticalAlign = TextWindow.getVerticalAlign(GameConst.TOP, this.subject);
    this.expect('Esta na posição horizontal final?', this.subject.x).toBe(horizontalAlign);
    this.expect('Esta na posição vertical topo?', this.subject.y).toBe(verticalAlign);
  }
}
class AlignStartBottomTextWindowTest extends SceneTest {
  create() {
    this.subject = TextWindow.createWindowOneFourthSize(0, 0);
    this.addWatched(this.subject);
    this.subject.alignStartBottom();
    this.subject.open();
  }

  asserts() {
    this.describe('Deve alinhar no início e embaixo!');
    const horizontalAlign = TextWindow.getHorizontalAlign(GameConst.START, this.subject);
    const verticalAlign = TextWindow.getVerticalAlign(GameConst.BOTTOM, this.subject);
    this.expect('Esta na posição horizontal início?', this.subject.x).toBe(horizontalAlign);
    this.expect('Esta na posição vertical embaixo?', this.subject.y).toBe(verticalAlign);
  }
}
class AlignStartMiddleTextWindowTest extends SceneTest {
  create() {
    this.subject = TextWindow.createWindowOneFourthSize(0, 0);
    this.addWatched(this.subject);
    this.subject.alignStartMiddle();
    this.subject.open();
  }

  asserts() {
    this.describe('Deve alinhar no início e meio!');
    const horizontalAlign = TextWindow.getHorizontalAlign(GameConst.START, this.subject);
    const verticalAlign = TextWindow.getVerticalAlign(GameConst.MIDDLE, this.subject);
    this.expect('Esta na posição horizontal início?', this.subject.x).toBe(horizontalAlign);
    this.expect('Esta na posição vertical meio?', this.subject.y).toBe(verticalAlign);
  }
}
class AlignStartTopTextWindowTest extends SceneTest {
  create() {
    this.subject = TextWindow.createWindowOneFourthSize(0, 0);
    this.addWatched(this.subject);
    this.subject.alignStartTop();
    this.subject.open();
  }

  asserts() {
    this.describe('Deve alinhar no início e meio!');
    const horizontalAlign = TextWindow.getHorizontalAlign(GameConst.START, this.subject);
    const verticalAlign = TextWindow.getVerticalAlign(GameConst.TOP, this.subject);
    this.expect('Esta na posição horizontal início?', this.subject.x).toBe(horizontalAlign);
    this.expect('Esta na posição vertical topo?', this.subject.y).toBe(verticalAlign);
  }
}
class AlignTextCenterTextWindowTest extends SceneTest {
  create() {
    const text = [
      'Teste de alinhamento de texto no centro',
      'Teste de alinhamento de texto no centro',
      'Teste de alinhamento de texto no centro',
    ];
    this.subject = TextWindow.createWindowFullSize(0, 0, text);
    this.addWatched(this.subject);
    this.subject.alignTextCenter();
    this.subject.open();
  }

  asserts() {
    this.describe('Deve mostrar o texto alinhado no centro.');
    const aligment = GameConst.CENTER;
    this.expect('Foi desenhando no centro?', this.subject.getTextAlignment()).toBe(aligment);
  }
}
class AlignTextLeftTextWindowTest extends SceneTest {
  create() {
    const text = [
      'Teste de alinhamento de texto na esquerda',
      'Teste de alinhamento de texto na esquerda',
      'Teste de alinhamento de texto na esquerda',
    ];
    this.subject = TextWindow.createWindowFullSize(0, 0, text);
    this.addWatched(this.subject);
    this.subject.alignTextLeft();
    this.subject.open();
  }

  asserts() {
    this.describe('Deve mostrar o texto alinhado na esquerda.');
    const aligment = GameConst.LEFT;
    this.expect('Foi desenhando na esquerda?', this.subject.getTextAlignment()).toBe(aligment);
  }
}
class AlignTextRightTextWindowTest extends SceneTest {
  create() {
    const text = [
      'Teste de alinhamento de texto na direita',
      'Teste de alinhamento de texto na direita',
      'Teste de alinhamento de texto na direita',
    ];
    this.subject = TextWindow.createWindowFullSize(0, 0, text);
    this.addWatched(this.subject);
    this.subject.alignTextRight();
    this.subject.open();
  }

  asserts() {
    this.describe('Deve mostrar o texto alinhado na direita.');
    const aligment = GameConst.RIGHT;
    this.expect('Foi desenhando na direita?', this.subject.getTextAlignment()).toBe(aligment);
  }
}
class TextTextWindowTest extends SceneTest {
  create() {
    const line1 = 'primeiro texto';
    const line2 = 'segundo texto';
    const line3 = 'terceiro texto';
    const line4 = 'quarto texto';
    const line5 = 'quinto texto';
    const text = [
      [line1, line2, line3],
      [line4],
      line5,
    ];
    this.subject = TextWindow.createWindowFullSize(0, 0, text);
    this.addWatched(this.subject);
    this.subject.open();
  }

  asserts() {
    const text = [
      'primeiro texto segundo texto terceiro texto',
      'quarto texto',
      'quinto texto',
    ];
    this.describe('Deve apresentar o texto que foi informado em janela.');
    this.expectTrue('Foi desenhado o texto 1?', this.subject.isTextWasDrawing('TEXT_0', text[0]));
    this.expectTrue('Foi desenhado o texto 2?', this.subject.isTextWasDrawing('TEXT_1', text[1]));
    this.expectTrue('Foi desenhado o texto 3?', this.subject.isTextWasDrawing('TEXT_2', text[2]));
  }
}
class ChangeTextColorTextWindowTest extends SceneTest {
  create() {
    const line1 = 'primeiro texto';
    let line2 = 'segundo texto';
    line2 = TextWindow.setTextColor(line2, GameColors.BLUE);
    let line3 = 'terceiro texto';
    line3 = TextWindow.setTextColor(line3, GameColors.DEFAULT);
    const text = [ [line1, line2, line3] ];
    this.subject = TextWindow.createWindowFullSize(0, 0, text);
    this.addWatched(this.subject);
    this.subject.open();
  }

  asserts() {
    const text = [ 'primeiro texto segundo texto terceiro texto' ];
    this.describe('Deve apresentar o texto que foi informado em janela.');
    this.expectTrue('Foi desenhado o texto 1?', this.subject.isTextWasDrawing('TEXT_0', text[0]));
    const color1 = ColorHelper.getColorIndex(GameColors.BLUE);
    const color2 = ColorHelper.getColorIndex(GameColors.DEFAULT);
    this.expectTrue('Foi alterado a cor do texto?', this.subject.isTextWasDrawing('COLOR_0', color1));
    this.expectTrue('Foi alterado a cor do texto?', this.subject.isTextWasDrawing('COLOR_1', color2));
  }
}
// tests COMMAND WINDOW
class CreateFullsizeCommandWindowTest extends SceneTest {
  create() {
    this.subject = CommandWindow.create(0, 0, []);
    this.addWatched(this.subject);
    this.subject.open();
  }

  asserts() {
    this.describe('Deve exibir a janela com a largura total da tela!');
    this.expectTrue('Esta na largura total da tela?', this.subject.isFullsize());
  }
}
class OpenCommandWindowTest extends SceneTest {
  create() {
    this.subject = CommandWindow.create(0, 0, []);
    this.addWatched(this.subject);
    this.subject.open();
  }

  asserts() {
    this.describe('Deve abrir a janela!');
    this.expectTrue('Esta aberta?', this.subject.isOpened());
  }
}
class CloseCommandWindowTest extends SceneTest {
  create() {
    this.subject = CommandWindow.create(0, 0, []);
    this.addWatched(this.subject);
    this.subject.opened();
    this.subject.close();
  }

  asserts() {
    this.describe('Deve fechar a janela!');
    this.expectTrue('Esta fechada?', this.subject.isClosed());
  }
}
class ChangeBlueColorCommandWindowTest extends SceneTest {
  create() {
    this.subject = CommandWindow.create(0, 0, []);
    this.addWatched(this.subject);
    this.subject.changeBlueColor();
    this.subject.open();
  }

  asserts() {
    this.describe('Deve mostrar janela na cor azul.');
    this.expectTrue('Esta na cor azul?', this.subject.isBlueColor());
  }
}
class ChangeRedColorCommandWindowTest extends SceneTest {
  create() {
    this.subject = CommandWindow.create(0, 0, []);
    this.addWatched(this.subject);
    this.subject.changeRedColor();
    this.subject.open();
  }

  asserts() {
    this.describe('Deve mostrar janela na cor vermelha.');
    this.expectTrue('Esta na cor vermelha?', this.subject.isRedColor());
  }
}
class ChangeDefaultColorCommandWindowTest extends SceneTest {
  create() {
    this.subject = CommandWindow.create(0, 0, []);
    this.addWatched(this.subject);
    this.subject.changeDefaultColor();
    this.subject.open();
  }

  asserts() {
    this.describe('Deve mostrar janela na cor padrão.');
    this.expectTrue('Esta na cor padrão?', this.subject.isDefaultColor());
  }
}
class AlignTopCommandWindowTest extends SceneTest {
  create() {
    this.subject = CommandWindow.create(0, 0, []);
    this.subject.alignTop();
    this.addWatched(this.subject);
    this.subject.open();
  }

  asserts() {
    this.describe('Deve alinha a janela no topo.');
    const positionY = CommandWindow.getVerticalAlign(GameConst.TOP, this.subject, this.scene._windowLayer);
    this.expect('Esta na posição vertical do topo?', this.subject.y).toBe(positionY);
  }
}
class AlignMiddleCommandWindowTest extends SceneTest {
  create() {
    this.subject = CommandWindow.create(0, 0, []);
    this.subject.alignMiddle();
    this.addWatched(this.subject);
    this.subject.open();
  }

  asserts() {
    this.describe('Deve alinha a janela no meio.');
    const positionY = CommandWindow.getVerticalAlign(GameConst.MIDDLE, this.subject, this.scene._windowLayer);
    this.expect('Esta na posição vertical do meio?', this.subject.y).toBe(positionY);
  }
}
class AlignBottomCommandWindowTest extends SceneTest {
  create() {
    this.subject = CommandWindow.create(0, 0, []);
    this.subject.alignBottom();
    this.addWatched(this.subject);
    this.subject.open();
  }
  
  asserts() {
    this.describe('Deve alinha a janela embaixo.');
    const positionY = CommandWindow.getVerticalAlign(GameConst.BOTTOM, this.subject, this.scene._windowLayer);
    this.expect('Esta na posição vertical embaixo?', this.subject.y).toBe(positionY);
  }
}
class AlignTextLeftCommandWindowTest extends SceneTest {
  create() {
    const text = [
      'Teste de alinhamento de texto na esquerda',
      'Teste de alinhamento de texto na esquerda',
      'Teste de alinhamento de texto na esquerda',
    ];
    this.subject = CommandWindow.create(0, 0, text);
    this.addWatched(this.subject);
    this.subject.alignTextLeft();
    this.subject.open();
  }

  asserts() {
    this.describe('Deve mostrar o texto alinhado na esquerda.');
    const aligment = GameConst.LEFT;
    this.expect('Foi desenhando na esquerda?', this.subject.getTextAlignment()).toBe(aligment);
  }
}
class AlignTextCenterCommandWindowTest extends SceneTest {
  create() {
    const text = [
      'Teste de alinhamento de texto no centro',
      'Teste de alinhamento de texto no centro',
      'Teste de alinhamento de texto no centro',
    ];
    this.subject = CommandWindow.create(0, 0, text);
    this.addWatched(this.subject);
    this.subject.alignTextCenter();
    this.subject.open();
  }

  asserts() {
    this.describe('Deve mostrar o texto alinhado no centro.');
    const aligment = GameConst.CENTER;
    this.expect('Foi desenhando no centro?', this.subject.getTextAlignment()).toBe(aligment);
  }
}
class AlignTextRightCommandWindowTest extends SceneTest {
  create() {
    const text = [
      'Teste de alinhamento de texto na direita',
      'Teste de alinhamento de texto na direita',
      'Teste de alinhamento de texto na direita',
    ];
    this.subject = CommandWindow.create(0, 0, text);
    this.addWatched(this.subject);
    this.subject.alignTextRight();
    this.subject.open();
  }

  asserts() {
    this.describe('Deve mostrar o texto alinhado na direita.');
    const aligment = GameConst.RIGHT;
    this.expect('Foi desenhando na direita?', this.subject.getTextAlignment()).toBe(aligment);
  }
}
class AlignItemsLeftCommandWindowTest extends SceneTest {
  create() {
    const commandYes = CommandWindow.createCommand('Yes', 'YES', () => {});
    const commandNo = CommandWindow.createCommand('No', 'NO', () => {});
    const text = [ 
      'Do you want to continue?',
    ];
    this.subject = CommandWindow.create(0, 0, text, [commandYes, commandNo]);
    this.addWatched(this.subject);
    this.subject.alignItemsLeft();
    this.subject.open();
  }

  asserts() {
    this.describe('Deve mostrar os items alinhados a esquerda.');
    this.expectTrue('Estão alinhados a esquerda?', this.subject.isItemsAlign('ITEMS_ALIGN', GameConst.LEFT));
  }
}
class AlignItemsCenterCommandWindowTest extends SceneTest {
  create() {
    const commandYes = CommandWindow.createCommand('Yes', 'YES', () => {});
    const commandNo = CommandWindow.createCommand('No', 'NO', () => {});
    const text = [ 
      'Do you want to continue?',
    ];
    this.subject = CommandWindow.create(0, 0, text, [commandYes, commandNo]);
    this.addWatched(this.subject);
    this.subject.alignItemsCenter();
    this.subject.open();
  }

  asserts() {
    this.describe('Deve mostrar os items alinhados no centro.');
    this.expectTrue('Estão alinhados no centro?', this.subject.isItemsAlign('ITEMS_ALIGN', GameConst.CENTER));
  }
}
class AlignItemsRightCommandWindowTest extends SceneTest {
  create() {
    const commandYes = CommandWindow.createCommand('Yes', 'YES', () => {});
    const commandNo = CommandWindow.createCommand('No', 'NO', () => {});
    const text = [ 
      'Do you want to continue?',
    ];
    this.subject = CommandWindow.create(0, 0, text, [commandYes, commandNo]);
    this.addWatched(this.subject);
    this.subject.alignItemsRight();
    this.subject.open();
  }

  asserts() {
    this.describe('Deve mostrar os items alinhados a direita.');
    this.expectTrue('Estão alinhados a direita?', this.subject.isItemsAlign('ITEMS_ALIGN', GameConst.RIGHT));
  }
}
class TextCommandWindowTest extends SceneTest {
  create() {
    const line1 = 'primeiro texto';
    const line2 = 'segundo texto';
    const line3 = 'terceiro texto';
    const line4 = 'quarto texto';
    const line5 = 'quinto texto';
    const text = [
      [line1, line2, line3],
      [line4],
      line5,
    ];
    this.subject = CommandWindow.create(0, 0, text);
    this.addWatched(this.subject);
    this.subject.open();
  }

  asserts() {
    const text = [
      'primeiro texto segundo texto terceiro texto',
      'quarto texto',
      'quinto texto',
    ];
    this.describe('Deve apresentar o texto que foi informado em janela.');
    this.expectTrue('Foi desenhado o texto 1?', this.subject.isTextWasDrawing('TEXT_0', text[0]));
    this.expectTrue('Foi desenhado o texto 2?', this.subject.isTextWasDrawing('TEXT_1', text[1]));
    this.expectTrue('Foi desenhado o texto 3?', this.subject.isTextWasDrawing('TEXT_2', text[2]));
  }
}
class ChangeTextColorCommandWindowTest extends SceneTest {
  create() {
    const line1 = 'primeiro texto';
    let line2 = 'segundo texto';
    line2 = CommandWindow.setTextColor(line2, GameColors.BLUE);
    let line3 = 'terceiro texto';
    line3 = CommandWindow.setTextColor(line3, GameColors.DEFAULT);
    const text = [ [line1, line2, line3] ];
    this.subject = CommandWindow.create(0, 0, text);
    this.addWatched(this.subject);
    this.subject.open();
  }

  asserts() {
    const text = [ 'primeiro texto segundo texto terceiro texto' ];
    this.describe('Deve apresentar o texto que foi informado em janela.');
    this.expectTrue('Foi desenhado o texto 1?', this.subject.isTextWasDrawing('TEXT_0', text[0]));
    const color1 = ColorHelper.getColorIndex(GameColors.BLUE);
    const color2 = ColorHelper.getColorIndex(GameColors.DEFAULT);
    this.expectTrue('Foi alterado a cor do texto?', this.subject.isTextWasDrawing('COLOR_0', color1));
    this.expectTrue('Foi alterado a cor do texto?', this.subject.isTextWasDrawing('COLOR_1', color2));
  }
}
class CommandHandlerCommandWindowTest extends SceneTest {
  create() {
    const hanlderDummys = () => {};
    const commandYes = CommandWindow.createCommand('Yes', 'YES', hanlderDummys);
    const commandNo = CommandWindow.createCommand('No', 'NO', hanlderDummys);
    const text = [];
    this.subject = CommandWindow.create(0, 0, text, [commandYes, commandNo]);
    this.addWatched(this.subject);
    this.subject.open();
  }

  asserts() {
    this.describe('Deve mostrar as opções da janela de comando');
    this.expectTrue('Esta com os comandos?', this.subject.haveCommands(['YES', 'NO']));
  }
}
class CommandHandlerWithTextCommandWindowTest extends SceneTest {
  create() {
    const hanlderDummys = () => {};
    const commandYes = CommandWindow.createCommand('Yes', 'YES', hanlderDummys);
    const commandNo = CommandWindow.createCommand('No', 'NO', hanlderDummys);
    const text = [ 
      'Do you want to continue?',
    ];
    this.subject = CommandWindow.create(0, 0, text, [commandYes, commandNo]);
    this.addWatched(this.subject);
    this.subject.open();
  }

  asserts() {
    const text = [ 
      'Do you want to continue?',
    ];
    this.describe('Deve mostrar as opções da janela de comando');
    this.expectTrue('Foi desenhado o texto 1?', this.subject.isTextWasDrawing('TEXT_0', text[0]));
    this.expectTrue('Esta com os comandos?', this.subject.haveCommands(['YES', 'NO']));
  }
}
// test FOLDER WINDOW
class CreateFolderWindowTest extends SceneTest {
  create() {
    const handlerDummy = () => {};
    const energies1 = FolderWindow.createEnergies(10, 10, 5, 5, 5, 5);
    const energies2 = FolderWindow.createEnergies(10, 10, 10, 10, 10, 10);
    const energies3 = FolderWindow.createEnergies(10, 10, 10, 0, 0, 0);
    const commandFolder1 = FolderWindow.createCommand('Folder Name One', 'FOLDER_ONE', handlerDummy, energies1);
    const commandFolder2 = FolderWindow.createCommand('Folder Name Two', 'FOLDER_TWO', handlerDummy, energies2);
    const commandFolder3 = FolderWindow.createCommand('Folder Name Three', 'FOLDER_THREE', handlerDummy, energies3);
    let title = 'Choose a folder';
    title = CommandWindow.setTextColor(title, GameColors.ORANGE);
    const text = [title];
    const commands = [commandFolder1, commandFolder2, commandFolder3];
    this.subject = FolderWindow.create(0, 0, text, commands);
    this.addWatched(this.subject);
    this.subject.alignTextCenter();
    this.subject.open();
  }

  asserts() {
    this.describe('Deve exibir a janela de comandos de pastas!');
    this.expectTrue('Esta aberta?', this.subject.isOpen());
  }
}

// test PHASE
class ChallengePhaseTest extends SceneTest {
  phase;
  selectFolderIndex = -1;

  create() {
    this.phase = new ChallengePhase(this.scene);
    const title = TextWindow.setTextColor('Challenge Phase', GameColors.ORANGE);
    const text = [title];
    this.phase.createTitleWindow(text);
    const line = 'lv. 85';
    const line2 = 'Amaterasu Duel King';
    const text2 = [line, line2];
    this.phase.createDescriptionWindow(text2);
    const endTest = this.createHandler();
    const folders = [
      {
        name: 'Folder 1',
        energies: [10, 10, 5, 5, 5, 5],
        handler: () => {
          this.phase.closeFolderWindow();
          this.selectFolderIndex = 0;
          endTest();
        }
      }, {
        name: 'Folder 2',
        energies: [10, 10, 10, 10, 10, 10],
        handler: () => {
          this.phase.closeFolderWindow();
          this.selectFolderIndex = 1;
          endTest();
        }
      }, {
        name: 'Folder 3',
        energies: [10, 10, 10, 0, 0, 0],
        handler: () => {
          this.phase.closeFolderWindow();
          this.selectFolderIndex = 2;
          endTest();
        }
    }];
    const title2 = CommandWindow.setTextColor('Choose a folder', GameColors.ORANGE);
    const text3 = [title2];
    this.phase.createFolderWindow(text3, folders);
    this.addWatched(this.phase._titleWindow);
    this.addWatched(this.phase._descriptionWindow);
    this.addWatched(this.phase._folderWindow);
  }

  start() {
    this.scene.setPhase(this.phase);
    this.phase.addActions([
      this.phase.commandOpenTitleWindow,
      this.phase.commandOpenDescriptionWindow,
    ]);
    this.phase.stepChallengePhase();
  }
  
  update() {
    if (this.phase.isBusy()) return false;
    if (this.phase.isStepChallengePhase() && Input.isTriggered('ok')) {
      this.phase.stepSelectFolder();
      this.phase.addActions([
        this.phase.commandCloseTitleWindow,
        this.phase.commandCloseDescriptionWindow,
      ]);
      this.phase.addWait();
      this.phase.openFolderWindow();
    }
  }

  asserts() {
    this.describe('Deve apresentar etapas de fase de desafio e seleção de pasta.');
    this.expectWasTrue('A janela de título foi apresentada?', 'visible', this.phase._titleWindow);
    this.expectWasTrue('A janela de descrição de desafiado foi apresentada?', 'visible', this.phase._descriptionWindow);
    this.expectWasTrue('A Janela de escolah de pastas foi apresentada?', 'visible', this.phase._folderWindow);
    this.expectTrue('Foi escolhido uma pasta válida?', this.selectFolderIndex !== -1);
  }
}
class StartPhaseTest extends SceneTest {
  phase;

  create() {
    this.phase = new StartPhase(this.scene);
    const title = TextWindow.setTextColor('Start Phase', GameColors.ORANGE);
    const text = [title];
    this.phase.createTitleWindow(text);
    const line = 'Draw Calumon to go first.';
    const text2 = [line];
    this.phase.createDescriptionWindow(text2);
    const cards = [
      CardGenerator.generateGameCard('white'),
      CardGenerator.generateGameCard('black'),
    ];
    this.phase.createCardDrawGameCardset(cards);
    this.endTest = this.createHandler();
    this.addHiddenWatched(this.phase._titleWindow);
    this.addHiddenWatched(this.phase._descriptionWindow);
    this.addHiddenWatched(this.phase._cardDrawGameCardset);
  }

  start() {
    this.scene.setPhase(this.phase);
    this.phase.addChildren();
    this.phase.addActions([
      this.phase.commandOpenTitleWindow,
      this.phase.commandOpenDescriptionWindow,
    ]);
    this.phase.stepStartPhase();
  }
  
  update() {
    if (this.phase.isBusy()) return false;
    if (this.phase.isStepStartPhase() && Input.isTriggered('ok')) {
      this.phase.addActions([
        this.phase.commandCloseTitleWindow,
        this.phase.commandCloseDescriptionWindow,
      ]);
      this.phase.addWait();
      this.phase.stepStartCardDrawGame();
      this.phase.startCardDrawGame((cards) => {
        const selectedIndex = cards.shift();
        this.phase.endCardDrawGame(selectedIndex);
        // this.phase.stepEndCardDrawGame();
      });
    }
  }

  asserts() {
    this.describe('Deve apresentar etapas de fase de início e jogo da sorte.');
    this.expectWasTrue('A janela de título foi apresentada?', 'visible', this.phase._titleWindow);
    this.expectWasTrue('A janela de descrição de desafiado foi apresentada?', 'visible', this.phase._descriptionWindow);
  }
}

class CardBattleScene extends Scene_Message {
  initialize() {
    super.initialize();
    this._phase = null;
    this._animationSprites = [];
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

  addAnimationSprite(animationSprite) {
    this._animationSprites.push(animationSprite);
  }

  getLastAnimationSprite() {
    return this._animationSprites[this._animationSprites.length - 1];
  }
}
class CardBattleTestScene extends Scene_Message {
  initialize() {
    super.initialize();
    this._css = 'color: #FFFFFF; font-size: 12px; padding: 5px;';
    this._tests = [];
    this._nextTest = null;
    this._animationSprites = [];
    this._phase = null;
  }

  create() {
    super.create();
    this.createWindowLayer();
    this.createTests();
  }

  async createTests() {
    this._tests = this.testsData();
    this._tests = this._tests.map(test => {
      const instanceCreated = new test(this);
      try {
        instanceCreated.create();
      } catch (error) { 
        this.printAssertError(`Assert: ${error}`);
        instanceCreated.addThrowableError(error);
      }
      return instanceCreated;
    });
  }
  
  testsData() {
    const cardSpriteTests = [
      ErroOnCreateCardSpriteTest,
      StartOpenCardSpriteTest,
      StartClosedCardSpriteTest,
      OpenCardSpriteTest,
      CloseCardSpriteTest,
      DisableCardSpriteTest,
      EnableCardSpriteTest,
      MoveCardSpriteTest,
      HoveredCardSpriteTest,
      UnhoveredCardSpriteTest,
      SelectedCardSpriteTest,
      UnselectedCardSpriteTest,
      IluminatedCardSpriteTest,
      UniluminatedCardSpriteTest,
      FlashCardSpriteTest,
      AnimationCardSpriteTest,
      QuakeCardSpriteTest,
      ZoomCardSpriteTest,
      ZoomOutCardSpriteTest,
      LeaveCardSpriteTest,
      FlipTurnToUpCardSpriteTest,
      FlipTurnToDownCardSpriteTest,
      UpdatingPointsCardSpriteTest
    ];
    const cardsetSpriteTests = [
      // StartPositionCardsetSpriteTest,
      // SetCardsCardsetSpriteTest,
      // SetTurnToDownCardsCardsetSpriteTest,
      // SetAllCardsInPositionCardsetSpriteTest,
      // SetAllCardsInPositionsCardsetSpriteTest,
      // ListCardsCardsetSpriteTest,
      // StartClosedCardsCardsetSpriteTest,
      // OpenAllCardsCardsetSpriteTest,
      // OpenCardsCardsetSpriteTest,
      // CloseAllCardsCardsetSpriteTest,
      // CloseCardsCardsetSpriteTest,
      // MoveAllCardsInListCardsetSpriteTest,
      // MoveCardsInListCardsetSpriteTest,
      // MoveAllCardsToPositionCardsetSpriteTest,
      // MoveCardsToPositionCardsetSpriteTest,
      // MoveAllCardsToPositionsCardsetSpriteTest,
      // AddAllCardsToListCardsetSpriteTest,
      // AddCardsToListCardsetSpriteTest,
      // DisableCardsCardsetSpriteTest,
      // StaticModeCardsetSpriteTest,
      // SelectModeCardsetSpriteTest,
      // SelectModeNoSelectCardsetSpriteTest,
      // SelectModeLimitedCardsetSpriteTest,
      // FlashCardsCardsetSpriteTest,
      // QuakeCardsCardsetSpriteTest,
      // AnimationCardsCardsetSpriteTest,
      // ShowOrderingCardsCardsetSpriteTest,
      // ShowReverseOrderingCardsCardsetSpriteTest,
      // ZoomAllCardsCardsetSpriteTest,
      // ZoomOutAllCardsCardsetSpriteTest,
      FlipTurnToUpAllCardsCardsetSpriteTest,
      FlipTurnToUpCardsCardsetSpriteTest,
    ];
    const StateWindowTests = [
      CreateOneFourthSizeStateWindowTest,
      CreateMiddleSizeStateWindowTest,
      CreateThreeFourthSizeStateWindowTest,
      CreateFullSizeStateWindowTest,
      OpenStateWindowTest,
      CloseStateWindowTest,
      ChangeBlueColorStateWindowTest,
      ChangeRedColorStateWindowTest,
      ChangeDefaultColorStateWindowTest,
      AlignStartTopStateWindowTest,
      AlignStartMiddleStateWindowTest,
      AlignStartBottomStateWindowTest,
      AlignCenterTopStateWindowTest,
      AlignCenterMiddleStateWindowTest,
      AlignCenterBottomStateWindowTest,
      AlignEndTopStateWindowTest,
      AlignEndMiddleStateWindowTest,
      AlignEndBottomStateWindowTest,
    ];
    const textWindowTests = [
      CreateOneFourthSizeTextWindowTest,
      CreateMiddleSizeTextWindowTest,
      CreateThreeFourthSizeTextWindowTest,
      CreateFullSizeTextWindowTest,
      OpenTextWindowTest,
      CloseTextWindowTest,
      ChangeBlueColorTextWindowTest,
      ChangeRedColorTextWindowTest,
      ChangeDefaultColorTextWindowTest,
      AlignStartTopTextWindowTest,
      AlignStartMiddleTextWindowTest,
      AlignStartBottomTextWindowTest,
      AlignCenterTopTextWindowTest,
      AlignCenterAboveMiddleTextWindowTest,
      AlignCenterMiddleTextWindowTest,
      AlignCenterBelowMiddleTextWindowTest,
      AlignCenterBottomTextWindowTest,
      AlignEndTopTextWindowTest,
      AlignEndMiddleTextWindowTest,
      AlignEndBottomTextWindowTest,
      AlignTextLeftTextWindowTest,
      AlignTextCenterTextWindowTest,
      AlignTextRightTextWindowTest,
      TextTextWindowTest,
      ChangeTextColorTextWindowTest,
    ];
    const boardWindowTests = [
      PassBoardWindowTest,
      NoPassBoardWindowTest,
      UpdatingPointsBoardWindowTest,
    ];
    const battlePointsWindow = [
      UpdatingPointsBattlePointsWindowTest,
    ];
    const trashWindow = [
      UpdatingPointsTrashWindowTest,
      OrderedIconsTrashWindowTest,
      ReverseIconsTrashWindowTest,
    ];
    const scoreWindow = [
      OneWinUpdatingScoreWindowTest,
      TwoWinsUpdatingScoreWindowTest
    ];
    const commandWindow = [
      CreateFullsizeCommandWindowTest,
      OpenCommandWindowTest,
      CloseCommandWindowTest,
      ChangeBlueColorCommandWindowTest,
      ChangeRedColorCommandWindowTest,
      ChangeDefaultColorCommandWindowTest,
      AlignTopCommandWindowTest,
      AlignMiddleCommandWindowTest,
      AlignBottomCommandWindowTest,
      AlignTextLeftCommandWindowTest,
      AlignTextCenterCommandWindowTest,
      AlignTextRightCommandWindowTest,
      AlignItemsLeftCommandWindowTest,
      AlignItemsCenterCommandWindowTest,
      AlignItemsRightCommandWindowTest,
      TextCommandWindowTest,
      ChangeTextColorCommandWindowTest,
      CommandHandlerCommandWindowTest,
      CommandHandlerWithTextCommandWindowTest,
    ];
    const folderWindow = [
      CreateFolderWindowTest,
    ];
    const phase = [
      // ChallengePhaseTest,
      StartPhaseTest,
    ];
    return [
      // ...cardSpriteTests,
      ...cardsetSpriteTests,
      // ...commandWindow,
      // ...StateWindowTests,
      // ...textWindowTests,
      // ...boardWindowTests,
      // ...battlePointsWindow,
      // ...trashWindow,
      // ...scoreWindow,
      // ...folderWindow,
      // ...phase,
    ];
  }

  start() {
    super.start();
    this.startTests();
  }

  async startTests() {
    const testsResults = [];
    for (const test of this._tests) {
      this._nextTest = test;
      const result = await this._nextTest.run();
      testsResults.push(result);
      await this.clearScene();
    }
    this.printResults(testsResults);
    this.printTotals(testsResults);
  }

  clearScene() {
    return new Promise(async resolve => {
      await this.clearChildren();
      await this.clearWindowLayer();
      resolve(true);
    });
  }

  clearChildren() {
    return new Promise(resolve => {
      const children = this.children;
      while (children.length > 1) {
        children.forEach(async child => {
          if (child === this._windowLayer) return false;
          child.destroy();
          await this.removeChild(child);
        });
      }
      resolve(true);
    });
  }

  clearWindowLayer() {
    return new Promise(resolve => {
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

  printTotals(results) {
    const total = results.length;
    const success = results.filter(result => result.passed === true).length;
    const failed = total - success;
    this.printInfo(`Total de testes: ${total}`);
    this.printSuccess(`Testes passados: ${success}`);
    this.printError(`Testes falhados: ${failed}`);
  }

  printInfo(...msg) {
    console.log(`%c${msg.map(t => t.toString())}`,`background: #5DADE2; ${this._css}`);
  }

  printError(...msg) {
    console.log(`%c${msg.map(t => t.toString())}`,`background: #800000; ${this._css}`);
  }

  printTestError(...msg) {
    console.log(`%c${msg.map(t => t.toString())}`,`background: #090000; ${this._css}`);
  }

  printAssertError(...msg) {
    console.log(`%c${msg.map(t => t.toString())}`,`background: #400000; ${this._css}`);
  }

  printSuccess(...msg) {
    console.log(`%c${msg.map(t => t.toString())}`,`background: #008000; ${this._css}`);
  }

  update() {
    if (this.isActive()) {
      if (this._nextTest) {
        this._nextTest.update();
        this._nextTest.updateTest();
      }
      if (this._phase) this._phase.update();
    }
    super.update();
  }

  isActive() {
    return !this.isBusy();
  }

  addAnimationSprite(animationSprite) {
    this._animationSprites.push(animationSprite);
  }

  getLastAnimationSprite() {
    return this._animationSprites[this._animationSprites.length - 1];
  }

  setPhase(phase) {
    this._phase = phase;
  }

  addWindow(window) {
    this._windowLayer.addChild(window);
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

