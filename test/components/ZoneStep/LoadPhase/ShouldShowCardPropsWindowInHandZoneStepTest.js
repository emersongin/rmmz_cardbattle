class ShouldShowCardPropsWindowInHandZoneStepLoadPhaseTest extends SceneTest {
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
    this.describe('Deve mostrar a janela de propriedades de cartão de etapa de zona de mão em fase de carregamento.');
    this.expectWasTrue('A janela de propriedades de cartão foi apresentado?', this.step.isCardPropsWindowVisible);
    const cardProps = this.step.getCardPropsByCardIndex(0);
    this.expectTrue(`A descrição da janela é: ${cardProps}?`, this.step.isCardPropsWindowText(cardProps));

    // this.expectWasTrue('O set de cartas foi apresentado?', this.step.isCardsetSpriteVisible);
    // this.expectTrue('O cursor foi movido?', this.cardIndex >= 0);
  }
}