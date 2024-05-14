class SelectOptionAskCommandWindowTest extends SceneTest {
  create() {
    this.pressToAsserts();
    const commandYes = AskCommandWindow.createCommand('Yes', 'YES');
    const commandNo = AskCommandWindow.createCommand('No', 'NO');
    const questionText = 'Do you want to continue?';
    this.subject = AskCommandWindow.create(0, 0, questionText, [commandYes, commandNo]);
    this.addWatched(this.subject);
    this.subject.alignMiddle();
    this.subject.open();
  }

  asserts() {
    this.describe('Deve mostrar as opções!');
  }
}