class CardBattleWindow extends Window_Base {
  _text = [];
  
  initialize(rect) {
    super.initialize(rect);
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

  addText(text = '') {
    this._text.push(text);
  }

  renderTextCenter() {
    this.renderText('CENTER');
  }

  renderText(align = 'LEFT') {
    if (this._text.length) {
      const text = this.processText();
      const textWidth = this.textSizeEx(text).width;
      const xPosition = this.getAlignText(textWidth, align);
      this.drawTextEx(text, xPosition);
    }
  }

  processText() {
    let content = [];
    this._text.forEach((text, index) => {
      if (index > 0) content.push('\n');
      content.push(text);
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

  drawTextEx(text = '', xPosition = 0, yPosition = 0, width = this.width) {
    this.resize(text);
    super.drawTextEx(text, xPosition, yPosition, width);
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
    let width = this.textSizeEx(text).width;
    width = Math.ceil(width);
    return Math.min(width, Graphics.boxWidth);
  }

  calculeTextHeight() {
    return this.fittingHeight(this.numLines());
  }

  numLines() {
    return this._text.length;
  }

  setVerticalPosition(position) {
    this.y = 60 * position;
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
}