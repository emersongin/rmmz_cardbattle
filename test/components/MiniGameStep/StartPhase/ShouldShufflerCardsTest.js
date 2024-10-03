class ShouldShufflerCardsTest extends SceneTest {
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
    this.mockFunction(Input, 'isTriggered', () => true);
    const finish = this.getHandler();
    this.mockFunction(this.step, 'startMiniGame', () => {
      finish();
    });
    this._scene.setStep(this.step);
    this.step.start();
  }

  update() {
    this.step.update();
  }
  
  asserts() {
    this.describe('Deve apresentar conjunto de cartões da etapa de mini game na fase de início.');
    this.expectWasTrue('O conjunto de cartões foi embaralhado?', this.step.isCardsetShuffled);
  }
}