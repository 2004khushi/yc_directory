import type { Metadata } from "next";
import localFont from "next/font/local"
import { Geist, Geist_Mono } from "next/font/google"; //pehle yahape apan google ke die hue fonts use krre the ab apan khudke krre h-LOCAL!
import "./globals.css";

const workSans = localFont({src: [
  {
    path: './fonts/WorkSans-Black.ttf', //ye saare apan ne define kiye h khudne fonts me, whi use krre h!
    weight:'900',
    style: 'normal'
  },{
    path: './fonts/WorkSans-ExtraBold.ttf',
    weight:'800',
    style: 'normal'
  },{
    path: './fonts/WorkSans-Bold.ttf',
    weight:'700',
    style: 'normal'
  },{
    path: './fonts/WorkSans-SemiBold.ttf',
    weight:'600',
    style: 'normal'
  },{
    path: './fonts/WorkSans-Medium.ttf',
    weight:'500',
    style: 'normal'
  },{
    path: './fonts/WorkSans-Regular.ttf',
    weight:'400',
    style: 'normal'
  },{
    path: './fonts/WorkSans-Thin.ttf',
    weight:'200',
    style: 'normal'
  },{
    path: './fonts/WorkSans-ExtraLight.ttf',
    weight:'100',
    style: 'normal'
  },
],
variable: '--font-work-sans',
})

export const metadata: Metadata = {
  title: "NEXOR",
  description: "Pitch, Vote and Grow",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={workSans.variable} 
      >
        {children}
      </body>
    </html>
  );
}
