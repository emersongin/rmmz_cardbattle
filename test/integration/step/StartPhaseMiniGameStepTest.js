class StartPhaseMiniGameStepTest extends SceneTest {
  manager = CardBattleManager;
  step;

  create() {
    this.step = new MiniGameStep(this._scene, this.createHandler());
    this.addHiddenWatched(this.step);
  }

  start() {
    this._scene.setPhase(GameConst.START_PHASE);
    this._scene.setStep(this.step);
    this.step.start(this.manager);
  }

  update() {
    this.step.update(this.manager);
  }
  
  asserts() {
    this.describe('Deve apresentar etapa de mini game de início de batalha.');
    this.expectWasTrue('O set de cartas estava em modo seleção?', this.step.isCardsetVisible);
    this.expectWasTrue('A janela de resultado foi apresentada?', this.step.isResultWindowVisible);
    this.expectTrue('O resultado do jogo da sorte foi apresentado?', typeof this.manager.getWin() === 'boolean');
  }
}