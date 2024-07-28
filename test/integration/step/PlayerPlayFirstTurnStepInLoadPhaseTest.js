class PlayerPlayFirstTurnStepInLoadPhaseTest extends SceneTest {
  manager = CardBattleManager;
  step;
  turns = [];

  create() {
    const phase = GameConst.LOAD_PHASE;
    const finish = this.createHandler();
    this.step = new TurnStep(this._scene, phase, finish);
    this.addAssistedHidden(this.step);
  }

  start() {
    this.manager.setPlayerDeck();
    this.manager.setChallengedDeck();
    const finish = this.createHandler();
    this.mockFunction(this.manager, 'playerStart', () => {
      this.turns.push(GameConst.PLAYER);
      this.manager.playerStartTurn = true;
    });
    this.mockFunction(this.manager, 'isPlayerStartTurn', () => {
      finish();
      return this.manager.playerStartTurn;
    });
    this.manager.playerStart();
    this._scene.setStep(this.step);
    this.step.start(this.manager);
  }

  update() {
    this.step.update(this.manager);
  }
  
  asserts() {
    this.describe('O jogador deve iniciar a jogada na etapa de jogadas de fase de carregar.');
    this.expectTrue('O jogador iniciou a jogada?', this.turns[0] === GameConst.PLAYER);
  }
}