import { User } from "../../models/user.model";
import { uploadFile } from "../storage/cloudinary.service";

class UserService {
  static getAllUsers = async (req) => {
    const page = req.query.page ? Number(req.query.page) : 1;
    const limit = req.query.limit ? Number(req.query.limit) : 5;
    const skipDocuments = (page - 1) * limit;
    const totalDocuments = await User.countDocuments({ role: "user" });

    const totalPages = Math.ceil(totalDocuments / limit);

    const users = await User.find({ role: "user" })
      .limit(limit)
      .skip(skipDocuments)
      .lean();

    return { data: { users, totalPages } };
  };
  static getUser = async (req) => {
    const { userId } = req.query;

    const user = await User.findById(userId).lean();

    return { data: user };
  };
  static getAvatar = async (userId) => {
    const user = await User.findById(userId).select("avatar").lean();
    return { data: user.avatar };
  };
  static uploadUserAvatar = async (req, userId) => {
    let images = await uploadFile(req);
    const avatar = images[0];
    await User.findByIdAndUpdate(userId, { avatar }, { new: true });
    return;
  };
}

export default UserService;
