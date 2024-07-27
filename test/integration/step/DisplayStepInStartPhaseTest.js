class DisplayStepInStartPhaseTest extends SceneTest {
  manager = CardBattleManager;
  step;

  create() {
    const phase = GameConst.START_PHASE;
    const finish = this.createHandler();
    this.step = new DisplayStep(this._scene, phase, finish);
    this.addAssistedHidden(this.step);
  }

  start() {
    this.setStep(this.step);
    this.step.start(this.manager);
  }

  update() {
    this.step.update(this.manager);
  }
  
  asserts() {
    this.describe('Deve apresentar etapa de apresentação de fase na fase de sacar cartas.');
    this.expectWasTrue('A janela de título foi apresentada?', this.step.isTitleWindowVisible);
    this.expectWasTrue('A janela de descrição foi apresentada?', this.step.isDescriptionWindowVisible);
    this.expectTrue('O título da fase foi apresentado como?', this.step.isTextTitleWindow('Start Phase'));
    const texts = ['Draw Calumon to go first.'];
    this.expectTrue('A descrição da fase foi apresentada como?', this.step.isTextDescriptionWindow(texts));
    this.expectTrue('A proxima Etapa é MiniGameStep?', this.isStep(MiniGameStep));
  }
}