import AuthService from "../../services/admin/auth.service";

const createUser = async (req, res, next) => {
  try {
    await AuthService.createUser(req);
    return res.status(200).json({
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
const forgotPassword = async (req, res, next) => {
  try {
    await AuthService.forgotPassword(req);
    return res.status(200).json({
      status: true,
      data: null,
      message: "Request successful",
    });
  } catch (error) {
    next(error);
  }
};
const changePassword = async (req, res, next) => {
  try {
    await AuthService.changePassword(req);
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
  forgotPassword,
  changePassword,
};
