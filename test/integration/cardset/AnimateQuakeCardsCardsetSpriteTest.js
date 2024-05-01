class AnimateQuakeCardsCardsetSpriteTest extends SceneTest {
  cardset;
  name = 'AnimateQuakeCardsCardsetSpriteTest';

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
    this.test('Deve realizar um chacoalhar nos cartões!', () => {
      this.startQuake();
    }, () => {
      const isMoving = this.cardset.children.some(child => child.isMoving());
      this.assertTrue('Houve um chacoalhar?', isMoving);
    });
  }

  async startQuake() {
    const cards = Generator.generateCards(6);
    const sprites = this.cardset.setCards(cards);
    this.cardset.startListCards();
    this.cardset.showCards();
    await this.timertoTrue(200);
    const sprite = this.cardset.getCardIndex(0);
    this.cardset.animateCardQuake(sprite, 3);
    this.cardset.animateCardsQuake(50);
  }
}