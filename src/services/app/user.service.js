import { NotfoundError, ServiceError, ValidationError } from "../../errors/index.js";
import {
    updateUserSchema,
    verifyUserEmailSchema,
} from "../../utils/validators/app/user.validator.js";
import { sendMail } from "../email/nodemailer";
import { genAuthCode, generateToken } from "../../utils/auth.utils.js";
import { User } from "../../models/user.model.js";
import { ShopModel } from "../../models/shop.model.js";

class UserService {
    static async getUserProfile(userId) {
        try {
            const [user] = await User.aggregate([
                {
                    $match: {
                        $expr: {
                            $eq: [{ $toString: "$shop" }, userId.toString()],
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
                throw new NotfoundError("user not found");
            }
            return {
                data: { ...user, shop: user.shop[0] },
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

    static async updateUserDetails(shopId, data = {}) {
        try {
            const { error, value } = updateUserSchema.validate(data);
            if (error) {
                throw new ValidationError(error.message);
            }
            const user = await User.findOneAndUpdate(
                { shop: shopId },
                { shop: shopId },
                { upsert: true }
            ).lean();

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

            let authCode;

            if (value.email && !user.verified) {
                authCode = genAuthCode();
                await Promise.all([
                    ShopModel.updateOne({ _id: shopId }, { authCode }, { new: true }),
                    sendMail({
                        email: value.email,
                        subject: "Verify User Credentials",
                        message: `<p>Heh! User. This is your OTP to very user credentials ${authCode}</p>`,
                    }),
                ]);
            }

            const updatedUser = await User.findByIdAndUpdate(
                user._id,
                {
                    ...value,
                },
                { new: true }
            );

            return updatedUser;
        } catch (error) {
            throw error;
        }
    }
    static async verifyCustomerData(userReq) {
        try {
            const { error, value } = verifyUserEmailSchema.validate(userReq);

            if (error) {
                throw new ValidationError(error.message);
            }

            const { code } = value;

            const user = await ShopModel.findOne({ authCode: code }).select("_id").lean();

            if (!user) {
                throw new NotfoundError("user not found");
            }

            await User.findOneAndUpdate({ shop: user._id }, { verified: true }, { new: true });
            console.log({ owner });

            return;
        } catch (error) {
            throw error;
        }
    }
    static async logoutUser(user) {
        try {
            const token = await generateToken({ id: user._id }, process.env.APP_SIGNATURE, 1);
            return { data: { user, token } };
        } catch (error) {
            throw error;
        }
    }
}

export default UserService;
