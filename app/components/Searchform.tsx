import React from 'react'
import Form from "next/form";
import SearchformReset from './SearchformReset';
import { Search } from 'lucide-react';

const Searchform = ({query}: {query?:string}) => {
    // const query='test'; abhi to chlo apan ne ek query define krdiya, but we have to now do this URL modifying server rendered form (yaani ki dekho jab tum search krti ho kuch tab url me vo word likha hua aata hai and then when u click X then it goes back to normal home page url.)
    // and there we will try to access query from search parameters---> will be done by searchparams in page .tsx and so on.
    
  return (
    <Form action="/" scroll={false} className='search-form'>
        <input
           name='query'
           defaultValue={query}
           className='search-input'
           placeholder="Search Startups"
        />
        <div className='flex gap-2'>
            {query && <SearchformReset />}
            <button type='submit' className='search-btn text-white'>
                <Search />
            </button>
        </div>
    </Form>
  )
}

export default Searchform