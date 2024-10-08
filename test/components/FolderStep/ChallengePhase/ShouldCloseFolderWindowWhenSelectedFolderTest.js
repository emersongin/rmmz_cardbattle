class ShouldCloseFolderWindowWhenSelectedFolderTest extends SceneTest {
  step;

  create() {
    this.createHandler();
    this.step = new FolderStep(this._scene, GameConst.CHALLENGE_PHASE);
    this.addAssistedHidden(this.step);
  }

  start() {
    this._scene.setStep(this.step);
    this.step.start();
    this.step.addAction(() => {
      const index = 0;
      this.step.selectFolderWindowOption(index);
    });
    const finish = this.getHandler();
    this.spyFunction(this.step, 'commandFinish', () => {
      finish();
    });
  }

  update() {
    this.step.update();
  }
  
  asserts() {
    this.describe('Deve escolher uma pasta e mudar para próxima etapa de apresentação da fase de início.');
    this.expectTrue('A janela de pastas do jogador foi fechada?', this.step.isFolderWindowClosed());
    this.expectTrue('A pasta foi escolhida?', CardBattleManager.folderIndex !== -1);
    this.expectTrue('A proxima etapa é DisplayStep?', this.isStep(DisplayStep));
    this.expectTrue('A proxima Fase é START_PHASE?', this.step.getPhase() === GameConst.START_PHASE);
  }
}