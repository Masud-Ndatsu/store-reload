import UserService from "../../services/admin/user.service";

const getCustomers = async (req, res, next) => {
     try {
          const { data } = await UserService.getCustomers(req);
          return res.status(200).json({
               status: true,
               data,
               message: "Request successful",
          });
     } catch (error) {
          next(error);
     }
};
const getCustomer = async (req, res, next) => {
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

const getProfile = async (req, res, next) => {
     try {
          const { data } = await UserService.getProfile(res.locals.user._id);
          return res.status(200).json({
               status: true,
               data,
               message: "Request successful",
          });
     } catch (error) {
          next(error);
     }
};

const updateProfile = async (req, res, next) => {
     try {
          await UserService.updateProfile(req, res.locals.user._id);
          return res.status(200).json({
               status: true,
               data: null,
               message: "Request successful",
          });
     } catch (error) {
          next(error);
     }
};

const getCustomerSupport = async (_req, res, next) => {
     try {
          const { data } = await UserService.getCustomerSupport();
          return res.status(200).json({
               status: true,
               data,
               message: "Request successful",
          });
     } catch (error) {
          next(error);
     }
};

const replySupportMessages = async (req, res, next) => {
     try {
          await UserService.replySupportMessages(req, res.locals.user._id);
          return res.status(200).json({
               status: true,
               data: null,
               message: "Request successful",
          });
     } catch (error) {
          next(error);
     }
};

export {
     getCustomers,
     getProfile,
     getCustomer,
     updateProfile,
     getCustomerSupport,
     replySupportMessages,
};
