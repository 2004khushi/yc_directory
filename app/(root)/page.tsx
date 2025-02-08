import Searchform from "@/components/Searchform";
import Startupcard from "@/components/Startupcard";
import Image from "next/image";

export default async function Home({searchParams} : {searchParams: Promise <{query?: string}>}) 
{
   const query = (await searchParams).query;
   const posts = [{
    // _createdAt: 'Yesterday', --> static tha ye to
    _createdAt: new Date(),
    views: 55,
    author: { _id: 1 , name: 'loren'}, //this id id for author
    _id : 1, //thsi id is for post
    description: 'This is a description. ',
    image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS44XL4RdMNeMqE_NbBJTT1iUfz53FysDz0hg&s',
    category: "Robots",
    title: "We Robots",
   }];
  return (
    <>
    <section className="pink_container">
      <h1 className="heading">Showcase Your Vision, <br/> Connect with Changemakers</h1>
      <p className="sub-heading !max-w-3xl">Pitch your startup, vote for your favorites, and shine in our virtual competition to get noticed.</p>

      {/* ab dekho iske niche hi directly me bhle hi direct input field banake input le skti hu but i will make that as a component
      Y? bcs home page is server side render but this will be client side i mean kuch fn like button click and keyboard search ye sab */}

      <Searchform query={query} />
    </section>
    <section className="section_container">
        <p className="text-30-semibold">
          {query ? `search results for ${query}` : "All StartUps"}
          <ul className="card_grid mt-7">
            {posts?.length >0 ? (
              posts.map((post: StartupCardType, index: number) => (
                //  Each child in a list should have a unique "key" prop. if u just wrote <startup />
                <Startupcard key={post?._id} post={post} />
              ))
            ) : (
              <p className="no-results"> No startups found</p>
            )}

          </ul>
        </p>
      </section>
    </>
  );
}
