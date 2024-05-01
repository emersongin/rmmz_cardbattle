class IluminatedCardSpriteTest extends SceneTest {
  card;
  name = 'IluminatedCardSpriteTest';

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
    this.addChild(this.card);
  }

  start() {
    return new Promise(async res => {
      await this.test('O cartão deve estar em estado de hover!', () => {
        this.card.show();
        this.card.iluminate();
      }, () => {
        this.assert('Esta iluminado?', this.card.isIluminated()).toBe(true);
      });
      return res(this.finish());
    });
  }
}