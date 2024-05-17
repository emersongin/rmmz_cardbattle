class CreateFolderWindowTest extends SceneTest {
  create() {
    const hanlderFolder1 = this.createHandler();
    const hanlderFolder2 = this.createHandler();
    const hanlderFolder3 = this.createHandler();
    const energies1 = FolderWindow.createEnergies(10, 10, 5, 5, 5, 5);
    const energies2 = FolderWindow.createEnergies(10, 10, 10, 10, 10, 10);
    const energies3 = FolderWindow.createEnergies(10, 10, 10, 0, 0, 0);
    const commandFolder1 = FolderWindow.createCommand('Folder Name One', 'FOLDER_ONE', hanlderFolder1, energies1);
    const commandFolder2 = FolderWindow.createCommand('Folder Name Two', 'FOLDER_TWO', hanlderFolder2, energies2);
    const commandFolder3 = FolderWindow.createCommand('Folder Name Three', 'FOLDER_THREE', hanlderFolder3, energies3);
    let title = 'Choose a folder';
    title = CommandWindow.setTextColor(title, GameColorIndexs.ORANGE);
    const text = [title];
    const commands = [commandFolder1, commandFolder2, commandFolder3];
    const handlers = [hanlderFolder1, hanlderFolder2, hanlderFolder3];
    this.subject = FolderWindow.create(0, 0, text, commands, handlers);
    this.addWatched(this.subject);
    this.subject.alignTextCenter();
    this.subject.open();
  }

  asserts() {
    this.describe('Deve exibir a janela de comandos de pastas!');
    this.assertTrue('Esta aberta?', this.subject.isOpen());
  }
}