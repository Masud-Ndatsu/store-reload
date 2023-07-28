import UserService from "../../services/app/user.service.js";

const userProfileDetails = async (req, res, next) => {
  try {
    const { data } = await UserService.getUserProfile(res);
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
    await UserService.updateUserDetails(res.locals.user._id, { ...req.body });
    return res.status(200).json({
      status: true,
      data: null,
      message: "Request successful",
    });
  } catch (error) {
    next(error);
  }
};

const verifyUserEmail = async (req, res, next) => {
  try {
    await UserService.verifyUserEmail({ ...req.body });
    return res.status(200).json({
      status: true,
      data: null,
      message: "Request successful",
    });
  } catch (error) {
    next(error);
  }
};
const logoutUser = async (req, res, next) => {
  try {
    await UserService.logoutUser(req, res.locals.user);
    return res.status(200).json({
      status: true,
      data: null,
      message: "Request successful",
    });
  } catch (error) {
    next(error);
  }
};

export default {
  updateUser,
  verifyUserEmail,
  userProfileDetails,
  logoutUser,
};
