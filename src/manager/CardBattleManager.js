class CardBattleManager {
  phase;

  static changePhase(phase) {
    CardBattleManager.phase = phase;
  }

  static setup() {
    CardBattleManager.changePhase(new ChallengerPhase(this));
  }

  static update() {
    CardBattleManager.phase.update();
  }

  static isChallengerPhase() {
    return CardBattleManager.phase instanceof ChallengerPhase;
  }

  static isStartPhase() {
    return CardBattleManager.phase instanceof StartPhase;
  }
}