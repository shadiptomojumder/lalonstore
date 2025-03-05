import * as z from "zod";

const emailOrPhoneSchema = z.string().refine((value) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const phoneRegex = /^\+?[1-9]\d{1,14}$/;
    return emailRegex.test(value) || phoneRegex.test(value);
  }, {
    message: "Must be a valid email or phone number",
  });

export const userSchema = z.object({
  firstName: z.string().min(1).trim(),
  lastName: z.string().min(1).trim(),
  email: z.string().email().trim().toLowerCase().optional(), // optional due to sparse
  phone: z.string().trim().toLowerCase().optional(), // optional due to sparse
  address: z.string().trim().toLowerCase().optional(), // optional due to sparse
  googleId: z.string().trim().toLowerCase().optional(), // optional due to sparse
  role: z.enum(["USER", "ADMIN"]).default("USER"),
  avatar: z.string().optional(),
  otp: z.number().optional(),
  password: z.string().min(6), // Adjust min length as needed
  refreshToken: z.string().optional(), // refreshToken is optional.
});

export type User = z.infer<typeof userSchema>;
export type UserFormData = z.infer<typeof userSchema>;

// Example usage and refinement for specific cases

// Signup Schema (password required, no googleId)
export const signupSchema = userSchema.omit({ googleId: true, refreshToken: true,}).extend({
    emailOrPhone: emailOrPhoneSchema.optional(),
    password: z.string().min(6),
  });

export type SignupSchema = z.infer<typeof signupSchema>;

// Login Schema (email or phone, password)
export const loginSchema = z.object({
    emailOrPhone: z.string().trim().toLowerCase(),
    password: z.string().min(6),
});

export type LoginSchema = z.infer<typeof loginSchema>;

// Google Login Schema (googleId required, no password)
export const googleLoginSchema = userSchema.omit({ password: true, refreshToken: true, phone: true, address: true, otp: true, avatar: true, email: true, role: true }).extend({
    googleId: z.string().min(1)
});

export type GoogleLoginSchema = z.infer<typeof googleLoginSchema>;

// Profile Update Schema (partial updates allowed)
export const profileUpdateSchema = userSchema.partial().omit({password: true, refreshToken: true, role: true, email: true, googleId: true});

export type ProfileUpdateSchema = z.infer<typeof profileUpdateSchema>;