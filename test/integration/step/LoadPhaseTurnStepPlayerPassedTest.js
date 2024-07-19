class LoadPhaseTurnStepPlayerPassedTest extends SceneTest {
  manager = CardBattleManager;
  step;

  create() {
    const finishTest = this.createHandler();
    this.step = new TurnStep(this._scene, finishTest);
    this.manager.playerPassed = () => {
      this.manager.player.passed = true;
      finishTest();
    };
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
    this.describe('O jogador deve passar a jogada na etapa de jogadas de fase de carregar.');
    this.expectTrue('O jogador passou a jogada?', this.manager.isPlayerPassed());
  }
}