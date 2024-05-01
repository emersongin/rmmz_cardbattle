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
    this.test('Deve realizar uma animação nos cartões!', () => {
      this.startDamage();
    }, () => {
      const isAnimationPlaying = this.cardset.children.some(child => child.isAnimationPlaying());
      this.assertTrue('Houve uma animação?', isAnimationPlaying);
    }, 2);
  }

  async startDamage() {
    const cards = Generator.generateCards(6);
    const sprites = this.cardset.setCards(cards);
    this.cardset.startListCards();
    this.cardset.showCards();
    await this.timertoTrue(300);
    const sprite = this.cardset.getCardIndex(0);
    this.cardset.animateCardDamage(sprite);
    this.cardset.animateCardsDamage();
  }
}