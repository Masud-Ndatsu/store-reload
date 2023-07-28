import AuthService from "../../services/app/auth.service.js";
const createUser = async (req, res, next) => {
  try {
    await AuthService.createUser(req);
    return res.status(201).json({
      status: true,
      data: null,
      message: "Request successful",
    });
  } catch (error) {
    next(error);
  }
};
const loginUser = async (req, res, next) => {
  try {
    const { data } = await AuthService.loginUser(req);
    return res.status(200).json({
      status: true,
      data,
      message: "Request successful",
    });
  } catch (error) {
    next(error);
  }
};
const checkUserEmail = async (req, res, next) => {
  try {
    await AuthService.resetPasswordEmail(req);
    return res.status(200).json({
      status: true,
      data: null,
      message: "Request successful",
    });
  } catch (error) {
    next(error);
  }
};
const checkUserOTP = async (req, res, next) => {
  try {
    const { data } = await AuthService.resetPasswordOTP(req);
    return res.status(200).json({
      status: true,
      data,
      message: "Request successful",
    });
  } catch (error) {
    next(error);
  }
};
const resetPassword = async (req, res, next) => {
  try {
    await AuthService.resetPassword(req);
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
  createUser,
  loginUser,
  checkUserEmail,
  checkUserOTP,
  resetPassword,
};
