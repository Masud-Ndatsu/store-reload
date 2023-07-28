import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
const { sign, verify } = jwt;
import { promisify } from 'util';
import sendMail from '../services/email/nodemailer';
const { SALT, SIGNATURE } = process.env;

export const createHash = async (sentData) => {
  const data = await bcrypt.hash(sentData, Number(SALT));
  return data;
};

export const verifyHash = async (sentData, accurateData) => {
  const bool = await bcrypt.compare(sentData, accurateData);
  return bool;
};

const _signJWT = promisify(sign);
const _verifyJWT = promisify(verify);

export const generateToken = async (payload, expirationTime = '60d') => {
  const token = await _signJWT(payload, SIGNATURE, {
    expiresIn: expirationTime,
  });
  return token;
};

export const decodeToken = async (token) => {
  const payload = await _verifyJWT(token, SIGNATURE);
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
    subject: 'Reset Password Token',
    message: `<h1>Hello. This is your OTP: ${otp} </h1>`,
  });
  return otp;
};
