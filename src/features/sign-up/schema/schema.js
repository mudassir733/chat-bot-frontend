import { z } from "zod";

export const signupSchema = z.object({
    username: z.string().min(1, { message: 'username is required' }),
    email: z.string().email({ message: 'Enter a valid email address' }).min(1, { message: 'Email address is required' }),
    password: z.string().min(8, { message: 'Password must be at least 8 characters long' }).regex(/^(?=.*[A-Za-z])(?=.*\d)(?=.*[@#$%^&+=!]).{8,}$/, {
        message:
            'Password must include letters, numbers, and a special character (@#$%^&+=!)',
    }
    )
});