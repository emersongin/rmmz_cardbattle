class AnimateFlashCardsCardsetSpriteTest extends SceneTest {
  cardset;
  name = 'AnimateFlashCardsCardsetSpriteTest';

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
    this.test('Deve realizar um flash nos cartões!', () => {
      this.startFlash();
    }, () => {
      const isFlash = this.cardset.children.some(child => child.isFlashPlaying());
      this.assertTrue('Houve um flash de luz?', isFlash);
    }, 2);
  }

  async startFlash() {
    const cards = Generator.generateCards(6);
    const sprites = this.cardset.setCards(cards);
    this.cardset.startListCards();
    this.cardset.showCards();
    await this.timertoTrue(200);
    const sprite = this.cardset.getCardIndex(0);
    this.cardset.animateCardFlash(sprite);
    this.cardset.animateCardsFlash();
  }
}