class ShouldShowChallengedCardsetDrawPhaseTest extends SceneTest {
  step;

  create() {
    this.createHandler();
    this.step = new DrawStep(this._scene, GameConst.DRAW_PHASE);
    this.addAssistedHidden(this.step);
  }

  start() {
    CardBattleManager.setPlayerDeck();
    CardBattleManager.setChallengedDeck();
    this._scene.setStep(this.step);
    this.step.start();
    const finish = this.getHandler();
    this.mockFunction(Input, 'isTriggered', finish);
  }

  update() {
    this.step.update();
  }
  
  asserts() {
    this.describe('Deve apresentar conjunto de cartões do desafiado.');
    this.expectWasTrue('O conjunto de cartões do desafiado foi apresentado?', this.step.isChallengedCardsetSpriteVisible);
  }
}