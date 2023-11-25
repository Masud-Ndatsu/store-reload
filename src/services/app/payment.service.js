import axios from "axios";
import { Transaction } from "../../models/transaction.model";
import genUniqueRef from "../../utils/gen-unique-ref";

class PaymentService {
     #api_url = process.env.FLW_BASE_URL;
     #secret_key = process.env.FLW_SECRET_KEY;

     initialize = async (data) => {
          const reference = `${data.order}${await genUniqueRef()}`;
          try {
               const payData = await axios.post(
                    this.#api_url + "/payments",
                    {
                         reference,
                         email: data.email,
                         amount: Number(data.amount),
                    },
                    {
                         headers: {
                              Authorization: `Bearer ${this.#secret_key}`,
                         },
                    }
               );

               let txn = await new Transaction({
                    reference,
                    order: data.order,
                    amount: Number(data.amount),
                    user: data.user,
               }).save();

               return {
                    status: true,
                    data: {
                         user: txn._doc.user,
                         email: data.email,
                         order: txn._doc.order,
                         reference: txn._doc.reference,
                         amount: txn._doc.amount,
                         status: txn._doc.status,
                         ...payData.data,
                    },
               };
          } catch (error) {
               throw error;
          }
     };

     #verify = async ({ reference }) => {
          try {
               const response = await axios.get(
                    `${this.#api_url}/
                         transactions/verify/${reference}`,
                    {
                         headers: {
                              Authorization: `Bearer ${this.#secret_key}`,
                         },
                    }
               );
               return response.data;
          } catch (error) {
               throw error;
          }
     };

     handlePaymentCallback = async (req) => {
          if (req.query.status === "successful") {
               const transaction = await Transaction.findOne({
                    reference: req.query.tx_ref,
               });
               const response = await this.#verify({
                    reference: req.query.tx_ref,
               });
               if (
                    response.data.status === "successful" &&
                    response.data.amount === transaction.amount &&
                    response.data.currency === "NGN"
               ) {
                    // Success! Confirm the customer's payment
               } else {
                    // Inform the customer their payment was unsuccessful
               }
          }
     };
}

export default new PaymentService();
