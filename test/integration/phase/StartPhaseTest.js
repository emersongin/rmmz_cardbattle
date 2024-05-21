class StartPhaseTest extends SceneTest {
  phase;

  create() {
    this.scene.changePhase(StartPhase);
    this.phase = this.scene.getPhase();
    const title = TextWindow.setTextColor('Start Phase', GameColors.ORANGE);
    const text = [title];
    this.phase.createTitleWindow(text);
    const line = 'Draw Calumon to go first.';
    const text2 = [line];
    this.phase.createDescriptionWindow(text2);
    const cards = [
      {
        type: 3,
        color: 4,
        figureName: 'default',
        attack: 0,
        health: 0
      },
      {
        type: 3,
        color: 5,
        figureName: 'default',
        attack: 0,
        health: 0
      }
    ];
    this.phase.createCardDrawGameCardset(cards);


    this.phase.addActions([
      this.phase.commandOpenTitleWindow,
      this.phase.commandOpenDescriptionWindow,
    ]);
    this.addHiddenWatched(this.phase._titleWindow);
    this.addHiddenWatched(this.phase._descriptionWindow);
    this.phase.stepStartPhase();
  }

  update() {
    if (this.phase.isBusy()) return;
    if (this.phase.isStepStartPhase() && Input.isTriggered('ok')) {
      this.phase.stepCardDrawGame();
      this.phase.addActions([
        this.phase.commandCloseTitleWindow,
        this.phase.commandCloseDescriptionWindow,
      ]);
      this.phase.setWait();
      this.phase.stepCardDrawGame();
    }
  }

  asserts() {
    this.describe('Deve apresentar etapas de fase de início e jogo da sorte.');
    this.assertWasTrue('A janela de título foi apresentada?', 'visible', this.phase._titleWindow);
    this.assertWasTrue('A janela de descrição de desafiado foi apresentada?', 'visible', this.phase._descriptionWindow);
  }
}