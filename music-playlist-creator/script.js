import { data } from "./data/data.js";

// console.log(data);

window.onload = function () {
  const playlistGrid = document.getElementById("playlistgrid");
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

    const sectionElement = document.createElement("playlistitems");
    sectionElement.innerHTML = sectionHtml;
    playlistGrid.appendChild(sectionElement);

    const openmodal = document.getElementById("playlistgrid");
    openmodal.addEventListener("click", () => showmodal(playlist.playlistID));
  });
};

function showmodal(playlistID) {
  const modal = document.getElementById("modal");
  const overlay = document.getElementById("overlay");

  modal.style.display = "block";
  overlay.style.display = "block";
}
