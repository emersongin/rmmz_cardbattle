class TextWindow extends Window_Base {
  _content = [];
  _align = 'LEFT';

  initialize(rect) {
    super.initialize(rect);
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

  setAlignContent(align = 'LEFT') {
    this._align = align;
  }

  getContentIndex(index) {
    return this.getContent()[index];
  }

  getContent() {
    return this._content.map(({ type, ...params }) => {
      const objData = ObjectHelper.parseReference(params, ['text', 'x', 'y', 'align']);
      const { text, x, y, align } = objData;
      return { type, text, x, y, align };
    });
  }

  renderContent() {
    if (this._content.length) {
      this.getContent().forEach(({ type, text, x, y, align }, index) => {
        x = this.getTextAlignXPosition(text, align);
        this.setContentX(index, x);
        this.drawTextEx(text, x, y);
      });
    }
  }

  addTextline(text = '', align = this._align) {
    text = this.processTextLine(text);
    this.addToRender(GameConst.TEXT_EX, text, 0, 0, align);
  }

  getTextAlignXPosition(text, align) {
    const textWidth = this.getTextWidth(text);
    const x = this.getAlignText(textWidth, align);
    return x;
  }

  processTextLine(text) {
    const length = this._content.length;
    const isGreaterThanZero = length > 0;
    const isNotSpecialLine = this._content[length - 1]?.type != GameConst.CHANGE_COLOR;
    if (isGreaterThanZero && isNotSpecialLine) text = `${'\n'.repeat(length)}${text}`;
    return text;
  }

  getTextWidth(text) {
    const textState = this.createTextState(text, 0, 0, 0);
    textState.drawing = false;
    this.processAllText(textState);
    return textState.outputWidth;
  }

  getAlignText(textWidth, align) {
    switch (align) {
      case GameConst.CENTER_ALIGN:
        return (Math.max(this.contentsWidth(), textWidth, this.width) / 2) - (textWidth / 2);
      case GameConst.RIGHT_ALIGN:
        return Math.max(this.contentsWidth(), textWidth, this.width) - textWidth;
      default:
        return 0;
    }
  }

  addToRender(type, ...params) {
    this._content.push({ type, ...params });
    this.resize(params[0]);
  }

  resize(text) {
    this.resizeContent(text);
    this.resizeWindow(text);
  }

  resizeContent(text) {
    const contentWidth = Math.max(this.calculeTextWidth(text), this.width);
    this.contents.resize(contentWidth, this.calculeTextHeight());
  }

  calculeTextHeight() {
    return Math.max(this.fittingHeight(this.numLines()), this.height);
  }

  calculeTextWidth(text) {
    let width = this.getTextWidth(text);
    width = Math.ceil(width);
    return Math.min(width, Graphics.boxWidth);
  }

  numLines() {
    const lines = this.getContent().filter(content => content.type != GameConst.CHANGE_COLOR);
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

  drawTextEx(text = '', x = 0, y = 0, width = this.width) {
    super.drawTextEx(text, x, y, width);
  }

  isCenterAlignedText(xAling) {
    return this.getContent().every(content => {
      const x = this.getTextAlignXPosition(content.text, GameConst.CENTER_ALIGN);
      return x === xAling;
    });
  }

  changeTextExColor(colorIndex) {
    const colorText = `\\c[${colorIndex}]`;
    const noSpace = false;
    const lastIndex = this._content.length - 1;
    const content = this.getContentIndex(lastIndex);
    if (content) {
      content.text = `${content.text}${colorText}`;
      this.appendToRender(GameConst.TEXT_EX, content.text, lastIndex);
    } else {
      this.addToRender(GameConst.CHANGE_COLOR, colorText, 0, 0, this._align);
    }
  }

  appendText(text, space = true) {
    const lastIndex = this._content.length - 1;
    const content = this.getContentIndex(lastIndex);
    const isNotSpecialLine = content?.type != GameConst.CHANGE_COLOR;
    if (content) {
      content.text = `${content.text}${space && isNotSpecialLine ? ' ' : ''}${text.trim()}`;
      this.appendToRender(GameConst.TEXT_EX, content.text, lastIndex);
    } else {
      this.addTextline(text);
    }
  }

  appendToRender(type, text, lastIndex) {
    if (type == GameConst.TEXT_EX) {
      this.setContentType(lastIndex, type);
      this.setContentText(lastIndex, text);
      this.resize(text);
    } else {
      this.setContentText(lastIndex, text);
    }
  }

  setContentType(index, type) {
    this._content[index].type = type;
  }

  setContentText(index, text) {
    this._content[index][0] = text;
  }

  setContentX(index, x) {
    this._content[index][1] = x;
  }

  setCenteredPosition() {
    this.x = (Graphics.boxWidth / 2) - (this.width / 2);
    this.y = (Graphics.boxHeight / 2) - (this.height / 2);
  }

  isCenterAlign() {
    return this.x === (Graphics.boxWidth / 2) - (this.width / 2) && 
      this.y === (Graphics.boxHeight / 2) - (this.height / 2);
  }

  static getVerticalPosition(position) {
    const paddingTop = 12;
    return (60 * position) + paddingTop;
  }

  static getHorizontalPosition(position) {
    return (Graphics.boxWidth / 2) * position;
  }

  setVerticalPosition(position) {
    const paddingTop = 12;
    this.y = (60 * position) + paddingTop;
  }

  setHorizontalPosition(position) {
    this.x = (Graphics.boxWidth / 2) * position;
  }

  isFullsize() {
    return this.width === Graphics.boxWidth;
  }

  isMiddleSize() {
    return this.width === Graphics.boxWidth / 2;
  }

  getTextColor() {
    return this.contents.textColor;
  }

  isSetColorContent(colorIndex) {
    return this.getContent().some(content => content.text.includes(`\\c[${colorIndex}]`));
  }
}