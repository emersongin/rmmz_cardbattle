class StartPhaseTest extends SceneTest {
  phase;
  endTest;
  gameResult;

  create() {
    this.phase = new StartPhase(this.scene);
    this.phase.createTitleWindow('Start Phase');
    this.phase.createDescriptionWindow('Draw Calumon to go first.');
    this.phase.createCardDrawGameCardset();
    this.addHiddenWatched(this.phase.getTitleWindow());
    this.addHiddenWatched(this.phase.getDescriptionWindow());
    this.addHiddenWatched(this.phase._cardDrawGameCardset);
    this.addHiddenWatched(this.phase._resultWindow);
    this.endTest = this.createHandler();
  }

  start() {
    this.scene.setPhase(this.phase);
    this.phase.addChildren();
    this.phase.openTextWindows();
    this.phase.stepStart();
  }
  
  update() {
    if (this.phase.isBusy()) return false;
    if (this.phase.isStepStart() && Input.isTriggered('ok')) {
      this.phase.closeTextWindows();
      this.phase.stepCardDrawGame();
      this.phase.stepWainting();
      const resultHandler = (win) => {
        this.phase.stepEndCardDrawGame();
        this.gameResult = win;
      };
      this.phase.startCardDrawGame(resultHandler);
    }
    if (this.phase.isStepEndCardDrawGame() && Input.isTriggered('ok')) {
      this.phase.closeGameObjects();
      this.phase.addAction(this.endTest);
      this.phase.stepWainting();
    }
  }

  asserts() {
    this.describe('Deve apresentar etapas de fase de início e jogo da sorte.');
    const cardset = this.phase.getCardDrawGameCardset();
    this.expectWasTrue('A janela de título foi apresentada?', 'visible', this.phase.getTitleWindow());
    this.expectWasTrue('A janela de descrição de desafiado foi apresentada?', 'visible', this.phase.getDescriptionWindow());
    this.expectWasTrue('A janela de resultado foi apresentada?', 'visible', this.phase.getResultWindow());
    this.expectWasTrue('O set de cartas estava em modo seleção?', cardset.isSelectMode, cardset);
    this.expectTrue('O resultado do jogo da sorte foi apresentado?', typeof this.gameResult === 'boolean');
  }
}