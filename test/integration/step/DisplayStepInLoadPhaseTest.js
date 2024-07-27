class DisplayStepInLoadPhaseTest extends SceneTest {
  manager = CardBattleManager;
  step;

  create() {
    const phase = GameConst.LOAD_PHASE;
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
    this.describe('Deve apresentar etapa de apresentação de fase na fase de carregar.');
    this.expectWasTrue('A janela de título foi apresentada?', this.step.isTitleWindowVisible);
    this.expectWasTrue('A janela de descrição foi apresentada?', this.step.isDescriptionWindowVisible);
    this.expectTrue('O título da fase foi apresentado como?', this.step.isTextTitleWindow('Load Phase'));
    const texts = ['Select and use a Program Card.'];
    this.expectTrue('A descrição da fase foi apresentada como?', this.step.isTextDescriptionWindow(texts));
    this.expectTrue('A proxima Etapa é TurnStep?', this.isStep(TurnStep));
  }
}