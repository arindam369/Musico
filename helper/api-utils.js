// export async function searchSongByName(song_name){
//     const options = {
//         method: 'GET',
//         headers: {
//             'X-RapidAPI-Key': process.env.NEXT_PUBLIC_SHAZAM_RAPID_API_KEY,
//             'X-RapidAPI-Host': 'shazam-core.p.rapidapi.com'
//         }
//     };
//     return await fetch(`${process.env.NEXT_PUBLIC_SHAZAM_MULTI_SEARCH_URL}?query=${song_name}&search_type=SONGS_ARTISTS`, options).then((response)=>{
//         return response.json();
//     }).then((response)=>{
//         return response;
//     }).catch((err)=>{
//         return err;
//     })
// }