import { User } from "../../models/user.model";

class UserService {
  static getAllUsers = async (req) => {
    try {
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
    } catch (error) {
      throw error;
    }
  };
  static getUser = async (req) => {
    try {
      const { userId } = req.query;

      const user = await User.findById(userId).lean();

      return { data: user };
    } catch (error) {
      throw error;
    }
  };
}

export default UserService;
