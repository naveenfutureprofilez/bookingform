import '../styles/globals.css'
import '../styles/booking.css'
import Head from 'next/head';
function MyApp({ Component, pageProps }) {
  return <>
    <Head>
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin="" />
      <link href="https://fonts.googleapis.com/css2?family=Inter:wght@500;600;700&amp;display=swap" rel="stylesheet" />
        </Head>
        <Component {...pageProps} />
      </> 
}
export default MyApp;
