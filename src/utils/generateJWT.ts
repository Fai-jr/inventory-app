import jwt, { JwtPayload, SignOptions } from "jsonwebtoken";
import dotenv from "dotenv";

// Load environment variables
dotenv.config();

const DEFAULT_SIGN_OPTION: SignOptions = {
  expiresIn: "1h",
};

export function generateAccessToken(
  payload: JwtPayload,
  options: SignOptions = DEFAULT_SIGN_OPTION
): string {
  const secret = process.env.SECRET_KEY;

  // Validate secret key
  if (!secret) {
    throw new Error("SECRET_KEY is not defined in environment variables. Please set it in the .env file.");
  }

  // Generate the token
  return jwt.sign(payload, secret, options);
}