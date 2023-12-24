class CardBattleManager {
  _phase;
  _isPhaseChanged;
  _player;
  _enemy;

  static phaseChanged() {
    this._isPhaseChanged = true;
  }

  static phaseChangeDone() {
    this._isPhaseChanged = false;
  }

  static isPhaseChanged() {
    return this._isPhaseChanged;
  }

  static changePhase(phase) {
    CardBattleManager._phase = phase;
  }

  static setup() {
    CardBattleManager.changePhase(new ChallengePhase(this));
  }

  static setPlayer(player) {
    this._player = player;
  }

  static getPlayerName() {
    return this._player.getName();
  }

  static getPlayerLevel() {
    return this._player.getLevel();
  }

  static setEnemy(enemy) {
    this._enemy = enemy;
  }

  static getEnemyName() {
    return this._enemy.getName();
  }

  static getEnemyLevel() {
    return this._enemy.getLevel();
  }

  static update() {
    CardBattleManager._phase.update();
  }

  static isChallengerPhase() {
    return CardBattleManager._phase instanceof ChallengePhase;
  }

  static isChooseFolderPhase() {
    return CardBattleManager._phase instanceof ChooseFolderPhase;
  }

  // static isStartPhase() {
  //   return CardBattleManager._phase instanceof StartPhase;
  // }
}