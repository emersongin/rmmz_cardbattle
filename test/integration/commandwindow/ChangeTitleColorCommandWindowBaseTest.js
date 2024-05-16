class ChangeTitleColorCommandWindowBaseTest extends SceneTest {
  create() {
    const title = 'ChangeTitleColorCommandWindowBaseTest';
    this.subject = CommandWindowBase.create(0, 0, title);
    this.addWatched(this.subject);
    this.subject.alignTitleCenter();
    this.subject.changeTitleColorToOrange();
    this.subject.open();
  }

  asserts() {
    const color = ColorManager.textColor(GameColorIndexs.ORANGE_COLOR);
    this.describe('Deve mudar a cor do titulo!');
    this.assert('O esta na cor?', this.subject.getTitleColor()).toBe(color);
  }
}