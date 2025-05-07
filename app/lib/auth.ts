import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

// 定义JWT密钥（应该放在环境变量中）
const JWT_SECRET = process.env.JWT_SECRET || "your-super-secret-key-change-in-production";
const JWT_EXPIRES_IN = "7d"; // Token有效期7天

/**
 * 哈希密码
 */
export async function hashPassword(password: string): Promise<string> {
  return await bcrypt.hash(password, 10);
}

/**
 * 验证密码
 */
export async function verifyPassword(
  password: string, 
  hashedPassword: string
): Promise<boolean> {
  return await bcrypt.compare(password, hashedPassword);
}

/**
 * 生成JWT令牌
 */
export function generateToken(userId: string): string {
  return jwt.sign({ sub: userId }, JWT_SECRET, {
    expiresIn: JWT_EXPIRES_IN,
  });
}

/**
 * 验证JWT令牌
 */
export function verifyToken(token: string): { sub: string } | null {
  try {
    const decoded = jwt.verify(token, JWT_SECRET) as { sub: string };
    return decoded;
  } catch {
    return null;
  }
} 