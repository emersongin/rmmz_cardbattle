class AnimateDamageCardsCardsetSpriteTest extends SceneTest {
  name = 'AnimateDamageCardsCardsetSpriteTest';

  create() {
    this.subject = CardsetSprite.create();
    const centerXPosition = (Graphics.boxWidth / 2 - this.subject.width / 2);
    const centerYPosition = (Graphics.boxHeight / 2 - this.subject.height / 2);
    this.subject.startPosition(centerXPosition, centerYPosition);
    this.subject.setBackgroundColor('white');
    this.addChild(this.subject);
  }

  start() {
    this.subject.show();
    const cards = CardGenerator.generateCards(6);
    this.test('Deve realizar animações nos cartões!', () => {
      const sprites = this.subject.setCards(cards);
      this.subject.startListCards();
      this.subject.showCards();
      const sprite = this.subject.getCardIndex(0);
      this.subject.animateCardDamage(sprite);
      this.subject.animateCardsDamage();
    }, () => {
      this.assertWasTrue('Houve uma animação?', this.subject.someSpriteIsAnimationPlaying);
    });
  }
}