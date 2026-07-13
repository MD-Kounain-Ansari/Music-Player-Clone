console.log("Lets Start");
let currentSong = new Audio();
let songs ;

function secondsToMinutesSeconds(seconds) {
    if (isNaN(seconds) || seconds < 0) {
        return "00:00";
    }

    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = Math.floor(seconds % 60);

    const formattedMinutes = String(minutes).padStart(2, '0');
    const formattedSeconds = String(remainingSeconds).padStart(2, '0');

    return `${formattedMinutes}:${formattedSeconds}`;
}


 songs = [
  {
    title: "Kalyani",
    artist: "Shreya Ghoshal",
    file: "songs/Kalyani Song.mp3",
  },
  {
    title: "Tareefan",
    artist: "Karan Aujla , Divine",
    file: "songs/Tareefan - Karan Aujla.mp3",
  },
  {
    title: "Udi Udi",
    artist: "Aneesh , Sarkar ",
    file: "songs/Udi Udi Song.mp3",
  },
   {
    title: "Knightridah",
    artist: "Imran Kan ",
    file: "songs/Knightridah - Imran Khan.mp3",
  },
];

function playMusic(songName , pause = false)  {
    let selectedSong = songs.find((song) => {
        return song.title === songName ;
    });
    currentSong.src = selectedSong.file;
    if (!pause) {
       currentSong.play();
       play.src = "images/pause.svg" 
    }
    
    document.querySelector(".songinfo").innerHTML = selectedSong.title + " - " + selectedSong.artist ;
    document.querySelector(".songtime").innerHTML = "00:00 / 00:00" ;
}

function getSongs() {
  for (let i = 0; i < songs.length; i++) {
    let allSongs = songs[i].file;
  }

  playMusic(songs[0].title , true);
  
  let SongUL = document
    .querySelector(".songList")
    .getElementsByTagName("ul")[0];
  for (const song of songs) {
    SongUL.innerHTML =
      SongUL.innerHTML +
      `
        <li>
                <img class="invert" src="images/music.svg" alt="">
                <div class="info">
                    <div>${song.title} </div>
                    <div>Kounain</div>
                </div>
                <div class="playnow">
                <span>Play Now</span>
                <img class="invert" src="images/play.svg" alt="">
                </div>
               </li>
        `;
  }

  
  Array.from(document.querySelector(".songList").getElementsByTagName("li")).forEach(e => {
    e.addEventListener("click" , element => {
        playMusic(e.querySelector(".info").firstElementChild.innerHTML.trim());
    })
    
  });

  let play = document.querySelector("#play");
    play.addEventListener("click" ,() => {
        if (currentSong.paused) {
            currentSong.play()
            play.src = "images/pause.svg"
        } else {
            currentSong.pause()
            play.src = "images/play.svg"
        }
    })

    currentSong.addEventListener("timeupdate" , ()=> {
        document.querySelector(".songtime").innerHTML = ` ${secondsToMinutesSeconds(currentSong.currentTime)} /
        ${secondsToMinutesSeconds(currentSong.duration)} `
        document.querySelector(".circle").style.left = (currentSong.currentTime / currentSong.duration) *100 + "%" ;
    });

    document.querySelector(".seekbar").addEventListener("click" , (e) => {
        let percent = (e.offsetX / e.target.getBoundingClientRect().width) * 100 ;
        document.querySelector(".circle").style.left = percent  + "%" ;
        currentSong.currentTime = ((currentSong.duration) * percent) / 100 ;
    })

    document.querySelector(".hamburger").addEventListener("click" , ()=> {
        document.querySelector(".left").style.left = "0";
    })

    document.querySelector(".close").addEventListener("click" , ()=> {
         document.querySelector(".left").style.left = "-120%";
    })

    document.querySelector("#prev").addEventListener("click" , () => {
        let index = songs.findIndex((song) => {
            return decodeURIComponent(currentSong.src).includes(song.file);
        });
        if (index > 0 ) {
            playMusic(songs[index - 1].title) ;
        } else if (index === 0) {  
                playMusic(songs[songs.length - 1].title) 
        }
    })

    document.querySelector("#next").addEventListener("click" , () => {
        let index = songs.findIndex((song) => {
            return decodeURIComponent(currentSong.src).includes(song.file);
        });
        if (index < songs.length - 1 ) {
            playMusic(songs[index + 1].title)
        }else if (index === songs.length - 1) { 
            playMusic(songs[0].title)
        }
    })

    document.querySelector(".range").getElementsByTagName("input")[0].addEventListener("change" , (e) => {
         console.log("setting Volume to " , e.target.value , " / 100");
        currentSong.volume = parseInt(e.target.value)/100 ;
        if (Number(e.target.value) === 0) {
            document.querySelector(".volume img").src = "images/mute.svg"
        } else {
            document.querySelector(".volume img").src = "images/volume.svg"
        }
    })

   document.querySelectorAll(".card").forEach((card , index) => {
    card.addEventListener("click", ()=> {
      playMusic(songs[index].title);
    });
   });


  }
  
getSongs() ;
