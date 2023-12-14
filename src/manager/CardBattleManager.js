class CardBattleManager {
  constructor() {
    throw new Error('This is a static class');
  }

  static init() {
    console.log('manager init!');
  }
}