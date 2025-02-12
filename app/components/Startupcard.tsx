import { cn,formatDate } from '@/lib/utils'
import { EyeIcon } from 'lucide-react'
import Link from 'next/link'
import React from 'react'
import { Button } from './ui/button'
import Image from 'next/image'
import { Startup,Author } from '../../sanity/types'
import { Skeleton } from './ui/skeleton'


export type StartupTypeCard = Omit<Startup,"author"> & {author? : Author}

const Startupcard = ({post} : {post: StartupTypeCard}) => {
    //ab dekho niche direct u  r writing _createdAt and all of the object of array rendered directly right? 
    //but pehle esa nhi tha pehle u had to write like {post.view} or {post?._id} and so on
    //but now that 9th line code (destructure) has helped up use it directly !!
    const {_createdAt,_id,views,title,category,image,description,author} = post; 
    //if u r destructuring a sub prop from a prop and if they have same name then u have to change name yaani
    //author: {_id, name} throws error bcs _id exists bahaar bhi so we renamed it. to author: {_id: shitid, name} but humne waapis use change krdiya , bcs type.ts me author ke andar u will see apan ne id?: and name?: krke dala h yaani they ain't necessary so isliye 
    //yahape author ko destructure nhi kiya.

  return (
    <li className='startup-card group'>
        <div className='flex-between'>
            <p className='startup-card_date'>
                {/* {post._createdAt} esa abhi agar waha page.tsx pe aapne createdat pe new date wala fn render kiya hai then yahape ese nhi render kr skte h, iske liye utils.tsx me aapko
                ek fn banana pdega to do it */}
                {formatDate(_createdAt)}
            </p>
    
             {/* ab ek new div andar banaayenge for views dikhane ke liye */}
            <div className='flex items-center gap-1.5'> 
              <EyeIcon className='size-6 text-primary' />
              <span className="text-16-medium">{views}</span>
            </div>
        </div>

        <div className='flex-between mt-5 gap-5'>
          {/* ab hum banaayenge do link of name and title y link???? bcs hum chaahte h ki usko jab u press then u shud go to the page dedicated for the names and for the titles! */}
            <div className='flex-1'>
                <Link href={`/user/${author?._id}`}>
                <p className='text-16-medium line-clamp-1'>{author?.name}</p>
                </Link>
                <Link href={`/startup/${_id}`}>
                <h3 className='text-26-semibold line-clump-1'>{title}</h3>
                </Link>
                
            </div>
            <Link href={`/user/${author?._id }`}>
            <Image src={author?.image || "/download.jpeg"} alt={author?.name || "Unknown Author"} width={48} height={48} className='rounded-full' /> 
            {/* direct agar ye likh doge to error aayegi as Error: Invalid src prop (https://placehold.co/48x48) on `next/image`, hostname "placehold.co" is not configured under images in your `next.config.js` isliye now u need to go to nextconfig to change then come here */}
            </Link>
        </div>
        <Link href={`/startup/${_id}`}>
        <p className='startup-card_desc'>
          {description}
        </p>
        <img src={post?.image} alt="placeholder" className='startup-card_img' />
        </Link>

        <div className='flex-between gap-3 mt-5'>
          <Link href={`/?query=${category?.toLowerCase()}`}> 
          {/* yahape humne category? isliye daala h yuki if category define nhi h to koi issue naa aaaey */}
          <p className='text-16-medium'>{category}</p></Link>
          <Button className='startup-card_btn' asChild>
            <Link href={`/startup/${_id}`}> Details </Link>
          </Button>
        </div>

    </li>
  );
};

//YE NICHE WALA BASICALLY TABKE LIYE H KI UK VO KESE PINTEREST YA INSTA PE AATA H EK KHAALI SA BOARD LOAD HOTE HUE jab tumhara net slow hota h in pace of content
//to humlog yahi krna chaahre h ki jab apan author pe click krenge tab author ka jo khudka banaya hua startup ka card aayega to loading me vo kuch esa hi dikhe isliye ise fir page.tsx of user me render kiya h
export const StartupcardSkeleton = () => (
  <>
  {[0,1,2,3,4].map((index: number) => (
    <li key={cn('skeleton',index)}>
      <Skeleton  className='startup-card_skeleton'  />
    </li>
  ))}
  </>
)

export default Startupcard