class TextWindow extends Window_Base {
  static createWindowOneFourthSize(x, y, text) {
    const width = ScreenHelper.getOneFourthWidth();
    const height = null;
    return TextWindow.create(x, y, width, height, text);
  }

  static create(x = 0, y = 0, width = 0, height = 0, text = []) {
    if (!Array.isArray(text)) {
      throw new Error('text must be an array!');
    }
    const rect = new Rectangle(x, y, width, height);
    return new TextWindow(rect, text);
  }

  static borderHeight() {
    return 12;
  }

  static textHeight() {
    return 36;
  }

  static createWindowMiddleSize(x, y, text) {
    const width = ScreenHelper.getHalfWidth();
    const height = null;
    return TextWindow.create(x, y, width, height, text);
  }

  static createWindowFullSize(x, y, text) {
    const width = ScreenHelper.getFullWidth();
    const height = null;
    return TextWindow.create(x, y, width, height, text);
  }

  static setTextColor(text, color) {
    let colorIndex = ColorHelper.getColorIndex(color);
    return `\\c[${colorIndex}]${text}`;
  }

  initialize(rect, text) {
    super.initialize(rect);
    this._textAlignment = GameConst.LEFT;
    this._windowColor = GameConst.DEFAULT_COLOR;
    this._history = [];
    this.setText(text);
    this.resizeByText(text);
    this.closed();
    this.refresh();
  }

  setText(text) {
    this._text = text;
  }

  resizeByText(text) {
    const borderHeight = TextWindow.borderHeight() * 2;
    const textHeight = TextWindow.textHeight() * Math.max(text.length, 0);
    const height = borderHeight + textHeight;
    this.move(this.x, this.y, this.width, height);
    this.updatePadding();
    this.updateBackOpacity();
    this.updateTone();
    this.createContents();
  }

  closed() {
    this._openness = 0;
    this.visible = false;
    this.deactivate();
  }

  refresh() {
    this.contents.clear();
    if (this.hasText()) this.drawTexts();
  }

  hasText() {
    return this._text && this._text.length > 0;
  }

  drawTexts() {
    const texts = this.processTexts(this._text);
    const maxWidth = this.getTextMaxWidth(texts);
    texts.forEach((text, index) => {
      const state = this.getTextState(text);
      const textWidth = state.outputWidth;
      const textProcessed = state.raw;
      const aligment = this.getTextAlignment();
      const x = this.getXAlignment(textWidth, maxWidth, aligment);
      const rect = this.lineRect(index, x);
      this.addHistory('TEXT_' + index, textProcessed);
      this.drawTextEx(text, rect.x, rect.y, rect.width);
    });
  }

  flushTextState(textState) {
    textState.raw += textState.buffer || '';
    textState.raw = textState.raw.replace(/undefined/g, "");
    super.flushTextState(textState);
  }

  processColorChange(colorIndex) {
    const length = this._history.filter(h => /COLOR/i.test(h.symbol)).length;
    this.addHistory('COLOR_' + length, colorIndex);
    super.processColorChange(colorIndex);
  }

  addHistory(symbol, content) {
    const index = this._history.findIndex(h => h.symbol === symbol);
    if (index >= 0) {
      this._history[index].content = content;
      return false;
    }
    const history = this.createHistory(symbol, content);
    this._history.push(history);
  }

  createHistory(symbol, content) {
    return { symbol, content };
  }

  processTexts(text) {
    return text.map(txt => {
      if (Array.isArray(txt)) {
        return txt.reduce((acc, substring, index) => index ? `${acc} ${substring}` : `${acc}${substring}`)
      }
      return txt;
    });
  }

  getTextMaxWidth(text) {
    return text.reduce((max, txt) => {
      const state = this.getTextState(txt);
      const width = state.outputWidth;
      return Math.max(max, width);
    }, 0);
  }

  getTextState(txt) {
    const textState = this.createTextState(txt, 0, 0, 0);
    textState.drawing = false;
    this.processAllText(textState);
    return textState;
  }

  getTextAlignment() {
    this.addHistory('TEXT_ALIGN', this._textAlignment);
    return this._textAlignment;
  }

  getXAlignment(textWidth, maxWidth, align) {
    maxWidth = Math.max(maxWidth, this.width - this.padding * 2);
    switch (align) {
      case GameConst.CENTER:
        return (maxWidth / 2) - (textWidth / 2);
      case GameConst.RIGHT:
        return maxWidth - textWidth;
      default: // GameConst.LEFT
        return 0;
    }
  }

  lineRect(index, x = 0) {
    const y = index * this.lineHeight();
    const width = this.contentsWidth();
    const height = this.lineHeight();
    return new Rectangle(x, y, width, height);
  }

