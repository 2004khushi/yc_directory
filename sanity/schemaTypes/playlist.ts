
import { defineField, defineType } from "sanity";

export const playlist= defineType({
    name: "playlist",
    title: "Playlists",
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
            name: 'select',
            type: 'array',
            of: [{type: "reference", to:[{type: 'startup'}] }],
        }),
    ],
});