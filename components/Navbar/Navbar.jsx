import styles from "./../../styles/Home.module.css";
import {FaHome} from "react-icons/fa";
import {TbWorld} from "react-icons/tb";
import {SiBeatsbydre} from "react-icons/si";
import {HiChartSquareBar} from "react-icons/hi";
import {IoMdSearch} from "react-icons/io";
import {GiHamburgerMenu} from "react-icons/gi";
import {RiFocus2Line} from "react-icons/ri";
import {IoCloseSharp} from "react-icons/io5";
import { useContext, useState } from "react";
import MusicContext from "../../store/MusicContext";

export default function Navbar(){

    const [visibleSidebar, setVisibleSidebar] = useState(false);
    const [searchQuery, setSearchQuery] = useState("");

    const musicCtx = useContext(MusicContext);

    function toggleSidebar(){
        setVisibleSidebar(!visibleSidebar);
    }
    function handleSearchSong(){
        if(searchQuery.trim() !== ""){
            musicCtx.searchSongsByQuery(searchQuery);
            setSearchQuery("");
        }
    }

    function handleKeyDown(e){
        if(e.key === "Enter"){
          handleSearchSong();
        }
    }

    return (
        <>
            <nav className={styles.navBar}>
                {!visibleSidebar && <GiHamburgerMenu className={styles.hamburgerIcon} onClick={toggleSidebar}/>}
                
                <div className={styles.logo}>Musico</div>
                <div className={styles.navElements}>
                        <li className={styles.navElement} onClick={() => {musicCtx.discoverSongs()}} ><FaHome className={styles.navIcons}/> Discover Songs</li>
                        <li className={styles.navElement} onClick={() => {musicCtx.getFocusSongs()}}><RiFocus2Line className={styles.navIcons} />Focus</li>
                        {/* <li className={styles.navElement}><SiBeatsbydre className={styles.navIcons}/> Top Artists</li>
                        <li className={styles.navElement}><HiChartSquareBar className={styles.navIcons}/> Top Charts</li> */}
                </div>
                    <div className={visibleSidebar?"sidebarElements active":"sidebarElements"}>
                        {visibleSidebar && <IoCloseSharp className={styles.closeIcon} onClick={toggleSidebar}/>}
                        <div className={styles.sidebarLogo}>Musico</div>
                        <li className={styles.navElement} onClick={() => {musicCtx.discoverSongs();               setVisibleSidebar(false);}}><FaHome className={styles.navIcons}/> Discover Songs</li>
                        <li className={styles.navElement} onClick={() => {musicCtx.getFocusSongs();               setVisibleSidebar(false);}}><RiFocus2Line className={styles.navIcons}/> Focus</li>
                        {/* <li className={styles.navElement}><SiBeatsbydre className={styles.navIcons}/> Top Artists</li> */}
                        {/* <li className={styles.navElement}><HiChartSquareBar className={styles.navIcons}/> Top Charts</li> */}
                    </div>
                <div className={styles.searchBar}>
                    <input type="text" placeholder="What music do you like to listen to?" value={searchQuery} onChange={(e)=>{setSearchQuery(e.target.value)}} onKeyDown={handleKeyDown}/>
                    <IoMdSearch className={styles.searchIcon} onClick={handleSearchSong}/>
                </div>
            </nav>
        </>
    );
}