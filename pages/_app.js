import { MusicContextProvider } from '../store/MusicContext'
import '../styles/globals.css'
import Head from 'next/head';

export default function App({ Component, pageProps }) {
  return (
    <MusicContextProvider>
      <Head>
        <meta
          name="description"
          content="Listen your favourite songs with Musico"
        />
        <meta
          name="keywords"
          content="Musico, music, songs, song, gaana, spotify-api"
        />
        <meta name="author" content="Arindam Halder" />
        <title>Musico</title>

        <meta property="og:locale" content="en_US" />
        <meta property="og:type" content="article" />
        <meta property="og:title" content="Musico" />
        <meta
          property="og:description"
          content="Listen your favourite songs with Musico"
        />
        {/* <meta property="og:url" content="https://mozify-nu.vercel.app/" /> */}
        <meta property="og:site_name" content="Musico" />
        {/* <meta property="og:image" itemProp="image" content="https://mozify-nu.vercel.app/favicon.ico"/> */}
        <link rel="shortcut icon" href="favicon.ico" type="image/x-icon" />
        <link rel="icon" type="image/x-icon" href="favicon.ico" />
        <link rel="manifest" href="manifest.json" />
      </Head>
      <Component {...pageProps} />
    </MusicContextProvider>
  );
}