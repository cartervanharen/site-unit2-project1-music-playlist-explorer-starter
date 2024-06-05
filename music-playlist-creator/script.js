console.log("test1")

import { data } from './data/data.js';

console.log(data)

console.log("test")

window.onload = function () {
  const playlistGrid = document.getElementById("playlistgrid");

  data.playlists.forEach((playlist, index) => { 
    const section = document.createElement("section");
    section.className = "playlistitems";
    section.id = `playlist_name${index + 1}`;


    const imgPlaylist = document.createElement("img");
    imgPlaylist.src = playlist.playlist_art; 
    imgPlaylist.style = "width: 300px; height: 300px; border-radius: 10px;";

    const title = document.createElement("h1");
    title.textContent = playlist.playlist_name; 

    const creator = document.createElement("p");
    creator.textContent = `Created by ${playlist.playlist_creator}`; 
    
    const imgLike = document.createElement("img");
    imgLike.src = "./assets/img/likebutton.png" 
    imgLike.style = "width: 30px; height: 30px;";

    section.appendChild(imgPlaylist);
    section.appendChild(title);
    section.appendChild(creator);
    section.appendChild(imgLike);

    playlistGrid.appendChild(section);

    



    

  });







  
};