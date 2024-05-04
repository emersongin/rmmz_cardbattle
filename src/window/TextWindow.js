class TextWindow extends Window_Base {
  _content = [];
  _horizontalAlign = '';

  initialize(rect) {
    super.initialize(rect);
    this.setHorizontalAlignContent(GameConst.START);
    this.closed();
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

  setHorizontalAlignContent(align) {
    this._horizontalAlign = align;
  }

  getAlignContent() {
    return this._horizontalAlign;
  }

  changeTextExColor(colorIndex) {
    const colorText = `\\c[${colorIndex}]`;
    const noSpace = false;
    const lastIndex = this.getIndexLastContent();
    const content = this.geContentByIndex(lastIndex);
    if (content) {
      content.text = `${content.text}${colorText}`;
      const x = this.getXPositionTextAlign(content.text, this.getAlignContent());
      this.appendToRender(GameConst.TEXT_EX, content.text, x, lastIndex);
    } else {
      this.addToRender(GameConst.CHANGE_COLOR, colorText, 0, 0, this.getAlignContent());
    }
  }

  getIndexLastContent() {
    return this._content.length - 1;
  }

  getLastContent(index) {
    return this.geContentByIndex(this.getIndexLastContent())
  }

  geContentByIndex(index) {
    return this.getContent()[index];
  }

  getContent() {
    return this._content.map(({ type, ...params }) => {
      const objData = ObjectHelper.parseReference(params, ['text', 'x', 'y', 'align']);
      const { text, x, y, align } = objData;
      return { type, text, x, y, align };
    });
  }

  appendToRender(type, text, x, lastIndex) {
    if (this.getContent().length === 0) return this.addToRender(type, text, x);
    if (type == GameConst.TEXT_EX) {
      this.setContentType(lastIndex, type);
      this.setContentText(lastIndex, text);
      this.setContentX(lastIndex, x);
      this.resize(text);
    } else {
      this.setContentText(lastIndex, text);
    }
  }

  setContentType(index, type) {
    this._content[index].type = type;
  }

  setContentText(index, text) {
    const textIndex = 0;
    this._content[index][textIndex] = text;
  }

  resize(text) {
    this.resizeContent(text);
    this.resizeWindow(text);
  }

  resizeContent(text) {
    const contentWidth = Math.max(this.calculeTextWidth(text), this.width);
    this.contents.resize(contentWidth, this.calculeTextHeight());
  }

  calculeTextWidth(text) {
    let width = this.getTextWidth(text);
    width = Math.ceil(width);
    return Math.min(width, Graphics.boxWidth);
  }

  getTextWidth(text) {
    const textState = this.createTextState(text, 0, 0, 0);
    textState.drawing = false;
    this.processAllText(textState);
    return textState.outputWidth;
  }

  calculeTextHeight() {
    return Math.max(this.fittingHeight(this.numLines()), this.height);
  }

  numLines() {
    const lines = this.getContent().filter(content => content.type == GameConst.TEXT_EX);
    return lines.length;
  }

  resizeWindow(text) {
    const contentWidth = this.calculeTextMinWidth(text);
    const windowPadding = this.padding + this.itemPadding();
    let width = Math.ceil(contentWidth) + windowPadding + 6;
    let windowWidth = Math.max(width, this.width);
    windowWidth = Math.min(windowWidth, Graphics.boxWidth);
    this.move(this.x, this.y, windowWidth, this.calculeTextHeight());
  }

  calculeTextMinWidth(text) {
    const textWidth = this.calculeTextWidth(text);
    return Math.max(this.width, textWidth);
  }

  addToRender(type, ...params) {
    this._content.push({ type, ...params });
    const textIndex = 0;
    const text = params[textIndex];
  }

  renderContent() {
    const contents = this.getContent();
    console.log(contents)
    if (contents.length) {
      contents.forEach((content, index) => {
        const { type, text, x, y, align } = content;
        this.resize(text);
        this.drawTextEx(text, x, y);
      });
    }
  }

  getXPositionTextAlign(text, align) {
    const textWidth = this.getTextWidth(text);
    const x = this.getAlignText(textWidth, align);
    return x;
  }

  getAlignText(textWidth, align) {
    const contentWidth = this.contentsWidth();
    console.log(this.width, contentWidth, textWidth);
    switch (align) {
      case GameConst.CENTER:
        return (contentWidth / 2) - (textWidth / 2);
      case GameConst.RIGHT:
        return this.contentsWidth() - textWidth;
      default:
        return 0;
    }
  }

  setContentX(index, x) {
    const xPosition = 1;
    this._content[index][xPosition] = x;
  }

  drawTextEx(text = '', x = 0, y = 0, width = this.width) {
    super.drawTextEx(text, x, y, width);
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

  addTextline(text = '', align = this._horizontalAlign) {
    text = this.processTextLine(text);
    const x = this.getXPositionTextAlign(text, this.getAlignContent());
    this.addToRender(GameConst.TEXT_EX, text, x, 0, align);
  }

  updateXpositionContent(x) {
    this.getContent().forEach((content, index) => {
      this.setContentX(index, x);
    });
  }

  processTextLine(text) {
    const length = this.getContent().length;
    const isGreaterThanZero = length > 0;
    const lastContent = this.getLastContent();
    const isNotSpecialLine = lastContent?.type != GameConst.CHANGE_COLOR;
    console.log(lastContent?.type);
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

  isContentCenteredCenter(xAling) {
    return this.getContent().every(content => {
      const x = this.getXPositionTextAlign(content.text, GameConst.CENTER);
      return x === xAling;
    });
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
    return this.getContent().some(content => content.text.includes(`\\c[${colorIndex}]`));
  }
}