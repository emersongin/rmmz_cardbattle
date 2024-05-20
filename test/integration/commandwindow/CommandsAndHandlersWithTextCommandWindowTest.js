class CommandsAndHandlersWithTextCommandWindowTest extends SceneTest {
  create() {
    const hanlderDummys = () => {};
    const commandYes = CommandWindow.createCommand('Yes', 'YES', hanlderDummys);
    const commandNo = CommandWindow.createCommand('No', 'NO', hanlderDummys);
    const text = [ 
      'Do you want to continue?',
    ];
    this.subject = CommandWindow.create(0, 0, text, [commandYes, commandNo]);
    this.addWatched(this.subject);
    this.subject.open();
  }

  asserts() {
    const text = [ 
      'Do you want to continue?',
    ];
    this.describe('Deve mostrar as opções da janela de comando');
    this.assertTrue('Foi desenhado o texto 1?', this.subject.isTextWasDrawing('TEXT_0', text[0]));
    this.assertTrue('Esta com os comandos?', this.subject.haveCommands(['YES', 'NO']));
  }
}