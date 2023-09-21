import { NotfoundError, ServiceError, ValidationError } from "../../errors/index.js";
import { User } from "../../models/user.model.js";
import { createHash, generateAndSendUserOTP, generateToken, verifyHash } from "../../utils/auth.utils.js";
import {
    createUserSchema,
    loginSchema,
    resetPasswordEmailSchema,
    resetPasswordOTPSchema,
    resetPasswordSchema,
} from "../../utils/validators/app/auth.validator.js";

class AuthService {
    static async createUser(req) {
        try {
            const userReq = req.body;
            const { error, value } = createUserSchema.validate(userReq);

            if (error) {
                throw new ValidationError(error.message);
            }
            const { shopName, password } = value || userReq;

            const existingUser = await User.findOne({ shopName }).select("_id").lean();

            if (existingUser) {
                throw new ServiceError("shop name already exists");
            }
            const hashedPassword = await createHash(password);

            await User.create({
                ...value,
                password: hashedPassword,
            });

            return;
        } catch (error) {
            console.log(error);
            throw error;
        }
    }

    static async loginUser(req) {
        try {
            const userReq = req.body;
            const { error, value } = loginSchema.validate(userReq);

            if (error) {
                throw new ValidationError(error.message);
            }
            const { shopName, password } = value || userReq;

            const existingUser = await User.findOne({ shopName }).lean();

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
    }

    static async resetPasswordEmail(req) {
        try {
            const { error, value } = resetPasswordEmailSchema.validate(req.body);

            if (error) {
                throw new ValidationError(error.message);
            }
            const { email } = value;

            const user = await User.findOne({ email }).select("_id email").lean();
            if (!user) {
                throw new NotfoundError("user not  found");
            }

            const otp = await generateAndSendUserOTP(email);
            await User.findByIdAndUpdate(user._id, { emailVerificationCode: otp });

            return;
        } catch (error) {
            throw error;
        }
    }
    static async resetPasswordOTP(req) {
        try {
            const { error, value } = resetPasswordOTPSchema.validate(req.body);

            if (error) {
                throw new ValidationError(error.message);
            }
            const { code } = value;

            const user = await User.findOne({ code }).select("_id").lean();

            if (!user) {
                throw new NotfoundError("user not  found");
            }

            return { data: user };
        } catch (error) {
            throw error;
        }
    }

    static async resetPassword(req) {
        try {
            const { error, value } = resetPasswordSchema.validate(req.body);

            const { userID, password } = value;
            if (error) {
                throw new ValidationError(error.message);
            }
            const user = await User.findById(userID).select("_id").lean();

            if (!user) {
                throw new NotfoundError("user not found");
            }
            const hashedPassword = await createHash(password);
            await User.findByIdAndUpdate(user._id, {
                password: hashedPassword,
            });

            return;
        } catch (error) {
            throw error;
        }
    }
}

export default AuthService;
