import cloudinary from "cloudinary";
import config from "../../config/index.js";
import fs from "fs";

cloudinary.config({
     cloud_name: config.cloud.name,
     api_key: config.cloud.api_key,
     api_secret: config.cloud.api_secret,
});

const _upload = (file, folder) => {
     return new Promise((resolve, reject) => {
          cloudinary.v2.uploader.upload(
               file,
               {
                    resource_type: "auto",
                    folder,
                    transformation: { width: 640, height: 640, crop: "fill" },
               },
               (error, result) => {
                    if (error) {
                         reject({ error });
                    }
                    resolve({ url: result.url, id: result.public_id });
               }
          );
     });
};

export const uploadFile = async (req) => {
     try {
          const urls = [];
          const files = req.files;

          for (const file of files) {
               const { path } = file;
               const uploader = async (path) =>
                    await _upload(path, "storereload");
               const newpath = await uploader(path);
               urls.push(newpath);
               fs.unlinkSync(path);
          }
          const url = urls.map((file) => {
               return file.url;
          });

          return url;
     } catch (error) {
          for (let file of req.files) {
               fs.unlinkSync(file.path);
          }
          console.log("IMAGE ERROR: ", error);
          throw error;
     }
};
