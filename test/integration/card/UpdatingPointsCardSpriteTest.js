class UpdatingPointsCardSpriteTest extends SceneTest {
  card;
  name = 'UpdatingPointsCardSpriteTest';

  create() {
    const card = Generator.generateCard(CardTypes.BATTLE);
    this.card = CardSprite.create(
      card.type,
      card.color,
      card.figureName,
      0,
      0
    );
    const centerXPosition = (Graphics.boxWidth / 2 - this.card.width / 2);
    const centerYPosition = (Graphics.boxHeight / 2 - this.card.height / 2);
    this.card.startOpen(centerXPosition, centerYPosition);
    this.addChild(this.card);
  }

  start() {
    this.card.show();
    this.test('Deve atualizar os pontos do cartão!', () => {
      this.card.changePoints(99, 99);
    }, () => {
      this.assertTrue('Esta atualizando?', this.card.isUpdating());
    });
  }
}