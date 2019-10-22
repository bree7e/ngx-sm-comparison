import { getGreeting } from '../support/app.po';

describe('mobx', () => {
  beforeEach(() => cy.visit('/'));

  it('should display welcome message', () => {
    getGreeting().contains('Welcome to mobx!');
  });
});
