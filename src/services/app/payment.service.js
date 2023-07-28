import { initializeCreditCardPayment } from "../../utils/payment.utils";

class PaymentService {
  static creditCardPaymentMethod = async (req, res) => {
    const { amount, email } = req.body;
    const transaction = await initializeCreditCardPayment({
      amount: "1000",
      email: "masudndatsu@gmail.com",
    });
    return { data: transaction.data };
  };
  static walletPaymentMethod = async (req, res) => {
    const { amount, email } = req.body;
    
    // const transaction = await initializeWalletPayment({
    //   amount: "1000",
    //   email: "masudndatsu@gmail.com",
    // });
    // return { data: transaction.data };
  };

  static handlePaystackWebhookEvent = async (req) => {
    const { event } = req.body;
    if (event === "charge.successful") {
    }
  };
}

export default PaymentService;
