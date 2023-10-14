import axios from "axios";
import { Wallet } from "../../models/wallet.model";
import { AppError } from "../../errors";
import { User } from "../../models/user.model";

class WalletService {
     #api_key = process.env.FLW_SECRET_KEY;
     #url = process.env.FLW_BASE_URL;

     createWallet = async ({ email }) => {
          try {
               const data = {
                    currency: "NGN",
                    email,
                    amount: 10000,
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
               console.log("error: ", error.message);
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
                         },
                    }
               );

               return response.data;
          } catch (error) {
               throw error;
          }
     };

     getWallet = async ({ user_id }) => {
          try {
               const user = await User.findOne({ shop: user_id }).lean();
               const wallet = await Wallet.findOne({ user: user._id }).lean();
               if (!wallet) {
                    throw new AppError("Wallet not found", 404);
               }
               const { reference } = wallet;

               const response = await this.#getWallet({ reference });

               return { data: response.data };
          } catch (error) {
               throw error;
          }
     };
}

export default new WalletService();
