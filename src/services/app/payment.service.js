import axios from "axios";

class PaymentService {
    static api_url = "https://api.paystack.co";
    static secret_key = process.env.PAYSTACK_SECRET_KEY;

    static initializeCreditCardPayment = async (data) => {
        try {
            const response = await axios.post(this.api_url + "/transaction/initialize", data, {
                headers: {
                    Authorization: `Bearer ${this.secret_key}`,
                },
            });
            return response.data;
        } catch (error) {
            throw error;
        }
    };

    static verifyPayment = async (ref) => {
        try {
            const response = await axios.get(this.api_url + "transaction/verify/" + encodeURIComponent(ref), {
                headers: {
                    Authorization: `Bearer ${this.secret_key}`,
                    "cache-control": "no-cache",
                },
            });
            return response.data;
        } catch (error) {
            throw error;
        }
    };

    static creditCardPaymentMethod = async (req, res) => {
        const { amount, email } = req.body;
        const transaction = await this.initializeCreditCardPayment({
            amount,
            email,
        });
        return { data: transaction.data };
    };

    static handlePaystackWebhookEvent = async (req) => {
        const { event } = req.body;
        if (event === "charge.successful") {
        }
    };
}

export default PaymentService;
