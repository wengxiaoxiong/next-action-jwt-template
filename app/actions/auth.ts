"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { prisma } from "../lib/prisma";
import { hashPassword, verifyPassword, generateToken, verifyToken } from "../lib/auth";
import { LoginFormValues, RegisterFormValues } from "../lib/validations";

// Cookie名称常量
const AUTH_COOKIE_NAME = "auth_token";

/**
 * 注册新用户
 */
export async function register(data: RegisterFormValues) {
  try {
    // 检查邮箱是否已存在
    const existingUser = await prisma.user.findUnique({
      where: { email: data.email },
    });

    if (existingUser) {
      return { error: "该邮箱已被注册" };
    }

    // 哈希密码并创建用户
    const hashedPassword = await hashPassword(data.password);
    
    const user = await prisma.user.create({
      data: {
        email: data.email,
        name: data.name ?? "",
        password: hashedPassword,
      },
    });

    // 生成JWT并设置到Cookie
    const token = generateToken(user.id);
    const cookieStore = await cookies();
    cookieStore.set(AUTH_COOKIE_NAME, token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      maxAge: 60 * 60 * 24 * 7, // 7天
      path: "/",
      sameSite: "strict", // 防止CSRF攻击
    });

    return { success: true };
  } catch (error) {
    console.error("注册失败:", error);
    return { error: "注册过程中发生错误，请稍后再试" };
  }
}

/**
 * 用户登录
 */
export async function login(data: LoginFormValues) {
  try {
    // 查找用户
    const user = await prisma.user.findUnique({
      where: { email: data.email },
    });

    if (!user) {
      return { error: "邮箱或密码不正确" };
    }

    // 验证密码
    const isPasswordValid = await verifyPassword(data.password, user.password);

    if (!isPasswordValid) {
      return { error: "邮箱或密码不正确" };
    }

    // 生成JWT并设置到Cookie
    const token = generateToken(user.id);
    const cookieStore = await cookies();
    cookieStore.set(AUTH_COOKIE_NAME, token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      maxAge: 60 * 60 * 24 * 7, // 7天
      path: "/",
      sameSite: "strict", // 防止CSRF攻击
    });

    return { success: true };
  } catch (error) {
    console.error("登录失败:", error);
    return { error: "登录过程中发生错误，请稍后再试" };
  }
}

/**
 * 用户注销
 */
export async function logout() {
  const cookieStore = await cookies();
  cookieStore.delete(AUTH_COOKIE_NAME);
  redirect("/login");
}

/**
 * 获取当前用户信息
 */
export async function getCurrentUser() {
  const cookieStore = await cookies();
  const token = cookieStore.get(AUTH_COOKIE_NAME)?.value;

  if (!token) {
    redirect("/login");
  }

  // 验证令牌
  const decoded = verifyToken(token);
  if (!decoded) {
    return null;
  }

  try {
    const user = await prisma.user.findUnique({
      where: { id: decoded.sub },
      select: {
        id: true,
        email: true,
        name: true,
      },
    });

    return user;
  } catch (error) {
    console.error("获取用户信息失败:", error);
    return null;
  }
} 