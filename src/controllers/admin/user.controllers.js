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

const getAvatar = async (req, res, next) => {
    try {
        const userId = res.locals.user._id;

        const { data } = await UserService.getAvatar(userId);
        return res.status(200).json({
            status: true,
            data,
            message: "Request successful",
        });
    } catch (error) {
        next(error);
    }
};

const uploadUserAvatar = async (req, res, next) => {
    try {
        await UserService.uploadUserAvatar(req, res.locals.user._id);
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
    getAllUsers,
    getUser,
    getAvatar,
    uploadUserAvatar,
};