  update() {
    super.update();
    this.updateTone();
  }

  updateTone() {
    switch (this._windowColor) {
      case GameConst.BLUE_COLOR:
        this.setTone(0, 0, 155);
        break;
      case GameConst.RED_COLOR:
        this.setTone(155, 0, 0);
        break;
      default:
        this.setTone(0, 0, 0);
    }
  }

  open() {
    this.visible = true;
    this.activate();
    super.open();
  }

  alignStartTop() {
    this.x = ScreenHelper.getStartPosition();
    this.y = ScreenHelper.getTopPosition();
  }

  alignCenterTop() {
    this.x = ScreenHelper.getCenterPosition(this.width);
    this.y = ScreenHelper.getTopPosition();
  }

  alignEndTop() {
    this.x = ScreenHelper.getEndPosition(this.width);
    this.y = ScreenHelper.getTopPosition();
  }

  alignStartMiddle() {
    this.x = ScreenHelper.getStartPosition();
    this.y = ScreenHelper.getMiddlePosition(this.height);
  }

  alignCenterAboveMiddle() {
    this.x = ScreenHelper.getCenterPosition(this.width);
    this.y = ScreenHelper.getAboveMiddlePosition(this.height);
  }

  alignCenterMiddle() {
    this.x = ScreenHelper.getCenterPosition(this.width);
    this.y = ScreenHelper.getMiddlePosition(this.height);
  }

  alignCenterBelowMiddle() {
    this.x = ScreenHelper.getCenterPosition(this.width);
    this.y = ScreenHelper.getBelowMiddlePosition(this.height);
  }

  alignEndMiddle() {
    this.x = ScreenHelper.getEndPosition(this.width);
    this.y = ScreenHelper.getMiddlePosition(this.height);
  }

  alignStartBottom() {
    this.x = ScreenHelper.getStartPosition();
    this.y = ScreenHelper.getBottomPosition(this.height);
  }

  alignCenterBottom() {
    this.x = ScreenHelper.getCenterPosition(this.width);
    this.y = ScreenHelper.getBottomPosition(this.height);
  }

  alignEndBottom() {
    this.x = ScreenHelper.getEndPosition(this.width);
    this.y = ScreenHelper.getBottomPosition(this.height);
  }

  alignAboveOf(obj) {
    const { y } = obj;
    this.y = ScreenHelper.getPositionAboveOf(y, this.height);
  }

  alignBelowOf(obj) {
    const { y, height } = obj;
    this.y = ScreenHelper.getPositionBelowOf(y, height);
  }

  changeDefaultColor() {
    this._windowColor = GameConst.DEFAULT_COLOR;
  }

  changeBlueColor() {
    this._windowColor = GameConst.BLUE_COLOR;
  }

  changeRedColor() {
    this._windowColor = GameConst.RED_COLOR;
  }

  alignTextLeft() {
    this._textAlignment = GameConst.LEFT;
    this.refresh();
  }

  alignTextCenter() {
    this._textAlignment = GameConst.CENTER;
    this.refresh();
  }

  alignTextRight() {
    this._textAlignment = GameConst.RIGHT;
    this.refresh();
  }

  isTextWasDrawing(symbol, content) {
    return this.isHistory(symbol, content);
  }

  isHistory(symbol, content) {
    const history = this.getHistory(symbol);
    if (!history.length) return false;
    return history.some(h => h.content === content);
  }

  getHistory(symbol) {
    return this._history.filter(history => history.symbol === symbol);
  }

  isOneFourthSize() {
    return this.width === Graphics.boxWidth / 4;
  }
  
  isMiddleSize() {
    return this.width === Graphics.boxWidth / 2;
  }

  isThreeFourthSize() {
    return this.width === Graphics.boxWidth * 3 / 4;
  }

  isFullsize() {
    return this.width === Graphics.boxWidth;
  }

  isBlueColor() {
    return this._windowColor === GameConst.BLUE_COLOR;
  }

  isRedColor() {
    return this._windowColor === GameConst.RED_COLOR;
  }

  isDefaultColor() {
    return this._windowColor === GameConst.DEFAULT_COLOR;
  }

  opened() {
    this._openness = 255;
    this.visible = true;
    this.activate();
  }

  isAvailable() {
    return !this.isBusy();
  }

  isBusy() {
    return this.isOpening() || this.isClosing();
  }

  isOpen() {
    return super.isOpen();
  }

  refreshContent(text = []) {
    if (text.length > 0) {
      this.setText(text);
      this.resizeByText(text);
      this.refresh();
    }
  }
}