class LoadPhaseTurnStepPlayerPassedTest extends SceneTest {
  manager = CardBattleManager;
  step;

  create() {
    const phase = GameConst.LOAD_PHASE;
    const finish = this.createHandler();
    this.step = new TurnStep(this._scene, phase, finish);
  }

  start() {
    this.manager.setPlayerDeck();
    this.manager.setChallengedDeck();
    const finish = this.createHandler();
    this.mockFunction(this.manager, 'playerPassed', () => {
      this.manager.player.passed = true;
      finish();
    });
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