import Script from "next/script";
import LayoutWrapper from "@/components/LayoutWrapper";
import "./globals.css";


export const metadata = {
  title: "MindEase",
  description: "Sress Relief Platform",

  authors: [{ name: "Ronkedigital"}],

  creator: "Ronkedigital",

  // viewport: "width=device-width, initial-scale=1",

  openGraph: {
    title: "MindEase",
    description: "Stress Relief Platform",
    url: "https://mindease-smoky.vercel.app",
    siteName: "Mindease",
    images:[
      {
        url:"/favicon.ico.png",
        width:1200,
        height: 630,
        alt:"Mindease",
      },
    ],
    locale: "en_US",
    type: "website",
  },
 
};



// className="min-h-full flex flex-col"
export default function RootLayout({ children }) {
  return (
    <html
      lang="en">
      <body>
        {/* <!-- Google tag (gtag.js) -->

<script async src="https://www.googletagmanager.com/gtag/js?id=G-E155CEM33K"></script>
<script id="google-analytics" strategy="afterInteractive">
  {`
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());

  gtag('config', 'G-E155CEM33K');
  `}
</script> */}

        <LayoutWrapper>
        {children}
        </LayoutWrapper>
      </body>
    </html>
  );
}
