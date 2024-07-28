class PlayerPlayNextTurnStepInLoadPhaseTest extends SceneTest {
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
    this.mockFunction(this.manager, 'isPlayerStartTurn', () => {
      finish();
      return this.manager.playerStartTurn;
    });
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