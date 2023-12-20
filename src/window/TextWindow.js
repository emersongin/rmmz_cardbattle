class TextWindow extends Window_Base {
  constructor(rect) {
    super(rect);
    this.initClosed();
    this.drawText('text', 0, 0, 320, 'left');
  }

  initClosed() {
    this._openness = 0;
  }
}