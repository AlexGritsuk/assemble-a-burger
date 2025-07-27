describe('service is available', function () {
	it('should be available on localhost:8080', function () {
		cy.visit('/assemble-a-burger/');
	});
});
