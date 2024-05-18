class AlignItemsCenterCommandWindowTest extends SceneTest {
  create() {
    const commandYes = CommandWindow.createCommand('Yes', 'YES', () => {});
    const commandNo = CommandWindow.createCommand('No', 'NO', () => {});
    const text = [ 
      'Do you want to continue?',
    ];
    this.subject = CommandWindow.create(0, 0, text, [commandYes, commandNo]);
    this.addWatched(this.subject);
    this.subject.alignItemsCenter();
    this.subject.open();
  }

  asserts() {
    this.describe('Deve mostrar os items alinhados no centro.');
    this.assertTrue('Estão alinhados no centro?', this.subject.isItemsAlign('ITEMS_ALIGN', GameConst.CENTER));
  }
}