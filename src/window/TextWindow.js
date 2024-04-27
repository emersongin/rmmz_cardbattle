class TextWindow extends Window_Base {
  _lines = [];
  
  constructor(rect) {
    super(rect);
    this.closed();
  }
  
  closed() {
    this._openness = 0;
  }

  static create(x, y, width, height) {
    return new TextWindow(new Rectangle(x, y, width, height));
  }

  addText(text = '') {
    this._lines.push(text);
  }

  renderText() {
    if (this._lines.length) {
      const textContent = this.processLines();
      this.resize(textContent);
      this.drawTextEx(textContent, 0, 0, 0);
    }
  }

  processLines() {
    let textContent = [];
    this._lines.forEach((text, index) => {
      if (index > 0) textContent.push('\n');
      textContent.push(text);
    });
    return textContent.join('');
  }

  resize(textContent) {
    this.move(this.x, this.y, this.calculeWidth(textContent), this.calculeHeight());
  }

  calculeWidth(textContent) {
    // return this.textSizeEx(textContent).width;
    return 300;
    
  }

  calculeHeight() {
    return this.fittingHeight(this.numberLines() + 2);
  }

  numberLines() {
    return this._lines.length;
  }

  // clear() {
  //   this._lines = [];
  //   this.contents.clear();
  // }

  // changeColor(color) {
  //   color = `\\C[${color}]`;
  //   this._lines.unshift(color);
  // }
}