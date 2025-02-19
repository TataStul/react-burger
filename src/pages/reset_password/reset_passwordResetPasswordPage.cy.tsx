import React from 'react'
import { ResetPasswordPage } from './reset_password'

describe('<ResetPasswordPage />', () => {
  it('renders', () => {
    // see: https://on.cypress.io/mounting-react
    cy.mount(<ResetPasswordPage />)
  })
})