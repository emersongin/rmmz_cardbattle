class CommandsAndHandlersCommandWindowTest extends SceneTest {
  create() {
    const commandYes = CommandWindow.createCommand('Yes', 'YES');
    const commandNo = CommandWindow.createCommand('No', 'NO');
    const hanlderYes = this.createHandler();
    const hanlderNo = this.createHandler();
    const text = [];
    this.subject = CommandWindow.create(0, 0, text, [commandYes, commandNo], [hanlderYes, hanlderNo]);
    this.addWatched(this.subject);
    this.subject.open();
  }

  asserts() {
    this.describe('Deve mostrar as opções da janela de comando');
  }
}