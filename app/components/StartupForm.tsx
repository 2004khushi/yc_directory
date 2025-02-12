"use client";
import React, { useActionState, useState } from 'react'
import { Input } from './ui/input';
import { Textarea } from './ui/textarea';
import MDEditor from "@uiw/react-md-editor";
import { Button } from './ui/button';
import { Send } from 'lucide-react';
import { formSchema } from '@/lib/validation';
import { z } from 'zod';
import { useToast } from '@/hooks/use-toast';
import { useRouter } from 'next/navigation';
import { Result } from 'postcss';
import { createPitch } from '@/lib/action';


const StartupForm = () => {
    const[errors,setErrors] =useState<Record<string,string>>({});
    const [pitch, setPitch] = useState("");
    const {toast} = useToast();
    const router = useRouter();
 
    

    const handleFormSubmit= async (prevState:any, formData: FormData) => {
        try {
            const formValues ={
                title:formData.get("title") as string,
                description:formData.get("description") as string,
                category:formData.get("category") as string,
                link:formData.get("link") as string,
                pitch,
            }

            //form values leliya ab usko validate krwaale?
            await formSchema.parseAsync(formValues); //we will take the formvalues and will match with formschema if tehy match

            const result = await createPitch (prevState,formData,pitch);

         if(result.status == 'SUCCESS'){
            toast({
                title:"SUCCESS",
                description:"Yur startup pitch has been created successfully",
            });
            router.push(`/startup/${result._id}`)
           }
           return result;
        } catch (error) {
            if (error instanceof z.ZodError){
                const fieldErrors = error.flatten().fieldErrors; 

                setErrors(fieldErrors as unknown as Record<string,string>);
                toast({
                    title:"error",
                    description:"please check ur input and try again",
                    variant:'destructive', //meaning it will be in red color
                })
                return{ ...prevState, error:"validation failed" , status: "ERROR"};  

            }
                toast({
                    title:"error",
                    description:"unexpected error has occured",
                    variant:'destructive', //meaning it will be in red color
                })

            return{ ...prevState, error:"unexpected error has occured", status: "ERROR", };
        }
    };

    //form handling becomes smoother with this hook and also many specal features like pending and all r gievn too, see refernce ss to see detailed meaning
    const [state, formAction, isPending] = useActionState(handleFormSubmit,{error:" ",status:"INITIAL"}); //before adding the 3rd param of useactionstate first go and do the validation part viz ki jese ese nhi ki kuchbhi bhr diya tumne form me and accept hogya, nhi it shud be valid. so uske liye we will do ZOD check it out in validation.ts
    
    

  return (
    <form action={formAction} className='startup-form'>
        <div>
            <label htmlFor='title' className='startup-form_label'>
               Title
            </label>
            <Input id="title" name='title' className='startup-form_input' required placeholder='Startup Title'></Input>
            {errors.title && <p className='startup-form_error'>{errors.title}</p>}
        </div>

        <div>
            <label htmlFor='title' className='startup-form_label'>
               Description
            </label>
            <Textarea id="description" name='description' className='startup-form_textarea' required placeholder='Startup Description' />
            {errors.description && <p className='startup-form_error'>{errors.description}</p>}
        </div>

        <div>
            <label htmlFor='category' className='startup-form_label'>
               Category
            </label>
            <Input id="category" name='category' className='startup-form_input' required placeholder='Startup Category (Tech,Health,Eduction...)'></Input>
            {errors.category && <p className='startup-form_error'>{errors.category}</p>}
        </div>

        <div>
            <label htmlFor='link' className='startup-form_label'>
               Image URL
            </label>
            <Input id="link" name='link' className='startup-form_input' required placeholder='Startup Image url'></Input>
            {errors.link && <p className='startup-form_error'>{errors.link}</p>}
        </div>

        <div data-color-mode="light">
        <label htmlFor="pitch" className="startup-form_label">
          Pitch
        </label>

        <MDEditor
          value={pitch}
          onChange={(value) => setPitch(value as string)}
          id="pitch"
          preview="edit"
          height={300}
          style={{ borderRadius: 20, overflow: "hidden" }}
          textareaProps={{
            placeholder:
              "Briefly describe your idea and what problem it solves",
          }}
          previewOptions={{
            disallowedElements: ["style"],
          }}
        />

        {errors.pitch && <p className="startup-form_error">{errors.pitch}</p>}
      </div> 

      <Button type='submit' className='startup-form_btn text-white' disabled={isPending}>
        {isPending? "submitting...": "submit your startup"}
        <Send className='size-7 ml-2'></Send>
      </Button>
    </form>
    
  )
}

export default StartupForm