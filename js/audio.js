function playMusic(musicPath) {
    const audioPlayer = document.getElementById('audio-player');
    audioPlayer.src = musicPath;
    audioPlayer.play();
    audioPlayer.volume = 0.6;
}
