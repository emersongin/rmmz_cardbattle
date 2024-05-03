class UpdatingBattlePointsWindowTest extends SceneTest {
  name = 'UpdatingBattlePointsWindowTest';

  create() {
    this.subject = BattlePointsWindow.create(0, 0);
    this.addWindow(this.subject);
  }

  start() {
    this.subject.setCenteredPosition();
    this.subject.refresh();
    this.subject.open();
    const updateAttackPoints = BattlePointsWindow.createValueUpdate(GameConst.ATTACK_POINTS, 30);
    const updateHealtPoints = BattlePointsWindow.createValueUpdate(GameConst.HEALTH_POINTS, 30);
    const manyUpdates = [
      updateAttackPoints,
      updateHealtPoints
    ];
    manyUpdates.forEach(update => {
      this.test('Deve atualizar os pontos!', () => {
        this.subject.updateValues(update);
      }, () => {
        this.assertWasTrue('Foi atualizada?', this.subject.isUpdating);
      });
    });
    this.test('Deve atualizar todos os pontos!', () => {
      this.subject.reset();
      this.subject.updateValues(manyUpdates);
    }, () => {
      this.assertWasTrue('Foi atualizada?', this.subject.isUpdating);
    });
  }
}