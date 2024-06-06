import { data } from "./data/data.js";
//  location.reload();

// console.log(data);







window.onload = function () {
  data.playlists.forEach((playlist, index) => {
    playlist.likeCount = 0;

    const sectionHtml = `


  <section id="${playlist.playlistID}" class="playlistitems">

  <div style="position: relative;">
  <div id="deleteList${index}" style="font-size: 20pt; color: black; position: absolute; top: -50px; right: -25px; z-index: 1;">
  <p>X</p>
</div>

    <img src="${playlist.playlist_art}" style="width: 300px; height: 300px; border-radius: 10px;">
    <h1>${playlist.playlist_name}</h1>
    <p>Created by ${playlist.playlist_creator}</p>
    <div style="display: flex; align-items: center; padding: 12px;">
      <img id="likeButton${index}" src="./assets/img/likebutton.png" style="padding: 4px; width: 30px; height: 30px;">
      <span id="likeCount${index}">${playlist.likeCount}</span>
    </div>
  </section>
</div>
`;
    const playlistGrid = document.getElementById("playlistgrid");
    const sectionElement = document.createElement("div"); 
    sectionElement.innerHTML = sectionHtml;
    playlistGrid.appendChild(sectionElement);

    const openmodal = document.getElementById(playlist.playlistID);
    openmodal.addEventListener("click", () => showmodal(playlist.playlistID, index));
    openmodal.addEventListener("click", () => fillsongs(playlist.playlistID, index));

    const likeButton = document.getElementById(`likeButton${index}`);
    const likeCountDisplay = document.getElementById(`likeCount${index}`);
    likeButton.addEventListener('click', (event) => {
      event.stopPropagation(); 
      console.log("Like button clicked for playlist:", playlist.playlistID);
      if (playlist.likeCount === 0) {
          likeButton.src = "./assets/img/likebutton2.png";
      }
      playlist.likeCount++;
      likeCountDisplay.textContent = playlist.likeCount;
    });





    //STRETCH GOAL BELOW
  const deleteButton = document.getElementById(`deleteList${index}`);
  deleteButton.addEventListener('click', (event) => {
    event.stopPropagation();
    console.log("Delete button clicked, event propagation stopped.");
    sectionElement.remove(); 
    //STRETCH GOAL ABOVE





  });
  });







};




const closemodal = document.getElementById("closemodal");
closemodal.addEventListener("click", () => closethemodal());

function closethemodal() {
  const modal = document.getElementById("modal");
  const overlay = document.getElementById("overlay");

  modal.style.display = "none";
  overlay.style.display = "none";
}



function showmodal(playlistID) {
  const modal = document.getElementById("modal");
  const overlay = document.getElementById("overlay");

  modal.style.display = "block";
  overlay.style.display = "block";

  const displayDiv = document.getElementById("codegoeshere");

  displayDiv.innerHTML = `
    <div class="fullopac" id="topmodal">
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
      <div style="padding-bottom: 15px;" id="shufflebuttondiv">
        <button id="shufflebutton">Shuffle</button>
      </div>
    </div>
    <div>
      <div class="scroll-container">
        <ul id="cardsgohere" class="scroll-list"></ul>
      </div>
    </div>
  `;


  document.getElementById("shufflebutton").addEventListener("click", () => shuffleSongs(playlistID));
  
  fillsongs(playlistID); 
}

function shuffleSongs(playlistID) {
  const playlist = data.playlists.find(pl => pl.playlistID === parseInt(playlistID));
  const songsArray = playlist.songs;
  
  for (let i = songsArray.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [songsArray[i], songsArray[j]] = [songsArray[j], songsArray[i]];
  }
  
  const displayDiv = document.getElementById("cardsgohere");
  displayDiv.innerHTML = '';
  
  songsArray.forEach((song) => {
    const songCard = `
      <li style="padding-top: 10px;" class="songitemcard">
        <div style="flex: 0 0 auto; margin-right: 20px; border-radius: 10px;">
          <img src="${song.cover_art}" style="border-radius: 10px; width: 120px; height: 120px; margin-left: 10px;" />
        </div>
        <div style="flex: 1; text-align: left">
          <h1>${song.title}</h1>
          <p>${song.artist}</p>
          <p>${song.album}</p>
        </div>
        <div style="flex: 0 0 auto; text-align: right; align-self: center;">
          <p>${song.duration}</p>
        </div>
      </li>`;
    displayDiv.innerHTML += songCard;
  });
}


function fillsongs(playlistId) {
  const playlist = data.playlists.find(
    (pl) => pl.playlistID === parseInt(playlistId)
  );

  const displayDiv = document.getElementById("cardsgohere");

  playlist.songs.forEach((song) => {
    const songCard = `
      <li style="padding-top: 10px;" class="songitemcard">
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






