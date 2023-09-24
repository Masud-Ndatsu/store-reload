import { NotfoundError, ServiceError, ValidationError } from "../../errors/index.js";
import { ShopModel } from "../../models/shop.model.js";
import { createHash, genAuthCode, generateToken, verifyHash } from "../../utils/auth.utils.js";
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
            const { shopName, password } = req.body;
            const { error, value } = createUserSchema.validate(req.body);

            if (error) {
                throw new ValidationError(error.message);
            }

            const existingShop = await ShopModel.findOne({ shopName }).lean();

            if (existingShop) {
                throw new ServiceError("shop name already exists");
            }
            const hashpwd = await createHash(password);

            const shop = await ShopModel.create({
                ...value,
                password: hashpwd,
            });

            return shop;
        } catch (error) {
            throw error;
        }
    }

    static async loginUser(req) {
        try {
            const { shopName, password } = req.body;

            const { error } = loginSchema.validate(req.body);

            if (error) {
                throw new ValidationError(error.message);
            }

            const [existingShop] = await ShopModel.aggregate([
                {
                    $match: {
                        $expr: { $eq: [{ $toString: "$shopName" }, shopName] },
                    },
                },
            ]);
            console.log(existingShop);
            if (!existingShop) {
                throw new NotfoundError("shop name not found");
            }

            const isValid = await verifyHash(password, existingShop.password);

            if (!isValid) {
                throw new ServiceError("Incorrect password");
            }

            const token = await generateToken({ id: existingShop._id }, process.env.APP_SIGNATURE);

            return {
                data: {
                    user: existingShop,
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
                throw new ValidationError(error.message);
            }

            const shop = await ShopModel.findOne({ email }).lean();

            if (!shop) {
                throw new NotfoundError("shop not  found");
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
                    authCode: code,
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
                throw new ValidationError(error.message);
            }

            const shop = await ShopModel.findOne({ code }).lean();

            if (!shop) {
                throw new NotfoundError("shop not  found");
            }

            return { data: shop };
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
            const user = await ShopModel.findById(userID).select("_id").lean();

            if (!user) {
                throw new NotfoundError("shop not found");
            }
            const hashpwd = await createHash(password);

            await ShopModel.findOneAndUpdate(
                { _id: user._id },
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
