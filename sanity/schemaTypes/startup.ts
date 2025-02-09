import { UserIcon } from "lucide-react";
import { Rule } from "postcss";
import { title } from "process";
import { defineField, defineType } from "sanity";

export const startup= defineType({
    name: "startup",
    title: "Startups",
    type: 'document',
    fields: [
        //ab hum define krenge ki kya kya apan github  se uthaayenge
        defineField ({
            name: 'title',
            type: 'string',
        }),
        defineField ({
            name: 'slug',
            type: 'slug',
            options: {
                source: 'title', //eg if or title is this is a great post then automatically sanity will generate this-is-a-great-startup-uniqueid
            }
        }),
        defineField ({
            name: 'author',
            type: 'reference',
            to: {type: "author"},
        }),
        defineField ({
            name: 'views',
            type: 'number',
        }),
        defineField ({
            name: 'description',
            type: 'text',
        }),
        defineField ({
            name: 'category',
            type: 'string',
            validation: (Rule) => Rule.min(1).max(20).required().error("Please enter a category."),
        }),
        defineField ({
            name: 'image',
            type: 'url',
            validation: (Rule) => Rule.required()
        }),
        defineField ({
            name: 'pitch',
            type: 'markdown', //it's a plugin used by sanity so u need to download it 
        }),
    ],
});