import UserService from "../../services/admin/user.service";

const getAllUsers = async (req, res, next) => {
     try {
          const { data } = await UserService.getAllUsers(req);
          return res.status(200).json({
               status: true,
               data,
               message: "Request successful",
          });
     } catch (error) {
          next(error);
     }
};
const getUser = async (req, res, next) => {
     try {
          const { data } = await UserService.getCustomer(req);
          return res.status(200).json({
               status: true,
               data,
               message: "Request successful",
          });
     } catch (error) {
          next(error);
     }
};

const getUserProfile = async (req, res, next) => {
     try {
          const user_id = res.locals.user._id;

          const { data } = await UserService.getUserProfile(user_id);
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
          await UserService.updateUser(req, res.locals.user._id);
          return res.status(200).json({
               status: true,
               data: null,
               message: "Request successful",
          });
     } catch (error) {
          next(error);
     }
};

const getSupportMessages = async (_req, res, next) => {
     try {
          const { data } = await UserService.getSupportMessages();
          return res.status(200).json({
               status: true,
               data,
               message: "Request successful",
          });
     } catch (error) {
          next(error);
     }
};

export default {
     getAllUsers,
     getUser,
     getUserProfile,
     updateUser,
     getSupportMessages,
};
