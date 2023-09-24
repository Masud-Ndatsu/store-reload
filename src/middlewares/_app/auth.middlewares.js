import { AuthError } from "../../errors/index.js";
import { ShopModel } from "../../models/shop.model.js";
import { decodeToken } from "../../utils/auth.utils.js";

export const authUser = async (req, res, next) => {
    try {
        let token = req.header("Authorization");

        if (!token) {
            throw new AuthError("token is required");
        }
        const [, authToken] = req.header("Authorization").split(" ");

        const decoded = await decodeToken(authToken, process.env.APP_SIGNATURE);

        const user = await ShopModel.findById(decoded.id).lean();

        if (!user) {
            throw new AuthError("Unauthorized user");
        }

        res.locals.user = user;
        return next();
    } catch (error) {
        console.log("ERROR", error);
        next(error);
    }
};
