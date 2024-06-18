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
    this.playerCardsInHand = CardGenerator.generateCards(6, 0);
    this.playerCardsInDeck = CardGenerator.generateCards(34, 0);
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
    this.challengeCardsInHand = CardGenerator.generateCards(6, 0);
    this.challengeCardsInDeck = CardGenerator.generateCards(34, 0);
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
    this.phase.openTextWindows();
    this.phase.stepStart();
  }

  update() {
    if (this.phase.isBusy()) return false;
    if (this.phase.isCurrentStep(GameConst.START_PHASE) && Input.isTriggered('ok')) {
      this.phase.closeTextWindows();
      this.phase.openGameBoards();
      this.phase.openBeginLoadPhaseWindow();
      this.phase.setStep(GameConst.BEGIN_LOAD_PHASE);
    }
    if (this.phase.isCurrentStep(GameConst.BEGIN_LOAD_PHASE) && Input.isTriggered('ok')) {
      this.phase.closeBeginLoadPhaseWindow();
      if (this.startPlay) {
        this.phase.setStep(GameConst.PLAYER_LOAD_PHASE);
      } else {
        this.phase.setStep(GameConst.CHALLENGE_LOAD_PHASE);
      }
    }
    if (this.phase.isCurrentStep(GameConst.CHALLENGE_LOAD_PHASE)) {
      this.challengePassed = true;
      this.phase.challengePass();
      this.phase.stepWainting();
      if (!this.playerPassed) this.phase.setStep(GameConst.PLAYER_LOAD_PHASE);
    }
    if (this.phase.isCurrentStep(GameConst.PLAYER_LOAD_PHASE)) {
      const commandYes = () => {
        this.phase.commandCloseAskWindow();
        this.phase.closeGameBoards();
        this.commandYesPlayer();
      };
      const commandNo = () => {
        this.phase.commandCloseAskWindow();
        this.commandNoPlayer();
      };
      this.phase.createAskWindow('Use a Program Card?', commandYes, commandNo);
      this.phase.openAskWindow();
      this.phase.stepWainting();
    }

    if (this.phase.isCurrentStep(GameConst.ACTIVE_POWER_CARD) && Input.isTriggered('cancel')) {
      this.phase.closeGameBoards();
      this.phase.leavePowerCard();
      this.commandYesPlayer();
      this.phase.stepWainting();
    }



    if ((this.playerPassed && this.challengePassed) && this.phase.isCurrentStep(GameConst.END_PHASE) === false) {
      this.phase.addWait();
      this.phase.closeGameBoards();
      this.phase.addAction(this.endTest);
      this.phase.stepEnd();
    }
  }

  commandYesPlayer() {
    const onChangeCursor = index => {
      const card = this.playerCardsInHand[index];
      this.phase.commandSetTextCardNameWindow(['card.name' + index]);
      this.phase.commandSetTextCardDescriptionWindow(['card.description' + index]);
      this.phase.commandSetTextCardPropsWindow(['card.props' + index]);
    };
    const onSelectHandler = cardIndexs => {
      const sprite = this.phase.commandGetSprites(cardIndexs);
      this.phase.selectPowerCard(sprite);
      this.phase.closePlayerHand();
      this.phase.openGameBoards();
      const cards = CardGenerator.generateCards(1, 1);
      this.phase.activatePowerCard(cards);
      this.phase.setStep(GameConst.ACTIVE_POWER_CARD);
    };
    const onCancelHandler = () => {
      this.phase.closePlayerHand();
      this.phase.openGameBoards();
      this.phase.setStep(GameConst.PLAYER_LOAD_PHASE);
    };
    this.phase.openPlayerHand(onSelectHandler, onChangeCursor, onCancelHandler);
  }

  commandNoPlayer() {
    this.playerPassed = true;
    this.phase.playerPass();
    this.phase.stepWainting();
    if (!this.challengePassed) this.phase.setStep(GameConst.CHALLENGE_LOAD_PHASE);
  }
  
  asserts() {
    this.describe('Deve apresentar etapas de fase de carregamento.');
    this.expectWasTrue('A janela de texto foi apresentada?', 'visible', this.phase.getTextWindow());
  }
}