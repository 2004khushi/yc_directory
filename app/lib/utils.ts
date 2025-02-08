import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}
//ab idhar apan dekhenge agar new date() wala fn khi or render krwanaa h to ke krwaaye so abhi fn banaenge ek apan

export function formatDate(date:string) {
  return new Date(date).toLocaleDateString('en-US',{
    month:'long',
    day: 'numeric',
    year: 'numeric',
  })
}