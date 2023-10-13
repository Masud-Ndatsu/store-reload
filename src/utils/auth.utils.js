import { hash, compare } from "bcryptjs";
import { sign, verify } from "jsonwebtoken";
const { SALT } = process.env;

export const createHash = async (sentData) => {
    const data = await hash(sentData, Number(SALT));
    return data;
};

export const verifyHash = async (sentData, accurateData) => {
    const bool = await compare(sentData, accurateData);
    return bool;
};

export const generateToken = async (payload, SIGNATURE, exp = "60d") => {
    const token = sign(payload, SIGNATURE, {
        expiresIn: exp,
    });
    return token;
};

export const decodeToken = async (token, SIGNATURE) => {
    const payload = verify(token, SIGNATURE);
    return payload;
};

export const genAuthCode = () => {
    const code = Math.floor(1000 + Math.random() * 9000); // 6-digit code
    return code.toString();
};
