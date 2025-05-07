import { z } from "zod";

export const loginSchema = z.object({
  email: z.string().email({
    message: "请输入有效的电子邮箱地址",
  }),
  password: z.string().min(6, {
    message: "密码必须至少包含6个字符",
  }),
});

export const registerSchema = z.object({
  email: z.string().email({
    message: "请输入有效的电子邮箱地址",
  }),
  password: z.string().min(6, {
    message: "密码必须至少包含6个字符",
  }),
  name: z.string().min(2, {
    message: "用户名至少需要2个字符",
  }),
});

export type LoginFormValues = z.infer<typeof loginSchema>;
export type RegisterFormValues = z.infer<typeof registerSchema>; 