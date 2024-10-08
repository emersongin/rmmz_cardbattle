class TrashWindow extends ValuesWindow {
  static create(x, y) {
    const width = (Graphics.boxWidth / 4) / 2;
    const height = StateWindow.minHeight() * 2;
    return new TrashWindow(new Rectangle(x, y, width, height));
  }

  static createValueUpdate(name, value) {
    return ValuesWindow.createValueUpdate(name, value);
  }

  initialize(rect) {
    super.initialize(rect);
    this._reverseIcons = true;
    this.reset();
  }

  reset() {
    super.reset();
    this.refreshPoints();
  }

  refreshPoints(cardsInTrash = 0) {
    this.addValue(GameConst.NUM_CARDS_IN_TRASH, cardsInTrash);
    this.refresh();
  }

  orderedIcons() {
    this._reverseIcons = true;
    this.refresh();
  }

  reverseIcons() {
    this._reverseIcons = false;
    this.refresh();
  }

  refresh() {
    super.refresh();
    this.drawIcons();
    this.drawPoints();
  }

  drawIcons() {
    const x = (this.contents.width / 2) - (ImageManager.iconWidth / 2);
    const y = this.getYItemHeight(this._reverseIcons ? 0 : 1) + this.getMiddleIconHeight();
    this.drawIcon(IconSetConst.TRASH, x, y);
  }

  getYItemHeight(number) {
    return this.itemHeight() * number;
  }

  getMiddleIconHeight() {
    return ImageManager.iconHeight / 2;
  }

  drawPoints() {
    const numCards = this.getValueAndConvertToDisplayPad(GameConst.NUM_CARDS_IN_TRASH);
    this.contents.drawText(
      numCards, 
      0, 
      this.getYItemHeight(this._reverseIcons ? 1 : 0) - this.getMiddleIconHeight(), 
      this.contents.width, 
      this.contents.height,
      'center'
    );
  }

  isIconsOrdered() {
    return this._reverseIcons;
  }

  isIconsReverse() {
    return !this._reverseIcons;
  }
}