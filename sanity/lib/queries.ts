//dekho aapna studio wale me jaake vision section me jaake jo query section haian wha pe u can ask many questions related
//to teh author and the startup basically whi sab jo apan ne author.ts and startup.ts me daala hai

import { defineQuery } from "next-sanity";
//define query ke andar we have written query jo aap vision me puchte, and we have wrote | order(_createdAt desc)------> bcs with this we r trying to sort our query's o/p in descending order by _createdAt 
//i.e., latest wala upar aayega

//to check ki isme actually o/p kya aayega then just copy paste this query string in vision part of sanity and o/p dikh jaayega

//yejo 3 or lagaaye h ye isliye h ki tu serach bar pe agar rishita ke naam se search kre to rishita ki saare startup aaye, agar tu title se kre to us title ke saare aaye ya category ke se
export const STARTUPS_QUERY =
  defineQuery(`*[_type == "startup" && defined(slug.current) && !defined($search) || title match $search || category match $search || author->name match $search] | order(_createdAt desc) {
  _id, 
  title, 
  slug,
  _createdAt,
  author -> {
    _id, name, image, bio
  }, 
  views,
  description,
  category,
  image,
}`);