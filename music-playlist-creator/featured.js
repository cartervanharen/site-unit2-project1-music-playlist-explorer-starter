import { data } from "./data/data.js";

window.onload = function () {
    console.log("featurejsworkign")
    console.log(getRandomPlaylistID)

    const playlistID= getRandomPlaylistID()




      
        const displayDiv = document.getElementById("featuredstuff");
      
        displayDiv.innerHTML = `
          <div class="featbody" id="topmodal">
            <div style="display: inline-flex; align-items: center;">
              <img
                id="imgplayinmodel"
                src="${data.playlists[playlistID].playlist_art}"
                style="  opacity: 100%;  width: 180px; height: 180px; border-radius: 10px; margin-right: auto; margin-bottom: 10px;"
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
      
     
  

}








function getRandomPlaylistID() {
    const playlists = data.playlists;
    const randomIndex = Math.floor(Math.random() * playlists.length);
    const randomPlaylistID = playlists[randomIndex].playlistID;
    return randomPlaylistID;
  }
  