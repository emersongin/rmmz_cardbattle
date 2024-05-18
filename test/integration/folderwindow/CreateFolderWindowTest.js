class CreateFolderWindowTest extends SceneTest {
  create() {
    const handlerDummy = () => {};
    const energies1 = FolderWindow.createEnergies(10, 10, 5, 5, 5, 5);
    const energies2 = FolderWindow.createEnergies(10, 10, 10, 10, 10, 10);
    const energies3 = FolderWindow.createEnergies(10, 10, 10, 0, 0, 0);
    const commandFolder1 = FolderWindow.createCommand('Folder Name One', 'FOLDER_ONE', handlerDummy, energies1);
    const commandFolder2 = FolderWindow.createCommand('Folder Name Two', 'FOLDER_TWO', handlerDummy, energies2);
    const commandFolder3 = FolderWindow.createCommand('Folder Name Three', 'FOLDER_THREE', handlerDummy, energies3);
    let title = 'Choose a folder';
    title = CommandWindow.setTextColor(title, GameColors.ORANGE);
    const text = [title];
    const commands = [commandFolder1, commandFolder2, commandFolder3];
    this.subject = FolderWindow.create(0, 0, text, commands);
    this.addWatched(this.subject);
    this.subject.alignTextCenter();
    this.subject.open();
  }

  asserts() {
    this.describe('Deve exibir a janela de comandos de pastas!');
    this.assertTrue('Esta aberta?', this.subject.isOpen());
  }
}