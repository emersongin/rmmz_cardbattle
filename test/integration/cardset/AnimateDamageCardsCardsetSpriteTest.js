class AnimateDamageCardsCardsetSpriteTest extends SceneTest {
  cardset;
  name = 'AnimateDamageCardsCardsetSpriteTest';

  create() {
    this.cardset = CardsetSprite.create();
    const centerXPosition = (Graphics.boxWidth / 2 - this.cardset.width / 2);
    const centerYPosition = (Graphics.boxHeight / 2 - this.cardset.height / 2);
    this.cardset.startPosition(centerXPosition, centerYPosition);
    this.cardset.setBackgroundColor('white');
    this.addChild(this.cardset);
  }

  start() {
    this.cardset.show();
    const cards = CardGenerator.generateCards(6);
    this.test('Deve realizar animações nos cartões!', () => {
      const sprites = this.cardset.setCards(cards);
      this.cardset.startListCards();
      this.cardset.showCards();
      const sprite = this.cardset.getCardIndex(0);
      this.cardset.animateCardDamage(sprite);
      this.cardset.animateCardsDamage();
    }, () => {
      this.assertTrue('Houve uma animação?', this.cardset.someSpriteIsAnimationPlaying());
    }, 2);
  }
}