//isme apan basically statically to user ka jo card h vo dikhaaenge baaki dynamically apan usne jo create kiya h startup vo dikhaaenge
//islie to apn ne isko ppr me dala h see 13th code line.

import React, { Suspense } from 'react'
import { auth } from "@/auth";
import { client } from '../../../../sanity/lib/client';
import { AUTHOR_BY_ID_QUERY } from '../../../../sanity/lib/queries';
import { notFound } from 'next/navigation';
import Image from "next/image";
import UserStartups from '@/components/UserStartups';
import Startupcard, { StartupcardSkeleton } from '@/components/Startupcard';

export const experimental_ppr=true;

const page = async ({params}: { params: Promise<{id:string}>}) => {
    const id= (await params).id;
    console.log('params:', await params);
    const session = await auth();
    console.log(id);  // Check if 'id' is being passed correctly
    const user = await client.fetch(AUTHOR_BY_ID_QUERY, { id });
    console.log(user);  // Log the result to debug
    if (!user) return notFound();

    

  return (
    <>
    <section className='profile_container'>
        <div className='profile_card'>
            <div className='profile_title'>
                <h3 className='text-24-black uppercase text-center line-clamp-1'>{user.name}</h3>
            </div>

            <Image
            src={user.image}
            alt={user.name}
            width={220}
            height={220}
            className="profile_image"
            />

            <p className='text-30-extrabold mt-7 text-center '>
                @{user?.username}
            </p>
            <p className='mt-1 text-14-normal text-center'>
                {user?.bio}
            </p>
        </div>


        <div className='flex-1 flex flex-col gap-5 lg:-mt-5'>
            <p className='text-30-bold'>
                {session?.id === id ? 'your' : 'All'} Startups
            </p>
            <ul className='card_grid-sm'>
                <Suspense fallback={<StartupcardSkeleton />}>
                <UserStartups id={id} />
                </Suspense>
                
            </ul>
        </div>

    </section>
    </>
  )
}

export default page