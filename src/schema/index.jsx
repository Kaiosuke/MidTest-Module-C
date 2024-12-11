import { z } from "zod";

const productSchema = z.object({
  title: z.string().trim().min(2, "Title lớn hơn 2 ký tự"),
  description: z.string().trim().optional(),
  price: z.number().min(1, "Giá lớn hơn hoặc bằn 1"),
  categoryId: z.number(),
});

const loginSchema = z.object({
  email: z.string().email({ message: "Email không hợp lệ" }),
  password: z.string().min(6, "Mật khẩu lớn hơn hoặc bằng 6 ký tự"),
});

const registerSchema = z
  .object({
    email: z.string().email({ message: "Email không hợp lệ" }),
    userName: z.string().trim().min(2, "userName lớn hơn 2 ký tự"),
    password: z.string().min(6, "Mật khẩu lớn hơn hoặc bằng 6 ký tự"),
    confirm: z.string(),
  })
  .refine((data) => data.password === data.confirm, {
    message: "Passwords don't match",
    path: ["confirm"],
  });

export { productSchema, loginSchema, registerSchema };
