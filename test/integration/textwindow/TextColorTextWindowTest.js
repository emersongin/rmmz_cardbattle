class TextColorTextWindowTest extends SceneTest {
  textWindowText;
  textWindowTextEx;
  
  create() {
    const x = 0;
    const y = 0;
    this.textWindowText = TextWindow.createWindowFullSize(x, y);
    this.textWindowTextEx = TextWindow.createWindowFullSize(x, y);
  }

  start() {      
    return new Promise(async resolve => {
      await this.timertoTrue(600, () => {
        this.scene.addWindow(this.textWindowText);
        const middle = 4;
        this.textWindowText.setVerticalPosition(middle)
        this.textWindowText.setTextColor("#ff0000");
        this.textWindowText.addText("Hello World");
        this.textWindowText.renderTextCenter();
        this.textWindowText.open();
      });
      await this.timertoTrue(600, () => {
        this.textWindowText.close();
      });
      await this.timertoTrue(600, () => {
        this.scene.addWindow(this.textWindowTextEx);
        const middle = 4;
        this.textWindowTextEx.setVerticalPosition(middle)
        const primaryColor = 2;
        const sencondColor = 5;
        const thirdColor = 8;
        this.textWindowTextEx.changeTextColorHere(primaryColor);
        this.textWindowTextEx.appendText("Hello World");
        this.textWindowTextEx.changeTextColorHere(sencondColor);
        this.textWindowTextEx.addText("Hello World");
        this.textWindowTextEx.changeTextColorHere(thirdColor);
        this.textWindowTextEx.appendText("Hello World");
        this.textWindowTextEx.renderTextExCenter();
        this.textWindowTextEx.open();
      });
      await this.timertoTrue(600, () => {
        this.textWindowTextEx.close();
      });
      resolve(true);
    });
  }
}