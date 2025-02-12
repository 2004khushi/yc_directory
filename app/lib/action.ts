"use server";
import {auth  } from "@/auth";
import { parseServerActionResponse } from "./utils";
import { strict } from "assert";
import slugify from 'slugify'; 
import { writeClient } from "../../sanity/lib/write-client";

export const createPitch = async (state:any, form:FormData, pitch:string) => { //dekho is line me apan sirf form data and pitch laane ki koshish krre h 

    const session = await auth(); //we then extract the session bcs we need to know who is teh author of teh author

    if(!session) //checking if session exists
        return parseServerActionResponse({status: "error", error: "Not signed in "});

    const {title,link,category,description} = Object.fromEntries( //we extract all the balues from the form 
        Array.from(form).filter(([key]) => key !=='pitch'),
    );

    const slug= slugify(title as string, {lower:true, strict:true});

    try {
        const startup = { //we take up all the included necessary data
            title,
            description,
            category,
            image:link,
            slug: {
                _type: slug,
                current: slug,
            },
            author:{
                _type: 'reference',
                _ref: session?.id,
            },
            pitch, 
        };

        //now will say sanity client to create it in db
        const result = await writeClient.create({_type: 'startup', ...startup });
        return parseServerActionResponse({...result, error: '', status: 'SUCCESS'}) //and then we return it back

    } catch (error) {
        console.log(error);
        return parseServerActionResponse({error:JSON.stringify(error), status:"error"});
    }
};