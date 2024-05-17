class AlignItemsLeftCommandWindowTest extends SceneTest {
  create() {
    const commandYes = CommandWindow.createCommand('Yes', 'YES');
    const commandNo = CommandWindow.createCommand('No', 'NO');
    const hanlderYes = this.createHandler();
    const hanlderNo = this.createHandler();
    const text = [ 
      'Do you want to continue?',
    ];
    this.subject = CommandWindow.create(0, 0, text, [commandYes, commandNo], [hanlderYes, hanlderNo]);
    this.addWatched(this.subject);
    this.subject.alignItemsLeft();
    this.subject.open();
  }

  asserts() {
    this.describe('Deve mostrar os items alinhados a esquerda.');
    this.assertTrue('Estão alinhados a esquerda?', this.subject.isItemsAlign('ITEMS_ALIGN', GameConst.LEFT));
  }
}