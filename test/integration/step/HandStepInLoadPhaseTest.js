class HandStepInLoadPhaseTest extends SceneTest {
  manager = CardBattleManager;
  step;

  create() {
    const phase = GameConst.LOAD_PHASE;
    const finish = this.createHandler();
    const config = {
      player: GameConst.PLAYER,
      blockBattleCards: true,
      blockPowerCardsInLoadPhase: true
    };
    this.step = new HandStep(this._scene, phase, config, finish);
    this.addAssistedHidden(this.step);
  }

  start() {
    this.manager.setPlayerDeck();
    this.manager.setChallengedDeck();
    this.manager.drawPlayerCards(6);
    this._scene.setStep(this.step);
    this.step.start(this.manager);
  }

  update() {
    this.step.update(this.manager);
  }
  
  asserts() {
    this.describe('A fase campo de poder deve ser ativada tendo pelo menos um cartão de poder!');
    this.expectTrue('Esta na fase campo de poder?', this._scene.isCurrentStep(RunPowerfieldStep));
  }
}