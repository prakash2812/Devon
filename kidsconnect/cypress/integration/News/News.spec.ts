describe('Landing NewsForm', () => {
    beforeEach(() => {
        cy.visit('/news/postnews');
        cy.wait(2000);
    });

    it('Validate all news fields', () => {
        cy.get('button[type="submit"]').click();
        cy.contains('Title is required');
        cy.contains('Content is required');
        cy.contains('Author is required');
    });
    /* it('Vweify all news fields', () => {
        cy.get('input[label="Title"]').type('New News Title');
        cy.get('textarea[label="Content"]').type('This is the content of the news item.');
        cy.get('textarea[label="Author"]').type('omprakash');
        cy.contains('New News Title');
        cy.contains('Author: omprakash');
        cy.contains('This is the content of the news item.');
        cy.get('button[type="submit"]').click();
    }); */
});

/* describe('News API', () => {
    it('returns a list of news items', () => {
        cy.request('/news').its('body').should('have.length', 2).and('deep.include', {
            id: 1,
            title: 'Job candidate excels at hiring exercise, reviewers stunned!',
            author: 'Ms. Reporter',
            content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt...',
        });
    });

    it('returns an error when requesting a non-existent news item by ID', () => {
        cy.request({
            url: '/news/100',
            failOnStatusCode: false,
        })
            .its('status')
            .should('eq', 404);
    });

    // Add more test cases as needed
}); */
