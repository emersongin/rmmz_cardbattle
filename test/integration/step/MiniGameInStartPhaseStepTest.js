class MiniGameInStartPhaseStepTest extends SceneTest {
  manager = CardBattleManager;
  step;
  win;

  create() {
    const phase = GameConst.START_PHASE;
    const finish = this.createHandler();
    const resultMock = (win) => {
      this.win = win;
    };
    this.step = new MiniGameStep(this._scene, phase, resultMock, finish);
    this.addAssistedHidden(this.step);
  }

  start() {
    this._scene.setStep(this.step);
    this.step.start(this.manager);
  }

  update() {
    this.step.update(this.manager);
  }
  
  asserts() {
    this.describe('Deve apresentar etapa de mini game de fase de início de batalha.');
    this.expectWasTrue('O set de cartas foi apresentado?', this.step.isCardsetVisible);
    this.expectWasTrue('O set de cartas estava em modo de seleção?', this.step.isCardsetOnSelectMode);
    this.expectWasTrue('O set de cartas foi embaralhado?', this.step.isCardsetShuffled);
    this.expectWasTrue('A janela de resultado foi apresentada?', this.step.isResultWindowVisible);
    this.expectTrue('Tem um resultado?', typeof this.win === 'boolean');
    // this.expectWasTrue('O texto da janela de resultado estava como?', this.step.isResultWindowVisible);
    // this.expectTrue('A proxima Etapa é DisplayStep?', this.isStep(DisplayStep));
    // this.expectTrue('A proxima Fase é StartPhase?', this.step.getPhase() === GameConst.START_PHASE);
  }
}