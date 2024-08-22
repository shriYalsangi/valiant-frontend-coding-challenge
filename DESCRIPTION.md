TODO: Quick scratch breakdown of your to-dos, how you broke up the different tasks and any QA / tests you did.

# Component structure
 - LoanCalculatorComponent: This will be the main component that houses the entire calculator.
 - LoanFormComponent: This component will handle the input fields for the loan amount, purpose, repayment period, and term.
 - LoanResultsComponent: This component will display the calculated loan repayments and other relevant information.

## Let's think about the input fields needed
 - Loan amount: This should be an `input[type="text"]` with appropriate validation to ensure only digits are entered. Implement min and max values to restrict the input to the desired range (1000 - 20,000,000).
 - Loan purpose: Use a `select` element to display options fetched from the API `http://localhost:5000/loan-purposes`. Store the selected loan purpose and its associated annualRate for calculations.
 - Repayment periods: Use a `select` element to display options fetched from the API `http://localhost:5000/requested-repayment-periods`.
 - Loan Term: Use a `select` element to display options fetched from the API `http://localhost:5000/requested-term-months`.

## Now the API integration
 - Use `axios` to make GET requests to the API endpoints and retrieve the necessary data.
 - Store the fetched data in reactive state within the LoanCalculatorComponent.

## The actual repayment calculation logic
 - Call the `PMT` function: Use the PMT function from `src/utils/PMT.js` to calculate the monthly repayment.
 - Provide the necessary parameters to the `PMT` function, such as the rate per period, the number of periods, the present value (loan amount), and the future value
 - Store the calculated monthly repayment in a reactive state variable.

 ![Flow diagram](https://viewer.diagrams.net/?tags=%7B%7D&lightbox=1&highlight=0000ff&edit=_blank&layers=1&nav=1&title=valiant-coding-challenge.drawio#R%3Cmxfile%3E%3Cdiagram%20name%3D%22Page-1%22%20id%3D%22XmQmQBPZgQbojRUKCBH5%22%3E3VdNU9swEP01GU7p%2BAMn4VicUDpDDy2HwlFYG1tUljySnNj8%2Bq5iObZxwtAZIFMuifZJu5Le27zYkzDOq2%2BKFNkPSYFPAo9Wk3A5CQI%2F8EL8skjdILP5rAFSxahb1AG37Akc6Dm0ZBT0YKGRkhtWDMFECgGJGWBEKbkdLltLPty1ICmMgNuE8DH6m1GTNegi8jr8GliatTv7npvJSbvYATojVG57ULiahLGS0jSjvIqBW%2FJaXpq8qyOz%2B4MpEOY1CSsmbpbr%2BD6uq7j4%2Bf3x2tsE03N3NlO3FwaK93ehVCaTqRSErzr0UslSULBVPYy6NTdSFgj6CD6CMbUTk5RGIpSZnLtZqJi5c%2Bl2fG%2FHXyIXLave1LJuA2FUfdcttOF9f65L20VtXnM%2Fe6mjtDlIy1Il8AJXbfsRlYJ5YV2wFxd%2FFSBzwPNgngJODNsMz0Fce6b7dZ2COHAi%2FoOg0SkF9T%2BnoOEpBXV1N4SXbqcbSURMeFLi9lKN9B6quc2YgduC7IjYokcPlXPFQRmoXuZzfH%2BXEM6cwTmHX7hw29mlHwQNlvWssk17c8aCg4xdSZWPuHp%2Fdvb2Xz%2BLB%2FR4H0hPeJCeX6BLbvQJGDpfzIcM%2BRcnZmg2YghyZrnxznT5gMMpR8amlBhyNiIMiTBDjghnqcBxgoSAQsDSxfAR46ubyBmljRGDZk%2FkYVfK%2FngLyYTZ3S66nERLWwu9Vzc2bEtro%2BQfiCVHHwiXQgpbZc04fwa9gUy%2BP2xkf74YyxQdkCl8L5nmI5mmGHKmDQi9e060HxnYv4uNveVh%2FWbc6kXZBoepHdoqifNX0PsaCgpS500dkqPJmjYXT99LP1KxIFr3qtnNG1LwVIWSxdmxaq%2FuLw5r87921%2FkiGppANGqufSN9iAcsRs2lIAH8t%2B8kbGXziKBWUaYLTuqxhX5WR4hmr3CEi7dxBAy7N6XdXO99M1z9BQ%3D%3D%3C%2Fdiagram%3E%3C%2Fmxfile%3E)

- When the user submits the form, update the LoanResultsComponent with the calculated loan repayments data
- Apply Tailwind CSS classes to style the components and input fields

- write unit tests using vitest
- write e2e tests using Cypress
