class ChallengedPlayedTurnStepInLoadPhaseTest extends SceneTest {
  manager = CardBattleManager;
  step;

  create() {
    const phase = GameConst.LOAD_PHASE;
    const finish = this.createHandler();
    const handlers = {
      playerPlayHandler: () => {},
      playerPassedHandler: () => {},
      challengedPlayHandler: () => {
        this.step.changeStep(ActivatePowerCardStep);
        finish();
      },
      challengedPassedHandler: () => {},
      activePowerfieldHandler: () => {},
    };
    this.step = new TurnStep(this._scene, phase, handlers, finish);
    this.addAssistedHidden(this.step);
  }

  start() {
    this.manager.setPlayerDeck();
    this.manager.setChallengedDeck();
    this.manager.drawChallengedCards(6);
    this._scene.setStep(this.step);
    this.step.start(this.manager);
    this.mockFunction(Input, 'isTriggered', () => true);
  }

  update() {
    this.step.update(this.manager);
  }
  
  asserts() {
    this.describe('Deve apresentar etapa de turno e desafiado faz jogada na fase de carregar.');
    this.expectWasTrue('A janela de tabuleiro do jogador foi apresentado?', this.step.isPlayerBoardWindowVisible);
    this.expectWasTrue('A janela de batalha do jogador foi apresentada?', this.step.isPlayerBattleWindowVisible);
    this.expectWasTrue('A janela de pontuação do jogador foi apresentada?', this.step.isPlayerScoreWindowVisible);
    this.expectWasTrue('A janela de lixo do jogador foi apresentada?', this.step.isPlayerTrashWindowVisible);
    this.expectWasTrue('A janela de tabuleiro do desafiado foi apresentado?', this.step.isChallengedBoardWindowVisible);
    this.expectWasTrue('A janela de batalha do desafiado foi apresentada?', this.step.isChallengedBattleWindowVisible);
    this.expectWasTrue('A janela de pontuação do desafiado foi apresentada?', this.step.isChallengedScoreWindowVisible);
    this.expectWasTrue('A janela de lixo do desafiado foi apresentada?', this.step.isChallengedTrashWindowVisible);
    this.expectTrue('A proxima Etapa é ActivatePowerCardStep?', this.isStep(ActivatePowerCardStep));
  }
}