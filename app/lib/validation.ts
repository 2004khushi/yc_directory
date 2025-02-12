import { z } from "zod";
export const formSchema = z.object({
    title: z.string().min(3).max(50), //min 3 char daalne pdenge and 50 char in total is min req thing otherwise not valid for title
    description: z.string(),
    category: z.string(),
    link: z.string().url().refine(async (url)=>{
        try{
          const res = await fetch(url, {method:"HEAD"}); //fetch kro url jo user input dega and uska bas header lo
          const contentType = res.headers.get("content-type"); //us header ka sirf type nikaalo

          return contentType?.startsWith("image/"); //jo type aaye usko check kro ki agar if startswith image/ or not.
        } catch {
          return false;
        }
    }),
    pitch: z.string().min(10),
});