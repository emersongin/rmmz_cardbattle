class LoadPhaseTurnStepPlayerPlaysNextTest extends SceneTest {
  manager = CardBattleManager;
  step;

  create() {
    this.step = new TurnStep(this._scene);
  }

  start() {
    this._scene.setPhase(GameConst.LOAD_PHASE);
    this._scene.setStep(this.step);
    this.step.start(this.manager);
  }

  update() {
    this.step.update(this.manager);
  }
  
  asserts() {
    this.describe('O jogador não deve iniciar a jogada na etapa de jogadas de fase de carregar.');
    this.expectTrue('O jogador não iniciou a jogada?', this.manager.isPlayerStartTurn() === false);
  }
}