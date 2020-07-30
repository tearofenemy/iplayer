export const musicPlayerInit = () => {
    const audio = document.querySelector('.audio');
    const audioImg = document.querySelector('.audio-img');
    const audioHeader = document.querySelector('.audio-header');
    const audioPlayer = document.querySelector('.audio-player');
    const audioNavigation = document.querySelector('.audio-navigation');
    const audioButtonPlay = document.querySelector('.audio-button__play');
    const audioProgress = document.querySelector('.audio-progress');
    const audioProgressTiming = document.querySelector('.audio-progress__timing');
    const audioTimePassed = document.querySelector('.audio-time__passed');
    const audioTimeTotal = document.querySelector('.audio-time__total');


    const playList = ['flow', 'hello', 'speed'];

    let trackIndex = 0;


    const nextTrack = () => {
        if (trackIndex === playList.length - 1) {
            trackIndex = 0;
        } else {
            trackIndex++;
        }
        loadTrack();
    }

    const prevTrack = () => {
        if (trackIndex !== 0) {
            trackIndex--;
        } else {
            trackIndex = playList.length - 1;
        }
        loadTrack();
    }

    const loadTrack = () => {
        const isPlayed = audioPlayer.paused;
        const track = playList[trackIndex];

        audioPlayer.src = `./audio/${track}.mp3`;
        audioImg.src = `./audio/${track}.jpg`;

        audioHeader.textContent = track.toUpperCase();

        if (isPlayed) {
            audioPlayer.pause();
        } else {
            audioPlayer.play();
        }
    }

    const addZero = n => n < 10 ? '0' + n : n;

    audioNavigation.addEventListener('click', event => {
        const target = event.target;

        if (target.classList.contains('audio-button__play')) {
            audio.classList.toggle('play');
            audioButtonPlay.classList.toggle('fa-play');
            audioButtonPlay.classList.toggle('fa-pause');


            if (audioPlayer.paused) {
                audioPlayer.play();
            } else {
                audioPlayer.pause();
            }

            const track = playList[trackIndex];
            audioHeader.textContent = track;
        }

        if (target.classList.contains('audio-button__prev')) {
            prevTrack();
        }


        if (target.classList.contains('audio-button__next')) {
            nextTrack();
        }

        audioPlayer.addEventListener('ended', () => {
            nextTrack();
            audioPlayer.play();
        });


        audioPlayer.addEventListener('timeupdate', () => {
            const duration = audioPlayer.duration;
            const currentTime = audioPlayer.currentTime;

            const progress = (currentTime / duration) * 100;

            audioProgressTiming.style.width = progress + '%';


            const minutes = Math.floor(currentTime / 60) || '0';
            const seconds = Math.floor(currentTime % 60) || '0';

            const totalMinutes = Math.floor(duration / 60) || '0';
            const totalSeconds = Math.floor(duration % 60) || '0';

            audioTimePassed.textContent = `${addZero(minutes)}:${addZero(seconds)}`;
            audioTimeTotal.textContent = `${addZero(totalMinutes)}:${addZero(totalSeconds)}`;
        });

        audioProgress.addEventListener('click', event => {
            const x = event.offsetX;
            const progressLength = audioProgress.clientWidth;
            const progress = (x / progressLength) * audioPlayer.duration;
            audioPlayer.currentTime = progress;
        });
    });
};