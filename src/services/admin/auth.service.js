import crypto from "crypto";
import { NotfoundError, ServiceError, ValidationError } from "../../errors";
import { createHash, generateToken, verifyHash } from "../../utils/auth.utils";
import {
    createUserSchema,
    forgotPasswordEmailSchema,
    loginUserSchema,
    newPasswordSchema,
} from "../../utils/validators/admin/auth.validator";

import { sendMail } from "../email/nodemailer";
import { Admin } from "../../models/admin.model";

export default class AuthService {
    static createUser = async (req) => {
        try {
            const { email, password } = req.body;

            const { error, value } = createUserSchema.validate(req.body);
            if (error) {
                throw new ValidationError(error.message);
            }

            const [existingUser] = await Admin.aggregate([
                {
                    $match: {
                        $expr: { $eq: [{ $toString: "$email" }, email] },
                    },
                },
            ]);

            if (existingUser) {
                throw new ServiceError(`user already exists with email ${email}`);
            }

            const hashpwd = await createHash(password);

            const newAdmin = await Admin.create({
                ...value,
                password: hashpwd,
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
                throw new ValidationError(error.message);
            }

            const [existingUser] = await Admin.aggregate([
                {
                    $match: {
                        $expr: { $eq: [{ $toString: "$email" }, email] },
                    },
                },
            ]);

            if (!existingUser) {
                throw new NotfoundError("email not found");
            }

            const isValid = await verifyHash(password, existingUser.password);

            if (!isValid) {
                throw new ServiceError("Incorrect password");
            }

            const token = await generateToken(
                { id: existingUser._id },
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
                throw new ValidationError(error.message);
            }

            const [user] = await Admin.aggregate([
                {
                    $match: {
                        $expr: { $eq: [{ $toString: "$email" }, email] },
                    },
                },
            ]);

            if (!user) {
                throw new NotfoundError("user not  found");
            }
            const { ADMIN_CLIENT_URL } = process.env;

            let resetToken = crypto.randomBytes(32).toString("hex");

            const updateUser = await Admin.updateOne(
                { _id: user._id },
                {
                    resetToken,
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
            const { token, userId, password } = req.body;
            const { error, value } = newPasswordSchema.validate(req.body);

            if (error) {
                throw new ValidationError(error.message);
            }

            const [user] = await Admin.aggregate([
                {
                    $match: {
                        $expr: { $eq: [{ $toString: "$_id" }, userid] },
                    },
                },
            ]);
            if (!user || user.resetToken !== token) {
                throw new NotfoundError("user not  found");
            }
            const hashpwd = await createHash(password);
            await Admin.updateOne({ _id: userId }, { password: hashpwd }, { new: true });
            return;
        } catch (error) {
            throw error;
        }
    }
}
