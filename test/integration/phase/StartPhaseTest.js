class StartPhaseTest extends SceneTest {
  phase;
  endTest;
  manager = { win: undefined };

  create() {
    this.phase = new StartPhase(this.scene);
    this.endTest = this.createHandler();
  }

  start() {
    this.scene.setPhase(this.phase);
    this.phase.createTitleWindow('Start Phase');
    this.phase.createDescriptionWindow('Draw Calumon to go first.');
    this.addHiddenWatched(this.phase.getTitleWindow());
    this.addHiddenWatched(this.phase.getDescriptionWindow());
    this.phase.openTextWindows();
    this.phase.stepStart();
  }
  
  update() {
    if (this.phase.isBusy()) return false;
    if (this.phase.isCurrentStep(GameConst.START_PHASE) && Input.isTriggered('ok')) {
      this.phase.commandCloseTextWindows();
      this.phase.leaveTextWindows();
      const resultHandler = (win) => {
        this.manager.win = win;
        this.phase.setStep(GameConst.END_DRAW_CARD_GAME);
      };
      this.phase.createDrawCardGame();
      this.addHiddenWatched(this.phase.getDrawCardGameCardset());
      this.addHiddenWatched(this.phase.getResultWindow());
      this.phase.startDrawCardGame(resultHandler);
      this.phase.setStep(GameConst.START_DRAW_CARD_GAME);
    }
    if (this.phase.isCurrentStep(GameConst.END_DRAW_CARD_GAME) && Input.isTriggered('ok')) {
      this.phase.closeDrawCardGame();
      this.phase.leaveDrawCardGame();
      this.phase.addWait();
      this.phase.addAction(this.endTest);
    }
  }

  asserts() {
    this.describe('Deve apresentar etapas de fase de início e jogo da sorte.');
    const cardset = this.phase.getDrawCardGameCardset();
    this.expectWasTrue('O set de cartas estava em modo seleção?', cardset.isSelectMode, cardset);
    this.expectWasTrue('A janela de título foi apresentada?', 'visible', this.phase.getTitleWindow());
    this.expectWasTrue('A janela de descrição de desafiado foi apresentada?', 'visible', this.phase.getDescriptionWindow());
    this.expectWasTrue('A janela de resultado foi apresentada?', 'visible', this.phase.getResultWindow());
    this.expectTrue('O resultado do jogo da sorte foi apresentado?', typeof this.manager.win === 'boolean');
  }
}