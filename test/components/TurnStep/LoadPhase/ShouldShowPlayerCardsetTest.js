class ShouldShowPlayerCardsetLoadPhaseTest extends SceneTest {
  step;

  create() {
    this.createHandler();
    const handlers = {
      activePowerfieldHandler: () => {},
    };
    this.step = new TurnStep(this._scene, GameConst.LOAD_PHASE, handlers);
    this.addAssistedHidden(this.step);
  }

  start() {
    CardBattleManager.setPlayerDeck();
    const drawNumber = 2;
    CardBattleManager.drawPlayerCards(drawNumber);
    CardBattleManager.putPlayerCards(drawNumber);
    this.mockFunction(Input, 'isTriggered', () => true);
    const finish = this.getHandler();
    this.mockFunction(this.step, 'startTurn', () => {
      finish();
    });
    this._scene.setStep(this.step);
    this.step.start();
  }

  update() {
    this.step.update();
  }

  restore() {
    CardBattleManager.reset();
    super.restore();
  }
  
  asserts() {
    this.describe('Deve apresentar conjunto de cartões do jogador na etapa de turno na fase de carregamento.');
    this.expectWasTrue('O conjunto de cartões do jogador foi apresentado?', this.step.isPlayerCardsetSpriteVisible);
    this.expectTrue('Todos os cartões estão abertos?', this.step.allPlayerCardsAreOpen());
    this.expectTrue('O conjunto de cartões do jogador tem cartões?', CardBattleManager.hasCardsInPlayerfield());
  }
}