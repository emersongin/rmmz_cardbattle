class TextWindow extends Window_Base {
  
  constructor(rect) {
    super(rect);
    this.close();
  }

  static create(x, y, width, height) {
    return new TextWindow(new Rectangle(x, y, width, height));
  }

  close() {
    this._openness = 0;
  }
}