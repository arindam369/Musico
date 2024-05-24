import { Navigation, Pagination, Scrollbar, A11y } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";
import { RecommendedArtists } from "../../helper/artists";
import Image from "next/image";
import styles from "../../styles/Home.module.css";
import { useContext } from "react";
import MusicContext from "../../store/MusicContext";

export default function Artists(){

    const musicCtx = useContext(MusicContext);

    return (
        <>
            <Swiper
                modules={[Navigation, Pagination, Scrollbar, A11y]}
                spaceBetween={20}
                // slidesPerView={7}
                breakpoints={{
                // when window width is >= 768px
                1150: {
                    slidesPerView: 7,
                },
                1000: {
                    slidesPerView: 6,
                },
                970: {
                    slidesPerView: 6,
                },
                810: {
                    slidesPerView: 5,
                },
                655: {
                    slidesPerView: 4,
                },
                500: {
                    slidesPerView: 3,
                },
                200: {
                    slidesPerView: 2,
                },
            }}
            //   navigation
            //   pagination={{ clickable: true }}
            // scrollbar={{ draggable: true }}
            >
                {
                    RecommendedArtists.map((artist)=>{
                        return (
                            <SwiperSlide key={artist.key}>
                                <div className={styles.artistBox} onClick={()=>{
                                    musicCtx.searchSongsByQuery(artist.name);
                                }}>
                                    <Image src={"/assets/artists/" + artist.image} height={250} width={250} alt="artist_image" className={styles.artistImage}/>
                                    <h3 className={styles.artistName}>{artist.name}</h3>
                                </div>
                            </SwiperSlide>
                        )
                    })
                }


            </Swiper>

            <div className={styles.centerText}>Swipe to see more artists</div>
        </>
    )
}