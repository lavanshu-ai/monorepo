import z from "zod";

export const PhoneSchema=z.object({
    phone:z.string()
    .nonempty("Phone Number Required")
    .regex(/^[0-9]{10}$/,{message:"Enter a valid phone no."}),
   
})
export const PasswordSchema=z.object({
     password:z.string()
    .min(8, "Password must be at least 8 characters")
    .regex(/[a-z]/, "Password must contain a lowercase letter")
    .regex(/[A-Z]/, "Password must contain an uppercase letter")
    .regex(/[0-9]/, "Password must contain a number")
    .regex(/[^A-Za-z0-9]/, "Password must contain a special character")
})
export const EmailSchema=z.object({
     email:z.string().nonempty("Required Email to signup")
              .email("Enter valid Email")
})
export const NameSchema=z.object({
     name:z.string().min(3,"too short").trim()
          .regex(/^[A-Za-z]+(?: [A-Za-z]+)+$/,{message:"Enter valid Full name"})
})