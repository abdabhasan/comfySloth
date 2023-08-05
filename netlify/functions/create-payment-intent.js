// require("dotenv").config();

// const stripe = require("stripe")(process.env.VITE_AUTH_STRIPE_SECRET_KEY);

// exports.handler = async function (event, context) {
//   if (event.body) {
//     const { cart, shipping_fee, total_amount } = JSON.parse(event.body);

//     const calculateOrderAmount = () => total_amount + shipping_fee;

//     try {
//       const paymentIntent = await stripe.paymentIntents.create({
//         amount: calculateOrderAmount(),
//         currency: "usd",
//       });

//       return {
//         statusCode: 200,
//         body: JSON.stringify({ clientSecret: paymentIntent.client_secret }),
//       };
//     } catch (error) {}

//     console.log(cart);
//     return {
//       statusCode: 200,
//       body: JSON.stringify(cart),
//     };
//   }
//   return {
//     statusCode: 200,
//     body: "Create Payment Intent",
//   };
// };

require("dotenv").config();

const stripe = require("stripe")(process.env.VITE_AUTH_STRIPE_SECRET_KEY);

const calculateOrderAmount = (total_amount, shipping_fee) => {
  return total_amount + shipping_fee;
};

exports.handler = async function (event, context) {
  if (event.body) {
    const { cart, shipping_fee, total_amount } = JSON.parse(event.body);

    try {
      const paymentIntent = await stripe.paymentIntents.create({
        amount: calculateOrderAmount(total_amount, shipping_fee),
        currency: "usd",
      });
      return {
        statusCode: 200,
        body: JSON.stringify({ clientSecret: paymentIntent.client_secret }),
      };
    } catch (error) {
      console.error(error); // Log the error for debugging
      return {
        statusCode: 500,
        body: JSON.stringify({
          msg: error.message,
        }),
      };
    }
  }

  return {
    statusCode: 400,
    body: JSON.stringify({ error: "Invalid request body." }),
  };
};
