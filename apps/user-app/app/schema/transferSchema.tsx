import z from "zod";

export const amountSchema=z.object({
    amount:z.string().max(8).nonempty("Amount is required")
    .regex(/^[0-9]+$/, "Enter a valid Amount")
    .transform(Number)
    .refine(v => v > 0, "Amount must be greater than 0")
})
