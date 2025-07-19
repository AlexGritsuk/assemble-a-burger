describe('открытие деталей ингредиента', () => {
	beforeEach(() => {
		cy.visit('http://localhost:8080');
	});

	it('должен открыть страницу конструктора по умолчанию', () => {
		cy.contains('Соберите бургер');
	})

	it('должен открывать и закрывать модальное окно', () => {
		cy.get('li').contains('Краторная булка N-200i').click();
		cy.contains('Детали ингредиента');
		cy.get("[class^=modal-module__modal__close__]").click();
	});
})