class SetSizeTextWindowTest extends SceneTest {
  textWindowMiddleSize;
  textWindowFullSize;

  create() {
    const x = 0;
    const y = 0;
    this.textWindowMiddleSize = TextWindow.createWindowMiddleSize(x, y);
    this.textWindowFullSize = TextWindow.createWindowFullSize(x, y);
  }

  start() {      
    return new Promise(async resolve => {
      await this.timertoTrue(600, () => {
        this.scene.addWindow(this.textWindowMiddleSize);
        this.textWindowMiddleSize.open();
      });
      await this.timertoTrue(600, () => {
        this.textWindowMiddleSize.close();
      });
      await this.timertoTrue(600, () => {
        this.scene.addWindow(this.textWindowFullSize);
        this.textWindowFullSize.open();
      });
      await this.timertoTrue(600, () => {
        this.textWindowFullSize.close();
      });
      resolve(true);
    });
  }
}