class TextWindow extends Window_Base {
  _text = [];
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
    const height = CardBattleWindow.minHeight();
    return TextWindow.create(x, y, width, height);
  }

  static createWindowFullSize(x, y) {
    const width = Graphics.boxWidth;
    const height = CardBattleWindow.minHeight();
    return TextWindow.create(x, y, width, height);
  }

  renderTextCenter() {
    this.renderText('CENTER');
    this._align = 'CENTER';
  }

  renderText(align = this._align) {
    if (this._text.length) {
      const text = this.processText();
      const textWidth = this.getTextWidth(text);
      const xPosition = this.getAlignText(textWidth, align);
      const yPosition = 0;
      this.resize(text);
      this.drawText(text, xPosition, yPosition, align);
    }
  }

  processText() {
    let content = [];
    const length = this._text.length;
    this._text.forEach((text, index) => { 
      content.push(text);
      const isGreaterThanOne = length > 1;
      const isNotLast = length !== (index + 1);
      const isNotSpecialLine = text[0] != '\\';
      if (isGreaterThanOne && isNotLast && isNotSpecialLine) content.push('\n');
    });
    return content.join('');
  }

  getTextWidth(text) {
    const textState = this.createTextState(text, 0, 0, 0);
    textState.drawing = false;
    this.processAllText(textState);
    return textState.outputWidth;
  }

  getAlignText(textWidth, align) {
    switch (align) {
      case 'CENTER':
        return (this.contentsWidth() / 2) - (textWidth / 2);
      case 'RIGHT':
        return this.contentsWidth() - textWidth;
      default:
        return 0;
    }
  }

  resize(text) {
    this.resizeContent(text);
    this.resizeWindow(text);
  }

  resizeContent(text) {
    const contentWidth = this.calculeTextMinHeight(text);
    this.contents.resize(contentWidth, this.calculeTextHeight());
  }

  calculeTextMinHeight(text) {
    const textWidth = this.calculeTextWidth(text);
    return this.width > textWidth ? this.width : textWidth;
  }

  calculeTextWidth(text) {
    let width = this.getTextWidth(text);
    width = Math.ceil(width);
    return Math.min(width, Graphics.boxWidth);
  }

  calculeTextHeight() {
    return this.fittingHeight(this.numLines());
  }

  numLines() {
    const lines = this._text.filter(text => text[0] !== "\\");
    return lines.length;
  }

  resizeWindow(text) {
    const contentWidth = this.calculeTextMinHeight(text);
    const windowPadding = this.padding + this.itemPadding();
    let width = Math.ceil(contentWidth) + windowPadding + 6;
    let windowWidth = Math.max(width, this.width);
    windowWidth = Math.min(windowWidth, Graphics.boxWidth);
    this.move(this.x, this.y, windowWidth, this.calculeTextHeight());
  }

  drawText(text = '', x = 0, y = 0, align = 'left', width = this.width) {
    super.drawText(text, x, y, width, align);
  }

  renderTextExCenter() {
    this.renderTextEx('CENTER');
    this._align = 'CENTER';
  }

  renderTextEx(align = this._align) {
    if (this._text.length) {
      const text = this.processText();
      const textWidth = this.getTextWidth(text);
      const xPosition = this.getAlignText(textWidth, align);
      this.resize(text);
      this.drawTextEx(text, xPosition);
    }
  }

  drawTextEx(text = '', x = 0, y = 0, width = this.width) {
    super.drawTextEx(text, x, y, width);
  }

  changeTextColorHere(colorIndex) {
    const colorText = `\\c[${colorIndex}]`;
    const noSpace = false;
    this.appendText(colorText, noSpace);
  }

  appendText(text, space = true) {
    const length = this._text.length;
    const lastText = this._text[length - 1];
    if (length && lastText && lastText[0] !== '\\') {
      this._text[length - 1] = `${lastText}${space ? ' ' : ''}${text.trim()}`;
    } else {
      this.addText(text);
    }
  }

  addText(text = '') {
    this._text.push(text.trim());
  }

  setCenteredPosition() {
    this.x = (Graphics.boxWidth / 2) - (this.width / 2);
    this.y = (Graphics.boxHeight / 2) - (this.height / 2);
  }

  isCenterAlign() {
    return this.x === (Graphics.boxWidth / 2) - (this.width / 2) && 
      this.y === (Graphics.boxHeight / 2) - (this.height / 2);
  }

  isCenterAlignedText() {
    return this._align === 'CENTER';
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

  setTextColor(color) {
    this.changeTextColor(color || ColorManager.normalColor());
  }

  getTextColor() {
    return this.contents.textColor;
  }
}