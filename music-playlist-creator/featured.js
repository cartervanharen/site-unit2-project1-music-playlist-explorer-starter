import { data } from "./data/data.js";

window.onload = function () {
    console.log("featurejsworkign")
    console.log(getRandomPlaylistID)

    const playlistID= getRandomPlaylistID()




      
        const displayDiv = document.getElementById("featuredstuff");
      
        displayDiv.innerHTML = `
          <div style="padding=30px" class="featbody" id="topmodal">
            <div style="display: inline-flex; align-items: center;">
              <img
                id="imgplayinmodel"
                src="${data.playlists[playlistID].playlist_art}"
                style="  opacity: 100%;  width: 300px; height: 300px; border-radius: 10px; margin-right: 30px; margin-bottom: 10px;"
              />
              <div style="padding-left: 10px;">
                <h1 style="font-size: 22pt">${data.playlists[playlistID].playlist_name}</h1>
                <p style="color: gray">Created by ${data.playlists[playlistID].playlist_creator}</p>
              </div>
            </div>
            </div>
          </div>
          <div>
            <div class="scroll-container">
              <ul id="cardsgohere" class="scroll-list"></ul>
            </div>
          </div>
        `;
      
     

  
        fillsongs(playlistID)
}





function fillsongs(playlistId) {
    const playlist = data.playlists.find(
      (pl) => pl.playlistID === parseInt(playlistId)
    );
  
    const displayDiv = document.getElementById("showsongshere");
  
    playlist.songs.forEach((song) => {
      const songCard = `
        <li style="padding-top: 10px;" class="songitemcard2">
          <div
            style="
              flex: 0 0 auto;
              margin-right: 20px;
              border-radius: 10px;
            "
          >
            <img
              src="${song.cover_art}"
              style="
                border-radius: 10px;
                width: 120px;
                height: 120px;
                margin-left: 10px;
              "
            />
          </div>
          
          <div style="flex: 1; text-align: left">
            <h1>${song.title}</h1>
            <p>${song.artist}</p>
            <p>${song.album}</p>
          </div>
          
          <div
            style="
              flex: 0 0 auto;
              text-align: right;
              align-self: center;
            "
          >
            <p>${song.duration}</p>
          </div>
        </li>`;
  
      displayDiv.innerHTML += songCard;
    });
  }
  
  
  
  
  
  
  
  
  




function getRandomPlaylistID() {
    const playlists = data.playlists;
    const randomIndex = Math.floor(Math.random() * playlists.length);
    const randomPlaylistID = playlists[randomIndex].playlistID;
    return randomPlaylistID;
  }
  