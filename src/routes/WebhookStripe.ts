import express from "express";

import Stripe from 'stripe'

const SK_STRIPE = 'sk_test_51O9XsOCGiLxZIW1g1ld6uTA6zc4SEXkie4dz2JMbbZtIU4yF4D4IOzNBJhdXbHb4UmYyIWiWfhNKCwmvjsvzoQ00005EzLrGwG'

export const stripe = new Stripe(SK_STRIPE!, {
  apiVersion: '2023-10-16'
})

const WebhookStripe = express.Router()

WebhookStripe.post('/',  express.raw({type: 'application/json'}), (request, response) => {
  const sig = request.headers['stripe-signature'];

  let event;

  try {
    event = stripe.webhooks.constructEvent(request.body, sig, endpointSecret);
  } catch (err) {
    response.status(400).send(`Webhook Error: ${err.message}`);
    return;
  }

  // Handle the event
  console.log(`Unhandled event type ${event.type}`);

  // Return a 200 response to acknowledge receipt of the event
  response.send();
});

export { WebhookStripe };
