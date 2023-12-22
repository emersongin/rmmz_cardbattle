class TextWindow extends Window_Base {
  _text = [];

  constructor(rect) {
    super(rect);
    this.initClosed();
  }

  addText(text) {
    if (!text) return this._text.push('\n');
    this._text.push(text);
  }

  clearTextContent() {
    this._text = [];
  }

  drawTextContent() {
    if (this._text.length) {
      const textContent = this.processTextContent();
      this.drawTextEx(textContent, 0, 0, this._width);
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

  refreshSize() {
    this.move(this.x, this.y, this._width, this.calculeHeight());
  }

  calculeHeight() {
    return this.fittingHeight(this._text.length);
  }

  initClosed() {
    this._openness = 0;
  }
}