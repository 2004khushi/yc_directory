import React from 'react'
import Ping from './Ping'
import { client } from '../../sanity/lib/client'
import { STARTUP_VIEWS_QUERY } from '../../sanity/lib/queries'
import { writeClient } from '../../sanity/lib/write-client'
import { after } from "next/server";

const Dekho = async ({id}:{id : string}) => {

    const {views:totalviews } =await client.withConfig({useCdn:false}).fetch(STARTUP_VIEWS_QUERY, {id});
    //we used usecdn: false taaki number of views increase hote rhe jabbhi koi view krre unhe. 
    //But to increase this or implement this fn ki koi aaye to view bdhe u need to use SANITY RIGHT CLIENT--> allowing RIGHT OPERATNS on page, isse pehle tak sirf READ hi tha
    //so go to sanity site and udhar token generate kro with edit perms


    // await writeClient.patch(id).set({ views : totalviews +1 }).commit();
    //ab dekho 2 jaagh await use krliya tumne so sequentially kaam hoga uska, haina so aapko ye ui pe nhi dikhega and sirf skeleton dikhega
    //SOLN: unstable_after of next js isliye niche wala approach use krenge

    after(async () => {
        await writeClient.patch(id).set({ views : totalviews +1 }).commit();
    })




  return (
    <div className='view-container'>
        <div className='absolute -top-2 -right-2'>
            <Ping />
        </div>

        <p className='view-text'> 
            <span className='font-black'>{totalviews} views </span>
        </p>
    </div>
  )
}

export default Dekho