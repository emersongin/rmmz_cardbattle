class ActivatePowerFieldByLimitTurnStepInLoadPhaseTest extends SceneTest {
  step;

  create() {
    const finish = this.createHandler();
    const handlers = {
      playerPlayHandler: () => {},
      playerPassedHandler: () => {},
      challengedPlayHandler: () => {},
      challengedPassedHandler: () => {},
      activePowerfieldHandler: () => {
        this.step.changeStep(RunPowerfieldStep);
        finish();
      },
    };
    this.step = new TurnStep(this._scene, GameConst.LOAD_PHASE, handlers);
    this.addAssistedHidden(this.step);
  }

  start() {
    CardBattleManager.playerPassed();
    CardBattleManager.challengedPassed();
    const drawNumber = 6;
    CardBattleManager.drawPlayerCards(drawNumber);
    CardBattleManager.putPlayerCards(drawNumber);
    CardBattleManager.drawChallengedCards(drawNumber);
    CardBattleManager.putChallengedCards(drawNumber);

    // const powerCard = { 
    //   type: GameConst.POWER, 
    //   color: GameConst.BLACK, 
    //   figureName: 'default', 
    //   attack: 10, 
    //   health: 10,
    // };
    // CardBattleManager.addPowerCardToPowerfield(powerCard);
    // CardBattleManager.addPowerCardToPowerfield(powerCard);
    // CardBattleManager.addPowerCardToPowerfield(powerCard);
    this.mockFunction(Input, 'isTriggered', () => true);
    this._scene.setStep(this.step);
    this.step.start();
  }

  update() {
    this.step.update();
  }
  
  asserts() {
    this.describe('Deve apresentar etapa de turno e ativar o campo de poder na fase de carregar.');

    this.expectTrue('Foi ativado com limite de 3?', CardBattleManager.getPowerfieldLength() === 3);
    this.expectTrue('A proxima Etapa é RunPowerfieldStep?', this.isStep(RunPowerfieldStep));
  }
}