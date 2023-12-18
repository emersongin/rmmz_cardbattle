class CardBattleManager {
  phase;

  static changePhase(phase) {
    CardBattleManager.phase = phase;
  }

  static setup() {
    CardBattleManager.changePhase(new StartPhase(this));
    CardBattleManager.phase.start();
  }

  static update() {
    CardBattleManager.phase.update();
  }
}