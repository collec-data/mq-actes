import { defineConfig } from 'cypress'

export default defineConfig({

  //
  // XXX: Important car on execute des tests avec des iframes
  // d'origines différentes. 
  //
  chromeWebSecurity: false,
  
  e2e: {
    'baseUrl': 'http://localhost:4200',
    supportFile: false
  },
  
  
  component: {
    devServer: {
      framework: 'angular',
      bundler: 'webpack',
    },
    specPattern: '**/*.cy.ts'
  }
  
})