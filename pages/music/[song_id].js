import { useRouter } from "next/router";
import { useContext, useEffect } from "react";
import MusicContext from "../../store/MusicContext";
import styles from "../../styles/Home.module.css";

export default function SongDetailsPage(){
    const router = useRouter();
    const song_id = router.query.song_id;

    const musicCtx = useContext(MusicContext);
    useEffect(()=>{
        musicCtx.getSongDetails(song_id);
    }, [])

    return (
        <>
            <h4 className={styles.songTitle}>{musicCtx.songDetails && musicCtx.songDetails.title}</h4>
            <h4 className={styles.songSubtitle}>{musicCtx.songDetails && musicCtx.songDetails.subtitle}</h4>

            <div className={styles.lyricsBox}>
                {musicCtx.songDetails && musicCtx.songDetails.sections && musicCtx.songDetails.sections[1].text.map((lyrics_text)=>{
                    return (
                        <p className={styles.lyricsText}>{lyrics_text}</p>
                    )
                })}
            </div>


        </>
    );
}