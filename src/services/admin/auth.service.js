import crypto from "crypto";
import { AppError } from "../../errors";
import { createHash, generateToken, verifyHash } from "../../utils/auth.utils";
import {
     createUserSchema,
     forgotPasswordEmailSchema,
     loginUserSchema,
     newPasswordSchema,
} from "../../utils/validators/admin/auth.validator";

import { sendMail } from "../email/nodemailer";
import { User } from "../../models/user.model";

export default class AuthService {
     static createUser = async (req) => {
          try {
               const { email, password } = req.body;

               const { error, value } = createUserSchema.validate(req.body);
               if (error) {
                    throw new AppError(error.message, 400);
               }

               const [userExits] = await User.aggregate([
                    {
                         $match: {
                              $expr: { $eq: ["$email", email] },
                         },
                    },
               ]);

               if (userExits && userExits.user_type === "admin") {
                    throw new AppError(
                         `user already exists with email ${email}`,
                         400
                    );
               }

               const hashpwd = await createHash(password);

               const newAdmin = await User.create({
                    ...value,
                    password: hashpwd,
                    user_type: "admin",
               });

               return newAdmin;
          } catch (error) {
               throw error;
          }
     };
     static loginUser = async (req) => {
          try {
               const { email, password } = req.body;
               const { error } = loginUserSchema.validate(req.body);

               if (error) {
                    throw new AppError(error.message, 400);
               }

               const [userExits] = await User.aggregate([
                    {
                         $match: {
                              $expr: { $eq: [{ $toString: "$email" }, email] },
                         },
                    },
               ]);

               if (!userExits) {
                    throw new AppError("email not found", 404);
               }

               const isValid = await verifyHash(password, userExits.password);

               if (!isValid) {
                    throw new AppError("Incorrect password", 400);
               }

               const token = await generateToken(
                    { id: userExits._id },
                    process.env.ADMIN_SIGNATURE
               );
               return { data: { token } };
          } catch (error) {
               throw error;
          }
     };
     static async forgotPassword(req) {
          try {
               const { email } = req.body;
               const { error } = forgotPasswordEmailSchema.validate(req.body);

               if (error) {
                    throw new AppError(error.message, 400);
               }

               const [user] = await User.aggregate([
                    {
                         $match: {
                              $expr: { $eq: [{ $toString: "$email" }, email] },
                         },
                    },
               ]);

               if (!user) {
                    throw new AppError("user not  found", 404);
               }
               const { ADMIN_CLIENT_URL } = process.env;

               let resetToken = crypto.randomBytes(32).toString("hex");

               const updateUser = await User.updateOne(
                    { _id: user._id },
                    {
                         reset_token: resetToken,
                    },
                    { new: true }
               );

               const url = `${ADMIN_CLIENT_URL}/auth/change-password?token=${resetToken}&id=${user._id}`;

               await sendMail({
                    email: user.email,
                    subject: "Change Password",
                    message: `<p>Heh! User. This is your user to change password ${url}</p>`,
               });
               return updateUser;
          } catch (error) {
               throw error;
          }
     }
     static async changePassword(req) {
          try {
               const { token, user_id, password } = req.body;
               const { error } = newPasswordSchema.validate(req.body);

               if (error) {
                    throw new AppError(error.message, 400);
               }

               const [user] = await User.aggregate([
                    {
                         $match: {
                              $expr: { $eq: [{ $toString: "$_id" }, user_id] },
                         },
                    },
               ]);
               if (!user || user.reset_token !== token) {
                    throw new AppError("user not  found", 404);
               }
               const hashpwd = await createHash(password);
               await User.updateOne(
                    { _id: user_id },
                    { password: hashpwd },
                    { new: true }
               );
               return;
          } catch (error) {
               throw error;
          }
     }
}
