"use client"
import { X } from "lucide-react";
import  Link  from "next/link";
import React from 'react'

const SearchformReset = () => {
    const reset = () => {
            const form = document.querySelector('.search-form') as HTMLFormElement;
            // as HTMLFormElement: TypeScript uses the as keyword for type assertions. This tells TypeScript that the element you're working with is specifically an HTMLFormElement, which is a more specific type than just a generic Element. This ensures that TypeScript knows you are working with a form and provides type-safe properties and methods for HTMLFormElement like reset(), submit(), etc
            if(form) form.reset();
    }
  return (
    <button type='reset' onClick={reset}>
        <Link href='/' className='search-btn text-white'>
        <X />
        </Link>
    </button>
  )
}

export default SearchformReset