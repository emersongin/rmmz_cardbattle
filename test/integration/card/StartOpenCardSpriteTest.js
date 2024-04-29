class StartOpenCardSpriteTest extends SceneTest {
  card;

  create() {
    const card = Generator.generateCard();
    this.card = CardSprite.create(
      card.type,
      card.color,
      card.figureName,
      card.attack,
      card.health
    );
    this.addChild(this.card);
  }

  start() {
    return new Promise(async resolve => {
      const act = () => {
        const centerXPosition = (Graphics.boxWidth / 2 - this.card.width / 2);
        const centerYPosition = (Graphics.boxHeight / 2 - this.card.height / 2);
        this.card.startOpen(centerXPosition, centerYPosition);
        this.card.show();
      };
      const assert = () => {
        this.assert(this.card.isOpened()).toBe(true);
      };
      this.test('deve estar aberta corretamente!', act, assert);
      resolve(await this.isFinished());
    });
  }

}