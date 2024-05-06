class UpdatingPointsCardSpriteTest extends SceneTest {
  name = 'UpdatingPointsCardSpriteTest';

  create() {
    const card = CardGenerator.generateCard(CardTypes.BATTLE);
    this.subject = CardSprite.create(
      card.type,
      card.color,
      card.figureName,
      0,
      0
    );
    const centerXPosition = (Graphics.boxWidth / 2 - this.subject.width / 2);
    const centerYPosition = (Graphics.boxHeight / 2 - this.subject.height / 2);
    this.subject.startOpen(centerXPosition, centerYPosition);
    this.subject.show();
    this.addWatched(this.subject);
  }

  start() {
    this.test('Deve atualizar os pontos!', () => {
      this.subject.changePoints(25, 18);
    }, () => {
      this.assertWasTrue('Foram atualizandos?', this.subject.isUpdatingPoints);
    });
  }
}