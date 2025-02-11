import NextAuth from "next-auth"
import GitHub from "next-auth/providers/github"
import { client } from "../sanity/lib/client"
import { AUTHOR_BY_GITHUB_ID_QUERY } from "../sanity/lib/queries"
import { writeClient } from "../sanity/lib/write-client"
 
export const { handlers, auth, signIn, signOut } = NextAuth({
  providers: [GitHub],
  //after successful authentication of next auth.js these below down will be executed viz., user ka naam vgera sab aajayega
  callbacks:{
    //signin was made to check if taht user exists already in db or not and if not then create it
    async signIn ({user:{name,email,image},profile:{id,login,bio},}) {
      const existingUser = await client.
      withConfig({useCdn:false})
      .fetch(AUTHOR_BY_GITHUB_ID_QUERY,{
        id,
      }); 

      if(!existingUser){
        await writeClient.create({
          _type:'author',
          id,
          name,
          username:login,
          email,
          image,
          bio:bio || "",
        });
      }

      return true;
    },

    //after a successfull signin now we need to create author id from sanity to use it for our profile
    //below down helps to join github user with sanity author who creates startups
    async jwt({token,account,profile}){
      if(account && profile){
        const user = await client.withConfig({useCdn:false}).fetch(AUTHOR_BY_GITHUB_ID_QUERY,{
          id:profile?.id,
        });

        token.id = user?._id;
      }

      return token; 
    }, 

    //now to use this author id we need to make another callback
    async session({session,token}){
      Object.assign(session,{id:token.id}); //we needed to pass the profile id from token to session
      return session;
    }

  }
})