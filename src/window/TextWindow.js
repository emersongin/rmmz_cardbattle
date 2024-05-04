class TextWindow extends Window_Base {
  _contents = [];
  _history = [];
  _textColorIndex = GameColorIndexs.NORMAL_COLOR;
  _textHorizontalAlign = '';

  initialize(rect) {
    super.initialize(rect);
    this.setHorizontalAlignContent(GameConst.TEXT_START);
    this.closed();
  }

  setHorizontalAlignContent(align) {
    this._textHorizontalAlign = align;
  }

  closed() {
    this._openness = 0;
  }

  static create(x, y, width, height) {
    return new TextWindow(new Rectangle(x, y, width, height));
  }

  static createWindowMiddleSize(x, y) {
    const width = Graphics.boxWidth / 2;
    const height = TextWindow.minHeight();
    return TextWindow.create(x, y, width, height);
  }

  static createWindowFullSize(x, y) {
    const width = Graphics.boxWidth;
    const height = TextWindow.minHeight();
    return TextWindow.create(x, y, width, height);
  }

  static minHeight() {
    return 60;
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
    const contents = this.getContents();
    this.contents.clear();
    this.processContents(contents);
  }

  getContents() {
    return this._contents;
  }

  processContents(contents) {
    const contentsProsseced = [];
    contents.forEach((content, index) => {
      const text = this.processContentType(content, index);
      if (text) contentsProsseced.push(text);
    });
    const maxWidth = this.getMaxWidthContentsProcessed(contentsProsseced);
    this.resize(maxWidth);
    contentsProsseced.forEach((content, index) => {
      const x = this.getXAlign(content, this.getAlignContent(), maxWidth);
      const y = this.itemHeightByIndex(index);
      const width = this.getTextWidth(content);
      this._history.push({ content, x, y, width });
      super.drawTextEx(content, x, y, width);
    });
  }

  getAlignContent() {
    return this._textHorizontalAlign;
  }

  processContentType(content, index) {
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
    const color = this.appendChangeColor(this._textColorIndex);
    text = `${color}${text}`;
    return text;
  }

  appendChangeColor(colorIndex = GameColorIndexs.NORMAL_COLOR) {
    return `\\c[${colorIndex}]`;
  }

  getLastContent(index) {
    return this.geContentByIndex(this.getIndexLastContent())
  }

  geContentByIndex(index) {
    return this.getContents()[index];
  }

  getIndexLastContent() {
    return this.getContents().length - 1;
  }

  getMaxWidthContentsProcessed(contents) {
    return contents.reduce((max, content) => {
      const width = this.getTextWidth(content);
      return Math.max(max, width);
    }, 0);
  }

  itemHeightByIndex(index) {
    return this.itemHeight() * index;
  }

  isWasTextDrawnPositions(x, y) {
    return this._history.some(history => {
      return history.x === x && history.y === y;
    });
  }








  getXAlign(content, align, maxWidth) {
    const textWidth = this.getTextWidth(content);
    const x = this.getTextXByAlign(textWidth, maxWidth, align);
    return x;
  }

  getTextWidth(text) {
    const textState = this.createTextState(text, 0, 0, 0);
    textState.drawing = false;
    this.processAllText(textState);
    return textState.outputWidth;
  }

  getTextXByAlign(textWidth, maxWidth, align) {
    maxWidth = Math.max(maxWidth, Graphics.boxWidth - this.padding * 2);
    switch (align) {
      case GameConst.CENTER:
        return (maxWidth / 2) - (textWidth / 2);
      case GameConst.END:
        return maxWidth - textWidth;
      default:
        return 0;
    }
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












  appendToRender(type, text, x, lastIndex) {
    if (this.getContents().length === 0) return this.addToRender(type, text, x);
    if (type == GameConst.TEXT_EX) {
      this.setContentType(lastIndex, type);
      this.setContentText(lastIndex, text);
      this.setContentX(lastIndex, x);
      this.resize(text);
    } else {
      this.setContentText(lastIndex, text);
    }
  }

  calculeTextMinWidth(text) {
    const textWidth = this.calculeTextWidth(text);
    return Math.max(this.width, textWidth);
  }

  setContentType(index, type) {
    this._content[index].type = type;
  }

  setContentText(index, text) {
    const textIndex = 0;
    this._content[index][textIndex] = text;
  }





  calculeTextWidth(text) {
    let width = this.getTextWidth(text);
    width = Math.ceil(width);
    return Math.min(width, Graphics.boxWidth);
  }









  addToRender(type, ...params) {
    this._content.push({ type, ...params });
    const textIndex = 0;
    const text = params[textIndex];
  }







  setContentX(index, x) {
    const xPosition = 1;
    this._content[index][xPosition] = x;
  }



  appendText(text, space = true) {
    const lastContent = this.getLastContent();
    const isNotSpecialLine = lastContent?.type != GameConst.CHANGE_COLOR;
    if (lastContent) {
      lastContent.text = `${lastContent.text}${space && isNotSpecialLine ? ' ' : ''}${text.trim()}`;
      const x = this.getXPositionTextAlign(lastContent.text, this.getAlignContent());
      this.appendToRender(GameConst.TEXT_EX, lastContent.text, x, lastIndex);
    } else {
      this.addTextline(text);
    }
  }



  updateXpositionContent(x) {
    this.getContents().forEach((content, index) => {
      this.setContentX(index, x);
    });
  }

  processTextLine(text) {
    const length = this.getContents().length;
    const isGreaterThanZero = length > 0;
    const lastContent = this.getLastContent();
    const isNotSpecialLine = lastContent?.type != GameConst.CHANGE_COLOR;
    if (isGreaterThanZero && (lastContent && isNotSpecialLine)) text = `${'\n'.repeat(length)}${text}`;
    return text;
  }

  setCenteredAlignment() {
    this.x = TextWindow.getHorizontalAlign(GameConst.CENTER, this);
    this.y = TextWindow.getVerticalAlign(GameConst.MIDDLE, this);
  }

  isCenterAligned() {
    return this.x === (Graphics.boxWidth / 2) - (this.width / 2) && 
      this.y === (Graphics.boxHeight / 2) - (this.height / 2);
  }

  // isContentCenteredCenter(xAling) {
  //   return this.getContents().every(content => {
  //     const x = this.getXPositionTextAlign(content.text, GameConst.CENTER);
  //     return x === xAling;
  //   });
  // }

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

  setVerticalAlign(position) {
    this.y = TextWindow.getVerticalAlign(position, this);
  }

  setHorizontalAlign(position) {
    this.x = TextWindow.getHorizontalAlign(position, this);
  }

  isFullsize() {
    return this.width === Graphics.boxWidth;
  }

  isMiddleSize() {
    return this.width === Graphics.boxWidth / 2;
  }

  isColorContentByIndex(colorIndex) {
    return this.getContents().some(content => content.text.includes(`\\c[${colorIndex}]`));
  }
}