const playpause = document.getElementById("playpause");
const playButton = document.getElementById("playButton");
const video = document.getElementById("video");
const volume = document.getElementById("volume");
const fullscreen = document.getElementById("fullscreen");
const player_wrap = document.getElementById("video-wrap");
const forward = document.getElementById("forward");
const rewind = document.getElementById("rewind");
const progress = document.getElementById("progressBar");
const progressPct = document.getElementById("progressPct");
const progressThumb = document.getElementById("progressThumb");
const progressPrev = document.getElementById("progressPrev");
const episodes = document.getElementById("episodes");
const videoWrap = document.getElementById("video-wrap");
const episodesList = document.getElementById("episodes_list");

const volumeIndicator = document.getElementById("volumeIndicator");
const rewinded = document.getElementById("rewind_ed");
const forwarded = document.getElementById("forward_ed");

class customNetflix {
    constructor(element, sources, episodeCount) {
        this.element = element;
        this.sources = sources;
        this.episodeCount = episodeCount;
    }
    init(){
        getDeviceType();
        // episodesList.style.height = episodesList.clientHeight - document.querySelector('.controls').clientHeight + 'px';
    }
    play(){}
    stop(){}
    pause(){}
    rewind(){}
    forward(){}
    fs_enter(){}
    fs_exit(){}
    episodes(){}
}
/**
 * @desc Энийг цааш нь class болгож хөгжүүлнэ
 * */
const getDeviceType = () => {
    const ua = navigator.userAgent;
    if (/(tablet|ipad|playbook|silk)|(android(?!.*mobi))/i.test(ua)) {
        alert("tablet")
        screen.orientation.lock("landscape")
        return "tablet";
    }
    if (
        /Mobile|iP(hone|od)|Android|BlackBerry|IEMobile|Kindle|Silk-Accelerated|(hpw|web)OS|Opera M(obi|ini)/.test(
            ua
        )
    ) {
        // alert("android")
        // video.play();
        // screen.orientation.lock("landscape");
        // screen.orientation.lock("landscape");
        return "mobile";
    }
    // alert("desktop")
    return "desktop";
};
let forwardRewind = function (dir) {
    if (dir !== null && dir !== undefined) {
        if (dir === "forward")
        {
            video.currentTime += 10;
            forwarded.style.opacity = "1";
            setTimeout(()=>{
                forwarded.style.opacity = "0";
            },300)
        }
        else if (dir === "rewind")
        {
            video.currentTime -= 10;
            rewinded.style.opacity = "1";
            setTimeout(()=>{
                rewinded.style.opacity = "0";
            },300)
        }
    }
};
let checkVolume = function (dir) {
    if (dir)
    {
        let currentVolume = Math.floor(video.volume * 10) / 10;
        if (dir === "+")
            if (currentVolume<1)
                video.volume += 0.1;
            else if (dir === "-")
                if (currentVolume>0)
                    video.volume -= 0.1;
        video.muted = currentVolume <= 0;
    }
};
let fs_check = function (st) {
    let state = document.fullScreen || document.mozFullScreen || document.webkitIsFullScreen;
    let event = state ? "fs-enter":"fs-exit"
    if (!player_wrap.fullscreenEnabled) {
        player_wrap.requestFullscreen();
    }
    if (document.exitFullscreen)
        document.exitFullscreen();
    if (event === "fs-enter")
        changeButtonState("fs-enter");
    else
        changeButtonState("fs-exit");
    console.log(state)
    return state;
};
function progressInteraction(e) {
    if (!video.paused && !video.ended){
        let mouseX = e.pageX - progress.offsetLeft;
        let setTime = mouseX*video.duration/video.offsetWidth;
        video.currentTime=setTime;
    }
}
function changeButtonState(type){
    if (type === "playpause") {
        if (video.paused || video.ended){
            playpause.setAttribute("data-state", "play");
            playButton.setAttribute("data-state", "pause");
            playButton.style.opacity = "1";
            setTimeout(()=>{
                playButton.style.opacity = "0";
            },300);
        } else {
            playpause.setAttribute("data-state", "pause");
            playButton.setAttribute("data-state", "play");
            playButton.style.opacity = "1";
            setTimeout(()=>{
                playButton.style.opacity = "0";
            },300);
        }
    }
    if (type === "volume") {
        if (video.volume === 1 || video.volume > 0.65){
            volumeIndicator.setAttribute("data-state", "volume_loud");
            volume.setAttribute("data-state", "volume_loud");
        } else if (video.volume < 0.65 && video.volume > 0.4) {
            volumeIndicator.setAttribute("data-state", "volume_medium");
            volume.setAttribute("data-state", "volume_medium");
        } else if (video.volume < 0.4 && video.volume > 0.1) {
            volumeIndicator.setAttribute("data-state", "volume_low");
            volume.setAttribute("data-state", "volume_low");
        } else if (video.volume === 0) {
            volumeIndicator.setAttribute("data-state", "volume_muted");
            volume.setAttribute("data-state", "volume_muted");
        }
        console.log("button state change to", type)
    }
    else if (type === "mute")
        volume.setAttribute("data-state", video.muted ? "unmute":"mute")
    else if (type === "fs-enter")
        fullscreen.setAttribute("data-state", "fs-enter");
    else if (type === "fs-exit")
        fullscreen.setAttribute("data-state", "fs-exit");
}
function volumeControl(dir) {
    if (dir === "up")
    {
        video.volume = Math.min(1, video.volume + 0.1);
    }
    else if (dir === "down")
    {
        video.volume = Math.max(0, video.volume - 0.1);
    }
}
const showEpisodes = () =>{

};

