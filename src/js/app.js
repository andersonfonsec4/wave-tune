const audio = document.getElementById("audioPlayer")

const playlistElement = document.getElementById("playlist")
const fileInput = document.getElementById("fileInput")

const playBtn = document.getElementById("playBtn")
const prevBtn = document.getElementById("prevBtn")
const nextBtn = document.getElementById("nextBtn")

const fullscreenBtn = document.getElementById("fullscreenBtn")

const progressBar = document.getElementById("progressBar")
const volumeBar = document.getElementById("volumeBar")

const currentTime = document.getElementById("currentTime")
const duration = document.getElementById("duration")

const trackTitle = document.getElementById("trackTitle")

const vinyl = document.getElementById("vinyl")

let tracks = []
let currentIndex = -1


/* FORMATAR TEMPO */

function formatTime(time){

if(!time) return "0:00"

const minutes = Math.floor(time / 60)
const seconds = Math.floor(time % 60)

return `${minutes}:${seconds.toString().padStart(2,"0")}`

}


/* ADICIONAR MÚSICAS */

fileInput.addEventListener("change",(event)=>{

const files = Array.from(event.target.files)

files.forEach(file => {

const url = URL.createObjectURL(file)

tracks.push({
name: file.name,
url: url
})

})

renderPlaylist()

if(currentIndex === -1 && tracks.length > 0){
playTrack(0)
}

})


/* TOCAR MUSICA */

function playTrack(index){

const track = tracks[index]

if(!track) return

currentIndex = index

audio.src = track.url

audio.play()

trackTitle.textContent = track.name

vinyl.style.animationPlayState = "running"

renderPlaylist()

}


/* PLAY / PAUSE */

playBtn.onclick = ()=>{

if(audio.paused){

audio.play()
vinyl.style.animationPlayState = "running"

}else{

audio.pause()
vinyl.style.animationPlayState = "paused"

}

}


/* PROXIMA */

nextBtn.onclick = ()=>{

if(tracks.length === 0) return

currentIndex++

if(currentIndex >= tracks.length){
currentIndex = 0
}

playTrack(currentIndex)

}


/* ANTERIOR */

prevBtn.onclick = ()=>{

if(tracks.length === 0) return

currentIndex--

if(currentIndex < 0){
currentIndex = tracks.length - 1
}

playTrack(currentIndex)

}


/* VOLUME */

volumeBar.addEventListener("input",()=>{

audio.volume = volumeBar.value

})


/* PROGRESS BAR */

audio.addEventListener("timeupdate",()=>{

progressBar.max = audio.duration || 0
progressBar.value = audio.currentTime

currentTime.textContent = formatTime(audio.currentTime)
duration.textContent = formatTime(audio.duration)

})

progressBar.addEventListener("input",()=>{

audio.currentTime = progressBar.value

})


/* AUTO NEXT */

audio.addEventListener("ended",()=>{

nextBtn.click()

})


/* FULLSCREEN */

fullscreenBtn.onclick = ()=>{

if(!document.fullscreenElement){

document.documentElement.requestFullscreen()

}else{

document.exitFullscreen()

}

}


/* PLAYLIST UI */

function renderPlaylist(){

playlistElement.innerHTML = ""

tracks.forEach((track,index)=>{

const item = document.createElement("div")

item.className = "track"

if(index === currentIndex){
item.classList.add("active")
}

item.textContent = track.name

item.onclick = ()=>playTrack(index)

playlistElement.appendChild(item)

})

}