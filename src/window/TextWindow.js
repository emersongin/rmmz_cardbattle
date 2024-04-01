class TextWindow extends Window_Base {
  _text = [];
  _contentAlign = 'LEFT';
  _windowPosition = 'BOTTOM';

  constructor(rect) {
    super(rect);
    this.initClosed();
  }

  initClosed() {
    this._openness = 0;
  }

  drawContentText() {
    if (this._text?.length) {
      const textContent = this.processTextContent();
      this.drawTextEx(textContent, this.contentAlign(textContent), 0, this._width);
      this.refreshSize();
    }
  }

  processTextContent() {
    let content = [];
    this._text.forEach((text, index) => {
      if (index) content.push('\n');
      content.push(text);
    });
    return content.join('');
  }
  
  contentAlign(text) {
    switch (this._contentAlign) {
      case 'CENTER':
        return (this.contentsWidth() / 2) - (this.textSizeEx(text).width / 2);
      case 'RIGHT':
        return this.contentsWidth() - this.textSizeEx(text).width;
      default:
        // LEFT
        return 0;
    }
  }

  refreshSize() {
    this.move(this.x, this.y, this._width, this.calculeHeight());
  }

  moveWindow(x, y) {
    x = x >= 0 ? x : this.x;
    y = y >= 0 ? y : this.y;
    this.move(x, y, this._width, this.calculeHeight());
  }

  calculeHeight() {
    return this.fittingHeight(this._text.length);
  }

  addText(text) {
    if (!text) return this._text.push('\n');
    this._text.push(text);
  }
  
  alignContentCenter() {
    this._contentAlign = 'CENTER';
  }

  clearContent() {
    this._text = [];
    this.contents.clear();
  }
  
  changeContentTextColor(colorNumber) {
    if (this._text?.length) {
      this._text[0] = `\\C[${colorNumber}]` + this._text[0];
    }
  }

  moveWindowToTop() {
    this.moveWindow(this.x, 0);
  }

  moveWindowToBetweenTopAndCenter () {
    this.moveWindow(this.x, (Graphics.boxHeight / 3)  - 108);
  }

  moveWindowOnTopCenter () {
    this.moveWindow(this.x, (Graphics.boxHeight / 3));
  }

  moveWindowToCenter() {
    this.moveWindow(this.x, (Graphics.boxHeight / 2) - 36);
  }

  moveWindowToBottom() {
    this.moveWindow(this.x, Graphics.boxHeight - this.calculeHeight());
  }

  isBusy() {
    return this.isOpening() || this.isClosing();
  }

  isAvailable() {
    return !this.isBusy();
  }
}