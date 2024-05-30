class DrawPhaseTest extends SceneTest {
  phase;
  endTest;

  create() {
    this.phase = new DrawPhase(this.scene);
    this.phase.createTitleWindow('Draw Phase');
    this.phase.createDescriptionWindow('6 cards will be drawn.');
    this.phase.createGameBoards();

  }
  
  start() {
    this.scene.setPhase(this.phase);
    this.phase.addChildren();

    this.phase.stepStart();
  }

  update() {
    if (this.phase.isBusy()) return false;
  }
  
  asserts() {
    this.describe('Deve apresentar etapas de fase de sorteio.');
  }
}