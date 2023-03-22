import styles from "../../styles/Home.module.css";
import Image from "next/image";
import {MdFavoriteBorder, MdFavorite} from "react-icons/md";
import {HiVolumeUp} from "react-icons/hi";
import {FaForward, FaBackward, FaPlayCircle, FaPauseCircle, FaVolumeUp, FaVolumeDown, FaVolumeMute} from "react-icons/fa";
import {IoCaretForward, IoCaretBack} from "react-icons/io5";
import { useContext, useEffect, useRef, useState } from "react";
import MusicContext from "../../store/MusicContext";

export default function MusicPlayer(){
    const [currTime, setCurrTime] = useState(0);
    const [duration, setDuration] = useState(0);

    const musicCtx = useContext(MusicContext);
    const audioRef = useRef();
    const [isPlaying, setIsPlaying] = useState(false);

    function updateVolume(e){
        musicCtx.updateVolume(e.target.value);
    }
    useEffect(()=>{
        audioRef.current.volume = musicCtx.volume/10;
    }, [musicCtx.volume]);

    useEffect(()=>{
        setIsPlaying(audioRef.current.paused);
    }, [audioRef, musicCtx.activeSong])

    function handleSetCurrTime(e){
        setCurrTime(e.target.value);
        audioRef.current.currentTime = e.target.value;
    }

    function togglePlaying(){
        if(!audioRef.current.paused){
            audioRef.current.pause();
            setIsPlaying(false);
        }
        else{
            audioRef.current.play();
            setIsPlaying(true);
        }
    }
    function handleForward(){
        setCurrTime(currTime+5);
        audioRef.current.currentTime = currTime+5;
    }
    function handleBackward(){
        setCurrTime(currTime-5);
        audioRef.current.currentTime = currTime-5;
    }
    function handleNextSong(){
        const nextSong = musicCtx.songs[((musicCtx.songIndex+1)%musicCtx.songs.length+musicCtx.songs.length)%musicCtx.songs.length];
        const nextSongData = {
            musicDp: nextSong.image? nextSong.image[nextSong.image.length-1].link: "/assets/no-image.png", id: nextSong.id, audioUrl: nextSong.downloadUrl[nextSong.downloadUrl.length-1].link, title: nextSong.name, subtitle: nextSong.primaryArtists
        }
        musicCtx.updateActiveSong(nextSongData);
        musicCtx.updateSongIndex(musicCtx.songIndex+1);
    }
    function handlePrevSong(){
        const prevSong = musicCtx.songs[((musicCtx.songIndex-1)%musicCtx.songs.length+musicCtx.songs.length)%musicCtx.songs.length];
        const prevSongData = {
            musicDp: prevSong.image? prevSong.image[prevSong.image.length-1].link: "/assets/no-image.png", id: prevSong.id, audioUrl: prevSong.downloadUrl[prevSong.downloadUrl.length-1].link, title: prevSong.name, subtitle: prevSong.primaryArtists
        }
        musicCtx.updateActiveSong(prevSongData);
        musicCtx.updateSongIndex(musicCtx.songIndex-1);
    }

    return (
        <>
            <div className={styles.musicPlayerBox}>
                <input type="range" step="any" min={0} max={duration} value={currTime} onInput={handleSetCurrTime} className={styles.musicTimeBar}/>

                <div className={styles.musicPlayerLeftpart}>
                    <Image src={musicCtx.activeSong && musicCtx.activeSong.musicDp} height={100} width={100} alt="musicDp" className={styles.musicDp}/>
                    <div className={styles.musicDetails}>
                        <h4 className={styles.musicTitleName}>{musicCtx.activeSong.title.length > 30 ? musicCtx.activeSong.title.slice(0, 30)+"...":musicCtx.activeSong.title}</h4>
                        <h6 className={styles.musicSubtitleName}>{musicCtx.activeSong.subtitle.length > 40 ? musicCtx.activeSong.subtitle.slice(0, 40)+"...":musicCtx.activeSong.subtitle}</h6>
                    </div>
                    <MdFavoriteBorder className={styles.favColor}/>
                    {/* <MdFavorite className={styles.favColorActive}/> */}
                </div>
                <div className={styles.musicPlayerMiddlepart}>
                    <p className={styles.seekTimes}>{Math.floor(currTime/60)<=9? `0${Math.floor(currTime/60)}` : Math.floor(currTime/60)}:{Math.floor(currTime%60)<=9?`0${Math.floor(currTime%60)}`:Math.floor(currTime%60)}</p>
                    <IoCaretBack className={styles.musicPlayIcons} onClick={handlePrevSong}/>
                    <FaBackward className={styles.musicPlayIcons} onClick={handleBackward} />
                    {!isPlaying && <FaPlayCircle className={styles.musicPlayIcons} onClick={togglePlaying}/>}
                    {isPlaying && <FaPauseCircle className={styles.musicPlayIcons} onClick={togglePlaying}/>}
                    <FaForward className={styles.musicPlayIcons} onClick={handleForward}/>
                    <IoCaretForward className={styles.musicPlayIcons} onClick={handleNextSong}/>
                    <p className={styles.seekTimes}>{Math.floor(duration/60)<=9? `0${Math.floor(duration/60)}` : Math.floor(duration/60)}:{Math.floor(duration%60)<=9?`0${Math.floor(duration%60)}`:Math.floor(duration%60)}</p>
                </div>
                <div className={styles.musicPlayerRightpart}>
                    {(()=>{
                        if(musicCtx.volume == 0){
                            return <FaVolumeMute className={styles.volIcons}/>
                        }
                        else if(musicCtx.volume>0 && musicCtx.volume<3){
                            return <FaVolumeDown className={styles.volIcons}/>
                        }
                        else if(musicCtx.volume>3 && musicCtx.volume<6){
                            return <HiVolumeUp className={styles.volIcons}/>
                        }
                        else{
                            return <FaVolumeUp className={styles.volIcons}/>
                        }
                    })()}
                    
                    <input type="range" step="any" min={0} max={10} value={musicCtx.volume} onInput={updateVolume} className={styles.volInput}/>
                </div>
            </div>
            {musicCtx.activeSong && <audio src={musicCtx.activeSong.audioUrl} autoPlay ref={audioRef} onTimeUpdate={(e)=>{setCurrTime(e.target.currentTime)}} onLoadedData={(e)=>{setDuration(e.target.duration)}} onEnded={handleNextSong}/>}
        </>
    );
}