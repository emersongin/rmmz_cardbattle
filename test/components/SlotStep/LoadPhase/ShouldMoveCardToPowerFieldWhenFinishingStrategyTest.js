class ShouldMoveCardToPowerFieldWhenFinishingStrategyOnSlotStepInLoadPhaseTest extends SceneTest {
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
    this.mockFunction(this.step, 'updateStrategyStart', () => {
      this.step.startStrategy();
    });
    this.mockFunction(this.step, 'updateStrategyDuring', () => {
      const powerStrategyDummy = {};
      CardBattleManager.moveCardToPowerField(1, GameConst.PLAYER, powerStrategyDummy);
      this.step.finishStrategy();
    });
    this.spyFunction(this.step, 'commandFinish', () => {
      this.step.addAction(finish);
    });
    this._scene.setStep(this.step);
    this.step.start();
  }

  update() {
    this.step.update();
  }
  
  asserts() {
    this.describe('Deve mover o cartão para o campo de poder quando finalizado a estrategia em etapa de slot na fase de carregamento.');
    const x = ScreenHelper.getCenterPosition(CardsetSprite.contentOriginalWidth());
    const y = ScreenHelper.getMiddlePosition(CardsetSprite.contentOriginalHeight());
    this.expectTrue('O cartão foi movido para a posição X?', this.step.isSlotCardsetSpriteX(x));
    this.expectTrue('O cartão foi movido para a posição Y?', this.step.isSlotCardsetSpriteY(y));
  }
}