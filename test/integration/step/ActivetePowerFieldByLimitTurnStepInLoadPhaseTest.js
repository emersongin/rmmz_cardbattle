class ActivetePowerFieldByLimitTurnStepInLoadPhaseTest extends SceneTest {
  manager = CardBattleManager;
  step;

  create() {
    const phase = GameConst.LOAD_PHASE;
    const finish = this.createHandler();
    this.step = new TurnStep(this._scene, phase, finish);
  }

  start() {
    const powerCard = { type: GameConst.POWER, color: GameConst.BLACK, figureName: 'default', attack: 10, health: 10 };
    this.manager.addPowerCardToPowerfield(powerCard);
    this.manager.addPowerCardToPowerfield(powerCard);
    this.manager.addPowerCardToPowerfield(powerCard);
    this._scene.setStep(this.step);
    this.step.start(this.manager);
  }

  update() {
    this.step.update(this.manager);
  }
  
  asserts() {
    this.describe('A fase campo de poder deve ser ativada tendo pelo menos um cartão de poder!');
    this.expectTrue('O campo de poder esta com 3 cartões?', this.manager.getPowerfieldLength() === 3);
    this.expectTrue('Esta na fase campo de poder?', this._scene.isCurrentStep(RunPowerfieldStep));
  }
}