import axios from "axios";

class PaymentService {
     static api_url = "https://api.paystack.co";
     static secret_key = process.env.PAYSTACK_SECRET_KEY;

     static initialize = async (data) => {
          try {
               const response = await axios.post(
                    this.api_url + "/transactions/initialize",
                    data,
                    {
                         headers: {
                              Authorization: `Bearer ${this.secret_key}`,
                         },
                    }
               );
               return response.data;
          } catch (error) {
               throw error;
          }
     };

     static verify = async ({ reference }) => {
          try {
               const response = await axios.get(
                    this.api_url +
                         "transactions/verify/" +
                         encodeURIComponent(reference),
                    {
                         headers: {
                              Authorization: `Bearer ${this.secret_key}`,
                              "cache-control": "no-cache",
                         },
                    }
               );
               return response.data;
          } catch (error) {
               throw error;
          }
     };

     static handlePaystackWebhook = async (req) => {
          const { event } = req.body;
          if (event === "charge.successful") {
          }
     };
}

export default PaymentService;
