let songs = [
  { name: "Song 1", file: "songs/song1.mp3", cover: "covers/cover1.jpg" },
  { name: "Song 2", file: "songs/song2.mp3", cover: "covers/cover2.jpg" },
  { name: "Song 3", file: "songs/song3.mp3", cover: "covers/cover3.jpg" }
];

let songIndex = 0;
let isShuffle = false;
let isLoop = false;

let audio = new Audio(songs[songIndex].file);
let playBtn = document.getElementById('play');
let prevBtn = document.getElementById('prev');
let nextBtn = document.getElementById('next');
let progressBar = document.getElementById('progressBar');
let volume = document.getElementById('volume');
let currentSong = document.getElementById('currentSong');
let cover = document.getElementById('cover');
let songItems = document.getElementById('songItems');
let timeDisplay = document.getElementById('time');
let loopBtn = document.getElementById('loopBtn');
let shuffleBtn = document.getElementById('shuffleBtn');
let searchBox = document.getElementById('searchBox');

let liElements = [];

function formatTime(sec) {
  let min = Math.floor(sec / 60);
  let secs = Math.floor(sec % 60);
  return `${min}:${secs < 10 ? '0' + secs : secs}`;
}

songs.forEach((song, index) => {
  let li = document.createElement('li');
  li.textContent = song.name;
  li.addEventListener('click', () => playSong(index));
  songItems.appendChild(li);
  liElements.push(li);
});

function playSong(index) {
  songIndex = index;
  audio.src = songs[songIndex].file;
  cover.src = songs[songIndex].cover;
  currentSong.textContent = songs[songIndex].name;
  audio.play();
  playBtn.textContent = '⏸️';
  cover.classList.add("rotating");

  liElements.forEach(li => li.style.backgroundColor = "#282828");
  liElements[songIndex].style.backgroundColor = "#1db954";
}

playBtn.addEventListener('click', () => {
  if (audio.paused || audio.ended) {
    audio.play();
    playBtn.textContent = '⏸️';
    cover.classList.add("rotating");
  } else {
    audio.pause();
    playBtn.textContent = '▶️';
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
  progressBar.value = (audio.currentTime / audio.duration) * 100 || 0;
  timeDisplay.textContent = `${formatTime(audio.currentTime)} / ${formatTime(audio.duration)}`;
});

progressBar.addEventListener('input', () => {
  audio.currentTime = (progressBar.value / 100) * audio.duration;
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

