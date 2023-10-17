import { AppError } from "../../errors/index.js";
import {
     updateUserSchema,
     verifyUserEmailSchema,
} from "../../utils/validators/app/user.validator.js";
import { sendMail } from "../email/nodemailer";
import { genAuthCode } from "../../utils/auth.utils.js";
import { User } from "../../models/user.model.js";
import { ShopModel } from "../../models/shop.model.js";
import { Wallet } from "../../models/wallet.model.js";
import walletService from "./wallet.service.js";
import { SupportModel } from "../../models/support.model.js";

class UserService {
     static async getUserProfile(userId) {
          try {
               const [user] = await User.aggregate([
                    {
                         $match: {
                              $expr: {
                                   $eq: [{ $toString: "$shop" }, userId],
                              },
                         },
                    },
                    {
                         $lookup: {
                              from: "shops",
                              localField: "shop",
                              foreignField: "_id",
                              as: "shop",
                         },
                    },
                    {
                         $project: {
                              "shop.password": 0,
                              "shop.updatedAt": 0,
                              "shop.createdAt": 0,
                              updatedAt: 0,
                              createdAt: 0,
                         },
                    },
               ]);

               if (!user) {
                    throw new AppError("user not found", 404);
               }
               const shop = user.shop[0];

               return {
                    data: {
                         ...user,
                         shop,
                    },
               };
          } catch (error) {
               throw error;
          }
     }

     static async getUser(req) {
          try {
               const user_id = req.params.user_id;
               const user = await User.findById(user_id).lean();
               if (!user) {
                    throw new AppError("user not found", 404);
               }
               return { data: user };
          } catch (error) {
               throw error;
          }
     }

     static async accountSetup(shop_id, data = {}) {
          const { error, value } = updateUserSchema.validate(data);
          if (error) {
               throw new AppError(error.message);
          }

          const { email } = value;

          let authCode = genAuthCode();

          await Promise.all([
               ShopModel.updateOne(
                    { _id: shop_id },
                    { authCode },
                    { new: true }
               ),
               sendMail({
                    email,
                    subject: "Verify User Credentials",
                    message: `<p>Heh! User. This is your OTP to very user credentials ${authCode}</p>`,
               }),
          ]);

          const [userExits, shop] = await Promise.all([
               User.findOneAndUpdate(
                    { shop: shop_id },
                    {
                         ...value,
                    },
                    { new: true }
               ).lean(),
               ShopModel.findById(shop_id).lean(),
          ]);

          const response = await walletService.createWallet({
               email,
               account_name: shop.shop_name,
               mobilenumber: userExits.phone_number,
               country: "NG",
          });

          const { account_reference, amount, nuban, bank_name } = response.data;

          console.log("response: ", response.data);

          await Wallet.create({
               balance: amount,
               wlt_reference: account_reference,
               shop: shop._id,
               account_number: nuban,
               bank_name,
          });

          return;
     }

     static async updateUser(shop_id, data = {}) {
          const { error, value } = updateUserSchema.validate(data);
          if (error) {
               throw new AppError(error.message);
          }
          const user = await User.findOne({ shop: shop_id }).lean();

          if (data.email && user.verified) {
               await User.findOneAndUpdate(
                    { _id: user._id },
                    {
                         verified: false,
                    },
                    {
                         new: true,
                    }
               );
          }

          let auth_code;

          if (value.email && !user.verified) {
               auth_code = genAuthCode();
               await Promise.all([
                    ShopModel.updateOne(
                         {
                              _id: shop_id,
                         },
                         {
                              auth_code,
                         },
                         {
                              new: true,
                         }
                    ),
                    sendMail({
                         email: value.email,
                         subject: "Verify User Credentials",
                         message: `<p>Heh! User. This is your OTP to very user credentials ${auth_code}</p>`,
                    }),
               ]);
          }

          const updatedUser = await User.findByIdAndUpdate(
               user._id,
               {
                    ...value,
               },
               {
                    new: true,
               }
          );

          return updatedUser;
     }
     static async verifyUser(body) {
          const { error, value } = verifyUserEmailSchema.validate(body);

          if (error) {
               throw new AppError(error.message, 400);
          }

          const { code } = value;

          const shop = await ShopModel.findOne({ auth_code: code })
               .select("_id")
               .lean();

          if (!shop) {
               throw new AppError("shop not found", 404);
          }

          await User.findOneAndUpdate(
               {
                    shop: shop._id,
               },
               {
                    verified: true,
               },
               {
                    new: true,
               }
          );

          return;
     }

     static async userSupportMessage(body) {
          const { message, shop_id } = body;

          const shop = await ShopModel.findById(shop_id).select("_id").lean();

          const user = await User.findOne({ shop: shop._id })
               .select("_id")
               .lean();

          await new SupportModel({
               user: user._id,
               message,
          }).save();

          return;
     }
}

export default UserService;
