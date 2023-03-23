import { Navigation, Pagination, Scrollbar, A11y } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";
import styles from "./../../styles/Home.module.css";
import Image from "next/image";
import {AiFillPlayCircle} from "react-icons/ai";
import {HiPause} from "react-icons/hi";
import { useContext } from "react";
import MusicContext from "../../store/MusicContext";
import { useRouter } from "next/router";

export default function Musics({ musics }) {
  const musicCtx = useContext(MusicContext);
  const router = useRouter();

  return (
    <>
      <div className={styles.musicCollection}>
        {/* <Swiper
          modules={[Navigation, Pagination, Scrollbar, A11y]}
          spaceBetween={20}
          // slidesPerView={7}
          breakpoints={{
            // when window width is >= 768px
            1100: {
              slidesPerView: 6,
            },
            1000: {
              slidesPerView: 6,
            },
            900: {
              slidesPerView: 6,
            },
            440: {
              slidesPerView: 5,
            },
            200: {
              slidesPerView: 4,
            },
          }}
        //   navigation
        //   pagination={{ clickable: true }}
          // scrollbar={{ draggable: true }}
        > */}
          <>
              {musics &&
                  musics.map((songData, id) => {
                  return (
                      // <SwiperSlide key={id}>
                      <div className={styles.musicBox} key={id}>
                          <div className={styles.musicBoxImageDiv}>
                              <Image
                              src={songData.image? songData.image[songData.image.length-1].link: "/assets/no-image.png"}
                              height={100}
                              width={100}
                              alt="coverart_image"
                              className={styles.musicBoxImage}
                              onClick={()=>{musicCtx.updateSongIndex(id); musicCtx.playSong({ musicDp: songData.image? songData.image[songData.image.length-1].link: "/assets/no-image.png", id: songData.id, audioUrl: songData.downloadUrl[songData.downloadUrl.length-1].link, title: songData.name, subtitle: songData.primaryArtists})}}
                              />
                              {musicCtx.activeSong && musicCtx.activeSong.id === songData.id && musicCtx.isPlaying? <HiPause className={styles.playButtonIcon} />: <AiFillPlayCircle className={styles.playButtonIcon} />}
                              {musicCtx.activeSong && musicCtx.activeSong.id === songData.id && musicCtx.isPlaying && <Image src={"/assets/equalizer.svg"} height={30} width={30} alt="equalizer" className={styles.equalizerBox}/>}
                          </div>
                          <div className={styles.musicTitleSubtitle}>
                          <div className={styles.musicTitle} 
                          // onClick={()=>{router.push(`/music/${songData.track.key}`)}}
                          >
                              {songData.name.length>30 ? songData.name.slice(0,30)+"...":songData.name}
                          </div>
                          <div className={styles.musicSubtitle}>
                              {songData.primaryArtists.length > 40 ? songData.primaryArtists.slice(0, 40)+"...":songData.primaryArtists}
                          </div>
                          </div>
                      </div>
                      // {/* </SwiperSlide> */}
                  );
              })}
          </>
        {/* </Swiper> */}
        {/* {musicCtx.activeSong && <audio src={musicCtx.activeSong.audioUrl} autoPlay/>} */}
      </div>
    </>
  );
}
