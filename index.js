const player = document.querySelector('.player');
const video = player.querySelector('.viewer');
const progress = player.querySelector('.progress_bar');
const progressBar = player.querySelector('.progress');
const toggle = player.querySelector('.video_toggle');
const icon = player.querySelector('.play_btn_icon');
const volume = player.querySelector('.volume');
const muteBtn = player.querySelector('.video_vol');
const muteIcon = player.querySelector('.btn_volume_icon');
const play_btn = player.querySelector('.video_button');
const controls = player.querySelector('.control_panel');

function showControls () {
  controls.classList.remove('invis')
}

function togglePlay(){
  if (video.paused){video.play();} 
  else {video.pause();}
}

function updateButton(e) {
  if(video.paused){
    icon.classList.remove('pause');
    play_btn.classList.remove('invis')
  } else {
    play_btn.classList.add('invis');
    icon.classList.add('pause');  
  }
}

function handleProgress() {
  const percent = (video.currentTime / video.duration)*100;
  progressBar.style.width = `${percent}%`;
}

function scrub(e) {
  const scrubTime = (e.offsetX / progress.offsetWidth) * video.duration;
  video.currentTime = scrubTime;  
}

function changeVolume() {
  const value = this.value;
  this.style.background = `linear-gradient(to right, #bdae82 0%, #bdae82 ${value}%, #fff ${value}%, white 100%)`
}

function volumeMute(evt) {
  if (!video.muted){
    muteIcon.classList.add('mute_button');
  } else {
    muteIcon.classList.remove('mute_button');
  }
}

player.addEventListener('click', showControls);
video.addEventListener('click', togglePlay);
play_btn.addEventListener('click', togglePlay);
video.addEventListener('play', updateButton);
video.addEventListener('pause', updateButton);
video.addEventListener('timeupdate', handleProgress);
toggle.addEventListener('click', togglePlay);

let mousedown = false;

progress.addEventListener('click', scrub);
progress.addEventListener('mousemove', (e) => {
  if(mousedown){
    scrub(e);
  }
});

progress.addEventListener('mousedown', () => mousedown = true);
progress.addEventListener('mouseup', () => mousedown = false);
volume.addEventListener('input', changeVolume);
volume.addEventListener('mousemove', (e) => {
  if(!mousedown){
    video.volume = e.target.value / 100;
    if(e.target.value==0){
      muteIcon.classList.add('mute_button');
    } else {
      muteIcon.classList.remove('mute_button');
    }
  }
});

muteIcon.addEventListener('click', volumeMute);
muteBtn.addEventListener('click', () => {
  video.muted = !video.muted;
})