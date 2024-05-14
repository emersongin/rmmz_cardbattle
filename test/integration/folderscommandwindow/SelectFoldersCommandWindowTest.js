class SelectFoldersCommandWindowTest extends SceneTest {
  create() {
    const red = 10;
    const green = 10;
    const blue = 10;
    const white = 10;
    const black = 10;
    const brown = 10;
    const params = [red, green, blue, white, black, brown];
    const energies1 = FoldersCommandWindow.createEnergies(...params);
    const energies2 = FoldersCommandWindow.createEnergies(...params);
    const energies3 = FoldersCommandWindow.createEnergies(...params);
    const folderName1 = 'Folder 1';
    const folderName2 = 'Folder 2';
    const folderName3 = 'Folder 3';
    const commandFolder1 = FoldersCommandWindow.createCommand(folderName1, energies1, 'FOLDER_1');
    const commandFolder2 = FoldersCommandWindow.createCommand(folderName2, energies2, 'FOLDER_2');
    const commandFolder3 = FoldersCommandWindow.createCommand(folderName3, energies3, 'FOLDER_3');
    const title = 'Select a folder';
    this.subject = FoldersCommandWindow.createWindowFullSize(0, 0, title, [commandFolder1, commandFolder2, commandFolder3]);
    this.subject.alignCenterMiddle();
    this.addWatched(this.subject);
    this.subject.open();
  }

  asserts() {
    this.describe('Deve abrir a janela!');
  }
}