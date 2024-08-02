class DisplayStepInChallengePhaseTest extends SceneTest {
  manager = CardBattleManager;
  step;

  create() {
    const phase = GameConst.CHALLENGE_PHASE;
    const finish = this.createHandler();
    this.step = new DisplayStep(this._scene, phase, finish);
    this.addAssistedHidden(this.step);
  }

  start() {
    this.setStep(this.step);
    this.step.start(this.manager);
    this.mockFunction(Input, 'isTriggered', () => true);
  }

  update() {
    this.step.update(this.manager);
  }
  
  asserts() {
    this.describe('Deve apresentar etapa de apresentação de fase na fase de desafio.');
    this.expectWasTrue('A janela de título foi apresentada?', this.step.isTitleWindowVisible);
    this.expectWasTrue('A janela de descrição foi apresentada?', this.step.isDescriptionWindowVisible);
    this.expectTrue('O título da fase foi apresentado como?', this.step.isTextTitleWindow('Challenge Phase'));
    const texts = [
      'Descrição de Desafiado',
      'O jogador que é desafiado por você.',
    ];
    this.expectTrue('A descrição da fase foi apresentada como?', this.step.isTextDescriptionWindow(texts));
    this.expectTrue('A proxima Etapa é FolderStep?', this.isStep(FolderStep));
  }
}