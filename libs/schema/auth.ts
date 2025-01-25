import { z } from "zod";


export const auth = z.object({
    email:z.string().email(),
    password:z.string().min(8,{message:"Must be 8 character"})
})