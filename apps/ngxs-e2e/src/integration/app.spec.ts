import { getGreeting } from '../support/app.po';

describe('ngxs', () => {
  beforeEach(() => cy.visit('/'));

  it('should display welcome message', () => {
    getGreeting().contains('Welcome to ngxs!');
  });
});
