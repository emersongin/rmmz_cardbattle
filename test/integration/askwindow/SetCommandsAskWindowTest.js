class SetCommandsAskWindowTest extends SceneTest {
  create() {
    this.pressToAsserts();
    const commandYes = AskWindow.createCommand('Yes', 'YES');
    const commandNo = AskWindow.createCommand('No', 'NO');
    const askText = 'Do you want to continue?';
    this.subject = AskWindow.createWindowFullSize(0, 0, askText, [commandYes, commandNo]);
    this.subject.alignCenterMiddle();
    this.addWatched(this.subject);
    this.subject.open();
  }

  asserts() {
    this.describe('Deve abrir a janela!');
    this.assertTrue('Esta aberta?', this.subject.isOpen());
  }
}