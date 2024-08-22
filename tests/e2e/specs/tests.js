describe('Example test', () => {
  it('runs the app', () => {
    cy.visit('/')
    cy.url().should('eq', 'http://localhost:5173/')
  })
})

describe('Loan Calculator', () => {
  it('should calculate the monthly repayment correctly', () => {
    cy.visit('/')

    cy.get('input[name="loanAmount"]').type('30000')
    cy.get('select[name="loanPurpose"]').select('0.1')
    cy.get('select[name="loanRepaymentPeriod"]').select('12')
    cy.get('select[name="loanTermMonth"]').select('24')

    cy.get('button[type="submit"]').click()

    cy.get('[data-test="repayments"]').contains('$1,384')
  })
})

describe('LoanForm Validation', () => {
  it('should display error messages for invalid inputs', () => {
    cy.visit('/')

    cy.get('input[name="loanAmount"]').clear()
    cy.get('input[name="loanAmount"]').type('i')
    cy.get('[data-test="error-message"]').contains('Invalid loan amount')

    cy.get('input[name="loanAmount"]').clear()
    cy.get('input[name="loanAmount"]').type('100')
    cy.get('[data-test="error-message"]').contains('Loan amount must be at least $1000')

    cy.get('input[name="loanAmount"]').clear()
    cy.get('input[name="loanAmount"]').type('200000000')
    cy.get('[data-test="error-message"]').contains('Loan amount cannot exceed $20,000,000')
  })
})

describe('LoanResults', () => {
  it('should display the correct repayment period label', () => {
    cy.visit('/')

    cy.get('input[name="loanAmount"]').type('30000')
    cy.get('select[name="loanPurpose"]').select('0.1')
    cy.get('select[name="loanRepaymentPeriod"]').select('12')
    cy.get('select[name="loanTermMonth"]').select('24')

    cy.get('button[type="submit"]').click()

    cy.get('[data-test="repayments"]').contains('Monthly')
  })
})

describe('LoanForm Reset', () => {
  it('should reset all form fields when the reset button is clicked', () => {
    cy.visit('/')

    cy.get('input[name="loanAmount"]').type('10000')
    cy.get('select[name="loanPurpose"]').select('0.045')
    cy.get('select[name="loanRepaymentPeriod"]').select('12')
    cy.get('select[name="loanTermMonth"]').select('24')

    cy.get('button[type="button"]').click()

    cy.get('input[name="loanAmount"]').should('have.value', '')
    cy.get('select[name="loanPurpose"]').should('have.value', '0.1')
    cy.get('select[name="loanRepaymentPeriod"]').should('have.value', '52')
    cy.get('select[name="loanTermMonth"]').should('have.value', '6')
  })
})
