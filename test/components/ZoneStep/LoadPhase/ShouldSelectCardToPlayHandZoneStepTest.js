class ShouldSelectCardToPlayHandZoneStepLoadPhaseTest extends SceneTest {
  step;

  create() {
    this.createHandler();
    const config = { location: GameConst.HAND, player: GameConst.PLAYER};
    this.step = new ZoneStep(this._scene, GameConst.LOAD_PHASE, config);
    this.addAssistedHidden(this.step);
  }

  start() {
    this.spyCommandSelectHandlerLoadPhase();
    this.mockFolders();
    CardBattleManager.setPlayerDeck();
    CardBattleManager.setChallengedDeck();
    CardBattleManager.drawPlayerCards(3);
    this._scene.setStep(this.step);
    this.step.start();
    this.step.addAction(() => {
      this.mockFunction(this.step.getCardsetSpriteStatus(), 'isTriggeredOk', () => {
        return true;
      });
    });

  }

  spyCommandSelectHandlerLoadPhase() {
    const finish = this.getHandler();
    this.spyFunction(this.step, 'commandSelectHandlerLoadPhase', (cardIndex) => {
      finish();
    });
  }

  mockFolders() {
    CardBattleManager.folders[0] = {
      name: 'Mock Folder',
      energies: [0, 0, 0, 0, 0, 0],
      set: [
        { name: 'card 1', description: 'description 1', type: GameConst.POWER, color: GameConst.GREEN, figureName: 'default', attack: 10, health: 10, isActiveInLoadPhase: true },
        { name: 'card 2', description: 'description 2', type: GameConst.BATTLE, color: GameConst.GREEN, figureName: 'default', attack: 10, health: 10, isActiveInLoadPhase: false },
        { name: 'card 3', description: 'description 3', type: GameConst.BATTLE, color: GameConst.BLUE, figureName: 'default', attack: 10, health: 10, isActiveInLoadPhase: false },
      ]
    };
  }

  update() {
    this.step.update();
  }
  
  asserts() {
    this.describe('Ao cancelar seleção deve fechar as janelas e o cardset e mudar a etapa na zona de mão em fase de carregamento.');
    this.expectTrue('A janela de localização foi fechada?', this.step.isLocationWindowClosed());
    this.expectTrue('A janela de nome de cartão foi fechada?', this.step.isCardNameWindowClosed());
    this.expectTrue('A janela de descrição de cartão foi fechada?', this.step.isCardDescriptionWindowClosed());
    this.expectTrue('A janela de propriedades de cartão foi fechada?', this.step.isCardPropsWindowClosed());
    this.expectTrue('A janela de propriedades de cartão foi fechada?', this.step.allCardsAreClosed());
    this.expectTrue('A proxima etapa é ActivationSlotStep?', this.isStep(ActivationSlotStep));
    this.expectTrue('Eh ActivationSlotStep de jogador?', this.step.getPlayer() === GameConst.PLAYER);
  }
}