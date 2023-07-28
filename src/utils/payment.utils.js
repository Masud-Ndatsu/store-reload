import axios from "axios";

const initializeCreditCardPayment = async (data) => {
  try {
    const response = await axios.post(
      "https://api.paystack.co/transaction/initialize",
      {
        ...data,
      },
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${process.env.PAYSTACK_SECRET_KEY}`,
        },
      }
    );
    return response.data;
  } catch (error) {
    console.log(error);
  }
};
const verifyPayment = async (ref) => {
  try {
    const response = await axios.get(
      "https://api.paystack.co/transaction/verify/" + encodeURIComponent(ref),

      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${process.env.PAYSTACK_SECRET_KEY}`,
          "cache-control": "no-cache",
        },
      }
    );
    return response.data;
  } catch (error) {
    console.log(error);
  }
};

export { initializeCreditCardPayment, verifyPayment };
