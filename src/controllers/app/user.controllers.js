import UserService from "../../services/app/user.service.js";
import walletService from "../../services/app/wallet.service.js";

const userProfile = async (req, res, next) => {
     try {
          const userId = res.locals.user._id.toString();
          const { data } = await UserService.getUserProfile(userId);
          return res.status(200).json({
               status: true,
               data,
               message: "Request successful",
          });
     } catch (error) {
          next(error);
     }
};

const updateUser = async (req, res, next) => {
     try {
          const userId = res.locals.user._id;
          await UserService.updateUser(userId, { ...req.body });
          return res.status(200).json({
               status: true,
               data: null,
               message: "Request successful",
          });
     } catch (error) {
          next(error);
     }
};

const verifyUser = async (req, res, next) => {
     try {
          await UserService.verifyUser({ ...req.body });
          return res.status(200).json({
               status: true,
               data: null,
               message: "Request successful",
          });
     } catch (error) {
          next(error);
     }
};

const getWallet = async (req, res, next) => {
     try {
          const user = res.locals.user._id;
          const { data } = await walletService.getWallet({ user });
          return res.status().json({
               status: true,
               data,
               message: "Request successful",
          });
     } catch (error) {
          next(error);
     }
};

export default {
     updateUser,
     verifyUser,
     userProfile,
     getWallet,
};
