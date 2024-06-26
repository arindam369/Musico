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
  query: "",
  limits: "",
  searchSongsByQuery: () => {},
  getInstrumentalSongs: ()=>{},
  getTrendingSongs: ()=>{},
  playSong: (song_id) => {},
  updateVolume: (vol)=>{},
  getSongDetails: (song_id)=>{},
  updatePlaying: (isNowPlaying)=>{},
  loadSongs: (query, limits)=>{}
});

export const MusicContextProvider = (props) => {
  const [songs, setSongs] = useState(null);
  const [query, setQuery] = useState(null);
  const [limits, setLimits] = useState(null);
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
    setQuery(query);
    setLimits(15);
    await fetch(
      `${process.env.NEXT_PUBLIC_SEARCH_URL}?query=${query}&page=1&limit=15`,
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
    searchSongsByQuery("FOCus");
    setHeading("Focus");
  }
  const loadSongs = async (query, newLimits)=>{
    await fetch(
      `${process.env.NEXT_PUBLIC_SEARCH_URL}?query=${query}&page=1&limit=${newLimits}`,
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
    setLimits(newLimits);
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
    query: query,
    limits: limits,
    searchSongsByQuery: searchSongsByQuery,
    playSong: playSong,
    updateVolume: updateVolume,
    updateSongIndex: updateSongIndex,
    updateActiveSong: updateActiveSong,
    playAndGetDetails: playAndGetDetails,
    discoverSongs: discoverSongs,
    getFocusSongs: getFocusSongs,
    updatePlaying: updatePlaying,
    loadSongs: loadSongs
  };

  return (
    <MusicContext.Provider value={musicContext}>
      {props.children}
    </MusicContext.Provider>
  );
};
export default MusicContext;
