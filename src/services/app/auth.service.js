import { AppError } from "../../errors/index.js";
import { ShopModel } from "../../models/shop.model.js";
import {
     createHash,
     genAuthCode,
     generateToken,
     verifyHash,
} from "../../utils/auth.utils.js";
import {
     createUserSchema,
     loginSchema,
     resetPasswordEmailSchema,
     resetPasswordOTPSchema,
     resetPasswordSchema,
} from "../../utils/validators/app/auth.validator.js";
import sendMail from "../email/nodemailer.js";

class AuthService {
     static async createUser(req) {
          try {
               const { shop_name, password } = req.body;
               const { error, value } = createUserSchema.validate(req.body);

               if (error) {
                    throw new AppError(error.message, 400);
               }

               const shopExits = await ShopModel.findOne({
                    shop_name,
               }).lean();

               if (shopExits) {
                    throw new AppError("shop name already exists", 400);
               }
               const hashpwd = await createHash(password);

               const shop = await ShopModel.create({
                    ...value,
                    password: hashpwd,
               });

               await new User({ shop: shop._id }).save();

               return;
          } catch (error) {
               throw error;
          }
     }

     static async loginUser(req) {
          try {
               const { shop_name, password } = req.body;

               const { error } = loginSchema.validate(req.body);

               if (error) {
                    throw new AppError(error.message, 400);
               }

               const [shopExits] = await ShopModel.aggregate([
                    {
                         $match: {
                              $expr: {
                                   $eq: ["$shop_name", shop_name],
                              },
                         },
                    },
               ]);
               if (!shopExits) {
                    throw new AppError("shop name not found", 404);
               }

               const isValid = await verifyHash(password, shopExits.password);

               if (!isValid) {
                    throw new AppError("Incorrect password", 400);
               }

               const token = await generateToken(
                    { id: shopExits._id },
                    process.env.APP_SIGNATURE
               );

               return {
                    data: {
                         user: shopExits,
                         token,
                    },
               };
          } catch (error) {
               throw error;
          }
     }

     static async resetPasswordEmail(req) {
          try {
               const { email } = req.body;

               const { error } = resetPasswordEmailSchema.validate(req.body);

               if (error) {
                    throw new AppError(error.message, 400);
               }

               const shop = await ShopModel.findOne({ email }).lean();

               if (!shop) {
                    throw new AppError("shop not  found", 404);
               }

               const code = genAuthCode();

               await sendMail({
                    email: email,
                    subject: "Reset Password",
                    message: `<p>Heh! User. This is your reset password code ${code}</p>`,
               });

               await ShopModel.findOneAndUpdate(
                    { _id: shop._id },
                    {
                         auth_code: code,
                    },
                    { new: true }
               );

               return;
          } catch (error) {
               throw error;
          }
     }
     static async resetPasswordOTP(req) {
          try {
               const { code } = req.body;

               const { error } = resetPasswordOTPSchema.validate(req.body);

               if (error) {
                    throw new AppError(error.message, 400);
               }

               const shop = await ShopModel.findOne({ code }).lean();

               if (!shop) {
                    throw new AppError("shop not  found", 404);
               }

               return { data: shop };
          } catch (error) {
               throw error;
          }
     }

     static async resetPassword(req) {
          try {
               const { error, value } = resetPasswordSchema.validate(req.body);

               const { shop_id, password } = value;

               if (error) {
                    throw new AppError(error.message, 400);
               }
               const shop = await ShopModel.findById(shop_id)
                    .select("_id")
                    .lean();

               if (!shop) {
                    throw new AppError("shop not found", 404);
               }
               const hashpwd = await createHash(password);

               await ShopModel.findOneAndUpdate(
                    { _id: shop._id },
                    {
                         password: hashpwd,
                    },
                    { new: true }
               );

               return;
          } catch (error) {
               throw error;
          }
     }
}

export default AuthService;
