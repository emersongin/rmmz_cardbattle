class AskCommandWindow extends CommandWindowBase {
  static create(x, y, width, height, title, commands) {
    const rect = new Rectangle(x, y, width, height);
    return new AskCommandWindow(rect, title, commands);
  }
}