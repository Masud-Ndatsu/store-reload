import { Admin } from "../../models/admin.model";
import { User } from "../../models/user.model";
import { uploadFile } from "../storage/cloudinary.service";

class UserService {
    static getAllUsers = async (req) => {
        const page = req.query.page ? Number(req.query.page) : 1;
        const limit = req.query.limit ? Number(req.query.limit) : 5;

        const users = await User.find({ userType: "user" })
            .populate("shop")
            .skip((page - 1) * limit)
            .limit(limit);

        return { data: users };
    };

    static getCustomerData = async (req) => {
        const { userId } = req.params;

        const [user] = await User.aggregate([
            { $match: { $expr: { $eq: [{ $toString: "$_id" }, userId] } } },
            {
                $project: {
                    password: 0,
                },
            },
        ]);

        return { data: user };
    };

    static getAvatar = async (userId) => {
        const [user] = await Admin.aggregate([
            { $match: { $expr: { $eq: [{ $toString: "$_id" }, userId] } } },
            {
                $project: {
                    password: 0,
                },
            },
        ]);
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
