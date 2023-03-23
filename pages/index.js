import { useContext, useEffect, useState } from "react";
import Navbar from "../components/Navbar/Navbar";
import MusicContext from "../store/MusicContext";
import Musics from "../components/Music/Musics";
import styles from "../styles/Home.module.css";
import MusicPlayer from "../components/Music/MusicPlayer";
import Artists from "../components/Artists/Artists";
import Image from "next/image";

export default function HomePage(){

  const musicCtx = useContext(MusicContext);
  // console.log(musicCtx.songs);

  // console.log(musicCtx.trendingSongs);
  // console.log(musicCtx.activeSong);

  return (
    <>
    
      <Navbar/>
      <div className={styles.page}>
        {/* {musicCtx.instrumentalSongs && <div className={styles.sectionHeading}>Instrumental Songs</div>} */}
        {/* {<Musics musics={musicCtx.instrumentalSongs} musicType="songType1"/>} */}
        {/* {musicCtx.trendingSongs && <div className={styles.sectionHeading}>Trending Songs</div>} */}
        {/* {<Musics musics={musicCtx.trendingSongs} musicType="songType2"/>} */}
        {musicCtx.heading && <div className={styles.sectionHeading}>{musicCtx.heading}</div>}
        {musicCtx.heading !== "Recommended Artists" && musicCtx.songs && <Musics musics={musicCtx.songs}/>}

        {musicCtx.heading === "Recommended Artists" && <div className={styles.sectionHeading}>
          <Artists/>
        </div> }
        {musicCtx.heading !== "Recommended Artists" && !musicCtx.songs && <div className={styles.loaderBox}><Image src={"/assets/loader.svg"} height={100} width={100} alt="loader"/></div>}
      </div>
      <br /><br />
      {musicCtx.activeSong && <MusicPlayer/>}
    </>
  )
}