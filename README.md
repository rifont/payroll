# Payroll

## Installation

```
git clone https://github.com/richardfontein/payroll.git
cd payroll
yarn
```

## Build

```
yarn build
```

## Running the App

```
yarn demo
```

then navigate to [localhost:8080](http://localhost:8080)

## Testing (with Jest)

```
yarn test
```

For server code coverage:

```
cd server && yarn coverage
```

## Assumptions

- The payslip is generated for the current month
- The payslip is paid on the last day of the month

## Technology Stack

### Frontend

- React
  - easy to boilerplate with Create-React-App (great for SPA)
  - many libraries available
- Bootstrap
  - Simple, sharp-looking UI
- Formik
  - Great library for forms and front end validation

### Backend

- Node-Express
  - Simple framework for HTTP server
  - Allows for highly modular design
  - High potential for scalability
