class DrawTextAndLinesTextWindowTest extends SceneTest {
  textWindowFullSize;

  create() {
    const x = 0;
    const y = 0;
    this.textWindowFullSize = TextWindow.createWindowFullSize(x, y);
  }

  start() {      
    return new Promise(async resolve => {
      await this.timertoTrue(600, () => {
        this.scene.addWindow(this.textWindowFullSize);
        this.textWindowFullSize.addText("Hello World");
        this.textWindowFullSize.addText("\n");
        this.textWindowFullSize.addText("\n");
        this.textWindowFullSize.renderText();
        this.textWindowFullSize.open();
      });
      await this.timertoTrue(600, () => {
        this.textWindowFullSize.close();
      });
      resolve(true);
    });
  }
}