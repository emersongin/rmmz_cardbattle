class ShowReverseOrderingByIndexesCardsCardsetSpriteTest extends SceneTest {
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
    const indexes = [0, 1];
    this.subject.displayReverseOrdering(indexes);
  }

  asserts() {
    this.describe('Deve mostrar númeração em ordem inversa das cartas!');
    this.expectTrue('Esta mostrando o número de ordenação para o indice 0?', this.subject.isOrderingSpriteDisplayed(0));
    this.expectTrue('Esta mostrando o número de ordenação para o indice 1?', this.subject.isOrderingSpriteDisplayed(1));
    this.expectTrue('Esta oculto o número de ordenação para o indice 2?', this.subject.isOrderingSpriteDisplayed(2) === false);
    const invertedNumbers = [2, 1];
    this.expectTrue('O número desenhado no indice 0 é 2?', this.subject.isOrderingSpriteDrawedByIndex(0, invertedNumbers[0]));
    this.expectTrue('O número desenhado no indice 1 é 1?', this.subject.isOrderingSpriteDrawedByIndex(1, invertedNumbers[1]));
  }
}