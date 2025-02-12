import React, { Suspense } from 'react'
import { client } from '../../../../sanity/lib/client';
import { STARTUP_BY_ID_QUERY } from '../../../../sanity/lib/queries';
import { notFound } from 'next/navigation';
import { formatDate } from '@/lib/utils';
import markdownit from 'markdown-it';

const md= markdownit();

import Link from 'next/link';
import Image from 'next/image';
import { Skeleton } from '@/components/ui/skeleton';
import Dekho from '@/components/Dekho';
//here we will be implementing PARTIAL PRERENDERING(PPR) so as uk it's a one of the coolest feature of nextjs
//so to make it work pehle apan ko next.config me jaake kuch setting krke aani pdegi then usko idhar export krenge!


export const experimental_ppr = true;

const page = async ({params}: { params: Promise<{id:string}>}) => {
    const id= (await params).id;
    const post = await client.fetch(STARTUP_BY_ID_QUERY,{id}); //now we her eused sanity's client api to perfroem incremental static regenration to get startup details.

    if(!post) return notFound();

    const parsedContent = md.render(post?.pitch || ''); //dekho apan ne ye isliye kiya bcs apan ne npm install kiya h markdown and ab pitch render krre apan us variable me, actually kya haina ki apan ne jo pitch likha tha .. yaad hoto vo actually me markdown fase me tha, abhi usko html me to convert krna pdegana tabhi to kuch hoga aage!

  return (
    <>
    <section className='pink_container !min-h-[230px]'>
        <p className='tag'>{formatDate(post?._createdAt)}</p>
        <h1 className='heading'>{post.title}</h1>
        <p className='sub-heading !max-w-5xl'>{post.description}</p>
    </section>
    <section className='section_container'>
       <img src={post.image} alt='thumbnail' className='w-full h-auto rounded-xl'></img>

       <div className='space-y-5 mt-10 max-w-4xl mx-auto'>
        <div className='flex-between gap-5'>
            <Link 
              href={`/user/${post.author?._id}`} 
              className='flex gap-2 items-center mb-3'>
              <img src={post.author?.image} alt="avatar" width={64} height={64} className='rounded-full drop-shadow-lg' />
              <div>
                <p className='text-20-medium'>{post.author?.name}</p>
                <p className='text-16-medium !text--black-300'>@{post.author?.username}</p>
            </div>
            </Link>

            <p className='category-tag'>
                {post.category}
            </p>
        </div>
        <h3 className='text-30-bold'>
           Pitch Details: 
        </h3>
        {parsedContent ? (
            <article className='prose max-w-4xl font-work-sans break-all' dangerouslySetInnerHTML={{__html: parsedContent}} /> //ye dangerously wala kya h? right?? ---> actually react normally escapes any html TO prevent xss attack but use this dangerous to insert raw html
        ):(<p className='no-result'>No Details Provided.</p>)}
       </div>

       <hr className='divider'></hr>
      
      {/* abhi tak apan ne banaya h sirf static part of the page ab isme hum daalenge ek dynamic component now u need to rmmbr that to put a dynamic component in the page /ppr/
      u need to wrap things up in SUSPENSE */}
      {/* ab idhr apan ek fallback daalre h isme, viz ki bhai agar tum render nhi kr paae dynamic smhw then skeleton ppt
      apan abhi idhar use krre h joki SHADCN ka part h isliye pehle usko npm install krna then use it. */}
      <Suspense fallback={<Skeleton className='view_skeleton' />}>
        <Dekho id={id} />
      </Suspense>
     
    </section>
    
    </>
  )
}

export default page