function closeAll() {
    if (episodeClickCount === 1) {
        // episodeClickCount--
        episodes.click();
    }
}
video.addEventListener("timeupdate", e=>{
    let progressPos = video.currentTime / video.duration;
    progressPct.style.width = progressPos * 100 + "%";
    progressThumb.style.left = progressPos * 100 + "%";
});
video.addEventListener("play", e=>{
    /*if (getDeviceType() === "mobile"){
        screen.orientation.lock("landscape");
    }*/
    /*if (!video.paused)
        fullscreen.click();*/
    changeButtonState("playpause");
    closeAll();
});
video.addEventListener("pause", e=>{
    changeButtonState("playpause");
});
video.addEventListener("click", e=>{
    if (video.paused || video.ended){
        video.play();
    } else if (video.play){
        video.pause();
    }
});
video.addEventListener("dblclick", e=>{
    fs_check()
});
video.addEventListener("volumechange", e=>{
    changeButtonState("volume");
});
progressThumb.addEventListener("drag", e=>{

})
fullscreen.addEventListener("click", e=>{
    fs_check()
});
forward.addEventListener("click", e=>{
    forwardRewind("forward");
})
rewind.addEventListener("click", e=>{
    forwardRewind("rewind");
})
playpause.addEventListener("click", e=>{
    if (video.paused || video.ended){
        video.play();
    } else if (video.play){
        video.pause();
    }
});
progress.addEventListener("drag", e=>{
    let percent = e.offsetX / progress.offsetWidth;
    video.currentTime = percent * video.duration;
})
progress.addEventListener("click", e=>{
    let percent = e.offsetX / progress.offsetWidth;
    video.currentTime = percent * video.duration;
})
progress.addEventListener("mousemove", e=>{
    let date = new Date(null);
    let percent = e.offsetX / progress.offsetWidth;
    date.setSeconds(percent * video.duration)
    let result = date.toISOString().substr(11,8);
    progressPrev.innerText = result;
    progressPrev.style.display = "block"
    progressPrev.style.left = e.clientX + "px"
})
progress.addEventListener("mouseleave", e=>{
    progressPrev.style.display = "none";
});
let episodeClickCount = 0;
episodes.addEventListener("click", e=> {
    if (episodeClickCount === 0) {
        if (!video.paused)
            video.pause();
        document.getElementById("episodes_list").style.right = 0;
        episodeClickCount++
    } else {
        if (video.paused)
            video.play();
        document.getElementById("episodes_list").style.right = '-100%';
        episodeClickCount--
    }
});
window.onkeydown = function (e) {
    e = e || window.event;
    /**@description Arrow left*/
    if (e.keyCode == "37")
        forwardRewind("rewind");
    /**@description Arrow right*/
    else if (e.keyCode == "39")
        forwardRewind("forward");
    /**@description Key space*/
    else if (e.keyCode == "32") {
        if (video.paused || video.ended){
            video.play();
        } else if (video.play){
            video.pause();
        }
    }
    /**@description Key F */
    else if (e.keyCode == "70")
        fs_check()
    /**@description arrow up*/
    else if (e.keyCode == "38") {
        volumeControl("up")
        volumeIndicator.style.opacity = "1";
        setTimeout(()=>{
            volumeIndicator.style.opacity = "0";
        },250);
    }
    /**@description arrow down*/
    else if (e.keyCode == "40") {
        volumeControl("down")
        volumeIndicator.style.opacity = "1";
        setTimeout(()=>{
            volumeIndicator.style.opacity = "0";
        },250);
    }
}
