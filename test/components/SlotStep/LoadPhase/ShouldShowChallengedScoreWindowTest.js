class ShouldShowChallengedScoreWindowOnSlotStepInLoadPhaseTest extends SceneTest {
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
    this.describe('Deve apresentar janela de pontuação do desafiado na etapa de slot na fase de carregamento.');
    this.expectWasTrue('A janela de pontuação do desafiado foi apresentada?', this.step.isChallengedScoreWindowVisible);
  }
}