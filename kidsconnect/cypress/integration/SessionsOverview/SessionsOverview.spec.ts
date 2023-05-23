describe('Landing Sessions Overview', () => {
    beforeEach(() => {
        cy.visit('/sessions');
    });

    it('displays sessions for the default date', () => {
        cy.get('div').contains('Sessions Overview');
        cy.get('button').contains('Previous day').should('be.visible');
        cy.get('button').contains('Next day').should('be.visible');
        // cy.get('div').contains('No sessions available.');
    });

    it('displays sessions for the selected date', () => {
        cy.get('button').contains('Next day').click();
        cy.get('div').contains('Sessions Overview');
        cy.get('button').contains('Previous day').should('be.visible');
        cy.get('button').contains('Next day').should('be.visible');
        // cy.get('div').contains('No sessions available.');
    });
});

/* describe('Sessions API', () => {
    it('returns sessions for a specific date', () => {
        cy.request('/sessions?day=2023-06-02')
            .its('body')
            .should('have.length', 4)
            .and('deep.include', {
                day: '2023-06-02',
                start_time: '08:00',
                end_time: '12:30',
                product_name: 'Morning only',
                child_id: 15,
                group: {
                    id: 1,
                    name: 'Group 1',
                },
                presence: 'unknown',
            });
    });

    it('returns an empty array when there are no sessions for a specific date', () => {
        cy.request('/sessions?day=2023-06-01').its('body').should('have.length', 0);
    });

    it('returns all sessions when no date is provided', () => {
        cy.request('/sessions').its('body').should('have.length', 9);
    });

    // Add more test cases as needed
}); */
