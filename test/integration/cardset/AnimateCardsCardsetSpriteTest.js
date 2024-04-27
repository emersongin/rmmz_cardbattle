class AnimateCardsCardsetSpriteTest extends SceneTest {
  cardset;

  create() {
    this.cardset = CardsetSprite.create();
    const centerXPosition = (Graphics.boxWidth / 2 - this.cardset.width / 2);
    const centerYPosition = (Graphics.boxHeight / 2 - this.cardset.height / 2);
    this.cardset.startPosition(centerXPosition, centerYPosition);
    this.cardset.setBackgroundColor('white');
  }

  async start() {
    return new Promise(async resolve => {
      this.scene.addChild(this.cardset);
      await this.startFlash();
      await this.startDamage();
      await this.startQuake();
      resolve(true);
    });
  }

  startFlash() {
    return new Promise(async resolve => {
      const cards = this.generateCards(6);
      const sprites = this.cardset.setCards(cards);
      this.cardset.startListCards();
      this.cardset.showCards();
      setTimeout(() => {
        const sprite = this.cardset.getCardIndex(0);
        this.cardset.animateCardFlash(sprite);
        this.cardset.animateCardsFlash();
        setTimeout(() => {
          this.cardset.clear();
          resolve(true);
        }, 2000)
      }, 200);
    });
  }

  startDamage() {
    return new Promise(async resolve => {
      const cards = this.generateCards(6);
      const sprites = this.cardset.setCards(cards);
      this.cardset.startListCards();
      this.cardset.showCards();
      setTimeout(() => {
        const sprite = this.cardset.getCardIndex(0);
        this.cardset.animateCardDamage(sprite);
        this.cardset.animateCardsDamage();
        setTimeout(() => {
          this.cardset.clear();
          resolve(true);
        }, 3000)
      }, 200);
    });
  }

  startQuake() {
    return new Promise(async resolve => {
      const cards = this.generateCards(6);
      const sprites = this.cardset.setCards(cards);
      this.cardset.startListCards();
      this.cardset.showCards();
      setTimeout(() => {
        const sprite = this.cardset.getCardIndex(0);
        this.cardset.animateCardQuake(sprite, 3);
        this.cardset.animateCardsQuake(3);
        setTimeout(() => {
          this.cardset.clear();
          resolve(true);
        }, 2000)
      }, 200);
    });
  }
}