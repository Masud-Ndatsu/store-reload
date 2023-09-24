import nodemailer from "nodemailer";
import config from "../../config";

export const sendMail = async (options) => {
    try {
        const transporter = nodemailer.createTransport({
            service: "gmail",
            secure: false,
            auth: {
                user: config.email.user,
                pass: config.email.pass,
                // type: 'SMTP',
            },
        });
        const mailOptions = {
            from: config.email.user,
            to: options.email,
            subject: options.subject,
            html: options.message,
        };
        await transporter.sendMail(mailOptions);
        return;
    } catch (error) {
        throw error;
    }
};
