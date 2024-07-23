(function() {
'use strict';
// CORE
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

// CONSTANTS
const GameConst = {
  BATTLE: 'BATTLE',
  POWER: 'POWER',
  GAME: 'GAME',
  //
  RED: 'RED',
  BLUE: 'BLUE',
  GREEN: 'GREEN',
  BLACK: 'BLACK',
  WHITE: 'WHITE',
  BROWN: 'BROWN',
  //
  CARDS_IN_DECK: 'CARDS_IN_DECK',
  CARDS_IN_HAND: 'CARDS_IN_HAND',
  CARDS_IN_TRASH: 'CARDS_IN_TRASH',
  PLAYER: 'PLAYER',
  CHALLENGED: 'CHALLENGED',

  CHALLENGE_PHASE: 'CHALLENGE_PHASE',
  START_PHASE: 'START_PHASE',
  DRAW_PHASE: 'DRAW_PHASE',
  LOAD_PHASE: 'LOAD_PHASE',






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
  END_PHASE: 'END_PHASE',
  START_SELECT_FOLDER: 'START_SELECT_FOLDER',
  END_SELECT_FOLDER: 'END_SELECT_FOLDER',
  START_DRAW_CARD_GAME: 'START_DRAW_CARD_GAME',
  END_DRAW_CARD_GAME: 'END_DRAW_CARD_GAME',
  START_DRAW_CARDS: 'START_DRAW_CARDS',
  END_DRAW_CARDS: 'END_DRAW_CARDS',
  BEGIN_LOAD_PHASE: 'BEGIN_LOAD_PHASE',
  PLAYER_TURN_PHASE: 'PLAYER_TURN_PHASE',
  CHALLENGE_TURN_PHASE: 'CHALLENGE_TURN_PHASE',
  END_LOAD_PHASE: 'END_LOAD_PHASE',
  WAITING_PHASE: 'WAITING_PHASE',
  ACTIVE_POWER_CARD: 'ACTIVE_POWER_CARD',
  TURN_PHASE: 'TURN_PHASE',
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


// HELPERS
class ScreenHelper {
  static getOneFourthWidth() {
    return Graphics.boxWidth / 4;
  }

  static getHalfWidth() {
    return Graphics.boxWidth / 2;
  }

  static getFullWidth() {
    return Graphics.boxWidth;
  }

  static getFieldWidth() {
    return ScreenHelper.getFullWidth() - (ScreenHelper.getOneFourthWidth() / 2);
  }

  static getFullHeight() {
    return Graphics.boxHeight;
  }
  
  static getTopPosition() {
    return 0;
  }

  static getAboveMiddlePosition(objHeight) {
    return (Graphics.boxHeight / 2) - objHeight;
  }

  static getMiddlePosition(objHeight) {
    return Graphics.boxHeight / 2 - objHeight / 2;
  }

  static getBelowMiddlePosition(objHeight) {
    return Graphics.boxHeight / 2;
  }

  static getBottomPosition(objHeight) {
    return Graphics.boxHeight - objHeight;
  }

  static getStartPosition() {
    return 0;
  }

  static getStartCenterPosition(objWidth) {
    return Graphics.boxWidth / 2 - objWidth;
  }

  static getCenterPosition(objWidth) {
    return Graphics.boxWidth / 2 - objWidth / 2;
  }

  static getEndCenterPosition(objWidth) {
    return Graphics.boxWidth / 2;
  }

  static getEndPosition(objWidth) {
    return Graphics.boxWidth - objWidth;
  }

  static getPositionInFrontOf(xAgent, widthReceptor) {
    return xAgent - widthReceptor;
  }

  static getPositionInBackOf(xAgent, widthAgent) {
    return xAgent + widthAgent;
  }

  static getPositionInCenterOf(baseWidth, subjectWidth) {
    return baseWidth / 2 - subjectWidth / 2;
  }

  static getPositionAboveOf(yAgent, heightReceptor) {
    return yAgent - heightReceptor;
  }

  static getPositionBelowOf(yAgent, heightAgent) {
    return yAgent + heightAgent;
  }
} 

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

class ArrayHelper {
  static moveToStartByIndex(array, index) {
    const newArray = array.slice();
    if (index < 0 || index >= newArray.length) return newArray;
    const item = newArray.splice(index, 1)[0];
    newArray.unshift(item);
    return newArray;
  }

  static shuffle(array) {
    const newArray = array.slice();
    for (let i = newArray.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
    }
    return newArray;
  }

  static toArray(array = []) {
    return (Array.isArray(array) === false) ? [array] : array;
  }
}

class ObjectHelper {
  static copyObject(obj, maxDepth = 3, currentDepth = 0) {
    const propsToCopy = [
      '_actionsQueue',
      '_actionsQueueWithDelay',
      '_status',
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
      '_titleWindow',
      '_descriptionWindow',
      '_folderWindow',
      '_resultWindow',
      '_drawCardGame',
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
  static generateGameCard(color) {
    const game = 2;
    switch (color) {
      case GameConst.WHITE:
        const white = 3;
        return CardGenerator.generateCard(game, white);
      case GameConst.BLACK:
        const black = 4;
        return CardGenerator.generateCard(game, black);
      default:
        return CardGenerator.generateCard(game);
    }
  }

  static generateCards(amount = 1, type) {
    const cards = [];
    for (let i = 0; i < amount; i++) {
      cards.push(CardGenerator.generateCard(type));
    }
    return cards;
  }

  static generateCard(type, color, figure, attack, health) {
    return {
      type: CardGenerator.getTypes()[type >= 0 ? type : Math.floor(Math.random() * 3)],
      color: CardGenerator.getColors()[color >= 0 ? color : Math.floor(Math.random() * 6)],
      figureName: figure || 'default',
      attack: attack || Math.floor(Math.random() * 99) + 1,
      health: health || Math.floor(Math.random() * 99) + 1
    };
  }

  static getTypes() {
    return [GameConst.BATTLE, GameConst.POWER, GameConst.GAME];
  }

  static getColors() {
    return [GameConst.RED, GameConst.GREEN, GameConst.BLUE, GameConst.WHITE, GameConst.BLACK, GameConst.BROWN];
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

// WINDOWS
class TextWindow extends Window_Base {
  static createWindowOneFourthSize(x, y, text) {
    const width = ScreenHelper.getOneFourthWidth();
    const height = null;
    return TextWindow.create(x, y, width, height, text);
  }

  static create(x = 0, y = 0, width = 0, height = 0, text = []) {
    if (!Array.isArray(text)) {
      throw new Error('text must be an array!');
    }
    const rect = new Rectangle(x, y, width, height);
    return new TextWindow(rect, text);
  }

  static borderHeight() {
    return 12;
  }

  static textHeight() {
    return 36;
  }

  static createWindowMiddleSize(x, y, text) {
    const width = ScreenHelper.getHalfWidth();
    const height = null;
    return TextWindow.create(x, y, width, height, text);
  }

  static createWindowFullSize(x, y, text) {
    const width = ScreenHelper.getFullWidth();
    const height = null;
    return TextWindow.create(x, y, width, height, text);
  }

  static setTextColor(text, color) {
    let colorIndex = ColorHelper.getColorIndex(color);
    return `\\c[${colorIndex}]${text}`;
  }

  initialize(rect, text) {
    super.initialize(rect);
    this._textAlignment = GameConst.LEFT;
    this._windowColor = GameConst.DEFAULT_COLOR;
    this._history = [];
    this.setText(text);
    this.resizeByText(text);
    this.closed();
    this.refresh();
  }

  setText(text) {
    this._text = text;
  }

  resizeByText(text) {
    const borderHeight = TextWindow.borderHeight() * 2;
    const textHeight = TextWindow.textHeight() * Math.max(text.length, 0);
    const height = borderHeight + textHeight;
    this.move(this.x, this.y, this.width, height);
    this.updatePadding();
    this.updateBackOpacity();
    this.updateTone();
    this.createContents();
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
        this.setTone(0, 0, 155);
        break;
      case GameConst.RED_COLOR:
        this.setTone(155, 0, 0);
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
    this.x = ScreenHelper.getStartPosition();
    this.y = ScreenHelper.getTopPosition();
  }

  alignCenterTop() {
    this.x = ScreenHelper.getCenterPosition(this.width);
    this.y = ScreenHelper.getTopPosition();
  }

  alignEndTop() {
    this.x = ScreenHelper.getEndPosition(this.width);
    this.y = ScreenHelper.getTopPosition();
  }

  alignStartMiddle() {
    this.x = ScreenHelper.getStartPosition();
    this.y = ScreenHelper.getMiddlePosition(this.height);
  }

  alignCenterAboveMiddle() {
    this.x = ScreenHelper.getCenterPosition(this.width);
    this.y = ScreenHelper.getAboveMiddlePosition(this.height);
  }

  alignCenterMiddle() {
    this.x = ScreenHelper.getCenterPosition(this.width);
    this.y = ScreenHelper.getMiddlePosition(this.height);
  }

  alignCenterBelowMiddle() {
    this.x = ScreenHelper.getCenterPosition(this.width);
    this.y = ScreenHelper.getBelowMiddlePosition(this.height);
  }

  alignEndMiddle() {
    this.x = ScreenHelper.getEndPosition(this.width);
    this.y = ScreenHelper.getMiddlePosition(this.height);
  }

  alignStartBottom() {
    this.x = ScreenHelper.getStartPosition();
    this.y = ScreenHelper.getBottomPosition(this.height);
  }

  alignCenterBottom() {
    this.x = ScreenHelper.getCenterPosition(this.width);
    this.y = ScreenHelper.getBottomPosition(this.height);
  }

  alignEndBottom() {
    this.x = ScreenHelper.getEndPosition(this.width);
    this.y = ScreenHelper.getBottomPosition(this.height);
  }

  alignAboveOf(obj) {
    const { y } = obj;
    this.y = ScreenHelper.getPositionAboveOf(y, this.height);
  }

  alignBelowOf(obj) {
    const { y, height } = obj;
    this.y = ScreenHelper.getPositionBelowOf(y, height);
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

  refreshContent(text = []) {
    if (text.length > 0) {
      this.setText(text);
      this.resizeByText(text);
      this.refresh();
    }
  }
}
class CommandWindow extends Window_Command {
  static create(x, y, text = [], commands = []) {
    if (!Array.isArray(text)) {
      throw new Error('text must be an array!');
    }
    const width = ScreenHelper.getFullWidth();
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
        this.setTone(0, 0, 155);
        break;
      case GameConst.RED_COLOR:
        this.setTone(155, 0, 0);
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
    const x = ScreenHelper.getStartPosition();
    const y = ScreenHelper.getTopPosition();
    this.addAction(this.commandAlign, x, y);
  }

  alignMiddle() {
    const x = ScreenHelper.getStartPosition();
    const y = ScreenHelper.getMiddlePosition(this.height);
    this.addAction(this.commandAlign, x, y);
  }

  alignBottom() {
    const x = ScreenHelper.getStartPosition();
    const y = ScreenHelper.getBottomPosition(this.height);
    this.addAction(this.commandAlign, x, y);
  }

  commandAlign(x, y) {
    this.x = x;
    this.y = y;
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

  callHandler(symbol) {
    if (this.isHandled(symbol)) {
      const index = this.findSymbol(symbol);
      this._handlers[symbol](index);
    }
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

  constructor(window, updates, fps = 1) {
    this._window = window;
    this._fps = fps;
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
    this._interval = Math.floor(this._fps / (highValue || 1)) || 1;
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
    const width = ScreenHelper.getOneFourthWidth();
    const height = StateWindow.borderHeight() * 2;
    return StateWindow.create(x, y, width, height);
  }

  static borderHeight() {
    return 12;
  }

  static minHeight() {
    return 60;
  }

  static createWindowMiddleSize(x, y) {
    const width = ScreenHelper.getHalfWidth();
    const height = StateWindow.borderHeight() * 2
    return StateWindow.create(x, y, width, height);
  }

  static createWindowFullSize(x, y) {
    const width = ScreenHelper.getFullWidth();
    const height = StateWindow.borderHeight() * 2
    return StateWindow.create(x, y, width, height);
  }

  static create(x, y, width, height) {
    return new StateWindow(new Rectangle(x, y, width, height));
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
        this.setTone(0, 0, 155);
        break;
      case GameConst.RED_COLOR:
        this.setTone(155, 0, 0);
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
    const x = ScreenHelper.getStartPosition();
    const y = ScreenHelper.getTopPosition();
    this.addCommand(this.commandAlign, x, y);
  }

  alignCenterTop() {
    const x = ScreenHelper.getCenterPosition(this.width);
    const y = ScreenHelper.getTopPosition();
    this.addCommand(this.commandAlign, x, y);
  }

  alignEndTop() {
    const x = ScreenHelper.getEndPosition(this.width);
    const y = ScreenHelper.getTopPosition();
    this.addCommand(this.commandAlign, x, y);
  }

  alignStartMiddle() {
    const x = ScreenHelper.getStartPosition();
    const y = ScreenHelper.getMiddlePosition(this.height);
    this.addCommand(this.commandAlign, x, y);
  }

  alignCenterAboveMiddle() {
    const x = ScreenHelper.getCenterPosition(this.width);
    const y = ScreenHelper.getAboveMiddlePosition(this.height);
    this.addCommand(this.commandAlign, x, y);
  }

  alignEndAboveMiddle() {
    const x = ScreenHelper.getEndPosition(this.width);
    const y = ScreenHelper.getAboveMiddlePosition(this.height);
    this.addCommand(this.commandAlign, x, y);
  }

  alignCenterMiddle() {
    const x = ScreenHelper.getCenterPosition(this.width);
    const y = ScreenHelper.getMiddlePosition(this.height);
    this.addCommand(this.commandAlign, x, y);
  }

  alignCenterBelowMiddle() {
    const x = ScreenHelper.getCenterPosition(this.width);
    const y = ScreenHelper.getBelowMiddlePosition(this.height);
    this.addCommand(this.commandAlign, x, y);
  }

  alignEndBelowMiddle() {
    const x = ScreenHelper.getEndPosition(this.width);
    const y = ScreenHelper.getBelowMiddlePosition(this.height);
    this.addCommand(this.commandAlign, x, y);
  }

  alignEndMiddle() {
    const x = ScreenHelper.getEndPosition(this.width);
    const y = ScreenHelper.getMiddlePosition(this.height);
    this.addCommand(this.commandAlign, x, y);
  }

  alignStartBottom() {
    const x = ScreenHelper.getStartPosition();
    const y = ScreenHelper.getBottomPosition(this.height);
    this.addCommand(this.commandAlign, x, y);
  }

  alignCenterBottom() {
    const x = ScreenHelper.getCenterPosition(this.width);
    const y = ScreenHelper.getBottomPosition(this.height);
    this.addCommand(this.commandAlign, x, y);
  }

  alignEndBottom() {
    const x = ScreenHelper.getEndPosition(this.width);
    const y = ScreenHelper.getBottomPosition(this.height);
    this.addCommand(this.commandAlign, x, y);
  }

  alignAboveOf(obj) {
    const { y } = obj;
    const receptorX = undefined;
    const receptorY = ScreenHelper.getPositionAboveOf(y, this.height);
    this.addCommand(this.commandAlign, receptorX, receptorY);
  }

  alignBelowOf(obj) {
    const { y, height } = obj;
    const receptorX = undefined;
    const receptorY = ScreenHelper.getPositionBelowOf(y, height);
    this.addCommand(this.commandAlign, receptorX, receptorY);
  }

  commandAlign(x = this.x, y = this.y) {
    if (!this.isStopped()) return false;
    this.x = x;
    this.y = y;
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

  updateValues(updates, fps) {
    updates = Array.isArray(updates) ? updates : [updates];
    this.addCommand(this.commandUpdateValues, updates, fps);
  }

  commandUpdateValues(updates, fps) {
    if (!(this.isOpen() && this.isStopped())) return false;
    this.changeStatus(WindowUpdatedState, updates, fps);
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
    this._pass = false;
    this.refreshPoints();
  }

  refreshPoints(redPoints = 0, bluePoints = 0, greenPoints = 0, blackPoints = 0, whitePoints = 0, cardsInDeck = 0, cardsInHand = 0) {
    this.addValue(GameConst.RED, redPoints);
    this.addValue(GameConst.BLUE, bluePoints);
    this.addValue(GameConst.GREEN, greenPoints);
    this.addValue(GameConst.BLACK, blackPoints);
    this.addValue(GameConst.WHITE, whitePoints);
    this.addValue(GameConst.CARDS_IN_DECK, cardsInDeck);
    this.addValue(GameConst.CARDS_IN_HAND, cardsInHand);
    this.refresh();
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
    const redPoints = this.getValueAndConvertToDisplayPad(GameConst.RED);
    const bluePoints = this.getValueAndConvertToDisplayPad(GameConst.BLUE);
    const greenPoints = this.getValueAndConvertToDisplayPad(GameConst.GREEN);
    const blackPoints = this.getValueAndConvertToDisplayPad(GameConst.BLACK);
    const whitePoints = this.getValueAndConvertToDisplayPad(GameConst.WHITE);
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
    const handPoints = this.getValueAndConvertToDisplayPad(GameConst.CARDS_IN_HAND);
    const deckPoints = this.getValueAndConvertToDisplayPad(GameConst.CARDS_IN_DECK);
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
    const width = ScreenHelper.getOneFourthWidth();
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
    this.refresh();
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

  refreshPoints(cardsInTrash = 0) {
    this.addValue(GameConst.NUM_CARDS_IN_TRASH, cardsInTrash);
    this.refresh();
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
    this._score = 0;
    this.refresh();
  }

  refreshScore(score = 0) {
    this._score = score;
    this.refresh(score);
  }

  refresh(score = this._score) {
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

// SPRITES
class ActionSprite extends Sprite {
  initialize(x = 0, y = 0) { 
    super.initialize();
    this._commandQueue = [];
    this._delayCommandQueue = [];
    this._wait = 0;
    this._status = null;
    this._effects = {
      opacity: 255,
      intensity: {
        value: 255,
        positive: false
      },
    };
    this.setPosition(x, y);
  }

  getPosition() {
    return { x: this.x, y: this.y };
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
    const command = this.createCommand({ fn, delay: 0, trigger: null }, ...params);
    this.addCommands(command);
  }

  addCommandTrigger(fn, trigger, ...params) {
    const command = this.createCommand({ fn, delay: 0, trigger }, ...params);
    this.addCommands(command);
  }

  createDelayCommand(fn, delay, ...params) {
    const command = this.createCommand({ fn, delay, trigger: null }, ...params);
    return command;
  }

  createCommand(props, ...params) {
    const { fn, delay, trigger } = props;
    const command = { 
      fn: fn.name || 'anonymous',
      delay: delay || 0,
      execute: () => {
        const result = fn.call(this, ...params);
        if (typeof trigger === 'function') trigger();
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

  createDelayCommands(fn, delay, set, triggerActions) {
    const hasTriggerActions = triggerActions && triggerActions.length > 0;
    const commands = set.map((params, index) => {
      const appliedDelay = (index > 0) ? delay : 0;
      const command = this.createCommand({
        fn,
        delay: appliedDelay,
        trigger: hasTriggerActions ? triggerActions[index] : undefined,
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

  alignAboveOf(obj) {
    const { y } = obj;
    const receptorX = undefined;
    const receptorY = ScreenHelper.getPositionAboveOf(y, this.height);
    this.addCommand(this.commandAlign, receptorX, receptorY);
  }

  alignBelowOf(obj) {
    const { y, height } = obj;
    const receptorX = undefined;
    const receptorY = ScreenHelper.getPositionBelowOf(y, height);
    this.addCommand(this.commandAlign, receptorX, receptorY);
  }

  commandAlign(x = this.x, y = this.y) {
    this.x = x;
    this.y = y;
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
    if (this.hasDelayCommands()) {
      return this._delayCommandQueue.some(command => command.delay > 0);
    }
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
    return this._delayCommandQueue?.length > 0;
  }

  updateEffects() {
    this.updateIntensityEffect();
    this.updateOpacityEffect();
  }

  updateIntensityEffect() {
    if (this._effects.intensity.value <= 255 && !this._effects.intensity.positive) {
      this._effects.intensity.value += 6;
      if (this._effects.intensity.value >= 255) {
        this._effects.intensity.positive = true;
      }
    }
    if (this._effects.intensity.value >= 100 && this._effects.intensity.positive) {
      this._effects.intensity.value -= 6;
      if (this._effects.intensity.value <= 100) {
        this._effects.intensity.positive = false;
      }
    }
  }

  updateOpacityEffect() {
    this._effects.opacity -= 32;
    if (this._effects.opacity <= 0) {
      this._effects.opacity = 255;
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

  alignCenterMiddle() {
    const x = ScreenHelper.getCenterPosition(this.width);
    const y = ScreenHelper.getMiddlePosition(this.height);
    this.addCommand(this.commandAlign, x, y);
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

  stop() {
    this._card.changeStatus(CardSpriteStoppedState);
  }

  open() {
    return false;
  }

  close() {
    return false;
  }
  
  toMove() {
    return false;
  }
  
  zoom() {
    return false;
  }
  
  zoomOut() {
    return false;
  }
  
  leave() {
    return false;
  }

  updateStatus() {
    const that = this._card;
    if (this.hasMoves() && this.isStopped()) this.startMove();
    if (this.isToMove()) {
      this.updateXPosition();
      this.updateYPosition();
    } else {
      this.stop();
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

  stop() {
    this._card.changeStatus(CardSpriteStoppedState);
  }

  open() {
    return false;
  }

  close() {
    return false;
  }
  
  toMove() {
    return false;
  }
  
  zoom() {
    return false;
  }
  
  zoomOut() {
    return false;
  }
  
  leave() {
    return false;
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
    this.stop();
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

  stop() {
    this._card.changeStatus(CardSpriteStoppedState);
  }

  open() {
    return false;
  }

  close() {
    return false;
  }
  
  toMove() {
    return false;
  }
  
  zoom() {
    return false;
  }
  
  zoomOut() {
    return false;
  }
  
  leave() {
    return false;
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
      this.stop();
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
    const opacity = parent?._effects?.opacity || that._effects.opacity;
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
    const opacity = parent?._effects?.opacity || that._effects.opacity;
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
    const opacity = parent?._effects?.intensity.value || that._effects.intensity.value;
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
    this._type = '';
    this._color = '';
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
    this._status = new CardSpriteStoppedState(this);
    this.setup();
  }

  setup() {
    this.hide();
    this.enable();
    this.setTurnToUp();
    this.setOriginalSize();
    this.createLayers();
  }

  stop() {
    this.addCommand(this.commandStop);
  }

  commandStop() {
    return this._status.stop();
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
    return 120;
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
      case GameConst.RED:
        return ColorHelper.getColorHex(GameColors.FADEDRED);
        break;
      case GameConst.GREEN:
        return ColorHelper.getColorHex(GameColors.FADEDGREEN);
        break;
      case GameConst.BLUE:
        return ColorHelper.getColorHex(GameColors.FADEDBLUE);
        break;
      case GameConst.WHITE:
        return ColorHelper.getColorHex(GameColors.FADEDWHITE);
        break;
      case GameConst.BLACK:
        return ColorHelper.getColorHex(GameColors.FADEDBLACK);
        break;
      default:
        return ColorHelper.getColorHex(GameColors.FADEDBROWN);
        break;
    }
  }

  getBackgroundColor() {
    switch (this._color) {
      case GameConst.RED:
        return ColorHelper.getColorHex(GameColors.RED);
        break;
      case GameConst.GREEN:
        return ColorHelper.getColorHex(GameColors.GREEN);
        break;
      case GameConst.BLUE:
        return ColorHelper.getColorHex(GameColors.BLUE);
        break;
      case GameConst.WHITE:
        return ColorHelper.getColorHex(GameColors.WHITE);
        break;
      case GameConst.BLACK:
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
      case GameConst.BATTLE:
          this.drawPoints();
        break;
      case GameConst.POWER:
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
    return this._status.open();
  }

  isStopped() {
    return this.getStatus() instanceof CardSpriteStoppedState;
  }

  close() {
    this.addCommand(this.commandClose);
    this.hide();
  }

  commandClose() {
    return this._status.close();
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
    this.addCommand(this.commandMoving, moves);
  }

  commandMoving(moves) {
    return this._status.toMove(moves);
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

  damage(times = 1, anchorParent = this.parent, trigger) {
    const animation = this.damageAnimation();
    this.addCommandTrigger(this.commandAnimate, trigger, animation, times, anchorParent);
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
    return this._status.zoom();
  }

  isOriginalScale() {
    return this.scale.x === 1 && this.scale.y === 1;
  }

  zoomOut() {
    this.addCommand(this.commandZoomOut);
  }

  commandZoomOut() {
    return this._status.zoomOut();
  }

  isZoom() {
    return this.scale.x > 1 || this.scale.y > 1;
  }

  leave() {
    this.addCommand(this.commandLeave);
    this.hide();
  }

  commandLeave() {
    return this._status.leave();
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

  staticMode() {
    return false;
  }

  selectMode(selectNumber, onSelectHandler, onChangeCursor, onCancelHandler) {
    this._cardset.changeStatus(CardsetSpriteSelectModeState, selectNumber, onSelectHandler, onChangeCursor, onCancelHandler);
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
  _onSelectHandler;
  _onChangeCursor;
  _onCancelHandler;

  constructor(sprite, selectNumber = -1, onSelectHandler, onChangeCursor, onCancelHandler) {
    if (!(sprite instanceof CardsetSprite)) {
      throw new Error('sprite is not a CardsetSprite instance!');
    }
    if (typeof selectNumber !== 'number') {
      throw new Error('selectNumber is not a number!');
    }
    if (onSelectHandler && typeof onSelectHandler !== 'function') {
      throw new Error('onSelectHandler is not a function!');
    }
    if (onChangeCursor && typeof onChangeCursor !== 'function') {
      throw new Error('onChangeCursor is not a function!');
    }
    if (onCancelHandler && typeof onCancelHandler !== 'function') {
      throw new Error('onCancelHandler is not a function!');
    }
    this._cardset = sprite;
    this._cursorIndex = 0;
    this._selectedIndexs = [];
    this._selectNumber = selectNumber;
    this._onSelectHandler = onSelectHandler;
    this._onChangeCursor = onChangeCursor;
    this._onCancelHandler = onCancelHandler;
    this.updateOnChangeCursor();
    this.updateHoverSprites();
  }

  staticMode() {
    this._cardset.changeStatus(CardsetSpriteStaticModeState);
  }

  selectMode() {
    return false;
  }

  updateOnChangeCursor() {
    if (this._onChangeCursor) {
      const cardset = this._cardset;
      cardset.addCommand(this._onChangeCursor, this._cursorIndex);
    }
  }

  updateHoverSprites() {
    const cardset = this._cardset;
    const sprites = cardset.getSprites();
    const spriteToAdd = cardset.getSprites(this._cursorIndex);
    cardset.commandAddChildToEnd(spriteToAdd);
    sprites.forEach((sprite, index) => {
      if (spriteToAdd === sprite) {
        return this.hoverSprite(sprite);
      } 
      this.unhoverSprite(sprite);
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
      if (this.isSelectable()) {
        if (this._onCancelHandler && Input.isTriggered('cancel')) {
          cardset.addCommand(this._onCancelHandler);
          return cardset.commandStaticMode();
        }
        if (this.selectIsFull()) {
          cardset.addCommand(this._onSelectHandler, this._selectedIndexs);
          return cardset.commandStaticMode();
        }
        if (Input.isTriggered('ok')) this.selectSprite();
      }
    }
  }

  updateCursor() {
    if (this.isRepeatedOrLongPressedRight()) {
      this.moveCursorRight();
    } else if (this.isRepeatedOrLongPressedLeft()) {
      this.moveCursorLeft();
    }
    if (this.isRepeatedOrLongPressedRight() || this.isRepeatedOrLongPressedLeft()) {
      this.updateOnChangeCursor();
      this.updateHoverSprites();
    }
  }

  isRepeatedOrLongPressedRight() {
    return Input.isRepeated('right') || Input.isLongPressed('right');
  }

  isRepeatedOrLongPressedLeft() {
    return Input.isRepeated('left') || Input.isLongPressed('left');
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
    const sprite = this._cardset.getSprites(cursorIndex);
    if (sprite && sprite.isDisabled()) return;
    if (this._selectedIndexs.includes(cursorIndex)) {
      this.removeSelectedIndex(cursorIndex);
    } else {
      this.addSelectedIndex(cursorIndex);
    }
    if (this.selectIsFull() === false) this.updateSelectSprites();
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
    let full = false;
    if (this._selectNumber > 0) {
      limit = selectedAmount >= this._selectNumber;
    }
    if (selectedAmount > 0) {
      full = selectedAmount === allowedAmount;
    }
    return limit || full;
  }
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
    this.addCommand(this.commandHideOrderingSprites, sprites);
  }

  commandHideOrderingSprites(sprites) {
    if (this.isHidden()) return false;
    sprites.forEach(sprite => sprite.hide());
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
    const cardIndex = this.indexOfCardSprite(sprite);
    const orderingSprite = this.getOrderingSpriteByIndex(cardIndex);
    this.commandHideOrderingSprites([orderingSprite]);
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

  moveCardsInlist(sprites = this._sprites, delay = 6, triggerActions) {
    sprites = this.toArray(sprites);
    const numCards = sprites.length;
    const positions = CardsetSprite.createPositionsList(numCards);
    let moves = this.moveCardsPositions(positions, sprites);
    moves = moves.map(({ sprite, x, y }) => [sprite, x, y]);
    const commands = this.createDelayCommands(this.commandMoveCard, delay, moves, triggerActions);
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

  selectMode(selectNumber, onSelectHandler, onChangeCursor, onCancelHandler) {
    this.addCommand(this.commandSelectMode, selectNumber, onSelectHandler, onChangeCursor, onCancelHandler);
  }

  commandSelectMode(selectNumber, onSelectHandler, onChangeCursor, onCancelHandler) {
    return this._status.selectMode(selectNumber, onSelectHandler, onChangeCursor, onCancelHandler);
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

  flashCardsAnimate(sprites = this._sprites, color = 'white', duration = 10, times = 1, trigger) {
    sprites = this.toArray(sprites);
    this.addCommandTrigger(this.commandAnimateCardsFlash, trigger, sprites, color, duration, times);
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

  damageCardsAnimate(times = 1, sprites = this._sprites, anchorParent = this.parent, trigger) {
    sprites = this.toArray(sprites);
    this.addCommandTrigger(this.commandAnimateCardsDamage, trigger, times, sprites, anchorParent);
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
    if (!this.children || this.hasChildren() === false) return false;
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
      const cardSprite = this._sprites[number - 1];
      this.redrawOrderingNumber(sprite, number, cardSprite);
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
    if (Array.isArray(index)) index = index[0];
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

  addChildToEnd(sprites) {
    this.addCommand(this.commandAddChildToEnd, sprites);
  }

  commandAddChildToEnd(spritesToAdd) {
    if (this.isHidden()) return false;
    spritesToAdd = this.toArray(spritesToAdd);
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
    sprites = this.toArray(sprites);
    this.addCommand(this.commandLeaveAllCards, sprites);
  }

  commandLeaveAllCards(sprites) {
    if (this.isHidden()) return false;
    sprites.forEach(sprite => sprite.leave());
  }

  isCardsHidden(sprites = this._sprites) {
    return sprites.every(sprite => sprite.isHidden());
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

// SCENE
class RunPowerCardPhaseStatus {
  _phase;
  _powerCard;

  constructor(phase, manager, powerCard) {
    if (phase instanceof LoadPhase === false) {
      throw new Error("phase is not an instance of LoadPhase");
    }
    // if (powerCard instanceof PowerCard === false) {
    //   throw new Error("powerCard is not an instance of PowerCard");
    // }
    this._phase = phase;
    this._powerCard = powerCard;
    this.start(manager);
  }

  start(manager) {
    console.log('RunPowerCardPhaseStatus start', this._powerCard);
  }

  isBusy() {
    return false;
  }

  update(manager) {
    const that = this._phase;
    // that.closeGameBoards();
    // that.leaveGameBoards();
    // that.closePowerCard();
    // that.leavePowerCard();
    // that.commandPlayerHand(manager);
    console.log('getPowerfieldLength', manager.getPowerfieldLength());
    if (manager.getPowerfieldLength() === 0) {
      manager.resetPlayes();
      that.setStep(GameConst.TURN_PHASE);
    }
    that.waitStatus();
    that.stepWainting();
  }

  activePowerCard(cardIndexHand, manager, player) {
    return false;
  }

  runPowerCard(manager, powerCard) {
    return false;
  }

  waitStatus() {
    this._phase.changeStatus(WaitingPhaseStatus);
  }
}
class ActivePowerCardPhaseStatus {
  _phase;
  _cardIndex;
  _player;

  constructor(phase, cardIndexHand, manager, player) {
    if (phase instanceof LoadPhase === false) {
      throw new Error("phase is not an instance of LoadPhase");
    }
    // if (card instanceof PowerCard === false) {
    //   throw new Error("card is not an instance of PowerCard");
    // }
    this._phase = phase;
    this._cardIndex = cardIndexHand;
    this._player = player;
    this.start(cardIndexHand, manager);
  }

  start(cardIndex, manager) {
    const card = manager.getCardPlayerHandByIndex(cardIndex);
    const powerCardParams = manager.getPowerCardParams(card.id);
    this.setParams(powerCardParams);
  }

  setParams(params) {
    const { type } = params;
    switch (type) {
      case GameConst.ADD_ENERGIES:
        console.log('mostra animação de adicionar energias');
        break;
      default:
        break;
    }
  }

  isBusy() {
    return false;
  }

  update(manager) {
    const that = this._phase;
    const cardIndex = this._cardIndex;
    const player = this._player;
    if (Input.isTriggered('ok')) {
      manager.moveCardHandToPowerField(cardIndex, player);
      const sprite = that.commandGetPowerfieldSprites(cardIndex);
      const number = manager.getPowerfieldLength();
      that.moveCardToPowerfield(sprite, number, player);
      that.waitStatus();
      that.setStep(GameConst.CHALLENGE_TURN_PHASE);
      manager.resetPlayes();
      manager.playerPassed();
    }
    if (Input.isTriggered('cancel')) {
      that.closeGameBoards();
      that.leaveGameBoards();
      that.closePowerCard();
      that.leavePowerCard();
      that.commandPlayerHand(manager);
      that.waitStatus();
      that.stepWainting();
    }
  }

  activePowerCard(cardIndexHand, manager, player) {
    return false;
  }

  runPowerCard(manager, powerCard) {
    return false;
  }

  waitStatus() {
    this._phase.changeStatus(WaitingPhaseStatus);
  }
}
class WaitingPhaseStatus  {
  _phase;
  _textWindow;
  _askWindow;

  _playerHand;
  _locationWindow;
  _cardNameWindow;
  _cardDescriptionWindow;
  _cardPropsWindow;

  constructor(phase) {
    if (phase instanceof LoadPhase === false) {
      throw new Error("phase is not an instance of LoadPhase");
    }
    this._phase = phase;
    this.start();
  }

  start() {
    const that = this._phase;
    const title = 'Load Phase';
    const description = 'Select and use a Program Card.';
    that.createTitleWindow(title);
    that.createDescriptionWindow(description);
    that.openTextWindows();
    that.setStep(GameConst.START_PHASE);
  }

  isBusy() {
    const children = [
      this._textWindow,
      this._askWindow,
      this._locationWindow,
      this._cardNameWindow,
      this._cardDescriptionWindow,
      this._cardPropsWindow,
      this._playerHand
    ];
    return children.some(obj => (obj && obj.isBusy ? obj.isBusy() : false));
  }

  update(manager) {
    this.updateStepStart(manager);
    this.updateStepBeginLoadPhase(manager);
    this.updateStartPlay(manager);
    this.updateStepChallengedLoadPhase(manager);
    this.updateStepPlayerLoadPhase(manager);
    this.updateStepPowerfieldLoadPhase(manager);
    if (manager.isEndPlays() && manager.getPowerfieldLength()) return; 
    this.updateStepEnd(manager);
  }

  updateStepStart(manager) {
    const that = this._phase;
    const isStartPhase = that.isCurrentStep(GameConst.START_PHASE);
    if (isStartPhase && Input.isTriggered('ok')) {
      that.commandCloseTextWindows();
      that.leaveTextWindows();
      this.createPlayerGameBoard(manager);
      this.createChallengedGameBoard(manager);
      that.openGameBoards();
      const text = 'Begin Load Phase';
      this.createTextWindow(text);
      this.openBeginLoadPhaseWindow();
      that.setStep(GameConst.BEGIN_LOAD_PHASE);
    }
  }

  createPlayerGameBoard(manager) {
    const that = this._phase;
    const energies = Object.values(manager.getPlayerEnergies());
    const cardsInDeck = manager.getPlayerDeckLength();
    const cardsInHand = manager.getPlayerHandLength();
    const cardsInTrash = manager.getPlayerTrashLength();
    const victories = manager.getPlayerVictories();
    const passed = manager.isPlayerPassed();
    const boardWindow = that.createPlayerBoardWindow(energies, cardsInDeck, cardsInHand, passed);
    const boardWindowHeight = boardWindow.height;
    const battleWindow = that.createPlayerBattleWindow(boardWindowHeight);
    const trashWindow = that.createPlayerTrashWindow(cardsInTrash);
    const scoreWindow = that.createPlayerScoreWindow(victories, boardWindowHeight);
    const battlefield = that.createPlayerBattlefield();
  }

  createChallengedGameBoard(manager) {
    const that = this._phase;
    const energies = Object.values(manager.getChallengedEnergies());
    const cardsInDeck = manager.getChallengedDeckLength();
    const cardsInHand = manager.getChallengedHandLength();
    const cardsInTrash = manager.getChallengedTrashLength();
    const victories = manager.getChallengedVictories();
    const passed = manager.isChallengedPassed();
    const boardWindow = that.createChallengedBoardWindow(energies, cardsInDeck, cardsInHand, passed);
    const boardWindowHeight = boardWindow.height;
    const battleWindow = that.createChallengedBattleWindow(boardWindowHeight);
    const trashWindow = that.createChallengedTrashWindow(cardsInTrash);
    const scoreWindow = that.createChallengedScoreWindow(victories, boardWindowHeight);
    const battlefield = that.createChallengedBattlefield();
  }

  createTextWindow(text) {
    const that = this._phase;
    const textWindow = TextWindow.createWindowFullSize(0, 0, [text]);
    textWindow.alignCenterMiddle();
    textWindow.alignTextCenter();
    that.addAction(this.commandCreateTextWindow.bind(this), textWindow);
    return textWindow;
  }

  commandCreateTextWindow(textWindow) {
    const that = this._phase;
    this._textWindow = textWindow;
    that.commandAddChild(textWindow);
  }

  openBeginLoadPhaseWindow() {
    const that = this._phase;
    that.addAction(this.commandOpenTextWindow.bind(this));
  }

  commandOpenTextWindow() {
    this._textWindow.open();
  }

  updateStepBeginLoadPhase(manager) {
    const that = this._phase;
    const isBegin = that.isCurrentStep(GameConst.BEGIN_LOAD_PHASE);
    if (isBegin && Input.isTriggered('ok')) {
      this.closeBeginLoadPhaseWindow();
      this.leaveBeginLoadPhaseWindow();
      that.setStep(GameConst.TURN_PHASE);
    }
  }

  closeBeginLoadPhaseWindow() {
    const that = this._phase;
    that.addAction(this.commandCloseTextWindow.bind(this));
  }

  commandCloseTextWindow() {
    this._textWindow.close();
  }

  leaveBeginLoadPhaseWindow() {
    const that = this._phase;
    that.addAction(this.commandLeaveBeginLoadPhaseWindow.bind(this));
  }

  commandLeaveBeginLoadPhaseWindow() {
    const that = this._phase;
    that.removeChild(this._textWindow);
  }

  updateStartPlay(manager) {
    const that = this._phase;
    const isTurnPhase = that.isCurrentStep(GameConst.TURN_PHASE);
    if (manager.isStartPlays() && isTurnPhase) {
      if (manager.startPlay) {
        that.setStep(GameConst.PLAYER_TURN_PHASE);
      } else {
        that.setStep(GameConst.CHALLENGE_TURN_PHASE);
      }
    }
  }

  updateStepChallengedLoadPhase(manager) {
    const that = this._phase;
    const isChallengedTurnPhase = that.isCurrentStep(GameConst.CHALLENGE_TURN_PHASE);
    if (isChallengedTurnPhase) {
      manager.challengePassed();
      that.challengePass();
      that.stepWainting();
      if (manager.isPlayerPassed() === false) that.setStep(GameConst.PLAYER_TURN_PHASE);
    }
  }

  updateStepPlayerLoadPhase(manager) {
    const that = this._phase;
    const isPlayerTurnPhase = that.isCurrentStep(GameConst.PLAYER_TURN_PHASE);
    if (isPlayerTurnPhase) {
      const commandYes = () => {
        this.commandCloseAskWindow();
        this.leaveAskWindow();
        that.closeGameBoards();
        that.leaveGameBoards();
        this.commandPlayerHand(manager);
      };
      const commandNo = () => {
        this.commandCloseAskWindow();
        this.leaveAskWindow();
        this.commandPlayerPassed(manager);
      };
      this.createAskWindow('Use a Program Card?', commandYes, commandNo);
      this.openAskWindow();
      that.stepWainting();
    }
  }

  createAskWindow(text, yesHandler, noHanlder) {
    const that = this._phase;
    const commandYes = CommandWindow.createCommand('Yes', 'YES', yesHandler);
    const commandNo = CommandWindow.createCommand('No', 'NO', noHanlder);
    const askWindow = CommandWindow.create(0, 0, [text], [commandYes, commandNo]);
    askWindow.alignBottom();
    that.addAction(this.commandCreateAskWindow.bind(this), askWindow);
    return askWindow;
  }

  commandCreateAskWindow(askWindow) {
    const that = this._phase;
    this._askWindow = askWindow;
    that.commandAddChild(askWindow);
  }

  openAskWindow() {
    const that = this._phase;
    that.addAction(this.commandOpenAskWindow.bind(this));
  }

  commandOpenAskWindow() {
    this._askWindow.open();
  }

  commandCloseAskWindow() {
    this._askWindow.close();
  }

  leaveAskWindow() {
    const that = this._phase;
    that.addAction(this.commandLeaveAskWindow.bind(this));
  }

  commandLeaveAskWindow() {
    const that = this._phase;
    that.removeChild(this._askWindow);
  }

  commandPlayerHand(manager) {
    const that = this._phase;
    const onChangeCursor = index => {
      const card = manager.getCardPlayerHandByIndex(index);
      this.commandSetTextCardNameWindow(['card.name' + index]);
      this.commandSetTextCardDescriptionWindow(['card.description' + index]);
      this.commandSetTextCardPropsWindow(['card.props' + index]);
    };
    const onSelectHandler = cardIndexs => {
      const sprite = this.commandGetHandSprites(cardIndexs);
      this.selectPowerCard(sprite);
      this.closePlayerHand();
      this.leavePlayerHand();
      this.createPlayerGameBoard(manager);
      this.createChallengedGameBoard(manager);
      that.openGameBoards();
      const cards = cardIndexs.map(index => manager.getCardPlayerHandByIndex(index));
      that.createPowerfield(cards);
      that.openPowerfield();
      that.activePowerCard(cardIndexs[0], manager, GameConst.PLAYER);
      that.setStep(GameConst.ACTIVE_POWER_CARD);
    };
    const onCancelHandler = () => {
      this.closePlayerHand();
      this.leavePlayerHand();
      this.createPlayerGameBoard(manager);
      this.createChallengedGameBoard(manager);
      that.openGameBoards();
      that.setStep(GameConst.PLAYER_TURN_PHASE);
    };

    const playerEnergies = Object.values(manager.getPlayerEnergies());
    const playerCardsInDeck = manager.getPlayerDeckLength();
    const playerCardsInHand = manager.getPlayerHandLength();
    const playerPassed = manager.isPlayerPassed();
    that.createPlayerBoardWindow(playerEnergies, playerCardsInDeck, playerCardsInHand, playerPassed);
    
    // manager.getPlayerDisabledIndexesInLoadPhase
    const cardsInHand = manager.getPlayerHand();
    const disableCards = cardsInHand.map((card, index) => {
      return {
        index,
        disable: card.type !== GameConst.POWER || card.isActiveInLoadPhase === false,
      };
    });
    const disableIndexes = disableCards.filter(card => card.disable).map(card => card.index);

    this.createPlayerHandset(cardsInHand, disableIndexes);
    this.openPlayerHand(onSelectHandler, onChangeCursor, onCancelHandler);
  }

  createPlayerHandset(cards, disableIndexes) {
    const playerHand = this.createPlayerHand(cards, disableIndexes);
    const locationWindow = this.createLocationWindow(playerHand);
    const cardNameWindow = this.createCardNameWindow(playerHand);
    const cardDescriptionWindow = this.createCardDescriptionWindow(playerHand);
    const cardPropsWindow = this.createCardPropsWindow(playerHand);
    return { playerHand, locationWindow, cardNameWindow, cardDescriptionWindow, cardPropsWindow };
  }

  createPlayerHand(cards, disableIndexes) {
    const that = this._phase;
    const x = ScreenHelper.getCenterPosition(CardsetSprite.contentOriginalWidth());
    const y = ScreenHelper.getMiddlePosition(CardsetSprite.contentOriginalHeight());
    const playerHand = CardsetSprite.create(x, y);
    playerHand.show();
    const sprites = playerHand.listCards(cards);
    playerHand.startClosedCards(sprites);
    const disableSprites = sprites.filter((sprite, index) => disableIndexes.includes(index));
    playerHand.disableCards(disableSprites);
    that.addAction(this.commandCreatePlayerHand.bind(this), playerHand);
    return playerHand;
  }

  commandCreatePlayerHand(playerHand) {
    const that = this._phase;
    this._playerHand = playerHand
    that.commandAddChild(playerHand);
  }

  createLocationWindow(playerHand = this._playerHand) {
    const that = this._phase;
    const locationWindow = TextWindow.createWindowMiddleSize(0, 0);
    locationWindow.alignStartTop();
    locationWindow.alignAboveOf(playerHand);
    locationWindow.y -= 160;
    locationWindow.alignTextCenter();
    that.addAction(this.commandCreateLocationWindow.bind(this), locationWindow);
    return locationWindow;
  }

  commandCreateLocationWindow(locationWindow) {
    const that = this._phase;
    this._locationWindow = locationWindow;
    that.commandAddChild(locationWindow);
  }

  createCardNameWindow(playerHand = this._playerHand) {
    const that = this._phase;
    const cardNameWindow = TextWindow.createWindowMiddleSize(0, 0);
    cardNameWindow.alignEndTop();
    cardNameWindow.alignAboveOf(playerHand);
    cardNameWindow.y -= 160;
    that.addAction(this.commandCreateCardNameWindow.bind(this), cardNameWindow);
    return cardNameWindow;
  }

  commandCreateCardNameWindow(cardNameWindow) {
    const that = this._phase;
    this._cardNameWindow = cardNameWindow;
    that.commandAddChild(cardNameWindow);
  }

  createCardDescriptionWindow(playerHand = this._playerHand) {
    const that = this._phase;
    const cardDescriptionWindow = TextWindow.createWindowMiddleSize(0, 0);
    cardDescriptionWindow.alignStartBottom();
    cardDescriptionWindow.alignBelowOf(playerHand);
    cardDescriptionWindow.y += 100;
    that.addAction(this.commandCreateCardDescriptionWindow.bind(this), cardDescriptionWindow);
    return cardDescriptionWindow;
  }

  commandCreateCardDescriptionWindow(cardDescriptionWindow) {
    const that = this._phase;
    this._cardDescriptionWindow = cardDescriptionWindow;
    that.commandAddChild(cardDescriptionWindow);
  }

  createCardPropsWindow(playerHand = this._playerHand) {
    const that = this._phase;
    const cardPropsWindow = TextWindow.createWindowMiddleSize(0, 0);
    cardPropsWindow.alignEndBottom();
    cardPropsWindow.alignBelowOf(playerHand);
    cardPropsWindow.y += 100;
    that.addAction(this.commandCreateCardPropsWindow.bind(this), cardPropsWindow);
    return cardPropsWindow;
  }

  commandCreateCardPropsWindow(cardPropsWindow) {
    const that = this._phase;
    this._cardPropsWindow = cardPropsWindow;
    that.commandAddChild(cardPropsWindow);
  }

  openPlayerHand(onSelectHandler, onChangeCursor, onCancelHandler) {
    const that = this._phase;
    that.addActions([
      this.commandOpenPlayerHand.bind(this),
      [this.commandPlayerHandSelectMode.bind(this), onSelectHandler, onChangeCursor, onCancelHandler]
    ]);
    that.addActions([
      this.commandSetTextLocationWindow.bind(this),
      this.commandOpenLocationWindow.bind(this),
      this.commandOpenCardNameWindow.bind(this),
      this.commandOpenCardDescriptionWindow.bind(this),
      this.commandOpenCardPropsWindow.bind(this),
      that.commandOpenPlayerBoardWindow,
    ]);
  }

  commandSetTextLocationWindow() {
    this._locationWindow.refreshContent(['Player Hand']);
  }

  commandOpenLocationWindow() {
    this._locationWindow.open();
  }

  commandOpenCardNameWindow() {
    this._cardNameWindow.open();
  }

  commandOpenCardDescriptionWindow() {
    this._cardDescriptionWindow.open();
  }

  commandOpenCardPropsWindow() {
    this._cardPropsWindow.open();
  }

  commandOpenPlayerHand() {
    this._playerHand.openCards();
  }

  commandPlayerHandSelectMode(onSelectHandler, onChangeCursor, onCancelHandler) {
    const selectNumber = 1;
    this._playerHand.selectMode(selectNumber, onSelectHandler, onChangeCursor, onCancelHandler);
  }
  
  commandSetTextCardNameWindow(text) {
    this._cardNameWindow.refreshContent(text);
  }

  commandSetTextCardDescriptionWindow(text) {
    this._cardDescriptionWindow.refreshContent(text);
  }

  commandSetTextCardPropsWindow(text) {
    this._cardPropsWindow.refreshContent(text);
  }

  commandGetHandSprites(index) {
    return this._playerHand.getSprites(index);
  }

  selectPowerCard(sprites) {
    const that = this._phase;
    that.addActions([
      [this.commandSelectMovement.bind(this), sprites],
    ]);
  }

  commandSelectMovement(sprites) {
    const cardset = this._playerHand;
    cardset.addChildToEnd(sprites);
    cardset.zoomAllCards(sprites);
    cardset.zoomOutAllCards(sprites);
  }

  closePlayerHand() {
    const that = this._phase;
    that.addActions([
      this.commandCloseLocationWindow.bind(this),
      this.commandCloseCardNameWindow.bind(this),
      this.commandCloseCardDescriptionWindow.bind(this),
      this.commandCloseCardPropsWindow.bind(this),
      that.commandClosePlayerBoardWindow,
    ]);
    that.addActions([
      this.commandClosePlayerHand.bind(this)
    ]);
  }

  commandCloseLocationWindow() {
    this._locationWindow.close();
  }

  commandCloseCardNameWindow() {
    this._cardNameWindow.close();
  }

  commandCloseCardDescriptionWindow() {
    this._cardDescriptionWindow.close();
  }

  commandCloseCardPropsWindow() {
    this._cardPropsWindow.close();
  }

  commandClosePlayerHand() {
    this._playerHand.closeCards();
  }

  leavePlayerHand() {
    const that = this._phase;
    that.addAction(this.commandLeavePlayerHand.bind(this));
  }

  commandLeavePlayerHand() {
    const that = this._phase;
    that.removeChildren([
      this._locationWindow,
      this._cardNameWindow,
      this._cardDescriptionWindow,
      this._cardPropsWindow,
      this._playerHand,
      that._player.boardWindow,
    ]);
  }

  commandPlayerPassed(manager) {
    const that = this._phase;
    manager.playerPassed();
    that.playerPass();
    that.stepWainting();
    if (manager.isChallengedPassed() === false) that.setStep(GameConst.CHALLENGE_TURN_PHASE);
  }

  updateStepPowerfieldLoadPhase(manager) {
    const that = this._phase;
    // console.log(manager, manager.isEndPlays(), manager.getPowerfieldLength());
    if (manager.isEndPlays() && manager.getPowerfieldLength()) {
      const { card: powerCard } = manager.getPowerfieldLastCardSlot();
      const cardIndex = manager.getPowerfieldLength() - 1;
      const sprite = that.commandGetPowerfieldSprites(cardIndex);
      that.animateCastPowerCard(sprite, cardIndex);
      that.runPowerCard(manager, powerCard);
      that.setStep(GameConst.ACTIVE_POWER_CARD);
      manager.removePowerfieldLastCardSlot();
    }
  }

  updateStepEnd(manager) {
    const that = this._phase;
    const isNotFinished = that.isCurrentStep(GameConst.END_PHASE) === false;
    if (manager.isEndPlays() && isNotFinished) {
      that.addWait();
      that.closeGameBoards();
      that.leaveGameBoards();
      that.addAction(manager.endPhase.bind(this));
      that.stepEnd();
    }
  }

  activePowerCard(cardIndexHand, manager, player) {
    this._phase.changeStatus(ActivePowerCardPhaseStatus, cardIndexHand, manager, player);
  }

  runPowerCard(manager, powerCard) {
    this._phase.changeStatus(RunPowerCardPhaseStatus, manager, powerCard);
  }

  waitStatus() {
    return false;
  }

  isPlayerHandVisible() {
    return this._playerHand.visible;
  }

  isTextWindowVisible() {
    return this._textWindow.visible;
  }

  isAskWindowVisible() {
    return this._askWindow.visible;
  }

  isLocationWindowVisible() {
    return this._locationWindow.visible;
  }

  isCardNameWindowVisible() {
    return this._cardNameWindow.visible;
  }

  isCardDescriptionWindowVisible() {
    return this._cardDescriptionWindow.visible;
  }

  isCardPropsWindowVisible() {
    return this._cardPropsWindow.visible;
  }
}

class Phase {
  _scene = {};
  _status = null;
  _actionsQueue = [];
  _step = 'START';
  _wait = 0;
  _titleWindow = {};
  _descriptionWindow = {};
  _player = {
    boardWindow: {},
    battleWindow: {},
    trashWindow: {},
    scoreWindow: {},
    battlefield: {},
  };
  _challenge = {
    boardWindow: {},
    battleWindow: {},
    trashWindow: {},
    scoreWindow: {},
    battlefield: {},
  };

  constructor(scene) {
    if ((scene instanceof Scene_Message) === false) {
      throw new Error('Scene must be an instance of Scene_Message');
    }
    this._scene = scene;
  }

  changeStatus(status, ...params) {
    this._status = new status(this, ...params);
  }

  update() {
    if (this._wait > 0) return this._wait--;
    if (this.hasActions() && this.isAvailable()) this.executeAction();
  }

  hasActions() {
    return this._actionsQueue.length > 0;
  }

  isAvailable() {
    return this.isBusy() === false;
  }

  isBusy() {
    const children = [
      this._titleWindow,
      this._descriptionWindow,
      this._player.boardWindow,
      this._player.battleWindow,
      this._player.trashWindow,
      this._player.scoreWindow,
      this._player.battlefield,
      this._challenge.boardWindow,
      this._challenge.battleWindow,
      this._challenge.trashWindow,
      this._challenge.scoreWindow,
      this._challenge.battlefield,
    ];
    return this._wait > 0 || children.some(obj => (obj.isBusy ? obj.isBusy() : false)) || this.someChildrenIsBusy();
  }

  someChildrenIsBusy() {
    if (!this._scene.children || this._scene.children.length === 0) return false;
    return this._scene.children.some(sprite => {
      return (sprite instanceof CardsetSprite) && (sprite.hasCommands() || sprite.isBusy());
    });
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

  setStep(step) {
    this.addAction(this.commandChangeStep, step);
    this.stepWainting();
  }

  commandChangeStep(step) {
    this._step = step;
  }

  addWait(seconds = 0.6) {
    this.addAction(this.commandWait, seconds);
  }

  commandWait(seconds) {
    this._wait = seconds * GameConst.FPS;
  }

  stepStart() {
    this._step = GameConst.START_PHASE;
    this.commandWait(0.5);
  }

  stepWainting() {
    this._step = GameConst.WAITING_PHASE;
    this.commandWait(0.5);
  }

  stepEnd() {
    this._step = GameConst.END_PHASE;
    this.commandWait(0.5);
  }

  isCurrentStep(step) {
    return this._step === step;
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
    actions = actions.map((fn, ...params) => {
      if (Array.isArray(fn)) return this.createAction(fn[0], ...fn.slice(1));
      return this.createAction(fn)
    });
    this._actionsQueue.push(actions);
  }

  toArray(items = []) {
    return (Array.isArray(items) === false) ? [items] : items;
  }

  addChildren(children) {
    children.forEach(child => this.addChild(child));
  }

  addChild(child) {
    this.addAction(this.commandAddChild, child);
  }

  commandAddChild(child) {
    if (child instanceof Window_Base) {
      this._scene.addWindow(child);
    } else {
      this._scene.addChild(child);
    }
  }

  removeChildren(children) {
    children.forEach(child => this.removeChild(child));
  }

  removeChild(child) {
    this.addAction(this.commandRemoveChild, child);
  }

  commandRemoveChild(child) {
    if (child instanceof Window_Base) {
      this._scene.addWindow(child);
    } else {
      this._scene.removeChild(child);
    }
  }

  createTitleWindow(text) {
    const title = TextWindow.setTextColor(text, GameColors.ORANGE);
    const titleWindow = TextWindow.createWindowFullSize(0, 0, [title]);
    titleWindow.alignBelowOf({ y: 200, height: 0 });
    titleWindow.alignTextCenter();
    this.addAction(this.commandCreateTitleWindow, titleWindow);
    return titleWindow;
  }

  commandCreateTitleWindow(titleWindow) {
    this._titleWindow = titleWindow;
    this.commandAddChild(titleWindow);
  }

  createDescriptionWindow(...texts) {
    const maxSize = 3;
    const heightLines = Array(maxSize).fill('\n');
    const content = [...texts, ...heightLines];
    const maxContent = content.slice(0, maxSize);
    const descriptionWindow = TextWindow.createWindowFullSize(0, 0, maxContent);
    descriptionWindow.alignCenterBelowMiddle();
    this.addAction(this.commandCreateDescriptionWindow, descriptionWindow);
    return descriptionWindow;
  }

  commandCreateDescriptionWindow(descriptionWindow) {
    this._descriptionWindow = descriptionWindow;
    this.commandAddChild(descriptionWindow);
  }

  openTextWindows() {
    this.addActions([
      this.commandOpenTitleWindow,
      this.commandOpenDescriptionWindow,
    ]);
  }

  commandOpenTitleWindow() {
    this._titleWindow.open();
  }

  commandOpenDescriptionWindow() {
    this._descriptionWindow.open();
  }

  commandCloseTextWindows() {
    this.commandCloseTitleWindow();
    this.commandCloseDescriptionWindow();
  }

  commandCloseTitleWindow() {
    this._titleWindow.close();
  } 

  commandCloseDescriptionWindow() {
    this._descriptionWindow.close();
  }

  leaveTextWindows() {
    this.addAction(this.commandLeaveTextWindows);
  }

  commandLeaveTextWindows() {
    this.removeChildren([
      this._titleWindow,
      this._descriptionWindow,
    ]);
  }

  getTitleWindow() {
    return this._titleWindow;
  }

  getDescriptionWindow() {
    return this._descriptionWindow;
  }

  createPlayerBoardWindow(energies, cardsInDeck, cardsInHand, passed = false) {
    const boardWindow = BoardWindow.create(0, 0);
    boardWindow.changeBlueColor();
    boardWindow.alignStartBottom();
    const points = [...energies, cardsInDeck, cardsInHand];
    boardWindow.refreshPoints(...points);
    if (passed) boardWindow.pass();
    this.addAction(this.commandCreatePlayerBoardWindow, boardWindow);
    return boardWindow;
  }

  commandCreatePlayerBoardWindow(boardWindow) {
    this._player.boardWindow = boardWindow;
    this.commandAddChild(boardWindow);
  }

  createPlayerBattleWindow(height = this._player.boardWindow.height) {
    const battleWindow = BattlePointsWindow.create(0, 0);
    battleWindow.changeBlueColor();
    battleWindow.alignStartBottom();
    const y = ScreenHelper.getBottomPosition(height);
    battleWindow.alignAboveOf({ y, height });
    battleWindow.refresh();
    this.addAction(this.commandCreatePlayerBattleWindow, battleWindow);
    return battleWindow;
  }

  commandCreatePlayerBattleWindow(battleWindow) {
    this._player.battleWindow = battleWindow;
    this.commandAddChild(this._player.battleWindow);
  }

  createPlayerTrashWindow(cardsInTrash) {
    const trashWindow = TrashWindow.create(0, 0);
    trashWindow.changeBlueColor();
    trashWindow.alignEndBelowMiddle();
    trashWindow.refreshPoints(cardsInTrash);
    this.addAction(this.commandCreatePlayerTrashWindow, trashWindow);
    return trashWindow;
  }

  commandCreatePlayerTrashWindow(trashWindow) {
    this._player.trashWindow = trashWindow;
    this.commandAddChild(trashWindow);
  }

  createPlayerScoreWindow(victories, height = this._player.boardWindow.height) {
    const scoreWindow = ScoreWindow.create(0, 0);
    scoreWindow.changeBlueColor();
    scoreWindow.alignEndBottom();
    const y = ScreenHelper.getBottomPosition(height);

    scoreWindow.alignAboveOf({ y, height });
    scoreWindow.refreshScore(victories);
    this.addAction(this.commandCreatePlayerScoreWindow, scoreWindow);
    return scoreWindow;
  }

  commandCreatePlayerScoreWindow(scoreWindow) {
    this._player.scoreWindow = scoreWindow;
    this.commandAddChild(scoreWindow);
  }

  createPlayerBattlefield() {
    const paddingLeft = this.getPaddingLeftBattleField();
    const battlefield = CardsetSprite.create(paddingLeft, 0);
    const height = 120;
    const y = ScreenHelper.getBottomPosition(height);
    battlefield.alignAboveOf({ y, height });
    this.addAction(this.commandCreatePlayerBattlefield, battlefield);
    return battlefield;
  }

  commandCreatePlayerBattlefield(battlefield) {
    this._player.battlefield = battlefield;
    this.commandAddChild(battlefield);
  }

  getPaddingLeftBattleField() {
    const fieldWidth = ScreenHelper.getFieldWidth();
    const battlefieldWidth = CardsetSprite.contentOriginalWidth();
    const paddingLeft = (fieldWidth - battlefieldWidth) / 2;
    return paddingLeft;
  }

  createChallengeBoardWindow(energies, cardsInDeck, cardsInHand, passed = false) {
    const boardWindow = BoardWindow.create(0, 0);
    boardWindow.changeRedColor();
    boardWindow.alignStartTop();
    const points = [...energies, cardsInDeck, cardsInHand];
    boardWindow.refreshPoints(...points);
    if (passed) boardWindow.pass();
    this.addAction(this.commandCreateChallengeBoardWindow, boardWindow);
    return boardWindow;
  }

  commandCreateChallengeBoardWindow(boardWindow) {
    this._challenge.boardWindow = boardWindow;
    this.commandAddChild(boardWindow);
  }

  createChallengeBattleWindow(height = this._challenge.boardWindow.height) {
    const battleWindow = BattlePointsWindow.create(0, 0);
    battleWindow.changeRedColor();
    battleWindow.alignStartTop();
    const y = ScreenHelper.getTopPosition();
    battleWindow.alignBelowOf({ y, height });
    battleWindow.refresh();
    this.addAction(this.commandCreateChallengeBattleWindow, battleWindow);
    return battleWindow;
  }

  commandCreateChallengeBattleWindow(battleWindow) {
    this._challenge.battleWindow = battleWindow;
    this.commandAddChild(battleWindow);
  }

  createChallengeTrashWindow(cardsInTrash) {
    const trashWindow = TrashWindow.create(0, 0);
    trashWindow.changeRedColor();
    trashWindow.alignEndAboveMiddle();
    trashWindow.reverseIcons();
    trashWindow.refreshPoints(cardsInTrash);
    this.addAction(this.commandCreateChallengeTrashWindow, trashWindow);
    return trashWindow;
  }

  commandCreateChallengeTrashWindow(trashWindow) {
    this._challenge.trashWindow = trashWindow;
    this.commandAddChild(trashWindow);
  }

  createChallengeScoreWindow(victories, height = this._challenge.boardWindow.height) {
    const scoreWindow = ScoreWindow.create(0, 0);
    scoreWindow.changeRedColor();
    scoreWindow.alignEndTop();
    const y = ScreenHelper.getTopPosition();
    scoreWindow.alignBelowOf({ y, height });
    scoreWindow.refreshScore(victories);
    this.addAction(this.commandCreateChallengeScoreWindow, scoreWindow);
    return scoreWindow;
  }

  commandCreateChallengeScoreWindow(scoreWindow) {
    this._challenge.scoreWindow = scoreWindow;
    this.commandAddChild(scoreWindow);
  }

  createChallengeBattlefield() {
    const paddingLeft = this.getPaddingLeftBattleField();
    const battlefield = CardsetSprite.create(paddingLeft, 0);
    const height = 128;
    const y = ScreenHelper.getTopPosition();
    battlefield.alignBelowOf({ y, height });
    this.addAction(this.commandCreateChallengeBattlefield, battlefield);
    return battlefield;
  }

  commandCreateChallengeBattlefield(battlefield) {
    this._challenge.battlefield = battlefield;
    this.commandAddChild(battlefield);
  }

  openGameBoards() {
    this.addActions([
      this.commandOpenPlayerGameBoard,
      this.commandOpenChallengeGameBoard,
    ]);
  }

  commandOpenPlayerGameBoard() {
    this.commandOpenPlayerBoardWindow();
    this.commandOpenPlayerBattleWindow();
    this.commandOpenPlayerTrashWindow();
    this.commandOpenPlayerScoreWindow();
    this.commandOpenPlayerBattlefield();
  }

  commandOpenPlayerBoardWindow() {
    this._player.boardWindow.open();
  }

  commandOpenPlayerBattleWindow() {
    this._player.battleWindow.open();
  }

  commandOpenPlayerTrashWindow() {
    this._player.trashWindow.open();
  }

  commandOpenPlayerScoreWindow() {
    this._player.scoreWindow.open();
  }

  commandOpenPlayerBattlefield() {
    this._player.battlefield.openCards();
  }
  
  commandOpenChallengeGameBoard() {
    this.commandOpenChallengeBoardWindow();
    this.commandOpenChallengeBattleWindow();
    this.commandOpenChallengeTrashWindow();
    this.commandOpenChallengeScoreWindow();
    this.commandOpenChallengeBattlefield();
  }

  commandOpenChallengeBoardWindow() {
    this._challenge.boardWindow.open();
  }

  commandOpenChallengeBattleWindow() {
    this._challenge.battleWindow.open();
  }

  commandOpenChallengeTrashWindow() {
    this._challenge.trashWindow.open();
  }

  commandOpenChallengeScoreWindow() {
    this._challenge.scoreWindow.open();
  }

  commandOpenChallengeBattlefield() {
    this._challenge.battlefield.openCards();
  }

  closeGameBoards() {
    this.addActions([
      this.closePlayerGameBoard,
      this.closeChallengeGameBoard
    ]);
  }

  closePlayerGameBoard() {
    this.commandClosePlayerBoardWindow();
    this.commandClosePlayerBattleWindow();
    this.commandClosePlayerTrashWindow();
    this.commandClosePlayerScoreWindow();
    this.commandClosePlayerBattlefield();
  }

  commandClosePlayerBoardWindow() {
    this._player.boardWindow.close();
  }

  commandClosePlayerBattleWindow() {
    this._player.battleWindow.close();
  }

  commandClosePlayerTrashWindow() {
    this._player.trashWindow.close();
  }

  commandClosePlayerScoreWindow() {
    this._player.scoreWindow.close();
  }

  commandClosePlayerBattlefield() {
    this._player.battlefield.closeCards();
  }

  closeChallengeGameBoard() {
    this.commandCloseChallengeBoardWindow();
    this.commandCloseChallengeBattleWindow();
    this.commandCloseChallengeTrashWindow();
    this.commandCloseChallengeScoreWindow();
    this.commandCloseChallengeBattlefield();
  }

  commandCloseChallengeBoardWindow() {
    this._challenge.boardWindow.close();
  }

  commandCloseChallengeBattleWindow() {
    this._challenge.battleWindow.close();
  }

  commandCloseChallengeTrashWindow() {
    this._challenge.trashWindow.close();
  }

  commandCloseChallengeScoreWindow() {
    this._challenge.scoreWindow.close();
  }

  commandCloseChallengeBattlefield() {
    this._challenge.battlefield.closeCards();
  }

  playerPass() {
    this.addAction(this.commandPlayerPass);
  }

  commandPlayerPass() {
    this._player.boardWindow.pass();
  }

  challengePass() {
    this.addAction(this.commandChallengePass);
  }

  commandChallengePass() {
    this._challenge.boardWindow.pass();
  }

  leaveGameBoards() {
    this.addAction(this.commandLeaveGameBoards);
  }

  commandLeaveGameBoards() {
    this.removeChildren([
      this._player.boardWindow,
      this._player.battleWindow,
      this._player.trashWindow,
      this._player.scoreWindow,
      this._player.battlefield,
      this._challenge.boardWindow,
      this._challenge.battleWindow,
      this._challenge.trashWindow,
      this._challenge.scoreWindow,
      this._challenge.battlefield,
    ]);
  }

  getPlayerBoardWindow() {
    return this._player.boardWindow;
  }

  getPlayerBattleWindow() {
    return this._player.battleWindow;
  }

  getPlayerTrashWindow() {
    return this._player.trashWindow;
  }

  getPlayerScoreWindow() {
    return this._player.scoreWindow;
  }

  getPlayerBattlefield() {
    return this._player.battlefield;
  }

  getChallengeBoardWindow() {
    return this._challenge.boardWindow;
  }

  getChallengeBattleWindow() {
    return this._challenge.battleWindow;
  }

  getChallengeTrashWindow() {
    return this._challenge.trashWindow;
  }

  getChallengeScoreWindow() {
    return this._challenge.scoreWindow;
  }

  getChallengeBattlefield() {
    return this._challenge.battlefield;
  }

  isTitleWindowVisible() {
    return this._titleWindow.visible;
  }

  isDescriptionWindowVisible() {
    return this._descriptionWindow.visible;
  }

  isPlayerBoardWindowVisible() {
    return this._player.boardWindow.visible;
  }

  isChallengeBoardWindowVisible() {
    return this._challenge.boardWindow.visible;
  }

  isPlayerBattleWindowVisible() {
    return this._player.battleWindow.visible;
  }

  isChallengeBattleWindowVisible() {
    return this._challenge.battleWindow.visible;
  }

  isPlayerTrashWindowVisible() {
    return this._player.trashWindow.visible;
  }

  isChallengeTrashWindowVisible() {
    return this._challenge.trashWindow.visible;
  }

  isPlayerScoreWindowVisible() {
    return this._player.scoreWindow.visible;
  }

  isChallengeScoreWindowVisible() {
    return this._challenge.scoreWindow.visible;
  }

  isPlayerBattlefieldVisible() {
    return this._player.battlefield.visible;
  }

  isChallengeBattlefieldVisible() {
    return this._challenge.battlefield.visible;
  }
}
class ChallengePhase extends Phase {
  _folderWindow = {};

  createFolderWindow(text, folders) {
    const energies = folders.map(folder => FolderWindow.createEnergies(...folder.energies));
    const commands = folders.map((folder, index) => {
      return FolderWindow.createCommand(folder.name, `FOLDER_${index}`, folder.handler, energies[index])
    });
    const title = CommandWindow.setTextColor(text, GameColors.ORANGE);
    const folderWindow = FolderWindow.create(0, 0, [title], commands);
    folderWindow.alignMiddle();
    folderWindow.alignTextCenter();
    this.addAction(this.commandCreateFolderWindow, folderWindow);
    return folderWindow;
  }

  commandCreateFolderWindow(folderWindow) {
    this._folderWindow = folderWindow
    this.commandAddChild(folderWindow);
  }

  getFolderWindow() {
    return this._folderWindow;
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

  leaveFolderWindow() {
    this.addAction(this.commandLeaveFolderWindow);
  }

  commandLeaveFolderWindow() {
    this.removeChild(this._folderWindow);
  }

  start(manager) {
    const title = 'Challenge Phase';
    const description = manager.getChallengeDescription();
    this.createTitleWindow(title);
    this.createDescriptionWindow(description);
    this.openTextWindows();
    this.setStep(GameConst.START_PHASE);
  }

  update(manager) {
    super.update();
    if (this.isBusy()) return false;
    this.updateStepStart(manager);
    this.updateStepEnd(manager);
  }

  updateStepStart(manager) {
    if (this.isCurrentStep(GameConst.START_PHASE) && Input.isTriggered('ok')) {
      this.commandCloseTextWindows();
      this.leaveTextWindows();
      const selectHandler = (folderIndex) => {
        manager.setPlayerFolderIndex(folderIndex);
        this.commandCloseFolderWindow();
        this.leaveFolderWindow();
        this.setStep(GameConst.END_SELECT_FOLDER);
      };
      let folders = manager.getPlayerFolders();
      folders = folders.map(folder => {
        folder.handler = selectHandler;
        return folder;
      });
      const folderWindow = this.createFolderWindow('Choose a folder', folders);
      this.addWait();
      this.openFolderWindow();
      this.setStep(GameConst.START_SELECT_FOLDER);
    }
  }

  updateStepEnd(manager) {
    if (this.isCurrentStep(GameConst.END_SELECT_FOLDER)) {
      this.addAction(manager.endPhase);
    }
  }

  isBusy() {
    const children = [
      this._folderWindow
    ];
    return super.isBusy() || children.some(obj => (obj.isBusy ? obj.isBusy() : false));
  }

  isFolderWindowVisible() {
    return this._folderWindow.visible;
  }
}
class StartPhase extends Phase {
  _resultWindow = {};
  _cards = [];
  _drawCardGame = {};

  createDrawCardGame() {
    const drawCardGame = CardsetSprite.create(0, 0);
    drawCardGame.centralize();
    drawCardGame.commandShow();
    const cards = this.createCardsShuffled();
    const sprites = drawCardGame.setCards(cards, Graphics.boxWidth, Graphics.boxHeight);
    const xSprite1 = -(drawCardGame.x + CardSprite.contentOriginalWidth());
    const ySprite1 = -(drawCardGame.y + CardSprite.contentOriginalHeight());
    const position1 = CardSprite.createPosition(xSprite1, ySprite1, 0);
    const xSprite2 = (Graphics.boxWidth - drawCardGame.x);
    const ySprite2 = (Graphics.boxHeight - drawCardGame.y);
    const position2 = CardSprite.createPosition(xSprite2, ySprite2, 1);
    const positions = [position1, position2];
    drawCardGame.setAllCardsInPositions(sprites, positions);
    drawCardGame.setTurnToDownCards(sprites);
    this.addAction(this.commandCreateDrawCardGame, drawCardGame);
    return drawCardGame;
  }

  commandCreateDrawCardGame(drawCardGame) {
    this._drawCardGame = drawCardGame;
    this.commandAddChild(drawCardGame);
  }

  createCardsShuffled() {
    const cards = [
      {
        type: 2,
        color: GameConst.WHITE,
        figureName: 'default',
        attack: 0,
        health: 0
      },
      {
        type: 2,
        color: GameConst.BLACK,
        figureName: 'default',
        attack: 0,
        health: 0
      },
    ];
    this._cards = ArrayHelper.shuffle(cards);
    return this._cards;
  }

  startDrawCardGame(onSelectHandler) {
    this.addAction(this.commandStartDrawCardGame, onSelectHandler);
  }

  commandStartDrawCardGame(onSelectHandler) {
    this.showCards();
    this.moveAllCardsToCenter();
    const handlerDecorator = (cards) => {
      const selectedIndex = cards.shift();
      const cardColor = this._cards[selectedIndex].color;
      const win = cardColor === GameConst.WHITE;
      const resultWindow = this.createResultWindow(win);
      this.endDrawCardGame(selectedIndex);
      onSelectHandler(win, resultWindow);
    }
    this.selectMode(handlerDecorator);
  }

  showCards() {
    this.addAction(this.commandShowCards);
  }
  
  commandShowCards() {
    this._drawCardGame.showCards();
  }

  moveAllCardsToCenter() {
    this.addAction(this.commandMoveAllCardsToCenter);
  }

  commandMoveAllCardsToCenter() {
    const center = this._drawCardGame.width / 2;
    const x = center - CardSprite.contentOriginalWidth();
    const space = 2;
    const position1 = CardSprite.createPosition(x - space, 0, 0);
    const position2 = CardSprite.createPosition(center + space, 0, 1);
    const positions = [position1, position2];
    const sprites = this._drawCardGame.getSprites();
    this._drawCardGame.moveAllCardsToPositions(sprites, positions);
  }

  createResultWindow(win) {
    const text = win ? 'You go first!' : 'You go next!';
    const resultWindow = TextWindow.createWindowOneFourthSize(0, 0, [text]);
    resultWindow.alignCenterMiddle();
    resultWindow.alignBelowOf({ y: 100, height: 0 });
    resultWindow.alignTextCenter();
    this.addAction(this.commandCreateResultWindow, resultWindow);
    return resultWindow;
  }

  commandCreateResultWindow(resultWindow) {
    this._resultWindow = resultWindow;
    this.commandAddChild(resultWindow);
  }

  selectMode(onSelectHandler) {
    this.addAction(this.commandSelectMode, onSelectHandler);
  }

  commandSelectMode(onSelectHandler) {
    const selectNumber = 1;
    this._drawCardGame.selectMode(selectNumber, onSelectHandler);
  }
  
  isBusy() {
    const children = [
      this._drawCardGame,
      this._resultWindow,
    ];
    return super.isBusy() || children.some(obj => (obj.isBusy ? obj.isBusy() : false));
  }

  endDrawCardGame(selectedIndex) {
    this.addAction(this.commandEndDrawCardGame, selectedIndex);
  }

  commandEndDrawCardGame(selectedIndex) {
    const cardset = this._drawCardGame;
    const sprites = ArrayHelper.moveToStartByIndex(cardset.getSprites(), selectedIndex);
    const selectedSprite = sprites[0];
    const startIndex = 0;
    cardset.removeChild(sprites[1]);
    cardset.addChildAt(sprites[1], startIndex);
    cardset.zoomAllCards(selectedSprite);
    cardset.zoomOutAllCards(selectedSprite);
    cardset.addWait();
    cardset.flipTurnToUpCards(sprites);
  }

  openResultWindow() {
    this.addAction(this.commandOpenResultWindow);
  }

  commandOpenResultWindow() {
    this._resultWindow.open();
  }

  closeDrawCardGame() {
    this.addActions([
      this.commandCloseResultWindow,
      this.commandCloseDrawCardGame,
    ]);
  }
  
  commandCloseResultWindow() {
    this._resultWindow.close();
  }

  commandCloseDrawCardGame() {
    this._drawCardGame.closeAllCards();
  }

  leaveDrawCardGame() {
    this.addActions([
      this.commandLeaveDrawCardGame,
      this.commandLeaveResultWindow,
    ]);
  }

  commandLeaveDrawCardGame() {
    this.removeChild(this._drawCardGame);
  }

  commandLeaveResultWindow() {
    this.removeChild(this._resultWindow);
  }

  getResultWindow() {
    return this._resultWindow;
  }

  getDrawCardGameCardset() {
    return this._drawCardGame;
  }

  start(manager) {
    const title = 'Start Phase';
    const description = 'Draw Calumon to go first.';
    this.createTitleWindow(title);
    this.createDescriptionWindow(description);
    this.openTextWindows();
    this.setStep(GameConst.START_PHASE);
  }
  
  update(manager) {
    super.update();
    if (this.isBusy()) return false;
    this.updateStepStart(manager);
    this.updateStepEnd(manager);
  }

  updateStepStart(manager) {
    if (this.isCurrentStep(GameConst.START_PHASE) && Input.isTriggered('ok')) {
      this.commandCloseTextWindows();
      this.leaveTextWindows();
      const resultHandler = (win, resultWindow) => {
        manager.win = win;
        this.openResultWindow();
        this.setStep(GameConst.END_DRAW_CARD_GAME);
      };
      const drawCardGame = this.createDrawCardGame();
      this.startDrawCardGame(resultHandler);
      this.setStep(GameConst.START_DRAW_CARD_GAME);
    }
  }

  updateStepEnd(manager) {
    if (this.isCurrentStep(GameConst.END_DRAW_CARD_GAME) && Input.isTriggered('ok')) {
      this.closeDrawCardGame();
      this.leaveDrawCardGame();
      this.addWait();
      this.addAction(manager.endPhase);
    }
  }

  isResultWindowVisible() {
    return this._resultWindow.visible
  }

  isCardsetVisible() {
    return this._drawCardGame.visible;
  }






  // createConfirmWindow(message) {
  //   // message = 'confirm the selection?'
  //   const confirmHandler = () => {
  //     this._onSelectHandler(this._selectedIndexs);
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
class DrawPhase extends Phase {
  drawCards(player, challenge) {
    const { 
      cards: playerCards,
      cardsInDeck: playerCardsInDeck, 
    } = player;
    const { 
      cards: challengeCards,
      cardsInDeck: challengeCardsInDeck, 
    } = challenge;
    this.addActions([
      [this.commandDrawPlayerCards, playerCards, playerCardsInDeck],
      [this.commandDrawChallengeCards, challengeCards, challengeCardsInDeck],
    ]);
  }
  
  commandDrawPlayerCards(cards, cardsInDeck) {
    this._player.battlefield.show();
    const screenWidth = ScreenHelper.getFullWidth();
    const sprites = this._player.battlefield.setCards(cards, screenWidth);
    this._player.battlefield.showCards(sprites);
    this._player.battlefield.setTurnToDownCards(sprites);
    const fieldUpdates = sprites.map((sprite, index) => {
      const count = index + 1;
      const countCardsInDeck = cardsInDeck - count;
      const updateDeckPoints = BoardWindow.createValueUpdate(GameConst.CARDS_IN_DECK, countCardsInDeck);
      const updateHandPoints = BoardWindow.createValueUpdate(GameConst.CARDS_IN_HAND, count);
      const manyUpdates = [
        updateDeckPoints,
        updateHandPoints
      ];
      const boardWindow = this.getPlayerBoardWindow();
      boardWindow.updateValues(manyUpdates);
    });
    this._player.battlefield.moveCardsInlist(sprites, 6, fieldUpdates);
    this._player.battlefield.flipTurnToUpCards(sprites);
  }

  commandDrawChallengeCards(cards, cardsInDeck) {
    this._challenge.battlefield.show();
    const screenWidth = ScreenHelper.getFullWidth();
    const sprites = this._challenge.battlefield.setCards(cards, screenWidth);
    this._challenge.battlefield.showCards(sprites);
    this._challenge.battlefield.setTurnToDownCards(sprites);
    const fieldUpdates = sprites.map((sprite, index) => {
      const count = index + 1;
      const countCardsInDeck = cardsInDeck - count;
      const updateDeckPoints = BoardWindow.createValueUpdate(GameConst.CARDS_IN_DECK, countCardsInDeck);
      const updateHandPoints = BoardWindow.createValueUpdate(GameConst.CARDS_IN_HAND, count);
      const manyUpdates = [
        updateDeckPoints,
        updateHandPoints
      ];
      const boardWindow = this.getChallengeBoardWindow();
      boardWindow.updateValues(manyUpdates);
    });
    this._challenge.battlefield.moveCardsInlist(sprites, 6, fieldUpdates);
  }

  updateGameBoards(playerUpdates, challengeUpdates) {
    const updates = playerUpdates.map((playerUpdate, index) => {
      const challengeUpdate = challengeUpdates[index] || false;
      return [playerUpdate, challengeUpdate];
    });
    updates.forEach(([playerUpdate, challengeUpdate]) => {
      const { cardIndex: playerCardIndex, updatePoint: playerUpdatePoint } = playerUpdate;
      const { cardIndex: chanllengeCardIndex, updatePoint: challengeUpdatePoint } = challengeUpdate;
      this.addActions([
        [this.commandPlayerLoadEnergy, playerCardIndex, playerUpdatePoint],
        [this.commandChallengeLoadEnergy, chanllengeCardIndex, challengeUpdatePoint],
      ]);
    });
  }

  commandPlayerLoadEnergy(cardIndex, updatePoint) {
    const sprites = this._player.battlefield.getSprites();
    const sprite = sprites[cardIndex];
    if (updatePoint) {
      const chainAction = () => {
        const boardWindow = this.getPlayerBoardWindow();
        boardWindow.updateValues(updatePoint);
      };
      this._player.battlefield.flashCardsAnimate(sprite, 'white', 6, 1, chainAction);
    }
  }

  commandChallengeLoadEnergy(cardIndex, updatePoint) {
    const sprites = this._challenge.battlefield.getSprites();
    const sprite = sprites[cardIndex];
    if (updatePoint) {
      const chainAction = () => {
        const boardWindow = this.getChallengeBoardWindow();
        boardWindow.updateValues(updatePoint);
      };
      this._challenge.battlefield.flashCardsAnimate(sprite, 'white', 6, 1, chainAction);
    }
  }

  start(manager) {
    const title = 'Draw Phase';
    const description = '6 cards will be drawn.';
    this.createTitleWindow(title);
    this.createDescriptionWindow(description);
    this.openTextWindows();
    this.setStep(GameConst.START_PHASE);
  }

  update(manager) {
    super.update();
    if (this.isBusy()) return false;
    this.updateStepStart(manager);
    this.updateStepEnd(manager);
  }

  updateStepStart(manager) {
    if (this.isCurrentStep(GameConst.START_PHASE) && Input.isTriggered('ok')) {
      this.commandCloseTextWindows();
      this.leaveTextWindows();
      this.createPlayerGameBoard(manager);
      this.createChallengeGameBoard(manager);
      this.openGameBoards();
      this.drawCardsToGame(manager);
      this.updateGameBoardsToGame(manager);
      this.setStep(GameConst.START_DRAW_CARDS);
    }
  }

  updateStepEnd(manager) {
    if (this.isCurrentStep(GameConst.START_DRAW_CARDS) && Input.isTriggered('ok')) {
      this.closeGameBoards();
      this.leaveGameBoards();
      this.addAction(manager.endPhase);
    }
  }

  createPlayerGameBoard(manager) {
    const energies = Object.values(manager.getPlayerEnergies());
    const cardsInDeck = manager.getPlayerDeckLength();
    const cardsInHand = manager.getPlayerHandLength();
    const cardsInTrash = manager.getPlayerTrashLength();
    const victories = manager.getPlayerVictories();
    const passed = manager.isPlayerPassed();
    const boardWindow = this.createPlayerBoardWindow(energies, cardsInDeck, cardsInHand, passed);
    const boardWindowHeight = boardWindow.height;
    const battleWindow = this.createPlayerBattleWindow(boardWindowHeight);
    const trashWindow = this.createPlayerTrashWindow(cardsInTrash);
    const scoreWindow = this.createPlayerScoreWindow(victories, boardWindowHeight);
    const battlefield = this.createPlayerBattlefield();
  }

  createChallengeGameBoard(manager) {
    const energies = Object.values(manager.getChallengeEnergies());
    const cardsInDeck = manager.getChallengeDeckLength();
    const cardsInHand = manager.getChallengeHandLength();
    const cardsInTrash = manager.getChallengeTrashLength();
    const victories = manager.getChallengeVictories();
    const passed = manager.isChallengePassed();
    const boardWindow = this.createChallengeBoardWindow(energies, cardsInDeck, cardsInHand, passed);
    const boardWindowHeight = boardWindow.height;
    const battleWindow = this.createChallengeBattleWindow(boardWindowHeight);
    const trashWindow = this.createChallengeTrashWindow(cardsInTrash);
    const scoreWindow = this.createChallengeScoreWindow(victories, boardWindowHeight);
    const battlefield = this.createChallengeBattlefield();
  }

  drawCardsToGame(manager) {
    const playerNumCardsInDeck = manager.getPlayerDeckLength();
    const playerCardsDrawed = manager.getPlayerDeck().splice(0, 6);
    manager.setPlayerHand(playerCardsDrawed);
    const playerData = {
      cards: playerCardsDrawed,
      cardsInDeck: playerNumCardsInDeck,
    };
    const challengeNumCardsInDeck = manager.getChallengeDeckLength();
    const challengeCardsDrawed = manager.getChallengeDeck().splice(0, 6);
    manager.setChallengeHand(challengeCardsDrawed);
    const challengeData = {
      cards: challengeCardsDrawed,
      cardsInDeck: challengeNumCardsInDeck,
    };
    this.drawCards(playerData, challengeData);
  }

  updateGameBoardsToGame(manager) {
    const playerCardsInHand = manager.getPlayerHand();
    const playerEnergiesClone = Object.assign({}, manager.getPlayerEnergies());
    const playerUpdates = this.createFieldUpdates(playerCardsInHand, playerEnergiesClone);
    const playerFieldUpdates = playerUpdates.fieldUpdates;
    manager.setPlayerEnergies(playerUpdates.energies);
    const challengeCardsInHand = manager.getChallengeHand();
    const challengeEnergiesClone = Object.assign({}, manager.getChallengeEnergies());
    const challengeUpdates = this.createFieldUpdates(challengeCardsInHand, challengeEnergiesClone);
    const challengeFieldUpdates = challengeUpdates.fieldUpdates;
    manager.setChallengeEnergies(challengeUpdates.energies);
    this.updateGameBoards(playerFieldUpdates, challengeFieldUpdates);
  }

  createFieldUpdates(cards, energies) {
    const fieldUpdates = cards.map((card, cardIndex) => {
      const { color } = card;
      if (color === GameConst.BROWN) return false;
      energies[color] += 1;
      const points = energies[color];
      const updatePoint = BoardWindow.createValueUpdate(color, points);
      return { cardIndex, updatePoint };
    });
    return { fieldUpdates, energies };
  }
}

class LoadPhase extends Phase {
  _powerfield = {};

  start(manager) {
    this.changeStatus(WaitingPhaseStatus);

    // const title = 'Load Phase';
    // const description = 'Select and use a Program Card.';
    // this.createTitleWindow(title);
    // this.createDescriptionWindow(description);
    // this.openTextWindows();
    // this.setStep(GameConst.START_PHASE);
  }

  update(manager) {
    super.update();
    if (this.isBusy()) return false;
    this._status.update(manager);

    // super.update();
    // if (this.isBusy()) return false;
    // this.updateStepStart(manager);
    // this.updateStepBeginLoadPhase(manager);
    // this.updateStatus(manager);
    // this.updateStartPlay(manager);
    // this.updateStepChallengeLoadPhase(manager);
    // this.updateStepPlayerLoadPhase(manager);
    // this.updateStepPowerfieldLoadPhase(manager);
    // if (manager.isEndPlays() && manager.getPowerfieldLength()) return; 
    // this.updateStepEnd(manager);
  }

  createPowerfield(cards) {
    const x = ScreenHelper.getCenterPosition(CardsetSprite.contentOriginalWidth());
    const y = ScreenHelper.getMiddlePosition(CardsetSprite.contentOriginalHeight());
    const powerfield = CardsetSprite.create(x, y);
    powerfield.show();
    const xCard = CardsetSprite.contentOriginalWidth() - CardSprite.contentOriginalWidth();
    const sprites = powerfield.setCards(cards, xCard);
    powerfield.startClosedCards(sprites);
    this.addAction(this.commandCreatePowerfield, powerfield);
    return powerfield;
  }

  commandCreatePowerfield(powerfield) {
    this._powerfield = powerfield;
    this.commandAddChild(powerfield);
  }

  openPowerfield() {
    this.addAction(this.commandOpenPowerfield);
  }

  commandOpenPowerfield() {
    this._powerfield.openCards();
  }

  closePowerCard() {
    this.addAction(this.commandClosePowerCard);
  }

  commandClosePowerCard() {
    this._powerfield.closeCards();
  }

  leavePowerCard() {
    this.addAction(this.commandLeavePowerCard);
  }

  commandLeavePowerCard() {
    this.removeChild(this._powerfield);
  }

  moveCardToPowerfield(sprites, number, player) {
    this.addAction(this.commandMoveCardToPowerfield, sprites, number, player);
  }

  commandMoveCardToPowerfield(sprites, number, player) {
    this._powerfield.moveAllCardsInlist(sprites);
    this._powerfield.flashCardsAnimate(sprites, 'white');
    this._powerfield.setNumberColor(number, (player === GameConst.PLAYER_1) ? GameColors.BLUE : GameColors.RED);
    this._powerfield.displayReverseOrdering();
    this._powerfield.closeCards(sprites);
    this._powerfield.openCards(sprites);
  }

  commandGetPowerfieldSprites(index) {
    return this._powerfield.getSprites(index);
  }

  animateCastPowerCard(sprite, cardIndex) {
    // mostrar janela de titulo e descrição do card e espera
    this._powerfield.zoomAllCards(sprite);
    this._powerfield.flashCardsAnimate(sprite, 'white');
    this._powerfield.zoomOutAllCards(sprite);
    this._powerfield.leaveAllCards(sprite);
  }

  isBusy() {
    const children = [
      this._powerfield
    ];
    return super.isBusy() 
      || children.some(obj => (obj.isBusy ? obj.isBusy() : false)) 
      || (this._status ? this._status?.isBusy() : false);
  }

  waitStatus() {
    this.addAction(this.commandWaitStatus);
  }

  commandWaitStatus() {
    this._status.waitStatus();
  }

  activePowerCard(cardIndexHand, manager, player) {
    this.addAction(this.commandActivePowerCard, cardIndexHand, manager, player);
  }

  commandActivePowerCard(cardIndexHand, manager, player) {
    return this._status.activePowerCard(cardIndexHand, manager, player);
  }

  runPowerCard(manager, powerCard) {
    this.addAction(this.commandRunPowerCard, manager, powerCard);
  }

  commandRunPowerCard(manager, powerCard) {
    this._status.runPowerCard(manager, powerCard);
  }

  isPowerFieldVisible() {
    return this._powerfield.visible;
  }
}


// TESTS
class SceneTest {
  _scene = {};
  _seconds = 1;
  _timer = 0;
  _testDescription = 'You must undertake the test(s)!';
  _assertTitle = '';
  _assertValue = undefined;
  _assertsToTest = [];
  _assertsResults = [];
  _results = [];
  _childrenToAdd = [];
  _toWatched = [];
  _watched = [];
  _errors = [];
  _handler = false;
  _pressToAsserts = false;
  _isFinish = false;
  _functionsMocked = [];

  constructor(scene) {
    this._scene = scene;
  }

  create() {
    // Override this method in the child class
  }

  start() {
    // Override this method in the child class
  }

  update() {
    // Override this method in the child class
  }

  restore() {
    const fns = this._functionsMocked;
    for (const fn of fns) {
      fn.obj[fn.fnName] = fn.originalFn;
    }
  }

  mockFunction(obj, fnName, fn) {
    const originalFn = obj[fnName];
    obj[fnName] = fn;
    this._functionsMocked.push({ obj, fnName, originalFn });
  }

  run() {
    return new Promise(async res => {
      if (this._errors.length) {
        this._scene._nextTest = null;
        this._scene._phase = null;
        this.asserts();
        await this.processAsserts();
        return res(this.finishResult());
      }
      this.startTest();
      res(await this.finish());
    });
  }

  startTest() {
    this._timer = (GameConst.FPS * this._seconds);
    this.start();
    this.addChildren();
  }

  addChildren() {
    this._childrenToAdd.forEach(child => this.addChild(child));
  }

  finish() {
    return new Promise(async res => {
      const intervalId = setInterval(() => {
        if (this._isFinish) {
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
      passed = this._results.every(result => result.passed);
      assertsResult = this._results;
    }
    return { 
      testName, 
      passed, 
      assertsResult 
    };
  }

  hasResults() {
    return this._results.length > 0;
  }

  updateTest() {
    this.copyWatched();
    if (this._timer) return this._timer--;
    if (this._pressToAsserts && !Input.isTriggered('ok')) return false;
    if (this._handler) return false;
    if (!this._isFinish) {
      this.asserts();
      this.processAsserts();
      this._isFinish = true;
    }
  }

  copyWatched() {
    const watched = this._toWatched.map(w => ObjectHelper.copyObject(w));
    this._watched.push(watched);
  }

  async processAsserts() {
    return new Promise(async res => {
      await this.clear();
      for (const assert of this._assertsToTest) {
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
        this._results.push({
          passed: this._assertsResults.every(assert => assert.passed),
          assertsName: this._testDescription,
          asserts: this._assertsResults
        });
      }
      res(true);
    });
  }

  hasAsserts() {
    return this._assertsResults.length > 0;
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
      const children = this._scene.children;
      while (children.length > 1) {
        children.forEach(async child => {
          if (child === this._scene._windowLayer) return false;
          child.destroy();
          await this._scene.removeChild(child);
        });
      }
      resolve(true);
    });
  }

  clearWindows() {
    return new Promise(resolve => {
      const windowChildren = this._scene._windowLayer.children;
      while (windowChildren.length) {
        windowChildren.forEach(async window => {
          window.destroy();
          await this._scene._windowLayer.removeChild(window);
        });
      }
      resolve(true);
    });
  }

  processAssertsToBe(assert) {
    const { type, title, value, toBe } = assert;
    const test = value === toBe;
    const assertResult = this.resultTest(test, toBe, value, title);
    this._assertsResults.push(assertResult);
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
    const watched = this._watched.map((wat, index) => wat[indexOfWatched || 0]);
    const result = watched.some((watching, index) => {
      const obj = this._toWatched[indexOfWatched || 0];
      return this.assertWatched(obj, watching, fnOrValue, params);
    });
    const toBe = true;
    const test = result === toBe;
    const assertResult = this.resultTest(test, toBe, result, title);
    this._assertsResults.push(assertResult);
  }

  indexOfWatched(reference) {
    let index = this._toWatched.indexOf(reference) || 0;
    return index < 0 ? 0 : index;
  }

  assertWatched(reference, watching, fnOrValue, params) {
    if (!watching) return false;
    if (this.isFunction(fnOrValue)) {
      const fnName = fnOrValue.name;
      watching = ObjectHelper.mergeObjects(reference, watching);
      return watching[fnName](...params) === true;
    }
    return watching[fnOrValue] === true;
  }

  processThrowError(assert) {
    const { title, value, toBe } = assert;
    const test = this._errors.some(e => e.message === value.message && e.name === value.name);
    const assertResult = this.resultTest(test, toBe, value, title);
    this._assertsResults.push(assertResult);
  }

  isFunction(fnOrValue) {
    return typeof fnOrValue === 'function';
  }

  describe(description = 'You must undertake the test(s)!') {
    this._testDescription = description;
  }

  expect(title, value) {
    if (!title || value === undefined) {
      throw new Error('The expect method must have a title and a value!');
    }
    this._assertTitle = title;
    this._assertValue = value;
    return this;
  }

  toBe(valueToBe, title = this._assertTitle, valueToCompare = this._assertValue) {
    if (valueToBe === undefined) {
      throw new Error('The toBe method must have a value to compare!');
    }
    this._assertsToTest.push({
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
    this._assertTitle = title;
    this._assertValue = value;
    const toBe = true;
    this.toBe(toBe, title, value);
  }

  expectWasTrue(title, fnOrValue, reference = null, ...params) {
    if (!title || !fnOrValue) {
      throw new Error('The expectWasTrue method must have a title and a function or value!');
    }
    this._assertsToTest.push({
      type: 'assertWas',
      title,
      fnOrValue,
      reference,
      params
    });
  }

  addWatched(_watched) {
    this._toWatched.push(_watched);
    this.attachChild(_watched);
  }

  addAssistedHidden(_watched) {
    this._toWatched.push(_watched);
  }

  attachChild(child) {
    this._childrenToAdd.push(child);
  }

  addChild(child) {
    if (child instanceof Window_Base) {
      this.addWindow(child);
    } else {
      this._scene.addChild(child);
    }
  }

  addWindow(window) {
    this._scene._windowLayer.addChild(window);
  }

  pressToAsserts() {
    this._pressToAsserts = true;
  }

  createHandler() {
    this._handler = true;
    this._seconds = 0;
    return () => this._handler = false;
  }

  addError(error) {
    this._errors.push(error);
  }

  expectToThrow(title, error) {
    this._assertsToTest.push({
      type: 'throwError',
      title,
      value: error,
      toBe: true
    });
  }
}
// CARD SPRITE
class SizeCardSpriteTest extends SceneTest {
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
    const cardWidth = CardSprite.contentOriginalWidth();
    const cardHeight = CardSprite.contentOriginalHeight();
    const x = ScreenHelper.getCenterPosition(cardWidth);
    const y = ScreenHelper.getMiddlePosition(cardHeight);
    this.subject.startOpen(x, y);
    this.subject.show();
  }

  asserts() {
    const cardWidth = 96;
    const cardHeight = 120;
    this.describe('Deve validar a proporção do card!');
    this.expectTrue('Esta com a largura informada?', this.subject.width === cardWidth);
    this.expectTrue('Esta com a altura informada?', this.subject.height === cardHeight);
    this.expectTrue('Esta aberto?', this.subject.isOpened());
  }
}
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
    const cardWidth = CardSprite.contentOriginalWidth();
    const cardHeight = CardSprite.contentOriginalHeight();
    const x = ScreenHelper.getCenterPosition(cardWidth);
    const y = ScreenHelper.getMiddlePosition(cardHeight);
    this.subject.startOpen(x, y);
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
    const cardWidth = CardSprite.contentOriginalWidth();
    const cardHeight = CardSprite.contentOriginalHeight();
    const x = ScreenHelper.getCenterPosition(cardWidth);
    const y = ScreenHelper.getMiddlePosition(cardHeight);
    this.subject.startClosed(x, y);
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
    const cardWidth = CardSprite.contentOriginalWidth();
    const cardHeight = CardSprite.contentOriginalHeight();
    const x = ScreenHelper.getCenterPosition(cardWidth);
    const y = ScreenHelper.getMiddlePosition(cardHeight);
    this.subject.startOpen(x, y);
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
    const cardWidth = CardSprite.contentOriginalWidth();
    const cardHeight = CardSprite.contentOriginalHeight();
    const x = ScreenHelper.getCenterPosition(cardWidth);
    const y = ScreenHelper.getMiddlePosition(cardHeight);
    this.subject.startOpen(x, y);
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
    const cardWidth = CardSprite.contentOriginalWidth();
    const cardHeight = CardSprite.contentOriginalHeight();
    const x = ScreenHelper.getCenterPosition(cardWidth);
    const y = ScreenHelper.getMiddlePosition(cardHeight);
    this.subject.startOpen(x, y);
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
    const cardWidth = CardSprite.contentOriginalWidth();
    const cardHeight = CardSprite.contentOriginalHeight();
    const x = ScreenHelper.getCenterPosition(cardWidth);
    const y = ScreenHelper.getMiddlePosition(cardHeight);
    this.subject.startOpen(x, y);
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
    const cardWidth = CardSprite.contentOriginalWidth();
    const cardHeight = CardSprite.contentOriginalHeight();
    const x = ScreenHelper.getCenterPosition(cardWidth);
    const y = ScreenHelper.getMiddlePosition(cardHeight);
    this.subject.startOpen(x, y);
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
    const cardWidth = CardSprite.contentOriginalWidth();
    const cardHeight = CardSprite.contentOriginalHeight();
    const x = ScreenHelper.getCenterPosition(cardWidth);
    const y = ScreenHelper.getMiddlePosition(cardHeight);
    this.subject.startOpen(x, y);
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
    const cardWidth = CardSprite.contentOriginalWidth();
    const cardHeight = CardSprite.contentOriginalHeight();
    const x = ScreenHelper.getCenterPosition(cardWidth);
    const y = ScreenHelper.getMiddlePosition(cardHeight);
    this.subject.startOpen(x, y);
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
    const cardWidth = CardSprite.contentOriginalWidth();
    const cardHeight = CardSprite.contentOriginalHeight();
    const x = ScreenHelper.getCenterPosition(cardWidth);
    const y = ScreenHelper.getMiddlePosition(cardHeight);
    this.subject.startOpen(x, y);
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
    const cardWidth = CardSprite.contentOriginalWidth();
    const cardHeight = CardSprite.contentOriginalHeight();
    const x = ScreenHelper.getCenterPosition(cardWidth);
    const y = ScreenHelper.getMiddlePosition(cardHeight);
    this.subject.startOpen(x, y);
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
    const cardWidth = CardSprite.contentOriginalWidth();
    const cardHeight = CardSprite.contentOriginalHeight();
    const x = ScreenHelper.getCenterPosition(cardWidth);
    const y = ScreenHelper.getMiddlePosition(cardHeight);
    this.subject.startOpen(x, y);
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
    const cardWidth = CardSprite.contentOriginalWidth();
    const cardHeight = CardSprite.contentOriginalHeight();
    const x = ScreenHelper.getCenterPosition(cardWidth);
    const y = ScreenHelper.getMiddlePosition(cardHeight);
    this.subject.startOpen(x, y);
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
    this.addAssistedHidden(this.subject);
    const centerXPosition = ScreenHelper.getPositionInCenterOf(this.base.width, this.subject.width);
    const centerYPosition = 0;
    this.subject.startOpen(centerXPosition, centerYPosition);
    this.subject.show();
    this.base.addChild(this.subject);
    const times = 1;
    this.subject.damage(times, this._scene);
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
    const cardWidth = CardSprite.contentOriginalWidth();
    const cardHeight = CardSprite.contentOriginalHeight();
    const x = ScreenHelper.getCenterPosition(cardWidth);
    const y = ScreenHelper.getMiddlePosition(cardHeight);
    this.subject.startOpen(x, y);
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
    const cardWidth = CardSprite.contentOriginalWidth();
    const cardHeight = CardSprite.contentOriginalHeight();
    const x = ScreenHelper.getCenterPosition(cardWidth);
    const y = ScreenHelper.getMiddlePosition(cardHeight);
    this.subject.startOpen(x, y);
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
    const cardWidth = CardSprite.contentOriginalWidth();
    const cardHeight = CardSprite.contentOriginalHeight();
    const x = ScreenHelper.getCenterPosition(cardWidth);
    const y = ScreenHelper.getMiddlePosition(cardHeight);
    this.subject.startOpen(x, y);
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
    const cardWidth = CardSprite.contentOriginalWidth();
    const cardHeight = CardSprite.contentOriginalHeight();
    const x = ScreenHelper.getCenterPosition(cardWidth);
    const y = ScreenHelper.getMiddlePosition(cardHeight);
    this.subject.startOpen(x, y);
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
    const cardWidth = CardSprite.contentOriginalWidth();
    const cardHeight = CardSprite.contentOriginalHeight();
    const x = ScreenHelper.getCenterPosition(cardWidth);
    const y = ScreenHelper.getMiddlePosition(cardHeight);
    this.subject.startOpen(x, y);
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
    const cardWidth = CardSprite.contentOriginalWidth();
    const cardHeight = CardSprite.contentOriginalHeight();
    const x = ScreenHelper.getCenterPosition(cardWidth);
    const y = ScreenHelper.getMiddlePosition(cardHeight);
    this.subject.startOpen(x, y);
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
    const cardWidth = CardSprite.contentOriginalWidth();
    const cardHeight = CardSprite.contentOriginalHeight();
    const x = ScreenHelper.getCenterPosition(cardWidth);
    const y = ScreenHelper.getMiddlePosition(cardHeight);
    this.subject.startOpen(x, y);
    this.subject.show();
    this.subject.changePoints(25, 18);
  }

  asserts() {
    this.describe('Deve atualizar os pontos do card!');
    this.expectWasTrue('Foram atualizandos?', this.subject.isUpdatingPoints);
  }
}
class TiggerAcitonCardSpriteTest extends SceneTest {
  create() {
    const x = ScreenHelper.getCenterPosition(CardsetSprite.contentOriginalWidth());
    const y = ScreenHelper.getMiddlePosition(CardsetSprite.contentOriginalHeight());
    this.base = CardsetSprite.create(x, y);
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
    this.addAssistedHidden(this.subject);
    const centerXPosition = ScreenHelper.getPositionInCenterOf(this.base.width, this.subject.width);
    const centerYPosition = 0;
    this.subject.startOpen(centerXPosition, centerYPosition);
    this.subject.show();
    this.base.addChild(this.subject);
    const times = 1;
    this._tiggerActionActived = false;
    const tiggerAction = () => {
      this._tiggerActionActived = true;
      this.subject.damage(times, this._scene);
    }
    this.subject.damage(times, this._scene, tiggerAction);
  }

  start() {
    this.counter = (GameConst.FPS * 3);
  }

  asserts() {
    this.describe('Deve receber uma animação em cadeia!');
    this.expectTrue('Base é visível?', this.base.isVisible());
    this.expectWasTrue('Houve animação?', this.subject.isAnimationPlaying);
    this.expectTrue('Houve animação em cadeia?', this._tiggerActionActived);
  }
}
// CARDSET SPRITE
class StartPositionCardsetSpriteTest extends SceneTest {
  create() {
    const centerXPosition = (Graphics.boxWidth / 2 - CardsetSprite.contentOriginalWidth() / 2);
    const centerYPosition = (Graphics.boxHeight / 2 - CardsetSprite.contentOriginalHeight() / 2);
    this.subject = CardsetSprite.create(centerXPosition, centerYPosition);
    this.subject.setBackgroundColor('orange');
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
    this.subject.selectMode();
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
    const onSelectHandler = (cards) => {
      this.cardsSelected = cards;
      endTest();
    };
    this.subject.selectMode(unlimited, onSelectHandler);
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
    const noSelect = 0;
    this.cardsSelected = [];
    const selectHandler = (cards) => {
      this.cardsSelected = cards;
    };
    this.subject.selectMode(noSelect, selectHandler);
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
    const onSelectHandler = (cards) => {
      this.cardsSelected = cards;
      endTest();
    };
    this.subject.selectMode(selectNumber, onSelectHandler);
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
    this.subject.damageCardsAnimate(times, sprites, this._scene);
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
class AlignAboveOfCardsetSpriteTest extends SceneTest {
  create() {
    const x = ScreenHelper.getCenterPosition(CardsetSprite.contentOriginalWidth());
    const y = ScreenHelper.getMiddlePosition(CardsetSprite.contentOriginalHeight());
    this.base = CardsetSprite.create(x, y);
    this.base.setBackgroundColor('blue');
    this.attachChild(this.base);
    this.subject = CardsetSprite.create(0, 0);
    this.subject.setBackgroundColor('orange');
    this.subject.alignAboveOf(this.base);
    this.addWatched(this.subject);
    this.subject.show();
    this.base.show();
  }

  asserts() {
    this.describe('Deve alinhar no centro e acima do meio!');
    const y = ScreenHelper.getPositionAboveOf(this.base.y, this.subject.height);
    this.expectTrue('Esta na posição vertical acima do meio?', this.subject.y === y);
  }
}
class AlignBelowOfCardsetSpriteTest extends SceneTest {
  create() {
    const x = ScreenHelper.getCenterPosition(CardsetSprite.contentOriginalWidth());
    const y = ScreenHelper.getMiddlePosition(CardsetSprite.contentOriginalHeight());
    this.base = CardsetSprite.create(x, y);
    this.base.setBackgroundColor('blue');
    this.attachChild(this.base);
    this.subject = CardsetSprite.create(0, 0);
    this.subject.setBackgroundColor('orange');
    this.subject.alignBelowOf(this.base);
    this.addWatched(this.subject);
    this.subject.show();
    this.base.show();
  }

  asserts() {
    this.describe('Deve alinhar no centro e acima do meio!');
    const y = ScreenHelper.getPositionBelowOf(this.base.y, this.subject.height);
    this.expectTrue('Esta na posição vertical acima do meio?', this.subject.y === y);
  }
}
class AlignCenterMiddleCardsetSpriteTest extends SceneTest {
  create() {
    this.subject = CardsetSprite.create(0, 0);
    this.subject.setBackgroundColor('blue');
    this.subject.alignCenterMiddle();
    this.addWatched(this.subject);
    this.subject.show();
  }

  asserts() {
    this.describe('Deve alinhar no centro e no meio!');
    const x = ScreenHelper.getCenterPosition(CardsetSprite.contentOriginalWidth());
    const y = ScreenHelper.getMiddlePosition(CardsetSprite.contentOriginalHeight());
    this.expectTrue('Esta na posição centralizada?', this.subject.y === y && this.subject.x === x);
  }
}
class TriggerActionCardsetSpriteTest extends SceneTest {
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
    this._triggerActionActived = false;
    const triggerAction = () => {
      this._triggerActionActived = true;
      this.subject.damageCardsAnimate(times, sprites, this._scene, triggerAction);
    }
    this.subject.damageCardsAnimate(times, sprites, this._scene, triggerAction);
  }

  start() {
    this.counter = (GameConst.FPS * 3);
  }

  asserts() {
    this.describe('Deve animar as cartas!');
    this.expectWasTrue('Houve um frame de animação?', this.subject.someSpriteIsAnimationPlaying);
    this.expectTrue('Houve animação em cadeia?', this._triggerActionActived);
  }
}
class OnChangeCursorSelectModeCardsetSpriteTest extends SceneTest {
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
    const noSelect = 0;
    this.currentIndex = null;
    const onSelectHandler = () => {};
    const onChangeCursor = (index) => {
      this.currentIndex = index;
      endTest();
    };
    this.subject.selectMode(noSelect, onSelectHandler, onChangeCursor);
  }

  asserts() {
    this.describe('Deve entrar em modo seleção com escolha!');
    this.expectTrue('Foi obtido um numerico ao movimentar curso?', typeof this.currentIndex === 'number');
    this.expectWasTrue('Esta em modo seleção?', this.subject.isSelectMode);
  }
}
class AddChildToEndCardsetSpriteTest extends SceneTest {
  create() {
    this.subject = CardsetSprite.create(0, 0);
    this.addWatched(this.subject);
    this.subject.centralize();
    this.subject.show();
    const numCards = 6;
    const cards = CardGenerator.generateCards(numCards);
    const sprites = this.subject.listCards(cards);
    this.subject.showCards(sprites);
    const startSprite = sprites[0];
    this.subject.addChildToEnd(startSprite);
  }

  asserts() {
    this.describe('Deve adicionar o sprite ao final de todos os outros!');
    const sprites = this.subject.getSprites();
    const indexAmount = this.subject.getSprites().length - 1;
    const startSprite = sprites[0];
    const lastIndex = this.subject.children.indexOf(startSprite);
    this.expectTrue('O sprite está no final?', lastIndex === indexAmount);
  }
}
class LeaveAllCardsCardsetSpriteTest extends SceneTest {
  create() {
    this.subject = CardsetSprite.create(0, 0);
    this.addWatched(this.subject);
    this.subject.centralize();
    this.subject.show();
    const numCards = 6;
    const cards = CardGenerator.generateCards(numCards);
    const sprites = this.subject.listCards(cards);
    this.subject.showCards(sprites);
    this.subject.leaveAllCards(sprites);
  }

  asserts() {
    this.describe('Deve retirar os sprites da tela!');
    this.expectTrue('Estão ocultos?', this.subject.isCardsHidden());
  }
}
// STETE WINDOW
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
    const x = ScreenHelper.getStartPosition();
    const y = ScreenHelper.getTopPosition();
    this.expectTrue('Esta na posição horizontal do centro?', this.subject.x === x);
    this.expectTrue('Esta na posição vertical embaixo?', this.subject.y === y);
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
    const x = ScreenHelper.getStartPosition();
    const y = ScreenHelper.getMiddlePosition(this.subject.height);
    this.expectTrue('Esta na posição horizontal do centro?', this.subject.x === x);
    this.expectTrue('Esta na posição vertical embaixo?', this.subject.y === y);
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
    const x = ScreenHelper.getStartPosition();
    const y = ScreenHelper.getBottomPosition(this.subject.height);
    this.expectTrue('Esta na posição horizontal do centro?', this.subject.x === x);
    this.expectTrue('Esta na posição vertical embaixo?', this.subject.y === y);
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
    const x = ScreenHelper.getCenterPosition(this.subject.width);
    const y = ScreenHelper.getTopPosition();
    this.expectTrue('Esta na posição horizontal do centro?', this.subject.x === x);
    this.expectTrue('Esta na posição vertical embaixo?', this.subject.y === y);
  }
}
class AlignCenterAboveMiddleStateWindowTest extends SceneTest {
  create() {
    this.subject = StateWindow.createWindowOneFourthSize(0, 0);
    this.addWatched(this.subject);
    this.subject.alignCenterAboveMiddle();
    this.subject.open();
  }

  asserts() {
    this.describe('Deve alinhar no centro e acima do meio!');
    const x = ScreenHelper.getCenterPosition(this.subject.width);
    const y = ScreenHelper.getAboveMiddlePosition(this.subject.height);
    this.expectTrue('Esta na posição horizontal centro?', this.subject.x === x);
    this.expectTrue('Esta na posição vertical acima do meio?', this.subject.y === y);
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
    const x = ScreenHelper.getCenterPosition(this.subject.width);
    const y = ScreenHelper.getMiddlePosition(this.subject.height);
    this.expectTrue('Esta na posição horizontal do centro?', this.subject.x === x);
    this.expectTrue('Esta na posição vertical embaixo?', this.subject.y === y);
  }
}
class AlignCenterBelowMiddleStateWindowTest  extends SceneTest {
  create() {
    this.subject = StateWindow.createWindowOneFourthSize(0, 0);
    this.addWatched(this.subject);
    this.subject.alignCenterBelowMiddle();
    this.subject.open();
  }

  asserts() {
    this.describe('Deve alinhar no centro e abaixo do meio!');
    const x = ScreenHelper.getCenterPosition(this.subject.width);
    const y = ScreenHelper.getBelowMiddlePosition(this.subject.height);
    this.expectTrue('Esta na posição horizontal centro?', this.subject.x === x);
    this.expectTrue('Esta na posição vertical abaixo do meio?', this.subject.y === y);
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
    const x = ScreenHelper.getCenterPosition(this.subject.width);
    const y = ScreenHelper.getBottomPosition(this.subject.height);
    this.expectTrue('Esta na posição horizontal do centro?', this.subject.x === x);
    this.expectTrue('Esta na posição vertical embaixo?', this.subject.y === y);
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
    const x = ScreenHelper.getEndPosition(this.subject.width);
    const y = ScreenHelper.getTopPosition();
    this.expectTrue('Esta na posição horizontal do centro?', this.subject.x === x);
    this.expectTrue('Esta na posição vertical embaixo?', this.subject.y === y);
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
    const x = ScreenHelper.getEndPosition(this.subject.width);
    const y = ScreenHelper.getMiddlePosition(this.subject.height);
    this.expectTrue('Esta na posição horizontal do centro?', this.subject.x === x);
    this.expectTrue('Esta na posição vertical embaixo?', this.subject.y === y);
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
    const x = ScreenHelper.getEndPosition(this.subject.width);
    const y = ScreenHelper.getBottomPosition(this.subject.height);
    this.expectTrue('Esta na posição horizontal do centro?', this.subject.x === x);
    this.expectTrue('Esta na posição vertical embaixo?', this.subject.y === y);
  }
}
class AlignAboveOfStateWindowTest extends SceneTest {
  create() {
    const x = ScreenHelper.getCenterPosition(ScreenHelper.getOneFourthWidth());
    const y = ScreenHelper.getMiddlePosition(StateWindow.borderHeight() * 2);
    this.base = StateWindow.createWindowOneFourthSize(x, y);
    this.subject = StateWindow.createWindowOneFourthSize(0, 0);
    this.attachChild(this.base);
    this.addWatched(this.subject);
    this.base.open();
    this.subject.alignAboveOf(this.base);
    this.subject.open();
  }

  asserts() {
    this.describe('Deve alinhar no centro e acima do meio!');
    const y = ScreenHelper.getPositionAboveOf(this.base.y, this.subject.height);
    this.expectTrue('Esta na posição vertical acima do meio?', this.subject.y === y);
  }
}
class AlignBelowOfStateWindowTest extends SceneTest {
  create() {
    const x = ScreenHelper.getCenterPosition(ScreenHelper.getOneFourthWidth());
    const y = ScreenHelper.getMiddlePosition(StateWindow.borderHeight() * 2);
    this.base = StateWindow.createWindowOneFourthSize(x, y);
    this.subject = StateWindow.createWindowOneFourthSize(0, 0);
    this.attachChild(this.base);
    this.addWatched(this.subject);
    this.base.open();
    this.subject.alignBelowOf(this.base);
    this.subject.open();
  }

  asserts() {
    this.describe('Deve alinhar no centro e abaixo do meio!');
    const y = ScreenHelper.getPositionBelowOf(this.base.y, this.base.height);
    this.expectTrue('Esta na posição vertical abaixo do meio?', this.subject.y === y);
  }
}
// BOARD WINDOW
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
    const updateRedPoints = BoardWindow.createValueUpdate(GameConst.RED, 10);
    const updateBluePoints = BoardWindow.createValueUpdate(GameConst.BLUE, 10);
    const updateGreenPoints = BoardWindow.createValueUpdate(GameConst.GREEN, 10);
    const updateBlackPoints = BoardWindow.createValueUpdate(GameConst.BLACK, 10);
    const updateWhitePoints = BoardWindow.createValueUpdate(GameConst.WHITE, 10);
    const updateDeckPoints = BoardWindow.createValueUpdate(GameConst.CARDS_IN_DECK, 10);
    const updateHandPoints = BoardWindow.createValueUpdate(GameConst.CARDS_IN_HAND, 10);
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
// BATTLE POINTS WINDOW
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
// TRASH WINDOW
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
// SCORE WINDOW
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
// TEXT WINDOW
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
    const x = ScreenHelper.getCenterPosition(this.subject.width);
    const y = ScreenHelper.getBottomPosition(this.subject.height);
    this.expectTrue('Esta na posição horizontal centro?', this.subject.x === x);
    this.expectTrue('Esta na posição vertical abaixo do meio?', this.subject.y === y);
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
    const x = ScreenHelper.getCenterPosition(this.subject.width);
    const y = ScreenHelper.getAboveMiddlePosition(this.subject.height);
    this.expectTrue('Esta na posição horizontal centro?', this.subject.x === x);
    this.expectTrue('Esta na posição vertical acima do meio?', this.subject.y === y);
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
    const x = ScreenHelper.getCenterPosition(this.subject.width);
    const y = ScreenHelper.getMiddlePosition(this.subject.height);
    this.expectTrue('Esta na posição horizontal centro?', this.subject.x === x);
    this.expectTrue('Esta na posição vertical abaixo do meio?', this.subject.y === y);
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
    const x = ScreenHelper.getCenterPosition(this.subject.width);
    const y = ScreenHelper.getBelowMiddlePosition(this.subject.height);
    this.expectTrue('Esta na posição horizontal centro?', this.subject.x === x);
    this.expectTrue('Esta na posição vertical abaixo do meio?', this.subject.y === y);
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
    const x = ScreenHelper.getCenterPosition(this.subject.width);
    const y = ScreenHelper.getTopPosition();
    this.expectTrue('Esta na posição horizontal centro?', this.subject.x === x);
    this.expectTrue('Esta na posição vertical abaixo do meio?', this.subject.y === y);
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
    const x = ScreenHelper.getEndPosition(this.subject.width);
    const y = ScreenHelper.getBottomPosition(this.subject.height);
    this.expectTrue('Esta na posição horizontal centro?', this.subject.x === x);
    this.expectTrue('Esta na posição vertical abaixo do meio?', this.subject.y === y);
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
    const x = ScreenHelper.getEndPosition(this.subject.width);
    const y = ScreenHelper.getMiddlePosition(this.subject.height);
    this.expectTrue('Esta na posição horizontal centro?', this.subject.x === x);
    this.expectTrue('Esta na posição vertical abaixo do meio?', this.subject.y === y);
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
    const x = ScreenHelper.getEndPosition(this.subject.width);
    const y = ScreenHelper.getTopPosition(this.subject.height);
    this.expectTrue('Esta na posição horizontal centro?', this.subject.x === x);
    this.expectTrue('Esta na posição vertical abaixo do meio?', this.subject.y === y);
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
    const x = ScreenHelper.getStartPosition();
    const y = ScreenHelper.getBottomPosition(this.subject.height);
    this.expectTrue('Esta na posição horizontal centro?', this.subject.x === x);
    this.expectTrue('Esta na posição vertical abaixo do meio?', this.subject.y === y);
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
    const x = ScreenHelper.getStartPosition();
    const y = ScreenHelper.getMiddlePosition(this.subject.height);
    this.expectTrue('Esta na posição horizontal centro?', this.subject.x === x);
    this.expectTrue('Esta na posição vertical abaixo do meio?', this.subject.y === y);
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
    const x = ScreenHelper.getStartPosition();
    const y = ScreenHelper.getTopPosition();
    this.expectTrue('Esta na posição horizontal centro?', this.subject.x === x);
    this.expectTrue('Esta na posição vertical abaixo do meio?', this.subject.y === y);
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
    this.expectTrue('Foi desenhando no centro?', this.subject.getTextAlignment() === aligment);
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
    this.expectTrue('Foi desenhando na esquerda?', this.subject.getTextAlignment() === aligment);
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
    this.expectTrue('Foi desenhando na direita?', this.subject.getTextAlignment() === aligment);
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
class AlignAboveOfTextWindowTest extends SceneTest {
  create() {
    const x = ScreenHelper.getCenterPosition(ScreenHelper.getOneFourthWidth());
    const y = ScreenHelper.getMiddlePosition(TextWindow.borderHeight() * 2);
    this.base = TextWindow.createWindowOneFourthSize(x, y);
    this.subject = TextWindow.createWindowOneFourthSize(0, 0);
    this.attachChild(this.base);
    this.addWatched(this.subject);
    this.base.open();
    this.subject.alignAboveOf(this.base);
    this.subject.open();
  }

  asserts() {
    this.describe('Deve alinhar no centro e acima do meio!');
    const y = ScreenHelper.getPositionAboveOf(this.base.y, this.subject.height);
    this.expectTrue('Esta na posição vertical acima do meio?', this.subject.y === y);
  }
}
class AlignBelowOfTextWindowTest extends SceneTest {
  create() {
    const x = ScreenHelper.getCenterPosition(ScreenHelper.getOneFourthWidth());
    const y = ScreenHelper.getMiddlePosition(TextWindow.borderHeight() * 2);
    this.base = TextWindow.createWindowOneFourthSize(x, y);
    this.subject = TextWindow.createWindowOneFourthSize(0, 0);
    this.attachChild(this.base);
    this.addWatched(this.subject);
    this.base.open();
    this.subject.alignBelowOf(this.base);
    this.subject.open();
  }

  asserts() {
    this.describe('Deve alinhar no centro e abaixo do meio!');
    const y = ScreenHelper.getPositionBelowOf(this.base.y, this.base.height);
    this.expectTrue('Esta na posição vertical abaixo do meio?', this.subject.y === y);
  }
}
// COMMAND WINDOW
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
    const y = ScreenHelper.getTopPosition();
    this.expect('Esta na posição vertical do topo?', this.subject.y).toBe(y);
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
    const y = ScreenHelper.getMiddlePosition(this.subject.height);
    this.expect('Esta na posição vertical do meio?', this.subject.y).toBe(y);
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
    const y = ScreenHelper.getBottomPosition(this.subject.height);
    this.expect('Esta na posição vertical embaixo?', this.subject.y).toBe(y);
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
// FOLDER WINDOW
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
// PHASES
class ChallengePhaseTest extends SceneTest {
  phase;
  manager = { 
    folders: [
      {
        name: 'Folder 1',
        energies: [10, 10, 5, 5, 5, 5]
      }, {
        name: 'Folder 2',
        energies: [10, 10, 10, 10, 10, 10],
      }, {
        name: 'Folder 3',
        energies: [10, 10, 10, 0, 0, 0],
    }], 
    index: -1,
    getChallengeDescription: () => 'lv. 85 - Amaterasu Duel King',
    getPlayerFolders: () => this.manager.folders,
    setPlayerFolderIndex: (index) => this.manager.index = index,
    endPhase: () => {}
  };

  create() {
    this.phase = new ChallengePhase(this._scene);
    this.manager.endPhase = this.createHandler();
    this.addAssistedHidden(this.phase);
  }

  start() {
    this._scene.setPhase(this.phase);
    this.phase.start(this.manager);
  }

  update() {
    this.phase.update(this.manager);
  }
  
  asserts() {
    this.describe('Deve apresentar etapas de fase de desafiado e seleção de pasta.');
    this.expectWasTrue('A janela de título foi apresentada?', this.phase.isTitleWindowVisible);
    this.expectWasTrue('A janela de descrição de desafiado foi apresentada?', this.phase.isDescriptionWindowVisible);
    this.expectWasTrue('A Janela de escolha de pastas foi apresentada?', this.phase.isFolderWindowVisible);
    this.expectTrue('Foi escolhido uma pasta válida?', this.manager.index !== -1);
  }
}
class StartPhaseTest extends SceneTest {
  phase;
  endTest;
  manager = { 
    win: undefined,
    endPhase: () => {} 
  };

  create() {
    this.phase = new StartPhase(this._scene);
    this.manager.endPhase = this.createHandler();
    this.addAssistedHidden(this.phase);
  }

  start() {
    this._scene.setPhase(this.phase);
    this.phase.start(this.manager);
  }

  update() {
    this.phase.update(this.manager);
  }

  asserts() {
    this.describe('Deve apresentar etapas de fase de início e jogo da sorte.');
    this.expectWasTrue('O set de cartas estava em modo seleção?', this.phase.isCardsetVisible);
    this.expectWasTrue('A janela de título foi apresentada?', this.phase.isTitleWindowVisible);
    this.expectWasTrue('A janela de descrição de desafiado foi apresentada?', this.phase.isDescriptionWindowVisible);
    this.expectWasTrue('A janela de resultado foi apresentada?', this.phase.isResultWindowVisible);
    this.expectTrue('O resultado do jogo da sorte foi apresentado?', typeof this.manager.win === 'boolean');
  }
}
class DrawPhaseTest extends SceneTest {
  phase;
  endTest;
  manager = {
    getPlayerDeck: () => this.manager.player.deck,
    getPlayerHand: () => this.manager.player.hand,
    getPlayerEnergies: () => this.manager.player.energies,
    getPlayerDeckLength: () => this.manager.player.deck.length,
    getPlayerHandLength: () => this.manager.player.hand.length,
    getPlayerTrashLength: () => this.manager.player.trash.length,
    getPlayerVictories: () => this.manager.player.victories,
    isPlayerPassed: () => this.manager.player.passed,
    setPlayerHand: (hand) => this.manager.player.hand = hand,
    setPlayerEnergies: (energies) => this.manager.player.energies = energies,
    getChallengeDeck: () => this.manager.challenge.deck,
    getChallengeHand: () => this.manager.challenge.hand,
    getChallengeEnergies: () => this.manager.challenge.energies,
    getChallengeDeckLength: () => this.manager.challenge.deck.length,
    getChallengeHandLength: () => this.manager.challenge.hand.length,
    getChallengeTrashLength: () => this.manager.challenge.trash.length,
    getChallengeVictories: () => this.manager.challenge.victories,
    isChallengePassed: () => this.manager.challenge.passed,
    setChallengeHand: (hand) => this.manager.challenge.hand = hand,
    setChallengeEnergies: (energies) => this.manager.challenge.energies = energies,
    player: {
      deck: [
        { type: GameConst.BATTLE, color: GameConst.RED, figureName: 'default', attack: 10, health: 10 },
        { type: GameConst.POWER, color: GameConst.GREEN, figureName: 'default', attack: 10, health: 10 },
        { type: GameConst.BATTLE, color: GameConst.BLUE, figureName: 'default', attack: 10, health: 10 },
        { type: GameConst.POWER, color: GameConst.BLACK, figureName: 'default', attack: 10, health: 10 },
        { type: GameConst.BATTLE, color: GameConst.WHITE, figureName: 'default', attack: 10, health: 10 },
        { type: GameConst.POWER, color: GameConst.BROWN, figureName: 'default', attack: 10, health: 10 },
        { type: GameConst.BATTLE, color: GameConst.RED, figureName: 'default', attack: 10, health: 10 },
        { type: GameConst.POWER, color: GameConst.BLUE, figureName: 'default', attack: 10, health: 10 },
        { type: GameConst.BATTLE, color: GameConst.RED, figureName: 'default', attack: 10, health: 10 },
        { type: GameConst.POWER, color: GameConst.GREEN, figureName: 'default', attack: 10, health: 10 },
        { type: GameConst.BATTLE, color: GameConst.WHITE, figureName: 'default', attack: 10, health: 10 },
        { type: GameConst.POWER, color: GameConst.BLACK, figureName: 'default', attack: 10, health: 10 },
        { type: GameConst.BATTLE, color: GameConst.BLUE, figureName: 'default', attack: 10, health: 10 },
        { type: GameConst.POWER, color: GameConst.RED, figureName: 'default', attack: 10, health: 10 },
        { type: GameConst.BATTLE, color: GameConst.BLACK, figureName: 'default', attack: 10, health: 10 },
        { type: GameConst.POWER, color: GameConst.BLUE, figureName: 'default', attack: 10, health: 10 },
        { type: GameConst.BATTLE, color: GameConst.RED, figureName: 'default', attack: 10, health: 10 },
        { type: GameConst.POWER, color: GameConst.RED, figureName: 'default', attack: 10, health: 10 },
        { type: GameConst.BATTLE, color: GameConst.GREEN, figureName: 'default', attack: 10, health: 10 },
        { type: GameConst.POWER, color: GameConst.BLUE, figureName: 'default', attack: 10, health: 10 },
        { type: GameConst.BATTLE, color: GameConst.BLACK, figureName: 'default', attack: 10, health: 10 },
        { type: GameConst.POWER, color: GameConst.BROWN, figureName: 'default', attack: 10, health: 10 },
        { type: GameConst.BATTLE, color: GameConst.BROWN, figureName: 'default', attack: 10, health: 10 },
        { type: GameConst.POWER, color: GameConst.BLUE, figureName: 'default', attack: 10, health: 10 },
        { type: GameConst.BATTLE, color: GameConst.RED, figureName: 'default', attack: 10, health: 10 },
        { type: GameConst.POWER, color: GameConst.RED, figureName: 'default', attack: 10, health: 10 },
        { type: GameConst.BATTLE, color: GameConst.RED, figureName: 'default', attack: 10, health: 10 },
        { type: GameConst.POWER, color: GameConst.RED, figureName: 'default', attack: 10, health: 10 },
        { type: GameConst.BATTLE, color: GameConst.BLUE, figureName: 'default', attack: 10, health: 10 },
        { type: GameConst.POWER, color: GameConst.GREEN, figureName: 'default', attack: 10, health: 10 },
        { type: GameConst.BATTLE, color: GameConst.BLUE, figureName: 'default', attack: 10, health: 10 },
        { type: GameConst.POWER, color: GameConst.BLACK, figureName: 'default', attack: 10, health: 10 },
        { type: GameConst.BATTLE, color: GameConst.WHITE, figureName: 'default', attack: 10, health: 10 },
        { type: GameConst.POWER, color: GameConst.BLACK, figureName: 'default', attack: 10, health: 10 },
        { type: GameConst.BATTLE, color: GameConst.RED, figureName: 'default', attack: 10, health: 10 },
        { type: GameConst.POWER, color: GameConst.GREEN, figureName: 'default', attack: 10, health: 10 },
        { type: GameConst.BATTLE, color: GameConst.WHITE, figureName: 'default', attack: 10, health: 10 },
        { type: GameConst.POWER, color: GameConst.GREEN, figureName: 'default', attack: 10, health: 10 },
        { type: GameConst.BATTLE, color: GameConst.RED, figureName: 'default', attack: 10, health: 10 },
        { type: GameConst.POWER, color: GameConst.WHITE, figureName: 'default', attack: 10, health: 10 },
      ],
      hand: [],
      trash: [],
      energies: {
        [GameConst.RED]: 0,
        [GameConst.BLUE]: 0,
        [GameConst.GREEN]: 0,
        [GameConst.BLACK]: 0,
        [GameConst.WHITE]: 0,
      },
      victories: 0,
      passed: false,
    },
    challenge: {
      deck: [
        { type: GameConst.BATTLE, color: GameConst.RED, figureName: 'default', attack: 10, health: 10 },
        { type: GameConst.POWER, color: GameConst.GREEN, figureName: 'default', attack: 10, health: 10 },
        { type: GameConst.BATTLE, color: GameConst.BLUE, figureName: 'default', attack: 10, health: 10 },
        { type: GameConst.POWER, color: GameConst.BLACK, figureName: 'default', attack: 10, health: 10 },
        { type: GameConst.BATTLE, color: GameConst.WHITE, figureName: 'default', attack: 10, health: 10 },
        { type: GameConst.POWER, color: GameConst.BROWN, figureName: 'default', attack: 10, health: 10 },
        { type: GameConst.BATTLE, color: GameConst.RED, figureName: 'default', attack: 10, health: 10 },
        { type: GameConst.POWER, color: GameConst.BLUE, figureName: 'default', attack: 10, health: 10 },
        { type: GameConst.BATTLE, color: GameConst.RED, figureName: 'default', attack: 10, health: 10 },
        { type: GameConst.POWER, color: GameConst.GREEN, figureName: 'default', attack: 10, health: 10 },
        { type: GameConst.BATTLE, color: GameConst.WHITE, figureName: 'default', attack: 10, health: 10 },
        { type: GameConst.POWER, color: GameConst.BLACK, figureName: 'default', attack: 10, health: 10 },
        { type: GameConst.BATTLE, color: GameConst.BLUE, figureName: 'default', attack: 10, health: 10 },
        { type: GameConst.POWER, color: GameConst.RED, figureName: 'default', attack: 10, health: 10 },
        { type: GameConst.BATTLE, color: GameConst.BLACK, figureName: 'default', attack: 10, health: 10 },
        { type: GameConst.POWER, color: GameConst.BLUE, figureName: 'default', attack: 10, health: 10 },
        { type: GameConst.BATTLE, color: GameConst.RED, figureName: 'default', attack: 10, health: 10 },
        { type: GameConst.POWER, color: GameConst.RED, figureName: 'default', attack: 10, health: 10 },
        { type: GameConst.BATTLE, color: GameConst.GREEN, figureName: 'default', attack: 10, health: 10 },
        { type: GameConst.POWER, color: GameConst.BLUE, figureName: 'default', attack: 10, health: 10 },
        { type: GameConst.BATTLE, color: GameConst.BLACK, figureName: 'default', attack: 10, health: 10 },
        { type: GameConst.POWER, color: GameConst.BROWN, figureName: 'default', attack: 10, health: 10 },
        { type: GameConst.BATTLE, color: GameConst.BROWN, figureName: 'default', attack: 10, health: 10 },
        { type: GameConst.POWER, color: GameConst.BLUE, figureName: 'default', attack: 10, health: 10 },
        { type: GameConst.BATTLE, color: GameConst.RED, figureName: 'default', attack: 10, health: 10 },
        { type: GameConst.POWER, color: GameConst.RED, figureName: 'default', attack: 10, health: 10 },
        { type: GameConst.BATTLE, color: GameConst.RED, figureName: 'default', attack: 10, health: 10 },
        { type: GameConst.POWER, color: GameConst.RED, figureName: 'default', attack: 10, health: 10 },
        { type: GameConst.BATTLE, color: GameConst.BLUE, figureName: 'default', attack: 10, health: 10 },
        { type: GameConst.POWER, color: GameConst.GREEN, figureName: 'default', attack: 10, health: 10 },
        { type: GameConst.BATTLE, color: GameConst.BLUE, figureName: 'default', attack: 10, health: 10 },
        { type: GameConst.POWER, color: GameConst.BLACK, figureName: 'default', attack: 10, health: 10 },
        { type: GameConst.BATTLE, color: GameConst.WHITE, figureName: 'default', attack: 10, health: 10 },
        { type: GameConst.POWER, color: GameConst.BLACK, figureName: 'default', attack: 10, health: 10 },
        { type: GameConst.BATTLE, color: GameConst.RED, figureName: 'default', attack: 10, health: 10 },
        { type: GameConst.POWER, color: GameConst.GREEN, figureName: 'default', attack: 10, health: 10 },
        { type: GameConst.BATTLE, color: GameConst.WHITE, figureName: 'default', attack: 10, health: 10 },
        { type: GameConst.POWER, color: GameConst.GREEN, figureName: 'default', attack: 10, health: 10 },
        { type: GameConst.BATTLE, color: GameConst.RED, figureName: 'default', attack: 10, health: 10 },
        { type: GameConst.POWER, color: GameConst.WHITE, figureName: 'default', attack: 10, health: 10 },
      ],
      hand: [],
      trash: [],
      energies: {
        [GameConst.RED]: 0,
        [GameConst.BLUE]: 0,
        [GameConst.GREEN]: 0,
        [GameConst.BLACK]: 0,
        [GameConst.WHITE]: 0,
      },
      victories: 0,
      passed: false,
    },
    endPhase: () => {}
  };

  create() {
    this.phase = new DrawPhase(this._scene);
    this.manager.endPhase = this.createHandler();
    this.addAssistedHidden(this.phase);
  }

  start() {
    this._scene.setPhase(this.phase);
    this.phase.start(this.manager);
  }

  update() {
    this.phase.update(this.manager);
  }
  
  asserts() {
    this.describe('Deve apresentar etapas de fase de sorteio e carregamento de energias.');
    this.expectWasTrue('A janela de título foi apresentada?', this.phase.isTitleWindowVisible);
    this.expectWasTrue('A janela de descrição de sorteio foi apresentada?', this.phase.isDescriptionWindowVisible);
    this.expectWasTrue('A janela de tabuleiro do jogador foi apresentado?', this.phase.isPlayerBoardWindowVisible);
    this.expectWasTrue('A janela de batalha do jogador foi apresentada?', this.phase.isPlayerBattleWindowVisible);
    this.expectWasTrue('A janela de lixo do jogador foi apresentada?', this.phase.isPlayerTrashWindowVisible);
    this.expectWasTrue('A janela de pontuação do jogador foi apresentada?', this.phase.isPlayerScoreWindowVisible);
    this.expectWasTrue('O campo de batalha do jogador foi apresentado?', this.phase.isPlayerBattlefieldVisible);
    this.expectWasTrue('A janela de tabuleiro do desafiante foi apresentado?', this.phase.isChallengeBoardWindowVisible);
    this.expectWasTrue('A janela de batalha do desafiante foi apresentada?', this.phase.isChallengeBattleWindowVisible);
    this.expectWasTrue('A janela de lixo do desafiante foi apresentada?', this.phase.isChallengeTrashWindowVisible);
    this.expectWasTrue('A janela de pontuação do desafiante foi apresentada?', this.phase.isChallengeScoreWindowVisible);
    this.expectWasTrue('O campo de batalha do desafiante foi apresentado?', this.phase.isChallengeBattlefieldVisible);
    this.expectTrue('O total de cards no campo do jogar é?', this.manager.player.deck.length === 34);
    this.expectTrue('O total de cards no campo do desafiante é?', this.manager.challenge.deck.length === 34);
    this.expectTrue('O total de cards na mão do jogador é?', this.manager.player.hand.length === 6);
    this.expectTrue('O total de cards na mão do desafiante é?', this.manager.challenge.hand.length === 6);
  }
}
class LoadPhaseTest extends SceneTest {
  phase;
  endTest;
  manager = {
    getPlayerDeck: () => this.manager.player.deck,
    getPlayerHand: () => this.manager.player.hand,
    getPlayerEnergies: () => this.manager.player.energies,
    getPlayerDeckLength: () => this.manager.player.deck.length,
    getPlayerHandLength: () => this.manager.player.hand.length,
    getPlayerTrashLength: () => this.manager.player.trash.length,
    getPlayerVictories: () => this.manager.player.victories,
    isPlayerPassed: () => this.manager.player.passed,
    playerPassed: () => this.manager.player.passed = true,
    setPlayerHand: (hand) => this.manager.player.hand = hand,
    setPlayerEnergies: (energies) => this.manager.player.energies = energies,
    getCardPlayerHandByIndex: (index) => this.manager.player.hand[index],
    getChallengeDeck: () => this.manager.challenge.deck,
    getChallengeHand: () => this.manager.challenge.hand,
    getChallengeEnergies: () => this.manager.challenge.energies,
    getChallengeDeckLength: () => this.manager.challenge.deck.length,
    getChallengeHandLength: () => this.manager.challenge.hand.length,
    getChallengeTrashLength: () => this.manager.challenge.trash.length,
    getChallengeVictories: () => this.manager.challenge.victories,
    isChallengePassed: () => this.manager.challenge.passed,
    challengePassed: () => this.manager.challenge.passed = true,
    setChallengeHand: (hand) => this.manager.challenge.hand = hand,
    setChallengeEnergies: (energies) => this.manager.challenge.energies = energies,
    getPowerCardParams: (cardId) => {
      return {
        type: GameConst.ADD_ENERGIES,
      };
    },
    moveCardHandToPowerField: (index, player) => {
      const card = this.manager.getCardPlayerHandByIndex(index);
      this.manager.addCardToPowerField(card, player);
      this.manager.removeCardFromPlayerHand(index);
    },
    addCardToPowerField: (card, player) => {
      const cardSlot = { card, player };
      this.manager.powerfield.push(cardSlot);
    },
    removeCardFromPlayerHand: (index) => {
      const newSet = this.manager.player.hand.filter((card, iCard) => iCard !== index);
      this.manager.setPlayerHand(newSet);
    },
    getPowerfieldLength: () => this.manager.powerfield.length,
    resetPlayes: () => {
      this.manager.player.passed = false;
      this.manager.challenge.passed = false;
    },
    isStartPlays: () => {
      return !this.manager.player.passed && !this.manager.challenge.passed;
    },
    isEndPlays: () => {
      return this.manager.player.passed && this.manager.challenge.passed;
    },
    getPowerfieldLastCardSlot: () => {
      return this.manager.powerfield[this.manager.powerfield.length - 1];
    },
    removePowerfieldLastCardSlot: () => {
      return this.manager.powerfield.pop();
    },
    startPlay: false,
    powerfield: [],
    player: {
      deck: [
        { id: 1, type: GameConst.BATTLE, color: GameConst.RED, figureName: 'default', attack: 10, health: 10, isActiveInLoadPhase: false },
        { id: 1, type: GameConst.POWER, color: GameConst.BLUE, figureName: 'default', attack: 10, health: 10, isActiveInLoadPhase: true },
        { id: 1, type: GameConst.BATTLE, color: GameConst.RED, figureName: 'default', attack: 10, health: 10, isActiveInLoadPhase: false },
        { id: 1, type: GameConst.POWER, color: GameConst.GREEN, figureName: 'default', attack: 10, health: 10, isActiveInLoadPhase: true },
        { id: 1, type: GameConst.BATTLE, color: GameConst.WHITE, figureName: 'default', attack: 10, health: 10, isActiveInLoadPhase: false },
        { id: 1, type: GameConst.POWER, color: GameConst.BLACK, figureName: 'default', attack: 10, health: 10, isActiveInLoadPhase: true },
        { id: 1, type: GameConst.BATTLE, color: GameConst.BLUE, figureName: 'default', attack: 10, health: 10, isActiveInLoadPhase: false },
        { id: 1, type: GameConst.POWER, color: GameConst.RED, figureName: 'default', attack: 10, health: 10, isActiveInLoadPhase: true },
        { id: 1, type: GameConst.BATTLE, color: GameConst.BLACK, figureName: 'default', attack: 10, health: 10, isActiveInLoadPhase: false },
        { id: 1, type: GameConst.POWER, color: GameConst.BLUE, figureName: 'default', attack: 10, health: 10, isActiveInLoadPhase: true },
        { id: 1, type: GameConst.BATTLE, color: GameConst.RED, figureName: 'default', attack: 10, health: 10, isActiveInLoadPhase: false },
        { id: 1, type: GameConst.POWER, color: GameConst.RED, figureName: 'default', attack: 10, health: 10, isActiveInLoadPhase: true },
        { id: 1, type: GameConst.BATTLE, color: GameConst.GREEN, figureName: 'default', attack: 10, health: 10, isActiveInLoadPhase: false },
        { id: 1, type: GameConst.POWER, color: GameConst.BLUE, figureName: 'default', attack: 10, health: 10, isActiveInLoadPhase: true },
        { id: 1, type: GameConst.BATTLE, color: GameConst.BLACK, figureName: 'default', attack: 10, health: 10, isActiveInLoadPhase: false },
        { id: 1, type: GameConst.POWER, color: GameConst.BROWN, figureName: 'default', attack: 10, health: 10, isActiveInLoadPhase: true },
        { id: 1, type: GameConst.BATTLE, color: GameConst.BROWN, figureName: 'default', attack: 10, health: 10, isActiveInLoadPhase: false },
        { id: 1, type: GameConst.POWER, color: GameConst.BLUE, figureName: 'default', attack: 10, health: 10, isActiveInLoadPhase: true },
        { id: 1, type: GameConst.BATTLE, color: GameConst.RED, figureName: 'default', attack: 10, health: 10, isActiveInLoadPhase: false },
        { id: 1, type: GameConst.POWER, color: GameConst.RED, figureName: 'default', attack: 10, health: 10, isActiveInLoadPhase: true },
        { id: 1, type: GameConst.BATTLE, color: GameConst.RED, figureName: 'default', attack: 10, health: 10, isActiveInLoadPhase: false },
        { id: 1, type: GameConst.POWER, color: GameConst.RED, figureName: 'default', attack: 10, health: 10, isActiveInLoadPhase: true },
        { id: 1, type: GameConst.BATTLE, color: GameConst.BLUE, figureName: 'default', attack: 10, health: 10, isActiveInLoadPhase: false },
        { id: 1, type: GameConst.POWER, color: GameConst.GREEN, figureName: 'default', attack: 10, health: 10, isActiveInLoadPhase: true },
        { id: 1, type: GameConst.BATTLE, color: GameConst.BLUE, figureName: 'default', attack: 10, health: 10, isActiveInLoadPhase: false },
        { id: 1, type: GameConst.POWER, color: GameConst.BLACK, figureName: 'default', attack: 10, health: 10, isActiveInLoadPhase: true },
        { id: 1, type: GameConst.BATTLE, color: GameConst.WHITE, figureName: 'default', attack: 10, health: 10, isActiveInLoadPhase: false },
        { id: 1, type: GameConst.POWER, color: GameConst.BLACK, figureName: 'default', attack: 10, health: 10, isActiveInLoadPhase: true },
        { id: 1, type: GameConst.BATTLE, color: GameConst.RED, figureName: 'default', attack: 10, health: 10, isActiveInLoadPhase: false },
        { id: 1, type: GameConst.POWER, color: GameConst.GREEN, figureName: 'default', attack: 10, health: 10, isActiveInLoadPhase: true },
        { id: 1, type: GameConst.BATTLE, color: GameConst.WHITE, figureName: 'default', attack: 10, health: 10, isActiveInLoadPhase: false },
        { id: 1, type: GameConst.POWER, color: GameConst.GREEN, figureName: 'default', attack: 10, health: 10, isActiveInLoadPhase: true },
        { id: 1, type: GameConst.BATTLE, color: GameConst.RED, figureName: 'default', attack: 10, health: 10, isActiveInLoadPhase: false },
        { id: 1, type: GameConst.POWER, color: GameConst.WHITE, figureName: 'default', attack: 10, health: 10, isActiveInLoadPhase: false },
      ],
      hand: [
        { id: 1, type: GameConst.POWER, color: GameConst.GREEN, figureName: 'default', attack: 10, health: 10, isActiveInLoadPhase: true },
        { id: 1, type: GameConst.BATTLE, color: GameConst.RED, figureName: 'default', attack: 10, health: 10, isActiveInLoadPhase: false },
        { id: 1, type: GameConst.BATTLE, color: GameConst.BLUE, figureName: 'default', attack: 10, health: 10, isActiveInLoadPhase: false },
        { id: 1, type: GameConst.POWER, color: GameConst.BLACK, figureName: 'default', attack: 10, health: 10, isActiveInLoadPhase: true },
        { id: 1, type: GameConst.BATTLE, color: GameConst.WHITE, figureName: 'default', attack: 10, health: 10, isActiveInLoadPhase: false },
        { id: 1, type: GameConst.POWER, color: GameConst.BROWN, figureName: 'default', attack: 10, health: 10, isActiveInLoadPhase: true },
      ],
      trash: [],
      energies: {
        [GameConst.RED]: 1,
        [GameConst.BLUE]: 1,
        [GameConst.GREEN]: 1,
        [GameConst.BLACK]: 1,
        [GameConst.WHITE]: 1,
      },
      victories: 0,
      passed: false,
    },
    challenge: {
      deck: [
        { id: 1, type: GameConst.BATTLE, color: GameConst.RED, figureName: 'default', attack: 10, health: 10, isActiveInLoadPhase: false },
        { id: 1, type: GameConst.POWER, color: GameConst.BLUE, figureName: 'default', attack: 10, health: 10, isActiveInLoadPhase: true },
        { id: 1, type: GameConst.BATTLE, color: GameConst.RED, figureName: 'default', attack: 10, health: 10, isActiveInLoadPhase: false },
        { id: 1, type: GameConst.POWER, color: GameConst.GREEN, figureName: 'default', attack: 10, health: 10, isActiveInLoadPhase: true },
        { id: 1, type: GameConst.BATTLE, color: GameConst.WHITE, figureName: 'default', attack: 10, health: 10, isActiveInLoadPhase: false },
        { id: 1, type: GameConst.POWER, color: GameConst.BLACK, figureName: 'default', attack: 10, health: 10, isActiveInLoadPhase: true },
        { id: 1, type: GameConst.BATTLE, color: GameConst.BLUE, figureName: 'default', attack: 10, health: 10, isActiveInLoadPhase: false },
        { id: 1, type: GameConst.POWER, color: GameConst.RED, figureName: 'default', attack: 10, health: 10, isActiveInLoadPhase: true },
        { id: 1, type: GameConst.BATTLE, color: GameConst.BLACK, figureName: 'default', attack: 10, health: 10, isActiveInLoadPhase: false },
        { id: 1, type: GameConst.POWER, color: GameConst.BLUE, figureName: 'default', attack: 10, health: 10, isActiveInLoadPhase: true },
        { id: 1, type: GameConst.BATTLE, color: GameConst.RED, figureName: 'default', attack: 10, health: 10, isActiveInLoadPhase: false },
        { id: 1, type: GameConst.POWER, color: GameConst.RED, figureName: 'default', attack: 10, health: 10, isActiveInLoadPhase: true },
        { id: 1, type: GameConst.BATTLE, color: GameConst.GREEN, figureName: 'default', attack: 10, health: 10, isActiveInLoadPhase: false },
        { id: 1, type: GameConst.POWER, color: GameConst.BLUE, figureName: 'default', attack: 10, health: 10, isActiveInLoadPhase: true },
        { id: 1, type: GameConst.BATTLE, color: GameConst.BLACK, figureName: 'default', attack: 10, health: 10, isActiveInLoadPhase: false },
        { id: 1, type: GameConst.POWER, color: GameConst.BROWN, figureName: 'default', attack: 10, health: 10, isActiveInLoadPhase: true },
        { id: 1, type: GameConst.BATTLE, color: GameConst.BROWN, figureName: 'default', attack: 10, health: 10, isActiveInLoadPhase: false },
        { id: 1, type: GameConst.POWER, color: GameConst.BLUE, figureName: 'default', attack: 10, health: 10, isActiveInLoadPhase: true },
        { id: 1, type: GameConst.BATTLE, color: GameConst.RED, figureName: 'default', attack: 10, health: 10, isActiveInLoadPhase: false },
        { id: 1, type: GameConst.POWER, color: GameConst.RED, figureName: 'default', attack: 10, health: 10, isActiveInLoadPhase: true },
        { id: 1, type: GameConst.BATTLE, color: GameConst.RED, figureName: 'default', attack: 10, health: 10, isActiveInLoadPhase: false },
        { id: 1, type: GameConst.POWER, color: GameConst.RED, figureName: 'default', attack: 10, health: 10, isActiveInLoadPhase: true },
        { id: 1, type: GameConst.BATTLE, color: GameConst.BLUE, figureName: 'default', attack: 10, health: 10, isActiveInLoadPhase: false },
        { id: 1, type: GameConst.POWER, color: GameConst.GREEN, figureName: 'default', attack: 10, health: 10, isActiveInLoadPhase: true },
        { id: 1, type: GameConst.BATTLE, color: GameConst.BLUE, figureName: 'default', attack: 10, health: 10, isActiveInLoadPhase: false },
        { id: 1, type: GameConst.POWER, color: GameConst.BLACK, figureName: 'default', attack: 10, health: 10, isActiveInLoadPhase: true },
        { id: 1, type: GameConst.BATTLE, color: GameConst.WHITE, figureName: 'default', attack: 10, health: 10, isActiveInLoadPhase: false },
        { id: 1, type: GameConst.POWER, color: GameConst.BLACK, figureName: 'default', attack: 10, health: 10, isActiveInLoadPhase: true },
        { id: 1, type: GameConst.BATTLE, color: GameConst.RED, figureName: 'default', attack: 10, health: 10, isActiveInLoadPhase: false },
        { id: 1, type: GameConst.POWER, color: GameConst.GREEN, figureName: 'default', attack: 10, health: 10, isActiveInLoadPhase: true },
        { id: 1, type: GameConst.BATTLE, color: GameConst.WHITE, figureName: 'default', attack: 10, health: 10, isActiveInLoadPhase: false },
        { id: 1, type: GameConst.POWER, color: GameConst.GREEN, figureName: 'default', attack: 10, health: 10, isActiveInLoadPhase: true },
        { id: 1, type: GameConst.BATTLE, color: GameConst.RED, figureName: 'default', attack: 10, health: 10, isActiveInLoadPhase: false },
        { id: 1, type: GameConst.POWER, color: GameConst.WHITE, figureName: 'default', attack: 10, health: 10, isActiveInLoadPhase: false },
      ],
      hand: [
        { id: 1, type: GameConst.BATTLE, color: GameConst.RED, figureName: 'default', attack: 10, health: 10, isActiveInLoadPhase: false },
        { id: 1, type: GameConst.POWER, color: GameConst.GREEN, figureName: 'default', attack: 10, health: 10, isActiveInLoadPhase: true },
        { id: 1, type: GameConst.BATTLE, color: GameConst.BLUE, figureName: 'default', attack: 10, health: 10, isActiveInLoadPhase: false },
        { id: 1, type: GameConst.POWER, color: GameConst.BLACK, figureName: 'default', attack: 10, health: 10, isActiveInLoadPhase: true },
        { id: 1, type: GameConst.BATTLE, color: GameConst.WHITE, figureName: 'default', attack: 10, health: 10, isActiveInLoadPhase: false },
        { id: 1, type: GameConst.POWER, color: GameConst.BROWN, figureName: 'default', attack: 10, health: 10, isActiveInLoadPhase: true },
      ],
      trash: [],
      energies: {
        [GameConst.RED]: 1,
        [GameConst.BLUE]: 1,
        [GameConst.GREEN]: 1,
        [GameConst.BLACK]: 1,
        [GameConst.WHITE]: 1,
      },
      victories: 0,
      passed: false,
    },
  };

  create() {
    this.phase = new LoadPhase(this._scene);
    this.manager.endPhase = this.createHandler();
    this.addAssistedHidden(this.phase);
  }

  start() {
    this._scene.setPhase(this.phase);
    this.phase.start(this.manager);
  }

  update() {
    this.phase.update(this.manager);
  }

  asserts() {
    this.describe('Deve apresentar etapas de fase de carregamento.');
    this.expectWasTrue('A janela de título foi apresentada?', this.phase.isTitleWindowVisible);
    this.expectWasTrue('A janela de descrição de sorteio foi apresentada?', this.phase.isDescriptionWindowVisible);
    this.expectWasTrue('A janela de texto de inicio de fase foi apresentada?', this.phase.isTextWindowVisible);
    this.expectWasTrue('A janela de pergunta foi apresentada?', this.phase.isAskWindowVisible);
    this.expectWasTrue('A janela de tabuleiro do jogador foi apresentado?', this.phase.isPlayerBoardWindowVisible);
    this.expectWasTrue('A janela de batalha do jogador foi apresentada?', this.phase.isPlayerBattleWindowVisible);
    this.expectWasTrue('A janela de lixo do jogador foi apresentada?', this.phase.isPlayerTrashWindowVisible);
    this.expectWasTrue('A janela de pontuação do jogador foi apresentada?', this.phase.isPlayerScoreWindowVisible);
    this.expectWasTrue('A janela de tabuleiro do desafiante foi apresentado?', this.phase.isChallengeBoardWindowVisible);
    this.expectWasTrue('A janela de batalha do desafiante foi apresentada?', this.phase.isChallengeBattleWindowVisible);
    this.expectWasTrue('A janela de lixo do desafiante foi apresentada?', this.phase.isChallengeTrashWindowVisible);
    this.expectWasTrue('A janela de pontuação do desafiante foi apresentada?', this.phase.isChallengeScoreWindowVisible);
    this.expectWasTrue('A janela de localização foi apresentada?', this.phase.isLocationWindowVisible);
    this.expectWasTrue('A janela de nome de cartão foi apresentada?', this.phase.isCardNameWindowVisible);
    this.expectWasTrue('A janela de descrição de cartão foi apresentada?', this.phase.isCardDescriptionWindowVisible);
    this.expectWasTrue('A janela de propriedades de cartão foi apresentada?', this.phase.isCardPropsWindowVisible);
    this.expectWasTrue('O campo de mão do jogador foi apresentado?', this.phase.isPlayerHandVisible);
    this.expectWasTrue('O campo de poder foi apresentado?', this.phase.isPowerFieldVisible);
  }
}


// STEPS
class ChallengePhaseDisplayStepTest extends SceneTest {
  manager = CardBattleManager;
  step;

  create() {
    const finish = this.createHandler();
    this.step = new DisplayStep(this._scene, finish);
    this.addAssistedHidden(this.step);
  }

  start() {
    this._scene.setPhase(GameConst.CHALLENGE_PHASE);
    this._scene.setStep(this.step);
    this.step.start(this.manager);
  }

  update() {
    this.step.update(this.manager);
  }
  
  asserts() {
    this.describe('Deve apresentar etapa de apresentação de desafiado.');
    this.expectWasTrue('A janela de título foi apresentada?', this.step.isTitleWindowVisible);
    this.expectWasTrue('A janela de descrição de desafiado foi apresentada?', this.step.isDescriptionWindowVisible);
  }
}
class ChallengePhaseFolderStepTest extends SceneTest {
  manager = CardBattleManager;
  step;

  create() {
    const finish = this.createHandler();
    this.step = new FolderStep(this._scene, finish);
    this.addAssistedHidden(this.step);
  }

  start() {
    this._scene.setPhase(GameConst.CHALLENGE_PHASE);
    this._scene.setStep(this.step);
    this.step.start(this.manager);
  }

  update() {
    this.step.update(this.manager);
  }
  
  asserts() {
    this.describe('Deve apresentar etapa de pastas de desafiado.');
    this.expectWasTrue('A janela de pastas foi apresentada?', this.step.isFolderWindowVisible);
  }
}
class StartPhaseDisplayStepTest extends SceneTest {
  manager = CardBattleManager;
  step;

  create() {
    const finish = this.createHandler();
    this.step = new DisplayStep(this._scene, finish);
    this.addAssistedHidden(this.step);
  }

  start() {
    this._scene.setPhase(GameConst.START_PHASE);
    this._scene.setStep(this.step);
    this.step.start(this.manager);
  }

  update() {
    this.step.update(this.manager);
  }
  
  asserts() {
    this.describe('Deve apresentar etapa de apresentação de início de batalha.');
    this.expectWasTrue('A janela de título foi apresentada?', this.step.isTitleWindowVisible);
    this.expectWasTrue('A janela de descrição de desafiado foi apresentada?', this.step.isDescriptionWindowVisible);
  }
}
class StartPhaseMiniGameStepTest extends SceneTest {
  manager = CardBattleManager;
  step;

  create() {
    const finish = this.createHandler();
    this.step = new MiniGameStep(this._scene, finish);
    this.addAssistedHidden(this.step);
  }

  start() {
    this._scene.setPhase(GameConst.START_PHASE);
    this._scene.setStep(this.step);
    this.step.start(this.manager);
  }

  update() {
    this.step.update(this.manager);
  }
  
  asserts() {
    this.describe('Deve apresentar etapa de mini game de início de batalha.');
    this.expectWasTrue('O set de cartas estava em modo seleção?', this.step.isCardsetVisible);
    this.expectWasTrue('A janela de resultado foi apresentada?', this.step.isResultWindowVisible);
    this.expectTrue('O resultado do jogo da sorte foi apresentado?', typeof this.manager.getWin() === 'boolean');
  }
}
class DrawPhaseDisplayStepTest extends SceneTest {
  manager = CardBattleManager;
  step;

  create() {
    const finish = this.createHandler();
    this.step = new DisplayStep(this._scene, finish);
    this.addAssistedHidden(this.step);
  }

  start() {
    this._scene.setPhase(GameConst.DRAW_PHASE);
    this._scene.setStep(this.step);
    this.step.start(this.manager);
  }

  update() {
    this.step.update(this.manager);
  }
  
  asserts() {
    this.describe('Deve apresentar etapa de apresentação de sacar cartas.');
    this.expectWasTrue('A janela de título foi apresentada?', this.step.isTitleWindowVisible);
    this.expectWasTrue('A janela de descrição de desafiado foi apresentada?', this.step.isDescriptionWindowVisible);
  }
}
class DrawPhaseDrawStepTest extends SceneTest {
  manager = CardBattleManager;
  step;

  create() {
    const finish = this.createHandler();
    this.step = new DrawStep(this._scene, finish);
    this.addAssistedHidden(this.step);
  }

  start() {
    this.manager.setPlayerDeck();
    this.manager.setChallengedDeck();
    this._scene.setPhase(GameConst.DRAW_PHASE);
    this._scene.setStep(this.step);
    this.step.start(this.manager);
  }

  update() {
    this.step.update(this.manager);
  }
  
  asserts() {
    this.describe('Deve apresentar etapa de saque de cartas e carregamento de energias.');
    this.expectWasTrue('A janela de tabuleiro do jogador foi apresentado?', this.step.isPlayerBoardWindowVisible);
    this.expectWasTrue('A janela de batalha do jogador foi apresentada?', this.step.isPlayerBattleWindowVisible);
    this.expectWasTrue('A janela de lixo do jogador foi apresentada?', this.step.isPlayerTrashWindowVisible);
    this.expectWasTrue('A janela de pontuação do jogador foi apresentada?', this.step.isPlayerScoreWindowVisible);
    this.expectWasTrue('O campo de batalha do jogador foi apresentado?', this.step.isPlayerBattlefieldVisible);
    this.expectWasTrue('A janela de tabuleiro do desafiante foi apresentado?', this.step.isChallengedBoardWindowVisible);
    this.expectWasTrue('A janela de batalha do desafiante foi apresentada?', this.step.isChallengedBattleWindowVisible);
    this.expectWasTrue('A janela de lixo do desafiante foi apresentada?', this.step.isChallengedTrashWindowVisible);
    this.expectWasTrue('A janela de pontuação do desafiante foi apresentada?', this.step.isChallengedScoreWindowVisible);
    this.expectWasTrue('O campo de batalha do desafiante foi apresentado?', this.step.isChallengedBattlefieldVisible);
    this.expectTrue('O total de cards no campo do jogar é?', this.manager.getPlayerDeckLength() === 34);
    this.expectTrue('O total de cards no campo do desafiante é?', this.manager.getChallengedDeckLength() === 34);
    this.expectTrue('O total de cards na mão do jogador é?', this.manager.getPlayerHandLength() === 6);
    this.expectTrue('O total de cards na mão do desafiante é?', this.manager.getChallengedHandLength() === 6);
  }
}
class LoadPhaseDisplayStepTest extends SceneTest {
  manager = CardBattleManager;
  step;

  create() {
    const finish = this.createHandler();
    this.step = new DisplayStep(this._scene, finish);
    this.addAssistedHidden(this.step);
  }

  start() {
    this._scene.setPhase(GameConst.LOAD_PHASE);
    this._scene.setStep(this.step);
    this.step.start(this.manager);
  }

  update() {
    this.step.update(this.manager);
  }
  
  asserts() {
    this.describe('Deve apresentar etapa de apresentação de carregar.');
    this.expectWasTrue('A janela de título foi apresentada?', this.step.isTitleWindowVisible);
    this.expectWasTrue('A janela de descrição de desafiado foi apresentada?', this.step.isDescriptionWindowVisible);
  }
}
class LoadPhaseTurnStepChallengedPassedTest extends SceneTest {
  manager = CardBattleManager;
  step;

  create() {
    const finish = this.createHandler();
    this.step = new TurnStep(this._scene, finish);
  }

  start() {
    this.manager.setPlayerDeck();
    this.manager.setChallengedDeck();
    const finish = this.createHandler();
    this.mockFunction(this.manager, 'challengedPassed', () => {
      this.manager.challenged.passed = true;
      finish();
    });
    this._scene.setPhase(GameConst.LOAD_PHASE);
    this._scene.setStep(this.step);
    this.step.start(this.manager);
  }

  update() {
    this.step.update(this.manager);
  }
  
  asserts() {
    this.describe('O desafiado deve passar a jogada na etapa de jogadas de fase de carregar.');
    this.expectTrue('O desafiado passou a jogada?', this.manager.isChallengedPassed());
  }
}
class LoadPhaseTurnStepPlayerPassedTest extends SceneTest {
  manager = CardBattleManager;
  step;

  create() {
    const finish = this.createHandler();
    this.step = new TurnStep(this._scene, finish);
  }

  start() {
    this.manager.setPlayerDeck();
    this.manager.setChallengedDeck();
    const finish = this.createHandler();
    this.mockFunction(this.manager, 'playerPassed', () => {
      this.manager.player.passed = true;
      finish();
    });
    this._scene.setPhase(GameConst.LOAD_PHASE);
    this._scene.setStep(this.step);
    this.step.start(this.manager);
  }

  update() {
    this.step.update(this.manager);
  }
  
  asserts() {
    this.describe('O jogador deve passar a jogada na etapa de jogadas de fase de carregar.');
    this.expectTrue('O jogador passou a jogada?', this.manager.isPlayerPassed());
  }
}
class LoadPhaseTurnStepPlayerStartFirstTest extends SceneTest {
  manager = CardBattleManager;
  step;
  turns = [];

  create() {
    const finish = this.createHandler();
    this.step = new TurnStep(this._scene, finish);
  }

  start() {
    this.manager.setPlayerDeck();
    this.manager.setChallengedDeck();
    const finish = this.createHandler();
    this.mockFunction(this.manager, 'playerStart', () => {
      this.turns.push(GameConst.PLAYER);
      this.manager.playerStartTurn = true;
    });
    this.mockFunction(this.manager, 'isPlayerStartTurn', () => {
      finish();
      return this.manager.playerStartTurn;
    });
    this.manager.playerStart();
    this._scene.setPhase(GameConst.LOAD_PHASE);
    this._scene.setStep(this.step);
    this.step.start(this.manager);
  }

  update() {
    this.step.update(this.manager);
  }
  
  asserts() {
    this.describe('O jogador deve iniciar a jogada na etapa de jogadas de fase de carregar.');
    this.expectTrue('O jogador iniciou a jogada?', this.turns[0] === GameConst.PLAYER);
  }
}
class LoadPhaseTurnStepPlayerPlaysNextTest extends SceneTest {
  manager = CardBattleManager;
  step;

  create() {
    const finish = this.createHandler();
    this.step = new TurnStep(this._scene, finish);
  }

  start() {
    this.manager.setPlayerDeck();
    this.manager.setChallengedDeck();
    this._scene.setPhase(GameConst.LOAD_PHASE);
    this._scene.setStep(this.step);
    this.step.start(this.manager);
  }

  update() {
    this.step.update(this.manager);
  }
  
  asserts() {
    this.describe('O jogador não deve iniciar a jogada na etapa de jogadas de fase de carregar.');
    this.expectTrue('O jogador não iniciou a jogada?', this.manager.isPlayerStartTurn() === false);
  }
}
class LoadPhaseTurnStepPowerfieldActiveTest extends SceneTest {
  manager = CardBattleManager;
  step;

  create() {
    const finish = this.createHandler();
    this.step = new TurnStep(this._scene, finish);
  }

  start() {
    this.manager.playerPassed();
    this.manager.challengedPassed();
    const powerCard = { type: GameConst.POWER, color: GameConst.BLACK, figureName: 'default', attack: 10, health: 10 };
    this.manager.addPowerCardToPowerfield(powerCard);
    this._scene.setPhase(GameConst.LOAD_PHASE);
    this._scene.setStep(this.step);
    this.step.start(this.manager);
  }

  update() {
    this.step.update(this.manager);
  }
  
  asserts() {
    this.describe('A fase campo de poder deve ser ativada tendo pelo menos um cartão de poder!');
    this.expectTrue('Esta na fase campo de poder?', this._scene.isCurrentStep(PowerfieldStep));
  }
}
class LoadPhaseTurnStepPowerfieldActiveByLimitTest extends SceneTest {
  manager = CardBattleManager;
  step;

  create() {
    const finish = this.createHandler();
    this.step = new TurnStep(this._scene, finish);
  }

  start() {
    const powerCard = { type: GameConst.POWER, color: GameConst.BLACK, figureName: 'default', attack: 10, health: 10 };
    this.manager.addPowerCardToPowerfield(powerCard);
    this.manager.addPowerCardToPowerfield(powerCard);
    this.manager.addPowerCardToPowerfield(powerCard);
    this._scene.setPhase(GameConst.LOAD_PHASE);
    this._scene.setStep(this.step);
    this.step.start(this.manager);
  }

  update() {
    this.step.update(this.manager);
  }
  
  asserts() {
    this.describe('A fase campo de poder deve ser ativada tendo pelo menos um cartão de poder!');
    this.expectTrue('O campo de poder esta com 3 cartões?', this.manager.getPowerfieldLength() === 3);
    this.expectTrue('Esta na fase campo de poder?', this._scene.isCurrentStep(PowerfieldStep));
    
  }
}

class CardBattleManager {
  static folders = [
    {
      name: 'Folder 1',
      energies: [10, 10, 5, 5, 5, 5],
      set: [
        { type: GameConst.BATTLE, color: GameConst.RED, figureName: 'default', attack: 10, health: 10 },
        { type: GameConst.POWER, color: GameConst.GREEN, figureName: 'default', attack: 10, health: 10 },
        { type: GameConst.BATTLE, color: GameConst.BLUE, figureName: 'default', attack: 10, health: 10 },
        { type: GameConst.POWER, color: GameConst.BLACK, figureName: 'default', attack: 10, health: 10 },
        { type: GameConst.BATTLE, color: GameConst.WHITE, figureName: 'default', attack: 10, health: 10 },
        { type: GameConst.POWER, color: GameConst.BROWN, figureName: 'default', attack: 10, health: 10 },
        { type: GameConst.BATTLE, color: GameConst.RED, figureName: 'default', attack: 10, health: 10 },
        { type: GameConst.POWER, color: GameConst.GREEN, figureName: 'default', attack: 10, health: 10 },
        { type: GameConst.BATTLE, color: GameConst.BLUE, figureName: 'default', attack: 10, health: 10 },
        { type: GameConst.POWER, color: GameConst.BLACK, figureName: 'default', attack: 10, health: 10 },
        { type: GameConst.BATTLE, color: GameConst.WHITE, figureName: 'default', attack: 10, health: 10 },
        { type: GameConst.POWER, color: GameConst.BROWN, figureName: 'default', attack: 10, health: 10 },
        { type: GameConst.BATTLE, color: GameConst.RED, figureName: 'default', attack: 10, health: 10 },
        { type: GameConst.POWER, color: GameConst.GREEN, figureName: 'default', attack: 10, health: 10 },
        { type: GameConst.BATTLE, color: GameConst.BLUE, figureName: 'default', attack: 10, health: 10 },
        { type: GameConst.POWER, color: GameConst.BLACK, figureName: 'default', attack: 10, health: 10 },
        { type: GameConst.BATTLE, color: GameConst.WHITE, figureName: 'default', attack: 10, health: 10 },
        { type: GameConst.POWER, color: GameConst.BROWN, figureName: 'default', attack: 10, health: 10 },
        { type: GameConst.BATTLE, color: GameConst.RED, figureName: 'default', attack: 10, health: 10 },
        { type: GameConst.POWER, color: GameConst.GREEN, figureName: 'default', attack: 10, health: 10 },
        { type: GameConst.BATTLE, color: GameConst.BLUE, figureName: 'default', attack: 10, health: 10 },
        { type: GameConst.POWER, color: GameConst.BLACK, figureName: 'default', attack: 10, health: 10 },
        { type: GameConst.BATTLE, color: GameConst.WHITE, figureName: 'default', attack: 10, health: 10 },
        { type: GameConst.POWER, color: GameConst.BROWN, figureName: 'default', attack: 10, health: 10 },
        { type: GameConst.BATTLE, color: GameConst.RED, figureName: 'default', attack: 10, health: 10 },
        { type: GameConst.POWER, color: GameConst.GREEN, figureName: 'default', attack: 10, health: 10 },
        { type: GameConst.BATTLE, color: GameConst.BLUE, figureName: 'default', attack: 10, health: 10 },
        { type: GameConst.POWER, color: GameConst.BLACK, figureName: 'default', attack: 10, health: 10 },
        { type: GameConst.BATTLE, color: GameConst.WHITE, figureName: 'default', attack: 10, health: 10 },
        { type: GameConst.POWER, color: GameConst.BROWN, figureName: 'default', attack: 10, health: 10 },
        { type: GameConst.BATTLE, color: GameConst.RED, figureName: 'default', attack: 10, health: 10 },
        { type: GameConst.POWER, color: GameConst.GREEN, figureName: 'default', attack: 10, health: 10 },
        { type: GameConst.BATTLE, color: GameConst.BLUE, figureName: 'default', attack: 10, health: 10 },
        { type: GameConst.POWER, color: GameConst.BLACK, figureName: 'default', attack: 10, health: 10 },
        { type: GameConst.BATTLE, color: GameConst.WHITE, figureName: 'default', attack: 10, health: 10 },
        { type: GameConst.POWER, color: GameConst.BROWN, figureName: 'default', attack: 10, health: 10 },
        { type: GameConst.BATTLE, color: GameConst.RED, figureName: 'default', attack: 10, health: 10 },
        { type: GameConst.POWER, color: GameConst.GREEN, figureName: 'default', attack: 10, health: 10 },
        { type: GameConst.BATTLE, color: GameConst.BLUE, figureName: 'default', attack: 10, health: 10 },
        { type: GameConst.POWER, color: GameConst.BLACK, figureName: 'default', attack: 10, health: 10 },
      ]
    }, {
      name: 'Folder 2',
      energies: [10, 10, 10, 10, 10, 10],
      set: []
    }, {
      name: 'Folder 3',
      energies: [10, 10, 10, 0, 0, 0],
      set: []
  }];

  static folderIndex = -1;

  static miniGameWin = false;

  static playerStartTurn = false;

  static player = {
    deck: [],
    hand: [],
    trash: [],
    energies: {
      [GameConst.RED]: 0,
      [GameConst.BLUE]: 0,
      [GameConst.GREEN]: 0,
      [GameConst.BLACK]: 0,
      [GameConst.WHITE]: 0,
    },
    victories: 0,
    passed: false,
  };

  static challenged = {
    deck: [],
    hand: [],
    trash: [],
    energies: {
      [GameConst.RED]: 0,
      [GameConst.BLUE]: 0,
      [GameConst.GREEN]: 0,
      [GameConst.BLACK]: 0,
      [GameConst.WHITE]: 0,
    },
    victories: 0,
    passed: false,
  };

  static powerfield = [];

  static getChallengeDescription () {
    return 'descrição de desafiado, variando de acordo com o desafio.';
  }

  static setPlayerFolderIndex(index) {
    return CardBattleManager.folderIndex = index;
  }

  static getPlayerFolders() {
    return CardBattleManager.folders;
  }

  static getWin() {
    return CardBattleManager.miniGameWin;
  }

  static getPowerfieldLength() {
    return CardBattleManager.powerfield.length;
  }

  static getPlayerDeck() {
    return CardBattleManager.player.deck;
  }

  static getPlayerHand() {
    return CardBattleManager.player.hand;
  }

  static getPlayerEnergies() {
    return CardBattleManager.player.energies;
  }

  static getPlayerDeckLength() {
    return CardBattleManager.player.deck.length;
  }

  static getPlayerHandLength() {
    return CardBattleManager.player.hand.length;
  }

  static getPlayerTrashLength() {
    return CardBattleManager.player.trash.length;
  }

  static getPlayerVictories() {
    return CardBattleManager.player.victories;
  }

  static getChallengedDeck() {
    return CardBattleManager.challenged.deck;
  }

  static getChallengedHand() {
    return CardBattleManager.challenged.hand;
  }

  static getChallengedEnergies() {
    return CardBattleManager.challenged.energies;
  }

  static getChallengedDeckLength() {
    return CardBattleManager.challenged.deck.length;
  }

  static getChallengedHandLength() {
    return CardBattleManager.challenged.hand.length;
  }

  static getChallengedTrashLength() {
    return CardBattleManager.challenged.trash.length;
  }

  static getChallengedVictories() {
    return CardBattleManager.challenged.victories;
  }

  static setPlayerHand(hand) {
    CardBattleManager.player.hand = hand;
  }

  static setPlayerEnergies(energies) {
    CardBattleManager.player.energies = energies;
  }

  static setChallengedHand(hand) {
    CardBattleManager.challenged.hand = hand;
  }

  static setChallengedEnergies(energies) {
    CardBattleManager.challenged.energies = energies;
  }

  static playerStart() {
    CardBattleManager.playerStartTurn = true;
  }

  static playerPassed() {
    CardBattleManager.player.passed = true;
  }

  static challengedPassed() {
    CardBattleManager.challenged.passed = true;
  }

  static isPlayerStartTurn() {
    return CardBattleManager.playerStartTurn;
  }

  static isPlayerPassed() {
    return CardBattleManager.player.passed;
  }

  static isChallengedPassed() {
    return CardBattleManager.challenged.passed;
  }

  static reset() {
    CardBattleManager.folderIndex = -1;
    CardBattleManager.miniGameWin = false;
    CardBattleManager.playerStartTurn = false;
    CardBattleManager.player = {
      deck: [],
      hand: [],
      trash: [],
      energies: {
        [GameConst.RED]: 0,
        [GameConst.BLUE]: 0,
        [GameConst.GREEN]: 0,
        [GameConst.BLACK]: 0,
        [GameConst.WHITE]: 0,
      },
      victories: 0,
      passed: false,
    };
    CardBattleManager.challenged = {
      deck: [],
      hand: [],
      trash: [],
      energies: {
        [GameConst.RED]: 0,
        [GameConst.BLUE]: 0,
        [GameConst.GREEN]: 0,
        [GameConst.BLACK]: 0,
        [GameConst.WHITE]: 0,
      },
      victories: 0,
      passed: false,
    };
  }

  static setPlayerDeck(folderIndex = 0) {
    CardBattleManager.player.deck = CardBattleManager.folders[folderIndex].set.clone();
  }

  static setChallengedDeck(folderIndex = 0) {
    CardBattleManager.challenged.deck = CardBattleManager.folders[folderIndex].set.clone();
  }

  static addPowerCardToPowerfield(card) {
    CardBattleManager.powerfield.push(card);
  }
}
class Step {
  _scene;
  _actionsQueue = [];
  _wait = 0;
  _player = {
    boardWindow: {},
    battleWindow: {},
    trashWindow: {},
    scoreWindow: {},
    battlefield: {},
  };
  _challenged = {
    boardWindow: {},
    battleWindow: {},
    trashWindow: {},
    scoreWindow: {},
    battlefield: {},
  };
  _powerfield = {};
  _finish = null;

  constructor(scene, finish) {
    if ((scene instanceof Scene_Message) === false) {
      throw new Error('Scene must be an instance of Scene_Message');
    }
    this._scene = scene;
    this._finish = finish;
  }

  update() {
    if (this._wait > 0) return this._wait--;
    if (this.hasActions() && this.isAvailable()) this.executeAction();
  }

  hasActions() {
    return this._actionsQueue.length > 0;
  }

  isAvailable() {
    return this.isBusy() === false;
  }

  isBusy() {
    const children = [
      this._player.boardWindow,
      this._player.battleWindow,
      this._player.trashWindow,
      this._player.scoreWindow,
      this._player.battlefield,
      this._challenged.boardWindow,
      this._challenged.battleWindow,
      this._challenged.trashWindow,
      this._challenged.scoreWindow,
      this._challenged.battlefield,
    ];
    return this._wait > 0 || children.some(obj => (obj?.isBusy ? obj.isBusy() : false)) || this.someChildrenIsBusy();
  }

  someChildrenIsBusy() {
    if (!this._scene.children || this._scene.children.length === 0) return false;
    return this._scene.children.some(sprite => {
      return (sprite instanceof CardsetSprite) && (sprite.hasCommands() || sprite.isBusy());
    });
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
    const actions = ArrayHelper.toArray(action);
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
    actions = ArrayHelper.toArray(actions);
    actions = actions.map((fn, ...params) => {
      if (Array.isArray(fn)) return this.createAction(fn[0], ...fn.slice(1));
      return this.createAction(fn)
    });
    this._actionsQueue.push(actions);
  }

  addWait(seconds = 0.6) {
    this.addAction(this.commandWait, seconds);
  }

  commandWait(seconds) {
    this._wait = seconds * GameConst.FPS;
  }

  addChild(child) {
    this.addAction(this.commandAddChild, child);
  }

  commandAddChild(child) {
    if (child instanceof Window_Base) {
      this._scene.addWindow(child);
    } else {
      this._scene.addChild(child);
    }
  }

  removeChildren(children) {
    children.forEach(child => this.removeChild(child));
  }

  removeChild(child) {
    this.addAction(this.commandRemoveChild, child);
  }

  commandRemoveChild(child) {
    if (child instanceof Window_Base) {
      this._scene.addWindow(child);
    } else {
      this._scene.removeChild(child);
    }
  }

  changePhase(phase) {
    this._scene.setPhase(phase);
  }

  changeStep(stepName) {
    const step = new stepName(this._scene);
    this._scene.setStep(step);
  }

  destroy() {
    this._actionsQueue = [];
    this._wait = 0;
    this._player = {};
    this._challenged = {};
    this._powerfield = {};
    this._finish = null;
  }

  getPhase() {
    return this._scene.getPhase();
  }

  createPlayerGameBoard(manager) {
    const energies = Object.values(manager.getPlayerEnergies());
    const cardsInDeck = manager.getPlayerDeckLength();
    const cardsInHand = manager.getPlayerHandLength();
    const cardsInTrash = manager.getPlayerTrashLength();
    const victories = manager.getPlayerVictories();
    const passed = manager.isPlayerPassed();
    const boardWindow = this.createPlayerBoardWindow(energies, cardsInDeck, cardsInHand, passed);
    const boardWindowHeight = boardWindow.height;
    const battleWindow = this.createPlayerBattleWindow(boardWindowHeight);
    const trashWindow = this.createPlayerTrashWindow(cardsInTrash);
    const scoreWindow = this.createPlayerScoreWindow(victories, boardWindowHeight);
    const battlefield = this.createPlayerBattlefield();
  }

  createPlayerBoardWindow(energies, cardsInDeck, cardsInHand, passed = false) {
    const boardWindow = BoardWindow.create(0, 0);
    boardWindow.changeBlueColor();
    boardWindow.alignStartBottom();
    const points = [...energies, cardsInDeck, cardsInHand];
    boardWindow.refreshPoints(...points);
    if (passed) boardWindow.pass();
    this.addAction(this.commandCreatePlayerBoardWindow, boardWindow);
    return boardWindow;
  }

  commandCreatePlayerBoardWindow(boardWindow) {
    this._player.boardWindow = boardWindow;
    this.commandAddChild(boardWindow);
  }

  createPlayerBattleWindow(height = this._player.boardWindow.height) {
    const battleWindow = BattlePointsWindow.create(0, 0);
    battleWindow.changeBlueColor();
    battleWindow.alignStartBottom();
    const y = ScreenHelper.getBottomPosition(height);
    battleWindow.alignAboveOf({ y, height });
    battleWindow.refresh();
    this.addAction(this.commandCreatePlayerBattleWindow, battleWindow);
    return battleWindow;
  }

  commandCreatePlayerBattleWindow(battleWindow) {
    this._player.battleWindow = battleWindow;
    this.commandAddChild(this._player.battleWindow);
  }

  createPlayerTrashWindow(cardsInTrash) {
    const trashWindow = TrashWindow.create(0, 0);
    trashWindow.changeBlueColor();
    trashWindow.alignEndBelowMiddle();
    trashWindow.refreshPoints(cardsInTrash);
    this.addAction(this.commandCreatePlayerTrashWindow, trashWindow);
    return trashWindow;
  }

  commandCreatePlayerTrashWindow(trashWindow) {
    this._player.trashWindow = trashWindow;
    this.commandAddChild(trashWindow);
  }

  createPlayerScoreWindow(victories, height = this._player.boardWindow.height) {
    const scoreWindow = ScoreWindow.create(0, 0);
    scoreWindow.changeBlueColor();
    scoreWindow.alignEndBottom();
    const y = ScreenHelper.getBottomPosition(height);
    scoreWindow.alignAboveOf({ y, height });
    scoreWindow.refreshScore(victories);
    this.addAction(this.commandCreatePlayerScoreWindow, scoreWindow);
    return scoreWindow;
  }

  commandCreatePlayerScoreWindow(scoreWindow) {
    this._player.scoreWindow = scoreWindow;
    this.commandAddChild(scoreWindow);
  }

  createPlayerBattlefield() {
    const paddingLeft = this.getPaddingLeftBattleField();
    const battlefield = CardsetSprite.create(paddingLeft, 0);
    const height = 120;
    const y = ScreenHelper.getBottomPosition(height);
    battlefield.alignAboveOf({ y, height });
    this.addAction(this.commandCreatePlayerBattlefield, battlefield);
    return battlefield;
  }

  getPaddingLeftBattleField() {
    const fieldWidth = ScreenHelper.getFieldWidth();
    const battlefieldWidth = CardsetSprite.contentOriginalWidth();
    const paddingLeft = (fieldWidth - battlefieldWidth) / 2;
    return paddingLeft;
  }

  commandCreatePlayerBattlefield(battlefield) {
    this._player.battlefield = battlefield;
    this.commandAddChild(battlefield);
  }

  createChallengedGameBoard(manager) {
    const energies = Object.values(manager.getChallengedEnergies());
    const cardsInDeck = manager.getChallengedDeckLength();
    const cardsInHand = manager.getChallengedHandLength();
    const cardsInTrash = manager.getChallengedTrashLength();
    const victories = manager.getChallengedVictories();
    const passed = manager.isChallengedPassed();
    const boardWindow = this.createChallengedBoardWindow(energies, cardsInDeck, cardsInHand, passed);
    const boardWindowHeight = boardWindow.height;
    const battleWindow = this.createChallengedBattleWindow(boardWindowHeight);
    const trashWindow = this.createChallengedTrashWindow(cardsInTrash);
    const scoreWindow = this.createChallengedScoreWindow(victories, boardWindowHeight);
    const battlefield = this.createChallengedBattlefield();
  }

  createChallengedBoardWindow(energies, cardsInDeck, cardsInHand, passed = false) {
    const boardWindow = BoardWindow.create(0, 0);
    boardWindow.changeRedColor();
    boardWindow.alignStartTop();
    const points = [...energies, cardsInDeck, cardsInHand];
    boardWindow.refreshPoints(...points);
    if (passed) boardWindow.pass();
    this.addAction(this.commandCreateChallengedBoardWindow, boardWindow);
    return boardWindow;
  }

  commandCreateChallengedBoardWindow(boardWindow) {
    this._challenged.boardWindow = boardWindow;
    this.commandAddChild(boardWindow);
  }

  createChallengedBattleWindow(height = this._challenged.boardWindow.height) {
    const battleWindow = BattlePointsWindow.create(0, 0);
    battleWindow.changeRedColor();
    battleWindow.alignStartTop();
    const y = ScreenHelper.getTopPosition();
    battleWindow.alignBelowOf({ y, height });
    battleWindow.refresh();
    this.addAction(this.commandCreateChallengedBattleWindow, battleWindow);
    return battleWindow;
  }

  commandCreateChallengedBattleWindow(battleWindow) {
    this._challenged.battleWindow = battleWindow;
    this.commandAddChild(battleWindow);
  }

  createChallengedTrashWindow(cardsInTrash) {
    const trashWindow = TrashWindow.create(0, 0);
    trashWindow.changeRedColor();
    trashWindow.alignEndAboveMiddle();
    trashWindow.reverseIcons();
    trashWindow.refreshPoints(cardsInTrash);
    this.addAction(this.commandCreateChallengedTrashWindow, trashWindow);
    return trashWindow;
  }

  commandCreateChallengedTrashWindow(trashWindow) {
    this._challenged.trashWindow = trashWindow;
    this.commandAddChild(trashWindow);
  }

  createChallengedScoreWindow(victories, height = this._challenged.boardWindow.height) {
    const scoreWindow = ScoreWindow.create(0, 0);
    scoreWindow.changeRedColor();
    scoreWindow.alignEndTop();
    const y = ScreenHelper.getTopPosition();
    scoreWindow.alignBelowOf({ y, height });
    scoreWindow.refreshScore(victories);
    this.addAction(this.commandCreateChallengedScoreWindow, scoreWindow);
    return scoreWindow;
  }

  commandCreateChallengedScoreWindow(scoreWindow) {
    this._challenged.scoreWindow = scoreWindow;
    this.commandAddChild(scoreWindow);
  }

  createChallengedBattlefield() {
    const paddingLeft = this.getPaddingLeftBattleField();
    const battlefield = CardsetSprite.create(paddingLeft, 0);
    const height = 128;
    const y = ScreenHelper.getTopPosition();
    battlefield.alignBelowOf({ y, height });
    this.addAction(this.commandCreateChallengedBattlefield, battlefield);
    return battlefield;
  }

  commandCreateChallengedBattlefield(battlefield) {
    this._challenged.battlefield = battlefield;
    this.commandAddChild(battlefield);
  }

  createPowerfield(cards) {
    const x = ScreenHelper.getCenterPosition(CardsetSprite.contentOriginalWidth());
    const y = ScreenHelper.getMiddlePosition(CardsetSprite.contentOriginalHeight());
    const powerfield = CardsetSprite.create(x, y);
    powerfield.show();
    const xCard = CardsetSprite.contentOriginalWidth() - CardSprite.contentOriginalWidth();
    const sprites = powerfield.setCards(cards, xCard);
    powerfield.startClosedCards(sprites);
    this.addAction(this.commandCreatePowerfield, powerfield);
    return powerfield;
  }

  commandCreatePowerfield(powerfield) {
    this._powerfield = powerfield;
    this.commandAddChild(powerfield);
  }

  getPlayerBoardWindow() {
    return this._player.boardWindow;
  }

  getPlayerBattleWindow() {
    return this._player.battleWindow;
  }

  getPlayerTrashWindow() {
    return this._player.trashWindow;
  }

  getPlayerScoreWindow() {
    return this._player.scoreWindow;
  }

  getPlayerBattlefield() {
    return this._player.battlefield;
  }

  getChallengedBoardWindow() {
    return this._challenged.boardWindow;
  }

  getChallengedBattleWindow() {
    return this._challenged.battleWindow;
  }

  getChallengedTrashWindow() {
    return this._challenged.trashWindow;
  }

  getChallengedScoreWindow() {
    return this._challenged.scoreWindow;
  }

  getChallengedBattlefield() {
    return this._challenged.battlefield;
  }

  openGameBoards() {
    this.addActions([
      this.commandOpenPlayerGameBoard,
      this.commandOpenChallengedGameBoard,
    ]);
  }

  commandOpenPlayerGameBoard() {
    this.commandOpenPlayerBoardWindow();
    this.commandOpenPlayerBattleWindow();
    this.commandOpenPlayerTrashWindow();
    this.commandOpenPlayerScoreWindow();
    this.commandOpenPlayerBattlefield();
  }

  commandOpenPlayerBoardWindow() {
    this._player.boardWindow.open();
  }

  commandOpenPlayerBattleWindow() {
    this._player.battleWindow.open();
  }

  commandOpenPlayerTrashWindow() {
    this._player.trashWindow.open();
  }

  commandOpenPlayerScoreWindow() {
    this._player.scoreWindow.open();
  }

  commandOpenPlayerBattlefield() {
    this._player.battlefield.openCards();
  }
  
  commandOpenChallengedGameBoard() {
    this.commandOpenChallengedBoardWindow();
    this.commandOpenChallengedBattleWindow();
    this.commandOpenChallengedTrashWindow();
    this.commandOpenChallengedScoreWindow();
    this.commandOpenChallengedBattlefield();
  }

  commandOpenChallengedBoardWindow() {
    this._challenged.boardWindow.open();
  }

  commandOpenChallengedBattleWindow() {
    this._challenged.battleWindow.open();
  }

  commandOpenChallengedTrashWindow() {
    this._challenged.trashWindow.open();
  }

  commandOpenChallengedScoreWindow() {
    this._challenged.scoreWindow.open();
  }

  commandOpenChallengedBattlefield() {
    this._challenged.battlefield.openCards();
  }

  closeGameBoards() {
    this.addActions([
      this.closePlayerGameBoard,
      this.closeChallengedGameBoard
    ]);
  }

  closePlayerGameBoard() {
    this.commandClosePlayerBoardWindow();
    this.commandClosePlayerBattleWindow();
    this.commandClosePlayerTrashWindow();
    this.commandClosePlayerScoreWindow();
    this.commandClosePlayerBattlefield();
  }

  commandClosePlayerBoardWindow() {
    this._player.boardWindow.close();
  }

  commandClosePlayerBattleWindow() {
    this._player.battleWindow.close();
  }

  commandClosePlayerTrashWindow() {
    this._player.trashWindow.close();
  }

  commandClosePlayerScoreWindow() {
    this._player.scoreWindow.close();
  }

  commandClosePlayerBattlefield() {
    this._player.battlefield.closeCards();
  }

  closeChallengedGameBoard() {
    this.commandCloseChallengedBoardWindow();
    this.commandCloseChallengedBattleWindow();
    this.commandCloseChallengedTrashWindow();
    this.commandCloseChallengedScoreWindow();
    this.commandCloseChallengedBattlefield();
  }

  commandCloseChallengedBoardWindow() {
    this._challenged.boardWindow.close();
  }

  commandCloseChallengedBattleWindow() {
    this._challenged.battleWindow.close();
  }

  commandCloseChallengedTrashWindow() {
    this._challenged.trashWindow.close();
  }

  commandCloseChallengedScoreWindow() {
    this._challenged.scoreWindow.close();
  }

  commandCloseChallengedBattlefield() {
    this._challenged.battlefield.closeCards();
  }

  leaveGameBoards() {
    this.addAction(this.commandLeaveGameBoards);
  }

  commandLeaveGameBoards() {
    this.removeChildren([
      this._player.boardWindow,
      this._player.battleWindow,
      this._player.trashWindow,
      this._player.scoreWindow,
      this._player.battlefield,
      this._challenged.boardWindow,
      this._challenged.battleWindow,
      this._challenged.trashWindow,
      this._challenged.scoreWindow,
      this._challenged.battlefield,
    ]);
  }

  commandShowChallengedBattlefield() {
    this._challenged.battlefield.show();
  }

  commandSetCardsChallengedBattlefield(cards, screenWidth) {
    return this._challenged.battlefield.setCards(cards, screenWidth)
  }

  commandShowCardsChallengedBattlefield(sprites) {
    this._challenged.battlefield.showCards(sprites);
  }

  commandSetTurnToDownCardsChallengedBattlefield(sprites) {
    this._challenged.battlefield.setTurnToDownCards(sprites);
  }

  commandMoveCardsInlistChallengedBattlefield(sprites, delay, fieldUpdates) {
    this._challenged.battlefield.moveCardsInlist(sprites, delay, fieldUpdates);
  }

  commandFlashCardsAnimateChallengedBattlefield(sprites, color, duration, times, trigger) {
    this._challenged.battlefield.flashCardsAnimate(sprites, color, duration, times, trigger);
  }

  commandGetSpritesChallengedBattlefield() {
    return this._challenged.battlefield.getSprites();
  }

  playerBoardWindowPass() {
    this.addAction(this.commandPlayerBoardWindowPass);
  }

  commandPlayerBoardWindowPass() {
    this._player.boardWindow.pass();
  }

  challengedBoardWindowPass() {
    this.addAction(this.commandChallengedBoardWindowPass);
  }

  commandChallengedBoardWindowPass() {
    this._challenged.boardWindow.pass();
  }

  isPlayerBoardWindowVisible() {
    return this._player.boardWindow.visible;
  }

  isChallengedBoardWindowVisible() {
    return this._challenged.boardWindow.visible;
  }

  isPlayerBattleWindowVisible() {
    return this._player.battleWindow.visible;
  }

  isChallengedBattleWindowVisible() {
    return this._challenged.battleWindow.visible;
  }

  isPlayerTrashWindowVisible() {
    return this._player.trashWindow.visible;
  }

  isChallengedTrashWindowVisible() {
    return this._challenged.trashWindow.visible;
  }

  isPlayerScoreWindowVisible() {
    return this._player.scoreWindow.visible;
  }

  isChallengedScoreWindowVisible() {
    return this._challenged.scoreWindow.visible;
  }

  isPlayerBattlefieldVisible() {
    return this._player.battlefield.visible;
  }

  isChallengedBattlefieldVisible() {
    return this._challenged.battlefield.visible;
  }
}
class DisplayStep extends Step {
  _titleWindow = {};
  _descriptionWindow = {};

  start(manager) {
    const phase = this.getPhase();
    const title = this.getPhaseTitle(phase);
    const description = this.getPhaseDescription(phase, manager);
    this.createTitleWindow(title);
    this.createDescriptionWindow(description);
    this.openTextWindows();
  }

  getPhaseTitle(phase) {
    switch (phase) {
      case GameConst.CHALLENGE_PHASE:
        return 'Challenge Phase';
        break;
      case GameConst.START_PHASE:
        return 'Start Phase';
        break;
      case GameConst.DRAW_PHASE:
        return 'Draw Phase';
        break; 
      case GameConst.LOAD_PHASE:
        return 'Load Phase';
        break;
      default:
        return 'Unknown Phase';
        break;
    }
  }

  getPhaseDescription(phase, manager) {
    switch (phase) {
      case GameConst.CHALLENGE_PHASE:
        return manager.getChallengeDescription();
        break;
      case GameConst.START_PHASE:
        return 'Draw Calumon to go first.';
        break;
      case GameConst.DRAW_PHASE:
        return '6 cards will be drawn.';
        break;
      case GameConst.LOAD_PHASE:
        return 'Select and use a Program Card.';
        break;
      default:
        return 'Unknown Phase';
        break;
    }
  }

  createTitleWindow(text) {
    const title = TextWindow.setTextColor(text, GameColors.ORANGE);
    const titleWindow = TextWindow.createWindowFullSize(0, 0, [title]);
    titleWindow.alignBelowOf({ y: 200, height: 0 });
    titleWindow.alignTextCenter();
    this.addAction(this.commandCreateTitleWindow, titleWindow);
    return titleWindow;
  }

  commandCreateTitleWindow(titleWindow) {
    this._titleWindow = titleWindow;
    this.commandAddChild(titleWindow);
  }

  createDescriptionWindow(...texts) {
    const maxSize = 3;
    const heightLines = Array(maxSize).fill('\n');
    const content = [...texts, ...heightLines];
    const maxContent = content.slice(0, maxSize);
    const descriptionWindow = TextWindow.createWindowFullSize(0, 0, maxContent);
    descriptionWindow.alignCenterBelowMiddle();
    this.addAction(this.commandCreateDescriptionWindow, descriptionWindow);
    return descriptionWindow;
  }

  commandCreateDescriptionWindow(descriptionWindow) {
    this._descriptionWindow = descriptionWindow;
    this.commandAddChild(descriptionWindow);
  }

  openTextWindows() {
    this.addActions([
      this.commandOpenTitleWindow,
      this.commandOpenDescriptionWindow,
    ]);
  }

  commandOpenTitleWindow() {
    this._titleWindow.open();
  }

  commandOpenDescriptionWindow() {
    this._descriptionWindow.open();
  }

  update(manager) {
    super.update();
    if (this.isBusy() || this.hasActions()) return false;
    if (Input.isTriggered('ok')) {
      const phase = this.getPhase();
      this.commandCloseTextWindows();
      this.leaveTextWindows();
      this.addWait();
      this.addAction(this.finish, phase);
    }
  }

  commandCloseTextWindows() {
    this.commandCloseTitleWindow();
    this.commandCloseDescriptionWindow();
  }

  commandCloseTitleWindow() {
    this._titleWindow.close();
  } 

  commandCloseDescriptionWindow() {
    this._descriptionWindow.close();
  }

  leaveTextWindows() {
    this.addAction(this.commandLeaveTextWindows);
  }

  commandLeaveTextWindows() {
    this.removeChildren([
      this._titleWindow,
      this._descriptionWindow,
    ]);
  }

  finish(phase) {
    if (typeof this._finish === 'function') return this._finish();
    switch (phase) {
      case null:
        break;
      default:
        break;
    }
  }

  isBusy() {
    const children = [
      this._titleWindow,
      this._descriptionWindow,
    ];
    return super.isBusy() || children.some(obj => (obj.isBusy ? obj.isBusy() : false));
  }

  isTitleWindowVisible() {
    return this._titleWindow.visible;
  }

  isDescriptionWindowVisible() {
    return this._descriptionWindow.visible;
  }
  
}
class FolderStep extends Step {
  _folderWindow = {};

  start(manager) {
    const phase = this.getPhase();
    const selectHandler = (folderIndex) => {
      manager.setPlayerFolderIndex(folderIndex);
      this.commandCloseFolderWindow();
      this.leaveFolderWindow();
      this.addAction(this.finish, phase);
    };
    let folders = manager.getPlayerFolders();
    folders = folders.map(folder => {
      folder.handler = selectHandler;
      return folder;
    });
    const folderWindow = this.createFolderWindow('Choose a folder', folders);
    this.addWait();
    this.openFolderWindow();
  }

  createFolderWindow(text, folders) {
    const energies = folders.map(folder => FolderWindow.createEnergies(...folder.energies));
    const commands = folders.map((folder, index) => {
      return FolderWindow.createCommand(folder.name, `FOLDER_${index}`, folder.handler, energies[index])
    });
    const title = CommandWindow.setTextColor(text, GameColors.ORANGE);
    const folderWindow = FolderWindow.create(0, 0, [title], commands);
    folderWindow.alignMiddle();
    folderWindow.alignTextCenter();
    this.addAction(this.commandCreateFolderWindow, folderWindow);
    return folderWindow;
  }

  commandCreateFolderWindow(folderWindow) {
    this._folderWindow = folderWindow
    this.commandAddChild(folderWindow);
  }

  openFolderWindow() {
    this.addAction(this.commandOpenFolderWindow);
  }

  commandOpenFolderWindow() {
    this._folderWindow.open();
  }

  commandCloseFolderWindow() {
    this._folderWindow.close();
  }

  leaveFolderWindow() {
    this.addAction(this.commandLeaveFolderWindow);
  }

  commandLeaveFolderWindow() {
    this.removeChild(this._folderWindow);
  }

  finish(phase) {
    if (typeof this._finish === 'function') return this._finish();
    switch (phase) {
      case null:
        break;
      default:
        break;
    }
  }

  isBusy() {
    const children = [
      this._folderWindow
    ];
    return super.isBusy() || children.some(obj => (obj.isBusy ? obj.isBusy() : false));
  }

  isFolderWindowVisible() {
    return this._folderWindow.visible;
  }
}
class MiniGameStep extends Step {
  _drawCardGame = {};
  _cards = [];
  _resultWindow = {};

  start(manager) {
    const phase = this.getPhase();
    const resultHandler = (win, resultWindow) => {
      manager.win = win;
      this.openResultWindow();
      this.addAction(this.finish, phase);
    };
    const drawCardGame = this.createDrawCardGame();
    this.startDrawCardGame(resultHandler);
  }

  createDrawCardGame() {
    const drawCardGame = CardsetSprite.create(0, 0);
    drawCardGame.centralize();
    drawCardGame.commandShow();
    const cards = this.createCardsShuffled();
    const sprites = drawCardGame.setCards(cards, Graphics.boxWidth, Graphics.boxHeight);
    const xSprite1 = -(drawCardGame.x + CardSprite.contentOriginalWidth());
    const ySprite1 = -(drawCardGame.y + CardSprite.contentOriginalHeight());
    const position1 = CardSprite.createPosition(xSprite1, ySprite1, 0);
    const xSprite2 = (Graphics.boxWidth - drawCardGame.x);
    const ySprite2 = (Graphics.boxHeight - drawCardGame.y);
    const position2 = CardSprite.createPosition(xSprite2, ySprite2, 1);
    const positions = [position1, position2];
    drawCardGame.setAllCardsInPositions(sprites, positions);
    drawCardGame.setTurnToDownCards(sprites);
    this.addAction(this.commandCreateDrawCardGame, drawCardGame);
    return drawCardGame;
  }

  commandCreateDrawCardGame(drawCardGame) {
    this._drawCardGame = drawCardGame;
    this.commandAddChild(drawCardGame);
  }

  createCardsShuffled() {
    const cards = [
      {
        type: 2,
        color: GameConst.WHITE,
        figureName: 'default',
        attack: 0,
        health: 0
      },
      {
        type: 2,
        color: GameConst.BLACK,
        figureName: 'default',
        attack: 0,
        health: 0
      },
    ];
    this._cards = ArrayHelper.shuffle(cards);
    return this._cards;
  }

  startDrawCardGame(onSelectHandler) {
    this.addAction(this.commandStartDrawCardGame, onSelectHandler);
  }

  commandStartDrawCardGame(onSelectHandler) {
    this.showCards();
    this.moveAllCardsToCenter();
    const handlerDecorator = (cards) => {
      const selectedIndex = cards.shift();
      const cardColor = this._cards[selectedIndex].color;
      const win = cardColor === GameConst.WHITE;
      const resultWindow = this.createResultWindow(win);
      this.finishDrawCardGame(selectedIndex);
      onSelectHandler(win, resultWindow);
    }
    this.selectMode(handlerDecorator);
  }

  showCards() {
    this.addAction(this.commandShowCards);
  }
  
  commandShowCards() {
    this._drawCardGame.showCards();
  }

  moveAllCardsToCenter() {
    this.addAction(this.commandMoveAllCardsToCenter);
  }

  commandMoveAllCardsToCenter() {
    const center = this._drawCardGame.width / 2;
    const x = center - CardSprite.contentOriginalWidth();
    const space = 2;
    const position1 = CardSprite.createPosition(x - space, 0, 0);
    const position2 = CardSprite.createPosition(center + space, 0, 1);
    const positions = [position1, position2];
    const sprites = this._drawCardGame.getSprites();
    this._drawCardGame.moveAllCardsToPositions(sprites, positions);
  }

  createResultWindow(win) {
    const text = win ? 'You go first!' : 'You go next!';
    const resultWindow = TextWindow.createWindowOneFourthSize(0, 0, [text]);
    resultWindow.alignCenterMiddle();
    resultWindow.alignBelowOf({ y: 100, height: 0 });
    resultWindow.alignTextCenter();
    this.addAction(this.commandCreateResultWindow, resultWindow);
    return resultWindow;
  }

  commandCreateResultWindow(resultWindow) {
    this._resultWindow = resultWindow;
    this.commandAddChild(resultWindow);
  }

  finishDrawCardGame(selectedIndex) {
    this.addAction(this.commandFinishDrawCardGame, selectedIndex);
  }

  commandFinishDrawCardGame(selectedIndex) {
    const cardset = this._drawCardGame;
    const sprites = ArrayHelper.moveToStartByIndex(cardset.getSprites(), selectedIndex);
    const selectedSprite = sprites[0];
    const startIndex = 0;
    cardset.removeChild(sprites[1]);
    cardset.addChildAt(sprites[1], startIndex);
    cardset.zoomAllCards(selectedSprite);
    cardset.zoomOutAllCards(selectedSprite);
    cardset.addWait();
    cardset.flipTurnToUpCards(sprites);
  }

  selectMode(onSelectHandler) {
    this.addAction(this.commandSelectMode, onSelectHandler);
  }

  commandSelectMode(onSelectHandler) {
    const selectNumber = 1;
    this._drawCardGame.selectMode(selectNumber, onSelectHandler);
  }

  openResultWindow() {
    this.addAction(this.commandOpenResultWindow);
  }

  commandOpenResultWindow() {
    this._resultWindow.open();
  }

  finish(phase) {
    if (typeof this._finish === 'function') return this._finish();
    switch (phase) {
      case null:
        break;
      default:
        break;
    }
  }

  isBusy() {
    const children = [
      this._drawCardGame,
      this._resultWindow,
    ];
    return super.isBusy() || children.some(obj => (obj.isBusy ? obj.isBusy() : false));
  }

  isResultWindowVisible() {
    return this._resultWindow.visible
  }

  isCardsetVisible() {
    return this._drawCardGame.visible;
  }
}
class DrawStep extends Step {

  start(manager) {
    const phase = this.getPhase();
    this.createPlayerGameBoard(manager);
    this.createChallengedGameBoard(manager);
    this.openGameBoards();
    this.drawCardsToGame(manager);
    this.loadGameBoardsToGame(manager);
  }

  drawCardsToGame(manager) {
    const playerNumCardsInDeck = manager.getPlayerDeckLength();
    const playerCardsDrawed = manager.getPlayerDeck().splice(0, 6);
    manager.setPlayerHand(playerCardsDrawed);
    const playerData = {
      cards: playerCardsDrawed,
      cardsInDeck: playerNumCardsInDeck,
    };
    const challengeNumCardsInDeck = manager.getChallengedDeckLength();
    const challengeCardsDrawed = manager.getChallengedDeck().splice(0, 6);
    manager.setChallengedHand(challengeCardsDrawed);
    const challengeData = {
      cards: challengeCardsDrawed,
      cardsInDeck: challengeNumCardsInDeck,
    };
    this.drawCards(playerData, challengeData);
  }

  drawCards(player, challenge) {
    const { 
      cards: playerCards,
      cardsInDeck: playerCardsInDeck, 
    } = player;
    const { 
      cards: challengeCards,
      cardsInDeck: challengeCardsInDeck, 
    } = challenge;
    this.addActions([
      [this.commandDrawPlayerCards, playerCards, playerCardsInDeck],
      [this.commandDrawChallengedCards, challengeCards, challengeCardsInDeck],
    ]);
  }

  commandDrawPlayerCards(cards, cardsInDeck) {
    this._player.battlefield.show();
    const screenWidth = ScreenHelper.getFullWidth();
    const sprites = this._player.battlefield.setCards(cards, screenWidth);
    this._player.battlefield.showCards(sprites);
    this._player.battlefield.setTurnToDownCards(sprites);
    const fieldUpdates = sprites.map((sprite, index) => {
      const count = index + 1;
      const countCardsInDeck = cardsInDeck - count;
      const updateDeckPoints = BoardWindow.createValueUpdate(GameConst.CARDS_IN_DECK, countCardsInDeck);
      const updateHandPoints = BoardWindow.createValueUpdate(GameConst.CARDS_IN_HAND, count);
      const manyUpdates = [
        updateDeckPoints,
        updateHandPoints
      ];
      const boardWindow = this.getPlayerBoardWindow();
      boardWindow.updateValues(manyUpdates);
    });
    this._player.battlefield.moveCardsInlist(sprites, 6, fieldUpdates);
    this._player.battlefield.flipTurnToUpCards(sprites);
  }

  commandDrawChallengedCards(cards, cardsInDeck) {
    this.commandShowChallengedBattlefield();
    const screenWidth = ScreenHelper.getFullWidth();
    const sprites = this.commandSetCardsChallengedBattlefield(cards, screenWidth);
    this.commandShowCardsChallengedBattlefield(sprites);
    this.commandSetTurnToDownCardsChallengedBattlefield(sprites);
    const fieldUpdates = sprites.map((sprite, index) => {
      const count = index + 1;
      const countCardsInDeck = cardsInDeck - count;
      const updateDeckPoints = BoardWindow.createValueUpdate(GameConst.CARDS_IN_DECK, countCardsInDeck);
      const updateHandPoints = BoardWindow.createValueUpdate(GameConst.CARDS_IN_HAND, count);
      const manyUpdates = [
        updateDeckPoints,
        updateHandPoints
      ];
      const boardWindow = this.getChallengedBoardWindow();
      boardWindow.updateValues(manyUpdates);
    });
    const delay = 6;
    this.commandMoveCardsInlistChallengedBattlefield(sprites, delay, fieldUpdates);
  }

  loadGameBoardsToGame(manager) {
    const playerCardsInHand = manager.getPlayerHand();
    const playerEnergiesClone = Object.assign({}, manager.getPlayerEnergies());
    const playerUpdates = this.createFieldUpdates(playerCardsInHand, playerEnergiesClone);
    const playerFieldUpdates = playerUpdates.fieldUpdates;
    manager.setPlayerEnergies(playerUpdates.energies);
    const challengeCardsInHand = manager.getChallengedHand();
    const challengeEnergiesClone = Object.assign({}, manager.getChallengedEnergies());
    const challengeUpdates = this.createFieldUpdates(challengeCardsInHand, challengeEnergiesClone);
    const challengeFieldUpdates = challengeUpdates.fieldUpdates;
    manager.setChallengedEnergies(challengeUpdates.energies);
    this.loadGameBoards(playerFieldUpdates, challengeFieldUpdates);
  }

  createFieldUpdates(cards, energies) {
    const fieldUpdates = cards.map((card, cardIndex) => {
      const { color } = card;
      if (color === GameConst.BROWN) return false;
      energies[color] += 1;
      const points = energies[color];
      const updatePoint = BoardWindow.createValueUpdate(color, points);
      return { cardIndex, updatePoint };
    });
    return { fieldUpdates, energies };
  }

  loadGameBoards(playerUpdates, challengeUpdates) {
    const updates = playerUpdates.map((playerUpdate, index) => {
      const challengeUpdate = challengeUpdates[index] || false;
      return [playerUpdate, challengeUpdate];
    });
    updates.forEach(([playerUpdate, challengeUpdate]) => {
      const { cardIndex: playerCardIndex, updatePoint: playerUpdatePoint } = playerUpdate;
      const { cardIndex: chanllengeCardIndex, updatePoint: challengeUpdatePoint } = challengeUpdate;
      this.addActions([
        [this.commandPlayerLoadEnergy, playerCardIndex, playerUpdatePoint],
        [this.commandChallengedLoadEnergy, chanllengeCardIndex, challengeUpdatePoint],
      ]);
    });
  }

  commandChallengedLoadEnergy(cardIndex, updatePoint) {
    const sprites = this.commandGetSpritesChallengedBattlefield();
    const sprite = sprites[cardIndex];
    if (updatePoint) {
      const triggerAction = () => {
        const boardWindow = this.getChallengedBoardWindow();
        boardWindow.updateValues(updatePoint);
      };
      const color = 'white';
      const duration = 6;
      const times = 1; 
      this.commandFlashCardsAnimateChallengedBattlefield(sprite, color, duration, times, triggerAction);
    }
  }

  commandPlayerLoadEnergy(cardIndex, updatePoint) {
    const sprites = this._player.battlefield.getSprites();
    const sprite = sprites[cardIndex];
    if (updatePoint) {
      const chainAction = () => {
        const boardWindow = this.getPlayerBoardWindow();
        boardWindow.updateValues(updatePoint);
      };
      this._player.battlefield.flashCardsAnimate(sprite, 'white', 6, 1, chainAction);
    }
  }

  update(manager) {
    super.update();
    if (this.isBusy() || this.hasActions()) return false;
    if (Input.isTriggered('ok')) {
      const phase = this.getPhase();
      this.closeGameBoards();
      this.leaveGameBoards();
      this.addAction(this.finish, phase);
    }
  }

  finish(phase) {
    if (typeof this._finish === 'function') return this._finish();
    switch (phase) {
      case null:
        break;
      default:
        break;
    }
  }
}
class PowerfieldStep extends Step {
  start(manager) {
    const phase = this.getPhase();

  }
  
  update(manager) {
    if (this.isBusy() || this.hasActions()) return false;
  }

  finish(phase) {
    if (typeof this._finish === 'function') return this._finish();
    switch (phase) {
      case null:
        break;
      default:
        break;
    }
  }

  isBusy() {
    const children = [
    ];
    return super.isBusy() || children.some(obj => (obj.isBusy ? obj.isBusy() : false));
  }
}
class TurnStep extends Step {
  _startTurn = false;
  _awaitingDecision = false;
  _textWindow = {};
  _askWindow = {};

  start(manager, text = 'Begin Load Phase') {
    const phase = this.getPhase();
    this.createPlayerGameBoard(manager);
    this.createChallengedGameBoard(manager);
    this.openGameBoards();
    this.createTextWindow(text);
    this.openBeginLoadPhaseWindow();
  }

  createTextWindow(text) {
    const textWindow = TextWindow.createWindowFullSize(0, 0, [text]);
    textWindow.alignCenterMiddle();
    textWindow.alignTextCenter();
    this.addAction(this.commandCreateTextWindow, textWindow);
    return textWindow;
  }

  commandCreateTextWindow(textWindow) {
    this._textWindow = textWindow;
    this.commandAddChild(textWindow);
  }

  openBeginLoadPhaseWindow() {
    this.addAction(this.commandOpenTextWindow);
  }

  commandOpenTextWindow() {
    this._textWindow.open();
  }

  closeBeginLoadPhaseWindow() {
    this.addAction(this.commandCloseTextWindow);
  }

  commandCloseTextWindow() {
    this._textWindow.close();
  }

  leaveBeginLoadPhaseWindow() {
    this.addAction(this.commandLeaveBeginLoadPhaseWindow);
  }

  commandLeaveBeginLoadPhaseWindow() {
    this.removeChild(this._textWindow);
  }

  update(manager) {
    super.update();
    if (this.isBusy() || this.hasActions() || this.isAwaitingDecision()) return false;
    this.updateStartTurn();
    this.updateTurn(manager);
  }

  updateStartTurn() {
    if (this.isReady() && Input.isTriggered('ok')) {
      this.closeBeginLoadPhaseWindow();
      this.leaveBeginLoadPhaseWindow();
      this.addAction(this.startTurn);
    }
  }

  startTurn() {
    this._startTurn = true;
  }

  isReady() {
    return this._startTurn === false;
  }

  isStarted() {
    return this._startTurn;
  }

  updateTurn(manager) {
    const phase = this.getPhase();
    if (this.isStarted()) {
      const isPowerfieldFull = manager.getPowerfieldLength() >= 3;
      if (isPowerfieldFull) {
        this.commandActivePowerfield();
        return;
      }
      const startPlay = manager.isPlayerStartTurn();
      if ((startPlay || manager.isChallengedPassed()) && manager.isPlayerPassed() === false) {
        this._awaitingDecision = true;

        // const commandYes = () => {
        //   this.commandCloseAskWindow();
        //   this.leaveAskWindow();
        //   this.closeGameBoards();
        //   this.leaveGameBoards();
        //   this.commandPlayerHand(manager);
        // };
        // const commandNo = () => {
        //   this.commandCloseAskWindow();
        //   this.leaveAskWindow();
          this.playerBoardWindowPass();
          this.addAction(this.commandPlayerPassed, manager);
          this.addAction(this.commandDropDecision);
        // };
        // this.createAskWindow('Use a Program Card?', commandYes, commandNo);
        // this.openAskWindow();

        return;
      } 
      if (manager.isChallengedPassed() === false) {
        this.challengedBoardWindowPass();
        this.addAction(this.commandChallengedPassed, manager);
        return;
      }
      if (manager.getPowerfieldLength() > 0) {
        this.commandActivePowerfield();
        return;
      }
      this.addAction(this.finish, phase);
    }
  }

  commandActivePowerfield() {
    this.changeStep(PowerfieldStep);
    if (typeof this._finish === 'function') return this._finish();
    this.destroy();
  }

  commandDropDecision() {
    this._awaitingDecision = false;
  }

  commandChallengedPassed(manager) {
    manager.challengedPassed();
  }

  createAskWindow(text, yesHandler, noHanlder) {
    const commandYes = CommandWindow.createCommand('Yes', 'YES', yesHandler);
    const commandNo = CommandWindow.createCommand('No', 'NO', noHanlder);
    const askWindow = CommandWindow.create(0, 0, [text], [commandYes, commandNo]);
    askWindow.alignBottom();
    this.addAction(this.commandCreateAskWindow, askWindow);
    return askWindow;
  }

  commandCreateAskWindow(askWindow) {
    this._askWindow = askWindow;
    this.commandAddChild(askWindow);
  }

  openAskWindow() {
    this.addAction(this.commandOpenAskWindow);
  }

  commandOpenAskWindow() {
    this._askWindow.open();
  }

  commandCloseAskWindow() {
    this._askWindow.close();
  }

  leaveAskWindow() {
    this.addAction(this.commandLeaveAskWindow);
  }

  commandLeaveAskWindow() {
    this.removeChild(this._askWindow);
  }

  commandPlayerHand(manager) {
    console.log('hand');
  }

  commandPlayerPassed(manager) {
    manager.playerPassed();
  }

  finish(phase) {
    if (typeof this._finish === 'function') return this._finish();
    switch (phase) {
      case null:
        break;
      default:
        break;
    }
  }

  isBusy() {
    const children = [
      this._textWindow,
      this._askWindow,
    ];
    return super.isBusy() || children.some(obj => (obj.isBusy ? obj.isBusy() : false));
  }

  isAwaitingDecision() {
    return this._awaitingDecision;
  }
}

class CardBattleTestScene extends Scene_Message {
  initialize() {
    super.initialize();
    this._animationSprites = [];
    this._next = null;
    this._tests = [];
    this._status = null;
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
        this.printAssertError(`Test : ${test.name}, Assert: ${error}`);
        instanceCreated.addError(error);
      }
      return instanceCreated;
    });
  }
  
  testsData() {
    const cardSpriteTests = [
      SizeCardSpriteTest,
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
      UpdatingPointsCardSpriteTest,
      TiggerAcitonCardSpriteTest,
    ];
    const cardsetSpriteTests = [
      // StartPositionCardsetSpriteTest,
      // AlignAboveOfCardsetSpriteTest,
      // AlignBelowOfCardsetSpriteTest,
      // AlignCenterMiddleCardsetSpriteTest,
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
      // FlipTurnToUpAllCardsCardsetSpriteTest,
      // FlipTurnToUpCardsCardsetSpriteTest,
      // TriggerActionCardsetSpriteTest,
      // OnChangeCursorSelectModeCardsetSpriteTest,
      // AddChildToEndCardsetSpriteTest,
      LeaveAllCardsCardsetSpriteTest,
    ];
    const StateWindowTests = [
      CreateOneFourthSizeStateWindowTest,
      CreateMiddleSizeStateWindowTest,
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
      AlignCenterAboveMiddleStateWindowTest,
      AlignCenterMiddleStateWindowTest,
      AlignCenterBelowMiddleStateWindowTest,
      AlignCenterBottomStateWindowTest,
      AlignEndTopStateWindowTest,
      AlignEndMiddleStateWindowTest,
      AlignEndBottomStateWindowTest,
      AlignAboveOfStateWindowTest,
      AlignBelowOfStateWindowTest,
    ];
    const textWindowTests = [
      CreateOneFourthSizeTextWindowTest,
      CreateMiddleSizeTextWindowTest,
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
      AlignAboveOfTextWindowTest,
      AlignBelowOfTextWindowTest,
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
      // StartPhaseTest,
      // DrawPhaseTest,
      LoadPhaseTest,
    ];
    const steps = [
      // ChallengePhaseDisplayStepTest,
      // ChallengePhaseFolderStepTest,
      // StartPhaseDisplayStepTest,
      // StartPhaseMiniGameStepTest,
      // DrawPhaseDisplayStepTest,
      // DrawPhaseDrawStepTest,
      // LoadPhaseDisplayStepTest,
      // LoadPhaseTurnStepPlayerStartFirstTest,
      // LoadPhaseTurnStepPlayerPlaysNextTest,
      // LoadPhaseTurnStepChallengedPassedTest,
      // LoadPhaseTurnStepPlayerPassedTest,
      // LoadPhaseTurnStepPowerfieldActiveTest,
      LoadPhaseTurnStepPowerfieldActiveByLimitTest,
    ];
    return [
      // ...cardSpriteTests,
      // ...cardsetSpriteTests,
      // ...commandWindow,
      // ...StateWindowTests,
      // ...textWindowTests,
      // ...boardWindowTests,
      // ...battlePointsWindow,
      // ...trashWindow,
      // ...scoreWindow,
      // ...folderWindow,
      // ...phase,
      ...steps,
    ];
  }

  start() {
    super.start();
    this.startTests();
  }

  async startTests() {
    const testsResults = [];
    for (const test of this._tests) {
      this._next = test;
      const result = await this._next.run();
      testsResults.push(result);
      this._next.restore();
      this._next = null;
      CardBattleManager.reset();
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
    console.log(`%c${msg.map(t => t.toString())}`,`background: #5DADE2; color: #FFFFFF; font-size: 12px; padding: 5px;`);
  }

  printError(...msg) {
    console.log(`%c${msg.map(t => t.toString())}`,`background: #800000; color: #FFFFFF; font-size: 12px; padding: 5px;`);
  }

  printTestError(...msg) {
    console.log(`%c${msg.map(t => t.toString())}`,`background: #090000; color: #FFFFFF; font-size: 12px; padding: 5px;`);
  }

  printAssertError(...msg) {
    console.log(`%c${msg.map(t => t.toString())}`,`background: #400000; color: #FFFFFF; font-size: 12px; padding: 5px;`);
  }

  printSuccess(...msg) {
    console.log(`%c${msg.map(t => t.toString())}`,`background: #008000; color: #FFFFFF; font-size: 12px; padding: 5px;`);
  }

  update() {
    super.update();
    if (this.isActive()) {
      if (this._next) {
        this._next.update();
        this._next.updateTest();
      }
    }
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

  addWindow(window) {
    this._windowLayer.addChild(window);
  }

  removeWindow(window) {
    this._windowLayer.removeChild(window);
  };

  setPhase(phase) {
    this._phase = phase;
  }

  getPhase() {
    return this._phase;
  }

  setStep(step) {
    this._status = step;
  }

  isCurrentStep(step) {
    return this._status instanceof step;
  }
}
class CardBattleScene extends Scene_Message {
  initialize() {
    super.initialize();
    this._status = null;
    this._containerAnimationSprites = [];
  }

  setStatus(className, ...params) {
    const status = new className(this, ...params);
    if ((status instanceof PhaseSprite) === false) {
      throw new Error('status must be an instance of Phase');
    }
    this._status = status;
    this._status.start();
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
    this.setStatus(PhaseSprite);
  }

  update() {
    super.update();
    if (this.isActive() && this._status) this._status.update();
  }

  isActive() {
    return !this.isBusy();
  }

  isBusy() {
    return super.isBusy();
  }

  stop() {
    super.stop();
  }

  terminate() {
    super.terminate();
  }

  addWindow(window) {
    this._windowLayer.addChild(window);
  }

  removeWindow(window) {
    this._windowLayer.removeChild(window);
  };

  addAnimationSprite(sprite) {
    this._containerAnimationSprites.push(sprite);
  }

  getLastAnimationSprite() {
    return this._containerAnimationSprites[this.getLastAnimationSpritesIndex()];
  }

  getLastAnimationSpritesIndex() {
    return this._containerAnimationSprites.length - 1;
  }
}
})();


