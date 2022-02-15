# Money Converter

Author: `Rafal Tytyk`

Version number: `5b8d0fd276b6d288905ed2f63a934e057e8feca2`


## Installation

1. Install Node.js: https://nodejs.org/en/
2. Run `git clone https://github.com/stormcrows/money-converter`
3. In the project folder run `npm install` from the command line to install project's dependencies


## Testing

1. Run `npm test` to run unit and API tests
2. Run `npm run test:coverage` to run tests with coverage results


## Running

1. Run `npm start` to initialize the server, by default at port `3000`
2. Run `bash ./curl.test.sh` to execute shell curl that will send `application/json` POST request to the endpoint to receive `USD` to `GBP` conversion.

The result should be:
```
requesting conversion from USD to GBP
{"result":0.78569}
```

## API

`/convert` endpoint can be accessed locally via `http://localhost:3000/convert`. It accepts JSON body.

1. You can request exchange rate by providing only:

```json
{
  fromCurrency: "USD",
  toCurrency: "GBP"
}
```

2. Full list of attributes:


```json
{
  amount: 13.12,
  fromCurrency: "EUR",
  toCurrency: "GBP",
  toAmount: 99,
  resultCurrency: "CAD",
}
```

responds with:

```json
{
  result: 185.64
}
```


More examples can be found in `app.test.ts`