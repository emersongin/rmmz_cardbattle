class OpenCardSpriteTest extends SceneTest {
  card;
  name = 'OpenCardSpriteTest';

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
    this.card.startClosed(centerXPosition, centerYPosition);
    this.addChild(this.card);
  }

  start() {
    this.test('Deve abrir o cartão!', () => {
      this.card.show();
      this.card.open();
    }, () => {
      this.assert('Esta aberto?', this.card.isOpened()).toBe(true);
    });
  }
}