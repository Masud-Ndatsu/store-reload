import crypto from "crypto";
import { NotfoundError, ServiceError, ValidationError } from "../../errors";
import { createHash, generateToken, verifyHash } from "../../utils/auth.utils";
import {
  createUserSchema,
  forgotPasswordEmailSchema,
  loginUserSchema,
  newPasswordSchema,
} from "../../utils/validators/admin/auth.validator";

import sendMail from "../email/nodemailer";
import { User } from "../../models/user.model";

export default class AuthService {
  static createUser = async (req) => {
    try {
      const userReq = req.body;
      const { error, value } = createUserSchema.validate(userReq);
      if (error) {
        throw new ValidationError(error.message);
      }
      const existingUser = await User.findOne({ email: value.email }).lean();
      if (existingUser) {
        throw new ServiceError(`user already exists with email ${value.email}`);
      }
      const hashedPassword = await createHash(value.password);
      await User.create({
        ...value,
        role: "admin",
        password: hashedPassword,
      });
      return;
    } catch (error) {
      throw error;
    }
  };
  static loginUser = async (req) => {
    try {
      const userReq = req.body;
      const { error, value } = loginUserSchema.validate(userReq);

      if (error) {
        throw new ValidationError(error.message);
      }
      const { email, password } = value || userReq;

      const existingUser = await User.findOne({ email }).lean();

      if (!existingUser) {
        throw new NotfoundError("shop name not found");
      }

      const isValid = await verifyHash(password, existingUser.password);

      if (!isValid) {
        throw new ServiceError("Incorrect password");
      }

      const token = await generateToken({ id: existingUser._id });

      return {
        data: {
          user: existingUser,
          token,
        },
      };
    } catch (error) {
      throw error;
    }
  };
  static async forgotPassword(req) {
    try {
      const { error, value } = forgotPasswordEmailSchema.validate(req.body);

      if (error) {
        throw new ValidationError(error.message);
      }
      const { email } = value;

      const user = await User.findOne({ email }).lean();

      if (!user) {
        throw new NotfoundError("user not  found");
      }
      const { ADMIN_CLIENT_URL } = process.env;

      let resetToken = crypto.randomBytes(32).toString("hex");

      await User.findByIdAndUpdate(user._id, { resetToken });

      const url = `${ADMIN_CLIENT_URL}/auth/change-password?token=${resetToken}&id=${user._id}`;

      await sendMail({
        email: user.email,
        subject: "Change Password",
        message: `<p>Heh! User. This is your user to change password ${url}</p>`,
      });
      return;
    } catch (error) {
      throw error;
    }
  }
  static async changePassword(req, res) {
    try {
      const { token, userId } = req.body;
      const { error, value } = newPasswordSchema.validate(req.body);

      if (error) {
        throw new ValidationError(error.message);
      }
      const { password } = value;

      const user = await User.findById(userId).lean();
      if (!user || user.resetToken !== token) {
        throw new NotfoundError("user not  found");
      }
      const hashedPassword = await createHash(password);
      await User.findByIdAndUpdate(userId, { password: hashedPassword });
      return;
    } catch (error) {
      throw error;
    }
  }
}
