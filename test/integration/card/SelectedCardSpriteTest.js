class SelectedCardSpriteTest extends SceneTest {
  card;
  name = 'SelectedCardSpriteTest';

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
      await this.test('O cartão deve estar em estado de select!', () => {
        this.card.show();
        this.card.select();
      }, () => {
        this.assert('Esta selecioando?', this.card.isSelected()).toBe(true);
      });
      return res(this.finish());
    });
  }
}