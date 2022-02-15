import request from "supertest"
import app from "./app"
import exchangeRates from "./exchange-rates-usd"

describe("/convert endpoint", () => {
  it("should respond with exchange rate from euro to dollars", async () => {
    const data = { fromCurrency: "EUR", toCurrency: "USD" }
    const response = await request(app).get("/convert").send(data)
    const expected = 1 / exchangeRates.EUR

    expect(response.body).toEqual({ result: expected })
  })

  it("should respond with conversion of USD to GBP", async () => {
    const data = { fromCurrency: "USD", toCurrency: "GBP", amount: 10 }
    const response = await request(app).get("/convert").send(data)
    const expected = exchangeRates.GBP * data.amount

    expect(response.body).toEqual({ result: expected })
  })

  it("should respond with conversion of EUR to GBP", async () => {
    const data = { fromCurrency: "EUR", toCurrency: "GBP", amount: 10 }
    const response = await request(app).post("/convert").send(data)
    const expected = (data.amount / exchangeRates.EUR) * exchangeRates.GBP

    expect(response.body).toEqual({ result: expected })
  })

  it("should respond with result of adding 13.12 EUR to 99 GBP and return 185.64 CAD", async () => {
    const data = {
      amount: 13.12,
      fromCurrency: "EUR",
      toCurrency: "GBP",
      toAmount: 99,
      resultCurrency: "CAD",
    }
    const response = await request(app).post("/convert").send(data)

    expect(response.body).toEqual({ result: 185.64 })
  })

  it("should respond with error on missing 'fromCurrency' field", async () => {
    const data = { toCurrency: "EUR" }
    const response = await request(app).post("/convert").send(data)

    expect(response.statusCode).toBe(400)
    expect(response.text).toEqual(
      "'fromCurrency' should be one of supported currencies: USD,EUR,GBP,CAD,INR,MXN,AUD,CNY,MYR,COP"
    )
  })

  it("should respond with error on missing 'toCurrency' field", async () => {
    const data = { fromCurrency: "EUR" }
    const response = await request(app).post("/convert").send(data)

    expect(response.statusCode).toBe(400)
    expect(response.text).toEqual(
      "'toCurrency' should be one of supported currencies: USD,EUR,GBP,CAD,INR,MXN,AUD,CNY,MYR,COP"
    )
  })

  it("should throw when 'fromCurrency' and 'toCurrency' are the same", async () => {
    const data = { fromCurrency: "EUR", toCurrency: "EUR" }
    const response = await request(app).post("/convert").send(data)

    expect(response.statusCode).toBe(400)
    expect(response.text).toEqual("'fromCurrency' and 'toCurrency' are the same")
  })

  it("should throw when 'fromCurrency' field contains unsupported currency", async () => {
    const data = { fromCurrency: "BAD", toCurrency: "EUR" }
    const response = await request(app).post("/convert").send(data)

    expect(response.statusCode).toBe(400)
    expect(response.text).toEqual(
      "'fromCurrency' should be one of supported currencies: USD,EUR,GBP,CAD,INR,MXN,AUD,CNY,MYR,COP"
    )
  })

  it("should throw when 'toCurrency' contains unsupported currency", async () => {
    const data = { fromCurrency: "EUR", toCurrency: "BAD" }
    const response = await request(app).post("/convert").send(data)

    expect(response.statusCode).toBe(400)
    expect(response.text).toEqual( "'toCurrency' should be one of supported currencies: USD,EUR,GBP,CAD,INR,MXN,AUD,CNY,MYR,COP"
    )
  })

  it("should throw when 'resultCurrency' contains unsupported currency", async () => {
    const data = { fromCurrency: "EUR", toCurrency: "GBP", resultCurrency: "BAD" }
    const response = await request(app).post("/convert").send(data)

    expect(response.statusCode).toBe(400)
    expect(response.text).toEqual("'resultCurrency' should be one of supported currencies: USD,EUR,GBP,CAD,INR,MXN,AUD,CNY,MYR,COP"
    )
  })
})
