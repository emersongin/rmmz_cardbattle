class CommandsAndHandlersCommandWindowTest extends SceneTest {
  create() {
    const hanlderYes = this.createHandler();
    const hanlderNo = this.createHandler();
    const commandYes = CommandWindow.createCommand('Yes', 'YES', hanlderYes);
    const commandNo = CommandWindow.createCommand('No', 'NO', hanlderNo);
    const text = [];
    this.subject = CommandWindow.create(0, 0, text, [commandYes, commandNo]);
    this.addWatched(this.subject);
    this.subject.open();
  }

  asserts() {
    this.describe('Deve mostrar as opções da janela de comando');
  }
}