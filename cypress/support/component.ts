// ***********************************************************
// This example support/component.ts is processed and
// loaded automatically before your test files.
//
// This is a great place to put global configuration and
// behavior that modifies Cypress.
//
// You can change the location of this file or turn off
// automatically serving support files with the
// 'supportFile' configuration option.
//
// You can read more here:
// https://on.cypress.io/configuration
// ***********************************************************

// Import commands.js using ES2015 syntax:
import './commands';
import { mount } from 'cypress/vue';
import { createMemoryHistory, createRouter } from 'vue-router';
import { routes } from '../../src/router';
import { getStore } from '../../src/plugins/store';
// Augment the Cypress namespace to include type definitions for
// your custom command.
// Alternatively, can be defined in cypress/support/component.d.ts
// with a <reference path="./component" /> at the top of your spec.
declare global {
  namespace Cypress {
    interface Chainable {
      mount: typeof mount;
    }
  }
}
Cypress.Commands.add('mount', (component, options = {}) => {
  // Setup options object
  options.global = options.global || {};
  options.global.stubs = options.global.stubs || {};
  options.global.stubs['transition'] = false;
  options.global.components = options.global.components || {};
  options.global.plugins = options.global.plugins || [];

  // create router if one is not provided
  if (!options.router) {
    options.router = createRouter({
      history: createMemoryHistory(),
      routes: routes,
    });
  }
  // Use store passed in from options, or initialize a new one
  const store = options.store || getStore();
  // Add router plugin
  options.global.plugins.push({
    install(app) {
      app.use(options.router);
      app.use(store);
    },
  });
  return mount(component, options);
});
// Example use:
// cy.mount(MyComponent)