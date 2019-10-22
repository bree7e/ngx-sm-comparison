import { getGreeting } from '../support/app.po';

describe('rxjs', () => {
  beforeEach(() => cy.visit('/'));

  it('should display welcome message', () => {
    getGreeting().contains('Welcome to rxjs!');
  });
});
