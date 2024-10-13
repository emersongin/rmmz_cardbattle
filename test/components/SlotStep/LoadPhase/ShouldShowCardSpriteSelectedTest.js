class ShouldShowCardSpriteSelectedOnSlotStepInLoadPhaseTest extends SceneTest {
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
    const contentWidth = CardsetSprite.contentOriginalWidth();
    const cardSpriteWidth = CardSprite.contentOriginalWidth();
    const x = ScreenHelper.getCenterPosition(contentWidth) + contentWidth - cardSpriteWidth;
    const y = ScreenHelper.getMiddlePosition(CardsetSprite.contentOriginalHeight());
    this.describe('Deve apresentar cartão que foi selecionado para o slot na etapa de slot na fase de carregamento.');
    this.expectWasTrue('O cartão foi apresentado?', this.step.isSlotCardsetSpriteVisible);
    this.expectTrue('O cartão foi aberto?', this.step.isSlotCardsetSpriteOpen());
    this.expectTrue('Está na posição x?', this.step.isSlotCardsetSpriteX(x));
    this.expectTrue('Está na posição y?', this.step.isSlotCardsetSpriteY(y));
  }
}