import { UserIcon } from "lucide-react";
import { title } from "process";
import { defineField, defineType } from "sanity";

export const author = defineType({
    name: "author",
    title: "Authors",
    type: 'document',
    icon: UserIcon,
    fields: [
        //ab hum define krenge ki kya kya apan github  se uthaayenge
        defineField ({
            name: 'id',
            type: 'number',
        }),
        defineField ({
            name: 'name',
            type: 'string',
        }),
        defineField ({
            name: 'username',
            type: 'string',
        }),
        defineField ({
            name: 'email',
            type: 'string',
        }),
        defineField ({
            name: 'image',
            type: 'url',
        }),
        defineField ({
            name: 'bio',
            type: 'text',
        }),
    ],
    //ab bhaiya jo sab uthaya hai use preview bhi to krenge na, so title-name kiya h taaki direct name se hi taaki we can select those authors by their name directly
    preview: {
        select: {
            title: "name",
        },
    },
});