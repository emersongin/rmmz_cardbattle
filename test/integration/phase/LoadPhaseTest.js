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
    this.playerCardsInHand = CardGenerator.generateCards(6, 1);
    this.playerCardsInDeck = CardGenerator.generateCards(34, 1);
    this.playerEnergies = {
      [GameConst.RED]: 0,
      [GameConst.BLUE]: 0,
      [GameConst.GREEN]: 0,
      [GameConst.BLACK]: 0,
      [GameConst.WHITE]: 0,
    };
    const playerEnergies = Object.values(this.playerEnergies);
    const playerData = { 
      cardsInTrash: 0, 
      cardsInDeck: this.playerCardsInDeck.length, 
      cardsInHand : 6, 
      victories: 0 
    };
    this.phase.createPlayerGameBoard(playerData, playerEnergies);
    this.challengeCardsInHand = CardGenerator.generateCards(6, 1);
    this.challengeCardsInDeck = CardGenerator.generateCards(34, 1);
    this.challengeEnergies = {
      [GameConst.RED]: 0,
      [GameConst.BLUE]: 0,
      [GameConst.GREEN]: 0,
      [GameConst.BLACK]: 0,
      [GameConst.WHITE]: 0,
    };
    const challengeEnergies = Object.values(this.challengeEnergies);
    const challengeData = { 
      cardsInTrash: 0, 
      cardsInDeck: this.challengeCardsInDeck.length, 
      cardsInHand : 6, 
      victories: 0 
    };
    this.phase.createChallengeGameBoard(challengeData, challengeEnergies);
    this.phase.createPlayerHandset(this.playerCardsInHand);
    this.addHiddenWatched(this.phase.getTitleWindow());
    this.addHiddenWatched(this.phase.getDescriptionWindow());
    this.addHiddenWatched(this.phase.getTextWindow());
    this.addHiddenWatched(this.phase.getPlayerBoardWindow());
    this.addHiddenWatched(this.phase.getPlayerBattleWindow());
    this.addHiddenWatched(this.phase.getPlayerTrashWindow());
    this.addHiddenWatched(this.phase.getPlayerScoreWindow());
    this.addHiddenWatched(this.phase.getChallengeBoardWindow());
    this.addHiddenWatched(this.phase.getChallengeBattleWindow());
    this.addHiddenWatched(this.phase.getChallengeTrashWindow());
    this.addHiddenWatched(this.phase.getChallengeScoreWindow());
    this.endTest = this.createHandler();
  }
  
  start() {
    this.scene.setPhase(this.phase);
    this.phase.addChildren();
    // this.phase.openTextWindows();
    // this.phase.stepStart();
    const onChangeCursor = index => {
      const card = this.playerCardsInHand[index];
      this.phase.commandSetTextCardNameWindow(['card.name' + index]);
      this.phase.commandSetTextCardDescriptionWindow(['card.description' + index]);
      this.phase.commandSetTextCardPropsWindow(['card.props' + index]);
    };
    this.phase.openPlayerHand(onChangeCursor);
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
      this.phase.challengePass();
      this.phase.stepWainting();
      if (!this.playerPassed) this.phase.stepPlayerLoadPhase();
    }
    if (this.phase.isStepPlayerLoadPhase()) {
      const commandYes = () => {
        this.phase.commandCloseAskWindow();
        this.phase.closeGameBoards();
        this.phase.openPlayerHand();
      };
      const commandNo = () => {
        this.phase.commandCloseAskWindow();
        this.playerPassed = true;
        this.phase.playerPass();
        this.phase.stepWainting();
        if (!this.challengePassed) this.phase.stepChallengeLoadPhase();
      };
      this.phase.createAskWindow('Use a Program Card?', commandYes, commandNo);
      this.phase.openAskWindow();
      this.phase.stepWainting();
    }
    if (this.playerPassed && this.challengePassed && this.phase.isStepEnd() === false) {
      this.phase.addWait();
      this.phase.closeGameBoards();
      this.phase.addAction(this.endTest);
      this.phase.stepEnd();
    }
  }
  
  asserts() {
    this.describe('Deve apresentar etapas de fase de carregamento.');
    this.expectWasTrue('A janela de texto foi apresentada?', 'visible', this.phase.getTextWindow());
  }
}