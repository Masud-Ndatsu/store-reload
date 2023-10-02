import axios from "axios";
import { Wallet } from "../../models/wallet.model";

class WalletService {
    static API_KEY = process.env.FLUTTERWAVE_API_KEY;
    static URL = process.env.FLUTTERWAVE_BASE_URL;

    static createWallet = async ({ email }) => {
        try {
            const data = {
                currency: "NGN",
                email,
            };
            const result = await axios.post(`${this.URL}/virtual-account-numbers`, data, {
                headers: {
                    Authorization: `Bearer ${this.API_KEY}`,
                    "Content-Type": "application/json",
                },
            });

            return result.data;
        } catch (error) {
            throw error;
        }
    };

    static getWalletDetails = async ({ order_ref }) => {
        try {
            const result = await axios.get(`${this.URL}/virtual-account-numbers/${order_ref}`, {
                headers: {
                    Authorization: `Bearer ${this.API_KEY}`,
                    "Content-Type": "application/json",
                },
            });

            return result.data;
        } catch (error) {
            throw error;
        }
    };
}
