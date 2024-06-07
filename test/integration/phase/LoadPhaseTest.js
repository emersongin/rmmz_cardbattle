class LoadPhaseTest extends SceneTest {
  phase;
  endTest;

  create() {
    this.phase = new LoadPhase(this.scene);
    this.startPlay = false;
    this.playerPassed = false;
    this.challengePassed = false;
    this.phase.createTitleWindow('Load Phase');
    this.phase.createDescriptionWindow('Select and use a Program Card.');
    this.phase.createTextWindow('Begin Load Phase');
    const playerCardsInTrash = 0;
    const playerCardsInHand = 6;
    this.playerCardsInHand = [];
    this.playerCardsInDeck = CardGenerator.generateCards(34, 1);
    const playerTotalCardsInDeck = this.playerCardsInDeck.length;
    this.playerEnergies = {
      [GameConst.RED]: 0,
      [GameConst.BLUE]: 0,
      [GameConst.GREEN]: 0,
      [GameConst.BLACK]: 0,
      [GameConst.WHITE]: 0,
    };
    const playerEnergies = Object.values(this.playerEnergies);
    const playerVictories = 0;
    this.phase.createPlayerGameBoard(playerCardsInTrash, playerTotalCardsInDeck, playerCardsInHand, playerEnergies, playerVictories);
    const challengeCardsInTrash = 0;
    const challengeCardsInHand = 6;
    this.challengeCardsInHand = [];
    this.challengeCardsInDeck = CardGenerator.generateCards(34, 1);
    const challengeTotalCardsInDeck = this.challengeCardsInDeck.length;
    this.challengeEnergies = {
      [GameConst.RED]: 0,
      [GameConst.BLUE]: 0,
      [GameConst.GREEN]: 0,
      [GameConst.BLACK]: 0,
      [GameConst.WHITE]: 0,
    };
    const challengeEnergies = Object.values(this.challengeEnergies);
    const challengeVictories = 0;
    this.phase.createChallengeGameBoard(challengeCardsInTrash, challengeTotalCardsInDeck, challengeCardsInHand, challengeEnergies, challengeVictories);
    this.addHiddenWatched(this.phase._titleWindow);
    this.addHiddenWatched(this.phase._descriptionWindow);
    this.addHiddenWatched(this.phase._textWindow);
    this.addHiddenWatched(this.phase._playerBoardWindow);
    this.addHiddenWatched(this.phase._playerBattleWindow);
    this.addHiddenWatched(this.phase._playerTrashWindow);
    this.addHiddenWatched(this.phase._playerScoreWindow);
    this.addHiddenWatched(this.phase._challengeBoardWindow);
    this.addHiddenWatched(this.phase._challengeBattleWindow);
    this.addHiddenWatched(this.phase._challengeTrashWindow);
    this.addHiddenWatched(this.phase._challengeScoreWindow);
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
      this.phase.stepBeginLoadPhase();
      this.phase.openGameBoards();
      this.phase.openBeginLoadPhaseWindow();
    }
    if (this.phase.isStepBeginLoadPhase() && Input.isTriggered('ok')) {
      this.phase.closeBeginLoadPhaseWindow();
      if (this.startPlay) {
        this.phase.stepPlayerLoadPhase();
      } else {
        this.phase.stepChallengeLoadPhase();
      }
    }
    if (this.phase.isStepChallengeLoadPhase()) {
      this.challengePassed = true;
      this.phase.chanllengePass();
      this.phase.stepEndLoadPhase();
      if (!this.playerPassed) this.phase.stepPlayerLoadPhase();
    }
    if (this.phase.isStepPlayerLoadPhase()) {
      this.playerPassed = true;
      this.phase.playerPass();
      this.phase.stepEndLoadPhase();
      if (!this.challengePassed) this.phase.stepChallengeLoadPhase();
    }
    if (this.playerPassed && this.challengePassed) {
      this.phase.addAction(this.endTest);
    }
  }
  
  asserts() {
    this.describe('Deve apresentar etapas de fase de carregamento.');
    this.expectWasTrue('A janela de texto foi apresentada?', 'visible', this.phase._textWindow);
  }
}