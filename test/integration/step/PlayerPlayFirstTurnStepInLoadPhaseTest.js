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
    });
    this.mockFunction(this.manager, 'isPlayerStartTurn', () => {
      finish();
    });
    this.manager.playerStart();
    this._scene.setStep(this.step);
    this.step.start(this.manager);
  }

  update() {
    this.step.update(this.manager);
  }
  
  asserts() {
    this.describe('Deve apresentar etapa de turno e jogador jogar primeiro na fase de carregar.');
    this.expectWasTrue('A janela de tabuleiro do jogador foi apresentado?', this.step.isPlayerBoardWindowVisible);
    this.expectWasTrue('A janela de batalha do jogador foi apresentada?', this.step.isPlayerBattleWindowVisible);
    this.expectWasTrue('A janela de pontuação do jogador foi apresentada?', this.step.isPlayerScoreWindowVisible);
    this.expectWasTrue('A janela de lixo do jogador foi apresentada?', this.step.isPlayerTrashWindowVisible);
    this.expectWasTrue('A janela de tabuleiro do desafiado foi apresentado?', this.step.isChallengedBoardWindowVisible);
    this.expectWasTrue('A janela de batalha do desafiado foi apresentada?', this.step.isChallengedBattleWindowVisible);
    this.expectWasTrue('A janela de pontuação do desafiado foi apresentada?', this.step.isChallengedScoreWindowVisible);
    this.expectWasTrue('A janela de lixo do desafiado foi apresentada?', this.step.isChallengedTrashWindowVisible);
    const first = this.turns.shift();
    this.expectTrue('O jogador foi o primeiro a jogar?', first === GameConst.PLAYER);
  }
}