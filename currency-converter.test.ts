import { convert } from "./currency-converter"
import exchangeRates from "./exchange-rates-usd"

describe("currency converter", () => {
  it("should return exchange rate from EUR to USD", () => {
    const exchangeRate = convert({
      amount: 1,
      fromCurrency: "EUR",
      toCurrency: "USD",
    })
    const expected = 1 / exchangeRates.EUR

    expect(exchangeRate).toBe(expected)
  })

  it("should convert USD to GBP", () => {
    const amount = 1.05
    const converted = convert({
      amount,
      fromCurrency: "USD",
      toCurrency: "GBP",
    })
    const expected = amount * exchangeRates.GBP

    expect(converted).toBe(expected)
  })

  it("should convert EUR to GBP", () => {
    const amount = 1.05
    const converted = convert({
      amount,
      fromCurrency: "EUR",
      toCurrency: "GBP",
    })
    const expected = (amount / exchangeRates.EUR) * exchangeRates.GBP

    expect(converted).toBe(expected)
  })

  it("should add 13.12 EUR to 99 GBP and return 185.64 CAD", () => {
    const fromCurrency = "EUR"
    const amount = 13.12
    const toCurrency = "GBP"
    const toAmount = 99
    const resultCurrency = "CAD"
    const converted = convert({
      fromCurrency,
      amount,
      toCurrency,
      toAmount,
      resultCurrency,
    })
    const expectedAmount = 185.64

    expect(converted).toBe(expectedAmount)
  })
})
