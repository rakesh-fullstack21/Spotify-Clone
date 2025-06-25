let playlists = {
  default: [
    { name: "Song 1", file: "songs/song1.mp3", cover: "covers/cover1.jpg" },
    { name: "Song 2", file: "songs/song2.mp3", cover: "covers/cover2.jpg" },
    { name: "Song 3", file: "songs/song3.mp3", cover: "covers/cover3.jpg"}
  ],
  chill: [
    { name: "Chill Beat", file: "songs/song3.mp3", cover: "covers/cover3.jpg" },
    { name: "Relax Mood", file: "songs/song1.mp3", cover: "covers/cover1.jpg" }
  ]
};

let songs = playlists.default;
let songIndex = 0;
let isShuffle = false;
let isLoop = false;

const audio = new Audio();
const playBtn = document.getElementById('play');
const prevBtn = document.getElementById('prev');
const nextBtn = document.getElementById('next');
const progressBar = document.getElementById('progressBar');
const volume = document.getElementById('volume');
const currentSong = document.getElementById('currentSong');
const cover = document.getElementById('cover');
const songItems = document.getElementById('songItems');
const timeDisplay = document.getElementById('time');
const loopBtn = document.getElementById('loopBtn');
const shuffleBtn = document.getElementById('shuffleBtn');
const searchBox = document.getElementById('searchBox');
const themeToggle = document.getElementById('themeToggle');

const miniPlayer = document.getElementById('miniPlayer');
const miniCover = document.getElementById('miniCover');
const miniTitle = document.getElementById('miniTitle');
const miniPlayPause = document.getElementById('miniPlayPause');

let liElements = [];

function formatTime(sec) {
  if (isNaN(sec)) return "0:00";
  let min = Math.floor(sec / 60);
  let secs = Math.floor(sec % 60);
  return `${min}:${secs < 10 ? "0" + secs : secs}`;
}

function renderSongs() {
  songItems.innerHTML = "";
  liElements = [];
  songs.forEach((song, index) => {
    const li = document.createElement('li');
    li.textContent = song.name;
    li.addEventListener('click', () => playSong(index));
    songItems.appendChild(li);
    liElements.push(li);
  });
}
renderSongs();

function playSong(index) {
  songIndex = index;
  audio.src = songs[songIndex].file;
  audio.load();
  audio.play();
  cover.src = songs[songIndex].cover;
  currentSong.textContent = songs[songIndex].name;
  playBtn.textContent = '⏸️';
  cover.classList.add('rotating');
  miniCover.src = songs[songIndex].cover;
  miniTitle.textContent = songs[songIndex].name;
  miniPlayer.style.display = "flex";

  liElements.forEach(li => li.style.backgroundColor = "#282828");
  liElements[songIndex].style.backgroundColor = "#1db954";
}

playBtn.addEventListener('click', () => {
  if (audio.paused || audio.ended) {
    audio.play();
    playBtn.textContent = '⏸️';
    miniPlayPause.textContent = '⏸️';
    cover.classList.add("rotating");
  } else {
    audio.pause();
    playBtn.textContent = '▶️';
    miniPlayPause.textContent = '▶️';
    cover.classList.remove("rotating");
  }
});

prevBtn.addEventListener('click', () => {
  songIndex = (songIndex - 1 + songs.length) % songs.length;
  playSong(songIndex);
});

nextBtn.addEventListener('click', () => {
  if (isShuffle) {
    songIndex = Math.floor(Math.random() * songs.length);
  } else {
    songIndex = (songIndex + 1) % songs.length;
  }
  playSong(songIndex);
});

audio.addEventListener('timeupdate', () => {
  if (!isNaN(audio.duration)) {
    const percent = (audio.currentTime / audio.duration) * 100;
    progressBar.value = percent;
    timeDisplay.textContent = `${formatTime(audio.currentTime)} / ${formatTime(audio.duration)}`;
  }
});

progressBar.addEventListener('input', () => {
  if (!isNaN(audio.duration)) {
    audio.currentTime = (progressBar.value / 100) * audio.duration;
  }
});

volume.addEventListener('input', () => {
  audio.volume = volume.value;
});

loopBtn.addEventListener('click', () => {
  isLoop = !isLoop;
  audio.loop = isLoop;
  alert(`Loop is now ${isLoop ? 'ON' : 'OFF'}`);
});

shuffleBtn.addEventListener('click', () => {
  isShuffle = !isShuffle;
  alert(`Shuffle is now ${isShuffle ? 'ON' : 'OFF'}`);
});

searchBox.addEventListener('input', (e) => {
  let value = e.target.value.toLowerCase();
  liElements.forEach((li, i) => {
    li.style.display = songs[i].name.toLowerCase().includes(value) ? "block" : "none";
  });
});

document.addEventListener("keydown", (e) => {
  if (e.code === "Space") {
    e.preventDefault();
    playBtn.click();
  }
  if (e.code === "ArrowRight") nextBtn.click();
  if (e.code === "ArrowLeft") prevBtn.click();
});

miniPlayPause.addEventListener('click', () => {
  if (audio.paused) {
    audio.play();
    miniPlayPause.textContent = "⏸️";
    playBtn.textContent = "⏸️";
  } else {
    audio.pause();
    miniPlayPause.textContent = "▶️";
    playBtn.textContent = "▶️";
  }
});

themeToggle.addEventListener('click', () => {
  document.body.classList.toggle('dark');
  document.body.classList.toggle('light');
  themeToggle.textContent = document.body.classList.contains('dark') ? '🌙' : '☀️';
});

function loadPlaylist(name) {
  songs = playlists[name];
  renderSongs();
  playSong(0);
}




