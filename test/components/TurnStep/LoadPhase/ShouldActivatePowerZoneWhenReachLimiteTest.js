class ShouldActivatePowerZoneWhenReachLimiteLoadPhaseTest extends SceneTest {
  step;

  create() {
    this.createHandler();
    this.step = new TurnStep(this._scene, GameConst.LOAD_PHASE);
    this.addAssistedHidden(this.step);
  }

  start() {
    this.spyCommandActivePowerZone();
    this.mockFolders();
    this.setDecks();
    this.drawCards(3);
    this.putCards(3);
    this.setPowerCardsInPowerZone();
    this.mockIsTriggered();
    this._scene.setStep(this.step);
    this.step.start();
  }

  spyCommandActivePowerZone() {
    const finish = this.getHandler();
    this.spyFunction(this.step, 'commandActivePowerZone', () => {
      finish();
    });
  }

  mockFolders() {
    CardBattleManager.folders[0] = {
      name: 'Mock Folder',
      energies: [0, 0, 0, 0, 0, 0],
      set: [
        { type: GameConst.BATTLE, color: GameConst.RED, figureName: 'default', attack: 10, health: 10, isActiveInLoadPhase: false },
        { type: GameConst.BATTLE, color: GameConst.BLUE, figureName: 'default', attack: 10, health: 10, isActiveInLoadPhase: false },
        { type: GameConst.BATTLE, color: GameConst.WHITE, figureName: 'default', attack: 10, health: 10, isActiveInLoadPhase: false },
        { type: GameConst.POWER, color: GameConst.GREEN, figureName: 'default', attack: 10, health: 10, isActiveInLoadPhase: true },
        { type: GameConst.POWER, color: GameConst.BLACK, figureName: 'default', attack: 10, health: 10, isActiveInLoadPhase: true },
        { type: GameConst.POWER, color: GameConst.BROWN, figureName: 'default', attack: 10, health: 10, isActiveInLoadPhase: true },
      ]
    };
  }

  setDecks() {
    CardBattleManager.setPlayerDeck(0);
    CardBattleManager.setChallengedDeck(0);
  }

  drawCards(drawNumber) {
    CardBattleManager.drawPlayerCards(drawNumber);
    CardBattleManager.drawChallengedCards(drawNumber);
  }

  putCards(putNumber) {
    CardBattleManager.putPlayerCards(putNumber);
    CardBattleManager.putChallengedCards(putNumber);
  }
  
  setPowerCardsInPowerZone() {
    const powerCardMock = { 
      type: GameConst.POWER, 
      color: GameConst.BLACK, 
      figureName: 'default', 
      attack: 10, 
      health: 10,
    };
    CardBattleManager.addPowerCardToPowerfield(powerCardMock);
    CardBattleManager.addPowerCardToPowerfield(powerCardMock);
    CardBattleManager.addPowerCardToPowerfield(powerCardMock);
  }

  mockIsTriggered() {
    this.mockFunction(Input, 'isTriggered', () => true);
  }

  update() {
    this.step.update();
  }
  
  asserts() {
    this.describe('Deve entrar em etapa de zona de poder quando não existirem jogadas e sim pelo menos um cartão de poder em fase de carregamento.');
    this.expectTrue('Foi ativado com tamanho/limite de 3?', CardBattleManager.getPowerfieldLength() === 3);
    this.expectTrue('A proxima etapa é PowerZoneStep?', this.isStep(PowerZoneStep));
  }
}