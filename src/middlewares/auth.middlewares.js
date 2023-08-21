import { AuthError } from "../errors/index.js";
import { User } from "../models/user.model.js";
import { decodeToken } from "../utils/auth.utils.js";

export const handleAuth = async (req, res, next) => {
  try {
    let bearerToken = req.headers?.authorization;

    if (!bearerToken) throw new AuthError("token is required");

    const [, authToken] = req.headers?.authorization?.split(" ");

    const decoded = await decodeToken(authToken);

    if (!decoded.id) throw new AuthError("Unauthorized user");

    res.locals.userId = decoded.id;
    return next();
  } catch (error) {
    console.log("ERROR", error);

    next(error);
  }
};
