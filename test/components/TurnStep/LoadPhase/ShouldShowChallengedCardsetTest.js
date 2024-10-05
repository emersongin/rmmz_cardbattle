class ShouldShowChallengedCardsetLoadPhaseTest extends SceneTest {
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
    CardBattleManager.setChallengedDeck();
    const drawNumber = 2;
    CardBattleManager.drawChallengedCards(drawNumber);
    CardBattleManager.putChallengedCards(drawNumber);
    this.mockFunction(Input, 'isTriggered', () => true);
    const finish = this.getHandler();
    this.mockFunction(this.step, 'startTurn', () => {
      finish();
    });
    this._scene.setStep(this.step);
    this.step.start();
  }

  update() {
    this.step.update();
  }

  restore() {
    CardBattleManager.reset();
    super.restore();
  }
  
  asserts() {
    this.describe('Deve apresentar conjunto de cartões do desafiado na etapa de turno na fase de carregamento.');
    this.expectWasTrue('O conjunto de cartões do desafiado foi apresentado?', this.step.isChallengedCardsetSpriteVisible);
    this.expectTrue('O conjunto de cartões do desafiado tem cartões?', CardBattleManager.hasCardsInChallengedfield());
  }
}