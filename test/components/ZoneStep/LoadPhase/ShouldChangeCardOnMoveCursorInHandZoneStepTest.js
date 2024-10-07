class ShouldChangeCardOnMoveCursorInHandZoneStepLoadPhaseTest extends SceneTest {
  step;

  create() {
    this.createHandler();
    const config = { location: GameConst.HAND, player: GameConst.PLAYER};
    this.step = new ZoneStep(this._scene, GameConst.LOAD_PHASE, config);
    this.addAssistedHidden(this.step);
  }

  start() {
    this.spyCommandMoveCursorLoadPhase();
    this.mockFolders();
    CardBattleManager.setPlayerDeck();
    CardBattleManager.setChallengedDeck();
    CardBattleManager.drawPlayerCards(3);
    this._scene.setStep(this.step);
    this.step.start();
    this.step.addAction(() => {
      this.mockFunction(this.step._cardsetSprite._status, 'isRepeatedOrLongPressedRight', () => {
        return true;
      });
    });

  }

  spyCommandMoveCursorLoadPhase() {
    const finish = this.getHandler();
    this.spyFunction(this.step, 'commandMoveCursorLoadPhase', (cardIndex) => {
      if (cardIndex) finish();
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
    this.describe('Ao mover o cursor deve mudar cartão e dados das janelas na zona de mão em fase de carregamento.');
    const cardName = this.step.getCardNameByCardIndex(1);
    const cardDescription = this.step.getCardDescriptionByCardIndex(1);
    const cardProps = this.step.getCardPropsByCardIndex(1);
    this.expectTrue(`A descrição da janela é: ${cardName}?`, this.step.isCardNameWindowText('card 2'));
    this.expectTrue(`A descrição da janela é: ${cardDescription}?`, this.step.isCardDescriptionWindowText('description 2'));
    this.expectTrue(`A descrição da janela é: ${cardProps}?`, this.step.isCardPropsWindowText('10/10'));
  }
}