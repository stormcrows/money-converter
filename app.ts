import express from "express"
import { convert, ConvertInput } from "./currency-converter"
import exchangeRates from "./exchange-rates-usd"

const supportedCurrencies = Object.keys(exchangeRates)

const throwUnsupportedError = (field: string) => {
  throw new Error(
    `'${field}' should be one of supported currencies: ${supportedCurrencies.join(
      ","
    )}`
  )
}

const validateArgs = ({
  fromCurrency,
  toCurrency,
  resultCurrency,
}: ConvertInput) => {
  if (!fromCurrency || !supportedCurrencies.includes(fromCurrency)) {
    throwUnsupportedError("fromCurrency")
  }
  if (!toCurrency || !supportedCurrencies.includes(toCurrency)) {
    throwUnsupportedError("toCurrency")
  }
  if (fromCurrency === toCurrency) {
    throw new Error("'fromCurrency' and 'toCurrency' are the same")
  }
  if (resultCurrency && !supportedCurrencies.includes(resultCurrency)) {
    throwUnsupportedError("resultCurrency")
  }
}

const app = express()
  .use(express.json())
  .use("/convert", (req, res) => {
    try {
      const args: ConvertInput = { amount: 1, ...req.body }
      validateArgs(args)
      const result = convert(req.body)
      res.send({ result })
    } catch (err: any) {
      res.status(400).send(err.message)
    }
  })

export default app
