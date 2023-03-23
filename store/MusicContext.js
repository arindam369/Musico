import React, { useEffect } from "react";
import { useState } from "react";

const MusicContext = React.createContext({
  songs: [],
  instrumentalSongs: [],
  trendingSongs: [],
  activeSong: {},
  heading: "",
  volume: "",
  songDetails: {},
  isPlaying: "",
  searchSongsByQuery: () => {},
  getInstrumentalSongs: ()=>{},
  getTrendingSongs: ()=>{},
  playSong: (song_id) => {},
  updateVolume: (vol)=>{},
  getSongDetails: (song_id)=>{},
  updatePlaying: (isNowPlaying)=>{}
});

export const MusicContextProvider = (props) => {
  const [songs, setSongs] = useState(null);
  // const [instrumentalSongs, setInstrumentalSongs] = useState(null);
  // const [trendingSongs, setTrendingSongs] = useState(null);
  const [heading, setHeading] = useState("Recommended Artists");
  const [activeSong, setActiveSong] = useState(null);
  const [volume, setVolume] = useState(5);
  const [songDetails, setSongDetails] = useState(null);
  const [songIndex, setSongIndex] = useState(null);
  const [isPlaying, setIsplaying] = useState(false);

  const searchSongsByQuery = async (query) => {
    setHeading(`Search Results for '${query}'`);
    await fetch(
      `${process.env.NEXT_PUBLIC_SEARCH_URL}?query=${query}`,
    )
      .then((response) => {
        return response.json();
      })
      .then((response) => {
        setSongs(response.data.results);
        return response;
      })
      .catch((err) => {
        return err;
      });
  };
  const discoverSongs = ()=>{
    setHeading("Recommended Artists");
  }
  const getFocusSongs = () => {
    console.log("Focus");
    searchSongsByQuery("FOCus");
    setHeading("Focus");
  }

  const updatePlaying = (isNowPlaying)=>{
    setIsplaying(isNowPlaying);
  }

  const updateSongIndex = (index)=>{
    setSongIndex(index);
  }
  const updateActiveSong = (songData)=>{
    setActiveSong(songData);
    
    // if(songData){
    //   getSongDetails(songData.title, songData.subtitle);
    // }
  }

  const playSong = (songData) => {      // update which song is now active
    if(!activeSong){    // no song is now active
      setActiveSong(songData);
      setIsplaying(true);
      return;
    }
    if (activeSong && activeSong.id !== songData.id) {  // any non-active song
      setActiveSong(songData);
      setIsplaying(true);
      return;
    }
    if(activeSong && activeSong.id === songData.id && isPlaying){
      setIsplaying(false);  // active song was playing
    }
    else{
      setIsplaying(true);   // active song was not playing
    }
  };
  const playAndGetDetails = (songData) => {      // update which song is now active
    setIsplaying(true);
    updateActiveSong(songData);
  };
  const updateVolume = (vol)=>{
    setVolume(vol);
  }


  const musicContext = {
    songs: songs,
    songIndex: songIndex,
    activeSong: activeSong,
    heading: heading,
    volume: volume,
    songDetails: songDetails,
    isPlaying: isPlaying,
    searchSongsByQuery: searchSongsByQuery,
    playSong: playSong,
    updateVolume: updateVolume,
    updateSongIndex: updateSongIndex,
    updateActiveSong: updateActiveSong,
    playAndGetDetails: playAndGetDetails,
    discoverSongs: discoverSongs,
    getFocusSongs: getFocusSongs,
    updatePlaying: updatePlaying
  };

  return (
    <MusicContext.Provider value={musicContext}>
      {props.children}
    </MusicContext.Provider>
  );
};
export default MusicContext;
