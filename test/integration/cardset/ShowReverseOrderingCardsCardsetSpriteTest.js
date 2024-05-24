class ShowReverseOrderingCardsCardsetSpriteTest extends SceneTest {
  create() {
    this.subject = CardsetSprite.create(0, 0);
    this.addWatched(this.subject);
    this.subject.centralize();
    this.subject.show();
    const cards = CardGenerator.generateCards(3);
    const sprites = this.subject.listCards(cards);
    this.subject.showCards(sprites);
    this.subject.setNumberColor(1, GameColors.RED);
    this.subject.setNumberColor(2, GameColors.BLUE);
    this.subject.setNumberColor(3, GameColors.RED);
    this.subject.displayReverseOrdering();
  }

  asserts() {
    this.describe('Deve mostrar númeração em ordem inversa das cartas!');
    this.expectTrue('Esta mostrando a ordenação?', this.subject.isOrderingDisplayed());
    this.expectTrue('Ela esta em ordem reversa?', this.subject.isReverseOrdering());
  }
}