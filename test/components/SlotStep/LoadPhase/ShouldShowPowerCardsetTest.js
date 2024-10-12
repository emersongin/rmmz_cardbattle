class ShouldShowPowerCardsetOnSlotStepInLoadPhaseTest extends SceneTest {
  step;

  create() {
    this.createHandler();
    const powerConfig = {
      cardIndexes: [1],
      player: GameConst.PLAYER
    };
    this.step = new SlotStep(this._scene, GameConst.LOAD_PHASE, powerConfig);
    this.addAssistedHidden(this.step);
  }

  start() {
    CardBattleManager.setPlayerDeck();
    CardBattleManager.setChallengedDeck();
    CardBattleManager.drawPlayerCards(6);
    CardBattleManager.drawChallengedCards(6);
    // this.mockFunction(CardBattleManager, 'getCardsByPowerfield', () => {
    //   return [
    //     { type: GameConst.POWER, color: GameConst.BLUE, figureName: 'default', attack: 10, health: 10, isActiveInLoadPhase: true },
    //     { type: GameConst.POWER, color: GameConst.BLUE, figureName: 'default', attack: 10, health: 10, isActiveInLoadPhase: true },
    //   ];
    // });
    const finish = this.getHandler();
    this.mockFunction(this.step, 'updateStrategy', () => {
      finish();
    });
    this._scene.setStep(this.step);
    this.step.start();
  }

  update() {
    this.step.update();
  }
  
  asserts() {
    this.describe('Deve apresentar conjunto de cartas do desafiado na etapa de slot na fase de carregamento.');
    this.expectWasTrue('O conjunto de cartas de poder foi apresentado?', this.step.isPowerCardsetSpriteVisible);
  }
}