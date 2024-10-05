class PlayerMustPlayedNextWhenLosingMiniGameLoadPhaseTest extends SceneTest {
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
    this.mockFunction(Input, 'isTriggered', () => true);
    const finish = this.getHandler();
    this.spyFunction(this.step, 'updateChallengedTurn', () => {
      this.step.addAction(finish);
    });
    this._scene.setStep(this.step);
    this.step.start();
  }

  update() {
    this.step.update();
  }
  
  asserts() {
    this.describe('Desafiado deve inicia jogada se jogador não vencer o mini jogo em fase de carregamento.');
    this.expectTrue('O jogador não deve iniciar jogada!', CardBattleManager.isPlayerStartTurn() === false);
    this.expectTrue('O jogador esta aguardando para jogar?', CardBattleManager.isPlayerWaiting());
    this.expectTrue('O desafiado esta aguardando para jogar?', CardBattleManager.isChallengedWaiting());
  }
}