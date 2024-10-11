class ShouldShowChallengedTrashWindowOnSlotStepInLoadPhaseTest extends SceneTest {
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
    this.describe('Deve apresentar janela de lixo do desafiado na etapa de slot na fase de carregamento.');
    this.expectWasTrue('A janela de lixo do desafiado foi apresentada?', this.step.isChallengedTrashWindowVisible);
    // this.expectWasTrue('A janela de tabuleiro do jogador foi apresentado?', this.step.isPlayerBoardWindowVisible);
    // this.expectWasTrue('A janela de batalha do jogador foi apresentada?', this.step.isPlayerBattleWindowVisible);
    // this.expectWasTrue('A janela de pontuação do jogador foi apresentada?', this.step.isPlayerScoreWindowVisible);
    // this.expectWasTrue('A janela de lixo do jogador foi apresentada?', this.step.isPlayerTrashWindowVisible);
    // this.expectWasTrue('A janela de tabuleiro do desafiado foi apresentado?', this.step.isChallengedBoardWindowVisible);
    // this.expectWasTrue('A janela de batalha do desafiado foi apresentada?', this.step.isChallengedBattleWindowVisible);
    // this.expectWasTrue('A janela de pontuação do desafiado foi apresentada?', this.step.isChallengedScoreWindowVisible);
    // this.expectWasTrue('O set de cartas de poder foi apresentado?', this.step.isPowerCardsetSpriteVisible);
  }
}