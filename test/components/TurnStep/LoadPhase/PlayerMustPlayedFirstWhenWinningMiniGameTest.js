class PlayerMustPlayedFirstWhenWinningMiniGameLoadPhaseTest extends SceneTest {
  step;

  create() {
    this.createHandler();
    const handlers = {
      playerPlayHandler: () => {},
      playerPassedHandler: () => {},
      challengedPlayHandler: () => {},
      challengedPassedHandler: () => {},
      activePowerfieldHandler: () => {},
    };
    this.step = new TurnStep(this._scene, GameConst.LOAD_PHASE, handlers);
    this.addAssistedHidden(this.step);
  }

  start() {
    CardBattleManager.playerStart();
    this.mockFunction(Input, 'isTriggered', () => true);
    const finish = this.getHandler();
    this.spyFunction(this.step, 'updatePlayerTurn', () => {
      this.step.addAction(finish);
    });
    this._scene.setStep(this.step);
    this.step.start();
  }

  update() {
    this.step.update();
  }
  
  asserts() {
    this.describe('Jogador deve inicia jogada ao vencer o mini jogo em fase de carregamento.');
    this.expectTrue('O jogador deve ser o primeiro a jogar?', CardBattleManager.isPlayerStartTurn());
    this.expectTrue('O jogador esta aguardando para jogar?', CardBattleManager.isPlayerWaiting());
    this.expectTrue('O desafiado esta aguardando para jogar?', CardBattleManager.isChallengedWaiting());
    this.expectWasTrue('A janela de decisão foi aberta?', this.step.isAskWindowVisible);
  }
}