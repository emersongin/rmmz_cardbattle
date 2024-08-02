class PlayerPassedTurnStepInLoadPhaseTest extends SceneTest {
  manager = CardBattleManager;
  step;
  passed = false;

  create() {
    const phase = GameConst.LOAD_PHASE;
    const finish = this.createHandler();
    const handlers = {
      playerPlayHandler: () => {},
      playerPassedHandler: () => {
        this.manager.playerPassed();
        this.passed = true;
        finish();
      },
      challengedPlayHandler: () => {},
      challengedPassedHandler: () => {},
      activePowerfieldHandler: () => {},
    };
    this.step = new TurnStep(this._scene, phase, handlers, finish);
    this.addAssistedHidden(this.step);
  }

  start() {
    this.manager.setPlayerDeck();
    this.manager.setChallengedDeck();
    this.manager.playerStart();
    this._scene.setStep(this.step);
    this.step.start(this.manager);
    this.mockFunction(Input, 'isTriggered', () => true);
    const includeOriginal = true;
    this.mockFunction(this.step, 'commandOpenAskWindow', () => {
      const index = 1;
      this.step.selectAskWindowOption(index);
    }, includeOriginal);
  }

  update() {
    this.step.update(this.manager);
  }
  
  asserts() {
    this.describe('Deve apresentar etapa de turno e jogador passar a jogada na fase de carregar.');
    this.expectWasTrue('A janela de tabuleiro do jogador foi apresentado?', this.step.isPlayerBoardWindowVisible);
    this.expectWasTrue('A janela de batalha do jogador foi apresentada?', this.step.isPlayerBattleWindowVisible);
    this.expectWasTrue('A janela de pontuação do jogador foi apresentada?', this.step.isPlayerScoreWindowVisible);
    this.expectWasTrue('A janela de lixo do jogador foi apresentada?', this.step.isPlayerTrashWindowVisible);
    this.expectWasTrue('A janela de tabuleiro do desafiado foi apresentado?', this.step.isChallengedBoardWindowVisible);
    this.expectWasTrue('A janela de batalha do desafiado foi apresentada?', this.step.isChallengedBattleWindowVisible);
    this.expectWasTrue('A janela de pontuação do desafiado foi apresentada?', this.step.isChallengedScoreWindowVisible);
    this.expectWasTrue('A janela de lixo do desafiado foi apresentada?', this.step.isChallengedTrashWindowVisible);
    this.expectTrue('O jogador passou a jogada?', this.passed === true);
  }
}