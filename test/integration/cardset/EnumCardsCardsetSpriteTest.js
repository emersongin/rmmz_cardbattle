class EnumCardsCardsetSpriteTest extends SceneTest {
  create() {
    this.subject = CardsetSprite.create(0, 0);
    this.addWatched(this.subject);
    this.subject.centralize();
    this.subject.show();
    const cards = CardGenerator.generateCards(3);
    const sprites = this.subject.listCards(cards);
    this.subject.showCards(sprites);
    // this.subject.showEnums([
      // {
      //   number: 1,
      //   color: GameColors.RED,
      // },
      // {
      //   number: 2,
      //   color: GameColors.BLUE,
      // },
      // {
      //   number: 3,
      //   color: GameColors.RED,
      // },
    // ]);
  }

  asserts() {
    this.describe('Deve mostrar númeração ordenada das cartas!');
  }
}