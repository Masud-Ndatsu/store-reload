import { SupportModel } from "../../models/support.model";
import { User } from "../../models/user.model";
import { createHash } from "../../utils/auth.utils";
import { uploadFile } from "../storage/cloudinary.service";

class UserService {
     static getCustomers = async (req) => {
          const page = req.query.page ? Number(req.query.page) : 1;
          const limit = req.query.limit ? Number(req.query.limit) : 5;

          const users = await User.find({ user_type: "user" })
               .populate("shop")
               .skip((page - 1) * limit)
               .limit(limit);

          return { data: users };
     };

     static getCustomer = async (req) => {
          const { user_id } = req.params;

          const [user] = await User.aggregate([
               {
                    $match: {
                         $expr: {
                              $eq: [{ $toString: "$_id" }, user_id],
                              $eq: [{ $toString: "$user_type" }, "user"],
                         },
                    },
               },
               {
                    $project: {
                         password: 0,
                    },
               },
          ]);

          return { data: user };
     };

     static getProfile = async (user_id) => {
          const [user] = await User.aggregate([
               {
                    $match: {
                         $expr: {
                              $eq: [{ $toString: "$_id" }, user_id.toString()],
                         },
                    },
               },
               {
                    $project: {
                         password: 0,
                    },
               },
          ]);
          return { data: user };
     };
     static updateProfile = async (req, user_id) => {
          let images;
          const { password } = req.body;

          if (req.files) {
               images = await uploadFile(req);
               req.body.avatar = images[0];
          }

          if (req.body.password) {
               req.body.password = await createHash(password);
          }

          await User.findByIdAndUpdate(
               user_id,
               {
                    ...req.body,
               },
               { new: true }
          );
          return;
     };

     static getCustomerSupport = async () => {
          const supportMessages = await SupportModel.aggregate([
               {
                    $match: {},
               },
               {
                    $lookup: {
                         from: "users",
                         localField: "user",
                         foreignField: "_id",
                         as: "user",
                         pipeline: [
                              {
                                   $lookup: {
                                        from: "shops",
                                        localField: "shop",
                                        foreignField: "_id",
                                        as: "shop",
                                   },
                              },
                         ],
                    },
               },
               {
                    $project: {
                         message: 1,
                         user: { $arrayElemAt: ["$user", 0] },
                         createdAt: 1,
                    },
               },
          ]);

          return { data: supportMessages };
     };

     static replySupportMessages = async (req, user_id) => {
          const { support_id } = req.params;
          const { message } = req.body;

          await SupportModel.findOneAndUpdate(
               { _id: support_id },
               {
                    replies: {
                         user: user_id,
                         message,
                    },
               },
               { new: true }
          );

          return;
     };
}

export default UserService;
