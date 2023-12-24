class ChallengePhase {
  _manager;

  constructor(manager) {
    this._manager = manager;
    this._manager.phaseChanged();
    this.createCardBattePlayer();
    this.createCardBatteEnemy();
  }

  createCardBattePlayer() {
    const playerName = 'Player';
    const playerLevel = 1;
    const playerDeck = [];
    const player = new CardBattlePlayer(playerName, playerLevel, playerDeck);
    this._manager.setPlayer(player);
  }
  
  createCardBatteEnemy() {
    const enemyName = 'Shining Dragon';
    const enemyLevel = 102;
    const enemyDeck = [];
    const enemy = new CardBattlePlayer(enemyName, enemyLevel, enemyDeck);
    this._manager.setEnemy(enemy);
  }

  update() {
    if (Input.isTriggered('ok')) {
      this._manager.changePhase(new ChooseFolderPhase(this._manager));
    }
  }
}