import { getGreeting } from '../support/app.po';

describe('ngrx', () => {
  beforeEach(() => cy.visit('/'));

  it('should display welcome message', () => {
    getGreeting().contains('Welcome to ngrx!');
  });
});
