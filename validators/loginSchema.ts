import {z} from 'zod';
export const loginSchema=z.object({
user:z.string().nonempty('User is required')
    .email({message:'User must be a valid email'})
    .min(5,{message:"User must be at least 4 characters long"})
    .max(50,{message:'User must be at most 20 characters long'}),
password:z.string().nonempty('Password is required')
    .min(8,{message:"Password must be at least 8 characters long"})
    .max(50,{message:'Password must be at most 50 characters long'})    
})