describe('Loan Payment Calculator', () => {
  it('runs the app', () => {
    cy.visit('/')
    cy.url().should('eq', 'http://localhost:5173/')
  })

  it('should display the form with initial default values', () => {
    cy.visit('/')

    // Check that the initial value of the loanAmount is '30,000'
    cy.get('input[id="loanAmount"]').should('have.value', '30,000')

    // Check that the initial value of the loanPurpose is set to the first option
    cy.get('select[id="loanPurpose"]').should('have.value', '0.1')

    // Check that the initial value of the loanRepaymentPeriod is set to the first option
    cy.get('select[id="loanRepaymentPeriod"]').should('have.value', '52')

    // Check that the initial value of the loanTermMonth is set to the first option
    cy.get('select[id="loanTermMonth"]').should('have.value', '6')
  })

  it('should display the results with those initial default values', () => {
    cy.visit('/')
    cy.get('[data-test="repayments"]').contains('$1,184')
    cy.get('[data-test="totalRepayments"]').contains('$30,784')
  })

  it('should calculate the monthly repayment correctly', () => {
    cy.visit('/')
    cy.get('input[id="loanAmount"]').should('have.value', '30,000')
    cy.get('select[name="loanPurpose"]').should('be.visible').select('0.1')
    cy.get('select[name="loanRepaymentPeriod"]').should('be.visible').select('12')
    cy.get('select[name="loanTermMonth"]').should('be.visible').select('24')

    cy.get('[data-test="repayments"]').contains('$1,384')
  })

  it('should display error messages for invalid inputs', () => {
    cy.visit('/')

    cy.get('input[name="loanAmount"]').clear()
    cy.get('input[name="loanAmount"]').should('be.visible').type('100')
    cy.get('[data-test="error-message"]').contains('Loan amount must be at least $1000')

    cy.get('input[name="loanAmount"]').clear()
    cy.get('input[name="loanAmount"]').should('be.visible').type('200000000')
    cy.get('[data-test="error-message"]').contains('Loan amount cannot exceed $20,000,000')
  })

  it('should display the correct repayment period label', () => {
    cy.visit('/')
    cy.get('input[id="loanAmount"]').should('have.value', '30,000')
    cy.get('select[name="loanPurpose"]').should('be.visible').select('0.1')
    cy.get('select[name="loanRepaymentPeriod"]').should('be.visible').select('12')
    cy.get('select[name="loanTermMonth"]').should('be.visible').select('24')

    cy.get('[data-test="repayments"]').contains('Monthly')
  })
})
