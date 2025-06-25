let songs = [
  { name: "Song 1", file: "songs/song1.mp3", cover: "covers/cover1.jpg" },
  { name: "Song 2", file: "songs/song2.mp3", cover: "covers/cover2.jpg" },
  { name: "Song 3", file: "songs/song3.mp3", cover: "covers/cover3.jpg" }
];

let songIndex = 0;
let audio = new Audio(songs[songIndex].file);

let playBtn = document.getElementById('play');
let prevBtn = document.getElementById('prev');
let nextBtn = document.getElementById('next');
let progressBar = document.getElementById('progressBar');
let volume = document.getElementById('volume');
let songItems = document.getElementById('songItems');
let currentSong = document.getElementById('currentSong');
let cover = document.getElementById('cover');

let liElements = [];

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
  document.body.classList.add("playing");

  // Highlight current song
  liElements.forEach(li => li.style.backgroundColor = "#282828");
  liElements[index].style.backgroundColor = "#1db954";
}

playBtn.addEventListener('click', () => {
  if (audio.paused || audio.ended) {
    audio.play();
    playBtn.textContent = '⏸️';
    cover.classList.add("rotating");
    document.body.classList.add("playing");
  } else {
    audio.pause();
    playBtn.textContent = '▶️';
    cover.classList.remove("rotating");
    document.body.classList.remove("playing");
  }
});

prevBtn.addEventListener('click', () => {
  songIndex = (songIndex - 1 + songs.length) % songs.length;
  playSong(songIndex);
});

nextBtn.addEventListener('click', () => {
  songIndex = (songIndex + 1) % songs.length;
  playSong(songIndex);
});

audio.addEventListener('timeupdate', () => {
  progressBar.value = (audio.currentTime / audio.duration) * 100;
});

progressBar.addEventListener('input', () => {
  audio.currentTime = (progressBar.value / 100) * audio.duration;
});

volume.addEventListener('input', () => {
  audio.volume = volume.value;
});

