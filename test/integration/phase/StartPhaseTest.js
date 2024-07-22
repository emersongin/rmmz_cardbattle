class StartPhaseTest extends SceneTest {
  phase;
  endTest;
  manager = { 
    win: undefined,
    endPhase: () => {} 
  };

  create() {
    this.phase = new StartPhase(this._scene);
    this.manager.endPhase = this.createHandler();
    this.addAssistedHidden(this.phase);
  }

  start() {
    this._scene.setPhase(this.phase);
    this.phase.start(this.manager);
  }

  update() {
    this.phase.update(this.manager);
  }

  asserts() {
    this.describe('Deve apresentar etapas de fase de início e jogo da sorte.');
    this.expectWasTrue('O set de cartas estava em modo seleção?', this.phase.isCardsetVisible);
    this.expectWasTrue('A janela de título foi apresentada?', this.phase.isTitleWindowVisible);
    this.expectWasTrue('A janela de descrição de desafiado foi apresentada?', this.phase.isDescriptionWindowVisible);
    this.expectWasTrue('A janela de resultado foi apresentada?', this.phase.isResultWindowVisible);
    this.expectTrue('O resultado do jogo da sorte foi apresentado?', typeof this.manager.win === 'boolean');
  }
}