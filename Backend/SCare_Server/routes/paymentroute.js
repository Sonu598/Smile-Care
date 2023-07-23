const express = require('express');
const Razorpay = require('razorpay');
const bodyParser = require('body-parser');

const payRouter = express.Router();
payRouter.use(bodyParser.json());

// Replace with your actual Razorpay API key and secret key
const razorpay = new Razorpay({
  key_id: 'your_api_key',
  key_secret: 'your_secret_key',
});


payRouter.post('/pay', async (req, res) => {
  const { amount, currency, receipt, payment_capture } = req.body;

  try {
    const options = {
      amount: amount, // Amount in paise (100 paise = 1 rupee)
      currency: currency,
      receipt: receipt,
      payment_capture: payment_capture,
    };

    const response = await razorpay.orders.create(options);
    res.json(response);
  } catch (error) {
    res.status(500).json({ error: 'Something went wrong!' });
  }
});

module.exports ={
    payRouter
}