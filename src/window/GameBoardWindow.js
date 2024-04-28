class GameBoardWindow extends CardBattleWindow {
  static create(x, y, width, height) {
    return new GameBoardWindow(new Rectangle(x, y, width, height));
  }

  static createWindowMiddleSize(x, y) {
    const width = Graphics.boxWidth / 2;
    const height = CardBattleWindow.minHeight();
    return GameBoardWindow.create(x, y, width, height);
  }

  static createWindowFullSize(x, y) {
    const width = Graphics.boxWidth;
    const height = CardBattleWindow.minHeight();
    return GameBoardWindow.create(x, y, width, height);
  }

  refresh() {
    // super.refresh();
    console.log('GameBoardWindow refresh');
  }
}