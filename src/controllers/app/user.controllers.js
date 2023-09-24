import UserService from "../../services/app/user.service.js";

const userProfileDetails = async (req, res, next) => {
    try {
        const userId = res.locals.user._id;
        const { data } = await UserService.getUserProfile(userId);
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
        const userId = res.locals.user._id;
        await UserService.updateUserDetails(userId, { ...req.body });
        return res.status(200).json({
            status: true,
            data: null,
            message: "Request successful",
        });
    } catch (error) {
        next(error);
    }
};

const verifyCustomerData = async (req, res, next) => {
    try {
        await UserService.verifyCustomerData({ ...req.body });
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
        const user = res.locals.user;
        const { data } = await UserService.logoutUser(user);
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
    updateUser,
    verifyCustomerData,
    userProfileDetails,
    logoutUser,
};
