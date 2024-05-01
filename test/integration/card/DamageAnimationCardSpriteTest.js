class DamageAnimationCardSpriteTest extends SceneTest {
  card;
  name = 'DamageAnimationCardSpriteTest';

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
    const times = 1;
    this.card.show();
    this.test('O cartão deve receber uma animação de dano!', () => {
      this.card.damage(times);
    }, () => {
      this.assertTrue('Houve uma animação?', this.card.isAnimationPlaying());
    });
  }
}