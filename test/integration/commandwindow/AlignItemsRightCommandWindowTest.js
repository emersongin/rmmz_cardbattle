class AlignItemsRightCommandWindowTest extends SceneTest {
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
    this.subject.alignItemsRight();
    this.subject.open();
  }

  asserts() {
    this.describe('Deve mostrar os items alinhados a direita.');
    this.assertTrue('Estão alinhados a direita?', this.subject.isItemsAlign('ITEMS_ALIGN', GameConst.RIGHT));
  }
}