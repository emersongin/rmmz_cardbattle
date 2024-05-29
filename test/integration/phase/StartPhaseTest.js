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
    const shuffledCards = ArrayHelper.shuffle(cards);
    this.sprites = this.phase.createCardDrawGameCardset(shuffledCards);
    this.addHiddenWatched(this.phase._titleWindow);
    this.addHiddenWatched(this.phase._descriptionWindow);
    this.addHiddenWatched(this.phase._cardDrawGameCardset);
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
      this.phase.startCardDrawGame((cards) => {
        const selectedIndex = cards.shift();
        const selectedSprite = this.sprites[selectedIndex];
        const colorName = selectedSprite.getColorName();
        const result = colorName === 'WHITE';
        const text = result ? ['You win!'] : ['You lose!'];
        this.phase.createResultWindow(text);
        this.phase.endCardDrawGame(selectedIndex);
        this.phase.openResultWindow();
        this.phase.stepEndCardDrawGame();
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
  }
}