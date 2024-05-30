class StartPhaseTest extends SceneTest {
  phase;
  endTest;
  gameResult;

  create() {
    this.phase = new StartPhase(this.scene);
    this.phase.createTitleWindow('Start Phase');
    this.phase.createDescriptionWindow('Draw Calumon to go first.');
    this.phase.createCardDrawGameCardset();
    this.addHiddenWatched(this.phase._titleWindow);
    this.addHiddenWatched(this.phase._descriptionWindow);
    this.addHiddenWatched(this.phase._cardDrawGameCardset);
    this.addHiddenWatched(this.phase._resultWindow);
    this.endTest = this.createHandler();
  }

  start() {
    this.scene.setPhase(this.phase);
    this.phase.addChildren();
    this.phase.addActions([
      this.phase.commandOpenTitleWindow,
      this.phase.commandOpenDescriptionWindow,
    ]);
    this.phase.stepStart();
  }
  
  update() {
    if (this.phase.isBusy()) return false;
    if (this.phase.isStepStart() && Input.isTriggered('ok')) {
      this.phase.addActions([
        this.phase.commandCloseTitleWindow,
        this.phase.commandCloseDescriptionWindow,
      ]);
      this.phase.stepCardDrawGame();
      this.phase.startCardDrawGame((win) => {
        this.phase.stepEndCardDrawGame();
        this.gameResult = win;
      });
    }
    if (this.phase.isStepEndCardDrawGame() && Input.isTriggered('ok')) {
      this.phase.addActions([
        this.phase.commandCloseResultWindow,
        this.phase.commandCloseCardDrawGameCardset,
      ]);
      this.phase.addAction(this.endTest);
    }
  }

  asserts() {
    this.describe('Deve apresentar etapas de fase de início e jogo da sorte.');
    this.expectWasTrue('A janela de título foi apresentada?', 'visible', this.phase._titleWindow);
    this.expectWasTrue('A janela de descrição de desafiado foi apresentada?', 'visible', this.phase._descriptionWindow);
    this.expectWasTrue('A janela de resultado foi apresentada?', 'visible', this.phase._resultWindow);
    // cardset foi apresentado?
    this.expectTrue('O resultado do jogo da sorte foi apresentado?', typeof this.gameResult === 'boolean');
  }
}