import { data } from "./data/data.js";

// console.log(data);

window.onload = function () {
  data.playlists.forEach((playlist, index) => {
    // console.log(playlist.playlist_art);
    // console.log(data.playlists[index].playlist_art);

    const sectionHtml = `
    <section id="${playlist.playlistID}" class="playlistitems">
      <img src="${playlist.playlist_art}" style="width: 300px; height: 300px; border-radius: 10px;">
      <h1>${playlist.playlist_name}</h1>
      <p>Created by ${playlist.playlist_creator}</p>
      <img src="./assets/img/likebutton.png" style="width: 30px; height: 30px;">
    </section>
  `;

    const playlistGrid = document.getElementById("playlistgrid");

    const sectionElement = document.createElement("playlistitems");
    sectionElement.innerHTML = sectionHtml;
    playlistGrid.appendChild(sectionElement);

    const openmodal = document.getElementById("playlistgrid");
    openmodal.addEventListener("click", () => showmodal(playlist.playlistID));
  });



  

};

const closemodal = document.getElementById("closemodal");
closemodal.addEventListener("click", () => closethemodal());


function closethemodal(){

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

  displayDiv.innerHTML = "<p>test</p>"
  displayDiv.innerHTML = `

  <div id="topmodal">
  <div style="display: flex; align-items: center; justify-content: space-between;">
      <img
          id="imgplayinmodel"
          src="./assets/img/playlist.png"
          style="
            width: 180px;
            height: 180px;
            border-radius: 10px;
            margin-right: auto;
          "
      />
      <div>
          <h1 style="padding-left: 20px; font-size: 22pt">
              That Summer '16 Feeling
          </h1>
          <p style="padding-left: 20px; color: gray">
              Created by Groovev Gaurdian
          </p>
      </div>
  </div>

<div id="shufflebuttondiv">
<button id="shuttlebutton">Shuffle</button>
</div>
</div>

<div>
<div class="scroll-container">
<ul class="scroll-list">
  <li class="songitemcard">
    <div
      style="
        flex: 0 0 auto;
        margin-right: 20px;
        border-radius: 10px;
      "
    >
      <img
        src="./assets/img/song.png"
        style="
          border-radius: 10px;
          width: 120px;
          height: 120px;
          padding-left: 10px;
        "
      />
    </div>
    <div style="flex: 1; text-align: left">
      <h1>One Dance</h1>
      <p>Drake</p>
      <p>Views</p>
    </div>
    <div
      style="
        flex: 0 0 auto;
        text-align: right;
        align-self: center;
      "
    >
      <p>2:53</p>
    </div>
  </li>
</ul>
</div>
</div>




`;

}