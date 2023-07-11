const showCoffees = () => {

}

document.addEventListener("DOMContentLoaded", showCoffees);
if ("serviceWorker" in navigator) {
  window.addEventListener("load", function () {
    navigator.serviceWorker
      .register("/serviceWorker.js")
      .then(res => console.log("service worker registered"))
      .catch(err => console.log("service worker not registered", err))
  })
}
let now_playing = document.querySelector('.now-playing');
let track_art = document.querySelector('.track-art');
let track_name = document.querySelector('.track-name');
let track_artist = document.querySelector('.track-artist');

let playpause_btn = document.querySelector('.playpause-track');
let next_btn = document.querySelector('.next-track');
let prev_btn = document.querySelector('.prev-track');

let seek_slider = document.querySelector('.seek_slider');
let volume_slider = document.querySelector('.volume_slider');
let curr_time = document.querySelector('.current-time');
let total_duration = document.querySelector('.total-duration');
let wave = document.getElementById('wave');
let randomIcon = document.querySelector('.fa-random');
let curr_track = document.createElement('audio');

let track_index = 0;
let isPlaying = false;
let isRandom = false;
let updateTimer;

const music_list = [
  {
    img: 'images/stay.jpg',
    name: 'Bilmaysan yor',
    artist: 'Jaloliddin Ahmadaliyev',
    music: 'music/Jaloliddin Ahmadaliyev - Bilmaysan yor.mp3'
  },
  {
    img: 'images/stay.jpg',
    name: 'Maylimi',
    artist: 'Jaloliddin Ahmadaliyev',
    music: 'music/Jaloliddin Ahmadaliyev - Biz ham bir yashasak maylimi.mp3'
  },
  {
    img: 'images/stay.jpg',
    name: 'Dadamni Soyasida',
    artist: 'Jaloliddin Ahmadaliyev',
    music: 'music/Jaloliddin Ahmadaliyev - Dadamni Soyasida.mp3'
  },
  {
    img: 'images/stay.jpg',
    name: 'Eh odamlar',
    artist: 'Jaloliddin Ahmadaliyev',
    music: 'music/Jaloliddin Ahmadaliyev - Eh odamlar.mp3'
  },
  {
    img: 'images/stay.jpg',
    name: 'Ex joralar',
    artist: 'Jaloliddin Ahmadaliyev',
    music: 'music/Jaloliddin Ahmadaliyev - Ex jo ralar.mp3'
  },
  {
    img: 'images/stay.jpg',
    name: 'Ey dost',
    artist: 'Jaloliddin Ahmadaliyev',
    music: 'music/Jaloliddin Ahmadaliyev - Ey do st.mp3'
  },
  {
    img: 'images/stay.jpg',
    name: 'Ey gul',
    artist: 'Jaloliddin Ahmadaliyev',
    music: 'music/Jaloliddin Ahmadaliyev - Ey gul.mp3'
  },
  {
    img: 'images/stay.jpg',
    name: 'Hudoga soldim',
    artist: 'Jaloliddin Ahmadaliyev',
    music: 'music/Jaloliddin Ahmadaliyev - Hudoga soldim.mp3'
  },
  {
    img: 'images/stay.jpg',
    name: 'Indamaygina',
    artist: 'Jaloliddin Ahmadaliyev',
    music: 'music/Jaloliddin Ahmadaliyev - Bilmaysan yor.mp3'
  },
  {
    img: 'images/stay.jpg',
    name: 'Janonlar',
    artist: 'Jaloliddin Ahmadaliyev',
    music: 'music/Jaloliddin Ahmadaliyev - Janonlar.mp3'
  },
  {
    img: 'images/stay.jpg',
    name: 'Yalinmayman',
    artist: 'Jaloliddin Ahmadaliyev',
    music: 'music/Jaloliddin Ahmadaliyev - Ketavering yalinmayman.mp3'
  },
  {
    img: 'images/stay.jpg',
    name: 'Topolmaysan',
    artist: 'Jaloliddin Ahmadaliyev',
    music: 'music/Jaloliddin Ahmadaliyev - Ketsam meni topolmaysan.mp3'
  },
  {
    img: 'images/stay.jpg',
    name: 'Men edim',
    artist: 'Jaloliddin Ahmadaliyev',
    music: 'music/Jaloliddin Ahmadaliyev - Men edim.mp3'
  },
  {
    img: 'images/stay.jpg',
    name: 'Menda qolmadi dil',
    artist: 'Jaloliddin Ahmadaliyev',
    music: 'music/Jaloliddin Ahmadaliyev - Menda qolmadi dil.mp3'
  },
  {
    img: 'images/stay.jpg',
    name: 'Kelgan emushsan',
    artist: 'Jaloliddin Ahmadaliyev',
    music: 'music/Jaloliddin Ahmadaliyev - Meni yo qlab kelgan emushsan.mp3'
  },
  {
    img: 'images/stay.jpg',
    name: 'Organib qoldim',
    artist: 'Jaloliddin Ahmadaliyev',
    music: 'music/Jaloliddin Ahmadaliyev - O rganim qoldim.mp3'
  },
  {
    img: 'images/stay.jpg',
    name: 'Ozim',
    artist: 'Jaloliddin Ahmadaliyev',
    music: 'music/Jaloliddin Ahmadaliyev - O zim.mp3'
  },
  {
    img: 'images/stay.jpg',
    name: 'Ona nolasi',
    artist: 'Jaloliddin Ahmadaliyev',
    music: 'music/Jaloliddin Ahmadaliyev - Ona nolasi.mp3'
  },
  {
    img: 'images/stay.jpg',
    name: 'Unutgan rost',
    artist: 'Jaloliddin Ahmadaliyev',
    music: 'music/Jaloliddin Ahmadaliyev - Ona seni unutganim rost.mp3'
  },
  {
    img: 'images/stay.jpg',
    name: 'Onajon',
    artist: 'Jaloliddin Ahmadaliyev',
    music: 'music/Jaloliddin Ahmadaliyev - Onajon.mp3'
  },
  {
    img: 'images/stay.jpg',
    name: 'Puling bolmasa',
    artist: 'Jaloliddin Ahmadaliyev',
    music: 'music/Jaloliddin Ahmadaliyev - Puling bo lmasa.mp3'
  },
  {
    img: 'images/stay.jpg',
    name: 'Sogindim',
    artist: 'Jaloliddin Ahmadaliyev',
    music: 'music/Jaloliddin Ahmadaliyev - Sog indim'
  },
  {
    img: 'images/stay.jpg',
    name: 'Tuproq bolasan',
    artist: 'Jaloliddin Ahmadaliyev',
    music: 'music/Jaloliddin Ahmadaliyev - Tuproq bo lasan.mp3'
  },
  {
    img: 'images/stay.jpg',
    name: 'Xavotirman',
    artist: 'Jaloliddin Ahmadaliyev',
    music: 'music/Jaloliddin Ahmadaliyev - Xavotirman.mp3'
  },
  {
    img: 'images/stay.jpg',
    name: 'Yaxshi qiz',
    artist: 'Jaloliddin Ahmadaliyev',
    music: 'music/Jaloliddin Ahmadaliyev - Yaxshi qiz.mp3'
  },

  {
    img: 'images/stay.jpg',
    name: 'Yor bizdan ketdi',
    artist: 'Jaloliddin Ahmadaliyev',
    music: 'music/Jaloliddin Ahmadaliyev - Yor bizdan ketdi.mp3'
  },
  {
    img: 'images/stay.jpg',
    name: 'Yurak',
    artist: 'Jaloliddin Ahmadaliyev',
    music: 'music/Jaloliddin Ahmadaliyev - Yurak.mp3'
  },
  {
    img: 'images/stay.jpg',
    name: 'Sogindim',
    artist: 'Jaloliddin Ahmadaliyev',
    music: 'music/Jaloliddin_Ahmadaliyev_Sog_indim_visolingni_sogindim_jamolingn.mp3'
  },
];

