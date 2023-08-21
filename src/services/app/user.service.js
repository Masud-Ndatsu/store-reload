import {
  NotfoundError,
  ServiceError,
  ValidationError,
} from "../../errors/index.js";
import {
  updateUserSchema,
  verifyUserEmailSchema,
} from "../../utils/validators/app/user.validator.js";
import { generateAndSendUserOTP } from "../../utils/auth.utils.js";
import { User } from "../../models/user.model.js";

class UserService {
  static async getUserProfile(userId) {
    try {
      const user = await User.findById(userId).select("-password").lean();

      if (!user) {
        throw new NotfoundError("user not found");
      }
      return {
        data: user,
      };
    } catch (error) {
      throw error;
    }
  }

  static async getUser(req) {
    try {
      const userId = req.query.userId;
      const user = await User.findById(userId).lean();
      if (!user) {
        throw new NotfoundError("user not found");
      }
      return { data: user };
    } catch (error) {
      throw error;
    }
  }

  static async updateUserDetails(userId, updateReq) {
    try {
      let emailVerificationCode;
      const { error, value } = updateUserSchema.validate(updateReq);
      if (error) {
        throw new ValidationError(error.message);
      }
      const user = await User.findById(userId);

      if (!user) throw new NotfoundError("user not found");

      if (value.email && user.isEmailVerified) {
        await User.findByIdAndUpdate(user._id, { isEmailVerified: false });
      }

      if (value.email && !user.isEmailVerified) {
        emailVerificationCode = await generateAndSendUserOTP(value.email);
      }

      await User.findByIdAndUpdate(userId, { ...value, emailVerificationCode });
      return;
    } catch (error) {
      throw error;
    }
  }
  static async verifyUserEmail(userReq) {
    try {
      const { error, value } = verifyUserEmailSchema.validate(userReq);

      if (error) {
        throw new ValidationError(error.message);
      }

      const { code } = value;
      const user = await User.findOne({ code });
      if (!user) throw new NotfoundError("user not found");
      await User.findOneAndUpdate(user._id, { isEmailVerified: true });
      return;
    } catch (error) {
      throw error;
    }
  }
  static async logoutUser(req, user) {
    try {
      const token = req.headers.authorization.split(" ")[1];
      const tokens = user.tokens;
      if (!token) {
        throw new ServiceError("auth token required");
      }
      const newTokens = tokens.filter((t) => t.token !== token);
      await User.findByIdAndUpdate(user._id, { tokens: newTokens });
      return;
    } catch (error) {
      throw error;
    }
  }
}

export default UserService;
