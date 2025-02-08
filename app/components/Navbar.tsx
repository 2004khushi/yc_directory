import Link from 'next/link'
import React from 'react'
import Image from 'next/image'
import { auth, signOut, signIn } from "@/auth";
import { redirect } from 'next/dist/server/api-utils'

const Navbar = async() => {
    const session = await auth(); //now wait till auth ka jo bhi async kaam h vo hojae then usko session me daaldena
    console.log(session);
  return (
    <header className='px-5 py-3 bg-white shadow-xl font-work-sans'>
        <nav className='flex justify-between items-center'>
            <Link href= "/">
               <Image src = "/logo1.png" alt="logo" width={144} height={30 }/>
            </Link>

            {/* now i want to create a nvbar which is only seen when user is logged in */}

            <div className='flex items-center gap-5 text-black'>
                {/* ab apan check krenge ki if session me chije dal gyi h and saath me usko user milgya hai then(? lagaya haina rmmbr (?:) operator) do following thing that's in () */}
                {session && session?.user ? (
                    <>
                    <Link href="/startup/create">
                       <span> Create </span>
                    </Link>

                    {/* 
                      ab agar aap sochre the ki <button onClick={signOut}> Logout </button> krke upr ek button daaldenge then u r wrong
                      bcs ye to client side chij haina (onlcick). but signout to async hai it needs await before it to work! ab isme esa nhi ki ekdum bas async await lagaaliye
                      ab niche use server likh diya nhi nhi!! that's invalid.  
                    */}

                    {/* therefore we use form actions with server actions in react 19 */}

                    {/* so with this u can pass a server action to a form to automatically submit the form to server. and iska syntax is niche */}

                    <form action={async () => {
                        "use server";
                        await signOut({redirectTo: "/"});
                    }}>
                        <button type='submit'>Logout</button> 
                        {/* now if u press logout then u r redirected to home page where only login option is there */}

                    </form>

                    {/* ab naam bhi to dikhaaogena user ka side me so -> */}
                    <Link href={`/user/${session?.user?.id}`}>
                       <span>{session?.user?.name}</span>
                    </Link>


                    </>

                    // ab by using : from {?:} operator we will define ki bhaiya agar nhi h logedin tehn what?
                ) : (
                    
                    <form action={async () => {
                        "use server";
                        await signIn('github');
                    }}>
                        <button type="submit">LogIn</button>
                    </form>
                    
                )}

            </div>

        </nav>
    </header>
  )
}

export default Navbar