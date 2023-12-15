class CardBattleManager {
  phase;

  static changePhase(phase) {
    CardBattleManager.phase = phase;
  }

  static setup() {
    CardBattleManager.changePhase(new StartPhase(this));
  }

  static update() {
    CardBattleManager.phase.updateStart();
  }
}