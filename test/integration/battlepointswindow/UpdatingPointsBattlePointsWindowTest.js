class UpdatingPointsBattlePointsWindowTest extends SceneTest {
  name = 'UpdatingPointsBattlePointsWindowTest';

  create() {
    this.subject = BattlePointsWindow.create(0, 0);
    this.addWatched(this.subject);
  }

  start() {
    this.subject.alignCenterMiddle();
    this.subject.refresh();
    this.subject.open();
    const updateAttackPoints = BattlePointsWindow.createValueUpdate(GameConst.ATTACK_POINTS, 30);
    const updateHealtPoints = BattlePointsWindow.createValueUpdate(GameConst.HEALTH_POINTS, 30);
    const manyUpdates = [
      updateAttackPoints,
      updateHealtPoints
    ];
    this.test('Deve atualizar os pontos!', () => {
      this.subject.reset();
      this.subject.updateValues(manyUpdates);
    }, () => {
      this.assertWasTrue('Foram atualizado?', this.subject.isUpdating);
    });
  }
}