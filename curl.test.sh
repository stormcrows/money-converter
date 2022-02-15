#!/bin/bash

echo "requesting conversion from USD to GBP"
curl -X POST 'http://localhost:3000/convert' -H "Content-Type: application/json" -d '{"fromCurrency": "USD", "toCurrency": "GBP"}'
echo 
