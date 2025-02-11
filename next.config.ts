import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    dangerouslyAllowSVG: true, //abhi to kya hai apan svg daalre the placeholder site wala to isliye next js ki security wasn't allowing it, baadme to khi or se aayega jo svg me nhi hoga to tab ye line daalne ki jrurat nhi pdegi
    remotePatterns: [
      {
        protocol:"https",
        hostname:"*",
      }
    ]
  },

  

  
  devIndicators:{
    appIsrStatus:true,
    buildActivity: true,
    buildActivityPosition: "bottom-right",
  },
};

export default nextConfig;
