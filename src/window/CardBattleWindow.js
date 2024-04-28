class CardBattleWindow extends Window_Base {
  _text = [];
  
  initialize(rect) {
    super.initialize(rect);
    this._iconset = "IconSet";
    this.closed();
  }
  
  closed() {
    this._openness = 0;
  }

  static create(x, y, width, height) {
    return new CardBattleWindow(new Rectangle(x, y, width, height));
  }

  static createWindowMiddleSize(x, y) {
    const width = Graphics.boxWidth / 2;
    const height = CardBattleWindow.minHeight();
    return CardBattleWindow.create(x, y, width, height);
  }

  static createWindowFullSize(x, y) {
    const width = Graphics.boxWidth;
    const height = CardBattleWindow.minHeight();
    return CardBattleWindow.create(x, y, width, height);
  }

  static minHeight() {
    return 60;
  }

  renderTextExCenter() {
    this.renderTextEx('CENTER');
  }

  renderTextEx(align = 'LEFT') {
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

  renderTextCenter() {
    this.renderText('CENTER');
  }

  renderText(align = 'LEFT') {
    if (this._text.length) {
      const text = this.processText();
      const textWidth = this.getTextWidth(text);
      const xPosition = this.getAlignText(textWidth, align);
      const yPosition = 0;
      this.resize(text);
      this.drawText(text, xPosition, yPosition, align);
    }
  }

  drawText(text = '', x = 0, y = 0, align = 'left', width = this.width) {
    super.drawText(text, x, y, width, align);
  }

  processText() {
    let content = [];
    const length = this._text.length;
    this._text.forEach((text, index) => { 
      content.push(text);
      const isGreaterThanOne = length > 1;
      const isNotLast = length !== (index + 1);
      const isNotSpecialLine = text[0] != '\\';
      console.log(isGreaterThanOne, isNotLast, isNotSpecialLine);
      if (isGreaterThanOne && isNotLast && isNotSpecialLine) content.push('\n');
    });
    return content.join('');
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

  resizeWindow(text) {
    const contentWidth = this.calculeTextMinHeight(text);
    const windowPadding = this.padding + this.itemPadding();
    const width = Math.ceil(contentWidth) + windowPadding + 6;
    const windowWidth = Math.min(width, Graphics.boxWidth);
    this.move(this.x, this.y, windowWidth, this.calculeTextHeight());
  }

  calculeTextWidth(text) {
    console.log(text);
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
    return this.fittingHeight(this.numLines());
  }

  numLines() {
    const lines = this._text.filter(text => text[0] !== "\\");
    return lines.length;
  }

  setVerticalPosition(position) {
    const paddingTop = 12;
    this.y = (60 * position) + paddingTop;
  }

  setHorizontalPosition(position) {
    this.x = (Graphics.boxWidth / 2) * position;
  }

  isAvailable() {
    return !this.isBusy();
  }

  isBusy() {
    return this.isOpening() || this.isClosing();
  }

  setTextColor(color) {
    this.changeTextColor(color || ColorManager.normalColor());
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

  drawIcon(iconIndex, x, y) {
    const bitmap = ImageManager.loadSystem(this._iconset);
    const pw = ImageManager.iconWidth;
    const ph = ImageManager.iconHeight;
    const sx = (iconIndex % 16) * pw;
    const sy = Math.floor(iconIndex / 16) * ph;
    this.contents.blt(bitmap, sx, sy, pw, ph, x, y);
  };
}