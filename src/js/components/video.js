
const Video = _ =>{
    const   home_video              = document.getElementById('home_video'),
            home_video_btn          = document.getElementById('dr--primary-button'),
            video_duration_display  = document.getElementById('video_duration_display');

    let i = setInterval(function() {
        if(home_video.readyState > 0) {
            let minutes = parseInt(home_video.duration / 60, 10);
            let seconds = parseInt(home_video.duration % 60);
            video_duration_display.textContent = `${minutes + ':' + seconds}`;
            clearInterval(i);
        }
    }, 200);

    home_video_btn.addEventListener('click',_=>{ home_video.play()})
}

export default Video;