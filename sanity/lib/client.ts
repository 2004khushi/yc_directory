import { createClient } from 'next-sanity'

import { apiVersion, dataset, projectId } from '../env'

export const client = createClient({
  projectId,
  dataset,
  apiVersion,
  useCdn: true, // Set to false if statically generating pages, using ISR or tag-based revalidation
  //dekho isme hota kya haina ki isko smjhne ke liye i m providing a picture in reference section ,
  //baaki to explain it, so kya hota h ki if u set useCdn to TRUE, to pehle apan uncached req krte h obv, to vo jata hai cached memory me check krne agar udhr miljata to vhi return
  //vrna main data me jaake laata,
  //BUT agar under 60 secnds kiya to vo data me check krne nhi jaata hand isliye jab pragni ne dala tha to nhi aaya tha
  //but jesehi u reload it after 60s ec then vo data se fetch krke lata hai!
//   Here’s how it works:

// Multiple Edge Servers:

// A CDN has multiple servers (also called edge nodes or edge locations) distributed across various regions, countries, or even continents.
// For example, a CDN might have edge servers in New York, London, Tokyo, Sydney, and other places around the globe.
// Caching Content on Edge Servers:

// The first time a user requests content (e.g., an image, video, or CSS file) from your site, the CDN fetches it from your origin server (your main server, where the content is originally stored).
// Once the CDN receives the content, it caches it on the nearest edge server (the server closest to where the user is located). This process is known as a cache miss because the content was not previously cached on that server.
// Subsequent Requests from the Same Server:

// On subsequent requests from any user in the same region or geographical area, the content is served from the edge server that is closest to them, rather than having to go back to the origin server.
// Cache hit occurs when the content is already cached on that server.

  //When you set useCDN: false, caching behavior changes significantly, and the content isn't delivered via the CDN. Instead, everything is fetched directly from your origin server. 
  //but just to show u latest features of sanity how lively u can upload what u make instantly , so now run npm i server-only and then obv ek live.ts ki fiel banao in lib
})
