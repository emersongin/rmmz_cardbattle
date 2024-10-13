class ShouldUpdatePointsOfWindowTest extends SceneTest {
  create() {
    this.createHandler();
    const battlePointsWindow = BattlePointsWindow.create(0, 0);
    battlePointsWindow.alignCenterMiddle();
    battlePointsWindow.refresh();
    this.window = battlePointsWindow;
    this.addWatched(this.window);
  }

  start() {
    this.window.open();
    const updateAttackPoints = BattlePointsWindow.createValueUpdate(GameConst.ATTACK_POINTS, 30);
    const updateHealtPoints = BattlePointsWindow.createValueUpdate(GameConst.HEALTH_POINTS, 30);
    const manyUpdates = [
      updateAttackPoints,
      updateHealtPoints
    ];
    this.window.reset();
    this.window.updateValues(manyUpdates);
    const finish = this.getHandler();
    this.spyFunction(this.window, 'stop', () => {
      finish();
    });    
  }

  asserts() {
    this.describe('Deve atualizar os pontos da janelda de batalha!');
    const attackPoints = 30;
    const healthPoints = 30;
    const points = `AP ${attackPoints} HP ${healthPoints}`;
    this.expectWasTrue('Os pontos foram atualizados?', this.window.isUpdating);
    this.expectTrue('Os pontos foram atualizados corretamente?', this.window.isTextLastUpdate(points));
    this.expectTrue('O estado da janela está parado?', this.window.isStopped());
  }
}