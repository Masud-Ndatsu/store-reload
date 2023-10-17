import axios from "axios";
import { Wallet } from "../../models/wallet.model";
import { AppError } from "../../errors";
import { User } from "../../models/user.model";
import genUniqueRef from "../../utils/gen-unique-ref";

class WalletService {
     #api_key = process.env.FLW_SECRET_KEY;
     #url = process.env.FLW_BASE_URL;
     // #callback_url = process.env.CALLBACK_URL;
     #account_number = process.env.ACCOUNT_NUMBER;
     #bank_code = process.env.BANK_CODE;

     createWallet = async (data) => {
          console.log("data ", data);

          try {
               const response = await axios.post(
                    `${this.#url}/payout-subaccounts`,
                    data,
                    {
                         headers: {
                              Authorization: `Bearer ${this.#api_key}`,
                         },
                    }
               );

               return response.data;
          } catch (error) {
               console.log({
                    message: error.message,
                    error: error.response,
               });
               throw error.response.data;
          }
     };

     #getWallet = async ({ wlt_reference }) => {
          try {
               const response = await axios.get(
                    `${this.#url}/payout-subaccounts/${wlt_reference}`,
                    {
                         headers: {
                              Authorization: `Bearer ${this.#api_key}`,
                         },
                    }
               );

               return response.data;
          } catch (error) {
               throw error.response.data;
          }
     };

     getWallet = async ({ shop_id }) => {
          try {
               const wallet = await Wallet.findOne({ shop: shop_id })
                    .select("wlt_reference")
                    .lean();
               if (!wallet) {
                    throw new AppError("Wallet not found", 404);
               }
               const { wlt_reference } = wallet;

               const response = await this.#getWallet({ wlt_reference });

               return { data: response.data };
          } catch (error) {
               throw error;
          }
     };
     getWalletBalance = async ({ wlt_reference }) => {
          try {
               const response = await axios.get(
                    `${
                         this.#url
                    }/payout-subaccounts/${wlt_reference}/balances?currency=NGN`,
                    {
                         headers: {
                              Authorization: `Bearer ${this.#api_key}`,
                         },
                    }
               );
               return { data: response.data.data };
          } catch (error) {
               throw error.response.data;
          }
     };
     debitWallet = async (data) => {
          const reference = `${data.shop}${await genUniqueRef()}`;
          let body = {
               account_bank: this.#bank_code,
               account_number: this.#account_number,
               amount: data.amount,
               currency: "NGN",
               reference,
               narration: "Paying for goods",
               debit_subaccount: data.wlt_reference,
          };

          try {
               const response = await axios.post(
                    `${this.#url}/transfers`,
                    { ...body },
                    {
                         headers: {
                              Authorization: `Bearer ${this.#api_key}`,
                         },
                    }
               );
               return { data: response.data };
          } catch (error) {
               console.log({
                    message: error.message,
                    error: error.response.data,
               });
               throw error.response.data;
          }
     };

     withdrawWallet = async (data) => {
          try {
               const { shop_id, amount } = data;

               const wlt = await Wallet.findOne({ shop: shop_id })
                    .select("wlt_reference")
                    .lean();

               let wlt_balance = await this.getWalletBalance({
                    wlt_reference: wlt.wlt_reference,
               });

               const balance = wlt_balance.data.available_balance;

               if (balance !== 0 && balance < Number(amount)) {
                    throw new AppError(`Insufficient balance: ${balance}`, 400);
               }

               const response = await this.debitWallet({
                    shop: shop_id,
                    amount,
                    wlt_reference: wlt.wlt_reference,
               });

               return { data: response.data };
          } catch (error) {
               throw error;
          }
     };
}

export default new WalletService();
