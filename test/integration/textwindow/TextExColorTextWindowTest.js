class TextExColorTextWindowTest extends SceneTest {
  name = 'TextExColorTextWindowTest';

  create() {
    const x = 0;
    const y = 0;
    this.subject = TextWindow.createWindowFullSize(x, y);
    this.subject.setcenteredPosition();
  }

  start() {      
    return new Promise(async resolve => {
      await this.timertoTrue(600, () => {
        this.scene.addWindow(this.subject);
        const primaryColor = 2;
        const sencondColor = 5;
        const thirdColor = 8;
        this.subject.changeTextColorHere(primaryColor);
        this.subject.appendText("Hello World");
        this.subject.changeTextColorHere(sencondColor);
        this.subject.addText("Hello World");
        this.subject.changeTextColorHere(thirdColor);
        this.subject.appendText("Hello World");
        this.subject.renderTextExCenter();
        this.subject.open();
      });
      await this.timertoTrue(600, () => {
        this.subject.close();
      });
      resolve(true);
    });
  }
}