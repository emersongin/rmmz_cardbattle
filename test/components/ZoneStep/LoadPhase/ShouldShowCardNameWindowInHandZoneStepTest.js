class ShouldShowCardNameWindowInHandZoneStepLoadPhaseTest extends SceneTest {
  step;

  create() {
    this.createHandler();
    const config = { location: GameConst.HAND, player: GameConst.PLAYER};
    this.step = new ZoneStep(this._scene, GameConst.LOAD_PHASE, config);
    this.addAssistedHidden(this.step);
  }

  start() {
    const finish = this.getHandler();
    this.spyFunction(this.step, 'openAllWindows', () => {
      this.step.addAction(finish);
    });
    this.mockFolders();
    CardBattleManager.setPlayerDeck();
    CardBattleManager.setChallengedDeck();
    CardBattleManager.drawPlayerCards(3);
    this._scene.setStep(this.step);
    this.step.start();
  }

  mockFolders() {
    this.mockFunction(CardBattleManager, 'folders', [
      {
        name: 'Mock Folder',
        energies: [0, 0, 0, 0, 0, 0],
        set: [
          { name: 'card 1', type: GameConst.POWER, color: GameConst.GREEN, figureName: 'default', attack: 10, health: 10, isActiveInLoadPhase: true },
          { name: 'card 2', type: GameConst.BATTLE, color: GameConst.GREEN, figureName: 'default', attack: 10, health: 10, isActiveInLoadPhase: false },
          { name: 'card 3', type: GameConst.BATTLE, color: GameConst.BLUE, figureName: 'default', attack: 10, health: 10, isActiveInLoadPhase: false },
        ]
      }
    ]);
  }

  update() {
    this.step.update();
  }
  
  asserts() {
    this.describe('Deve mostrar a janela de nome de cartão de etapa de zona de mão em fase de carregamento.');
    this.expectWasTrue('A janela de nome de cartão foi apresentado?', this.step.isCardNameWindowVisible);
    const cardName = this.step.getCardNameByCardIndex(0);
    this.expectTrue(`A descrição da janela é: ${cardName}?`, this.step.isCardNameWindowText(cardName));
  }
}