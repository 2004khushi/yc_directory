This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.




## Why next.js?
Well it optimizes our performance and simplifies evtg for us.

-- it converts all ur components into server components until u specifically tell it not to ('use client')
-- client side rendering almost makes it impossible for seo to crawl and index ur website but next.js solves it by sending PRE RENDERED CODE (via server side rendering (pehle hi js html se page server pe abandeta and then transfer it to the client side)).
   Hence ez for SEO's as now tehy get a lot of stuff 

   --yahape console.log waali chije yahi apne running terminal pe aati h naaki console(page pe) but wahabhi ye dikha dete h under server tag taaki pata chle ki server side rendering hui thi
   -- it helps in keeping things safe and authenticated too bcs server pe hi .env files chije render hojari h ab 
   -- less js jaata h udhr kyuki serve pe hi hora render to direct db access and file access hojata hai 

- react me to kese useeffect me use krte the fetching wala chij yahape direct main fn ke niche hi return ke upar likhdo vo fn and mast chl jaata h, nd isme SERVERCOMPONENTHMRCACHE bhi h jo ye saare FETCH RESPONSES cache bhi krdeta h server side pe hi taaki paise/api calls bache
-- File based routing
-- yahape sirf HTML jata h with rendered page so easy SEO crawling
--  EZ API enpoint creation by route.js -> for ez backend code
-- ek jesi h 10 request bhjere to vo duplicate nhi hone deta and ek hi bhejta h
-- REVALIDATE -> if set in ms then utne har der me page reload hoga , or u can put in fetch fn to fetching baar baar utne time pe hogi (ISR) and then we have (SSR) revalide=0 in both places if u want sab kuch har sec reload kro baar baar AS PER USER REQUESTS.

--FEATURES -> 
-- -- when user navigates to diff page only the code for taht page reloads (speeds up) -> AUTOMATED CODE SPLITTING 
-- -- IMAGE OPTIMIZATION -> lazy loading , compressing ,cdn support already done
-- -- Script optimization -> 3party ke bhi scripts apne aap optimize krdeta
-- -- Font optimization -> self hosting ur own fonts
-- -- layout.tsx me jo likhoge vo SAB JAGAH AAYEGA (it's basically used to provide common UI to everyone)
-- -- error.tsx is the inbuilt error file which wroks out whenever the error happens or is thrown from the pages of that dir where it was mentioned. ISME GLOBAL-error.tsx bhi hota h jo globally use hota h but unlike layout ye parent nhi bnta ; agar ek dir ka error.tsx h to vhi aayega global wala add on nhi hoga . jo bhi nearby h uske hi parent bnta h ye.(same rule for loading.tsx)
-- -- loading.tsx similar work like error.tsx it's for loading purpose 
-- -- page.tsx is main uo here(smtg that opens up when u open that dir or /xyz)

-- -- (route_name) -> won't show up in /route_name -> thsi is used just for ur betterment ki haa uk ye dir actually is part ka hissa hai . but usme bhi aap page.tsx and layout.tsx define kr skte ho taaki vo uspe hi point kre 
-- -- [xyz] -> dynamic routes iski xyz keeps changing acc to how u define it. EG u have /dashboard/[users] so to make it work dahboard ke page.tsx me Link Tage daaldo ek jisme likhdo ki isko click kroge to u will go to /dashboard/1 and so on and under [users] jo bhi page.tsx hoga vo aajayega ; and 1 ke liye 1 ki chije and so on krne ke liye page.tsx of [users] ke fn me bas params ko destruct krlo so dynamiccaly sab chlega usme but sabka template smae hi hoga


-- Client side rednering ki log normal hi aati h and ye tab use krte h jidh aapka page interactivity need krta h like clicks and navigation(clicking url ) and USESTATE/USEEFFECTS and all bcs server side components/rendering me isko kam krne ke liye hi use kiya jata h as vo sab already db ke paas hi render hote h to ye 2 types ke hook ki jrurat hi nhi pdti
   -- -- BUT BUT iske log temrinal pe bhi aate h bcs PRE RENDERING OF client component bhi hoti h to make STATIC PAGE OF IT ; which at server side gets LIVE (hydrated there); placeholder chod deta h next.js jahabhi interactivity cahhiye page me and jo bhi static part h page ka use pehle hi server pe hi bhr deta h taaki optimization jyada ho jaye and js km bhejna pde and all benefits of server side rendieinrg [PPR]