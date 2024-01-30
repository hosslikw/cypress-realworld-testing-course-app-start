// Importing the component and necessary dependencies
import { mount } from 'cypress/vue';
import Stepper from '@/components/Stepper.vue';

// Describe the test suite for the Stepper component
describe('Stepper Component Tests', () => {
  // Test for the increment functionality
  it('increments the value when the increment button is clicked', () => {
    // Mount the Stepper component
    cy.mount(Stepper, {
      props: {
        initial: 10,
      },
    });

    // Locate the increment button and click it
    cy.get('[data-cy=increment]').click();

    // Assert that the value has been incremented
    cy.get('[data-cy=value]').should('have.text', '1');

    // (Optional) Testing the event handler, assuming an onChange event is emitted
    const onChangeSpy = cy.spy().as('onChangeSpy');
    cy.mount(Stepper, { props: { onChange: onChangeSpy } });
    cy.get('[data-cy=increment]').click();
    cy.get('@onChangeSpy').should('have.been.calledWith', 1);
  });

  // Additional tests can be added here
});
