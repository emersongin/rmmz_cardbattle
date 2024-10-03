class ShouldShowGameResultWindowCardsTest extends SceneTest {
  step;

  create() {
    this.createHandler();
    const gameResult = (win) => {
      if (win) CardBattleManager.playerStart();
    };
    this.step = new MiniGameStep(this._scene, GameConst.START_PHASE, gameResult);
    this.addAssistedHidden(this.step);
  }

  start() {
    this._scene.setStep(this.step);
    this.step.start();
    this.mockFunction(Input, 'isTriggered', () => true);
    const finish = this.getHandler();
    this.spyFunction(this.step, 'commandFinish', () => {
      finish();
    });
  }

  update() {
    this.step.update();
  }
  
  asserts() {
    this.describe('Deve apresentar janela de resultado de jogo na etapa de mini game na fase de início.');
    this.expectWasTrue('A janela de resultado de jogo foi apresentada?', this.step.isResultWindowVisible);
    const resultText = CardBattleManager.isPlayerStartTurn() ? 'You go first!' : 'You go next!';
    this.expectTrue('O texto da janela estava como?', this.step.isTextResultWindow(resultText));
  }
}