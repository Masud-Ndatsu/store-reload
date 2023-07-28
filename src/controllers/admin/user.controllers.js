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
    const { data } = await UserService.getUser(req);
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
};
