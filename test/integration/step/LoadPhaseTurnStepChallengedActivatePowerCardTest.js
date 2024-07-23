class LoadPhaseTurnStepChallengedActivatePowerCardTest extends SceneTest {
  manager = CardBattleManager;
  step;

  create() {
    const finish = this.createHandler();
    this.step = new TurnStep(this._scene, finish);
  }

  start() {
    this.manager.setPlayerDeck();
    this.manager.setChallengedDeck();
    this.manager.drawChallengedCards(6);
    this._scene.setPhase(GameConst.LOAD_PHASE);
    this._scene.setStep(this.step);
    this.step.start(this.manager);
  }

  update() {
    this.step.update(this.manager);
  }
  
  asserts() {
    this.describe('O desafiado deve acionar um cartão de poder na etapa de jogadas de fase de carregar.');
    this.expectTrue('Esta na fase de acionar um cartão de poder?', this._scene.isCurrentStep(ActivatePowerCardStep));
  }
}