loadTrack(track_index);

function loadTrack(track_index) {
  clearInterval(updateTimer);
  reset();

  curr_track.src = music_list[track_index].music;
  curr_track.load();

  track_art.style.backgroundImage = "url(" + music_list[track_index].img + ")";
  track_name.textContent = music_list[track_index].name;
  track_artist.textContent = music_list[track_index].artist;
  now_playing.textContent = "Playing music " + (track_index + 1) + " of " + music_list.length;

  updateTimer = setInterval(setUpdate, 1000);

  curr_track.addEventListener('ended', nextTrack);
  random_bg_color();
}

function random_bg_color() {
  let hex = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', 'a', 'b', 'c', 'd', 'e'];
  let a;

  function populate(a) {
    for (let i = 0; i < 6; i++) {
      let x = Math.round(Math.random() * 14);
      let y = hex[x];
      a += y;
    }
    return a;
  }
  let Color1 = populate('#');
  let Color2 = populate('#');
  var angle = 'to right';

  let gradient = 'linear-gradient(' + angle + ',' + Color1 + ', ' + Color2 + ")";
  document.body.style.background = gradient;
}
function reset() {
  curr_time.textContent = "00:00";
  total_duration.textContent = "00:00";
  seek_slider.value = 0;
}
function randomTrack() {
  isRandom ? pauseRandom() : playRandom();
}
function playRandom() {
  isRandom = true;
  randomIcon.classList.add('randomActive');
}
function pauseRandom() {
  isRandom = false;
  randomIcon.classList.remove('randomActive');
}
function repeatTrack() {
  let current_index = track_index;
  loadTrack(current_index);
  playTrack();
}
function playpauseTrack() {
  isPlaying ? pauseTrack() : playTrack();
}
function playTrack() {
  curr_track.play();
  isPlaying = true;
  track_art.classList.add('rotate');
  wave.classList.add('loader');
  playpause_btn.innerHTML = '<i class="fa fa-pause-circle fa-5x"></i>';
}
function pauseTrack() {
  curr_track.pause();
  isPlaying = false;
  track_art.classList.remove('rotate');
  wave.classList.remove('loader');
  playpause_btn.innerHTML = '<i class="fa fa-play-circle fa-5x"></i>';
}
function nextTrack() {
  if (track_index < music_list.length - 1 && isRandom === false) {
    track_index += 1;
  } else if (track_index < music_list.length - 1 && isRandom === true) {
    let random_index = Number.parseInt(Math.random() * music_list.length);
    track_index = random_index;
  } else {
    track_index = 0;
  }
  loadTrack(track_index);
  playTrack();
}
function prevTrack() {
  if (track_index > 0) {
    track_index -= 1;
  } else {
    track_index = music_list.length - 1;
  }
  loadTrack(track_index);
  playTrack();
}
function seekTo() {
  let seekto = curr_track.duration * (seek_slider.value / 100);
  curr_track.currentTime = seekto;
}
function setVolume() {
  curr_track.volume = volume_slider.value / 100;
}
function setUpdate() {
  let seekPosition = 0;
  if (!isNaN(curr_track.duration)) {
    seekPosition = curr_track.currentTime * (100 / curr_track.duration);
    seek_slider.value = seekPosition;

    let currentMinutes = Math.floor(curr_track.currentTime / 60);
    let currentSeconds = Math.floor(curr_track.currentTime - currentMinutes * 60);
    let durationMinutes = Math.floor(curr_track.duration / 60);
    let durationSeconds = Math.floor(curr_track.duration - durationMinutes * 60);

    if (currentSeconds < 10) { currentSeconds = "0" + currentSeconds; }
    if (durationSeconds < 10) { durationSeconds = "0" + durationSeconds; }
    if (currentMinutes < 10) { currentMinutes = "0" + currentMinutes; }
    if (durationMinutes < 10) { durationMinutes = "0" + durationMinutes; }

    curr_time.textContent = currentMinutes + ":" + currentSeconds;
    total_duration.textContent = durationMinutes + ":" + durationSeconds;
  }
}