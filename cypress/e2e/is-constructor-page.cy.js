describe('Создание заказа', () => {
	beforeEach(() => {
		cy.visit('http://localhost:8080')
	});
	it('Проверка страницы конструктора по умолчанию', () => {
		cy.contains('Соберите бургер')
	});

	it('Добавить ингредиенты и оформить заказ', () => {
		cy.get('[data-cy=burger-constructor]').as("constructor");
		cy.get('li').contains('Краторная булка N-200i').trigger("dragstart").trigger("dragleave");
		cy.get("@constructor").trigger("dragenter").trigger("dragover").trigger("drop").trigger("dragend");
		cy.get('li').contains('Филе Люминесцентного тетраодонтимформа').trigger("dragstart").trigger("dragleave");
		cy.get("@constructor").trigger("dragenter").trigger("dragover").trigger("drop").trigger("dragend");
		cy.get('li').contains('Биокотлета из марсианской Магнолии').trigger("dragstart");
		cy.get("@constructor").trigger("dragenter").trigger("dragover").trigger("drop").trigger("dragend");
		cy.get('button').contains('Оформить заказ').click();

		cy.get('form').within(() => {
			cy.get('input:first').should('have.attr', 'name', 'email').type('alexey1212@yandex.ru');
			cy.get('input:last').should('have.attr', 'name', 'password').type('qwerty12345');
			cy.get('button').contains('Войти').click();
			cy.wait(500);

		})

		cy.get('button').contains('Оформить заказ').click();
		cy.wait(17000)
		cy.contains('Ваш заказ начали готовить');
		cy.get("[class^=modal-module__modal__close__]").click();

		cy.contains('Соберите бургер');
		cy.contains('Лента заказов').click();
		cy.wait(10000);
		cy.contains('Конструктор').click();
	});
});

