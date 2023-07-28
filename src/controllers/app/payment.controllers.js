import PaymentService from "../../services/app/payment.service";

const makeCreditCardPayment = async (req, res, next) => {
  try {
    const { data } = await PaymentService.creditCardPaymentMethod(req, res);
    return res.redirect(data.authorization_url);
  } catch (error) {
    next(error);
  }
};
const makeWalletPayment = async (req, res, next) => {};

const paystackWebhookHandler = async (req, res, next) => {
  try {
    await PaymentService.handlePaystackWebhookEvent(req);
    return res.status(200).json({
      status: true,
      data: null,
      message: "Request successful",
    });
  } catch (error) {
    next(error);
  }
};

export default {
  makeCreditCardPayment,
  makeWalletPayment,
  paystackWebhookHandler,
};
