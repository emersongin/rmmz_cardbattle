class ChallengeStepTest extends SceneTest {
  manager = {
    getChallengeDescription: () => 'Desafie um amigo para uma partida de xadrez.',
  };
  step;

  create() {
    this.step = new ChallengeStep(this._scene);
    this.addHiddenWatched(this.step);
  }

  start() {
    this._scene.setPhase(GameConst.CHALLENGE_PHASE);
    this._scene.setStep(this.phase);
    this.step.start(this.manager);
  }

  update() {
    this.step.update(this.manager);
  }
  
  asserts() {
    this.describe('Deve apresentar etapa de apresentação de desafiado.');
    this.expectWasTrue('A janela de título foi apresentada?', this.step.isTitleWindowVisible);
    this.expectWasTrue('A janela de descrição de desafiado foi apresentada?', this.step.isDescriptionWindowVisible);
  }
}