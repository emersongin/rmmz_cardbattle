class LoadPhaseTurnStepPlayerStartFirstTest extends SceneTest {
  manager = CardBattleManager;
  step;
  turns = [];

  create() {
    this.step = new TurnStep(this._scene);
    this.manager.playerStart = () => {
      this.playerStartTurn = true;
      this.turns.push(GameConst.PLAYER);
    };
    const finish = this.createHandler();
    this.manager.isPlayerStartTurn = () => {
      finish();
      return this.playerStartTurn;
    }
    this.manager.playerStart();
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
    this.describe('O jogador deve iniciar a jogada na etapa de jogadas de fase de carregar.');
    this.expectTrue('O jogador iniciou a jogada?', this.turns[0] === GameConst.PLAYER);
  }
}