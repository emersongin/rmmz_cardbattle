class ShouldShowPlayerFolderWindowTest extends SceneTest {
  step;

  create() {
    this.createHandler();
    this.step = new FolderStep(this._scene, GameConst.CHALLENGE_PHASE);
    this.addAssistedHidden(this.step);
  }

  start() {
    this._scene.setStep(this.step);
    this.step.start();
    const finish = this.getHandler();
    this.step.addAction(finish);
  }

  update() {
    this.step.update();
  }
  
  asserts() {
    this.describe('Deve apresentar janela de escolha de pasta e sua descrição.');
    this.expectWasTrue('A janela de pastas foi apresentada?', this.step.isFoldersWindowVisible);
    this.expectTrue('A descrição da janela de pastas foi apresentado como?', this.step.isTextFoldersWindow('Choose a folder'));
  }
}