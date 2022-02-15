import exchangeRates from "./exchange-rates-usd"

type Currency = keyof typeof exchangeRates

type SwapInput = {
  amount: number
  fromCurrency: Currency
  toCurrency: Currency
}

type ConvertInput = SwapInput & {
  toAmount?: number
  resultCurrency?: Currency
}

const swap = ({ amount, fromCurrency, toCurrency }: SwapInput) => {
  if (fromCurrency === "USD") {
    return amount * exchangeRates[toCurrency]
  }

  if (toCurrency === "USD") {
    return amount / exchangeRates[fromCurrency]
  }

  return (amount / exchangeRates[fromCurrency]) * exchangeRates[toCurrency]
}

const round = (x: number) => Math.round(x * 100) / 100

const convert = ({
  amount = 1,
  fromCurrency,
  toCurrency,
  toAmount = 0,
  resultCurrency,
}: ConvertInput) => {
  const swappedValue = swap({ amount, fromCurrency, toCurrency })
  const valueWithAddedAmount = swappedValue + toAmount
  if (resultCurrency) {
    const result = round(
      swap({
        amount: valueWithAddedAmount,
        fromCurrency: toCurrency,
        toCurrency: resultCurrency,
      })
    )
    return result
  }

  return valueWithAddedAmount
}

export { convert, ConvertInput, Currency }
