class StartPhaseTest extends SceneTest {
  phase;

  create() {
    this.phase = new StartPhase(this.scene);
    const title = TextWindow.setTextColor('Start Phase', GameColors.ORANGE);
    const text = [title];
    this.phase.createTitleWindow(text);
    const line = 'Draw Calumon to go first.';
    const text2 = [line];
    this.phase.createDescriptionWindow(text2);
    const cards = [
      CardGenerator.generateGameCard('white'),
      CardGenerator.generateGameCard('black'),
    ];
    this.phase.createCardDrawGameCardset(cards);
    this.addHiddenWatched(this.phase._titleWindow);
    this.addHiddenWatched(this.phase._descriptionWindow);
    const endTest = this.createHandler();
    this.cardsSelected = [];
    this.endTest = (cards) => {
      this.cardsSelected = cards;
      endTest();
    };
  }

  start() {
    this.phase.addWindows([
      this.phase._titleWindow,
      this.phase._descriptionWindow,
    ]);
    this.addChild(this.phase._cardDrawGameCardset);
    this.scene.setPhase(this.phase);
    this.phase.addActions([
      this.phase.commandOpenTitleWindow,
      this.phase.commandOpenDescriptionWindow,
    ]);
    this.phase.stepStartPhase();
  }
  
  update() {
    if (this.phase.isBusy()) return;
    if (this.phase.isStepStartPhase() && Input.isTriggered('ok')) {
      this.phase.addActions([
        this.phase.commandCloseTitleWindow,
        this.phase.commandCloseDescriptionWindow,
      ]);
      this.phase.setWait();
      this.phase.stepCardDrawGame();
      this.phase.startCardDrawGame(this.endTest);
    }
  }

  asserts() {
    this.describe('Deve apresentar etapas de fase de início e jogo da sorte.');
    this.expectWasTrue('A janela de título foi apresentada?', 'visible', this.phase._titleWindow);
    this.expectWasTrue('A janela de descrição de desafiado foi apresentada?', 'visible', this.phase._descriptionWindow);
  }
}