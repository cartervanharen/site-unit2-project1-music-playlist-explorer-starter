import { data } from "./data/data.js";
//  location.reload();

// console.log(data);

function makeplaylistcard(playid, index, art, playname, creator, likecount) {
  return `
  <section id="${playid}" class="playlistitems">

  <div style="position: relative;">
  <div class="deletelistclass" id="deleteList${index}">
  <p>X</p>
</div>

    <img class="plistfart" src="${art}" >
    <h1>${playname}</h1>
    <p>Created by ${creator}</p>
    <div class=pplistdiv">
      <img class=likebuttonlike id="likeButton${index}" src="./assets/img/likebutton.png">
      <span id="likeCount${index}">${likecount}</span>
    </div>
  </section>
</div>
`;
}

var indexcount = 10000;

function makemanualplaylist(playid, art, playname, creator, likecount) {
  let index = indexcount;
  indexcount++;

  const sectionHtml = makeplaylistcard(
    playid,
    index,
    art,
    playname,
    creator,
    likecount
  );
  const playlistGrid = document.getElementById("playlistgrid");
  const sectionElement = document.createElement("div");
  sectionElement.innerHTML = sectionHtml;
  playlistGrid.appendChild(sectionElement);

  const openmodal = document.getElementById(playid);
  openmodal.addEventListener("click", () => {
    showmodal(playid, index);
    fillsongs(playid, index);
  });

  const modal = document.getElementById("modal");
  const overlay = document.getElementById("overlay");
  modal.style.display = "block";
  overlay.style.display = "block";

  const displayDiv = document.getElementById("codegoeshere");
  displayDiv.innerHTML = `
      <div class="fullopac" id="topmodal">
          <div style="display: inline-flex; align-items: center;">
              <img id="imgplayinmodel" class="plistart1" src="${art}"/>
              <div style="padding-left: 10px;">
                  <h1 style="font-size: 22pt">${playname}</h1>
                  <p style="color: gray">Created by ${creator}</p>
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

  document
    .getElementById("shufflebutton")
    .addEventListener("click", () => shuffleSongs(playid));

  const likeButton = document.getElementById(`likeButton${index}`);
  const likeCountDisplay = document.getElementById(`likeCount${index}`);
  likeButton.addEventListener("click", (event) => {
    event.stopPropagation();
    likecount++;
    likeButton.src = "./assets/img/likebutton2.png";
    likeCountDisplay.textContent = likecount;
  });

  const deleteButton = document.getElementById(`deleteList${index}`);
  deleteButton.addEventListener("click", (event) => {
    event.stopPropagation();
    sectionElement.remove();
  });
}

window.onload = function () {
  data.playlists.forEach((playlist, index) => {
    playlist.likeCount = 0;

    const sectionHtml = makeplaylistcard(
      playlist.playlistID,
      index,
      playlist.playlist_art,
      playlist.playlist_name,
      playlist.playlist_creator,
      playlist.likeCount
    );

    const playlistGrid = document.getElementById("playlistgrid");
    const sectionElement = document.createElement("div");
    sectionElement.innerHTML = sectionHtml;
    playlistGrid.appendChild(sectionElement);

    const openmodal = document.getElementById(playlist.playlistID);
    openmodal.addEventListener("click", () =>
      showmodal(playlist.playlistID, index)
    );
    openmodal.addEventListener("click", () =>
      fillsongs(playlist.playlistID, index)
    );

    const likeButton = document.getElementById(`likeButton${index}`);
    const likeCountDisplay = document.getElementById(`likeCount${index}`);
    likeButton.addEventListener("click", (event) => {
      event.stopPropagation();
      if (playlist.likeCount === 0) {
        likeButton.src = "./assets/img/likebutton2.png";
      }
      playlist.likeCount++;
      likeCountDisplay.textContent = playlist.likeCount;
    });

    //STRETCH GOAL BELOW
    const deleteButton = document.getElementById(`deleteList${index}`);
    deleteButton.addEventListener("click", (event) => {
      event.stopPropagation();
      console.log("Delete button clicked, event propagation stopped.");
      sectionElement.remove();
      //STRETCH GOAL ABOVE
    });
  });

  //makemanualplaylist('test', 111, "test","test","test", 44)
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
        <img id="imgplayinmodel" class=plistart1 src="${data.playlists[playlistID].playlist_art}"/>
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

  document
    .getElementById("shufflebutton")
    .addEventListener("click", () => shuffleSongs(playlistID));

  fillsongs(playlistID);
}

function shuffleSongs(playlistID) {
  const playlist = data.playlists.find(
    (pl) => pl.playlistID === parseInt(playlistID)
  );
  const songsArray = playlist.songs;

  for (let i = songsArray.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [songsArray[i], songsArray[j]] = [songsArray[j], songsArray[i]];
  }

  const displayDiv = document.getElementById("cardsgohere");
  displayDiv.innerHTML = "";

  songsArray.forEach((song) => {
    const songCard = makesongcard(
      song.cover_art,
      song.title,
      song.artist,
      song.album,
      song.duration
    );

    displayDiv.innerHTML += songCard;
  });
}

function fillsongs(playlistId) {
  const playlist = data.playlists.find(
    (pl) => pl.playlistID === parseInt(playlistId)
  );

  const displayDiv = document.getElementById("cardsgohere");

  playlist.songs.forEach((song) => {
    const songCard = makesongcard(
      song.cover_art,
      song.title,
      song.artist,
      song.album,
      song.duration
    );

    displayDiv.innerHTML += songCard;
  });
}

function makesongcard(art, title, artist, album, duration) {
  return `
  <li style="padding-top: 10px;" class="songitemcard">
    <div style="flex: 0 0 auto; margin-right: 20px; border-radius: 10px;">
      <img src="${art}" style="border-radius: 10px; width: 120px; height: 120px; margin-left: 10px;" />
    </div>
    <div style="flex: 1; text-align: left">
      <h1>${title}</h1>
      <p>${artist}</p>
      <p>${album}</p>
    </div>
    <div style="flex: 0 0 auto; text-align: right; align-self: center;">
      <p>${duration}</p>
    </div>
  </li>`;
}

//makesongcard("a","a","a","a","a");

document.getElementById("searchBox").addEventListener("input", function () {
  console.log(this.value)




  var searchQuery = this.value;

  if (searchQuery.length > 0) {
    handleSearch(searchQuery);
  }
});

function handleSearch(query) {
  const playlistGrid = document.getElementById("playlistgrid");
  playlistGrid.innerHTML = "";

  const filteredPlaylists = data.playlists.filter((playlist) => {
    return (
      playlist.playlist_name.toLowerCase().includes(query.toLowerCase()) ||
      playlist.playlist_creator.toLowerCase().includes(query.toLowerCase())
    );
  });

  filteredPlaylists.forEach((playlist, index) => {
    const sectionHtml = makeplaylistcard(
      playlist.playlistID,
      index,
      playlist.playlist_art,
      playlist.playlist_name,
      playlist.playlist_creator,
      playlist.likeCount
    );


    
    const sectionElement = document.createElement("div");
    sectionElement.innerHTML = sectionHtml;
    playlistGrid.appendChild(sectionElement);

    showsorted(playlist, sectionElement, index);
  });
}

function showsorted(playlist, sectionElement, index) {
  const openmodal = document.getElementById(playlist.playlistID);
  openmodal.addEventListener("click", () => {
    showmodal(playlist.playlistID, index);
    fillsongs(playlist.playlistID, index);
  });

  const likeButton = document.getElementById(`likeButton${index}`);
  const likeCountDisplay = document.getElementById(`likeCount${index}`);

  if (playlist.likeCount > 0){
    likeButton.src = "./assets/img/likebutton2.png";

  }
  likeButton.addEventListener("click", (event) => {
    event.stopPropagation();
    playlist.likeCount++;
    likeButton.src = "./assets/img/likebutton2.png";
    likeCountDisplay.textContent = playlist.likeCount;
  });

  const deleteButton = document.getElementById(`deleteList${index}`);
  deleteButton.addEventListener("click", (event) => {
    event.stopPropagation();
    sectionElement.remove();
  });
}
