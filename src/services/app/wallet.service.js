import axios from "axios";
import { Wallet } from "../../models/wallet.model";
import { AppError } from "../../errors";

class WalletService {
     #api_key = process.env.FLUTTERWAVE_API_KEY;
     #url = process.env.FLUTTERWAVE_BASE_URL;

     createWallet = async ({ email }) => {
          try {
               const data = {
                    currency: "NGN",
                    email,
               };
               const response = await axios.post(
                    `${this.#url}/virtual-account-numbers`,
                    data,
                    {
                         headers: {
                              Authorization: `Bearer ${this.#api_key}`,
                              "Content-Type": "application/json",
                         },
                    }
               );

               return response.data;
          } catch (error) {
               throw error;
          }
     };

     #getWallet = async ({ reference }) => {
          try {
               const response = await axios.get(
                    `${this.#url}/virtual-account-numbers/${reference}`,
                    {
                         headers: {
                              Authorization: `Bearer ${this.#api_key}`,
                              "Content-Type": "application/json",
                         },
                    }
               );

               return response.data;
          } catch (error) {
               throw error;
          }
     };

     getWallet = async ({ user }) => {
          try {
               const wallet = await Wallet.findOne({ user }).lean();

               if (!wallet) {
                    throw AppError("Wallet not found", 404);
               }
               const { reference } = wallet;

               const data = await this.#getWallet({ reference });

               return { data };
          } catch (error) {
               throw error;
          }
     };
}

export default new WalletService();
