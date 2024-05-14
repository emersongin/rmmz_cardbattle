class UpdatingPointsCardSpriteTest extends SceneTest {
  create() {
    const card = CardGenerator.generateCard(CardTypes.BATTLE);
    this.subject = CardSprite.create(
      card.type,
      card.color,
      card.figureName,
      0,
      0
    );
    this.addWatched(this.subject);
    const centerXPosition = (Graphics.boxWidth / 2 - this.subject.width / 2);
    const centerYPosition = (Graphics.boxHeight / 2 - this.subject.height / 2);
    this.subject.startOpen(centerXPosition, centerYPosition);
    this.subject.show();
    this.subject.changePoints(25, 18);
  }

  asserts() {
    this.describe('Deve atualizar os pontos do card!');
    this.assertWasTrue('Foram atualizandos?', this.subject.isUpdatingPoints);
  }
}