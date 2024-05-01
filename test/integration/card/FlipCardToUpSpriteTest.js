class FlipCardToUpSpriteTest extends SceneTest {
  card;
  name = 'FlipCardToUpSpriteTest';

  create() {
    const card = Generator.generateCard();
    this.card = CardSprite.create(
      card.type,
      card.color,
      card.figureName,
      card.attack,
      card.health
    );
    const centerXPosition = (Graphics.boxWidth / 2 - this.card.width / 2);
    const centerYPosition = (Graphics.boxHeight / 2 - this.card.height / 2);
    this.card.startOpen(centerXPosition, centerYPosition);
    this.card.setToDown();
    this.addChild(this.card);
  }

  start() {
    this.card.show();
    this.test('O cartão deve estar em estado de hover!', () => {
      this.card.flipToUp();
    }, () => {
      this.assertTrue('Esta para cima?', this.card.isTurnedToUp());
      this.assertTrue('Esta aberto?', this.card.isOpened());
    });
  }
}