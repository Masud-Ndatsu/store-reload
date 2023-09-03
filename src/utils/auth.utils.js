import { hash, compare } from "bcrypt";
import { sign, verify } from "jsonwebtoken";
import sendMail from "../services/email/nodemailer";
const { SALT, SIGNATURE } = process.env;

export const createHash = async (sentData) => {
  const data = await hash(sentData, Number(SALT));
  return data;
};

export const verifyHash = async (sentData, accurateData) => {
  const bool = await compare(sentData, accurateData);
  return bool;
};

export const generateToken = async (payload, expirationTime = "60d") => {
  const token = await sign(payload, SIGNATURE, {
    expiresIn: expirationTime,
  });
  return token;
};

export const decodeToken = async (token) => {
  const payload = await verify(token, SIGNATURE);
  return payload;
};

const _generateVerificationCode = () => {
  const code = Math.floor(1000 + Math.random() * 9000); // 6-digit code
  return code.toString();
};

export const generateAndSendUserOTP = async (email) => {
  const otp = _generateVerificationCode();
  const into = await sendMail({
    email: email,
    subject: "Reset Password Token",
    message: `<h1>Hello. This is your OTP: ${otp} </h1>`,
  });
  return otp;
};
