import { AppError } from "../../errors/index.js";
import { Admin } from "../../models/admin.model.js";
import { decodeToken } from "../../utils/auth.utils.js";

export const authAdminUser = async (req, res, next) => {
    try {
        let token = req.header("Authorization");

        if (!token) {
            throw new AppError("token is required", 400);
        }
        const [, authToken] = req.header("Authorization").split(" ");

        const decoded = await decodeToken(authToken, process.env.ADMIN_SIGNATURE);

        const user = await Admin.findById(decoded.id).lean();

        if (!user) {
            throw new AppError("Unauthorized user", 401);
        }
        res.locals.user = user;
        return next();
    } catch (error) {
        console.log("ERROR", error);

        next(error);
    }
};
