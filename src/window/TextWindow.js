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
    this.changeDefaultColor();
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