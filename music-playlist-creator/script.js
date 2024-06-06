import { data } from "./data/data.js";

// console.log(data);

window.onload = function () {
  data.playlists.forEach((playlist, index) => {
    const sectionHtml = `
    <section id="${playlist.playlistID}" class="playlistitems">
      <img src="${playlist.playlist_art}" style="width: 300px; height: 300px; border-radius: 10px;">
      <h1>${playlist.playlist_name}</h1>
      <p>Created by ${playlist.playlist_creator}</p>
      <img id="likeButton${index}" src="./assets/img/likebutton.png" style="width: 30px; height: 30px;">
    </section>
    `;

    const playlistGrid = document.getElementById("playlistgrid");
    const sectionElement = document.createElement("div"); // Changed from "playlistitems" to "div"
    sectionElement.innerHTML = sectionHtml;
    playlistGrid.appendChild(sectionElement);

    const openmodal = document.getElementById(playlist.playlistID);
    openmodal.addEventListener("click", () => showmodal(playlist.playlistID, index));
    openmodal.addEventListener("click", () => fillsongs(playlist.playlistID, index));

    const likeButton = document.getElementById(`likeButton${index}`);
    likeButton.addEventListener('click', (event) => {
      event.stopPropagation(); // Prevents the modal from opening when the like button is clicked
      console.log("Like button clicked for playlist:", playlist.playlistID);
      if (likeButton.src.includes("likebutton.png")) {
          likeButton.src = "./assets/img/likebutton2.png";
      } else {
          likeButton.src = "./assets/img/likebutton.png";
      }
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

  <div id="topmodal">

  <div style="display: inline-flex; align-items: center;">
  <img
      id="imgplayinmodel"
      src="${data.playlists[playlistID].playlist_art}"
      style="
        width: 180px;
        height: 180px;
        border-radius: 10px;
        margin-right: auto;
        margin-bottom: 10px; /* Add some bottom margin to separate the image from the header text */
      "
  />
  <div style="padding-left: 10px;">
      <h1 style="font-size: 22pt">
          ${data.playlists[playlistID].playlist_name}
      </h1>
      <p style="color: gray">
          Created by ${data.playlists[playlistID].playlist_creator}
      </p>
  </div>
</div>



  
<div style="  padding-bottom: 15px;" id="shufflebuttondiv">
<button id="shuttlebutton">Shuffle</button>
</div>
</div>

<div>
<div class="scroll-container">
<ul id="cardsgohere" class="scroll-list">


</ul>
</div>
</div>

`;
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
