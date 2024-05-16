class CommandsAndHandlersCommandWindowTest extends SceneTest {
  create() {
    const commandYes = CommandWindowBase.createCommand('Yes', 'YES');
    const commandNo = CommandWindowBase.createCommand('No', 'NO');
    const hanlderYes = this.createHandler();
    const hanlderNo = this.createHandler();
    this.subject = CommandWindowBase.create(0, 0, '', [commandYes, commandNo], [hanlderYes, hanlderNo]);
    this.addWatched(this.subject);
    this.subject.open();
  }

  asserts() {
    this.describe('Deve chamar o manipular ao escolher uma opção!');
  }
}